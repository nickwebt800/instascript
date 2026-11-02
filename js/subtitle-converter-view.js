import { diagnoseSubtitles, diagnoseAss, convertDiagnosed, validateOutput } from './subtitle-diagnostics.js?v=b1-20261102';

export function mountConverter(kind) {
  const $ = id => document.getElementById(id);
  const source = $('subtitleText'), file = $('subtitleFile'), result = $('resultText'), section = $('resultSection');
  const selector = $('outputFormat'), copy = $('copyResultBtn'), save = $('downloadResultBtn');
  const summary = $('resultSummary'), details = $('conversionIssues'), ack = $('acceptPartial'), edit = $('outputStatus');
  let readId = 0, reading = false, active = false, dirty = false, partial = false, format = selector?.value || 'srt';
  const setReading = value => { reading = value; $('convertBtn').disabled = value; };
  $('openFileBtn').addEventListener('click', () => file.click());
  const status = (message, error = false) => { $('converterStatus').textContent = message; $('converterStatus').classList.toggle('is-error', error); };
  function update() {
    let error = '', count = 0;
    try { if (active) count = validateOutput(result.value, format); } catch (e) { error = e.message; }
    copy.disabled = save.disabled = !active || !!error || (partial && !ack.checked);
    edit.textContent = active ? (dirty ? 'Result manually edited. ' : '') + (error || count + ' current output cues validated. Text is checked as subtitle syntax, not player appearance.') : '';
    return !copy.disabled;
  }
  const confirmation = document.createElement('div');
  confirmation.className = 'tool-status hidden';
  confirmation.setAttribute('role', 'group');
  confirmation.setAttribute('aria-label', 'Replace manual result edits');
  const prompt = document.createElement('p');
  prompt.textContent = 'This will replace your manual result edits. Save them first if needed.';
  const keep = document.createElement('button'), discard = document.createElement('button');
  keep.type = discard.type = 'button'; keep.className = discard.className = 'btn-ghost';
  keep.textContent = 'Keep edits'; discard.textContent = 'Discard edits and continue';
  confirmation.append(prompt, keep, discard); $('converterStatus').after(confirmation);
  let pendingReplacement = null, replacementTrigger = null;
  function closeConfirmation() { pendingReplacement = null; confirmation.classList.add('hidden'); }
  function requestReplacement(run, trigger) {
    if (!dirty) return run();
    pendingReplacement = run; replacementTrigger = trigger;
    confirmation.classList.remove('hidden'); keep.focus();
  }
  keep.addEventListener('click', () => { closeConfirmation(); file.value = ''; replacementTrigger?.focus(); });
  discard.addEventListener('click', () => {
    const run = pendingReplacement; closeConfirmation(); run?.(); replacementTrigger?.focus();
  });
  function invalidate() {
    closeConfirmation();
    active = false; dirty = false; result.value = ''; section.classList.add('hidden'); ack.checked = false; update();
  }
  source.addEventListener('input', () => { readId++; setReading(false); invalidate(); status('Source changed. Convert again before exporting.'); });
  result.addEventListener('input', () => { closeConfirmation(); dirty = true; update(); });
  ack.addEventListener('change', update);
  async function readSelectedFile(selected) {
    const id = ++readId;
    invalidate();
    if (!selected) { setReading(false); return; }
    source.value = ''; setReading(true); status('Reading the selected file locally…');
    try {
      if (selected.size > 8_000_000) throw new Error('Open one UTF-8 subtitle file under 8 MB.');
      const text = await selected.text();
      if (id !== readId) return;
      source.value = text; status('File opened locally. Convert to inspect source records.');
    } catch (error) { if (id === readId) status(error.message, true); }
    finally { if (id === readId) setReading(false); }
  }
  file.addEventListener('change', () => {
    const selected = file.files?.[0];
    if (selected) return requestReplacement(() => readSelectedFile(selected), $('openFileBtn'));
  });
  selector?.addEventListener('change', () => {
    const nextFormat = selector.value; selector.value = format;
    requestReplacement(() => {
      readId++; setReading(false); format = nextFormat; selector.value = format; invalidate(); status('Output format changed. Convert again.');
    }, selector);
  });
  function convert() {
    if (reading) return;
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
  }
  $('convertBtn').addEventListener('click', () => requestReplacement(convert, $('convertBtn')));
  $('clearBtn').addEventListener('click', () => requestReplacement(() => { readId++; setReading(false); source.value = ''; file.value = ''; invalidate(); status('Cleared.'); }, $('clearBtn')));
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
