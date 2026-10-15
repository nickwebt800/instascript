import assert from "node:assert/strict";
import { transcriptMarkdown, youtubeTranscriptMarkdown } from "../js/transcript-markdown.js";
import { transcriptText, transcriptSubtitleError } from "../js/transcript-result.js";
import { findTranscriptMatches } from "../js/transcript-search.js";

let passed = 0;
function check(name, test) { test(); passed++; console.log("PASS " + name); }
const id = "QaVideo_12-";

check("Latest edited cue text is authoritative and exports do not mutate the result", () => {
  const result = { text: "Stale original", cues: [{ start: 1.2, end: 2, text: "Original" }] };
  result.cues[0].text = "Edited words";
  const before = JSON.stringify(result);
  assert.equal(transcriptMarkdown(result), "# Transcript\n\nEdited words\n");
  assert.equal(transcriptText(result), "Edited words");
  assert.equal(JSON.stringify(result), before);
});
check("Only genuine start times are included; Markdown works without subtitle end times", () => {
  const cues = [1.2, null, undefined, "2", NaN, Infinity, -1, Number.MAX_SAFE_INTEGER].map(start => ({ start, text: "Words" }));
  assert.notEqual(transcriptSubtitleError({ cues }), "");
  const output = transcriptMarkdown({ cues }, { timestamps: true });
  assert.equal((output.match(/\*\*00:00:01.200\*\*/g) || []).length, 1);
  assert.equal((output.match(/\*\*/g) || []).length, 2);
  assert(!/NaN|Infinity|null|undefined/.test(output));
});
check("Untimed fallback, multiline Unicode and empty cues preserve readable paragraphs", () => {
  assert.equal(transcriptMarkdown({ text: "🙂 中文\r\nsecond line" }), "# Transcript\n\n🙂 中文  \nsecond line\n");
  assert.equal(transcriptMarkdown({ cues: [{ text: "one" }, { text: " " }, { text: "two" }] }), "# Transcript\n\none\n\ntwo\n");
  for (const result of [null, {}, { text: " " }, { text: "Stale", cues: [{ text: "" }] }]) assert.equal(transcriptMarkdown(result), "");
});
check("Transcript Markdown, HTML, entities and title newlines cannot create active markup", () => {
  const output = transcriptMarkdown({ text: "# heading\n![image](https://example.com)\n<script>x</script> &lt;tag&gt;\n1. numbered\n    ```code```" }, { title: "Title\n# Injected" });
  assert(output.startsWith("# Title \\# Injected\n\n"));
  assert(output.includes("\\!\\[image\\]\\(https://example\\.com\\)"));
  assert(output.includes("\\<script\\>x\\</script\\> \\&lt;tag\\&gt;"));
  assert(output.includes("1\\. numbered"));
  assert(!output.includes("\n    "));
  assert(output.includes("\\`\\`\\`code\\`\\`\\`"));
});
check("YouTube note links only validated IDs and floors source times without signed track URLs", () => {
  const segments = [{ start: 3.75, duration: 0, text: "Caption" }];
  const before = JSON.stringify(segments);
  const output = youtubeTranscriptMarkdown(segments, { title: "Video", videoId: id, language: "English", timestamps: true });
  assert(output.includes("Source: https://www.youtube.com/watch?v=" + id + "\n"));
  assert(output.includes("Caption language: English\n"));
  assert(output.includes("[00:00:03.750](https://www.youtube.com/watch?v=" + id + "&t=3s) Caption"));
  assert.equal(JSON.stringify(segments), before);
});
check("Plain mode omits time links but keeps source; invalid IDs never become links", () => {
  const segments = [{ start: 3.75, text: "Caption" }];
  const plain = youtubeTranscriptMarkdown(segments, { videoId: id });
  assert(plain.includes("Source:")); assert(!plain.includes("&t="));
  for (const bad of ["javascript:alert(1)", "https://example.com", id + "&token=x", null, 12345678901]) {
    const output = youtubeTranscriptMarkdown(segments, { videoId: bad, timestamps: true });
    assert(!output.includes("Source:")); assert(!output.includes("](https:"));
  }
});
check("Search and subsequent edits cannot add query or highlight markup to notes", () => {
  const result = { cues: [{ start: 0, end: 1, text: "country country" }] };
  const before = transcriptMarkdown(result);
  assert.equal(findTranscriptMatches(result, "country").length, 2);
  assert.equal(transcriptMarkdown(result), before);
  result.cues[0].text = "New words";
  assert(!transcriptMarkdown(result).includes("country"));
  assert(!transcriptMarkdown(result).includes("<mark>"));
});
check("One thousand cues retain every paragraph and no source metadata leaks into local notes", () => {
  const cues = Array.from({ length: 1000 }, (_, i) => ({ start: i, text: "Cue " + i }));
  const output = transcriptMarkdown({ cues });
  assert.equal((output.match(/Cue /g) || []).length, 1000);
  assert(output.endsWith("Cue 999\n"));
  assert(!output.includes("Source:")); assert(!output.includes("Caption language:"));
});
console.log(passed + " Markdown checks passed.");
