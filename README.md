# InstaScript

A free, browser-based tool that converts public Instagram Reels and videos into timestamped English transcripts. Runs OpenAI's Whisper speech recognition model entirely in the browser using transformers.js — no server-side audio processing for uploaded files, no signup, no payment.

Live at **[instascript.app](https://instascript.app)**.

## How It Works

1. Upload an audio/video file, or paste a public Instagram Reel/video URL.
2. InstaScript extracts the audio client-side using the Web Audio API.
3. The audio is checked with a language detection model and then passed through `whisper-tiny.en` via `@huggingface/transformers.js`.
4. The transcript is displayed with timestamps. Copy to clipboard or download as TXT/SRT/VTT.

The current speech pipeline supports English audio. Detected non-English speech, uncertain language and technical detection failures have separate errors; none produces a transcript. The selected input is retained for retry. Written Instagram post descriptions are never used as speech transcripts. SRT/VTT export and editor transfer require non-empty cue text and complete valid start/end times; missing end times are never estimated. The first run downloads both the language detection and transcription models to the browser cache; later runs are faster on the same device.

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
- Local recording playback, timestamp seeking, editable transcript cues and direct transfer to Subtitle Editor
- Timestamped output with start/end times per segment
- One-click copy to clipboard
- Download as plain text (.txt) or subtitle formats (.srt and .vtt)
- Mobile-friendly responsive design
- No account; sandboxed public-page analytics cannot access tool inputs or results. Local files stay on-device. Public link lookup uses servers and third-party services, described in the privacy policy

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

The `benchmark/` directory preserves [historical single-model timings](benchmark/whisper-tiny-en-browser-benchmark.csv) from 2026-09-14 and separately records the [current two-model English workflow](benchmark/current-english-browser-20261014.csv), measured on 2026-10-14 with 11, 30, 60 and 120 second public audio constructions. The historical rows do not measure today's language detection, disposal and reinitialization. Wall-clock time is not CPU time; two run totals cannot isolate model download or initialization. See the [method, environment, cache states and limitations](benchmark/README.md). The existing benchmark API/MCP retains its historical rows and links the current CSV separately.

## Privacy

Local files and subtitle edits are processed in the browser and are not uploaded. Instagram URL lookup fetches public pages server-side, with optional Cloudflare Browser Rendering and Jina fallbacks. The media proxy streams media with a 100 MB transfer limit and returns no-store responses without saving media to persistent application storage. YouTube lookup may fetch existing caption text server-side and cache successful responses for one hour; browser downloads and bot checks contact YouTube/Google directly when required. Exports are generated locally. See [privacy.html](privacy.html) for the full policy.

## License

[MIT](LICENSE)

## Catalog maintenance and request guards

`tool-catalog.json` is the source for the middleware service catalog, public page representations, homepage tool directory, footer navigation and sitemap. After adding or changing a tool, run `node scripts/sync-catalog.cjs` and review the generated HTML, Markdown and XML.

Upstream fetches validate each redirect host, bound response bytes and apply server-side deadlines. The media proxy streams at most 100 MB, rejects non-media responses, and aborts transfers that exceed the limit. Costly API requests are limited to 20 per client per minute. Cloudflare browser lookup reserves a conservative 50 seconds per attempt against an 8 minute UTC daily budget with a 12 second minimum spacing. Missing usage headers retain the reservation.

Without a `REQUEST_GUARD` binding, counters are local to each runtime isolate and cannot enforce a global account budget. To enable shared limits, deploy the private worker using `guards/wrangler.toml`, then configure the Pages Durable Object binding shown in `guards/pages-binding.example.toml` for production and preview. A configured guard failure rejects expensive requests. This separate service is not created by deploying Pages alone. Keep guard configuration and maintenance scripts out of the static deployment package.

## Transcript exports

In the shared transcription tool, Copy and TXT use your edited words. They are plain text by default; enable Include timestamps in TXT, Markdown and Copy to add available start times. This option does not run speech recognition again. SRT, VTT and Open in Subtitle Editor require non-empty cue text and complete valid start/end times. Missing end times are not estimated. If timing is incomplete, keep the recording for review and copy or download TXT instead.

Run `node scripts/test-transcript-result.mjs` to check edited-text consistency and subtitle timing boundaries without downloading a speech model. These checks do not measure recognition quality.

## Try a prepared sample and search a result

On the homepage, **Try a sample** loads an 11-second public-domain recording
and prepared text with draft phrase timings. Replay, edit, reset, copy, or
download TXT/SRT/VTT without an account or a speech-model download. Sample
edits are separate from your selected input, real transcript, and retry state.
See [recording provenance and rights](assets/demo/SOURCE.md). The sample is not
a live recognition result, accuracy claim, or speed measurement.

Pages using `app.js` offer **Find in this transcript** after transcription.
Search the latest edited words, navigate occurrences, preview a highlighted
match, select it for editing, or play its cue when a recording and start time
are available. Search is literal, ASCII case-insensitive, and local to the
current result; it does not span cue boundaries. Enter/Shift+Enter navigate,
and Escape in the search box clears the query. Search does not change exports
or persist queries. The speech library now loads only when real transcription starts.

Run `node scripts/test-transcript-search.mjs` for matching and export-isolation
boundaries. Browser verification is also required for focus, media playback,
downloads, task isolation, and the actual recognition flow.

## Search existing YouTube captions

The two interactive pages, `/youtube-transcript` and `/youtube-transcript-download`, now search the current caption track with literal, ASCII case-insensitive matching inside each cue. Navigate occurrences, preview one safe highlighted match, or locate its read-only caption line. Query state survives Timestamps/Plain text changes and clears on a new lookup or caption-language change. Choose the form button again after selecting another language.

Source time links open YouTube in a new tab at a whole-second start. They contain only the video ID and start time; no player is embedded and no search query is sent or saved. Search does not alter caption text, timing, Copy, TXT or SRT. Existing caption lookup and optional browser bot checks remain separate; no audio speech recognition is added.

Run `node scripts/test-youtube-search.mjs` for source-link validation and raw-caption/export isolation, alongside the existing search/result checks. Browser regression must cover both pages, language changes, mode changes, lookup failures, navigation, keyboard operation and actual file downloads.

## Markdown notes

The shared transcript result, homepage prepared sample, and both interactive YouTube caption pages offer Markdown (.md) downloads. The serializer uses edited cue text (or untimed fallback), escapes Markdown punctuation and HTML-like text, skips empty cues, and adds only valid available start times. Shared results and the prepared sample use the timestamp checkbox. YouTube exports follow Timestamps / Plain text mode and include the video title, validated canonical source URL and selected caption language; timed links use whole seconds. Local-recording notes use a generic title without filenames or submitted URLs. Exporting sends no request and creates no history or AI summary. TXT/SRT/VTT rules remain unchanged.

Run `node scripts/test-transcript-markdown.mjs` with the existing result and search checks, then verify browser downloads and edited-text, display-mode, language-reset and mobile behavior.

## Public-page analytics

Ahrefs Web Analytics runs only inside an opaque-origin sandboxed iframe on catalog-listed production pages. `footer.js` supplies a canonical catalog path and referrer hostname only; `/analytics-frame` validates these against the catalog and serves a no-store, noindex document with a restrictive CSP. The tracker has no access to the parent DOM, files or result links. Preview/local requests and browser DNT/GPC opt-outs do not load it. No GA4 or custom tool events are installed.

The public data-key comes from the InstaScript Ahrefs project. `data-page-location` is supported by the reviewed upstream tracker; verify canonical page attribution again after publishing. Incoming domains are available through the `source_domain` event property (configure an event-properties report in Ahrefs); the standard referrer report is intentionally empty/direct because the frame receives no referrer. Missing and internal referrers use `direct`. Query/UTM parameters and fragments are not sent. This trades campaign/session attribution for strict separation from user content.

Run `node scripts/test-analytics.mjs`. Local checks do not establish production ingestion; after an authorized deployment, verify both the production script and actual Ahrefs reports.
