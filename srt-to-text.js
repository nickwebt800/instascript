(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const input = $("subtitleText");
  const fileInput = $("subtitleFile");
  const status = $("converterStatus");
  const resultSection = $("resultSection");
  const resultText = $("resultText");
  const resultSummary = $("resultSummary");

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    try {
      input.value = await file.text();
      setStatus(file.name + " opened locally. Choose Convert to plain text.");
    } catch (error) {
      setStatus("Could not read that file. Try a UTF-8 subtitle file.", true);
    }
  });

  $("convertBtn").addEventListener("click", () => {
    try {
      if (!input.value.trim()) throw new Error("Paste or open a subtitle file first.");
      const cues = parseSubtitle(input.value);
      if (!cues.length) throw new Error("No usable SRT or VTT subtitle cues were found.");
      resultText.value = cues.map((cue) => cue.text).join("\n");
      resultSummary.textContent = cues.length + " cue" + (cues.length === 1 ? "" : "s") + " converted to plain text.";
      resultSection.classList.remove("hidden");
      setStatus("Converted to plain text.");
      resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      resultSection.classList.add("hidden");
      setStatus(error.message, true);
    }
  });

  $("clearBtn").addEventListener("click", () => {
    input.value = "";
    resultText.value = "";
    fileInput.value = "";
    resultSection.classList.add("hidden");
    setStatus("Cleared.");
  });

  $("copyResultBtn").addEventListener("click", async () => {
    if (!resultText.value) return;
    try {
      await copyText(resultText.value);
      setStatus("Plain text copied to the clipboard.");
    } catch (error) {
      setStatus("Clipboard access was not available.", true);
    }
  });

  $("downloadResultBtn").addEventListener("click", () => {
    if (!resultText.value) return;
    download(resultText.value, "subtitle-text.txt", "text/plain");
    setStatus("TXT downloaded.");
  });

  function parseSubtitle(raw) {
    const lines = raw.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").split("\n");
    const cues = [];
    let current = null;
    let metadata = false;

    const flush = () => {
      if (current && current.text.length) {
        const text = cleanText(current.text.join("\n"));
        if (text) cues.push({ text: text });
      }
      current = null;
    };

    lines.forEach((line) => {
      const clean = line.trim();
      if (/^(NOTE|STYLE|REGION)(?:\s|$)/i.test(clean)) {
        flush();
        metadata = true;
        return;
      }
      if (metadata) {
        if (!clean) metadata = false;
        return;
      }
      if (/^WEBVTT(?:\s|$)/i.test(clean) || /^X-TIMESTAMP-MAP=/i.test(clean)) return;

      const range = clean.match(/^.+?\s+-->\s+.+?(?:\s+.*)?$/);
      if (range) {
        flush();
        current = { text: [] };
        return;
      }
      if (!current && (/^\d+$/.test(clean) || clean)) return;
      if (current) {
        if (!clean) {
          flush();
        } else {
          current.text.push(line);
        }
      }
    });
    flush();
    return cues;
  }

  function cleanText(value) {
    return value
      .replace(/<[^>]*>/g, "")
      .replace(/\{\\[^}]+\}/g, "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join("\n");
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
