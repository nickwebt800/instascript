# InstaScript

A free, browser-based tool that converts Instagram Reels and videos into text transcripts. Runs OpenAI's Whisper speech recognition model entirely in the browser using transformers.js — no server-side audio processing, no signup, no payment.

Live at **[instascript.app](https://instascript.app)**.

## How It Works

1. Upload an audio/video file, or paste a public Instagram Reel/video URL.
2. InstaScript extracts the audio client-side using the Web Audio API.
3. The audio is passed through `whisper-tiny.en` (~40 MB) via `@huggingface/transformers.js`.
4. The transcript is displayed with timestamps. Copy to clipboard or download as TXT/SRT.

When using the URL input, a Cloudflare Pages Function fetches the Instagram page server-side to extract the video URL (browsers can't do this directly due to CORS). The video is then proxied to the browser, where all transcription happens locally.

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (no framework, no build step)
- **AI Model:** `onnx-community/whisper-tiny.en` (English-only, ~40 MB, cached by browser after first load)
- **Inference:** [@huggingface/transformers.js](https://github.com/huggingface/transformers.js) v3 (runs in-browser via WASM)
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com/) with serverless Functions for Instagram URL fetching

## Features

- Transcribe Instagram Reels, videos, and any audio/video file (MP4, WebM, MP3, WAV)
- Timestamped output with start/end times per segment
- One-click copy to clipboard
- Download as plain text (.txt) or subtitle format (.srt)
- Mobile-friendly responsive design
- Zero data collection — no analytics, no tracking, no cookies set by InstaScript

## Project Structure

```
.
├── index.html          # Main tool page
├── app.js              # Client-side logic (model loading, audio extraction, transcription)
├── style.css           # All styles
├── privacy.html        # Privacy policy
├── about.html          # About page
├── contact.html        # Contact page
├── sitemap.xml         # Sitemap
├── robots.txt          # Robots
├── functions/
│   └── api/
│       ├── extract.js  # Cloudflare Function: extract video URL from Instagram page
│       └── proxy.js    # Cloudflare Function: proxy video download (bypass CORS)
└── data/
    ├── browser-whisper-tools-comparison.csv  # Comparison of browser-based Whisper tools
    └── README.md                             # Explanation of the comparison data
```

## Deploy Your Own

### Prerequisites

- A Cloudflare account (free tier works)
- Node.js 18+ and npm

### Steps

1. Clone this repo.
2. Install [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/):
   ```bash
   npm install -g wrangler
   ```
3. Create a Pages project:
   ```bash
   wrangler pages project create instascript --production-branch main
   ```
4. Deploy:
   ```bash
   wrangler pages deploy . --project-name instascript --branch main
   ```
5. (Optional) Add a custom domain in the Cloudflare dashboard under Pages → instascript → Custom domains.

No environment variables or secrets are needed. The Instagram extraction and proxy functions work out of the box.

## Data

The `data/` directory contains a [comparison of browser-based Whisper transcription tools](data/README.md) in both human-readable (Markdown) and machine-readable (CSV) formats. This is a real reference resource — contributions and corrections are welcome.

## Privacy

InstaScript does not collect, store, or transmit user data. File uploads are processed entirely in the browser. URL-based transcription fetches the Instagram page server-side (via Cloudflare Functions) but does not store the video or transcript anywhere. See [privacy.html](privacy.html) for the full policy.

## License

[MIT](LICENSE)
