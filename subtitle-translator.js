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
    const output = cues.map((cue, index) => {
      const text = (cue.translation.trim() || cue.source).split(/\r?\n/).filter((line) => line.trim()).join("\n");
      return (index + 1) + "\n" + cue.time + "\n" + text + "\n";
    }).join("\n");
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
    function flush() {
      if (current) {
        const source = current.text.join("\n").replace(/<[^>]*>/g, "").trim();
        if (!source) throw new Error("A subtitle cue has no text. Fix the file and reopen it.");
        parsed.push({ time: current.time, source, translation: source });
      }
      current = null;
    }
    lines.forEach(function (line, index) {
      const clean = line.trim();
      if (metadata) { if (!clean) metadata = false; return; }
      if (!current && /^(NOTE|STYLE|REGION)(?:\s|$)/i.test(clean)) { metadata = true; return; }
      if (/^WEBVTT(?:\s|$)/i.test(clean) || /^X-TIMESTAMP-MAP=/i.test(clean)) return;
      if (clean.includes("-->")) {
        flush();
        const match = clean.match(/^(\S+)\s+-->\s+(\S+)(?:\s+.*)?$/);
        const start = match ? parseTime(match[1]) : null;
        const end = match ? parseTime(match[2]) : null;
        if (start === null || end === null || end <= start) {
          throw new Error("Invalid subtitle timing on line " + (index + 1) + ". Use valid timecodes with an end after the start, then reopen the file.");
        }
        current = { time: srtTime(start) + " --> " + srtTime(end), text: [] };
        return;
      }
      if (!current && (/^\d+$/.test(clean) || clean)) return;
      if (current) { if (!clean) flush(); else current.text.push(line); }
    }); flush();
    if (!parsed.length) throw new Error("No usable SRT or VTT cues were found.");
    return parsed;
  }
  function parseTime(value) {
    const match = value.match(/^(?:(\d{2,}):)?(\d{2}):(\d{2})[.,](\d{3})$/);
    if (!match) return null;
    const hours = Number(match[1] || 0), minutes = Number(match[2]), seconds = Number(match[3]);
    if (minutes > 59 || seconds > 59) return null;
    const ms = ((hours * 60 + minutes) * 60 + seconds) * 1000 + Number(match[4]);
    return Number.isSafeInteger(ms) ? ms : null;
  }
  function srtTime(ms) {
    const pad = (number, length) => String(number).padStart(length, "0");
    return pad(Math.floor(ms / 3600000), 2) + ":" + pad(Math.floor(ms / 60000) % 60, 2) + ":" + pad(Math.floor(ms / 1000) % 60, 2) + "," + pad(ms % 1000, 3);
  }
  function setStatus(message, isError) { status.textContent = message; status.classList.toggle("is-error", Boolean(isError)); }
  function download(value, filename) { const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([value], { type: "text/plain;charset=utf-8" })); link.download = filename; link.click(); setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000); }
})();
