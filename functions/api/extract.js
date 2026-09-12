// Cloudflare Pages Function: /api/extract
// Accepts POST { url: "https://instagram.com/reel/..." }
// Fetches the Instagram page server-side, extracts video URL + caption.
// Returns JSON { videoUrl, caption, type } or { error }

export async function onRequestPost({ request }) {
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

    if (!url || !url.includes("instagram.com")) {
      return Response.json(
        { error: "Please provide a valid Instagram URL." },
        { status: 400, headers: corsHeaders }
      );
    }

    // Step 1: Fetch the Instagram page (server-side, no CORS restriction)
    const pageResponse = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
      },
      redirect: "follow",
    });

    if (!pageResponse.ok) {
      return Response.json(
        { error: `Instagram returned status ${pageResponse.status}. The post may be private or deleted.` },
        { status: 502, headers: corsHeaders }
      );
    }

    const html = await pageResponse.text();

    // Step 2: Extract video URL from meta tags
    let videoUrl = null;

    // Try og:video meta tags (various forms)
    const ogVideoPatterns = [
      /<meta\s+property="og:video:url"\s+content="([^"]+)"/i,
      /<meta\s+property="og:video:secure_url"\s+content="([^"]+)"/i,
      /<meta\s+property="og:video"\s+content="([^"]+)"/i,
      /<meta\s+name="og:video"\s+content="([^"]+)"/i,
    ];

    for (const pattern of ogVideoPatterns) {
      const match = html.match(pattern);
      if (match) {
        videoUrl = match[1].replace(/&amp;/g, "&");
        break;
      }
    }

    // Fallback: search JSON data embedded in script tags
    if (!videoUrl) {
      const jsonPatterns = [
        /"video_url":"([^"]+)"/,
        /"video_url":"([^"]+)"/g,
      ];
      for (const pattern of jsonPatterns) {
        const match = html.match(pattern);
        if (match) {
          videoUrl = match[1]
            .replace(/\\u0026/g, "&")
            .replace(/\\u00253b/g, ";")
            .replace(/\\\//g, "/");
          break;
        }
      }
    }

    // Extract caption/description
    let caption = "";
    const descMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
    if (descMatch) {
      caption = decodeURIComponent(descMatch[1].replace(/&amp;/g, "&"));
    }

    const titleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
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
      { error: "Could not find video or text content on this Instagram page. It may require login or be private." },
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
