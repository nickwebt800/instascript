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
    const output = cues.map((cue, index) => (index + 1) + "\n" + cue.time + "\n" + (cue.translation.trim() || cue.source) + "\n").join("\n");
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
    const lines = raw.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").split("\n"), parsed = [];
    let current = null, metadata = false;
    function flush() { if (current && current.text.length) { const source = current.text.join("\n").replace(/<[^>]*>/g, "").trim(); if (source) parsed.push({ time: current.time, source: source, translation: source }); } current = null; }
    lines.forEach(function (line) {
      const clean = line.trim();
      if (/^(NOTE|STYLE|REGION)(?:\s|$)/i.test(clean)) { flush(); metadata = true; return; }
      if (metadata) { if (!clean) metadata = false; return; }
      if (/^WEBVTT(?:\s|$)/i.test(clean) || /^X-TIMESTAMP-MAP=/i.test(clean)) return;
      if (/^.+?\s+-->\s+.+?(?:\s+.*)?$/.test(clean)) { flush(); current = { time: clean.replace(/\s+$/, ""), text: [] }; return; }
      if (!current && (/^\d+$/.test(clean) || clean)) return;
      if (current) { if (!clean) flush(); else current.text.push(line); }
    }); flush();
    if (!parsed.length) throw new Error("No usable SRT or VTT cues were found.");
    return parsed;
  }
  function setStatus(message, isError) { status.textContent = message; status.classList.toggle("is-error", Boolean(isError)); }
  function download(value, filename) { const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([value], { type: "text/plain;charset=utf-8" })); link.download = filename; link.click(); setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000); }
})();
