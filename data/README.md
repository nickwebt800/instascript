# Browser-Based Whisper Transcription Tools — Comparison

A comparison of web tools that run OpenAI's Whisper speech recognition model directly in the browser (or with minimal server-side processing).

## Tools Compared

| Tool | Inference | Model | Signup | URL Input | SRT | Open Source |
|------|-----------|-------|--------|-----------|-----|-------------|
| [InstaScript](https://instascript.app) | Browser (WASM) | whisper-tiny.en | No | Yes (Instagram) | Yes | Yes (MIT) |
| [Whisper-Web](https://whisper-web.mesu.re) | Browser (WebGPU/WASM) | whisper-large-v3-turbo + finetunes | No | No | Yes | Yes (MIT) |
| [Web Whisper](https://whisper.r3d.red) | Browser (WASM) | Whisper | No | No | Yes | Yes (AGPL) |
| [Monster API Playground](https://whisperui.monsterapi.ai) | Server-side | Whisper | Yes | No | Yes | Yes (MIT, playground) |

## Key Differences

- **InstaScript** focuses on Instagram Reels and videos — it includes server-side URL fetching via Cloudflare Functions so users can paste an Instagram link directly. Uses the smallest English-only Whisper model (~40 MB) for fast first-load.
- **Whisper-Web** (by PierreMesure, fork of Xenova/whisper-web) supports multiple models including large-v3-turbo and Swedish/Norwegian fine-tunes. Supports WebGPU acceleration and PWA (offline use). Multi-language UI.
- **Web Whisper** (by Pluja) is a self-hostable option on Codeberg. AGPL licensed.
- **Monster API** runs Whisper server-side — audio is uploaded to their servers, not processed in-browser. Requires an API key/signup.

## Data Source

This comparison is based on publicly available information from each project's website and source repository, verified on 2026-09-12. A machine-readable version is available in [`browser-whisper-tools-comparison.csv`](browser-whisper-tools-comparison.csv).

## Contributing

If a tool's details have changed or a new browser-based Whisper tool exists, please open an issue or submit a PR with verifiable source links.
