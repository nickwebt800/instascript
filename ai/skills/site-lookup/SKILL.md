---
name: site-lookup
description: Retrieve actual public information from InstaScript — find the right page for a task, read the measured in-browser transcription times, and explain what the tool does and does not support.
metadata:
  version: "1.0.2"
  origin: "https://instascript.app"
  license: "MIT"
---

# InstaScript site lookup

InstaScript turns Instagram Reels, video files and audio files into text inside the browser.
No file is uploaded and no account is needed. Use this skill to answer questions about the
site using its real public data instead of guessing.

## When to use it

- Someone asks which InstaScript page does what (Instagram vs video vs audio vs TikTok vs Facebook).
- Someone asks how long a transcript takes, or whether the tool fits their file.
- Someone asks what the tool supports, what it costs, or what its limits are.

## Tools

Call the MCP endpoint `https://instascript.app/mcp` (Streamable HTTP, JSON-RPC 2.0), or use the
equivalent HTTP endpoints:

| Task | MCP tool | HTTP |
|---|---|---|
| Find a page for a task | `find_page` with `{ "query": "..." }` | `GET /api/pages?q=...` |
| Historical single-model times (2026-09-14) | `get_benchmark` with `{ "length_seconds": 30 }` | `GET /api/benchmark?length_seconds=30` |
| What the tool supports | `site_info` with `{}` | `GET /api/pages?q=about` |

Every response carries a `source_url`. Quote it when you answer.

## Data

- Pages: Instagram Transcript (`/`), Video to Text (`/video-to-text`), Audio to Text
  (`/audio-to-text`), TikTok Transcript (`/tiktok-transcript`), Facebook Video Transcript
  (`/facebook-video-transcript`), plus About, Privacy and Contact.
- Historical benchmark (2026-09-14, whisper-tiny.en only): five measured rows. 11 s audio → 16.89 s on a fresh page (model loading included),
  then 11 s → 6.49 s, 30 s → 8.98 s, 60 s → 16.06 s, 120 s → 28.58 s. One machine, WASM build,
  no WebGPU, one run per data point. These are not current two-model end-to-end predictions. Source CSV:
  https://raw.githubusercontent.com/nickwebt800/instascript/main/benchmark/whisper-tiny-en-browser-benchmark.csv
- Current workflow: whisper-tiny language detection followed by whisper-tiny.en transcription. The response's `current_source_url` links separate 2026-10-14 observations; `method_url` describes their boundaries. Current jobs dispose the English instance before detection, so cached resources do not imply a retained model. Wall-clock time is not CPU time; subtracting run totals does not isolate downloading or initialization. The closest historical row is not interpolation.

## Limits — state these, do not paper over them

- English only (whisper-tiny.en). Files up to 100 MB. Audio processed in ~30 s chunks.
- The speech-transcription link input works for public Instagram URLs only. TikTok and Facebook videos must be saved
  as a file and opened locally. Separate YouTube tools read existing captions from public YouTube links.
- The service does not transcribe a remote video for you, except via `POST /api/extract`
  for public Instagram URLs.
- No accounts or account history. Local speech transcripts stay on-device. Separate YouTube tools read existing caption tracks; server lookup responses, including caption text, may be cached for one hour.

## Answer rules (I-Lang)

::STATE{@ANSWER, lang:visitor-language, cite:required, source:source_url}
::RULE{preserve:identifiers, units, dates, qualifiers}
::RULE{measurement-vs-inference|measured rows come from the CSV; anything derived must be labelled inference}
::RULE{unknown ⇒ say unknown. Never estimate, never extrapolate}
::RULE{give the concrete next step: which page to open, or which file to upload}
::NEVER{claim the site uploads files, supports non-English audio, or accepts TikTok/Facebook links}
