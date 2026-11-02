import { diagnoseSubtitles, diagnoseAss, convertDiagnosed, validateOutput } from './subtitle-diagnostics.js?v=b1-20261102';

export function mountConverter(kind) {
  const $ = id => document.getElementById(id);
  const source = $('subtitleText'), file = $('subtitleFile'), result = $('resultText'), section = $('resultSection');
  const selector = $('outputFormat'), copy = $('copyResultBtn'), save = $('downloadResultBtn');
  const summary = $('resultSummary'), details = $('conversionIssues'), ack = $('acceptPartial'), edit = $('outputStatus');
  let readId = 0, active = false, dirty = false, partial = false, format = selector?.value || 'srt';
  const status = (message, error = false) => { $('converterStatus').textContent = message; $('converterStatus').classList.toggle('is-error', error); };
  function update() {
    let error = '', count = 0;
    try { if (active) count = validateOutput(result.value, format); } catch (e) { error = e.message; }
    copy.disabled = save.disabled = !active || !!error || (partial && !ack.checked);
    edit.textContent = active ? (dirty ? 'Result manually edited. ' : '') + (error || count + ' current output cues validated. Text is checked as subtitle syntax, not player appearance.') : '';
    return !copy.disabled;
  }
  function invalidate() {
    active = false; dirty = false; result.value = ''; section.classList.add('hidden'); ack.checked = false; update();
  }
  function replaceAllowed() { return !dirty || window.confirm('Rebuild or clear the result and replace your manual edits? Save your edits first if needed.'); }
  source.addEventListener('input', () => { readId++; invalidate(); status('Source changed. Convert again before exporting.'); });
  result.addEventListener('input', () => { dirty = true; update(); });
  ack.addEventListener('change', update);
  file.addEventListener('change', async () => {
    const selected = file.files?.[0], id = ++readId;
    if (!replaceAllowed()) { file.value = ''; return; }
    invalidate();
    if (!selected) return;
    try {
      if (selected.size > 8_000_000) throw new Error('Open one UTF-8 subtitle file under 8 MB.');
      const text = await selected.text();
      if (id !== readId) return;
      source.value = text; status('File opened locally. Convert to inspect source records.');
    } catch (error) { if (id === readId) status(error.message, true); }
  });
  selector?.addEventListener('change', () => {
    if (!replaceAllowed()) { selector.value = format; return; }
    readId++; format = selector.value; invalidate(); status('Output format changed. Convert again.');
  });
  $('convertBtn').addEventListener('click', () => {
    if (!replaceAllowed()) return;
    readId++; invalidate(); details.replaceChildren();
    try {
      const r = kind === 'ass' ? diagnoseAss(source.value) : diagnoseSubtitles(source.value);
      summary.textContent = 'Initial source: ' + r.candidates + ' candidates; ' + r.cues.length + ' usable; ' + r.skipped + ' skipped; ' + r.unknown + ' unrecognized blocks/records; ' + r.metadata + ' metadata items omitted/normalized.' + (r.unknown ? ' Full source cue count cannot be confirmed.' : '');
      // Bound the rendered list; every item can still be reached without copying source text.
      let offset = 0;
      const more = document.createElement('button'); more.type = 'button'; more.className = 'btn-ghost'; more.textContent = 'Show next 50 source notices';
      const list = document.createElement('ul');
      function show() {
        r.issues.slice(offset, offset + 50).forEach(item => {
          const li = document.createElement('li'), button = document.createElement('button');
          button.type = 'button'; button.className = 'btn-ghost'; button.textContent = 'Line ' + item.line + ': ' + item.reason;
          button.addEventListener('click', () => { const lines = source.value.split('\n'); const start = lines.slice(0, item.line - 1).reduce((n, s) => n + s.length + 1, 0); source.focus(); source.setSelectionRange(start, start + (lines[item.line - 1]?.length || 0)); });
          li.append(button); list.append(li);
        });
        offset += 50; more.classList.toggle('hidden', offset >= r.issues.length);
      }
      more.addEventListener('click', show); details.append(list, more); show();
      section.classList.remove('hidden');
      partial = r.skipped > 0 || r.unknown > 0;
      $('partialNotice').hidden = !partial;
      if (!r.cues.length) { status(r.candidates ? 'No usable cues. Review the source notices.' : 'No recognized subtitle cues. Review source format.', true); return; }
      result.value = convertDiagnosed(r, format); active = true; update();
      status(partial ? 'Partial result. Review the source notices and acknowledge omissions before export.' : 'Converted. Review text, timing and format losses.');
    } catch (error) { status(error.message, true); update(); }
  });
  $('clearBtn').addEventListener('click', () => { if (!replaceAllowed()) return; readId++; source.value = ''; file.value = ''; invalidate(); status('Cleared.'); });
  copy.addEventListener('click', async () => {
    if (!update()) return;
    try { await navigator.clipboard.writeText(result.value); status('Current validated result copied.'); }
    catch { status('Clipboard unavailable. Download the result instead.', true); }
  });
  save.addEventListener('click', () => {
    if (!update()) return;
    const url = URL.createObjectURL(new Blob([result.value], { type: (format === 'vtt' ? 'text/vtt' : 'application/x-subrip') + ';charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'converted-subtitles.' + format; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000); status('Current validated result downloaded.');
  });
  update();
}
