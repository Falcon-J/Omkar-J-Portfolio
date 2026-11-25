const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const ts = require("typescript");

const code = ts.transpileModule(readFileSync(require("node:path").join(__dirname, "../app/design/medium-feed.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
function load(fetch) {
  const module = { exports: {} };
  new Function("exports", "module", "fetch", code)(module.exports, module, fetch);
  return module.exports;
}
const item = (title, link = "https://medium.com/@omkarjawalikar04/a-real-story") => `<item><title><![CDATA[${title}]]></title><link>${link}</link><pubDate>Sun, 08 Jun 2025 12:00:00 GMT</pubDate><content:encoded><![CDATA[<p>A story about &amp; state.</p><img src="https://miro.medium.com/cover.png"/>]]></content:encoded></item>`;

test("Medium RSS previews extract real text and cover URLs, with a three story limit", () => {
  const { parseMediumFeed } = load();
  const articles = parseMediumFeed(`<rss><channel>${[1, 2, 3, 4].map(i => item(`Story ${i} &amp; systems`)).join("")}</channel></rss>`);
  assert.equal(articles.length, 3);
  assert.equal(articles[0].title, "Story 1 & systems");
  assert.equal(articles[0].excerpt, "A story about & state.");
  assert.equal(articles[0].date, "8 Jun 2025");
  assert.equal(articles[0].image, "https://miro.medium.com/cover.png");
  assert.doesNotMatch(articles[0].excerpt, /<p>/);
});

test("feed links stay on Medium and unsupported covers are omitted", () => {
  const { parseMediumFeed } = load();
  assert.deepEqual(parseMediumFeed(item("Bad", "javascript:alert(1)")), []);
  assert.deepEqual(parseMediumFeed(item("Bad", "https://medium.com.evil.test/article")), []);
  const [article] = parseMediumFeed(item("Good").replace("https://miro.medium.com/cover.png", "https://unrelated.test/tracker.png"));
  assert.equal(article.image, undefined);
});

test("Medium refresh is cached and unavailable or empty feeds keep the actual featured article", async () => {
  const calls = [];
  const success = load(async (...args) => { calls.push(args); return { ok: true, text: async () => `<rss>${item("Latest story")}</rss>` }; });
  assert.equal((await success.getMediumArticles()).live, true);
  assert.equal(calls[0][0], "https://medium.com/feed/@omkarjawalikar04");
  assert.equal(calls[0][1].next.revalidate, 3600);
  for (const fetch of [async () => { throw new Error("offline"); }, async () => ({ ok: false }), async () => ({ ok: true, text: async () => "invalid feed" })]) {
    const { getMediumArticles, mediumFallback } = load(fetch);
    assert.deepEqual(await getMediumArticles(), { articles: [mediumFallback], live: false });
  }
});
