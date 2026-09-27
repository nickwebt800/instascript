(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };
  var input = $("subtitleText");
  var fileInput = $("subtitleFile");
  var status = $("editorStatus");
  var editorSection = $("editorSection");
  var subtitleRows = $("subtitleRows");
  var entries = [];

  fileInput.addEventListener("change", async function () {
    var file = fileInput.files && fileInput.files[0];
    if (!file) return;
    try {
      input.value = await file.text();
      setStatus(file.name + " opened locally. Click Load into editor.");
    } catch (error) {
      setStatus("Could not read that file. Try a UTF-8 subtitle file.", true);
    }
  });

  $("loadBtn").addEventListener("click", function () {
    try {
      if (!input.value.trim()) throw new Error("Paste or open a subtitle file first.");
      entries = parseSubtitle(input.value);
      if (!entries.length) throw new Error("No usable subtitle cues were found. Check the format and try again.");
      renderRows();
      editorSection.classList.remove("hidden");
      editorSection.scrollIntoView({ behavior: "smooth", block: "start" });
      setStatus(entries.length + " entries loaded and ready to edit.");
    } catch (error) {
      editorSection.classList.add("hidden");
      setStatus(error.message, true);
    }
  });

  $("clearBtn").addEventListener("click", function () {
    input.value = "";
    entries = [];
    subtitleRows.innerHTML = "";
    editorSection.classList.add("hidden");
    fileInput.value = "";
    $("shiftSeconds").value = "";
    setStatus("Cleared.");
  });

  $("addRowBtn").addEventListener("click", function () {
    var last = entries[entries.length - 1];
    var start = last ? last.end + 0.1 : 0;
    entries.push({ start: start, end: start + 3, text: "" });
    renderRows();
    var lastRow = subtitleRows.lastElementChild;
    if (lastRow) {
      var ta = lastRow.querySelector("textarea");
      if (ta) ta.focus();
    }
  });

  $("applyShiftBtn").addEventListener("click", function () {
    if (!entries.length) { setStatus("Load a subtitle file first.", true); return; }
    var raw = Number($("shiftSeconds").value);
    if (!Number.isFinite(raw) || raw === 0) { setStatus("Enter a number of seconds to shift (can be negative).", true); return; }
    for (var i = 0; i < entries.length; i++) {
      entries[i].start = Math.max(0, entries[i].start + raw);
      entries[i].end = Math.max(0, entries[i].end + raw);
    }
    renderRows();
    setStatus("All timecodes shifted by " + raw + " s.");
  });

  ["copySrtBtn", "downloadSrtBtn", "downloadVttBtn"].forEach(function (id) {
    $(id).addEventListener("click", function () {
      if (!entries.length) return;
      var isVtt = id === "downloadVttBtn";
      if (id === "copySrtBtn") {
        copyText(toSrt()).then(function () {
          setStatus("SRT copied to the clipboard.");
        }).catch(function () {
          setStatus("Clipboard access was not available.", true);
        });
      } else {
        var content = isVtt ? toVtt() : toSrt();
        download(content, isVtt ? "subtitles.vtt" : "subtitles.srt", isVtt ? "text/vtt" : "application/x-subrip");
        setStatus((isVtt ? "VTT" : "SRT") + " downloaded.");
      }
    });
  });

  function parseSubtitle(raw) {
    var normalized = raw.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
    var lines = normalized.split("\n");
    var found = [];
    var current = null;

    function flush() {
      if (current && current.text.trim()) {
        var start = parseTime(current.start);
        var end = parseTime(current.end);
        if (Number.isFinite(start) && Number.isFinite(end) && end > start) {
          found.push({ start: start, end: end, text: current.text.trim().replace(/\s*\n\s*/g, "\n") });
        }
      }
      current = null;
    }

    lines.forEach(function (line) {
      var clean = line.trim();
      if (/^WEBVTT(?:\s|$)/i.test(clean) || /^NOTE(?:\s|$)/i.test(clean) || /^STYLE(?:\s|$)/i.test(clean) || /^REGION(?:\s|$)/i.test(clean)) return;
      var range = clean.match(/^(.+?)\s+-->\s+(.+?)(?:\s+.*)?$/);
      var sbv = clean.match(/^(\d{1,2}:\d{2}:\d{2}[.,]\d{3}),\s*(\d{1,2}:\d{2}:\d{2}[.,]\d{3})$/);
      if (range) {
        flush();
        current = { start: range[1], end: range[2], text: "" };
        return;
      }
      if (sbv) {
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

  function renderRows() {
    subtitleRows.innerHTML = "";
    entries.forEach(function (entry, index) {
      var row = document.createElement("tr");
      row.innerHTML = '<td class="row-number"></td>' +
        '<td><input class="time-input" data-field="start" type="text" inputmode="numeric"></td>' +
        '<td><input class="time-input" data-field="end" type="text" inputmode="numeric"></td>' +
        '<td><textarea class="caption-input" data-field="text" rows="2"></textarea></td>' +
        '<td><button class="remove-row" type="button" aria-label="Remove entry">Remove</button></td>';
      row.querySelector(".row-number").textContent = String(index + 1);
      row.querySelector('[data-field="start"]').value = formatTime(entry.start, ",");
      row.querySelector('[data-field="end"]').value = formatTime(entry.end, ",");
      row.querySelector('[data-field="text"]').value = entry.text;
      row.querySelector(".remove-row").addEventListener("click", function () {
        entries.splice(index, 1);
        renderRows();
      });
      row.querySelectorAll("[data-field]").forEach(function (el) {
        el.addEventListener("input", function () {
          var field = el.dataset.field;
          entries[index][field] = field === "text" ? el.value : parseTime(el.value);
        });
      });
      subtitleRows.appendChild(row);
    });
  }

  function parseTime(value) {
    var raw = String(value || "").trim().replace(",", ".");
    raw = raw.replace(/\s+.*$/, "");
    var parts = raw.split(":").map(Number);
    if (!parts.length || parts.some(function (p) { return !Number.isFinite(p); })) return NaN;
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return parts[0];
  }

  function formatTime(value, separator) {
    var total = Math.max(0, Math.round(value * 1000));
    var hours = Math.floor(total / 3600000);
    var minutes = Math.floor((total % 3600000) / 60000);
    var seconds = Math.floor((total % 60000) / 1000);
    var ms = total % 1000;
    return [hours, minutes, seconds].map(function (p) { return String(p).padStart(2, "0"); }).join(":") + separator + String(ms).padStart(3, "0");
  }

  function toSrt() {
    return entries.map(function (entry, index) {
      return (index + 1) + "\n" + formatTime(entry.start, ",") + " --> " + formatTime(entry.end, ",") + "\n" + entry.text + "\n";
    }).join("\n");
  }

  function toVtt() {
    return "WEBVTT\n\n" + entries.map(function (entry) {
      return formatTime(entry.start, ".") + " --> " + formatTime(entry.end, ".") + "\n" + entry.text + "\n";
    }).join("\n");
  }

  function setStatus(message, isError) {
    status.textContent = message;
    status.classList.toggle("is-error", Boolean(isError));
  }

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(value);
    var helper = document.createElement("textarea");
    helper.value = value;
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }

  function download(content, filename, type) {
    var link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type: type + ";charset=utf-8" }));
    link.download = filename;
    link.click();
    setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
  }
})();