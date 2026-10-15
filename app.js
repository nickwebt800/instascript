import { transcriptMarkdown } from "./js/transcript-markdown.js?v=markdown-20261015a";
import { createMediaReview } from "./js/media-review.js?v=p2-20261013";
import { sendTranscriptToEditor } from "./js/transcript-transfer.js?v=p2-20261013";
import { createTranscriptResult, hasTranscriptStartTimes, transcriptText, transcriptSubtitleError, transcriptSubtitles } from "./js/transcript-result.js?v=p0-export-20261014";
import { createTranscriptDemo } from "./js/transcript-demo.js?v=markdown-20261015a";
import { renderTranscriptCues, copyTranscriptText, downloadTranscriptFile } from "./js/transcript-view.js?v=demo-search-20261015b";
import { createTranscriptSearch } from "./js/transcript-search.js?v=demo-search-20261015b";

// ── Config ──
// The prepared sample and result controls do not depend on the remote ASR library.
let speechLibrary = null;
async function getSpeechPipeline() {
  if (!speechLibrary) speechLibrary = import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0")
    .then(library => { library.env.allowLocalModels = false; return library.pipeline; })
    .catch(error => { speechLibrary = null; throw error; });
  return speechLibrary;
}
const MODEL_ID = "onnx-community/whisper-tiny.en";
// The multilingual checkpoint is used only to identify the language token.
// English transcription continues to use the smaller English-only checkpoint above.
const LANGUAGE_MODEL_ID = "onnx-community/whisper-tiny";
const LANGUAGE_CHECK_SECONDS = 20;
const AUDIO_SAMPLE_RATE = 16000;
const ENGLISH_LANGUAGE_TOKEN_ID = 50259;
const LANGUAGE_REJECTION_MESSAGE =
  "This file appears to contain non-English audio. InstaScript currently supports English speech.";
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const LOOKUP_TIMEOUT_MS = 60_000;
const MEDIA_TIMEOUT_MS = 120_000;

// ── DOM ──
const $ = (id) => document.getElementById(id);
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
const dropZone = $("dropZone");
const fileInput = $("fileInput");
const fileInfo = $("fileInfo");
const fileName = $("fileName");
const fileSize = $("fileSize");
const transcribeBtn = $("transcribeBtn");
const urlInput = $("urlInput");
const urlBtn = $("urlBtn");
const urlNote = $("urlNote");
const processing = $("processing");
const processingText = $("processingText");
let processingHint = $("processingHint");
if (processing && !processingHint) {
  processingHint = document.createElement("p");
  processingHint.id = "processingHint";
  processingHint.className = "processing-hint";
  processing.appendChild(processingHint);
}
const progressBar = $("progressBar");
const progressFill = $("progressFill");
const errorBox = $("errorBox");
const transcriptSection = $("transcriptSection");
const transcriptOutput = $("transcriptOutput");
const copyBtn = $("copyBtn");
const downloadTxtBtn = $("downloadTxtBtn");
const downloadMdBtn = document.createElement("button");
downloadMdBtn.type = "button";
downloadMdBtn.id = "downloadMdBtn";
downloadMdBtn.className = "btn-ghost";
downloadMdBtn.textContent = "Markdown";
downloadTxtBtn?.after(downloadMdBtn);
const downloadSrtBtn = $("downloadSrtBtn");
const downloadVttBtn = $("downloadVttBtn");
const transcribeAnotherBtn = $("transcribeAnotherBtn");
const pasteAnotherBtn = $("pasteAnotherBtn");

let selectedFile = null;
let transcriber = null;
let languageDetector = null;
let transcript = null;
let activeTask = null;
let lastJob = null;
let reviewMedia = null;
const sampleDemo = createTranscriptDemo($("transcriptDemo"));

const exportOptions = document.createElement("div");
exportOptions.className = "transcript-export-options";
const timestampLabel = document.createElement("label");
timestampLabel.className = "transcript-timestamp-option";
const timestampsToggle = document.createElement("input");
timestampsToggle.type = "checkbox";
timestampsToggle.id = "includeTextTimestamps";
timestampsToggle.disabled = true;
timestampLabel.append(timestampsToggle, "Include timestamps in TXT, Markdown and Copy");
const exportStatus = document.createElement("p");
exportStatus.className = "transcript-export-status";
exportStatus.id = "exportStatus";
exportStatus.setAttribute("role", "status");
exportOptions.append(timestampLabel, exportStatus);
transcriptSection.insertBefore(exportOptions, transcriptOutput);
timestampsToggle.addEventListener("change", updateExportState);

const reviewPanel = document.createElement("div");
reviewPanel.className = "transcript-review";
const reviewPlayer = document.createElement("div");
const reviewHint = document.createElement("p");
reviewHint.className = "review-hint";
reviewHint.textContent = "Replay a timestamp and edit the words below. Copy and downloads use your edits.";
const reviewStatus = document.createElement("p");
reviewStatus.className = "tool-status";
reviewStatus.setAttribute("role", "status");
const editorBtn = document.createElement("button");
editorBtn.type = "button";
editorBtn.className = "btn-ghost";
editorBtn.textContent = "Open in Subtitle Editor";
reviewPanel.append(reviewPlayer, reviewHint, editorBtn, reviewStatus);
transcriptSection.insertBefore(reviewPanel, transcriptOutput);
const mediaReview = createMediaReview(reviewPlayer, message => { reviewStatus.textContent = message; });
const resultSearch = createTranscriptSearch(transcriptSection, transcriptOutput, mediaReview);
editorBtn.addEventListener("click", () => {
  if (transcriptSubtitleError(transcript)) return;
  sendTranscriptToEditor(transcript.cues, reviewMedia, message => { reviewStatus.textContent = message; });
});

// Shared controls cover every page using this transcription pipeline.
const cancelBtn = document.createElement("button");
cancelBtn.type = "button";
cancelBtn.className = "btn-ghost task-cancel";
cancelBtn.textContent = "Cancel processing";
processing?.appendChild(cancelBtn);
cancelBtn.addEventListener("click", cancelTask);

const retryBtn = document.createElement("button");
retryBtn.type = "button";
retryBtn.className = "btn-ghost task-retry hidden";
retryBtn.textContent = "Try the same input again";
retryBtn.addEventListener("click", () => {
  if (activeTask || !lastJob) return;
  if (lastJob.kind === "file") return runTranscription(lastJob.file);
  return runUrlTranscription(lastJob.url);
});

function setTaskControls(busy) {
  sampleDemo.setBusy(busy);
  [transcribeBtn, urlBtn, fileInput, urlInput, transcribeAnotherBtn, pasteAnotherBtn, ...tabs].forEach((control) => {
    if (control) control.disabled = busy;
  });
  dropZone?.setAttribute("aria-disabled", String(busy));
  cancelBtn.disabled = !busy;
  retryBtn.disabled = busy;
}

function cancelledError() {
  const error = new Error("Processing cancelled. Your input is kept so you can retry or choose another recording.");
  error.code = "task_cancelled";
  return error;
}

function checkTask(task = activeTask) {
  if (task?.cancelled) throw cancelledError();
}

function cancelTask() {
  if (!activeTask || activeTask.cancelled) return;
  activeTask.cancelled = true;
  activeTask.controller.abort();
  cancelBtn.disabled = true;
  progressBar?.classList.add("hidden");
  if (processingText) processingText.textContent = "Cancelling processing...";
  if (processingHint) processingHint.textContent = (activeTask.kind === "url" ? "The active link lookup or media download is stopped. " : "")
    + "A model download or audio/model operation may need to finish first; its result is discarded before you can start again.";
}

async function runTask(job, operation) {
  // Hold the lock until the current operation settles, including cancellation.
  if (activeTask) return;
  const task = { kind: job.kind, controller: new AbortController(), cancelled: false };
  activeTask = task;
  lastJob = job;
  hideError();
  hideTranscript();
  setTaskControls(true);
  try {
    await operation(task);
    checkTask(task);
  } catch (error) {
    hideTranscript();
    showError(task.cancelled ? cancelledError().message : error?.message || "Processing failed. Try the same input again or choose another recording.");
  } finally {
    processing?.classList.add("hidden");
    progressBar?.classList.add("hidden");
    activeTask = null;
    setTaskControls(false);
  }
}

// The timeout covers both response headers and reading the response body.
async function requestWithTimeout(url, options, readBody, timeoutMs, label, task) {
  checkTask(task);
  const controller = new AbortController();
  const abort = () => controller.abort();
  task.controller.signal.addEventListener("abort", abort, { once: true });
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const body = await readBody(response);
    checkTask(task);
    if (timedOut) throw new Error("Request timed out.");
    return { response, body };
  } catch {
    checkTask(task);
    throw new Error(timedOut
      ? label + " timed out. Retry the same input, or upload a saved file instead."
      : label + " could not be completed. Check your connection and retry the same input.");
  } finally {
    clearTimeout(timer);
    task.controller.signal.removeEventListener("abort", abort);
  }
}

if (dropZone) {
  dropZone.setAttribute("role", "button");
  dropZone.setAttribute("tabindex", "0");
  dropZone.setAttribute("aria-label", "Choose an audio or video file");
  dropZone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!activeTask) fileInput.click();
    }
  });
}
processing?.setAttribute("role", "status");
processing?.setAttribute("aria-live", "polite");
processingText?.setAttribute("aria-live", "polite");
errorBox?.setAttribute("role", "alert");

function activateTab(name) {
  const tab = document.querySelector(`.tab[data-tab="${name}"]`);
  if (tab) tab.click();
}

// ── Tab switching ──
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    if (activeTask) return;
    lastJob = null;
    tabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    panels.forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    $("panel-" + tab.dataset.tab).classList.add("active");
    hideError();
  });
});

// ── File upload: drag & drop ──
if (dropZone && fileInput) {
  dropZone.addEventListener("click", () => { if (!activeTask) fileInput.click(); });

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drag-over");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length) handleFile(e.target.files[0]);
  });
}

function handleFile(file) {
  if (activeTask) return;
  lastJob = null;
  retryBtn.classList.add("hidden");
  hideTranscript();
  if (file.size > MAX_FILE_SIZE) {
    selectedFile = null;
    fileInfo?.classList.add("hidden");
    showError("File too large. Maximum size is 100 MB.");
    return;
  }
  selectedFile = file;
  if (fileName) fileName.textContent = file.name;
  if (fileSize) fileSize.textContent = formatSize(file.size);
  fileInfo?.classList.remove("hidden");
  hideError();
  hideTranscript();
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

// ── Transcribe button ──
transcribeBtn?.addEventListener("click", () => {
  if (selectedFile) runTranscription(selectedFile);
});

transcribeAnotherBtn?.addEventListener("click", () => {
  if (activeTask) return;
  lastJob = null;
  selectedFile = null;
  if (fileInput) fileInput.value = "";
  fileInfo?.classList.add("hidden");
  hideTranscript();
  activateTab("upload");
  dropZone?.focus?.();
});

pasteAnotherBtn?.addEventListener("click", () => {
  if (activeTask) return;
  lastJob = null;
  if (urlInput) urlInput.value = "";
  hideTranscript();
  activateTab("url");
  urlInput?.focus();
});

// ── URL button ──
// Local-only pages intentionally omit the URL controls.
urlBtn?.addEventListener("click", handleUrl);
urlInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleUrl();
});
urlInput?.addEventListener("input", () => {
  if (!activeTask) {
    lastJob = null;
    hideError();
  }
});

function handleUrl() {
  if (activeTask) return;
  const url = urlInput.value.trim();
  if (!url) {
    showError("Paste a public Instagram Reel or video post URL first.");
    return;
  }
  let parsed;
  try { parsed = new URL(url); } catch { /* Invalid input below. */ }
  if (!parsed || !["http:", "https:"].includes(parsed.protocol) || !/(^|\.)instagram\.com$/i.test(parsed.hostname)) {
    showError("Please use a public Instagram Reel or video post URL.");
    return;
  }
  urlNote?.classList.add("hidden");
  hideError();
  hideTranscript();
  return runUrlTranscription(url);
}

async function runUrlTranscription(instagramUrl) {
  return runTask({ kind: "url", url: instagramUrl }, async (task) => {
    // Step 1: Extract video URL via server-side function
    showProcessing("Fetching from Instagram...");
    const { response: extractRes, body: data } = await requestWithTimeout("/api/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: instagramUrl }),
    }, (response) => response.json().catch(() => null), LOOKUP_TIMEOUT_MS, "Instagram lookup", task);

    if (extractRes.status === 404) {
      if (data?.error) {
        showError(data.error);
        return;
      }
      // A non-JSON 404 means the Pages Function route is not deployed.
      showError("The Instagram lookup service is unavailable on this deployment. Upload a saved file instead, or retry later.");
      return;
    }

    if (!extractRes.ok) {
      showError(data?.error || `Instagram lookup returned ${extractRes.status}. Retry later or upload a saved file.`);
      return;
    }

    if (!data || typeof data !== "object") {
      showError("The Instagram lookup returned an unreadable response. Retry or upload a saved file.");
      return;
    }

    // Older deployments may return post metadata without playable media.
    // A written description is not speech and must never become a transcript.
    if (data.type === "text" && data.caption) {
      showError("Only a written post description was found, not playable video. No speech transcript was created. Upload a saved video or try another public Reel.");
      return;
    }

    if (!data.videoUrl) {
      showError("No video was found in this post. Try a public Reel or upload the downloaded file instead.");
      return;
    }

    // Step 2: Download the video through the proxy (bypasses CORS)
    showProcessing("Downloading video...");
    const proxyUrl = "/api/proxy?url=" + encodeURIComponent(data.videoUrl);
    const { response: videoRes, body: videoBody } = await requestWithTimeout(proxyUrl, {},
      (response) => response.ok ? response.blob() : response.json().catch(() => null),
      MEDIA_TIMEOUT_MS, "Media download", task);

    if (!videoRes.ok) {
      showError(videoRes.status === 413 ? "This media exceeds the 100 MB limit. Choose a smaller saved file."
        : "Could not download this video. The post may be private or expired; retry a public Reel or upload a saved file instead.");
      return;
    }

    const videoBlob = videoBody;

    // Step 3: Extract audio + transcribe (same as file upload)
    showProcessing("Extracting audio...");
    const audioData = await extractAudio(videoBlob);
    checkTask(task);

    showProcessing("Checking audio language...");
    await releaseTranscriber();
    checkTask(task);
    if (!handleLanguageCheck(await detectEnglishLanguage(audioData))) return;

    showProcessing("Loading AI model (first time only)...");
    const model = await loadModel();
    checkTask(task);

    showProcessing("Transcribing...");
    const result = await model(audioData, {
      return_timestamps: true,
      chunk_length_s: 30,
      stride_length_s: 5,
    });
    checkTask(task);

    reviewMedia = videoBlob;
    displayTranscript(result);
  });
}

// ── Model loading ──
async function loadModel() {
  if (transcriber) return transcriber;
  showProcessing("Loading AI model (first time only)...");
  progressBar.classList.remove("hidden");
  progressFill.style.width = "0%";
  const pipeline = await getSpeechPipeline();
  checkTask();
  transcriber = await pipeline("automatic-speech-recognition", MODEL_ID, {
    progress_callback: (data) => {
      if (activeTask?.cancelled) return;
      if (data.status === "progress" && data.progress != null) {
        progressFill.style.width = data.progress.toFixed(0) + "%";
        processingText.textContent =
          "Downloading model... " + data.progress.toFixed(0) + "%";
      }
    },
  });
  progressBar.classList.add("hidden");
  return transcriber;
}

async function releaseTranscriber() {
  if (!transcriber) return;
  await transcriber.dispose?.().catch(() => {});
  transcriber = null;
}

// Detect language from the first 20 seconds. Only a recognized language token
// can identify non-English speech; missing output and technical failures differ.
async function detectEnglishLanguage(audioData) {
  let detector = null;
  try {
    detector = await loadLanguageDetector();
    checkTask();
    const sample = audioData.subarray(
      0,
      Math.min(audioData.length, LANGUAGE_CHECK_SECONDS * AUDIO_SAMPLE_RATE)
    );
    if (!sample.length) return { status: "uncertain" };

    const inputs = await detector.processor(sample);
    checkTask();
    const hopLength = detector.processor.feature_extractor.config.hop_length;
    const generated = await detector.model.generate({
      inputs: inputs.input_features,
      num_frames: Math.floor(sample.length / hopLength),
      // Supplying only the decoder start token bypasses Transformers.js'
      // default English prompt and lets Whisper predict the language token.
      decoder_input_ids: [[50258]],
      max_new_tokens: 1,
    });
    checkTask();
    const tokenRows = (generated.sequences || generated).tolist?.() || [];
    const tokenIds = Array.isArray(tokenRows[0]) ? tokenRows[0] : tokenRows;
    if (tokenIds.length < 2) return { status: "uncertain" };

    const tokenId = Number(tokenIds[1]);
    if (tokenId === ENGLISH_LANGUAGE_TOKEN_ID) return { status: "english" };
    const token = detector.tokenizer.decode([tokenId], { skip_special_tokens: false });
    return { status: /^<\|[a-z]{2,3}\|>$/.test(token) ? "non_english" : "uncertain" };
  } catch (error) {
    if (error?.code === "task_cancelled" || activeTask?.cancelled) throw cancelledError();
    // Do not log model exceptions: they can contain request or input details.
    return { status: "failed" };
  } finally {
    // Do not keep two Whisper checkpoints in browser memory for English jobs.
    if (detector) {
      await detector.dispose?.().catch(() => {});
      languageDetector = null;
    }
    progressBar.classList.add("hidden");
  }
}

function handleLanguageCheck(result) {
  if (result.status === "english") return true;
  const messages = {
    non_english: LANGUAGE_REJECTION_MESSAGE + " Choose an English recording to try again.",
    uncertain: "Could not determine the audio language. Try a recording with clear English speech near the beginning. No transcript was created.",
    failed: "The language check could not run. Check your connection and retry using the same file or URL. No transcript was created.",
  };
  showError(messages[result.status] || messages.uncertain);
  return false;
}

async function loadLanguageDetector() {
  if (languageDetector) return languageDetector;
  showProcessing("Loading language detector (first time only)...");
  progressBar.classList.remove("hidden");
  progressFill.style.width = "0%";
  const pipeline = await getSpeechPipeline();
  checkTask();
  languageDetector = await pipeline(
    "automatic-speech-recognition",
    LANGUAGE_MODEL_ID,
    {
      progress_callback: (data) => {
        if (activeTask?.cancelled) return;
        if (data.status === "progress" && data.progress != null) {
          progressFill.style.width = data.progress.toFixed(0) + "%";
          processingText.textContent =
            "Downloading language detector... " + data.progress.toFixed(0) + "%";
        }
      },
    }
  );
  progressBar.classList.add("hidden");
  return languageDetector;
}

// ── Audio extraction ──
async function extractAudio(file) {
  const arrayBuffer = await file.arrayBuffer();
  checkTask();
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioCtx({ sampleRate: 16000 });

  try {
    let audioBuffer;
    try {
      audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    } catch {
      throw new Error("Could not decode this file format. Try MP3, WAV, or MP4 with AAC audio.");
    }
    checkTask();

    // Mix to mono
    let channelData;
    if (audioBuffer.numberOfChannels > 1) {
      channelData = new Float32Array(audioBuffer.length);
      for (let i = 0; i < audioBuffer.length; i++) {
        let sum = 0;
        for (let ch = 0; ch < audioBuffer.numberOfChannels; ch++) {
          sum += audioBuffer.getChannelData(ch)[i];
        }
        channelData[i] = sum / audioBuffer.numberOfChannels;
      }
    } else {
      channelData = audioBuffer.getChannelData(0);
    }

    return channelData;
  } finally {
    await audioCtx.close();
  }
}

// ── Main transcription flow ──
async function runTranscription(file) {
  return runTask({ kind: "file", file }, async (task) => {
    showProcessing("Extracting audio...");
    const audioData = await extractAudio(file);
    checkTask(task);

    showProcessing("Checking audio language...");
    await releaseTranscriber();
    checkTask(task);
    if (!handleLanguageCheck(await detectEnglishLanguage(audioData))) return;

    showProcessing("Loading AI model (first time only)...");
    const model = await loadModel();
    checkTask(task);

    showProcessing("Transcribing...");
    const result = await model(audioData, {
      return_timestamps: true,
      chunk_length_s: 30,
      stride_length_s: 5,
    });
    checkTask(task);

    reviewMedia = file;
    displayTranscript(result);
  });
}

// ── Display transcript ──
function displayTranscript(result) {
  transcript = createTranscriptResult(result);
  if (!transcriptText(transcript)) {
    hideTranscript();
    showError("No speech transcript was produced. Try a recording with clear English speech.");
    return;
  }
  transcriptOutput.innerHTML = "";
  transcriptSection.classList.remove("language-rejected");
  mediaReview.set(reviewMedia);
  reviewStatus.textContent = "";
  updateExportState();

  const rows = renderTranscriptCues(transcriptOutput, transcript, mediaReview, event => {
    updateExportState();
    if (!event.isComposing) resultSearch.refresh();
  });
  resultSearch.set(transcript, rows);

  processing.classList.add("hidden");
  transcriptSection.classList.remove("hidden");
}

function updateExportState() {
  const text = transcriptText(transcript);
  for (const button of [copyBtn, downloadTxtBtn, downloadMdBtn]) if (button) button.disabled = !text;
  timestampsToggle.disabled = !text || !hasTranscriptStartTimes(transcript);
  if (timestampsToggle.disabled) timestampsToggle.checked = false;
  const error = transcriptSubtitleError(transcript);
  for (const button of [downloadSrtBtn, downloadVttBtn, editorBtn]) {
    if (!button) continue;
    button.disabled = Boolean(error);
    button.title = error;
    button.setAttribute("aria-describedby", "exportStatus");
  }
  const message = error
    ? "SRT, VTT and Subtitle Editor are unavailable: " + error + (text ? " Copy or download TXT / Markdown instead; missing times are not estimated." : " Add transcript text to export.")
    : "Copy, TXT, Markdown, SRT, VTT and Subtitle Editor use your edits. The checkbox affects TXT, Markdown and Copy.";
  if (exportStatus.textContent !== message) exportStatus.textContent = message;
}

// ── Copy ──
copyBtn?.addEventListener("click", async () => {
  const text = transcriptText(transcript, timestampsToggle.checked);
  if (!text) return;
  try {
    await copyTranscriptText(text);
    copyBtn.classList.add("copied");
    copyBtn.querySelector("svg + *")?.remove();
    const old = copyBtn.innerHTML;
    copyBtn.innerHTML =
      '<svg viewBox="0 0 16 16" width="16" height="16"><path fill="none" stroke="currentColor" stroke-width="2" d="M3 8l3 3 7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>Copied';
    setTimeout(() => {
      copyBtn.classList.remove("copied");
      copyBtn.innerHTML = old;
    }, 2000);
  } catch {
    showError("Could not copy to clipboard.");
  }
});

// ── Download TXT ──
downloadTxtBtn?.addEventListener("click", () => {
  const text = transcriptText(transcript, timestampsToggle.checked);
  if (text) downloadTranscriptFile(text + "\n", "transcript.txt", "text/plain;charset=utf-8");
});

downloadMdBtn.addEventListener("click", () => {
  const text = transcriptMarkdown(transcript, { timestamps: timestampsToggle.checked });
  if (text) downloadTranscriptFile(text, "transcript.md", "text/markdown;charset=utf-8");
});

for (const [button, format] of [[downloadSrtBtn, "srt"], [downloadVttBtn, "vtt"]]) {
  button?.addEventListener("click", () => {
    if (transcriptSubtitleError(transcript)) { updateExportState(); return; }
    downloadTranscriptFile(transcriptSubtitles(transcript, format), "transcript." + format,
      format === "vtt" ? "text/vtt;charset=utf-8" : "text/plain;charset=utf-8");
  });
}

// ── UI helpers ──
function showProcessing(text) {
  checkTask();
  processing?.classList.remove("hidden");
  if (processingText) processingText.textContent = text;
  if (processingHint) {
    const stage = text.toLowerCase();
    processingHint.textContent = stage.includes("fetching")
      ? "Looking up playable public media. You can cancel this request or use a saved file instead."
      : stage.includes("downloading video")
        ? "Downloading media for browser processing. You can cancel this download."
        : stage.includes("language") && !stage.includes("loading")
          ? "Checking the opening audio for English speech before transcription."
          : stage.includes("first time") || stage.includes("model") || stage.includes("loading language")
            ? "The first run downloads language detection and transcription models and may take longer. Later runs are faster because they are cached in your browser."
            : "Your audio is processed in your browser. Keep this tab open while the transcript is prepared.";
  }
}

function showError(msg, canRetry = Boolean(activeTask)) {
  if (!errorBox) return;
  errorBox.textContent = msg;
  retryBtn.classList.toggle("hidden", !lastJob || !canRetry);
  retryBtn.disabled = Boolean(activeTask);
  errorBox.appendChild(retryBtn);
  errorBox.classList.remove("hidden");
}

function hideError() {
  errorBox?.classList.add("hidden");
}

function hideTranscript() {
  resultSearch.set(null);
  mediaReview.clear();
  reviewMedia = null;
  transcript = null;
  timestampsToggle.checked = false;
  updateExportState();
  transcriptSection.classList.add("hidden");
  transcriptSection.classList.remove("language-rejected");
}

updateExportState();
