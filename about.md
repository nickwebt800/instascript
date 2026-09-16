# About - InstaScript

> About InstaScript - a free browser-based tool that turns video and audio files into timestamped text.

Canonical: <https://instascript.app/about>

# InstaScript

Turn video and audio into text — free, in your browser

## About InstaScript

InstaScript is a free browser-based transcription tool. It turns video and audio files (MP4, MOV, WebM, MP3, WAV, M4A, OGG) into timestamped text, with .txt and .srt downloads. The paste-a-link option currently accepts public Instagram URLs only.

It runs entirely in your web browser — no app to install, no account to create, and no payment required.

### How It Works

When you upload a video or audio file (or paste a public Instagram URL), InstaScript extracts the audio and runs it through **Whisper**, an open-source speech recognition model developed by OpenAI. The model runs locally in your browser using **transformers.js**, a library by Hugging Face that brings AI inference to the web.

This means your files never leave your device when using the upload feature. The transcription happens right on your computer or phone.

### Features

- Transcribe video files (MP4, MOV, WebM) and audio files (MP3, WAV, M4A, OGG) up to 100 MB
- Paste a public Instagram URL and let the site fetch the video for you — Instagram is the only link type supported today; for TikTok or Facebook, save the file and upload it
- Timestamped output with start and end times for each segment
- Copy transcript to clipboard with one click
- Download as plain text (.txt) or subtitle format (.srt)
- Works on desktop and mobile browsers
- Limits: English audio only, and long recordings are processed in chunks of about 30 seconds

### The Project

InstaScript is a personal project, published under the site name **InstaScript** — no individual is named or credited on this site. It is independently developed and maintained, and it is not affiliated with, endorsed by, or sponsored by Instagram, Meta, TikTok, ByteDance, Facebook, or OpenAI.

Questions about the site, or about your data, go to [contact@instascript.app](https://instascript.app/contact).

### Tech Stack

- **Frontend:** Vanilla HTML, CSS, and JavaScript (no framework)
- **AI Model:** Whisper (tiny English variant, ~40 MB)
- **Inference:** @huggingface/transformers.js (runs in-browser via WASM)
- **Hosting:** Cloudflare Pages with serverless Functions for URL fetching

### Privacy

InstaScript does not collect, store, or transmit your personal data. See our [Privacy Policy](https://instascript.app/privacy) for details.

### Listing & Verification

[](https://dang.ai)
