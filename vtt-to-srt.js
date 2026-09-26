(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const input = $("subtitleText");
  const fileInput = $("subtitleFile");
  const outputFormat = $("outputFormat");
  const status = $("converterStatus");
  const resultSection = $("resultSection");
  const resultText = $("resultText");
  const resultSummary = $("resultSummary");
  let entries = [];
  let result = "";

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    try {
      input.value = await file.text();
      const extension = file.name.toLowerCase().split(".").pop();
      setStatus(file.name + " opened locally. " + (extension === "sbv" ? "SBV input detected." : "Choose an output format and convert."));
    } catch (error) {
      setStatus("Could not read that file. Try a UTF-8 subtitle file.", true);
    }
  });

  $("convertBtn").addEventListener("click", () => {
    try {
      if (!input.value.trim()) throw new Error("Paste or open a subtitle file first.");
      entries = parseSubtitle(input.value);
      if (!entries.length) throw new Error("No usable subtitle cues were found.");
      result = outputFormat.value === "vtt" ? toVtt(entries) : toSrt(entries);
      resultText.value = result;
      resultSummary.textContent = entries.length + " cue" + (entries.length === 1 ? "" : "s") + " ready to review.";
      resultSection.classList.remove("hidden");
      setStatus("Converted to " + outputFormat.value.toUpperCase() + ".");
      resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      resultSection.classList.add("hidden");
      setStatus(error.message, true);
    }
  });

  $("clearBtn").addEventListener("click", () => {
    input.value = "";
    resultText.value = "";
    result = "";
    entries = [];
    fileInput.value = "";
    resultSection.classList.add("hidden");
    setStatus("Cleared.");
  });

  $("copyResultBtn").addEventListener("click", async () => {
    if (!resultText.value) return;
    try {
      await copyText(resultText.value);
      setStatus(outputFormat.value.toUpperCase() + " copied to the clipboard.");
    } catch (error) {
      setStatus("Clipboard access was not available.", true);
    }
  });

  $("downloadResultBtn").addEventListener("click", () => {
    if (!resultText.value) return;
    const format = outputFormat.value;
    download(resultText.value, "converted-subtitles." + format, format === "vtt" ? "text/vtt" : "application/x-subrip");
    setStatus(format.toUpperCase() + " downloaded.");
  });

  outputFormat.addEventListener("change", () => {
    if (!entries.length) return;
    result = outputFormat.value === "vtt" ? toVtt(entries) : toSrt(entries);
    resultText.value = result;
    resultSummary.textContent = entries.length + " cue" + (entries.length === 1 ? "" : "s") + " ready to review.";
    setStatus("Output changed to " + outputFormat.value.toUpperCase() + ".");
  });

  function parseSubtitle(raw) {
    const normalized = raw.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
    const lines = normalized.split("\n");
    const isVtt = /^\s*WEBVTT(?:\s|$)/i.test(normalized);
    const found = [];
    let current = null;

    const flush = () => {
      if (current && current.text.trim()) {
        const start = parseTime(current.start);
        const end = parseTime(current.end);
        if (Number.isFinite(start) && Number.isFinite(end) && end > start) {
          found.push({ start: start, end: end, text: current.text.trim() });
        }
      }
      current = null;
    };

    lines.forEach((line) => {
      const clean = line.trim();
      if (/^WEBVTT(?:\s|$)/i.test(clean) || /^NOTE(?:\s|$)/i.test(clean) || /^STYLE(?:\s|$)/i.test(clean) || /^REGION(?:\s|$)/i.test(clean)) return;
      const range = clean.match(/^(.+?)\s+-->\s+(.+?)(?:\s+.*)?$/);
      const sbv = clean.match(/^(\d{1,2}:\d{2}:\d{2}[.,]\d{3}),\s*(\d{1,2}:\d{2}:\d{2}[.,]\d{3})$/);
      if (range) {
        flush();
        current = { start: range[1], end: range[2], text: "" };
        return;
      }
      if (!isVtt && sbv) {
        flush();
        current = { start: sbv[1], end: sbv[2], text: "" };
        return;
      }
      if (/^\d+$/.test(clean)) return;
      if (current) current.text += (current.text ? "\n" : "") + line;
    });
    flush();
    return found;
  }

  function parseTime(value) {
    let raw = String(value || "").trim().replace(",", ".");
    raw = raw.replace(/\s+.*$/, "");
    const parts = raw.split(":").map(Number);
    if (!parts.length || parts.some((part) => !Number.isFinite(part))) return NaN;
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return parts[0];
  }

  function time(value, separator) {
    const total = Math.max(0, Math.round(value * 1000));
    const hours = Math.floor(total / 3600000);
    const minutes = Math.floor((total % 3600000) / 60000);
    const seconds = Math.floor((total % 60000) / 1000);
    const millis = total % 1000;
    return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":") + separator + String(millis).padStart(3, "0");
  }

  function toSrt(items) {
    return items.map((entry, index) => `${index + 1}\n${time(entry.start, ",")} --> ${time(entry.end, ",")}\n${entry.text}\n`).join("\n");
  }

  function toVtt(items) {
    return "WEBVTT\n\n" + items.map((entry) => `${time(entry.start, ".")} --> ${time(entry.end, ".")}\n${entry.text}\n`).join("\n");
  }

  function setStatus(message, isError) {
    status.textContent = message;
    status.classList.toggle("is-error", Boolean(isError));
  }

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(value);
    const helper = document.createElement("textarea");
    helper.value = value;
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }

  function download(content, filename, type) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type: type + ";charset=utf-8" }));
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }
})();
