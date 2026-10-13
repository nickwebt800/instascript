(function () {
  "use strict";
  // The complete generated static navigation is the fallback when fetch fails.
  fetch("/tool-catalog.json?v=p2-20261013")
    .then(function (response) { if (!response.ok) throw new Error("Catalog unavailable"); return response.json(); })
    .then(function (catalog) {
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
