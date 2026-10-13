// Public Instagram media proxy: validate every hop, stream with bounded bytes/time.
const ALLOWED_DOMAINS = ["cdninstagram.com", "fbcdn.net", "instagram.com"];
const MAX_MEDIA_BYTES = 100 * 1024 * 1024;
const HEADERS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
function allowed(value) {
  try {
    const url = new URL(value), host = url.hostname.toLowerCase().replace(/\.$/, "");
    return url.protocol === "https:" && !url.username && !url.password && (!url.port || url.port === "443")
      && ALLOWED_DOMAINS.some(domain => host === domain || host.endsWith("." + domain));
  } catch { return false; }
}
function failure(code, message, status) { return Response.json({ code, error: message }, { status, headers: HEADERS }); }
function mediaType(header, prefix) {
  const text = new TextDecoder().decode(prefix.slice(0, 128)).trimStart();
  if (/^[<{\[]/.test(text)) return null;
  const type = (header || "").split(";")[0].trim().toLowerCase();
  if (/^(audio|video)\//.test(type)) return type;
  if (type && type !== "application/octet-stream") return null;
  const ascii = new TextDecoder().decode(prefix.slice(0, 12));
  if (ascii.startsWith("RIFF") && ascii.slice(8, 12) === "WAVE") return "audio/wav";
  if (ascii.slice(4, 8) === "ftyp") return "video/mp4";
  if (ascii.startsWith("OggS")) return "audio/ogg";
  if (ascii.startsWith("ID3") || (prefix[0] === 255 && (prefix[1] & 224) === 224)) return "audio/mpeg";
  if (ascii.startsWith("fLaC")) return "audio/flac";
  if (prefix[0] === 26 && prefix[1] === 69 && prefix[2] === 223 && prefix[3] === 163) return "video/webm";
  return null;
}
export async function onRequestGet({ request }) {
  const target = new URL(request.url).searchParams.get("url");
  if (!target) return failure("missing_url", "Missing media URL.", 400);
  if (!allowed(target)) return failure("blocked_url", "Use an HTTPS Instagram/Facebook CDN media URL.", 403);
  const abort = new AbortController();
  let timedOut = false, reader, finished = false;
  const cancelled = () => abort.abort();
  request.signal.addEventListener("abort", cancelled, { once: true });
  if (request.signal.aborted) abort.abort();
  const timer = setTimeout(() => { timedOut = true; abort.abort(); }, 90000);
  const cleanup = () => { if (finished) return; finished = true; clearTimeout(timer); request.signal.removeEventListener("abort", cancelled); };
  try {
    let current = target, response;
    for (let hops = 0; ; hops++) {
      if (!allowed(current)) return failure("blocked_redirect", "Media redirected outside the allowed CDN hosts.", 403);
      response = await fetch(current, { redirect: "manual", signal: abort.signal, headers: { Referer: "https://www.instagram.com/" } });
      if (![301, 302, 303, 307, 308].includes(response.status)) break;
      const location = response.headers.get("Location");
      await response.body?.cancel();
      if (!location || hops >= 3) return failure("invalid_redirect", "Media redirected too many times. Try a saved file.", 502);
      current = new URL(location, current).toString();
    }
    if (!response.ok) { await response.body?.cancel(); return failure("upstream_failed", "Media could not be retrieved. Try a public Reel or a saved file.", 502); }
    if (Number(response.headers.get("Content-Length")) > MAX_MEDIA_BYTES) {
      await response.body?.cancel(); return failure("too_large", "Media file is larger than the 100 MB limit.", 413);
    }
    if (!response.body) return failure("empty_media", "The media response was empty.", 502);
    reader = response.body.getReader();
    let first = await reader.read();
    if (!first.done && first.value.byteLength > MAX_MEDIA_BYTES) { await reader.cancel(); return failure("too_large", "Media file is larger than the 100 MB limit.", 413); }
    if (!first.done) {
      const parts = [first.value]; let length = first.value.byteLength;
      while (length < 12) { const next = await reader.read(); if (next.done) break; parts.push(next.value); length += next.value.byteLength; }
      const prefix = new Uint8Array(length); let offset = 0;
      for (const part of parts) { prefix.set(part, offset); offset += part.length; }
      first = { done: false, value: prefix };
    }
    if (first.done || !first.value.length) { await reader.cancel(); return failure("empty_media", "The media response was empty.", 502); }
    let bytes = first.value.byteLength;
    const type = mediaType(response.headers.get("Content-Type"), first.value);
    if (!type) { await reader.cancel(); return failure("unsupported_media", "The upstream response is not supported audio/video media.", 415); }
    if (bytes > MAX_MEDIA_BYTES) { await reader.cancel(); return failure("too_large", "Media file is larger than the 100 MB limit.", 413); }
    const stream = new ReadableStream({
      start(controller) { controller.enqueue(first.value); },
      async pull(controller) {
        try {
          const part = await reader.read();
          if (part.done) { cleanup(); reader.releaseLock(); controller.close(); return; }
          bytes += part.value.byteLength;
          if (bytes > MAX_MEDIA_BYTES) { await reader.cancel(); throw new Error("Media exceeds the size limit"); }
          controller.enqueue(part.value);
        } catch { cleanup(); abort.abort(); controller.error(new Error("Media transfer interrupted; retry with a saved file under 100 MB.")); }
      },
      async cancel() { cleanup(); abort.abort(); await reader.cancel().catch(() => {}); }
    });
    const headers = { ...HEADERS, "Content-Type": type, "X-Content-Type-Options": "nosniff" };
    const declared = response.headers.get("Content-Length");
    if (declared && Number.isFinite(Number(declared))) headers["Content-Length"] = declared;
    return new Response(stream, { headers });
  } catch {
    return failure(timedOut ? "upstream_timeout" : "upstream_failed", timedOut ? "Media retrieval timed out. Retry or use a saved file." : "Media retrieval failed. Retry or use a saved file.", timedOut ? 504 : 502);
  } finally {
    // Streaming responses own the timeout until consumption finishes or cancels.
    if (!reader || finished) cleanup();
    else if (reader.closed) reader.closed.then(cleanup, cleanup);
  }
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: HEADERS }); }
