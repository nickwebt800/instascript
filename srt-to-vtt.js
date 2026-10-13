import { parseSubtitleTime, serializeSubtitleCues } from './js/subtitles.js?v=p2-20261013';

// Require complete numbered SRT blocks; never export a partial conversion.
export function convertSrtToVtt(raw) {
  if (typeof raw !== 'string' || raw.length > 2_000_000) throw new Error('Use SRT under 2 million characters.');
  const source = raw.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim();
  if (!source) throw new Error('Paste or open an SRT file first.');
  const blocks = source.split(/\n[ \t]*\n+/);
  const cues = blocks.map((block, index) => {
    const lines = block.split('\n');
    if (!/^\d+$/.test(lines[0].trim())) throw new Error('Cue ' + (index + 1) + ' needs a numeric SRT identifier.');
    const range = lines[1]?.trim().match(/^(\d{2,}:[0-5]\d:[0-5]\d,\d{3})\s+-->\s+(\d{2,}:[0-5]\d:[0-5]\d,\d{3})$/);
    if (!range) throw new Error('Cue ' + (index + 1) + ' needs HH:MM:SS,mmm --> HH:MM:SS,mmm timing.');
    // Plain text output: strip source tags and escape WebVTT control characters.
    const text = lines.slice(2).join('\n').replace(/<[^>]*>/g, '').trim();
    return { start: parseSubtitleTime(range[1]), end: parseSubtitleTime(range[2]), text: text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') };
  });
  if (cues.some((cue, i) => i > 0 && cue.start < cues[i - 1].start)) throw new Error('Cue start times must be in chronological order. Correct the SRT before converting.');
  const output = serializeSubtitleCues(cues, 'vtt');
  const warnings = [];
  if (cues.some((cue, i) => i > 0 && cue.start < cues[i - 1].end)) warnings.push('Adjacent cues overlap.');
  return { output, count: cues.length, warnings };
}

if (typeof document !== 'undefined') {
  const $ = id => document.getElementById(id);
  const source = $('subtitleText'), result = $('resultText'), section = $('resultSection');
  const status = (message, error = false) => { $('converterStatus').textContent = message; $('converterStatus').classList.toggle('is-error', error); };
  let readId = 0;
  const invalidate = () => { result.value = ''; section.classList.add('hidden'); };
  source.addEventListener('input', () => { readId++; invalidate(); status('Source changed. Convert again before exporting.'); });
  $('subtitleFile').addEventListener('change', async () => {
    const file = $('subtitleFile').files?.[0];
    const current = ++readId;
    invalidate();
    if (!file) return;
    try {
      if (file.size > 8_000_000) throw new Error('Open an SRT file under 8 MB.');
      const text = await file.text();
      if (current !== readId) return;
      source.value = text;
      status('SRT opened locally. Convert to validate every cue.');
    } catch (error) { if (current === readId) status(error.message, true); }
  });
  $('convertBtn').addEventListener('click', () => {
    invalidate();
    try {
      const converted = convertSrtToVtt(source.value);
      result.value = converted.output;
      $('resultSummary').textContent = converted.count + ' cues converted. Timing and cue order retained; source styling removed.';
      section.classList.remove('hidden');
      status(converted.warnings.length ? 'Converted. Review: ' + converted.warnings.join(' ') : 'Converted to WebVTT. Review in your target player.');
    } catch (error) { status(error.message, true); }
  });
  $('clearBtn').addEventListener('click', () => { readId++; source.value = ''; $('subtitleFile').value = ''; invalidate(); status('Cleared.'); });
  $('copyResultBtn').addEventListener('click', async () => {
    if (!result.value) return;
    try { await navigator.clipboard.writeText(result.value); status('WebVTT copied.'); }
    catch { status('Clipboard unavailable. Select the result and copy it, or download VTT.', true); }
  });
  $('downloadResultBtn').addEventListener('click', () => {
    if (!result.value) return;
    const url = URL.createObjectURL(new Blob([result.value], { type: 'text/vtt;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'converted-subtitles.vtt'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000); status('WebVTT downloaded.');
  });
}
