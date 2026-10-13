import { parseSubtitleCues, subtitleTime, serializeSubtitleCues } from "./js/subtitles.js?v=p2-20261013";

(function () {
  "use strict";
  const fileInput = document.getElementById("subtitleFile");
  const editor = document.getElementById("cueEditor");
  const exportBtn = document.getElementById("exportBtn");
  const clearBtn = document.getElementById("clearBtn");
  const status = document.getElementById("translatorStatus");
  let cues = [];

  fileInput.addEventListener("change", async function () {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    try { loadCues(parseSubtitle(await file.text())); setStatus(file.name + " opened locally. Enter translations in the table."); }
    catch (error) { clearEditor(); setStatus(error.message, true); }
  });

  clearBtn.addEventListener("click", function () { fileInput.value = ""; clearEditor(); setStatus("Cleared."); });
  exportBtn.addEventListener("click", function () {
    if (!cues.length) return;
    const output = serializeSubtitleCues(cues.map(cue => ({ start: cue.start, end: cue.end, text: cue.translation.trim() || cue.source })));
    download(output, "translated-subtitles.srt"); setStatus("Translated SRT downloaded.");
  });

  function loadCues(next) {
    cues = next; editor.innerHTML = "";
    const table = document.createElement("div"); table.className = "cue-table";
    cues.forEach(function (cue, index) {
      const row = document.createElement("div"); row.className = "cue-row";
      const meta = document.createElement("div"); meta.className = "cue-meta"; meta.textContent = (index + 1) + "  " + cue.time;
      const source = document.createElement("div"); source.className = "cue-source"; source.textContent = cue.source;
      const label = document.createElement("label"); label.className = "cue-translation"; label.textContent = "Translation";
      const input = document.createElement("textarea"); input.rows = 2; input.value = cue.source; input.setAttribute("aria-label", "Translation for cue " + (index + 1));
      input.addEventListener("input", function () { cue.translation = input.value; }); label.appendChild(input);
      row.append(meta, source, label); table.appendChild(row);
    });
    editor.appendChild(table); editor.classList.remove("hidden"); exportBtn.disabled = false;
  }

  function clearEditor() { cues = []; editor.innerHTML = ""; editor.classList.add("hidden"); exportBtn.disabled = true; }
  function parseSubtitle(raw) {
    return parseSubtitleCues(raw, { allowSbv: false }).map(cue => ({ ...cue, time: subtitleTime(cue.start) + " --> " + subtitleTime(cue.end), source: cue.text, translation: cue.text }));
  }
  function setStatus(message, isError) { status.textContent = message; status.classList.toggle("is-error", Boolean(isError)); }
  function download(value, filename) { const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([value], { type: "text/plain;charset=utf-8" })); link.download = filename; link.click(); setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000); }
})();
