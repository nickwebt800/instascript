// Cloudflare Pages Function: /api/youtube-transcript
// Reads the caption track a YouTube video already has. It never transcribes
// audio and it never calls a paid or third-party speech-to-text service.
//
// Two jobs:
//   1. find the signed caption URLs YouTube issues for this video
//   2. if possible, read the caption text here - if not, hand the URLs to the
//      page so the visitor's own browser can do the read (YouTube asks for a
//      proof-of-origin token that only a real browser can mint)
//
// Contract the page depends on:
//   GET  /api/youtube-transcript?v=<url or id>&diag=1
//   -> { ok: true, videoId, title, author, lengthSeconds, source,
//        tracks: [{ languageCode, languageName, isGenerated, url }],
//        segments?: [{ start, duration, text }] }
//   -> { ok: false, code, message }

const DESKTOP_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36";
const ANDROID_UA = "com.google.android.youtube/19.09.37 (Linux; U; Android 11) gzip";
const IOS_UA = "com.google.ios.youtube/19.29.1 (iPhone14,3; U; CPU iOS 16_6 like Mac OS X)";

const INNERTUBE_KEYS = {
  web: "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
  android: "AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w",
  ios: "AIzaSyB-63vPrdThpKsmbH8La_hA6JbvC9SmuAY",
};

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const CONSENT_COOKIE =
  "CONSENT=YES+cb.20220301-11-p0.en+FX+111; SOCS=CAISEwgDEgk0ODE3Nzk3MjQaAmVuIAEaBgiA_LyaBg";

// --- Browser budget guard ---------------------------------------------------
// Cloudflare Workers Free allows 10 minutes of browser time per day. When it is
// gone Cloudflare answers 429 "Browser time limit exceeded for today" until the
// next UTC day and bills nothing - so the exposure here is an outage, not a
// bill. Two things keep this page out of that state:
//   1. every lookup is cached for an hour, so repeat visitors cost nothing
//   2. this isolate tracks what it has spent and stops calling the browser
//      before the account-level limit is reached, instead of letting every
//      request burn a browser session just to collect a 429
// Spend is per-isolate, so it is an approximation: the 8 minute line sits well
// inside the 10 minute cap to leave room for other isolates.
const BROWSER_BUDGET_MS = 8 * 60 * 1000;
const BROWSER_RATE_PAUSE_MS = 12_000;
let spend = { day: "", ms: 0, blockedUntil: 0, rateLimitedUntil: 0 };

function utcDay() {
  return new Date().toISOString().slice(0, 10);
}

function msUntilUtcMidnight() {
  const now = Date.now();
  const next = Date.UTC(
    new Date(now).getUTCFullYear(),
    new Date(now).getUTCMonth(),
    new Date(now).getUTCDate() + 1
  );
  return next - now;
}

function rollSpend() {
  const day = utcDay();
  if (spend.day !== day) spend = { day, ms: 0, blockedUntil: 0, rateLimitedUntil: 0 };
}

function browserBudgetLeft() {
  rollSpend();
  if (Date.now() < spend.blockedUntil) return 0;
  if (Date.now() < spend.rateLimitedUntil) return 0;
  return Math.max(0, BROWSER_BUDGET_MS - spend.ms);
}

function recordBrowserSpend(ms) {
  rollSpend();
  spend.ms += Number(ms) || 0;
  if (spend.ms >= BROWSER_BUDGET_MS) spend.blockedUntil = Date.now() + msUntilUtcMidnight();
}

function markBrowserExhausted() {
  rollSpend();
  spend.blockedUntil = Date.now() + msUntilUtcMidnight();
}

// A 429 can mean two different things and they need different answers:
//   "Browser time limit exceeded for today" - the day's 10 minutes are gone,
//    nothing works until the next UTC day.
//   everything else - the Free plan rate limit (1 request every 10 seconds).
//    Pause briefly and carry on; shutting the page down for a day over that
//    would be far worse than the limit itself.
function markRateLimited() {
  rollSpend();
  spend.rateLimitedUntil = Date.now() + BROWSER_RATE_PAUSE_MS;
}

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...CORS, ...extra },
  });
}

// Diagnostics are gated behind a token that lives in the project's environment
// and never in the repository. With no token configured the switch does not
// exist at all: a public "skip the cache and start a browser" switch would let
// one visitor burn the whole day's browser allowance, and then everybody gets
// a 503 until the next UTC day.
function diagAllowed(given, env) {
  const token = env?.DIAG_TOKEN;
  if (!token || typeof given !== "string" || !given) return false;
  if (given.length !== token.length) return false;
  let diff = 0;
  for (let i = 0; i < token.length; i++) diff |= token.charCodeAt(i) ^ given.charCodeAt(i);
  return diff === 0;
}

function extractVideoId(input) {
  if (!input) return null;
  let s = String(input).trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  if (!/^https?:\/\//i.test(s)) s = "https://" + s;
  let u;
  try {
    u = new URL(s);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, "").toLowerCase();
  const allowed = ["youtube.com", "youtube-nocookie.com", "youtu.be", "m.youtube.com", "music.youtube.com"];
  if (!allowed.includes(host)) return null;
  if (host === "youtu.be") {
    const id = u.pathname.slice(1).split("/")[0];
    return /^[\w-]{11}$/.test(id) ? id : null;
  }
  const v = u.searchParams.get("v");
  if (v && /^[\w-]{11}$/.test(v)) return v;
  const m = u.pathname.match(/\/(?:embed|shorts|live|v)\/([\w-]{11})/);
  return m ? m[1] : null;
}

// Pull a balanced {...} out of the page instead of trusting a greedy regex.
function sliceJsonObject(text, startIndex) {
  const open = text.indexOf("{", startIndex);
  if (open === -1) return null;
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = open; i < text.length && i < open + 6_000_000; i++) {
    const c = text[i];
    if (esc) {
      esc = false;
      continue;
    }
    if (c === "\\") {
      esc = true;
      continue;
    }
    if (c === '"') inStr = !inStr;
    if (inStr) continue;
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return text.slice(open, i + 1);
    }
  }
  return null;
}

function playerResponseFromHtml(html) {
  const key = "ytInitialPlayerResponse";
  let idx = html.indexOf(key);
  while (idx !== -1) {
    const chunk = sliceJsonObject(html, idx);
    if (chunk) {
      try {
        const parsed = JSON.parse(chunk);
        if (parsed && (parsed.captions || parsed.videoDetails || parsed.playabilityStatus)) return parsed;
      } catch {
        /* keep scanning */
      }
    }
    idx = html.indexOf(key, idx + 1);
  }
  return null;
}

const HTML_SOURCES = [
  { id: "watch", url: (id) => `https://www.youtube.com/watch?v=${id}&hl=en&gl=US` },
];

const CLIENTS = [
  { name: "TVHTML5_SIMPLY_EMBEDDED_PLAYER", version: "2.0", key: "web", ua: DESKTOP_UA, extra: {} },
  { name: "ANDROID_VR", version: "1.62.25", key: "android", ua: ANDROID_UA, extra: { androidSdkVersion: 30, deviceMake: "Oculus", deviceModel: "Quest 3", osName: "Android", osVersion: "12" } },
  { name: "WEB", version: "2.20260916.01.00", key: "web", ua: DESKTOP_UA, extra: {} },
];

async function tracksFromPlainFetch(videoId, debug) {
  for (const src of HTML_SOURCES) {
    try {
      const res = await fetch(src.url(videoId), {
        headers: {
          "User-Agent": DESKTOP_UA,
          "Accept-Language": "en-US,en;q=0.9",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          Cookie: CONSENT_COOKIE,
        },
        redirect: "follow",
      });
      const html = res.ok ? await res.text() : "";
      if (!html) {
        debug.push({ step: src.id, status: res.status, bytes: 0 });
        continue;
      }
      const pr = playerResponseFromHtml(html);
      const tracks = pr?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
      debug.push({
        step: src.id,
        status: res.status,
        bytes: html.length,
        tracks: tracks.length,
        playability: pr?.playabilityStatus?.status || null,
      });
      if (tracks.length) {
        return { tracks, videoDetails: pr.videoDetails || {}, source: "edge-fetch" };
      }
    } catch (err) {
      debug.push({ step: src.id, error: String(err) });
    }
  }

  for (const client of CLIENTS) {
    try {
      const body = JSON.stringify({
        videoId,
        context: {
          client: { clientName: client.name, clientVersion: client.version, hl: "en", gl: "US", ...client.extra },
        },
        contentCheckOk: true,
        racyCheckOk: true,
      });
      const res = await fetch(
        `https://www.youtube.com/youtubei/v1/player?key=${INNERTUBE_KEYS[client.key]}&prettyPrint=false`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": client.ua,
            "Accept-Language": "en-US,en;q=0.9",
            Cookie: CONSENT_COOKIE,
          },
          body,
        }
      );
      if (!res.ok) {
        debug.push({ step: `innertube:${client.name}`, status: res.status });
        continue;
      }
      const pr = await res.json();
      const tracks = pr?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
      debug.push({
        step: `innertube:${client.name}`,
        tracks: tracks.length,
        playability: pr?.playabilityStatus?.status || null,
      });
      if (tracks.length) {
        return { tracks, videoDetails: pr.videoDetails || {}, source: "innertube" };
      }
    } catch (err) {
      debug.push({ step: `innertube:${client.name}`, error: String(err) });
    }
  }
  return null;
}

// YouTube treats Cloudflare's own fetch as a datacenter request and answers the
// player call with LOGIN_REQUIRED. A real browser on the same network does not
// get that answer, so fall back to Cloudflare's managed headless Chrome.
async function tracksFromBrowserRendering(videoId, env, debug) {
  const accountId = env?.CF_ACCOUNT_ID;
  const token = env?.CF_BROWSER_RENDERING_TOKEN;
  if (!accountId || !token) {
    debug.push({ step: "browser-rendering", configured: false });
    return null;
  }
  const budget = browserBudgetLeft();
  debug.push({ step: "browser-budget", leftMs: budget, spentMs: spend.ms });
  if (budget <= 0) {
    debug.push({ step: "browser-rendering", skipped: "daily browser budget spent" });
    return { budgetExhausted: true };
  }
  // One browser pass per lookup: "load" costs about 4 s of browser time and
  // reliably has the player response. A second pass is only worth it when the
  // page itself did not come back - if the player response arrived with an
  // empty caption list, the video simply has no captions, and paying for
  // another browser session would not change that answer.
  const attempts = [
    { waitUntil: "load", timeout: 45000 },
    { waitUntil: "networkidle2", timeout: 45000 },
  ];
  for (const attempt of attempts) {
    if (browserBudgetLeft() <= 0) break;
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/browser-rendering/content`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            url: `https://www.youtube.com/watch?v=${videoId}&hl=en&gl=US`,
            rejectResourceTypes: ["image", "media", "font", "stylesheet"],
            gotoOptions: attempt,
          }),
        }
      );
      const browserMs = Number(res.headers.get("X-Browser-Ms-Used") || 0) || 0;
      if (browserMs) recordBrowserSpend(browserMs);
      if (res.status === 429) {
        const body = await res.text().catch(() => "");
        if (/time limit exceeded for today/i.test(body)) {
          markBrowserExhausted();
          debug.push({ step: "browser-rendering", status: 429, exhausted: "daily limit" });
          return { budgetExhausted: true };
        }
        markRateLimited();
        debug.push({ step: "browser-rendering", status: 429, rateLimited: true });
        break;
      }
      if (!res.ok) {
        debug.push({ step: "browser-rendering", status: res.status, waitUntil: attempt.waitUntil });
        continue;
      }
      const data = await res.json();
      const html = typeof data?.result === "string" ? data.result : "";
      const pr = html ? playerResponseFromHtml(html) : null;
      const tracks = pr?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
      debug.push({
        step: "browser-rendering",
        status: res.status,
        waitUntil: attempt.waitUntil,
        bytes: html.length,
        tracks: tracks.length,
        browserMs: browserMs || null,
      });
      // A player response is a definitive answer, tracks or not.
      if (pr) {
        return {
          tracks,
          videoDetails: pr.videoDetails || {},
          source: "browser-rendering",
          browserMs: Math.round(browserMs),
        };
      }
    } catch (err) {
      debug.push({ step: "browser-rendering", waitUntil: attempt.waitUntil, error: String(err) });
    }
  }
  // We got here without an answer. If the browser is unavailable - because the
  // day's allowance is gone or because we are rate limited right now - say so,
  // instead of telling the visitor the video has no captions.
  if (browserBudgetLeft() <= 0) {
    debug.push({
      step: "browser-rendering",
      skipped: Date.now() < spend.blockedUntil ? "daily browser budget spent" : "rate limited",
    });
    return { budgetExhausted: true };
  }
  // The browser ran but never handed back a usable page. That is a failure on
  // our side, not a statement about the video, so do not fall through to
  // "no caption track".
  return { browserFailed: true };
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
}

function parseJson3(raw) {
  const data = JSON.parse(raw);
  const out = [];
  for (const ev of data.events || []) {
    if (!ev.segs) continue;
    const text = ev.segs
      .map((s) => (s && s.utf8 ? s.utf8 : ""))
      .join("")
      .replace(/\n/g, " ")
      .trim();
    if (!text) continue;
    out.push({ start: (ev.tStartMs || 0) / 1000, duration: (ev.dDurationMs || 0) / 1000, text: decodeEntities(text) });
  }
  return out;
}

function parseXmlCaptions(raw) {
  const out = [];
  const re = /<text\s+start="([^"]*)"(?:\s+dur="([^"]*)")?[^>]*>([\s\S]*?)<\/text>/g;
  let m;
  while ((m = re.exec(raw)) !== null) {
    const text = decodeEntities(m[3].replace(/<[^>]+>/g, "").replace(/\n/g, " ").trim());
    if (!text) continue;
    out.push({ start: parseFloat(m[1] || "0") || 0, duration: parseFloat(m[2] || "0") || 0, text });
  }
  return out;
}

function cleanSegments(segments) {
  const seen = new Set();
  return segments.filter((s) => {
    const key = s.start + "|" + s.text;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function captionUrl(base, fmt) {
  let url = String(base).replace(/\\u0026/g, "&");
  url = url.replace(/([?&])fmt=[^&]*/g, "$1").replace(/[?&]+$/, "");
  return url + (url.includes("?") ? "&" : "?") + "fmt=" + fmt;
}

// Best effort: if this edge is not being asked for a proof-of-origin token,
// read the caption here so the page does not have to mint one.
async function fetchSegments(baseUrl, debug) {
  for (const fmt of ["json3", "srv1"]) {
    try {
      const res = await fetch(captionUrl(baseUrl, fmt), {
        headers: { "User-Agent": DESKTOP_UA, "Accept-Language": "en-US,en;q=0.9", Cookie: CONSENT_COOKIE },
      });
      const raw = res.ok ? await res.text() : "";
      debug.push({ step: `timedtext:${fmt}`, status: res.status, bytes: raw.length });
      if (!raw) continue;
      const segments = cleanSegments(fmt === "json3" ? parseJson3(raw) : parseXmlCaptions(raw));
      if (segments.length) return segments;
    } catch (err) {
      debug.push({ step: `timedtext:${fmt}`, error: String(err) });
    }
  }
  return null;
}

function trackName(track) {
  return track?.name?.simpleText || track?.name?.runs?.[0]?.text || track?.languageCode || "unknown";
}

function orderTracks(tracks) {
  const score = (t) => {
    if ((t.languageCode || "").toLowerCase().startsWith("en")) return 0;
    if (t.kind !== "asr") return 1;
    return 2;
  };
  return tracks.slice().sort((a, b) => score(a) - score(b));
}

async function handle(input, env, diag) {
  const debug = [];
  const videoId = extractVideoId(input);
  if (!videoId) {
    return json({ ok: false, code: "bad_url", message: "That does not look like a YouTube video link." }, 400);
  }

  const found =
    (await tracksFromPlainFetch(videoId, debug)) ||
    (await tracksFromBrowserRendering(videoId, env, debug));

  // The browser fallback is rationed. When it is unavailable or did not come
  // back with a usable page, the honest answer is "unavailable", not a fake
  // "no captions found".
  if (found && (found.budgetExhausted || found.browserFailed)) {
    return json(
      {
        ok: false,
        code: "lookup_unavailable",
        message:
          "The caption lookup is unavailable right now. There is nothing wrong with your link - try it again later.",
        ...(diag ? { debug } : {}),
      },
      503,
      { "X-Browser-Budget-Left": "0" }
    );
  }

  if (!found || !found.tracks.length) {
    return json(
      {
        ok: false,
        code: "no_caption_track",
        message:
          "YouTube did not return any caption track for this video. That usually means the video has no captions at all, or it is private, members-only, age-restricted or removed. This page reads captions that already exist - it cannot transcribe audio.",
        ...(diag ? { debug } : {}),
      },
      404
    );
  }

  const tracks = orderTracks(found.tracks).map((t) => ({
    languageCode: t.languageCode,
    languageName: trackName(t),
    isGenerated: t.kind === "asr",
    url: captionUrl(t.baseUrl, "json3"),
  }));

  const segments = await fetchSegments(found.tracks[0].baseUrl, debug);

  return json(
    {
      ok: true,
      videoId,
      title: found.videoDetails?.title || null,
      author: found.videoDetails?.author || null,
      lengthSeconds: Number(found.videoDetails?.lengthSeconds || 0) || null,
      source: found.source,
      tracks,
      ...(segments ? { segments, text: segments.map((s) => s.text).join(" ") } : {}),
      ...(diag ? { debug } : {}),
    },
    200,
    // YouTube signs these caption URLs for about 7 hours, so an hour of cache
    // is safe. Every repeat lookup inside that hour costs no browser time at all.
    { "Cache-Control": "public, max-age=3600", "X-Caption-Source": found.source || "unknown" }
  );
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const input = url.searchParams.get("v") || url.searchParams.get("url");
  const diag = diagAllowed(url.searchParams.get("diag"), env);
  if (!input) return json({ ok: false, code: "missing_param", message: "Missing ?v=<youtube url>" }, 400);
  // Cache on the video id, not on whatever form of the link was pasted, so
  // "youtu.be/x", "watch?v=x" and "youtube.com/shorts/x" share one entry.
  const videoId = extractVideoId(input);
  const cacheUrl = videoId
    ? new URL(`https://instascript.app/api/youtube-transcript?v=${videoId}`)
    : new URL(request.url);
  if (!diag) {
    const hit = await caches.default.match(cacheUrl);
    if (hit) return hit;
  }
  const response = await handle(input, env, diag);
  if (!diag && response.ok) {
    try {
      await caches.default.put(cacheUrl, response.clone());
    } catch {
      /* caching is best effort */
    }
  }
  return response;
}

export async function onRequestPost({ request, env }) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const input = body.url || body.v || body.videoId;
  const diag = diagAllowed(body.diag, env);
  // POST gets the same cache treatment as GET. Without it, posting the same
  // link over and over would start a fresh browser session every time - a
  // wider hole than the diag switch ever was.
  const videoId = extractVideoId(input);
  const cacheUrl = videoId
    ? new URL(`https://instascript.app/api/youtube-transcript?v=${videoId}`)
    : new URL(request.url);
  if (!diag) {
    const hit = await caches.default.match(cacheUrl);
    if (hit) return hit;
  }
  const response = await handle(input, env, diag);
  if (!diag && response.ok) {
    try {
      await caches.default.put(cacheUrl, response.clone());
    } catch {
      /* caching is best effort */
    }
  }
  return response;
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}
