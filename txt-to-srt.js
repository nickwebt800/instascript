(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const sourceText = $("sourceText");
  const fileInput = $("fileInput");
  const status = $("status");
  const editorSection = $("editorSection");
  const subtitleRows = $("subtitleRows");
  let mode = "plain";
  let entries = [];

  document.querySelectorAll(".mode-button").forEach((button) => {
    button.addEventListener("click", () => {
      mode = button.dataset.mode;
      document.querySelectorAll(".mode-button").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });
      setStatus(mode === "plain" ? "Plain text timing selected." : "Timestamp parsing selected.");
    });
  });

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    try {
      sourceText.value = await file.text();
      const extension = file.name.toLowerCase().split(".").pop();
      if (extension === "srt" || extension === "vtt") {
        mode = "timestamps";
        document.querySelector('[data-mode="timestamps"]').click();
      } else {
        mode = "plain";
        document.querySelector('[data-mode="plain"]').click();
      }
      setStatus(file.name + " opened locally.");
    } catch (error) {
      setStatus("Could not read that file. Try a UTF-8 text file.", true);
    }
  });

  $("generateBtn").addEventListener("click", () => {
    try {
      if (!sourceText.value.trim()) throw new Error("Paste or open some text first.");
      entries = mode === "timestamps" ? parseTimestamped(sourceText.value) : buildPlain(sourceText.value);
      if (!entries.length) throw new Error("No subtitle text was found.");
      renderRows();
      editorSection.classList.remove("hidden");
      editorSection.scrollIntoView({ behavior: "smooth", block: "start" });
      setStatus(entries.length + " entries ready to edit.");
    } catch (error) {
      setStatus(error.message, true);
    }
  });

  $("clearBtn").addEventListener("click", () => {
    sourceText.value = "";
    entries = [];
    subtitleRows.innerHTML = "";
    editorSection.classList.add("hidden");
    fileInput.value = "";
    setStatus("Cleared.");
  });

  $("addRowBtn").addEventListener("click", () => {
    const last = entries[entries.length - 1];
    const start = last ? toSeconds(last.end) + number("entryGap", 0.1) : toSeconds($("startTime").value);
    const duration = timingSettings().defaultDuration;
    entries.push({ start: start, end: start + duration, text: "" });
    renderRows();
    subtitleRows.lastElementChild?.querySelector("textarea")?.focus();
  });

  ["copySrtBtn", "downloadSrtBtn", "downloadVttBtn"].forEach((id) => $(id).addEventListener("click", () => {
    if (!entries.length) return;
    const isVtt = id === "downloadVttBtn";
    const content = isVtt ? toVtt() : toSrt();
    if (id === "copySrtBtn") {
      copyText(toSrt()).then(() => setStatus("SRT copied to the clipboard.")).catch(() => setStatus("Clipboard access was not available.", true));
    } else {
      download(content, isVtt ? "subtitles.vtt" : "subtitles.srt", isVtt ? "text/vtt" : "application/x-subrip");
      setStatus((isVtt ? "VTT" : "SRT") + " downloaded.");
    }
  }));

  function timingSettings() {
    const min = number("minSeconds", 0.8);
    const max = Math.max(min, number("maxSeconds", 7));
    return {
      start: toSeconds($("startTime").value),
      defaultDuration: clamp(number("defaultDuration", 3), min, max),
      gap: Math.max(0, number("entryGap", 0.1)),
      maxChars: Math.max(1, Math.floor(number("maxChars", 42))),
      minSeconds: min,
      maxSeconds: max,
      splitMode: $("splitMode").value,
      charsPerSecond: Math.max(1, number("charsPerSecond", 17)),
    };
  }

  function buildPlain(raw) {
    const settings = timingSettings();
    const lines = raw.replace(/^\uFEFF/, "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const pieces = [];
    lines.forEach((line) => {
      const clean = line.replace(/^\s*\d+\s*[.)：:-]\s*/, "").trim();
      if (!clean) return;
      const chunks = settings.splitMode === "sentence" ? splitSentences(clean) : [clean];
      chunks.forEach((chunk) => wrapCaption(chunk, settings.maxChars).forEach((wrapped) => pieces.push(wrapped)));
    });
    let cursor = settings.start;
    return pieces.map((text) => {
      const duration = clamp(Math.max(settings.defaultDuration, text.length / settings.charsPerSecond), settings.minSeconds, settings.maxSeconds);
      const entry = { start: cursor, end: cursor + duration, text: text };
      cursor = entry.end + settings.gap;
      return entry;
    });
  }

  function splitSentences(text) {
    const parts = text.match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/g) || [text];
    return parts.map((part) => part.trim()).filter(Boolean);
  }

  function wrapCaption(text, maxChars) {
    if (text.length <= maxChars) return [text];
    const words = text.split(/\s+/).filter(Boolean);
    const out = [];
    let line = "";
    words.forEach((word) => {
      if (word.length > maxChars) {
        if (line) { out.push(line); line = ""; }
        for (let index = 0; index < word.length; index += maxChars) out.push(word.slice(index, index + maxChars));
      } else if (!line) line = word;
      else if ((line + " " + word).length <= maxChars) line += " " + word;
      else { out.push(line); line = word; }
    });
    if (line) out.push(line);
    return out;
  }

  function parseTimestamped(raw) {
    const settings = timingSettings();
    const text = raw.replace(/^\uFEFF/, "").replace(/^WEBVTT[^\n]*\n/i, "");
    const lines = text.split(/\r?\n/);
    const found = [];
    let current = null;
    const range = /^\s*([^\s]+)\s+-->\s+([^\s]+)(?:\s+.*)?$/;
    const flush = () => {
      if (current && current.text.trim()) {
        let start = toSeconds(current.start);
        let end = toSeconds(current.end);
        if (!Number.isFinite(start)) start = settings.start;
        if (!Number.isFinite(end) || end <= start) end = start + settings.defaultDuration;
        found.push({ start: start, end: end, text: current.text.trim().replace(/\s*\n\s*/g, "\n") });
      }
      current = null;
    };
    lines.forEach((line) => {
      const match = line.match(range);
      if (match) { flush(); current = { start: match[1], end: match[2], text: "" }; return; }
      if (/^\s*\d+\s*$/.test(line)) return;
      if (current) current.text += (current.text ? "\n" : "") + line;
    });
    flush();
    return found;
  }

  function renderRows() {
    subtitleRows.innerHTML = "";
    entries.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = '<td class="row-number"></td><td><input class="time-input" data-field="start" type="text" inputmode="numeric"></td><td><input class="time-input" data-field="end" type="text" inputmode="numeric"></td><td><textarea class="caption-input" data-field="text" rows="2"></textarea></td><td><button class="remove-row" type="button" aria-label="Remove entry">Remove</button></td>';
      row.querySelector(".row-number").textContent = String(index + 1);
      row.querySelector('[data-field="start"]').value = formatTime(entry.start, ",");
      row.querySelector('[data-field="end"]').value = formatTime(entry.end, ",");
      row.querySelector('[data-field="text"]').value = entry.text;
      row.querySelector(".remove-row").addEventListener("click", () => { entries.splice(index, 1); renderRows(); });
      row.querySelectorAll("[data-field]").forEach((input) => input.addEventListener("input", () => {
        const field = input.dataset.field;
        entries[index][field] = field === "text" ? input.value : toSeconds(input.value);
      }));
      subtitleRows.appendChild(row);
    });
  }

  function toSrt() {
    return entries.map((entry, index) => `${index + 1}\n${formatTime(entry.start, ",")} --> ${formatTime(entry.end, ",")}\n${entry.text}\n`).join("\n");
  }

  function toVtt() {
    return "WEBVTT\n\n" + entries.map((entry) => `${formatTime(entry.start, ".")} --> ${formatTime(entry.end, ".")}\n${entry.text}\n`).join("\n");
  }

  function formatTime(value, separator) {
    const total = Math.max(0, Number(value) || 0);
    const millis = Math.round(total * 1000);
    const hours = Math.floor(millis / 3600000);
    const minutes = Math.floor((millis % 3600000) / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    const ms = millis % 1000;
    return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":") + separator + String(ms).padStart(3, "0");
  }

  function toSeconds(value) {
    if (typeof value === "number") return Number.isFinite(value) ? value : 0;
    const raw = String(value || "").trim().replace(",", ".");
    if (!raw) return 0;
    const parts = raw.split(":").map(Number);
    if (parts.some((part) => !Number.isFinite(part))) return 0;
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return parts[0];
  }

  function number(id, fallback) {
    const value = Number($(id).value);
    return Number.isFinite(value) ? value : fallback;
  }

  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }

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
