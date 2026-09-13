// Cloudflare Pages Function: /api/extract
// Accepts POST { url: "https://instagram.com/reel/..." }
// Fetches the Instagram page server-side, extracts video URL + caption.
// Returns JSON { videoUrl, caption, type } or { error }

export async function onRequestPost({ request, env }) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await request.json();
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
      !/(^|\.)instagram\.com$/i.test(parsedUrl.hostname)
    ) {
      return Response.json(
        { error: "Please provide a valid Instagram URL." },
        { status: 400, headers: corsHeaders }
      );
    }

    const fetchPage = async (targetUrl) => fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "X-IG-App-ID": "936619743392459",
        "X-Requested-With": "XMLHttpRequest",
      },
      redirect: "follow",
    });

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
    if (!videoUrl && env?.CF_BROWSER_RENDERING_TOKEN && env?.CF_ACCOUNT_ID) {
      try {
        const renderResponse = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/browser-rendering/content`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.CF_BROWSER_RENDERING_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: `${embedUrl.toString()}?__a=1` }),
          }
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
    if (!videoUrl) {
      try {
        const jinaUrl = `https://r.jina.ai/http://${embedUrl.host}${embedUrl.pathname}`;
        const jinaResponse = await fetch(jinaUrl, {
          headers: {
            Accept: "text/html,application/xhtml+xml",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
            "X-Return-Format": "html",
          },
          redirect: "follow",
        });
        if (jinaResponse.ok) {
          html = await jinaResponse.text();
          videoUrl = extractVideoUrl(html);
        }
      } catch {
        // Report the normal not-found message below.
      }
    }

    // Step 2: Extract video URL from meta tags
    // Extract caption/description
    let caption = "";
    const descMatch = html.match(/<meta\s+[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["']/i);
    if (descMatch) {
      caption = decodeURIComponent(descMatch[1].replace(/&amp;/g, "&"));
    }

    const titleMatch = html.match(/<meta\s+[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:title["']/i);
    let title = "";
    if (titleMatch) {
      title = decodeURIComponent(titleMatch[1].replace(/&amp;/g, "&"));
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

    // No video found — maybe it's a text/image post
    if (caption) {
      return Response.json(
        {
          caption,
          title,
          type: "text",
        },
        { headers: corsHeaders }
      );
    }

    return Response.json(
      {
        error:
          pageResponse && !pageResponse.ok
            ? `Instagram returned status ${pageResponse.status}. The post may be private, deleted, or rate-limited.`
            : "Could not find video or text content on this Instagram page. It may require login or be private.",
      },
      { status: 404, headers: corsHeaders }
    );
  } catch (err) {
    return Response.json(
      { error: `Server error: ${err.message}` },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Also handle GET (for health check)
export async function onRequestGet() {
  return Response.json({ status: "ok", service: "instagram-extract" });
}
