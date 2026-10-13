import { boundedFetch, readBoundedBody, upstreamError } from "../_lib/http.js";
import { guardedBrowserFetch } from "../_lib/guards.js";

// Cloudflare Pages Function: /api/extract
// Accepts POST { url: "https://instagram.com/reel/..." }
// Resolves playable media; caption metadata is not a speech transcript.
// Returns JSON { videoUrl, caption, type: "video" } or a non-success { error }.

export async function onRequestPost({ request, env }) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex",
  };

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const deadline = Date.now() + 55000;
  const remaining = () => { const ms = deadline - Date.now(); if (ms <= 0) throw upstreamError("upstream_timeout"); return ms; };
  try {
    let body;
    try { body = JSON.parse(new TextDecoder().decode(await readBoundedBody(new Response(request.body), 4096, { timeout: 5000 }))); }
    catch (error) { return Response.json({ error: error.code === "upstream_timeout" ? "Request body timed out. Retry shortly." : error.code === "too_large" ? "Request is too large." : "Send a JSON object with a public Instagram URL." }, { status: error.code === "upstream_timeout" ? 408 : error.code === "too_large" ? 413 : 400, headers: corsHeaders }); }
    const url = body?.url;

    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      parsedUrl = null;
    }

    if (
      !parsedUrl ||
      !["http:", "https:"].includes(parsedUrl.protocol) ||
      !/(^|\.)instagram\.com$/i.test(parsedUrl.hostname) || parsedUrl.username || parsedUrl.password || (parsedUrl.port && parsedUrl.port !== "443")
    ) {
      return Response.json(
        { error: "Please provide a valid Instagram URL." },
        { status: 400, headers: corsHeaders }
      );
    }

    const fetchPage = async (targetUrl) => {
      const target = new URL(targetUrl); target.protocol = "https:";
      const { response, bytes } = await boundedFetch(target, { maximum: 4 * 1024 * 1024, timeout: Math.min(7000, remaining()),
        options: { signal: request.signal, headers: { Accept: "text/html,application/xhtml+xml", "Accept-Language": "en-US,en;q=0.9", "Cache-Control": "no-cache" } },
        allowUrl: url => url.protocol === "https:" && /(^|\.)instagram\.com$/i.test(url.hostname) && !url.username && !url.password && (!url.port || url.port === "443") });
      return new Response(bytes, { status: response.status, headers: { "Content-Type": "text/html" } });
    };

    // Instagram increasingly serves a login/429 page at the canonical URL.
    // The public embed URL still contains the media JSON for public posts.
    let html = "";
    let pageResponse;
    try {
      pageResponse = await fetchPage(parsedUrl.toString());
      if (pageResponse.ok) html = await pageResponse.text();
    } catch {
      // Try the embed endpoint below.
    }

    const embedUrl = new URL(parsedUrl.toString());
    embedUrl.search = "";
    embedUrl.hash = "";
    embedUrl.pathname = embedUrl.pathname.replace(/\/+$/, "") + "/embed/";

    const extractVideoUrl = (source) => {
      const patterns = [
        /<meta\s+[^>]*property=["']og:video(?::url|:secure_url)?["'][^>]*content=["']([^"']+)["']/i,
        /<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:video(?::url|:secure_url)?["']/i,
        /\\?"video_url\\?"\s*:\s*\\?"([^"]+)\\?"/i,
      ];
      for (const pattern of patterns) {
        const match = source.match(pattern);
        if (match) {
          return match[1]
            .replace(/\\u0026/g, "&")
            .replace(/\\u00253b/g, ";")
            .replace(/\\+\//g, "/")
            .replace(/\\+$/, "")
            .replace(/&amp;/g, "&");
        }
      }
      return null;
    };

    let videoUrl = extractVideoUrl(html);

    if (!videoUrl) {
      const embedCandidates = [
        embedUrl.toString(),
        `${embedUrl.toString()}?__a=1`,
        `${embedUrl.toString()}?output=1`,
        `https://instagram.com${embedUrl.pathname}`,
        `https://m.instagram.com${embedUrl.pathname}`,
        `https://z-p42.www.instagram.com${embedUrl.pathname}`,
      ];
      for (const candidate of embedCandidates) {
        try {
          const embedResponse = await fetchPage(candidate);
          if (embedResponse.ok) {
            html = await embedResponse.text();
            videoUrl = extractVideoUrl(html);
            if (videoUrl) break;
          }
        } catch {
          // Try the next public embed host.
        }
      }
    }

    // If Instagram rate-limits the Pages fetch, use Cloudflare Browser
    // Rendering from the account edge to load the public embed page.
    if (!videoUrl && Date.now() < deadline && env?.CF_BROWSER_RENDERING_TOKEN && env?.CF_ACCOUNT_ID) {
      try {
        const renderResponse = await guardedBrowserFetch(env,
          `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/browser-rendering/content`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.CF_BROWSER_RENDERING_TOKEN}`,
              "Content-Type": "application/json",
            },
            signal: request.signal,
            body: JSON.stringify({ url: `${embedUrl.toString()}?__a=1`, gotoOptions: { timeout: Math.min(30000, remaining()), waitUntil: "domcontentloaded" } }),
          }, { deadline }
        );
        if (renderResponse.ok) {
          const rendered = await renderResponse.json();
          html = typeof rendered.result === "string" ? rendered.result : "";
          videoUrl = extractVideoUrl(html);
        }
      } catch {
        // Report the normal not-found message below.
      }
    }

    // Cloudflare egress IPs are sometimes rate-limited by Instagram. Jina's
    // reader can fetch the same public embed page and return its raw HTML.
    if (!videoUrl && Date.now() < deadline) {
      try {
        const jinaUrl = `https://r.jina.ai/http://${embedUrl.host}${embedUrl.pathname}`;
        const jina = await boundedFetch(jinaUrl, { maximum: 4 * 1024 * 1024, timeout: Math.min(10000, remaining()),
          options: { signal: request.signal, headers: { Accept: "text/html", "X-Return-Format": "html" } },
          allowUrl: url => url.protocol === "https:" && url.hostname === "r.jina.ai" });
        const jinaResponse = new Response(jina.bytes, { status: jina.response.status });
        if (jinaResponse.ok) {
          html = await jinaResponse.text();
          videoUrl = extractVideoUrl(html);
        }
      } catch {
        // Report the normal not-found message below.
      }
    }

    if (!videoUrl && Date.now() >= deadline) return Response.json({ code: "upstream_timeout", error: "Instagram lookup timed out. Retry or upload a saved file." }, { status: 504, headers: corsHeaders });

    // Step 2: Extract video URL from meta tags
    // Extract caption/description
    let caption = "";
    const descMatch = html.match(/<meta\s+[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["']/i);
    if (descMatch) {
      caption = descMatch[1].replace(/&amp;/g, "&");
    }

    const titleMatch = html.match(/<meta\s+[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:title["']/i);
    let title = "";
    if (titleMatch) {
      title = titleMatch[1].replace(/&amp;/g, "&");
    }

    // If we found a video URL, return it
    if (videoUrl) {
      return Response.json(
        {
          videoUrl,
          caption,
          title,
          type: "video",
        },
        { headers: corsHeaders }
      );
    }

    // A post description is metadata, never a substitute for spoken audio.
    if (caption) {
      return Response.json(
        {
          code: "no_playable_video",
          error: "Only a written post description was found, not playable video. No speech transcript was created. Upload a saved video or try another public Reel.",
        },
        { status: 404, headers: corsHeaders }
      );
    }

    return Response.json(
      {
        error:
          pageResponse && !pageResponse.ok
            ? `Instagram returned status ${pageResponse.status}. The post may be private, deleted, or rate-limited.`
            : "Could not find playable video on this Instagram page. It may require login or be private. Upload a saved video or try another public Reel.",
      },
      { status: 404, headers: corsHeaders }
    );
  } catch (err) {
    return Response.json(
      { error: "Instagram lookup could not be completed. Retry or upload a saved file." },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Also handle GET (for health check)
export async function onRequestGet() {
  return Response.json({ status: "ok", service: "instagram-extract" });
}
