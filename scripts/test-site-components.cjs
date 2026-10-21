const assert = require("node:assert/strict");
const fs = require("node:fs"), os = require("node:os"), path = require("node:path");
const { syncCatalog } = require("./sync-catalog.cjs");
const { TOP_NAVIGATION, renderTopNavigation, renderBrand, renderFooterNavigation,
  syncPageComponents } = require("./lib/site-components.cjs");
const root = path.resolve(__dirname, ".."), catalog = JSON.parse(fs.readFileSync(path.join(root, "tool-catalog.json"), "utf8"));
assert.deepEqual(syncCatalog(root, { check: true }).changed, [], "Generated site must be current");
for (const page of catalog.pages) {
  const source = fs.readFileSync(path.join(root, page.html), "utf8");
  assert(source.includes(renderTopNavigation(page)), page.path + " shared top nav");
  assert(source.includes(renderFooterNavigation(catalog)), page.path + " static footer");
  assert.equal((source.match(/data-site-nav\b/g) || []).length, 1);
  assert.equal((source.match(/data-site-brand\b/g) || []).length, 1);
  const expectedCurrent = TOP_NAVIGATION.some(item => item.path === page.path) ? 1 : 0;
  const header = source.match(/<header\b[^>]*>[\s\S]*?<\/header>/)[0];
  assert.equal((header.match(/aria-current="page"/g) || []).length, expectedCurrent, page.path + " active link");
}

// Registering a new content page must fill empty component slots, even without JS.
const temporaryParent = fs.realpathSync(os.tmpdir());
const fixture = fs.mkdtempSync(path.join(temporaryParent, "instascript-components-"));
try {
  for (const file of new Set(["tool-catalog.json", "index.md", "sitemap.xml", "footer.js",
    ...catalog.pages.flatMap(page => [page.html, page.markdown])])) {
    fs.mkdirSync(path.dirname(path.join(fixture, file)), { recursive: true });
    fs.copyFileSync(path.join(root, file), path.join(fixture, file));
  }
  const page = { path: "/component-fixture", url: catalog.origin + "/component-fixture", html: "component-fixture.html",
    markdown: "component-fixture.md", label: 'A & B "guide"', summary: "Fixture only", group: "transcript",
    home: true, footer: true, sitemap: { lastmod: "2026-10-21" } };
  const source = '<!doctype html><html><head><title>Fixture title</title></head><body>'
    + '<header class="header"><h1>Unique heading</h1></header>'
    + '<main><a href="/audio-to-text">Specific CTA</a><p>Unique content stays intact.</p></main>'
    + '<footer data-site-footer><p>Specific disclosure.</p></footer></body></html>';
  fs.writeFileSync(path.join(fixture, page.html), source);
  fs.writeFileSync(path.join(fixture, page.markdown), "# Unique heading\n\nFixture only.");
  const next = { ...catalog, pages: [...catalog.pages, page] };
  const writeCatalog = data => fs.writeFileSync(path.join(fixture, "tool-catalog.json"), JSON.stringify(data));
  writeCatalog(next);
  assert(syncCatalog(fixture, { check: true }).changed.includes(page.html));
  assert.equal(fs.readFileSync(path.join(fixture, page.html), "utf8"), source, "check mode must not write");
  syncCatalog(fixture);
  assert.deepEqual(syncCatalog(fixture, { check: true }).changed, [], "sync must be idempotent");
  const rendered = fs.readFileSync(path.join(fixture, page.html), "utf8");
  assert(rendered.includes(renderBrand()));
  assert(rendered.includes(renderTopNavigation(page)));
  assert(rendered.includes(source.match(/<main>[\s\S]*?<\/main>/)[0]));
  assert(rendered.includes('<p>Specific disclosure.</p>'));
  assert(rendered.includes('A &amp; B &quot;guide&quot;'));
  assert(rendered.includes('src="/footer.js?v=footer-'));
  assert(fs.readFileSync(path.join(fixture, "index.html"), "utf8").includes('href="/component-fixture"'));
  assert(fs.readFileSync(path.join(fixture, "index.md"), "utf8").includes(page.url));
  assert(fs.readFileSync(path.join(fixture, "sitemap.xml"), "utf8").includes(page.url));

  // A later invalid page must reject the whole plan before changing earlier pages.
  fs.appendFileSync(path.join(fixture, "footer.js"), "\n// Change asset version\n");
  const before = fs.readFileSync(path.join(fixture, "index.html"), "utf8");
  fs.writeFileSync(path.join(fixture, page.html), rendered.replace('</header>', '<nav>duplicate</nav></header>'));
  assert.throws(() => syncCatalog(fixture), /duplicate top navigation/);
  assert.equal(fs.readFileSync(path.join(fixture, "index.html"), "utf8"), before, "validation failure must not partially write");
  fs.writeFileSync(path.join(fixture, page.html), rendered);
  writeCatalog({ ...next, pages: [...next.pages, page] });
  assert.throws(() => syncCatalog(fixture), /duplicate canonical/);
  writeCatalog({ ...next, pages: [...next.pages.slice(0, -1), { ...page, markdown: "missing.md" }] });
  assert.throws(() => syncCatalog(fixture), /Missing published representation/);
  writeCatalog({ ...next, pages: [...next.pages.slice(0, -1), { ...page, html: "../escape.html" }] });
  assert.throws(() => syncCatalog(fixture), /escapes site root/);
  assert.throws(() => syncPageComponents(source.replace(' data-site-footer', ''), page, next, "fixture"), /expected one footer/);
} finally {
  const resolved = path.resolve(fixture);
  if (path.dirname(resolved) !== temporaryParent || !path.basename(resolved).startsWith("instascript-components-")) throw new Error("Unsafe fixture cleanup");
  fs.rmSync(resolved, { recursive: true, force: true });
}
// The browser helper must not rebuild navigation on catalog success or failure.
// Local/preview analytics gating means it should not touch the document at all.
(async () => {
  const vm = require("node:vm"), helper = fs.readFileSync(path.join(root, "footer.js"), "utf8");
  for (const fails of [false, true]) {
    const reads = [], document = new Proxy({}, { get(_, key) { reads.push(key); return () => []; } });
    vm.runInNewContext(helper, { document, location: { origin: "http://localhost:8788" },
      window: {}, fetch: async () => { if (fails) throw Error("Catalog unavailable"); return { ok: true, json: async () => catalog }; } });
    await new Promise(resolve => setImmediate(resolve));
    assert.deepEqual(reads, [], "No navigation DOM replacement after catalog fetch");
  }
  console.log("Shared components passed: all catalog pages, active links, new-page slots, no-JS HTML, escaping, check mode, idempotence, failure isolation and no browser navigation rebuild.");
})().catch(error => { console.error(error); process.exitCode = 1; });
