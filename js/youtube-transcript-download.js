// youtube-transcript-download page logic
// 1. ask this site's own endpoint which caption tracks YouTube issued for the video
// 2. YouTube only hands the caption text to a browser that can produce a
//    proof-of-origin token, so the visitor's own browser mints one and fetches
//    the caption directly from YouTube
// 3. the file is then built in this browser and saved by this browser - it is
//    never uploaded and never passes through a server

const API = "/api/youtube-transcript";
const REQUEST_KEY = "O43z0dpjhgX20SCx4KAo";
const CVER = "2.20260916.01.00";

const $ = (id) => document.getElementById(id);

const els = {
  form: $("ytForm"),
  input: $("urlInput"),
  button: $("getBtn"),
  status: $("statusBox"),
  statusText: $("statusText"),
  error: $("errorBox"),
  section: $("transcriptSection"),
  output: $("transcriptOutput"),
  meta: $("videoMeta"),
  fileInfo: $("fileInfo"),
  trackRow: $("trackRow"),
  copy: $("copyBtn"),
  txt: $("downloadTxtBtn"),
  srt: $("downloadSrtBtn"),
  tsToggle: $("tsToggle"),
  plainToggle: $("plainToggle"),
};

let state = {
  segments: [],
  title: "",
  videoId: "",
  mode: "timestamps",
};

function show(el) {
  el.classList.remove("hidden");
}
function hide(el) {
  el.classList.add("hidden");
}
function setStatus(msg) {
  els.statusText.textContent = msg;
  show(els.status);
}
function fail(msg) {
  els.error.textContent = msg;
  show(els.error);
  hide(els.status);
}

function formatTime(seconds) {
  const total = Math.max(0, Math.floor(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

function kb(bytes) {
  return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;
}

function render() {
  if (!state.segments.length) return;
  els.output.innerHTML = "";
  if (state.mode === "timestamps") {
    for (const seg of state.segments) {
      const p = document.createElement("p");
      const stamp = document.createElement("span");
      stamp.className = "timestamp";
      stamp.textContent = `[${formatTime(seg.start)}] `;
      p.appendChild(stamp);
      p.appendChild(document.createTextNode(seg.text));
      els.output.appendChild(p);
    }
  } else {
    const p = document.createElement("p");
    p.textContent = state.segments.map((s) => s.text).join(" ");
    els.output.appendChild(p);
  }
  show(els.section);
  updateFileInfo();
}

function plainText() {
  return state.segments.map((s) => s.text).join(" ");
}

function timestampedText() {
  return state.segments.map((s) => `[${formatTime(s.start)}] ${s.text}`).join("\n");
}

function currentText() {
  return state.mode === "timestamps" ? timestampedText() : plainText();
}

// SRT: one cue per caption line, separated by a blank line. The times come from
// the caption track itself - start and duration are fields YouTube sends with
// each line, so nothing here is estimated.
function toSrt(segments) {
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = (t) => {
    const ms = Math.max(0, Math.round(t * 1000));
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${pad(h)}:${pad(m)}:${pad(s)},${String(ms % 1000).padStart(3, "0")}`;
  };
  return segments
    .map((seg, i) => {
      const start = seg.start;
      const end = seg.start + (seg.duration || 2);
      return `${i + 1}\n${stamp(start)} --> ${stamp(end)}\n${seg.text}\n`;
    })
    .join("\n");
}

function updateFileInfo() {
  if (!els.fileInfo || !state.segments.length) return;
  const txt = new Blob([currentText()], { type: "text/plain;charset=utf-8" }).size;
  const srt = new Blob([toSrt(state.segments)], { type: "text/plain;charset=utf-8" }).size;
  els.fileInfo.textContent =
    `${state.segments.length} lines · TXT ${kb(txt)} · SRT ${kb(srt)} · ${state.segments.length} SRT cues · saved as ${baseName()}.txt / .srt`;
  show(els.fileInfo);
}

function download(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function baseName() {
  const clean = (state.title || state.videoId || "youtube-transcript")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
  return clean || "youtube-transcript";
}

/* ---------- proof-of-origin token (minted in this browser) ---------- */

let potLoader = null;

function loadPotLibrary() {
  if (!potLoader) {
    potLoader = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "/js/yt-pot.js";
      s.onload = () => (window.YTPOT ? resolve(window.YTPOT) : reject(new Error("library did not load")));
      s.onerror = () => reject(new Error("could not load the token helper"));
      document.head.appendChild(s);
    });
  }
  return potLoader;
}

async function mintPot(videoId) {
  const Y = await loadPotLibrary();
  const fetchFn = window.fetch.bind(window);
  const challenge = await Y.getChallenge({
    requestKey: REQUEST_KEY,
    fetchFunction: fetchFn,
    useYouTubeAPI: false,
  });
  const ij = challenge.interpreterJavascript;
  if (ij && ij.privateDoNotAccessOrElseSafeScriptWrappedValue) {
    new Function(ij.privateDoNotAccessOrElseSafeScriptWrappedValue)();
  } else if (challenge.interpreterUrl && challenge.interpreterUrl.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = challenge.interpreterUrl.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue;
      s.onload = resolve;
      s.onerror = () => reject(new Error("could not load YouTube's checker"));
      document.head.appendChild(s);
    });
  }
  const client = await Y.BotGuardClient.create({
    program: challenge.program,
    globalName: challenge.globalName,
    globalObject: window,
  });
  const webPoSignalOutput = [];
  const snapshot = await client.snapshot({ webPoSignalOutput });
  const itResponse = await fetchFn(Y.buildURL("GenerateIT", false), {
    method: "POST",
    headers: Y.getHeaders(),
    body: JSON.stringify([REQUEST_KEY, snapshot]),
  });
  if (!itResponse.ok) throw new Error("YouTube refused the browser check");
  const itJson = await itResponse.json();
  const integrityToken = Array.isArray(itJson) ? itJson[0] : null;
  if (!integrityToken) throw new Error("no integrity token");
  const minter = await Y.WebPoMinter.create({ integrityToken }, webPoSignalOutput);
  const pot = await minter.mintAsWebsafeString(videoId);
  if (!pot) throw new Error("no token minted");
  return pot;
}

function withTimeout(promise, ms, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms)),
  ]);
}

/* ---------- caption fetch ---------- */

function clientParams() {
  const ua = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
  let browser = "Chrome";
  let version = "152";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\//.test(ua)) browser = "Opera";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Chrome\//.test(ua)) browser = "Chrome";
  else if (/Safari\//.test(ua)) browser = "Safari";
  const m = ua.match(/(?:Chrome|Edg|OPR|Firefox|Version)\/(\d+)/);
  if (m) version = m[1];
  let os = "Windows";
  let osVersion = "10.0";
  if (/Android (\d+(\.\d+)*)/.test(ua)) {
    os = "Android";
    osVersion = ua.match(/Android (\d+(\.\d+)*)/)[1];
  } else if (/iPhone|iPad|iPod/.test(ua)) {
    os = "iOS";
    const im = ua.match(/OS (\d+)_/);
    osVersion = im ? im[1] + ".0" : "17.0";
  } else if (/Mac OS X (\d+[._]\d+)/.test(ua)) {
    os = "Macintosh";
    osVersion = ua.match(/Mac OS X (\d+[._]\d+)/)[1].replace("_", ".");
  } else if (/Linux/.test(ua)) {
    os = "Linux";
  }
  const p = new URLSearchParams();
  p.set("potc", "1");
  p.set("c", "WEB");
  p.set("cver", CVER);
  p.set("cbr", browser);
  p.set("cbrver", version + ".0.0.0");
  p.set("cplayer", "UNIPLAYER");
  p.set("cos", os);
  p.set("cosver", osVersion);
  p.set("cplatform", isMobile ? "MOBILE" : "DESKTOP");
  p.set("xorb", "2");
  p.set("xobt", "3");
  p.set("xovt", "3");
  return p.toString();
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
}

function parseJson3(raw) {
  const data = JSON.parse(raw);
  const out = [];
  for (const ev of data.events || []) {
    if (!ev.segs) continue;
    const text = decodeEntities(
      ev.segs
        .map((s) => (s && s.utf8 ? s.utf8 : ""))
        .join("")
        .replace(/\n/g, " ")
        .trim()
    );
    if (!text) continue;
    out.push({ start: (ev.tStartMs || 0) / 1000, duration: (ev.dDurationMs || 0) / 1000, text });
  }
  return out;
}

function pickTrack(tracks) {
  if (!tracks || !tracks.length) return null;
  const select = $("langSelect");
  const wanted = select && select.value;
  if (wanted) {
    const hit = tracks.find((t) => t.languageCode === wanted);
    if (hit) return hit;
  }
  return tracks[0];
}

async function run(event) {
  event.preventDefault();
  hide(els.error);
  hide(els.section);
  els.button.disabled = true;
  const url = els.input.value.trim();
  if (!url) {
    els.button.disabled = false;
    fail("Paste a YouTube link first.");
    return;
  }

  setStatus("Looking up the caption tracks for this video...");
  let meta;
  try {
    const response = await fetch(API + "?v=" + encodeURIComponent(url));
    meta = await response.json();
  } catch (err) {
    els.button.disabled = false;
    fail("Could not reach this site's caption service. Check your connection and try again.");
    return;
  }
  if (!meta.ok) {
    els.button.disabled = false;
    fail(meta.message || "This lookup came back with no caption track. Try it once more.");
    return;
  }

  state.videoId = meta.videoId;
  state.title = meta.title || "";

  const select = $("langSelect");
  if (select && meta.tracks && meta.tracks.length > 1) {
    // Keep the language the visitor already picked: rebuilding the list wipes
    // the current value, which used to send the second lookup back to English.
    const previous = select.value;
    select.innerHTML = meta.tracks
      .map(
        (t) =>
          `<option value="${t.languageCode}">${t.languageName}${t.isGenerated ? " (auto)" : ""}</option>`
      )
      .join("");
    if (previous && Array.from(select.options).some((o) => o.value === previous)) {
      select.value = previous;
    }
    show(els.trackRow);
  } else if (select) {
    hide(els.trackRow);
  }

  if (meta.segments && meta.segments.length) {
    state.segments = meta.segments;
    finish(meta);
    return;
  }

  const track = pickTrack(meta.tracks);
  if (!track) {
    els.button.disabled = false;
    fail("This lookup came back with no caption track. Try it once more.");
    return;
  }

  setStatus("Asking your browser to pass YouTube's bot check...");
  let pot;
  try {
    pot = await withTimeout(mintPot(meta.videoId), 20000, "the browser check took too long");
  } catch (err) {
    els.button.disabled = false;
    fail(
      "YouTube asked this browser for a proof-of-origin token and it could not be produced (" +
        err.message +
        "). A strict privacy setting or an extension that blocks Google scripts usually causes this. Try another browser or turn the blocker off for this page."
    );
    return;
  }

  setStatus("Reading the caption track...");
  let raw = "";
  try {
    const target = track.url + "&" + clientParams() + "&pot=" + encodeURIComponent(pot);
    const response = await fetch(target);
    raw = await response.text();
  } catch (err) {
    els.button.disabled = false;
    fail("YouTube refused the caption request from this page. Try again in a moment.");
    return;
  }

  let segments = [];
  try {
    segments = parseJson3(raw);
  } catch (err) {
    segments = [];
  }
  if (!segments.length) {
    els.button.disabled = false;
    fail(
      "This video has a caption track, but YouTube sent back nothing for it. That happens when the captions were switched off after publishing, when auto captions have not been generated yet, or when the track is empty."
    );
    return;
  }
  state.segments = segments;
  finish(meta, track);
}

function finish(meta, track) {
  els.button.disabled = false;
  hide(els.status);
  const bits = [];
  if (meta.title) bits.push(meta.title);
  if (meta.author) bits.push(meta.author);
  if (meta.lengthSeconds) bits.push(formatTime(meta.lengthSeconds));
  bits.push(`${state.segments.length} lines`);
  if (track) bits.push(track.languageName + (track.isGenerated ? " (auto-generated)" : ""));
  els.meta.textContent = bits.join(" · ");
  show(els.meta);
  render();
}

els.form.addEventListener("submit", run);

els.tsToggle.addEventListener("click", () => {
  state.mode = "timestamps";
  els.tsToggle.classList.add("active");
  els.plainToggle.classList.remove("active");
  render();
});
els.plainToggle.addEventListener("click", () => {
  state.mode = "plain";
  els.plainToggle.classList.add("active");
  els.tsToggle.classList.remove("active");
  render();
});

els.copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(currentText());
    els.copy.classList.add("copied");
    els.copy.textContent = "Copied";
    setTimeout(() => {
      els.copy.classList.remove("copied");
      els.copy.innerHTML = "Copy";
    }, 1500);
  } catch (err) {
    fail("Your browser blocked the clipboard. Select the text and copy it manually.");
  }
});

els.txt.addEventListener("click", () => {
  download(baseName() + ".txt", currentText());
});

els.srt.addEventListener("click", () => {
  download(baseName() + ".srt", toSrt(state.segments));
});
