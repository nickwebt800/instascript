import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const moduleUrl = source => "data:text/javascript;base64," + Buffer.from(source).toString("base64");
const subtitles = moduleUrl(await readFile(new URL("../js/subtitles.js", import.meta.url), "utf8"));
const load = async path => import(moduleUrl((await readFile(new URL(path, import.meta.url), "utf8"))
  .replace("./subtitles.js?v=p0-export-20261014", subtitles)));
const { findTranscriptMatches: find } = await load("../js/transcript-search.js");
const { transcriptSubtitles, transcriptText } = await load("../js/transcript-result.js");
const result = { text: "stale aggregate", cues: [
  { start: 0, end: 1, text: "Ask ask ASK." },
  { start: 1, end: 2, text: "🙂中文 Ask <img onerror=alert(1)> İ ASK" },
] };
let checks = 0;
function check(name, run) { run(); checks++; console.log("PASS " + name); }
check("ASCII folding counts individual occurrences and preserves source offsets", () => {
  const matches = find(result, "aSk");
  assert.equal(matches.length, 5);
  assert.deepEqual(matches.slice(0, 3), [0, 4, 8].map(start => ({ cueIndex: 0, start, end: start + 3 })));
  for (const match of matches) assert.equal(result.cues[match.cueIndex].text.slice(match.start, match.end).toLowerCase(), "ask");
});
check("Unicode and surrogate pair selections remain exact", () => {
  for (const query of ["🙂", "中文", "İ", "🙂中文"]) {
    const [match] = find(result, query);
    assert.equal(result.cues[match.cueIndex].text.slice(match.start, match.end), query);
  }
});
check("Empty and absent results have no matches", () => {
  for (const query of ["", "   ", "\n\t"]) assert.deepEqual(find(result, query), []);
  assert.deepEqual(find(null, "Ask"), []);
  assert.deepEqual(find({ cues: [], text: "" }, "Ask"), []);
  assert.deepEqual(find(result, "missing"), []);
});
check("Literal punctuation, HTML-like text and whitespace are not expressions", () => {
  assert.equal(find(result, ".").length, 1);
  assert.equal(find(result, "<img onerror=alert(1)>").length, 1);
  assert.equal(find(result, ".*").length, 0);
  assert.equal(find(result, " ask ").length, 2);
});
check("No cross-cue matches or overlapping occurrence inflation", () => {
  assert.equal(find(result, "ASK.🙂").length, 0);
  assert.equal(find({ cues: [], text: "aaaa" }, "aa").length, 2);
});
check("Edits are immediately authoritative without touching cues or exports", () => {
  const copy = structuredClone(result);
  const srt = transcriptSubtitles(copy, "srt"), txt = transcriptText(copy);
  find(copy, "Ask");
  assert.deepEqual(copy, result);
  assert.equal(transcriptSubtitles(copy, "srt"), srt);
  assert.equal(transcriptText(copy), txt);
  copy.cues[0].text = "Changed";
  assert.equal(find(copy, "Ask").length, 2);
  assert.match(transcriptText(copy), /^Changed/);
});
check("Untimed fallback text and 1,000 cues retain every occurrence", () => {
  assert.deepEqual(find({ cues: [], text: "🙂 Ask ask" }, "ask"), [
    { cueIndex: 0, start: 3, end: 6 }, { cueIndex: 0, start: 7, end: 10 },
  ]);
  const many = { cues: Array.from({ length: 1000 }, () => ({ text: "Word ".repeat(20) })) };
  assert.equal(find(many, "word").length, 20000);
});
const sample = JSON.parse(await readFile(new URL("../assets/demo/kennedy-1961.json", import.meta.url), "utf8"));
check("Bundled sample has exportable timings inside its 11-second recording", () => {
  assert.ok(sample.chunks.every(cue => cue.timestamp[0] >= 0 && cue.timestamp[1] <= 11));
  for (const format of ["srt", "vtt"]) assert.ok(transcriptSubtitles({ cues: sample.chunks.map(cue => ({
    start: cue.timestamp[0], end: cue.timestamp[1], text: cue.text,
  })) }, format));
});
console.log(`${checks} search/sample checks passed.`);
