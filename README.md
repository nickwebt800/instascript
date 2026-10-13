# InstaScript

A free, browser-based tool that converts public Instagram Reels and videos into timestamped English transcripts. Runs OpenAI's Whisper speech recognition model entirely in the browser using transformers.js — no server-side audio processing for uploaded files, no signup, no payment.

Live at **[instascript.app](https://instascript.app)**.

## How It Works

1. Upload an audio/video file, or paste a public Instagram Reel/video URL.
2. InstaScript extracts the audio client-side using the Web Audio API.
3. The audio is checked with a language detection model and then passed through `whisper-tiny.en` via `@huggingface/transformers.js`.
4. The transcript is displayed with timestamps. Copy to clipboard or download as TXT/SRT.

The current speech pipeline supports English audio. Detected non-English speech, uncertain language and technical detection failures have separate errors; none produces a transcript. The selected input is retained for retry. Written Instagram post descriptions are never used as speech transcripts. SRT export requires timestamped speech segments. The first run downloads both the language detection and transcription models to the browser cache; later runs are faster on the same device.

When using the URL input, a Cloudflare Pages Function fetches the Instagram page server-side to extract the video URL (browsers can't do this directly due to CORS). The video is then proxied to the browser, where all transcription happens locally.

## Cancel and retry

Only one transcription task can run at a time. While processing, input controls are locked. **Cancel processing** aborts the active link lookup or media download. A model download or local audio/model operation already in progress may need to finish first; its result is discarded before another task can start.

If a task fails or is cancelled, **Try the same input again** reuses the selected file or submitted URL in this tab. Selecting a different input clears that retry target. Inputs are not saved as a server-side history.

Instagram lookup has a 60-second timeout and media download has a 120-second timeout, including reading the response body. These limits do not apply to model loading or speech recognition.

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (no framework, no build step)
- **AI Models:** `onnx-community/whisper-tiny` for language detection and `onnx-community/whisper-tiny.en` for English transcription (cached by the browser after first load)
- **Inference:** [@huggingface/transformers.js](https://github.com/huggingface/transformers.js) v3 (runs in-browser via WASM)
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com/) with serverless Functions for Instagram URL fetching

## Features

- Transcribe public Instagram Reels and browser-decodable local files (MP4, MOV, WebM, MP3, WAV, M4A, OGG), up to 100 MB
- Separate YouTube tools read existing caption tracks; they do not transcribe video audio
- Subtitle Translator is a manual local editor for SRT/VTT, with validated SRT timing on export
- Timestamped output with start/end times per segment
- One-click copy to clipboard
- Download as plain text (.txt) or subtitle format (.srt)
- Mobile-friendly responsive design
- No account or application analytics; local files stay on-device. Public link lookup uses servers and third-party services, described in the privacy policy

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
│   ├── api/
│   │   ├── extract.js  # Cloudflare Function: extract video URL from Instagram page
│   │   └── proxy.js    # Cloudflare Function: proxy video download (bypass CORS)
├── benchmark/
│   ├── README.md                              # Measured in-browser transcription timings
│   └── whisper-tiny-en-browser-benchmark.csv  # The raw numbers
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

The `benchmark/` directory contains [measured in-browser transcription timings](benchmark/README.md) for `whisper-tiny.en` on WASM: how long 11 s, 30 s, 60 s and 120 s of audio actually take, and how much of the first run is model loading. The language detection model is an additional first-run dependency in the current app. Raw numbers are in [CSV](benchmark/whisper-tiny-en-browser-benchmark.csv), with the measurement method, environment and limitations written out so anyone can reproduce or dispute them.

## Privacy

Local files and subtitle edits are processed in the browser and are not uploaded. Instagram URL lookup fetches public pages server-side, with optional Cloudflare Browser Rendering and Jina fallbacks. The media proxy buffers up to 100 MB in memory and returns no-store responses without saving media to persistent application storage. YouTube lookup may fetch existing caption text server-side and cache successful responses for one hour; browser downloads and bot checks contact YouTube/Google directly when required. Exports are generated locally. See [privacy.html](privacy.html) for the full policy.

## License

[MIT](LICENSE)
