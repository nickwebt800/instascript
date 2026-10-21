// Generate static shared components, the homepage directory and the sitemap.
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto");
const { escape, syncPageComponents, validateComponents } = require("./lib/site-components.cjs");

function syncCatalog(root, { check = false } = {}) {
const catalog = JSON.parse(fs.readFileSync(path.join(root, "tool-catalog.json"), "utf8"));
// Validate every page before writing any file, so a bad entry cannot partially sync the site.
const pending = new Map();
const read = file => pending.has(file) ? pending.get(file) : fs.readFileSync(path.join(root, file), "utf8");
const write = (file, text) => pending.set(file, text);
const seen = new Set();
for (const page of catalog.pages) {
  if (seen.has(page.path) || page.url !== catalog.origin + page.path) throw new Error("Invalid/duplicate canonical path: " + page.path);
  seen.add(page.path);
  for (const file of [page.html, page.markdown]) {
    const target = path.resolve(root, file);
    if (!target.startsWith(path.resolve(root) + path.sep)) throw new Error("Page file escapes site root: " + file);
    if (!fs.existsSync(target)) throw new Error("Missing published representation: " + file);
  }
  if (!catalog.groups.some(group => group.id === page.group)) throw new Error("Unknown catalog group: " + page.group);
}
validateComponents(catalog);
const scriptVersion = "footer-" + crypto.createHash("sha256").update(fs.readFileSync(path.join(root, "footer.js"))).digest("hex").slice(0, 12);
for (const page of catalog.pages) {
  write(page.html, syncPageComponents(read(page.html), page, catalog, scriptVersion));
}
const groups = catalog.groups.filter(group => group.id !== "site");
const home = read("index.html");
const index = '<section class="tool-index" aria-labelledby="tool-index-title">\n<h2 id="tool-index-title">Tools by task</h2><div class="tool-groups">\n'
  + groups.map(group => '<section class="tool-group"><h3>' + escape(group.title) + '</h3><ul>\n'
    + catalog.pages.filter(page => page.home && page.group === group.id).map(page => '<li><a href="' + page.path + '">' + escape(page.label) + '</a> &mdash; ' + escape(page.summary) + '</li>').join('\n')
    + '\n</ul></section>').join('\n') + '\n</div></section>';
const homeIndex = /<section class="tool-index"[\s\S]*?<\/div>\s*<\/section>/;
if (!homeIndex.test(home)) throw new Error("Missing homepage directory slot");
write("index.html", home.replace(homeIndex, index));
const markdown = read("index.md");
const mdIndex = '## More transcription tools\n\n' + groups.map(group => '### ' + group.title + '\n\n'
  + catalog.pages.filter(page => page.home && page.group === group.id).map(page => '- [' + page.label + '](' + page.url + ') — ' + page.summary).join('\n')).join('\n\n') + '\n\n';
const markdownIndex = /## More transcription tools[\s\S]*?(?=## Recommended)/;
if (!markdownIndex.test(markdown)) throw new Error("Missing homepage Markdown directory slot");
write("index.md", markdown.replace(markdownIndex, mdIndex));
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + catalog.pages.map(page => '  <url>\n    <loc>' + page.url + '</loc>\n' + Object.entries(page.sitemap).map(([key, value]) => '    <' + key + '>' + value + '</' + key + '>').join('\n') + '\n  </url>').join('\n') + '\n</urlset>\n';
write("sitemap.xml", xml);
const changed = [...pending].filter(([file, text]) => fs.readFileSync(path.join(root, file), "utf8").replace(/\r\n/g, "\n") !== text.replace(/\r\n/g, "\n"));
if (!check) for (const [file, text] of changed) fs.writeFileSync(path.join(root, file), text);
return { pages: catalog.pages.length, changed: changed.map(([file]) => file) };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.some(arg => arg !== "--check")) throw new Error("Usage: node scripts/sync-catalog.cjs [--check]");
  const check = args.includes("--check"), result = syncCatalog(path.resolve(__dirname, ".."), { check });
  if (check && result.changed.length) {
    console.error("Generated components are out of date. Run node scripts/sync-catalog.cjs:\n" + result.changed.join("\n"));
    process.exitCode = 1;
  } else console.log((check ? "Verified " : "Synchronized ") + result.pages + " pages; " + result.changed.length + " files changed.");
}
module.exports = { syncCatalog };
