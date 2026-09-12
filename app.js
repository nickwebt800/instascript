import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0";

// ── Config ──
env.allowLocalModels = false;
const MODEL_ID = "onnx-community/whisper-tiny.en";
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
const progressBar = $("progressBar");
const progressFill = $("progressFill");
const errorBox = $("errorBox");
const transcriptSection = $("transcriptSection");
const transcriptOutput = $("transcriptOutput");
const copyBtn = $("copyBtn");
const downloadTxtBtn = $("downloadTxtBtn");
const downloadSrtBtn = $("downloadSrtBtn");

let selectedFile = null;
let transcriber = null;
let currentTranscript = "";
let lastResult = null;

// ── Tab switching ──
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    $("panel-" + tab.dataset.tab).classList.add("active");
    hideError();
  });
});

// ── File upload: drag & drop ──
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

function handleFile(file) {
  if (file.size > MAX_FILE_SIZE) {
    showError("File too large. Maximum size is 100 MB.");
    return;
  }
  selectedFile = file;
  fileName.textContent = file.name;
  fileSize.textContent = formatSize(file.size);
  fileInfo.classList.remove("hidden");
  hideError();
  hideTranscript();
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

// ── Transcribe button ──
transcribeBtn.addEventListener("click", () => {
  if (selectedFile) runTranscription(selectedFile);
});

// ── URL button ──
urlBtn.addEventListener("click", handleUrl);
urlInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleUrl();
});

function handleUrl() {
  const url = urlInput.value.trim();
  if (!url) {
    showError("Please paste an Instagram URL first.");
    return;
  }
  if (!url.includes("instagram.com")) {
    showError("That doesn't look like an Instagram URL.");
    return;
  }
  urlNote.classList.add("hidden");
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
      // Endpoint not deployed — running locally without functions
      urlNote.classList.remove("hidden");
      urlNote.innerHTML =
        "<strong>URL fetching needs deployment.</strong> This feature uses a server-side function " +
        "to fetch Instagram content (browsers can't do it directly due to CORS). " +
        "Once deployed to Cloudflare Pages, the URL feature works automatically. " +
        "<br><br>For now, use the <strong>Upload File</strong> tab — download the Reel and upload it here.";
      processing.classList.add("hidden");
      return;
    }

    if (!extractRes.ok) {
      const err = await extractRes.json().catch(() => ({}));
      showError(err.error || `Server returned ${extractRes.status}.`);
      return;
    }

    const data = await extractRes.json();

    // If it's a text post (no video), show the caption as transcript
    if (data.type === "text" && data.caption) {
      currentTranscript = data.caption;
      lastResult = null;
      transcriptOutput.innerHTML = "";
      const p = document.createElement("p");
      p.textContent = data.caption;
      transcriptOutput.appendChild(p);
      processing.classList.add("hidden");
      transcriptSection.classList.remove("hidden");
      return;
    }

    if (!data.videoUrl) {
      showError("No video found in this Instagram post.");
      return;
    }

    // Step 2: Download the video through the proxy (bypasses CORS)
    showProcessing("Downloading video...");
    const proxyUrl = "/api/proxy?url=" + encodeURIComponent(data.videoUrl);
    const videoRes = await fetch(proxyUrl);

    if (!videoRes.ok) {
      showError("Could not download the video. The post may be private or expired.");
      return;
    }

    const videoBlob = await videoRes.blob();

    // Step 3: Extract audio + transcribe (same as file upload)
    showProcessing("Extracting audio...");
    const audioData = await extractAudio(videoBlob);

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
    console.error(err);
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

    showProcessing("Loading AI model (first time only)...");
    const model = await loadModel();

    showProcessing("Transcribing...");
    const result = await model(audioData, {
      return_timestamps: true,
      chunk_length_s: 30,
      stride_length_s: 5,
    });

    currentTranscript = result.text || "";
    displayTranscript(result);
  } catch (err) {
    console.error(err);
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
  transcriptOutput.innerHTML = "";

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
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(currentTranscript);
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
downloadTxtBtn.addEventListener("click", () => {
  downloadFile(currentTranscript + "\n", "transcript.txt", "text/plain");
});

// ── Download SRT ──
downloadSrtBtn.addEventListener("click", () => {
  const srt = toSRT(window._lastResult);
  downloadFile(srt, "transcript.srt", "text/plain");
});

function toSRT(result) {
  if (!result || !result.chunks) return currentTranscript;
  return result.chunks
    .map((chunk, i) => {
      const start = srtTime(chunk.timestamp[0]);
      const end = srtTime(chunk.timestamp[1]);
      return `${i + 1}\n${start} --> ${end}\n${chunk.text.trim()}\n`;
    })
    .join("\n");
}

function srtTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const ms = Math.floor((sec % 1) * 1000);
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
  processing.classList.remove("hidden");
  processingText.textContent = text;
}

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.classList.remove("hidden");
}

function hideError() {
  errorBox.classList.add("hidden");
}

function hideTranscript() {
  transcriptSection.classList.add("hidden");
}
