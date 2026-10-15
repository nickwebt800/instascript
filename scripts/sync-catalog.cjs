// One source controls navigation, the homepage directory and the sitemap.
const fs = require("node:fs"), path = require("node:path");
const root = path.resolve(__dirname, "..");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "tool-catalog.json"), "utf8"));
const escape = text => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const write = (file, text) => { const dest = path.join(root, file); if (fs.readFileSync(dest, "utf8").replace(/\r\n/g, "\n") !== text.replace(/\r\n/g, "\n")) fs.writeFileSync(dest, text); };
const seen = new Set();
for (const page of catalog.pages) {
  if (seen.has(page.path) || page.url !== catalog.origin + page.path) throw new Error("Invalid/duplicate canonical path: " + page.path);
  seen.add(page.path);
  for (const file of [page.html, page.markdown]) if (!fs.existsSync(path.join(root, file))) throw new Error("Missing published representation: " + file);
}
const nav = '<nav class="footer-nav">\n' + catalog.groups.map(group => {
  const pages = catalog.pages.filter(page => page.footer && page.group === group.id);
  return pages.length ? '<div class="footer-group"><span class="footer-group-title">' + escape(group.title) + '</span>\n'
    + pages.map(page => '<a href="' + page.path + '">' + escape(page.label) + '</a>').join('\n') + '</div>' : '';
}).join('\n') + '\n</nav>';
for (const page of catalog.pages) {
  const source = fs.readFileSync(path.join(root, page.html), "utf8");
  const withNav = source.replace(/(<footer\b[^>]*data-site-footer[^>]*>)\s*(<\/footer>)/, '$1' + nav + '$2');
  write(page.html, withNav.replace(/(<footer\b[^>]*data-site-footer[^>]*>[\s\S]*?)<nav class="footer-nav">[\s\S]*?<\/nav>/, '$1' + nav));
}
const groups = catalog.groups.filter(group => group.id !== "site");
const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
const index = '<section class="tool-index" aria-labelledby="tool-index-title">\n<h2 id="tool-index-title">Tools by task</h2><div class="tool-groups">\n'
  + groups.map(group => '<section class="tool-group"><h3>' + escape(group.title) + '</h3><ul>\n'
    + catalog.pages.filter(page => page.home && page.group === group.id).map(page => '<li><a href="' + page.path + '">' + escape(page.label) + '</a> &mdash; ' + escape(page.summary) + '</li>').join('\n')
    + '\n</ul></section>').join('\n') + '\n</div></section>';
write("index.html", home.replace(/<section class="tool-index"[\s\S]*?<\/div>\s*<\/section>/, index));
const markdown = fs.readFileSync(path.join(root, "index.md"), "utf8");
const mdIndex = '## More transcription tools\n\n' + groups.map(group => '### ' + group.title + '\n\n'
  + catalog.pages.filter(page => page.home && page.group === group.id).map(page => '- [' + page.label + '](' + page.url + ') — ' + page.summary).join('\n')).join('\n\n') + '\n\n';
write("index.md", markdown.replace(/## More transcription tools[\s\S]*?(?=## Recommended)/, mdIndex));
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + catalog.pages.map(page => '  <url>\n    <loc>' + page.url + '</loc>\n' + Object.entries(page.sitemap).map(([key, value]) => '    <' + key + '>' + value + '</' + key + '>').join('\n') + '\n  </url>').join('\n') + '\n</urlset>\n';
write("sitemap.xml", xml);
console.log("Synchronized " + catalog.pages.length + " pages from tool-catalog.json.");
