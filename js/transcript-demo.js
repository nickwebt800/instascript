import { transcriptMarkdown } from "./transcript-markdown.js?v=markdown-20261015a";
import { createMediaReview } from "./media-review.js?v=p2-20261013";
import { createTranscriptResult, transcriptText, transcriptSubtitleError, transcriptSubtitles } from "./transcript-result.js?v=p0-export-20261014";
import { renderTranscriptCues, copyTranscriptText, downloadTranscriptFile } from "./transcript-view.js?v=demo-search-20261015b";

export function createTranscriptDemo(root) {
  if (!root) return { setBusy() {} };
  const get = name => root.querySelector('[data-demo="' + name + '"]');
  const open = get("open"), panel = get("panel"), output = get("output"), status = get("status");
  const timestamps = get("timestamps"), reset = get("reset"), retryAudio = get("audio-retry");
  const buttons = ["copy", "txt", "md", "srt", "vtt"].map(get);
  const media = createMediaReview(get("player"), message => { status.textContent = message; });
  let source = null, result = null, audio = null, loading = false, busy = false;
  let controller = null, generation = 0;

  function update() {
    const text = transcriptText(result), error = transcriptSubtitleError(result);
    buttons.forEach((button, index) => { button.disabled = index < 3 ? !text : Boolean(error); });
    timestamps.disabled = !text;
    get("export-status").textContent = result ? (error
      ? "Subtitle export unavailable: " + error + " You can still copy or download non-empty text."
      : "Copy and downloads use your edits. Timestamps are optional for TXT, Markdown and Copy.") : "";
    open.disabled = loading || busy;
    open.hidden = !panel.hidden;
    open.textContent = loading ? "Loading sample..." : source ? "Show sample" : "Try a sample";
    get("busy").textContent = busy && panel.hidden ? "The sample can be opened after your current transcription finishes." : "";
    reset.disabled = !source;
  }

  function setMedia() {
    media.set(audio);
    media.player?.addEventListener("error", () => {
      audio = null;
      retryAudio.hidden = false;
      output.querySelectorAll(".timestamp").forEach(button => { button.disabled = true; });
    });
  }

  function render() {
    result = createTranscriptResult(source);
    setMedia();
    renderTranscriptCues(output, result, media, update);
    update();
  }

  async function load(audioOnly = false) {
    if (loading || (!audioOnly && busy)) return;
    loading = true;
    const current = ++generation;
    controller?.abort();
    const request = new AbortController();
    controller = request;
    const timer = setTimeout(() => request.abort(), 15000);
    status.textContent = audioOnly ? "Loading sample audio..." : "Loading the prepared sample...";
    retryAudio.disabled = true;
    update();
    const read = async (url, kind) => {
      const response = await fetch(url, { signal: request.signal });
      if (!response.ok) throw new Error("Sample unavailable");
      if (kind === "audio") {
        const blob = await response.blob();
        if (!blob.type.startsWith("audio/") || blob.size > 4 * 1024 * 1024) throw new Error("Invalid sample audio");
        return blob;
      }
      const data = await response.json();
      const prepared = createTranscriptResult(data);
      if (transcriptSubtitleError(prepared) || prepared.cues.some(cue => cue.end > 11)) throw new Error("Invalid sample text");
      return data;
    };
    try {
      const [textResponse, audioResponse] = await Promise.allSettled([
        source ? Promise.resolve(source) : read("/assets/demo/kennedy-1961.json", "json"),
        read("/assets/demo/kennedy-1961.wav", "audio"),
      ]);
      if (current !== generation) return;
      if (textResponse.status !== "fulfilled") {
        status.textContent = "The sample could not load. Choose Try a sample to retry, or use your own recording above.";
        return;
      }
      source = textResponse.value;
      audio = audioResponse.status === "fulfilled" ? audioResponse.value : null;
      if (audioOnly && result) {
        // Retrying audio must keep the visitor's edited sample words.
        setMedia();
        output.querySelectorAll(".timestamp").forEach(button => { button.disabled = !audio; });
      } else render();
      panel.hidden = false;
      open.setAttribute("aria-expanded", "true");
      retryAudio.hidden = Boolean(audio);
      status.textContent = audio ? "Sample ready. Press Play or a timestamp, edit the words, then export."
        : "Sample audio could not load. You can edit and export the prepared text, or retry audio.";
    } finally {
      clearTimeout(timer);
      if (current === generation) { loading = false; retryAudio.disabled = false; update(); }
    }
  }

  open.addEventListener("click", () => {
    if (source) { panel.hidden = false; open.setAttribute("aria-expanded", "true"); }
    else void load();
  });
  reset.addEventListener("click", () => { if (source) { render(); status.textContent = "Sample edits reset."; } });
  retryAudio.addEventListener("click", () => { void load(true); });
  get("close").addEventListener("click", () => {
    ++generation;
    controller?.abort();
    loading = false;
    panel.hidden = true;
    media.clear();
    audio = null;
    source = null;
    result = null;
    output.replaceChildren();
    timestamps.checked = false;
    status.textContent = "";
    open.setAttribute("aria-expanded", "false");
    update();
    open.focus();
  });
  buttons[0].addEventListener("click", async () => {
    const text = transcriptText(result, timestamps.checked);
    if (!text) return;
    try { await copyTranscriptText(text); status.textContent = "Edited sample copied."; }
    catch { status.textContent = "Could not copy. Download TXT instead."; }
  });
  buttons.slice(1).forEach((button, index) => button.addEventListener("click", () => {
    const format = ["txt", "md", "srt", "vtt"][index];
    if (!["txt", "md"].includes(format) && transcriptSubtitleError(result)) { update(); return; }
    const text = format === "md" ? transcriptMarkdown(result, { title: "Prepared transcript sample", timestamps: timestamps.checked })
      : format === "txt" ? transcriptText(result, timestamps.checked) : transcriptSubtitles(result, format);
    if (!text) return;
    downloadTranscriptFile(text + (format === "txt" ? "\n" : ""), "instascript-sample." + format,
      format === "md" ? "text/markdown;charset=utf-8" : format === "vtt" ? "text/vtt;charset=utf-8" : "text/plain;charset=utf-8");
    status.textContent = "Sample " + format.toUpperCase() + " download started.";
  }));
  window.addEventListener("pagehide", () => { ++generation; controller?.abort(); loading = false; update(); });
  window.addEventListener("pageshow", event => {
    if (event.persisted && result && !panel.hidden) {
      setMedia();
      output.querySelectorAll(".timestamp").forEach(button => { button.disabled = !audio; });
    }
  });
  update();
  return { setBusy(value) { busy = value; update(); } };
}
