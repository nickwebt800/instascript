import assert from "node:assert/strict";
import { captionSourceUrl, captionSearchResult } from "../js/youtube-transcript-view.js";
import { findTranscriptMatches } from "../js/transcript-search.js";

const id = "QaVideo_12-";
assert.equal(captionSourceUrl(id, 3.75), "https://www.youtube.com/watch?v=QaVideo_12-&t=3s");
assert.equal(captionSourceUrl(id, 0), "https://www.youtube.com/watch?v=QaVideo_12-&t=0s");
assert.equal(captionSourceUrl(id, 3723.9), "https://www.youtube.com/watch?v=QaVideo_12-&t=3723s");
console.log("PASS Source links use only a validated video ID and whole-second start");
for (const bad of ["https://youtube.com/watch?v=" + id, "<script>", "", null, 12345678901]) {
  assert.equal(captionSourceUrl(bad, 1), null);
}
for (const bad of [-1, NaN, Infinity, null, undefined, "3", Number.MAX_SAFE_INTEGER + 1]) {
  assert.equal(captionSourceUrl(id, bad), null);
}
console.log("PASS Invalid IDs, timestamps and unsafe numeric values never become source links");

const segments = [
  { start: 0, duration: 2.5, text: "🙂 Country country <img onerror=alert(1)>" },
  { start: 3.75, duration: 0, text: "中文 country" },
  { start: null, duration: null, text: "Untimed caption" },
];
const before = JSON.stringify(segments);
const result = captionSearchResult(segments);
assert.deepEqual(findTranscriptMatches(result, "COUNTRY"), [
  { cueIndex: 0, start: 3, end: 10 }, { cueIndex: 0, start: 11, end: 18 },
  { cueIndex: 1, start: 3, end: 10 },
]);
assert.equal(findTranscriptMatches(result, "alert(1)").length, 1);
assert.equal(findTranscriptMatches(result, "country 中文").length, 0);
assert.equal(captionSourceUrl(id, result.cues[2].start), null);
assert.equal(JSON.stringify(segments), before);
result.cues[0].text = "Search-only copy";
assert.equal(JSON.stringify(segments), before);
console.log("PASS Search offsets, literal text and cue boundaries preserve raw export segments");

assert.deepEqual(captionSearchResult([]), { cues: [] });
assert.deepEqual(findTranscriptMatches(captionSearchResult([{ start: 1, text: null }]), "x"), []);
console.log("PASS Empty or absent caption text stays unsearchable");
console.log("4 YouTube search checks passed.");
