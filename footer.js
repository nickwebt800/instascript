(function () {
  "use strict";
  function startAnalytics(catalog) {
    // Only known production pages; never pass the actual URL, query, fragment,
    // document title, referrer path, form values or result links to the tracker.
    if (location.origin !== "https://instascript.app" || window.top !== window.self
      || navigator.globalPrivacyControl === true || navigator.doNotTrack === "1"
      || document.getElementById("site-analytics-frame")
      || document.querySelector('meta[name="robots"][content*="noindex"]')) return;
    var page = catalog.pages.find(function (item) {
      return location.pathname === item.path || location.pathname === "/" + item.html;
    });
    if (!page) return;
    var source = "direct";
    try {
      var ref = new URL(document.referrer);
      if (["https:", "http:"].includes(ref.protocol) && ref.origin !== location.origin
        && /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(ref.hostname)) source = ref.hostname;
    } catch (_) { /* Missing referrers are direct visits. */ }
    var frame = document.createElement("iframe");
    frame.id = "site-analytics-frame";
    frame.title = "Anonymous page analytics";
    frame.hidden = true;
    frame.tabIndex = -1;
    frame.setAttribute("aria-hidden", "true");
    frame.setAttribute("sandbox", "allow-scripts");
    frame.referrerPolicy = "no-referrer";
    frame.src = "/analytics-frame?" + new URLSearchParams({ page: page.path, source: source });
    document.body.appendChild(frame);
  }
  // Shared navigation is generated into HTML by scripts/sync-catalog.cjs.
  // This request is only for public-page analytics; navigation works without it.
  fetch("/tool-catalog.json?v=p2-20261013")
    .then(function (response) { if (!response.ok) throw new Error("Catalog unavailable"); return response.json(); })
    .then(function (catalog) {
      try { startAnalytics(catalog); } catch (_) { /* Analytics must not break tools or navigation. */ }
    }).catch(function () { /* Analytics failure must not affect the static page. */ });
})();
