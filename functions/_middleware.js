import catalog from "../tool-catalog.json";
import { checkRequestLimit } from "./_lib/guards.js";

// Cloudflare Pages middleware for InstaScript.
// Serves agent-discovery documents, Markdown negotiation, the public read API
// and the MCP endpoint. Everything else falls through to the static assets.

const ORIGIN = catalog.origin;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization, MCP-Protocol-Version",
  "Access-Control-Max-Age": "86400",
};

const LINK_HEADER =
  '</.well-known/api-catalog>; rel="api-catalog", ' +
  '</openapi.json>; rel="service-desc", ' +
  '</ai/>; rel="service-doc", ' +
  '</.well-known/ai-catalog.json>; rel="describedby"';

const PAGES = catalog.pages;

const BENCH_FALLBACK = [
  { run: 1, file: "jfk_11s.wav", audio_seconds: 11, wall_clock_seconds: 16.89, includes_model_load: true, output_chars: 120 },
  { run: 2, file: "jfk_11s.wav", audio_seconds: 11, wall_clock_seconds: 6.49, includes_model_load: false, output_chars: 120 },
  { run: 3, file: "jfk_30s.wav", audio_seconds: 30, wall_clock_seconds: 8.98, includes_model_load: false, output_chars: 318 },
  { run: 4, file: "jfk_60s.wav", audio_seconds: 60, wall_clock_seconds: 16.06, includes_model_load: false, output_chars: 603 },
  { run: 5, file: "jfk_120s.wav", audio_seconds: 120, wall_clock_seconds: 28.58, includes_model_load: false, output_chars: 1160 },
];

const BENCH_SOURCE = "https://raw.githubusercontent.com/nickwebt800/instascript/main/benchmark/whisper-tiny-en-browser-benchmark.csv";
const BENCH_NOTE = "Historical single-model measurements from 2026-09-14 (whisper-tiny.en only). One WASM machine, single runs, not averages or current two-model end-to-end predictions. The closest row is an observation, not interpolation.";
const BENCH_PROVENANCE = {
  measurement_date: "2026-09-14",
  pipeline: "historical-whisper-tiny-en-only",
  current_pipeline: "whisper-tiny language detection then whisper-tiny.en transcription",
  current_source_url: ORIGIN + "/benchmark/current-english-browser-20261014.csv",
  method_url: ORIGIN + "/benchmark/README.md",
};
const SITEMAP_URL = ORIGIN + "/sitemap.xml";

const CONSTRUCTION = {
  status: "under_construction",
  available: false,
  capabilities_status: "planned_contract_only",
  message: "Coming soon. Authentication is unavailable.",
  launch_date: null,
};

function json(body, init) {
  const status = (init && init.status) || 200;
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=300",
    ...CORS,
  });
  if (init && init.headers) {
    for (const [k, v] of Object.entries(init.headers)) headers.set(k, v);
  }
  return new Response(JSON.stringify(body, null, 2), { status, headers });
}

function text(body, contentType, init) {
  const status = (init && init.status) || 200;
  const headers = new Headers({
    "Content-Type": contentType,
    "Cache-Control": "public, max-age=300",
    ...CORS,
  });
  if (init && init.headers) {
    for (const [k, v] of Object.entries(init.headers)) headers.set(k, v);
  }
  return new Response(body, { status, headers });
}

/* ------------------------------------------------------------------ data */

async function loadBenchmark(env) {
  try {
    const r = await env.ASSETS.fetch(new Request(ORIGIN + "/benchmark/whisper-tiny-en-browser-benchmark.csv"));
    if (!r.ok) return BENCH_FALLBACK;
    const raw = (await r.text()).replace(/^\uFEFF/, "").trim();
    const lines = raw.split(/\r?\n/);
    const head = lines.shift().split(",");
    const rows = lines.filter(Boolean).map((line) => {
      const cells = line.split(",");
      const o = {};
      head.forEach((h, i) => (o[h.trim()] = cells[i]));
      return {
        run: Number(o.run),
        file: o.file,
        audio_seconds: Number(o.audio_seconds),
        wall_clock_seconds: Number(o.wall_clock_seconds),
        includes_model_load: String(o.includes_model_load).trim() === "yes",
        output_chars: Number(o.output_chars),
      };
    });
    return rows.length ? rows : BENCH_FALLBACK;
  } catch (e) {
    return BENCH_FALLBACK;
  }
}

async function skillDigest(env) {
  try {
    const r = await env.ASSETS.fetch(new Request(ORIGIN + "/ai/skills/site-lookup/SKILL.md"));
    if (!r.ok) return null;
    const bytes = await r.arrayBuffer();
    const hash = await crypto.subtle.digest("SHA-256", bytes);
    return "sha256:" + [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch (e) {
    return null;
  }
}

function matchPages(query) {
  const q = (query || "").toLowerCase().trim();
  if (!q) return PAGES;
  const words = q.split(/\s+/);
  const scored = PAGES.map((p) => {
    const hay = (p.title + " " + p.summary + " " + p.keywords.join(" ") + " " + p.url).toLowerCase();
    let score = 0;
    words.forEach((w) => {
      if (hay.includes(w)) score += 2;
    });
    if (p.title.toLowerCase().includes(q)) score += 5;
    return { p, score };
  }).filter((s) => s.score > 0);
  scored.sort((a, b) => b.score - a.score);
  return scored.length ? scored.map((s) => s.p) : [];
}

/* -------------------------------------------------------------- documents */

function apiCatalog() {
  return {
    linkset: [
      {
        anchor: ORIGIN + "/api/pages",
        "service-desc": [{ href: ORIGIN + "/openapi.json", type: "application/json" }],
        "service-doc": [{ href: ORIGIN + "/ai/", type: "text/html" }],
        status: [{ href: ORIGIN + "/api/pages", type: "application/json" }],
      },
    ],
  };
}

function serverCard() {
  return {
    $schema: "https://static.modelcontextprotocol.org/schemas/2025-09-29/server-card/draft/schema.json",
    name: "instascript-site-lookup",
    serverInfo: { name: "InstaScript Site Lookup", version: "1.0.0" },
    description: "Read-only lookup over InstaScript public pages and its measured in-browser transcription benchmark.",
    transport: { type: "streamable-http", endpoint: ORIGIN + "/mcp" },
    endpoint: ORIGIN + "/mcp",
    capabilities: { tools: { listChanged: false }, resources: {}, prompts: {} },
    authentication: { required: false },
    homepage: ORIGIN + "/ai/",
  };
}

function ardManifest() {
  return {
    specVersion: "1.0",
    host: { displayName: "InstaScript", identifier: "did:web:instascript.app" },
    entries: [
      {
        identifier: "urn:air:instascript.app:server:site-lookup",
        displayName: "InstaScript Site Lookup MCP server",
        type: "application/mcp-server-card+json",
        url: ORIGIN + "/.well-known/mcp/server-card.json",
        representativeQueries: [
          "which InstaScript page handles an mp3 file",
          "how long does a 30 second transcript take",
        ],
      },
      {
        identifier: "urn:air:instascript.app:api:pages",
        displayName: "InstaScript public page catalog",
        type: "application/json",
        url: ORIGIN + "/openapi.json",
        representativeQueries: [
          "find the TikTok transcript page",
          "what file types does InstaScript accept",
        ],
      },
      {
        identifier: "urn:air:instascript.app:skill:site-lookup",
        displayName: "InstaScript site lookup skill",
        type: "text/markdown",
        url: ORIGIN + "/ai/skills/site-lookup/SKILL.md",
        representativeQueries: [
          "how do I get text out of a TikTok video",
          "is my file too big for InstaScript",
        ],
      },
    ],
  };
}

function oauthAs() {
  return {
    ...CONSTRUCTION,
    issuer: ORIGIN,
    authorization_endpoint: ORIGIN + "/agent-auth/authorize",
    token_endpoint: ORIGIN + "/agent-auth/token",
    jwks_uri: ORIGIN + "/.well-known/jwks.json",
    registration_endpoint: ORIGIN + "/agent-auth/register",
    grant_types_supported: ["authorization_code", "urn:ietf:params:oauth:grant-type:jwt-bearer"],
    response_types_supported: ["code"],
    code_challenge_methods_supported: ["S256"],
    scopes_supported: ["site:read"],
    token_endpoint_auth_methods_supported: ["none"],
    agent_auth: {
      status: "under_construction",
      available: false,
      capabilities_status: "planned_contract_only",
      skill: ORIGIN + "/auth.md",
      register_uri: ORIGIN + "/agent-auth/register",
      claim_uri: ORIGIN + "/agent-auth/claim",
      identity_types_supported: ["anonymous"],
      anonymous: {
        status: "under_construction",
        available: false,
        capabilities_status: "planned_contract_only",
        credential_types_supported: ["access_token"],
      },
    },
  };
}

function oauthPrm() {
  return {
    ...CONSTRUCTION,
    message: "Coming soon. Existing public lookup remains available without authentication.",
    resource: ORIGIN,
    planned_resource_endpoint: ORIGIN + "/agent-auth/resource",
    authorization_servers: [ORIGIN],
    scopes_supported: ["site:read"],
    bearer_methods_supported: ["header"],
  };
}

const AUTH_MD = `# auth.md — InstaScript

> Status: **under construction**. Authentication is not available. Nothing here can be used
> to register, log in or obtain a token. The public read-only lookup remains open and needs
> no credentials.

## What exists today

- Public read API: \`GET /api/pages\`, \`GET /api/benchmark\`, \`POST /api/extract\` — no key, no login.
- MCP endpoint: \`POST ${ORIGIN}/mcp\` — read-only tools \`find_page\`, \`get_benchmark\`, \`site_info\`.
- Agent Skill: \`${ORIGIN}/ai/skills/site-lookup/SKILL.md\`.

## Planned, not active

- \`${ORIGIN}/agent-auth/register\`, \`/authorize\`, \`/token\`, \`/claim\` return HTTP 503 with
  \`temporarily_unavailable\`. They do not create accounts, store identity data, issue tokens
  or send email.
- \`${ORIGIN}/.well-known/jwks.json\` returns \`{"keys":[]}\`. It validates nothing.

## Agent registration (planned, not active)

This section documents the planned contract for **agent registration**. It is not
available today. Every endpoint below returns HTTP 503 and does nothing.

\`\`\`yaml
agent_auth:
  skill: ${ORIGIN}/auth.md
  register_uri: ${ORIGIN}/agent-auth/register
  claim_uri: ${ORIGIN}/agent-auth/claim
  identity_types_supported: [anonymous]
  anonymous:
    credential_types_supported: [access_token]
\`\`\`

- **register** — \`POST ${ORIGIN}/agent-auth/register\` (planned). Would let an agent register
  for anonymous access. Today: HTTP 503 \`temporarily_unavailable\`, no account is created and
  no data is stored.
- **claim** — \`POST ${ORIGIN}/agent-auth/claim\` (planned). Would let a registered anonymous
  agent claim an \`access_token\` credential. Today: HTTP 503.
- **credential types** — planned: \`access_token\` for anonymous agents. Nothing is issued today.

## Agent instructions (I-Lang)

::STATE{@AUTH, status:under_construction, available:false}
::RULE{do not call any /agent-auth/* path while available=false}
::RULE{use the public read-only endpoints instead; they need no credential}
::RULE{never present this document as working authentication}
::RULE{if you need something that requires an account, say so and stop}
`;

/* ------------------------------------------------------------------- MCP */

const TOOLS = [
  {
    name: "find_page",
    description: "Find the InstaScript page that handles a task, for example 'tiktok', 'mp3 to text' or 'facebook video'. Returns URLs, what each page accepts and its limits.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "Words describing the job. Empty returns every page." } },
    },
  },
  {
    name: "get_benchmark",
    description: "Historical 2026-09-14 whisper-tiny.en-only timings, not current two-model predictions. Pass length_seconds for the closest observed row, not interpolation. Current measurements are linked separately.",
    inputSchema: {
      type: "object",
      properties: { length_seconds: { type: "number", description: "Audio length in seconds." } },
    },
  },
  {
    name: "site_info",
    description: "What InstaScript does, the file types and links it accepts, and its limits (English speech recognition, 100 MB local files, and separate YouTube caption lookup).",
    inputSchema: { type: "object", properties: {} },
  },
];

async function mcpCall(name, args, env) {
  if (name === "find_page") {
    const pages = matchPages(args && args.query);
    return { query: args && args.query ? args.query : "", count: pages.length, source_url: SITEMAP_URL, pages };
  }
  if (name === "get_benchmark") {
    const rows = await loadBenchmark(env);
    const target = args && args.length_seconds;
    let out = rows;
    if (typeof target === "number") {
      out = rows.slice().sort(
        (a, b) => Math.abs(a.audio_seconds - target) - Math.abs(b.audio_seconds - target)
      ).slice(0, 1);
    }
    return {
      note: BENCH_NOTE,
      ...BENCH_PROVENANCE,
      source_url: BENCH_SOURCE,
      rows: out,
    };
  }
  if (name === "site_info") {
    return {
      name: "InstaScript",
      url: ORIGIN,
      does: "Transcribes English speech from Instagram Reels and local media in the browser; the separate YouTube tools read existing caption tracks.",
      accepts: { files: ["MP4", "MOV", "WebM", "MP3", "WAV", "M4A", "OGG"], max_file_size: "100 MB", links: ["public Instagram post and Reel URLs", "public YouTube URLs with existing captions (separate YouTube tools)"] },
      limits: ["speech recognition is English only (whisper-tiny.en)", "audio processed in ~30 second chunks", "language check failures and uncertain language stop transcription without claiming non-English speech", "written post descriptions are not speech transcripts", "YouTube tools cannot create captions", "TikTok and Facebook URLs are not fetched - upload the saved file", "no server-side transcription of arbitrary URLs"],
      privacy: "Local files and edits stay on-device. Instagram media is temporarily buffered in server memory with no-store responses. YouTube lookup responses, including available caption text, may be cached for one hour. No account history.",
      source_url: ORIGIN + "/about",
    };
  }
  return null;
}

async function handleMcp(request, env) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (request.method !== "POST") {
    return json(
      { jsonrpc: "2.0", error: { code: -32000, message: "Use POST for MCP Streamable HTTP requests." } },
      { status: 405, headers: { Allow: "POST, OPTIONS" } }
    );
  }
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, { status: 400 });
  }
  const id = body && body.id !== undefined ? body.id : null;
  const method = body && body.method;
  const out = (result) => json({ jsonrpc: "2.0", id, result });

  if (method === "initialize") {
    return out({
      protocolVersion: (body.params && body.params.protocolVersion) || "2025-06-18",
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: "InstaScript Site Lookup", version: "1.0.0" },
      instructions: "Read-only lookup over InstaScript pages and its measured transcription benchmark. No authentication.",
    });
  }
  if (method === "notifications/initialized" || (method || "").startsWith("notifications/")) {
    return new Response(null, { status: 202, headers: CORS });
  }
  if (method === "ping") return out({});
  if (method === "tools/list") return out({ tools: TOOLS });
  if (method === "tools/call") {
    const name = body.params && body.params.name;
    const args = (body.params && body.params.arguments) || {};
    const data = await mcpCall(name, args, env);
    if (data === null) {
      return json({ jsonrpc: "2.0", id, error: { code: -32602, message: "Unknown tool: " + name } });
    }
    return out({ content: [{ type: "text", text: JSON.stringify(data, null, 2) }], structuredContent: data });
  }
  return json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found: " + method } });
}

/* ------------------------------------------------------ 404 / not found */

// Every path this site actually serves, taken from the deployed file list.
// Cloudflare Pages currently answers an unmatched path with the home page and
// HTTP 200, which is a soft 404. Anything outside this list gets a real 404.
const KNOWN_FILES = new Set([
  ...catalog.pages.flatMap(page => ["/" + page.html, "/" + page.markdown]),
  "/LICENSE",
  "/README.md",
  "/ai/index.ilang",
  "/ai/skills/site-lookup/SKILL.md",
  "/assets/logo-256.png",
  "/assets/logo-512.png",
  "/app.js",
  "/benchmark/README.md",
  "/benchmark/whisper-tiny-en-browser-benchmark.csv",
  "/benchmark/current-english-browser-20261014.csv",
  "/data/README.md",
  "/data/browser-whisper-tools-comparison.csv",
  "/footer.js",
  "/txt-to-srt.js",
  "/vtt-to-srt.js",
  "/srt-to-vtt.js",
  "/ass-to-srt.js",
  "/subtitle-editor.js",
  "/srt-to-text.js",
  "/subtitle-translator.js",
  "/js/webmcp.js",
  "/js/youtube-transcript-download.js",
  "/js/youtube-transcript.js",
  "/js/youtube-transcript-view.js",
  "/youtube-transcript.css",
  "/js/yt-pot.js",
  "/openapi.json",
  "/robots.txt",
  "/sitemap.xml",
  "/style.css",
  "/tool-catalog.json",
  "/js/subtitles.js",
  "/js/transcript-result.js",
  "/js/transcript-markdown.js",
  "/js/media-review.js",
  "/js/transcript-transfer.js",
  "/js/transcript-view.js",
  "/js/transcript-demo.js",
  "/js/transcript-search.js",
  "/assets/demo/kennedy-1961.wav",
  "/assets/demo/kennedy-1961.json",
  "/assets/demo/SOURCE.md",
]);

// Endpoints that are produced by Functions rather than by a file on disk.
const KNOWN_ROUTES = new Set([
  "/api/extract",
  "/api/proxy",
  "/api/youtube-transcript",
  "/api/pages",
  "/api/benchmark",
  "/mcp",
  "/auth.md",
  "/.well-known/api-catalog",
  "/.well-known/mcp/server-card.json",
  "/.well-known/agent-skills/index.json",
  "/.well-known/ai-catalog.json",
  "/.well-known/oauth-authorization-server",
  "/.well-known/oauth-protected-resource",
  "/.well-known/jwks.json",
]);

function isServed(p) {
  if (KNOWN_ROUTES.has(p)) return true;
  if (p.startsWith("/agent-auth/")) return true;
  if (KNOWN_FILES.has(p)) return true;
  if (p.endsWith("/")) return KNOWN_FILES.has(p + "index.html");
  if (KNOWN_FILES.has(p + ".html")) return true;
  if (KNOWN_FILES.has(p + "/index.html")) return true;
  return false;
}

function redirectTrailingSlash(url) {
  if (!url.pathname.endsWith("/") || url.pathname === "/" || url.pathname === "/ai/") {
    return null;
  }
  const canonicalPath = url.pathname.slice(0, -1);
  if (!Object.prototype.hasOwnProperty.call(MD_MAP, canonicalPath)) return null;

  const location = new URL(url);
  location.pathname = canonicalPath;
  return new Response(null, {
    status: 301,
    headers: {
      Location: location.toString(),
      "Cache-Control": "public, max-age=3600",
      ...CORS,
    },
  });
}

const NOT_FOUND_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow">
<title>404 - Page not found | InstaScript</title>
<style>
  body { font: 16px/1.6 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
         margin: 0; padding: 48px 20px; max-width: 640px; color: #16181d; background: #fff; }
  h1 { font-size: 1.5rem; margin: 0 0 12px; }
  p { margin: 0 0 16px; }
  a { color: #0b5fff; }
  ul { padding-left: 20px; }
</style>
</head>
<body>
<h1>404 - Page not found</h1>
<p>That address does not exist on InstaScript. Nothing was removed and nothing moved; it was never here.</p>
<p>These pages are:</p>
<ul>
  <li><a href="/">Instagram Transcript</a></li>
  <li><a href="/youtube-transcript-download">YouTube Transcript Download</a></li>
  <li><a href="/subtitle-downloader">Subtitle Downloader Guide</a></li>
  <li><a href="/subtitle-converter">Subtitle Converter Guide</a></li>
  <li><a href="/translate-srt">Translate SRT Guide</a></li>
  <li><a href="/google-meet-transcript">Google Meet Transcript Guide</a></li>
  <li><a href="/youtube-transcript">YouTube Transcript</a></li>
  <li><a href="/youtube-shorts-transcript">YouTube Shorts Transcript</a></li>
  <li><a href="/twitter-video-transcript">Twitter Video Transcript</a></li>
  <li><a href="/video-to-text">Transcribe Video</a></li>
  <li><a href="/audio-to-text">Transcribe Audio</a></li>
  <li><a href="/mp3-to-text">MP3 to Text</a></li>
  <li><a href="/m4a-to-text">M4A to Text</a></li>
  <li><a href="/wav-to-text">WAV to Text</a></li>
  <li><a href="/voice-notes-to-text">Voice Notes to Text Review Guide</a></li>
  <li><a href="/voicemail-transcription">Voicemail Transcription</a></li>
  <li><a href="/zoom-transcript">Zoom Transcript</a></li>
  <li><a href="/tiktok-transcript">TikTok Transcript</a></li>
  <li><a href="/how-to-add-captions-on-tiktok">How to Add Captions on TikTok</a></li>
  <li><a href="/facebook-video-transcript">Facebook Video Transcript</a></li>
  <li><a href="/instagram-transcript-generator">Instagram Transcript Generator</a></li>
  <li><a href="/caption-generator">Caption Generator</a></li>
  <li><a href="/subtitle-generator">Subtitle Generator</a></li>
  <li><a href="/whatsapp-voice-to-text">WhatsApp Voice to Text</a></li>
  <li><a href="/subtitle-editor">Subtitle Editor</a></li>
  <li><a href="/txt-to-srt">TXT to SRT Converter</a></li>
  <li><a href="/vtt-to-srt">VTT to SRT Converter</a></li>
  <li><a href="/srt-to-vtt">SRT to VTT</a></li>
  <li><a href="/ass-to-srt">ASS to SRT Converter</a></li>
  <li><a href="/srt-to-text">SRT to Text Converter</a></li>
  <li><a href="/subtitle-translator">Subtitle Translator</a></li>
  <li><a href="/about">About</a></li>
  <li><a href="/contact">Contact</a></li>
</ul>
</body>
</html>
`;

function notFound(p) {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex",
    ...CORS,
  });
  if (p.endsWith(".txt")) {
    headers.set("Content-Type", "text/plain; charset=utf-8");
    return new Response("404 Not Found\n", { status: 404, headers });
  }
  headers.set("Content-Type", "text/html; charset=utf-8");
  return new Response(NOT_FOUND_HTML, { status: 404, headers });
}

/* --------------------------------------------------------------- markdown */

const MD_MAP = Object.fromEntries(catalog.pages.flatMap(page => [[page.path, "/" + page.markdown], ["/" + page.html, "/" + page.markdown]]));

function wantsMarkdown(request) {
  const ranges = (request.headers.get("Accept") || "").split(",").map(part => {
    const [type, ...params] = part.split(";");
    const param = params.find(value => /^\s*q=/i.test(value));
    const quality = param ? Number(param.split("=")[1]) : 1;
    return { type: type.trim().toLowerCase(), q: Number.isFinite(quality) && quality >= 0 && quality <= 1 ? quality : 0 };
  });
  const markdown = ranges.find(range => range.type === "text/markdown")?.q || 0;
  const html = ranges.find(range => range.type === "text/html")?.q;
  return markdown > 0 && (html === undefined || markdown >= html);
}

function estimateTokens(md) {
  return String(Math.max(1, Math.round(md.length / 4)));
}

/* -------------------------------------------------------------- middleware */

export async function onRequest(ctx) {
  const { request, env, next } = ctx;
  const url = new URL(request.url);
  const p = url.pathname;

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  const costly = (p === "/api/extract" && request.method === "POST")
    || (p === "/api/proxy" && request.method === "GET")
    || (p === "/api/youtube-transcript" && ["GET", "POST"].includes(request.method));
  if (costly) {
    const guard = await checkRequestLimit(request, env);
    if (!guard.allowed) {
      const message = guard.unavailable ? "Request guard is temporarily unavailable. Retry shortly."
        : "Too many link requests. Retry after " + guard.retryAfter + " seconds.";
      return json({ ok: false, code: guard.unavailable ? "guard_unavailable" : "rate_limited", error: message, message },
        { status: guard.unavailable ? 503 : 429, headers: { "Cache-Control": "no-store", "Retry-After": String(guard.retryAfter), "X-Robots-Tag": "noindex" } });
    }
  }

  try {
    switch (p) {
      case "/.well-known/api-catalog":
        return json(apiCatalog(), { headers: { "Content-Type": "application/linkset+json; charset=utf-8" } });
      case "/.well-known/mcp/server-card.json":
        return json(serverCard());
      case "/.well-known/agent-skills/index.json": {
        const digest = (await skillDigest(env)) || "sha256:0000000000000000000000000000000000000000000000000000000000000000";
        return json({
          $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
          skills: [
            {
              name: "site-lookup",
              type: "skill-md",
              description: "Retrieve actual public information from InstaScript: find the right page, read the measured transcription benchmark, and explain what the tool supports.",
              url: ORIGIN + "/ai/skills/site-lookup/SKILL.md",
              digest,
            },
          ],
        });
      }
      case "/.well-known/ai-catalog.json":
        return json(ardManifest());
      case "/.well-known/oauth-authorization-server":
        return json(oauthAs());
      case "/.well-known/oauth-protected-resource":
        return json(oauthPrm());
      case "/.well-known/jwks.json":
        return json({ keys: [], status: "under_construction", message: "No signing keys are published. Authentication is unavailable." });
      case "/auth.md":
        return text(AUTH_MD, "text/markdown; charset=utf-8");
      case "/ai/index.ilang": {
        try {
          const r = await env.ASSETS.fetch(new Request(ORIGIN + "/ai/index.ilang"));
          if (r && r.ok) return text(await r.text(), "text/plain; charset=utf-8");
        } catch (e) { /* fall through */ }
        break;
      }
      case "/mcp":
        return await handleMcp(request, env);
      case "/api/pages": {
        const q = url.searchParams.get("q") || "";
        const pages = matchPages(q);
        return json({ query: q, count: pages.length, source_url: SITEMAP_URL, pages });
      }
      case "/api/benchmark": {
        const rows = await loadBenchmark(env);
        const ls = url.searchParams.get("length_seconds");
        let out = rows;
        if (url.searchParams.has("length_seconds")) {
          const target = Number(ls);
          if (!Number.isFinite(target) || target <= 0) {
            return json({ error: "length_seconds must be a positive number." }, { status: 400 });
          }
          out = rows.slice().sort((a, b) => Math.abs(a.audio_seconds - target) - Math.abs(b.audio_seconds - target)).slice(0, 1);
        }
        return json({ note: BENCH_NOTE, ...BENCH_PROVENANCE, source_url: BENCH_SOURCE, rows: out });
      }
      default:
        break;
    }

    if (p.startsWith("/agent-auth/")) {
      return json(
        {
          status: "under_construction",
          available: false,
          error: "temporarily_unavailable",
          error_description: "Coming soon. No registration or token issuance is available. Use the public lookup service at " + ORIGIN + "/ai/.",
        },
        { status: 503, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Anything not on the served list is a real 404, not the home page.
    const trailingSlashRedirect = redirectTrailingSlash(url);
    if (trailingSlashRedirect) return trailingSlashRedirect;
    if (!isServed(p)) {
      return notFound(p);
    }

    // Markdown content negotiation
    if (wantsMarkdown(request)) {
      const mdPath = MD_MAP[p];
      if (mdPath) {
        try {
          const mdRes = await env.ASSETS.fetch(new Request(ORIGIN + mdPath));
          if (mdRes && mdRes.ok) {
            const body = await mdRes.text();
            return text(body, "text/markdown; charset=utf-8", {
              headers: {
                Vary: "Accept",
                "x-markdown-tokens": estimateTokens(body),
                "Cache-Control": "public, max-age=600",
              },
            });
          }
        } catch (e) {
          /* fall through to HTML */
        }
      }
    }
  } catch (err) {
    // Never break the human site because of a discovery document failure.
    return next();
  }

  const response = await next();
  try {
    const ct = response.headers.get("Content-Type") || "";
    if (response.status === 200 && ct.includes("text/html")) {
      const headers = new Headers(response.headers);
      const vary = (headers.get("Vary") || "").split(",").map(value => value.trim()).filter(Boolean);
      if (!vary.some(value => value.toLowerCase() === "accept")) vary.push("Accept");
      headers.set("Vary", vary.join(", "));
      const existing = headers.get("Link");
      headers.set("Link", existing ? existing + ", " + LINK_HEADER : LINK_HEADER);
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }
  } catch (e) {
    /* ignore */
  }
  return response;
}
