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
  // The complete generated static navigation is the fallback when fetch fails.
  fetch("/tool-catalog.json?v=p2-20261013")
    .then(function (response) { if (!response.ok) throw new Error("Catalog unavailable"); return response.json(); })
    .then(function (catalog) {
      try { startAnalytics(catalog); } catch (_) { /* Analytics must not break tools or navigation. */ }
      document.querySelectorAll("footer[data-site-footer]").forEach(function (footer) {
        var nav = document.createElement("nav"); nav.className = "footer-nav"; nav.setAttribute("aria-label", "Site navigation");
        catalog.groups.forEach(function (group) {
          var pages = catalog.pages.filter(function (page) { return page.footer && page.group === group.id; });
          if (!pages.length) return;
          var section = document.createElement("div"); section.className = "footer-group";
          var title = document.createElement("span"); title.className = "footer-group-title"; title.textContent = group.title; section.appendChild(title);
          pages.forEach(function (page) { var link = document.createElement("a"); link.href = page.path; link.textContent = page.label; section.appendChild(link); });
          nav.appendChild(section);
        });
        footer.querySelector(".footer-nav")?.replaceWith(nav);
      });
    }).catch(function () { /* Keep the generated static navigation. */ });
})();
