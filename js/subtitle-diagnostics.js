import { parseSubtitleTime, validateSubtitleCues, serializeSubtitleCues } from './subtitles.js?v=p2-20261013';

const normalize = raw => {
  if (typeof raw !== 'string' || raw.length > 2_000_000) throw new Error('Use subtitles under 2 million characters.');
  return raw.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
};
function report() { return { cues: [], candidates: 0, skipped: 0, unknown: 0, metadata: 0, issues: [] }; }
function issue(r, line, reason, kind = 'skipped') {
  r[kind]++;
  r.issues.push({ line, reason });
}
function accept(r, line, start, end, text) {
  r.candidates++;
  const cue = { start, end, text };
  const error = validateSubtitleCues([cue]);
  if (error) issue(r, line, !text.trim() ? 'Empty caption text.' : 'Invalid time range; end must follow start.');
  else r.cues.push(cue);
}
const fileTime = value => /^(?:\d+:)?[0-5]\d:[0-5]\d[.,]\d{3}$/.test(value || '') ? parseSubtitleTime(value) : NaN;

// Blank lines delimit blocks. Metadata and identifiers never become caption text.
export function diagnoseSubtitles(raw) {
  const lines = normalize(raw).split('\n'), r = report();
  const vtt = /^WEBVTT(?:\s|$)/.test(lines[0]);
  for (let i = 0; i < lines.length;) {
    if (!lines[i].trim()) { i++; continue; }
    const first = i;
    while (i < lines.length && lines[i].trim()) i++;
    const block = lines.slice(first, i);
    if (vtt && (first === 0 || /^(NOTE|STYLE|REGION)(?:\s|$)/.test(block[0]))) {
      if (first === 0 && block.slice(1).some(line => line.includes('-->'))) issue(r, first + 1, 'Missing blank line after WebVTT header; review this unrecognized block.', 'unknown');
      else issue(r, first + 1, 'WebVTT header or metadata block omitted.', 'metadata');
      continue;
    }
    let t = block[0].includes('-->') ? 0 : block[1]?.includes('-->') ? 1 : -1;
    const sbv = block[0].match(/^(\d+:\d{2}:\d{2}[.,]\d{3}),\s*(\d+:\d{2}:\d{2}[.,]\d{3})$/);
    if (t < 0 && !sbv) { issue(r, first + 1, 'Unrecognized block. Full source cue count cannot be confirmed.', 'unknown'); continue; }
    if (sbv) t = 0;
    const range = sbv || block[t].trim().match(/^(\S+)\s+-->\s+(\S+)(?:\s+(.*))?$/);
    if (t === 1) issue(r, first + 1, 'Source cue identifier omitted; SRT numbering is regenerated.', 'metadata');
    if (range?.[3]) issue(r, first + t + 1, 'Cue settings and positioning omitted.', 'metadata');
    const body = block.slice(t + 1).join('\n');
    // This route retains literal markup/entities; do not guess their rendered appearance.
    accept(r, first + t + 1, fileTime(range?.[1]), fileTime(range?.[2]), body.trim());
  }
  if (r.candidates > 10000) throw new Error('Use at most 10,000 candidate cues.');
  return r;
}

export function diagnoseAss(raw) {
  const r = report(); let events = false, format = null;
  normalize(raw).split('\n').forEach((line, index) => {
    const s = line.trim(), lineNo = index + 1;
    if (!s) return;
    if (/^\[.*\]$/.test(s)) { events = /^\[events\]$/i.test(s); format = null; r.metadata++; return; }
    if (!events && /^Dialogue\s*:/i.test(s)) { issue(r, lineNo, 'Dialogue outside an Events section is unrecognized.', 'unknown'); return; }
    if (!events || /^;|^Comment\s*:/i.test(s)) { r.metadata++; return; }
    if (/^Format\s*:/i.test(s)) { format = s.slice(s.indexOf(':') + 1).split(',').map(x => x.trim().toLowerCase()); r.metadata++; return; }
    if (!/^Dialogue\s*:/i.test(s)) { issue(r, lineNo, 'Unrecognized Events record.', 'unknown'); return; }
    const fields = format || ['layer','start','end','style','name','marginl','marginr','marginv','effect','text'];
    const ti = fields.indexOf('text'), si = fields.indexOf('start'), ei = fields.indexOf('end');
    const parts = s.slice(s.indexOf(':') + 1).trim().split(',');
    if (ti !== fields.length - 1 || si < 0 || ei < 0 || new Set(fields).size !== fields.length || parts.length < fields.length) {
      r.candidates++; issue(r, lineNo, 'Unsupported or incomplete Format/Dialogue fields; Text must be last.'); return;
    }
    const body = parts.slice(ti).join(',');
    if (/\\p[1-9]/i.test(body)) { r.candidates++; issue(r, lineNo, 'Drawing-mode Dialogue requires an ASS-aware editor.'); return; }
    const text = body.replace(/\{[^}]*\}/g, '').replace(/\\[Nn]/g, '\n').replace(/\\h/g, ' ').trim();
    if (text !== body.trim()) issue(r, lineNo, 'ASS overrides removed; line-break/space escapes expanded.', 'metadata');
    const time = value => /^\d+:[0-5]\d:[0-5]\d[.:]\d{1,3}$/.test(value.trim()) ? parseSubtitleTime(value.trim().replace(/:(\d{1,3})$/, '.$1')) : NaN;
    accept(r, lineNo, time(parts[si]), time(parts[ei]), text);
  });
  if (r.candidates > 10000) throw new Error('Use at most 10,000 Dialogue records.');
  return r;
}

// Validate the entire edited output, including unknown blocks and format syntax.
export function validateOutput(raw, format) {
  const source = normalize(raw).trim();
  if (!source) throw new Error('The result is empty.');
  let blocks = source.split(/\n[ \t]*\n+/);
  if (format === 'vtt') {
    if (blocks.shift() !== 'WEBVTT') throw new Error('WebVTT output needs a WEBVTT header and a blank line.');
  }
  const cues = blocks.map((block, i) => {
    const lines = block.split('\n');
    if (format === 'srt' && !/^\d+$/.test(lines.shift())) throw new Error('Output cue ' + (i + 1) + ' needs a numeric identifier.');
    const timePattern = format === 'srt' ? /^(\d{2,}:[0-5]\d:[0-5]\d,\d{3}) --> (\d{2,}:[0-5]\d:[0-5]\d,\d{3})$/ : /^(\d{2,}:[0-5]\d:[0-5]\d\.\d{3}) --> (\d{2,}:[0-5]\d:[0-5]\d\.\d{3})$/;
    const match = lines.shift()?.trim().match(timePattern);
    if (!match) throw new Error('Output cue ' + (i + 1) + ' has invalid timing syntax.');
    const text = lines.join('\n').trim();
    if (text.includes('-->')) throw new Error('Caption text contains a reserved timing arrow. Review the source.');
    return { start: parseSubtitleTime(match[1]), end: parseSubtitleTime(match[2]), text };
  });
  const error = validateSubtitleCues(cues); if (error) throw new Error(error);
  return cues.length;
}
export function convertDiagnosed(r, format) {
  const output = serializeSubtitleCues(r.cues, format);
  validateOutput(output, format);
  return output;
}
