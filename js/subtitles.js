// Local subtitle parsing/validation shared by the editor and translator.
export function parseSubtitleTime(value) {
  const raw = String(value ?? "").trim().replace(",", ".");
  if (!/^\d+(?::\d{1,2}){0,2}(?:\.\d{1,3})?$/.test(raw)) return NaN;
  const parts = raw.split(":").map(Number);
  if (parts.length > 1 && parts.at(-1) >= 60) return NaN;
  if (parts.length === 3 && parts[1] >= 60) return NaN;
  const seconds = parts.reduce((total, part) => total * 60 + part, 0);
  return Number.isSafeInteger(Math.round(seconds * 1000)) ? seconds : NaN;
}

export function validateSubtitleCues(cues) {
  if (!Array.isArray(cues) || !cues.length || cues.length > 10000) return "Load between 1 and 10,000 subtitle cues first.";
  for (let i = 0; i < cues.length; i++) {
    const cue = cues[i] || {};
    if (!Number.isFinite(cue.start) || cue.start < 0 || !Number.isFinite(cue.end) || cue.end <= cue.start
        || !Number.isSafeInteger(Math.round(cue.end * 1000))
        || Math.round(cue.end * 1000) <= Math.round(cue.start * 1000)) return "Cue " + (i + 1) + " needs valid times with an end after its start.";
    if (typeof cue.text !== "string" || !cue.text.trim()) return "Cue " + (i + 1) + " needs subtitle text before export.";
  }
  if (cues.reduce((total, cue) => total + cue.text.length, 0) > 2_000_000) return "Use subtitles under 2 million characters.";
  return "";
}

export function subtitleTime(seconds, separator = ",") {
  if (!Number.isFinite(seconds) || seconds < 0) return "";
  const ms = Math.round(seconds * 1000), pad = (number, size) => String(number).padStart(size, "0");
  return pad(Math.floor(ms / 3600000), 2) + ":" + pad(Math.floor(ms / 60000) % 60, 2)
    + ":" + pad(Math.floor(ms / 1000) % 60, 2) + separator + pad(ms % 1000, 3);
}

export function serializeSubtitleCues(cues, format = "srt") {
  const error = validateSubtitleCues(cues);
  if (error) throw new Error(error);
  const vtt = format === "vtt";
  return (vtt ? "WEBVTT\n\n" : "") + cues.map((cue, index) => {
    const text = cue.text.trim().split(/\r?\n/).filter(line => line.trim()).join("\n");
    return (vtt ? "" : (index + 1) + "\n") + subtitleTime(cue.start, vtt ? "." : ",")
      + " --> " + subtitleTime(cue.end, vtt ? "." : ",") + "\n" + text + "\n";
  }).join("\n");
}

export function parseSubtitleCues(raw, { allowSbv = true } = {}) {
  if (typeof raw !== "string" || raw.length > 2_000_000) throw new Error("Use a subtitle file under 2 million characters.");
  const lines = raw.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").split("\n");
  const cues = [];
  let current = null, metadata = false;
  const flush = () => {
    if (current) {
      const text = current.lines.join("\n").replace(/<[^>]*>/g, "").trim();
      if (!text) throw new Error("A subtitle cue has no text. Fix the file and reopen it.");
      cues.push({ start: current.start, end: current.end, text });
    }
    current = null;
  };
  lines.forEach((line, index) => {
    const clean = line.trim();
    if (metadata) { if (!clean) metadata = false; return; }
    if (!current && /^(NOTE|STYLE|REGION)(?:\s|$)/i.test(clean)) { metadata = true; return; }
    if (/^WEBVTT(?:\s|$)/i.test(clean) || /^X-TIMESTAMP-MAP=/i.test(clean)) return;
    const sbv = allowSbv && clean.match(/^(\d+:\d{2}:\d{2}[.,]\d{3}),\s*(\d+:\d{2}:\d{2}[.,]\d{3})$/);
    if (clean.includes("-->") || sbv) {
      flush();
      const match = sbv || clean.match(/^(\S+)\s+-->\s+(\S+)(?:\s+.*)?$/);
      // File timecodes need milliseconds; shorthand is reserved for manual editing.
      const fileTime = value => /^(?:\d{1,}:)?[0-5]\d:[0-5]\d[.,]\d{3}$/.test(value || "") ? parseSubtitleTime(value) : NaN;
      const start = fileTime(match?.[1]), end = fileTime(match?.[2]);
      if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) throw new Error("Invalid subtitle timing on line " + (index + 1) + ". Use valid timecodes with an end after the start, then reopen the file.");
      current = { start, end, lines: [] };
    } else if (!clean) flush();
    else if (current) current.lines.push(line);
  });
  flush();
  if (!cues.length) throw new Error("No usable SRT or VTT cues were found.");
  const error = validateSubtitleCues(cues);
  if (error) throw new Error(error);
  return cues;
}
