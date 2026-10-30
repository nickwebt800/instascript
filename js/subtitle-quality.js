// Read-only checks against the text and millisecond timing used by the editor's exports.
export const QUALITY_DEFAULTS = Object.freeze({ maxCps: 17, maxLineLength: 42, minDuration: 0.83, maxLines: 2 });
export const QUALITY_LABELS = Object.freeze({
  invalidTime: "Invalid timing", emptyText: "Empty text", cps: "Reading speed",
  lineLength: "Long line", duration: "Short duration", lines: "Too many lines", overlap: "Overlap",
});

export function qualitySettings(values) {
  const settings = {};
  for (const key of Object.keys(QUALITY_DEFAULTS)) {
    const value = Number(values[key]);
    if (!Number.isFinite(value) || value <= 0 || ((key === "maxLines" || key === "maxLineLength") && !Number.isSafeInteger(value))) {
      throw new Error("Use positive numbers for all thresholds, and whole numbers for characters per line and line count.");
    }
    settings[key] = value;
  }
  return settings;
}

export function checkSubtitleQuality(cues, values = QUALITY_DEFAULTS, { segmenter } = {}) {
  const settings = qualitySettings(values);
  if (!Array.isArray(cues) || !cues.length || cues.length > 10000) throw new Error("Load between 1 and 10,000 subtitle cues before checking.");
  if (cues.reduce((total, cue) => total + (typeof cue?.text === "string" ? cue.text.length : 0), 0) > 2_000_000) {
    throw new Error("Use subtitles under 2 million characters before checking.");
  }
  // Passing null explicitly exercises the fallback without changing the browser environment.
  const counter = segmenter === undefined
    ? (typeof Intl.Segmenter === "function" ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : null)
    : segmenter;
  const count = line => {
    if (/^[\x20-\x7e]*$/.test(line)) return line.length;
    let length = 0;
    for (const _ of counter ? counter.segment(line) : line) length++;
    return length;
  };
  const rows = cues.map((cue, index) => {
    const start = Math.round(cue?.start * 1000), end = Math.round(cue?.end * 1000);
    const validTime = Number.isFinite(cue?.start) && cue.start >= 0 && Number.isFinite(cue?.end)
      && cue.end > cue.start && Number.isSafeInteger(start) && Number.isSafeInteger(end) && end > start;
    // Match serializeSubtitleCues: trim outer whitespace and omit blank lines. Never interpret HTML.
    const lines = typeof cue?.text === "string" ? cue.text.trim().split(/\r?\n/).filter(line => line.trim()) : [];
    const lengths = lines.map(count), characters = lengths.reduce((total, length) => total + length, 0);
    const longestLine = lengths.reduce((longest, length) => Math.max(longest, length), 0);
    const duration = validTime ? (end - start) / 1000 : null;
    const cps = validTime && characters ? characters / duration : null;
    const flags = [];
    if (!validTime) flags.push("invalidTime");
    if (!characters) flags.push("emptyText");
    if (cps !== null && cps > settings.maxCps) flags.push("cps");
    if (longestLine > settings.maxLineLength) flags.push("lineLength");
    if (duration !== null && duration < settings.minDuration) flags.push("duration");
    if (lines.length > settings.maxLines) flags.push("lines");
    return { index, start, end, duration, characters, longestLine, lineCount: lines.length, cps, flags, overlapWith: null };
  });
  // One example partner per cue bounds both memory and UI output, including nested intervals.
  const sorted = rows.filter(row => row.duration !== null).slice().sort((a, b) => a.start - b.start || a.index - b.index);
  let furthest = null;
  const mark = (row, partner) => {
    if (row.overlapWith === null) { row.overlapWith = partner.index; row.flags.push("overlap"); }
  };
  for (const row of sorted) {
    if (furthest && row.start < furthest.end) { mark(row, furthest); mark(furthest, row); }
    if (!furthest || row.end > furthest.end) furthest = row;
  }
  const counts = Object.fromEntries(Object.keys(QUALITY_LABELS).map(key => [key, 0]));
  for (const row of rows) for (const flag of row.flags) counts[flag]++;
  return {
    rows, counts, settings, counting: counter ? "graphemes" : "code points",
    issueCues: rows.filter(row => row.flags.length).length,
    errorCues: rows.filter(row => row.flags.includes("invalidTime") || row.flags.includes("emptyText")).length,
    hintCues: rows.filter(row => row.flags.some(flag => flag !== "invalidTime" && flag !== "emptyText")).length,
  };
}
