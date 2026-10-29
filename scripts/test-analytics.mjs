import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const catalog = JSON.parse(await fs.readFile(new URL('tool-catalog.json', root), 'utf8'));
const helper = await fs.readFile(new URL('functions/_lib/analytics.js', root), 'utf8');
const { analyticsFrame } = await import('data:text/javascript;base64,' + Buffer.from(helper).toString('base64'));
const footer = await fs.readFile(new URL('footer.js', root), 'utf8');

async function load({ origin = catalog.origin, pathname = '/', referrer = '', dnt, gpc, embedded = false, duplicate = false, noindex = false } = {}) {
  const frames = [];
  const window = {}; window.self = window; window.top = embedded ? {} : window;
  const document = {
    referrer,
    getElementById: () => duplicate,
    querySelector: () => noindex,
    querySelectorAll: () => [],
    createElement(tag) { assert.equal(tag, 'iframe'); return { setAttribute(k, v) { this[k] = v; } }; },
    body: { appendChild: frame => frames.push(frame) },
  };
  // Any access to live result content/title is a regression.
  Object.defineProperty(document, 'title', { get() { throw Error('Do not read live page titles'); } });
  const context = { window, document, location: { origin, pathname, search: '?url=PRIVATE_VIDEO', hash: '#PRIVATE_TRANSCRIPT' },
    navigator: { doNotTrack: dnt, globalPrivacyControl: gpc }, URL, URLSearchParams,
    fetch: async () => ({ ok: true, json: async () => catalog }) };
  vm.runInNewContext(footer, context);
  await new Promise(resolve => setImmediate(resolve));
  return frames;
}

const [frame] = await load({ referrer: 'https://directory.example/private-file?transcript=PRIVATE_TEXT#secret' });
assert.equal(frame.sandbox, 'allow-scripts');
assert.equal(frame.referrerPolicy, 'no-referrer');
assert.equal(frame.hidden, true);
assert.equal(frame.tabIndex, -1);
const params = new URL(frame.src, catalog.origin).searchParams;
assert.deepEqual([...params], [['page', '/'], ['source', 'directory.example']]);
assert.doesNotMatch(frame.src, /PRIVATE|private-file|transcript|secret/);
for (const options of [{ origin: 'https://preview.pages.dev' }, { origin: 'http://localhost:8788' },
  { pathname: '/result/private' }, { pathname: '/api/proxy' }, { pathname: '/missing' },
  { dnt: '1' }, { gpc: true }, { embedded: true }, { duplicate: true }, { noindex: true }]) {
  assert.equal((await load(options)).length, 0, JSON.stringify(options));
}
for (const page of catalog.pages) {
  for (const pathname of [page.path, '/' + page.html]) {
    const [item] = await load({ pathname });
    assert.equal(new URL(item.src, catalog.origin).searchParams.get('page'), page.path);
  }
}
for (const referrer of ['', 'not a URL', 'javascript:alert(1)', catalog.origin + '/?url=PRIVATE']) {
  assert.equal(new URL((await load({ referrer }))[0].src, catalog.origin).searchParams.get('source'), 'direct');
}

const response = analyticsFrame(new Request(catalog.origin + frame.src), catalog);
assert.equal(response.status, 200);
const html = await response.text();
assert.match(html, /data-page-location="https:\/\/instascript\.app\/"/);
assert.match(html, /data-prop-source_domain="directory.example"/);
assert.match(html, /data-key="P8P2TNXrUzXIF8k0onqBdg"/);
assert.match(html, /<body><\/body>/);
assert.doesNotMatch(html, /PRIVATE|<form|<a\s|allow-same-origin/);
assert.ok(html.includes('https://www.googletagmanager.com/gtag/js?id='), 'Google tag loader present');
assert.ok(html.includes("page_location:'https://instascript.app/'"), 'GA4 receives canonical URL');
assert.ok(html.includes("page_referrer:''"), 'GA4 referrer is empty');
assert.ok(html.includes('allow_google_signals:false') && html.includes('allow_ad_personalization_signals:false'));
assert.match(response.headers.get('Content-Security-Policy'), /www\.googletagmanager\.com/);
assert.equal(response.headers.get('Referrer-Policy'), 'no-referrer');
assert.equal(response.headers.get('Cache-Control'), 'no-store');
assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
assert.match(response.headers.get('Content-Security-Policy'), /sandbox allow-scripts/);
for (const path of ['?page=/result/private', '?page=/api/proxy', '?page=//evil.example',
  '?page=/', '?page=/&source=directory.example/path', '?page=/&source=%22%3E%3Cscript%3E',
  '?page=/&url=PRIVATE', '?page=/&page=/about', '?page=/&source=a.example&source=b.example']) {
  const origin = path === '?page=/' ? 'https://preview.pages.dev' : catalog.origin;
  const rejected = analyticsFrame(new Request(origin + '/analytics-frame' + path), catalog);
  assert.equal(rejected.status, 404, origin + path);
  assert.doesNotMatch(await rejected.text(), /analytics\.ahrefs|PRIVATE|evil\.example/);
}
assert.equal(analyticsFrame(new Request(catalog.origin + '/analytics-frame?page=/', { method: 'POST' }), catalog).status, 404);
const middleware = await fs.readFile(new URL('functions/_middleware.js', root), 'utf8');
assert.match(middleware, /case "\/analytics-frame":\s*return analyticsFrame\(request, catalog\)/);
for (const page of catalog.pages) {
  const source = await fs.readFile(new URL(page.html, root), 'utf8');
  assert.match(source, /src="\/footer\.js/);
  assert.doesNotMatch(source, /src="https:\/\/analytics\.ahrefs/);
}
console.log('Analytics checks passed: production/catalog gating, DNT/GPC, canonical-only payload, domain-only source, sandbox/CSP, invalid requests, and all catalog pages.');
