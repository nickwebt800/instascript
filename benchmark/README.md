# Whisper tiny.en in the browser — measured processing time

How long does it take to transcribe audio with `onnx-community/whisper-tiny.en`
running **inside the browser** (transformers.js / WASM), with no server involved?

These are real measurements taken on [instascript.app](https://instascript.app),
a browser-only transcription tool. They are published here so anyone sizing up an
in-browser Whisper deployment has a number to start from instead of a guess.

Raw data: [`whisper-tiny-en-browser-benchmark.csv`](whisper-tiny-en-browser-benchmark.csv)

## Results

| Run | Audio length | Wall clock | Includes model download + init | Output |
|-----|--------------|-----------:|-------------------------------|--------|
| 1 | 11 s | **16.89 s** | yes (first run on a fresh page) | 120 chars |
| 2 | 11 s | **6.49 s** | no | 120 chars |
| 3 | 30 s | **8.98 s** | no | 318 chars |
| 4 | 60 s | **16.06 s** | no | 603 chars |
| 5 | 120 s | **28.58 s** | no | 1160 chars |

## How the numbers were produced (source: measured, not estimated)

- **Timer start:** the moment the *Transcribe* button is clicked.
- **Timer stop:** the moment the transcript panel becomes visible **and** contains
  non-empty text.
- **What the timer covers:** audio decode + every 30-second chunk pass + rendering.
  It does **not** cover file selection.
- **Runs 2–5** reuse the model already loaded in the page, so they measure
  processing alone.
- **Run 1** additionally covers the ~40 MB model download, WASM init and encoder
  warm-up.

### Derived figures (these are calculations, clearly marked)

| Figure | Formula | Result |
|--------|---------|--------|
| Model download + init (run 1 only) | `16.89 − 6.49` | **≈ 10.4 s** (one-off, first visit only) |
| Processing speed, 120 s file | `28.58 / 120` | **0.24 s of CPU per 1 s of audio** |
| Processing speed, 60 s file | `16.06 / 60` | **0.27 s of CPU per 1 s of audio** |
| Processing speed, 30 s file | `8.98 / 30` | **0.30 s of CPU per 1 s of audio** |

The per-second cost drops as the file gets longer, which points to a fixed
per-run overhead on top of the linear cost — consistent with the 11 s file taking
6.49 s (0.59 s per audio second) rather than the ~0.24 s seen at 120 s.

## Environment

| | |
|---|---|
| Page | `https://instascript.app/audio-to-text` |
| Model | `onnx-community/whisper-tiny.en`, transformers.js, WASM, quantised (q8) |
| Chunking | audio processed in 30-second passes |
| Browser | Microsoft Edge (Chromium), headless, viewport 1280×900 |
| OS | Windows 11 (build 26200) |
| CPU | Intel Core (Family 6, Model 158) |
| Measured on | 2026-09-14 |
| Network | residential connection through a local HTTP proxy |

## Honest limitations

- **Single run per data point.** No repeats, so no variance or confidence interval
  is reported. Treat these as order-of-magnitude numbers, not benchmarks.
- **One machine, one browser.** WebGPU was not used; this is the WASM path, which
  is what most visitors get today.
- **The model download number depends on bandwidth** and on whether the browser
  cache still holds the model. On a repeat visit with a warm cache it is zero.
- Audio content affects speed slightly; all five runs use the same 11-second
  English clip (the public JFK sample from the transformers.js docs), looped to
  build the longer files.

## Reproducing

```bash
pip install playwright && playwright install --with-deps chromium
```

Then drive `https://instascript.app/audio-to-text` with any audio file: set
`#fileInput`, click `#transcribeBtn`, and time until `#transcriptSection` is
visible with non-empty text. The first run on a fresh page includes the model
download; keep the page open for subsequent runs to measure processing only.
