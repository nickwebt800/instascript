// Cloudflare Pages Function: /api/proxy
// Proxies video/audio downloads from Instagram CDN (bypasses CORS).
// GET /api/proxy?url=https://video.cdninstagram.com/...
// Only allows Instagram/Facebook CDN domains for security.

const ALLOWED_DOMAINS = [
  "cdninstagram.com",
  "fbcdn.net",
  "instagram.com",
];
const MAX_MEDIA_BYTES = 100 * 1024 * 1024;

function isAllowedHost(host) {
  const normalized = host.toLowerCase().replace(/\.$/, "");
  return ALLOWED_DOMAINS.some(
    (domain) => normalized === domain || normalized.endsWith("." + domain)
  );
}

function isAllowed(url) {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol) && isAllowedHost(parsed.hostname);
  } catch {
    return false;
  }
}

export async function onRequestGet({ request }) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const requestUrl = new URL(request.url);
  const targetUrl = requestUrl.searchParams.get("url");

  if (!targetUrl) {
    return Response.json(
      { error: "Missing url parameter." },
      { status: 400, headers: corsHeaders }
    );
  }

  if (!isAllowed(targetUrl)) {
    return Response.json(
      { error: "URL domain not allowed. Only Instagram/Facebook CDN URLs are permitted." },
      { status: 403, headers: corsHeaders }
    );
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://www.instagram.com/",
      },
    });

    if (!response.ok) {
      return Response.json(
        { error: `Failed to fetch video: status ${response.status}` },
        { status: 502, headers: corsHeaders }
      );
    }

    const contentLength = Number(response.headers.get("Content-Length"));
    if (Number.isFinite(contentLength) && contentLength > MAX_MEDIA_BYTES) {
      return Response.json(
        { error: "Media file is larger than the 100 MB limit." },
        { status: 413, headers: corsHeaders }
      );
    }

    if (!response.body) {
      return Response.json(
        { error: "The media response had no body." },
        { status: 502, headers: corsHeaders }
      );
    }

    const reader = response.body.getReader();
    const chunks = [];
    let totalBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_MEDIA_BYTES) {
        await reader.cancel();
        return Response.json(
          { error: "Media file is larger than the 100 MB limit." },
          { status: 413, headers: corsHeaders }
        );
      }
      chunks.push(value);
    }
    const blob = new Blob(chunks, {
      type: response.headers.get("Content-Type") || "video/mp4",
    });

    return new Response(blob, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "video/mp4",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    return Response.json(
      { error: `Proxy error: ${err.message}` },
      { status: 500, headers: corsHeaders }
    );
  }
}
