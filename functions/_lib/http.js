export function upstreamError(code) {
  const error = new Error(code);
  error.code = code;
  return error;
}

export async function readBoundedBody(response, maximum, { timeout } = {}) {
  const declared = response.headers.get("Content-Length");
  if (declared !== null && Number(declared) > maximum) {
    await response.body?.cancel();
    throw upstreamError("too_large");
  }
  if (!response.body) return new Uint8Array();
  const reader = response.body.getReader(), parts = [];
  let length = 0, timedOut = false;
  const timer = timeout ? setTimeout(() => { timedOut = true; reader.cancel().catch(() => {}); }, timeout) : null;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (timedOut) throw upstreamError("upstream_timeout");
      if (done) break;
      length += value.byteLength;
      if (length > maximum) { await reader.cancel(); throw upstreamError("too_large"); }
      parts.push(value);
    }
  } finally { if (timer) clearTimeout(timer); reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) { bytes.set(part, offset); offset += part.length; }
  return bytes;
}

export async function boundedFetch(url, { options = {}, allowUrl, maximum = 4 * 1024 * 1024, timeout = 15000, maxRedirects = 3, validateHeaders } = {}) {
  const controller = new AbortController();
  let timedOut = false;
  const abort = () => controller.abort();
  if (options.signal?.aborted) throw upstreamError("cancelled");
  options.signal?.addEventListener("abort", abort, { once: true });
  const timer = setTimeout(() => { timedOut = true; controller.abort(); }, timeout);
  try {
    let target = new URL(url);
    for (let redirects = 0; ; redirects++) {
      if (allowUrl && !allowUrl(target)) throw upstreamError("blocked_redirect");
      const response = await fetch(target.toString(), { ...options, signal: controller.signal, redirect: "manual" });
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get("Location");
        await response.body?.cancel();
        if (!location || redirects >= maxRedirects) throw upstreamError("invalid_redirect");
        target = new URL(location, target);
        continue;
      }
      if (validateHeaders) {
        try { validateHeaders(response); } catch (error) { await response.body?.cancel(); throw error; }
      }
      const bytes = await readBoundedBody(response, maximum);
      return { response, bytes };
    }
  } catch (error) {
    if (timedOut) throw upstreamError("upstream_timeout");
    if (options.signal?.aborted) throw upstreamError("cancelled");
    throw error.code ? error : upstreamError("upstream_failed");
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener("abort", abort);
  }
}
