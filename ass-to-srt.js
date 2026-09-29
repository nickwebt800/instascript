(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const input = $("subtitleText"), fileInput = $("subtitleFile"), status = $("converterStatus");
  const resultSection = $("resultSection"), resultText = $("resultText"), resultSummary = $("resultSummary");
  let result = "";

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    try { input.value = await file.text(); setStatus(file.name + " opened locally. Click Convert to SRT."); }
    catch (error) { setStatus("Could not read that file. Try a UTF-8 ASS or SSA file.", true); }
  });
  $("convertBtn").addEventListener("click", () => {
    try {
      if (!input.value.trim()) throw new Error("Paste or open an ASS or SSA file first.");
      const cues = parseAss(input.value);
      if (!cues.length) throw new Error("No usable Dialogue cues were found.");
      result = cues.map((cue, i) => `${i + 1}\n${formatTime(cue.start)} --> ${formatTime(cue.end)}\n${cue.text}\n`).join("\n");
      resultText.value = result; resultSummary.textContent = cues.length + " cue" + (cues.length === 1 ? "" : "s") + " ready to review.";
      resultSection.classList.remove("hidden"); setStatus("Converted " + cues.length + " ASS cue" + (cues.length === 1 ? "" : "s") + " to SRT.");
      resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) { resultSection.classList.add("hidden"); setStatus(error.message, true); }
  });
  $("clearBtn").addEventListener("click", () => { input.value = ""; resultText.value = ""; result = ""; fileInput.value = ""; resultSection.classList.add("hidden"); setStatus("Cleared."); });
  $("copyResultBtn").addEventListener("click", async () => { if (!resultText.value) return; try { await copyText(resultText.value); setStatus("SRT copied to the clipboard."); } catch (error) { setStatus("Clipboard access was not available.", true); } });
  $("downloadResultBtn").addEventListener("click", () => { if (!resultText.value) return; download(resultText.value, "converted-subtitles.srt"); setStatus("SRT downloaded."); });

  function parseAss(raw) {
    const lines = raw.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").split("\n");
    let inEvents = false, format = null, cues = [];
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (/^\s*\[events\]\s*$/i.test(trimmed)) { inEvents = true; return; }
      if (/^\s*\[[^\]]+\]\s*$/i.test(trimmed) && !/^\s*\[events\]\s*$/i.test(trimmed)) { inEvents = false; return; }
      if (!inEvents || !trimmed || /^;/.test(trimmed)) return;
      if (/^format\s*:/i.test(trimmed)) { format = trimmed.slice(trimmed.indexOf(":") + 1).split(",").map((x) => x.trim().toLowerCase()); return; }
      if (!/^dialogue\s*:/i.test(trimmed)) return;
      const body = trimmed.slice(trimmed.indexOf(":") + 1).trim();
      const parts = body.split(",");
      const startIndex = format ? format.indexOf("start") : 1, endIndex = format ? format.indexOf("end") : 2, textIndex = format ? format.indexOf("text") : 9;
      if (startIndex < 0 || endIndex < 0 || textIndex < 0 || parts.length <= Math.max(startIndex, endIndex, textIndex)) return;
      const text = parts.slice(textIndex).join(",").replace(/\{[^}]*\}/g, "").replace(/\\N/gi, "\n").replace(/\\n/gi, "\n").replace(/\\h/gi, " ").trim();
      const start = parseTime(parts[startIndex]), end = parseTime(parts[endIndex]);
      if (text && Number.isFinite(start) && Number.isFinite(end) && end > start) cues.push({ start, end, text });
    });
    return cues;
  }
  function parseTime(value) { const m = String(value || "").trim().match(/^(\d+):(\d{1,2}):(\d{1,2})[.:](\d{1,3})$/); if (!m) return NaN; return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]) + Number((m[4] + "00").slice(0, 3)) / 1000; }
  function formatTime(value) { const total = Math.max(0, Math.round(value * 1000)), h = Math.floor(total / 3600000), m = Math.floor((total % 3600000) / 60000), s = Math.floor((total % 60000) / 1000), ms = total % 1000; return [h, m, s].map((x) => String(x).padStart(2, "0")).join(":") + "," + String(ms).padStart(3, "0"); }
  function setStatus(message, isError) { status.textContent = message; status.classList.toggle("is-error", Boolean(isError)); }
  async function copyText(value) { if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(value); const helper = document.createElement("textarea"); helper.value = value; helper.style.position = "fixed"; helper.style.opacity = "0"; document.body.appendChild(helper); helper.select(); document.execCommand("copy"); helper.remove(); }
  function download(content, filename) { const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([content], { type: "application/x-subrip;charset=utf-8" })); link.download = filename; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000); }
})();
