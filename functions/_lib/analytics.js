// Keep the vendor tracker in a sandboxed document, away from user media and DOM.
// The data-key is a public installation identifier, not an API credential.
const GA4_ID = "G-1FT5SJ909V";
const KEY = "P8P2TNXrUzXIF8k0onqBdg";
const escape = value => value.replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);

export function analyticsFrame(request, catalog) {
  const url = new URL(request.url);
  const headers = {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow",
    "Referrer-Policy": "no-referrer",
    "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline' https://analytics.ahrefs.com https://www.googletagmanager.com; connect-src https://analytics.ahrefs.com https://*.google-analytics.com https://www.google-analytics.com https://*.analytics.google.com; img-src https://*.google-analytics.com https://www.google-analytics.com; base-uri 'none'; form-action 'none'; sandbox allow-scripts; frame-ancestors " + catalog.origin,
  };
  const page = catalog.pages.find(item => item.path === url.searchParams.get("page"));
  const source = url.searchParams.get("source") || "direct";
  const validSource = source === "direct" || /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(source);
  const validParams = [...url.searchParams.keys()].every(key => ["page", "source"].includes(key))
    && url.searchParams.getAll("page").length === 1 && url.searchParams.getAll("source").length <= 1;
  if (request.method !== "GET" || url.origin !== catalog.origin || !page || !validSource || !validParams) {
    return new Response("<!doctype html><title>Not found</title>", { status: 404, headers });
  }
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="robots" content="noindex,nofollow"><meta name="referrer" content="no-referrer">
<title>${escape(page.title)}</title>
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}" referrerpolicy="no-referrer"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('js',new Date());gtag('config','${GA4_ID}',{page_location:'${escape(page.url)}',page_title:'${escape(page.title).replace(/&#39;/g, "\\u0027")}',page_referrer:'',allow_google_signals:false,allow_ad_personalization_signals:false});</script>
<script src="https://analytics.ahrefs.com/analytics.js" data-key="${KEY}" data-page-location="${escape(page.url)}" data-prop-source_domain="${escape(source)}" referrerpolicy="no-referrer" async></script>
</head><body></body></html>`, { headers });
}
