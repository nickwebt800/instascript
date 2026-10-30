import { createMediaReview } from "./js/media-review.js?v=p2-20261013";
import { receiveTranscriptFromOpener } from "./js/transcript-transfer.js?v=p2-20261013";
import { parseSubtitleCues, parseSubtitleTime, subtitleTime, serializeSubtitleCues, validateSubtitleCues } from "./js/subtitles.js?v=p2-20261013";
import { createSubtitleQualityReview } from "./js/subtitle-quality-view.js?v=quality-20261030";

(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };
  var input = $("subtitleText");
  var fileInput = $("subtitleFile");
  var status = $("editorStatus");
  var editorSection = $("editorSection");
  var subtitleRows = $("subtitleRows");
  var entries = [];
  var sourceVersion = 0;
  var quality = createSubtitleQualityReview($("subtitleQuality"), function () { return entries; }, function (index, field) {
    var row = subtitleRows.children[index];
    var target = row && row.querySelector('[data-field="' + field + '"]');
    if (target) {
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "center", inline: "nearest" });
    }
  });
  input.addEventListener("input", function () {
    sourceVersion++;
    quality.reset("Source changed. Load into editor before checking again.", false);
  });
  var mediaReview = createMediaReview($("editorMedia"), function (message) { setStatus(message); });
  $("reviewMediaFile").addEventListener("change", function () {
    var file = this.files && this.files[0];
    if (file) { mediaReview.set(file); setStatus("Recording opened locally. Click a cue number to replay its start."); }
  });
  receiveTranscriptFromOpener(function (cues, media) {
    sourceVersion++;
    quality.reset();
    entries = cues;
    input.value = serializeSubtitleCues(cues);
    renderRows();
    mediaReview.set(media);
    editorSection.classList.remove("hidden");
    setStatus("Transcript received from your other tab. Changes and media remain local.");
  });

  fileInput.addEventListener("change", async function () {
    var file = fileInput.files && fileInput.files[0];
    if (!file) return;
    var version = ++sourceVersion;
    quality.reset("New source selected. Load into editor before checking again.", false);
    try {
      var text = await file.text();
      if (version !== sourceVersion) return;
      input.value = text;
      setStatus(file.name + " opened locally. Click Load into editor.");
    } catch (error) {
      if (version !== sourceVersion) return;
      setStatus("Could not read that file. Try a UTF-8 subtitle file.", true);
    }
  });

  $("loadBtn").addEventListener("click", function () {
    sourceVersion++;
    quality.reset();
    try {
      if (!input.value.trim()) throw new Error("Paste or open a subtitle file first.");
      entries = parseSubtitle(input.value);
      if (!entries.length) throw new Error("No usable subtitle cues were found. Check the format and try again.");
      renderRows();
      editorSection.classList.remove("hidden");
      editorSection.scrollIntoView({ behavior: "smooth", block: "start" });
      setStatus(entries.length + " entries loaded and ready to edit.");
    } catch (error) {
      quality.reset("Fix the source and load it into the editor before checking.", false);
      editorSection.classList.add("hidden");
      setStatus(error.message, true);
    }
  });

  $("clearBtn").addEventListener("click", function () {
    sourceVersion++;
    quality.reset("Load subtitles before checking.", false);
    input.value = "";
    entries = [];
    subtitleRows.innerHTML = "";
    editorSection.classList.add("hidden");
    fileInput.value = "";
    $("shiftSeconds").value = "";
    $("reviewMediaFile").value = "";
    mediaReview.clear();
    setStatus("Cleared.");
  });

  $("addRowBtn").addEventListener("click", function () {
    var last = entries[entries.length - 1];
    var start = last && Number.isFinite(last.end) ? last.end + 0.1 : 0;
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
    if (validateSubtitleCues(entries)) updateExportState();
  });

  ["copySrtBtn", "downloadSrtBtn", "downloadVttBtn"].forEach(function (id) {
    $(id).addEventListener("click", function () {
      if (!entries.length) return;
      var validation = validateSubtitleCues(entries);
      if (validation) { setStatus(validation, true); return; }
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
    return parseSubtitleCues(raw);
  }

  function renderRows() {
    quality.invalidate();
    subtitleRows.innerHTML = "";
    entries.forEach(function (entry, index) {
      var row = document.createElement("tr");
      row.innerHTML = '<td class="row-number"></td>' +
        '<td><input class="time-input" data-field="start" aria-label="Cue start time" type="text" inputmode="numeric"></td>' +
        '<td><input class="time-input" data-field="end" aria-label="Cue end time" type="text" inputmode="numeric"></td>' +
        '<td><textarea class="caption-input" data-field="text" aria-label="Cue text" rows="2"></textarea></td>' +
        '<td><button class="remove-row" type="button" aria-label="Remove entry">Remove</button></td>';
      var cuePlay = document.createElement("button");
      cuePlay.type = "button";
      cuePlay.className = "btn-ghost cue-play";
      cuePlay.textContent = String(index + 1);
      cuePlay.setAttribute("aria-label", "Play cue " + (index + 1));
      cuePlay.addEventListener("click", function () {
        if (!mediaReview.seek(entry.start)) setStatus("Open a local recording to replay this cue.");
      });
      row.querySelector(".row-number").appendChild(cuePlay);
      row.querySelector('[data-field="start"]').value = formatTime(entry.start, ",");
      row.querySelector('[data-field="end"]').value = formatTime(entry.end, ",");
      row.querySelector('[data-field="text"]').value = entry.text;
      row.querySelector(".remove-row").addEventListener("click", function () {
        entries.splice(index, 1);
        renderRows();
      });
      row.querySelectorAll("[data-field]").forEach(function (el) {
        el.addEventListener("input", function () {
          quality.invalidate();
          var field = el.dataset.field;
          entries[index][field] = field === "text" ? el.value : parseTime(el.value);
          updateExportState();
        });
      });
      subtitleRows.appendChild(row);
    });
    updateExportState();
  }

  function updateExportState() {
    var error = validateSubtitleCues(entries);
    ["copySrtBtn", "downloadSrtBtn", "downloadVttBtn"].forEach(function (id) { $(id).disabled = Boolean(error); });
    setStatus(error || "Subtitles are ready for export.", Boolean(error));
    return !error;
  }

  function parseTime(value) {
    return parseSubtitleTime(value);
  }

  function formatTime(value, separator) {
    return subtitleTime(value, separator);
  }

  function toSrt() {
    return serializeSubtitleCues(entries);
  }

  function toVtt() {
    return serializeSubtitleCues(entries, "vtt");
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
