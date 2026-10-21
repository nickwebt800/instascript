// Shared static components. Run scripts/sync-catalog.cjs after editing this file.
// These maintenance sources are not part of the public deployment package.
const BRAND = { name: "InstaScript", monogram: "IS", href: "/" };
const TOP_NAVIGATION = [
  { path: "/", label: "Instagram Transcript" },
  { path: "/video-to-text", label: "Video to Text" },
  { path: "/youtube-transcript", label: "YouTube Transcript" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const escape = value => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function renderBrand(variant = "standard") {
  const link = '<a href="' + escape(BRAND.href) + '">' + escape(BRAND.name) + '</a>';
  if (variant === "home") return '<a href="' + escape(BRAND.href) + '" class="logo-link" data-site-brand>'
    + '<span class="logo-mark" aria-hidden="true">' + escape(BRAND.monogram) + '</span>'
    + '<span class="logo">' + escape(BRAND.name) + '</span></a>';
  if (variant === "heading") return '<h1 class="logo" data-site-brand>' + link + '</h1>';
  return '<p class="brand" data-site-brand>' + link + '</p>';
}

function renderTopNavigation(page) {
  return '<nav class="page-nav' + (page.path === "/" ? ' home-nav' : '')
    + '" aria-label="Site navigation" data-site-nav>\n'
    + TOP_NAVIGATION.map(item => '<a href="' + escape(item.path) + '"'
      + (item.path === page.path ? ' aria-current="page"' : '') + '>' + escape(item.label) + '</a>').join('\n')
    + '\n</nav>';
}

function renderFooterNavigation(catalog) {
  return '<nav class="footer-nav" aria-label="Footer navigation" data-site-footer-nav>\n'
    + catalog.groups.map(group => {
      const pages = catalog.pages.filter(page => page.footer && page.group === group.id);
      return pages.length ? '<div class="footer-group"><span class="footer-group-title">' + escape(group.title) + '</span>\n'
        + pages.map(page => '<a href="' + escape(page.path) + '">' + escape(page.label) + '</a>').join('\n') + '</div>' : '';
    }).join('\n') + '\n</nav>';
}

function syncPageComponents(source, page, catalog, scriptVersion) {
  const headers = source.match(/<header\b[^>]*>[\s\S]*?<\/header>/g) || [];
  if (headers.length !== 1) throw new Error(page.html + ': expected one site header');
  let header = headers[0];
  const brands = [...header.matchAll(/<(p|a|h1)\b[^>]*(?:data-site-brand|class="(?:brand|logo-link|logo)")[^>]*>[\s\S]*?<\/\1>/g)];
  if (brands.length > 1) throw new Error(page.html + ': duplicate site brand');
  const variant = page.path === "/" ? "home" : brands[0]?.[1] === "h1" ? "heading" : "standard";
  header = brands.length ? header.replace(brands[0][0], renderBrand(variant))
    : header.replace(/(<header\b[^>]*>)/, '$1' + renderBrand(variant));
  const navs = header.match(/<nav\b[^>]*>[\s\S]*?<\/nav>/g) || [];
  if (navs.length > 1) throw new Error(page.html + ': duplicate top navigation');
  header = navs.length ? header.replace(navs[0], renderTopNavigation(page))
    : header.replace('</header>', renderTopNavigation(page) + '</header>');
  let result = source.replace(headers[0], header);
  const footers = result.match(/<footer\b[^>]*data-site-footer(?:\s|>)[\s\S]*?<\/footer>/g) || [];
  if (footers.length !== 1) throw new Error(page.html + ': expected one footer with data-site-footer');
  const footer = footers[0], footerNavs = footer.match(/<nav\b[^>]*>[\s\S]*?<\/nav>/g) || [];
  if (footerNavs.length > 1) throw new Error(page.html + ': duplicate footer navigation');
  const sharedFooter = renderFooterNavigation(catalog);
  result = result.replace(footer, footerNavs.length ? footer.replace(footerNavs[0], sharedFooter)
    : footer.replace(/(<footer\b[^>]*>)/, '$1' + sharedFooter));
  const scripts = result.match(/<script\b[^>]*src="\/?footer\.js(?:\?[^"<>]*)?"[^>]*>\s*<\/script>/g) || [];
  if (scripts.length > 1) throw new Error(page.html + ': duplicate footer script');
  const script = '<script src="/footer.js?v=' + escape(scriptVersion) + '" defer></script>';
  if (!scripts.length && !result.includes('</body>')) throw new Error(page.html + ': missing body end');
  return scripts.length ? result.replace(scripts[0], script) : result.replace('</body>', script + '</body>');
}

function validateComponents(catalog) {
  const known = new Set(catalog.pages.map(page => page.path));
  for (const item of [BRAND, ...TOP_NAVIGATION]) {
    const target = item.path || item.href;
    if (!known.has(target)) throw new Error('Shared navigation links to unknown page: ' + target);
  }
}

module.exports = { BRAND, TOP_NAVIGATION, escape, renderBrand, renderTopNavigation,
  renderFooterNavigation, syncPageComponents, validateComponents };
