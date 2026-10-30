import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const load = async file => import("data:text/javascript;base64," + Buffer.from(await readFile(new URL(file, import.meta.url), "utf8")).toString("base64"));
const { checkSubtitleQuality: check, QUALITY_DEFAULTS, qualitySettings } = await load("../js/subtitle-quality.js");
const { serializeSubtitleCues, validateSubtitleCues, parseSubtitleCues } = await load("../js/subtitles.js");
let passed = 0;
const test = (name, run) => { run(); passed++; console.log("PASS " + name); };
const cue = (start, end, text = "Hello") => ({ start, end, text });

test("Thresholds use strict comparisons: below, equal and above", () => {
  assert.equal(check([cue(0, 1, "x".repeat(16))]).counts.cps, 0);
  assert.equal(check([cue(0, 1, "x".repeat(17))]).counts.cps, 0);
  assert.equal(check([cue(0, 1, "x".repeat(18))]).counts.cps, 1);
  for (const [length, expected] of [[41, 0], [42, 0], [43, 1]]) assert.equal(check([cue(0, 9, "x".repeat(length))]).counts.lineLength, expected);
  for (const [duration, expected] of [[0.829, 1], [0.83, 0], [0.831, 0]]) assert.equal(check([cue(0, duration)]).counts.duration, expected);
  for (const [lines, expected] of [[1, 0], [2, 0], [3, 1]]) assert.equal(check([cue(0, 9, Array(lines).fill("a").join("\n"))]).counts.lines, expected);
});
test("Custom thresholds are validated, with no blank, nonfinite or fractional line limits", () => {
  for (const key of Object.keys(QUALITY_DEFAULTS)) {
    for (const value of ["", " ", 0, -1, NaN, Infinity, "bad", null]) assert.throws(() => qualitySettings({ ...QUALITY_DEFAULTS, [key]: value }));
  }
  for (const key of ["maxLineLength", "maxLines"]) assert.throws(() => qualitySettings({ ...QUALITY_DEFAULTS, [key]: 1.5 }));
  assert.equal(check([cue(0, 0.5, "Long enough")], { maxCps: 100, maxLineLength: 100, minDuration: 0.1, maxLines: 5 }).issueCues, 0);
});
test("Unicode graphemes include punctuation and internal spaces, not newlines", () => {
  const row = check([cue(0, 9, "中文 e\u0301 👩‍👩‍👧‍👦!\n🙂")]).rows[0];
  assert.equal(row.characters, 8); assert.equal(row.longestLine, 7); assert.equal(row.lineCount, 2);
});
test("Code point fallback is explicit and counts joined sequences separately", () => {
  const report = check([cue(0, 9, "e\u0301🙂")], QUALITY_DEFAULTS, { segmenter: null });
  assert.equal(report.counting, "code points"); assert.equal(report.rows[0].characters, 3);
});
test("Literal markup and entities are not executed, decoded or silently removed", () => {
  const text = "<b>A</b> &amp;";
  assert.equal(check([cue(0, 9, text)]).rows[0].characters, text.length);
  const imported = parseSubtitleCues("1\n00:00:00,000 --> 00:00:09,000\n<b>A</b> &amp;\n");
  assert.equal(check(imported).rows[0].characters, "A &amp;".length);
});
test("Whitespace and blank lines follow the exported text", () => {
  const row = check([cue(0, 9, "  A\r\n\r\n B  \r\n  ")]).rows[0];
  assert.equal(row.characters, 3); assert.equal(row.lineCount, 2); assert.equal(row.longestLine, 2);
});
test("Duration and overlap use the same rounded millisecond times as export", () => {
  const report = check([cue(0, 0.8296), cue(0.8297, 2)]);
  assert.equal(report.rows[0].duration, 0.83); assert.equal(report.counts.duration, 0); assert.equal(report.counts.overlap, 0);
});
test("Invalid timings produce no CPS; the existing validator still blocks exports", () => {
  for (const [start, end] of [[-1, 2], [1, 1], [2, 1], [0, NaN], [null, 1], [0, Infinity], [0, Number.MAX_SAFE_INTEGER], [1, 1.0001]]) {
    const input = [cue(start, end)]; const result = check(input);
    assert.equal(result.errorCues, 1); assert.equal(result.rows[0].cps, null); assert.equal(result.rows[0].duration, null);
    assert.ok(validateSubtitleCues(input)); assert.throws(() => serializeSubtitleCues(input));
  }
});
test("Empty text is an export error, not an invented zero-CPS success", () => {
  const report = check([cue(0, 2, " \n ")]);
  assert.equal(report.counts.emptyText, 1); assert.equal(report.rows[0].cps, null); assert.equal(report.errorCues, 1);
});
test("A long cue overlapping multiple shorter nested cues marks all participants", () => {
  const report = check([cue(0, 10), cue(1, 2), cue(3, 4), cue(10, 11)]);
  assert.deepEqual(report.rows.map(row => row.overlapWith), [1, 0, 0, null]);
  assert.equal(report.counts.overlap, 3);
});
test("Out-of-order and equal-start cues are checked without reordering input", () => {
  const input = [cue(8, 9), cue(1, 10), cue(1, 2), cue(10, 11)];
  const before = structuredClone(input), report = check(input);
  assert.deepEqual(input, before); assert.deepEqual(report.rows.map(row => row.index), [0, 1, 2, 3]);
  assert.equal(report.counts.overlap, 3); assert.equal(report.rows[3].overlapWith, null);
});
test("Multiple hints count a cue once; valid hints do not alter or block exports", () => {
  const input = [cue(0, 0.5, "A".repeat(50) + "\nB\nC")];
  const before = [serializeSubtitleCues(input), serializeSubtitleCues(input, "vtt")];
  Object.freeze(input[0]); Object.freeze(input);
  const report = check(input);
  assert.equal(report.issueCues, 1); assert.equal(report.hintCues, 1); assert.equal(report.errorCues, 0);
  assert.equal(report.rows[0].flags.length, 4);
  assert.deepEqual([serializeSubtitleCues(input), serializeSubtitleCues(input, "vtt")], before);
});
test("Reports are fresh on each invocation and do not leak between inputs", () => {
  const input = [cue(0, 0.1, "Too fast")]; const first = check(input);
  input[0].end = 3; const second = check(input);
  assert.equal(first.issueCues, 1); assert.equal(second.issueCues, 0);
});
test("Ten thousand overlapping cues produce bounded rows and one partner each", () => {
  const input = Array.from({ length: 10000 }, () => cue(0, 10));
  const result = check(input);
  assert.equal(result.rows.length, 10000); assert.equal(result.counts.overlap, 10000);
  assert.ok(result.rows.every(row => Number.isInteger(row.overlapWith) && row.flags.length === 1));
});
test("Many lines do not overflow argument limits, and existing size limits are enforced", () => {
  assert.equal(check([cue(0, 100000, "a\n".repeat(150000))]).rows[0].lineCount, 150000);
  assert.throws(() => check([])); assert.throws(() => check(Array.from({ length: 10001 }, () => cue(0, 1))));
  assert.throws(() => check([cue(0, 1, "a".repeat(2000001))]));
});
console.log(`${passed} subtitle quality checks passed.`);
