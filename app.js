import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0";

// ── Config ──
env.allowLocalModels = false;
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
const processingHint = $("processingHint");
const progressBar = $("progressBar");
const progressFill = $("progressFill");
const errorBox = $("errorBox");
const transcriptSection = $("transcriptSection");
const transcriptOutput = $("transcriptOutput");
const copyBtn = $("copyBtn");
const downloadTxtBtn = $("downloadTxtBtn");
const downloadSrtBtn = $("downloadSrtBtn");
const transcribeAnotherBtn = $("transcribeAnotherBtn");
const pasteAnotherBtn = $("pasteAnotherBtn");

let selectedFile = null;
let transcriber = null;
let languageDetector = null;
let currentTranscript = "";
let lastResult = null;

if (dropZone) {
  dropZone.setAttribute("role", "button");
  dropZone.setAttribute("tabindex", "0");
  dropZone.setAttribute("aria-label", "Choose an audio or video file");
  dropZone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInput.click();
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
  dropZone.addEventListener("click", () => fileInput.click());

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
  if (file.size > MAX_FILE_SIZE) {
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
  selectedFile = null;
  if (fileInput) fileInput.value = "";
  fileInfo?.classList.add("hidden");
  hideTranscript();
  activateTab("upload");
  dropZone?.focus?.();
});

pasteAnotherBtn?.addEventListener("click", () => {
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

function handleUrl() {
  const url = urlInput.value.trim();
  if (!url) {
    showError("Paste a public Instagram Reel or video post URL first.");
    return;
  }
  if (!url.includes("instagram.com")) {
    showError("Please use a public Instagram Reel or video post URL.");
    return;
  }
  urlNote?.classList.add("hidden");
  hideError();
  hideTranscript();
  urlBtn.disabled = true;
  runUrlTranscription(url).finally(() => {
    urlBtn.disabled = false;
  });
}

async function runUrlTranscription(instagramUrl) {
  try {
    // Step 1: Extract video URL via server-side function
    showProcessing("Fetching from Instagram...");
    const extractRes = await fetch("/api/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: instagramUrl }),
    });

    if (extractRes.status === 404) {
      const err = await extractRes.json().catch(() => ({}));
      if (err.error) {
        showError(err.error);
        return;
      }
      // A non-JSON 404 means the Pages Function route is not deployed.
      urlNote.classList.remove("hidden");
      urlNote.innerHTML =
        "<strong>URL fetching needs deployment.</strong> The server-side function is not available on this deployment.";
      processing.classList.add("hidden");
      return;
    }

    if (!extractRes.ok) {
      const err = await extractRes.json().catch(() => ({}));
      showError(err.error || `Server returned ${extractRes.status}.`);
      return;
    }

    const data = await extractRes.json();

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
    const videoRes = await fetch(proxyUrl);

    if (!videoRes.ok) {
      showError("Could not download this video. The post may be private or expired; try a public Reel or upload the file instead.");
      return;
    }

    const videoBlob = await videoRes.blob();

    // Step 3: Extract audio + transcribe (same as file upload)
    showProcessing("Extracting audio...");
    const audioData = await extractAudio(videoBlob);

    showProcessing("Checking audio language...");
    await releaseTranscriber();
    if (!handleLanguageCheck(await detectEnglishLanguage(audioData))) return;

    showProcessing("Loading AI model (first time only)...");
    const model = await loadModel();

    showProcessing("Transcribing...");
    const result = await model(audioData, {
      return_timestamps: true,
      chunk_length_s: 30,
      stride_length_s: 5,
    });

    currentTranscript = result.text || "";
    lastResult = result;
    displayTranscript(result);
  } catch (err) {
    showError(
      err.message || "Something went wrong while processing this URL."
    );
  } finally {
    processing.classList.add("hidden");
  }
}

// ── Model loading ──
async function loadModel() {
  if (transcriber) return transcriber;
  showProcessing("Loading AI model (first time only)...");
  progressBar.classList.remove("hidden");
  progressFill.style.width = "0%";
  transcriber = await pipeline("automatic-speech-recognition", MODEL_ID, {
    progress_callback: (data) => {
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
    const sample = audioData.subarray(
      0,
      Math.min(audioData.length, LANGUAGE_CHECK_SECONDS * AUDIO_SAMPLE_RATE)
    );
    if (!sample.length) return { status: "uncertain" };

    const inputs = await detector.processor(sample);
    const hopLength = detector.processor.feature_extractor.config.hop_length;
    const generated = await detector.model.generate({
      inputs: inputs.input_features,
      num_frames: Math.floor(sample.length / hopLength),
      // Supplying only the decoder start token bypasses Transformers.js'
      // default English prompt and lets Whisper predict the language token.
      decoder_input_ids: [[50258]],
      max_new_tokens: 1,
    });
    const tokenRows = (generated.sequences || generated).tolist?.() || [];
    const tokenIds = Array.isArray(tokenRows[0]) ? tokenRows[0] : tokenRows;
    if (tokenIds.length < 2) return { status: "uncertain" };

    const tokenId = Number(tokenIds[1]);
    if (tokenId === ENGLISH_LANGUAGE_TOKEN_ID) return { status: "english" };
    const token = detector.tokenizer.decode([tokenId], { skip_special_tokens: false });
    return { status: /^<\|[a-z]{2,3}\|>$/.test(token) ? "non_english" : "uncertain" };
  } catch {
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
  languageDetector = await pipeline(
    "automatic-speech-recognition",
    LANGUAGE_MODEL_ID,
    {
      progress_callback: (data) => {
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
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioCtx({ sampleRate: 16000 });

  let audioBuffer;
  try {
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  } catch (err) {
    throw new Error(
      "Could not decode this file format. Try MP3, WAV, or MP4 with AAC audio."
    );
  }

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

  audioCtx.close();
  return channelData;
}

// ── Main transcription flow ──
async function runTranscription(file) {
  hideError();
  hideTranscript();
  transcribeBtn.disabled = true;

  try {
    showProcessing("Extracting audio...");
    const audioData = await extractAudio(file);

    showProcessing("Checking audio language...");
    await releaseTranscriber();
    if (!handleLanguageCheck(await detectEnglishLanguage(audioData))) return;

    showProcessing("Loading AI model (first time only)...");
    const model = await loadModel();

    showProcessing("Transcribing...");
    const result = await model(audioData, {
      return_timestamps: true,
      chunk_length_s: 30,
      stride_length_s: 5,
    });

    currentTranscript = result.text || "";
    lastResult = result;
    displayTranscript(result);
  } catch (err) {
    showError(
      err.message ||
        "Something went wrong during transcription. Please try a different file."
    );
  } finally {
    processing.classList.add("hidden");
    transcribeBtn.disabled = false;
  }
}

// ── Display transcript ──
function displayTranscript(result) {
  if (!currentTranscript.trim()) {
    hideTranscript();
    showError("No speech transcript was produced. Try a recording with clear English speech.");
    return;
  }
  transcriptOutput.innerHTML = "";
  transcriptSection.classList.remove("language-rejected");
  if (downloadSrtBtn) {
    downloadSrtBtn.disabled = !hasTranscriptTiming(result);
    downloadSrtBtn.title = downloadSrtBtn.disabled ? "SRT export requires timestamped speech segments." : "";
  }

  if (result.chunks && result.chunks.length) {
    result.chunks.forEach((chunk) => {
      const p = document.createElement("p");
      const ts = document.createElement("span");
      ts.className = "timestamp";
      ts.textContent = formatTime(chunk.timestamp[0]);
      p.appendChild(ts);
      p.appendChild(document.createTextNode(chunk.text.trim()));
      transcriptOutput.appendChild(p);
    });
  } else {
    const p = document.createElement("p");
    p.textContent = currentTranscript;
    transcriptOutput.appendChild(p);
  }

  processing.classList.add("hidden");
  transcriptSection.classList.remove("hidden");
}

// ── Copy ──
copyBtn?.addEventListener("click", async () => {
  try {
    await copyToClipboard(currentTranscript);
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

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall back for embedded or restricted browser contexts.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Clipboard unavailable");
}

// ── Download TXT ──
downloadTxtBtn?.addEventListener("click", () => {
  downloadFile(currentTranscript + "\n", "transcript.txt", "text/plain");
});

// ── Download SRT ──
downloadSrtBtn?.addEventListener("click", () => {
  if (!hasTranscriptTiming(lastResult)) {
    showError("SRT export requires timestamped speech segments. No subtitle file was downloaded.");
    return;
  }
  const srt = toSRT(lastResult);
  downloadFile(srt, "transcript.srt", "text/plain");
});

function hasTranscriptTiming(result) {
  return Array.isArray(result?.chunks) && result.chunks.length > 0 && result.chunks.every(
    (chunk) => typeof chunk.timestamp?.[0] === "number" && Number.isFinite(chunk.timestamp[0]) && chunk.timestamp[0] >= 0 && typeof chunk.text === "string" && chunk.text.trim()
  );
}

function toSRT(result) {
  if (!hasTranscriptTiming(result)) return "";
  return result.chunks
    .map((chunk, i) => {
      const rawStart = Number(chunk.timestamp?.[0]);
      const startSeconds = Number.isFinite(rawStart) ? Math.max(0, rawStart) : 0;
      const nextStart = Number(result.chunks[i + 1]?.timestamp?.[0]);
      const rawEnd = chunk.timestamp?.[1] == null ? NaN : Number(chunk.timestamp[1]);
      const endSeconds = Number.isFinite(rawEnd) && rawEnd > startSeconds
        ? rawEnd
        : Number.isFinite(nextStart) && nextStart > startSeconds
          ? nextStart
          : startSeconds + 2;
      const start = srtTime(startSeconds);
      const end = srtTime(endSeconds);
      return `${i + 1}\n${start} --> ${end}\n${chunk.text.trim()}\n`;
    })
    .join("\n");
}

function srtTime(sec) {
  sec = Number.isFinite(Number(sec)) ? Math.max(0, Number(sec)) : 0;
  const totalMs = Math.round(sec * 1000);
  const h = Math.floor(totalMs / 3600000);
  const m = Math.floor(totalMs / 60000) % 60;
  const s = Math.floor(totalMs / 1000) % 60;
  const ms = totalMs % 1000;
  return `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)},${pad(ms, 3)}`;
}

function pad(n, len) {
  return String(n).padStart(len, "0");
}

function formatTime(sec) {
  if (sec == null) return "";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `[${pad(m, 2)}:${pad(s, 2)}]`;
}

function downloadFile(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── UI helpers ──
function showProcessing(text) {
  processing?.classList.remove("hidden");
  if (processingText) processingText.textContent = text;
  if (processingHint) {
    processingHint.textContent = text.toLowerCase().includes("first time") || text.toLowerCase().includes("model")
      ? "The first run downloads language detection and transcription models and may take longer. Later runs are faster because they are cached in your browser."
      : "Your audio is processed in your browser. Keep this tab open while the transcript is prepared.";
  }
}

function showError(msg) {
  if (!errorBox) return;
  errorBox.textContent = msg;
  errorBox.classList.remove("hidden");
}

function hideError() {
  errorBox?.classList.add("hidden");
}

function hideTranscript() {
  currentTranscript = "";
  lastResult = null;
  if (downloadSrtBtn) downloadSrtBtn.disabled = true;
  transcriptSection.classList.add("hidden");
  transcriptSection.classList.remove("language-rejected");
}
