import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Load the browser ESM sources without imposing a package.json on this static site.
const moduleUrl = source => "data:text/javascript;base64," + Buffer.from(source).toString("base64");
const subtitleUrl = moduleUrl(await readFile(new URL("../js/subtitles.js", import.meta.url), "utf8"));
const resultSource = (await readFile(new URL("../js/transcript-result.js", import.meta.url), "utf8"))
  .replace("./subtitles.js?v=p0-export-20261014", subtitleUrl);
const { createTranscriptResult, hasTranscriptStartTimes, transcriptText, transcriptSubtitleError, transcriptSubtitles } = await import(moduleUrl(resultSource));
const { parseSubtitleCues } = await import(subtitleUrl);

let checks = 0;
function check(name, run) { run(); checks++; console.log("PASS " + name); }
const result = chunks => createTranscriptResult({ text: "Original aggregate", chunks });
const cue = (start, end, text = "Hello") => ({ timestamp: [start, end], text });

check("Edited cues are authoritative for all formats and preserve source times", () => {
  const source = { text: "Stale aggregate", chunks: [cue(0, 2), cue(1.5, 3.75, "世界 🙂\nSecond line")] };
  const edited = createTranscriptResult(source);
  edited.cues[0].text = "Edited words";
  assert.equal(source.chunks[0].text, "Hello");
  assert.equal(transcriptText(edited), "Edited words 世界 🙂\nSecond line");
  assert.equal(transcriptText(edited, true), "[00:00:00.000] Edited words\n[00:00:01.500] 世界 🙂\nSecond line");
  assert.equal(transcriptSubtitleError(edited), "");
  for (const format of ["srt", "vtt"]) {
    const output = transcriptSubtitles(edited, format);
    assert.deepEqual(parseSubtitleCues(output), edited.cues);
    assert.equal(output.startsWith("WEBVTT"), format === "vtt");
  }
});

for (const [name, start, end] of [
  ["missing end before another segment", 0, null],
  ["undefined end", 0, undefined], ["numeric string end", 0, "2"],
  ["NaN end", 0, NaN], ["infinite end", 0, Infinity],
  ["negative start", -1, 2], ["numeric string start", "0", 2],
  ["missing start", null, 2], ["NaN start", NaN, 2],
  ["infinite start", Infinity, Infinity], ["zero duration", 2, 2],
  ["reverse timing", 3, 2], ["rounded zero duration", 1, 1.0001],
  ["unsafe end", 0, Number.MAX_SAFE_INTEGER],
]) {
  check(name + " blocks both subtitle formats without dropping cues or estimating", () => {
    const edited = result([cue(start, end), cue(5, 6, "Keep me")]);
    assert.equal(edited.cues.length, 2);
    assert.ok(transcriptSubtitleError(edited));
    assert.match(transcriptText(edited), /Hello Keep me/);
    for (const format of ["srt", "vtt"]) assert.throws(() => transcriptSubtitles(edited, format));
  });
}

check("Blank cues block subtitles but keep remaining text; entirely blank output is empty", () => {
  const edited = result([cue(0, 1, " "), cue(1, 2, "Remaining")]);
  assert.equal(transcriptText(edited), "Remaining");
  assert.ok(transcriptSubtitleError(edited));
  edited.cues[1].text = "";
  assert.equal(transcriptText(edited), "");
});
check("Untimed text is editable and remains plain even when timestamps are requested", () => {
  const edited = createTranscriptResult({ text: " Plain draft " });
  assert.equal(hasTranscriptStartTimes(edited), false);
  edited.text = "Edited plain draft";
  assert.equal(transcriptText(edited, true), "Edited plain draft");
  assert.throws(() => transcriptSubtitles(edited, "srt"));
});
check("Mixed start times prefix only genuine available times and preserve untimed text", () => {
  const edited = result([cue(null, null, "Untimed"), cue(3600.125, 3602, "Timed")]);
  assert.ok(hasTranscriptStartTimes(edited));
  assert.equal(transcriptText(edited, true), "Untimed\n[01:00:00.125] Timed");
});
check("Null, missing and empty results do not become exportable notices", () => {
  for (const input of [null, undefined, {}, { text: "", chunks: [] }]) {
    const edited = createTranscriptResult(input);
    assert.equal(transcriptText(edited), "");
    assert.ok(transcriptSubtitleError(edited));
  }
});
check("Cue count and text limits are enforced for exports", () => {
  assert.ok(transcriptSubtitleError(result(Array.from({ length: 10001 }, (_, i) => cue(i, i + 1)))));
  assert.ok(transcriptSubtitleError(result([cue(0, 1, "x".repeat(2000001))])));
});
console.log(`${checks} transcript result checks passed.`);
