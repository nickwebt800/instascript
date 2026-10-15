# InstaScript - Information for AI Agents

> Machine-readable information about InstaScript tools, APIs, MCP resources, and measured browser benchmarks.

Canonical: <https://instascript.app/ai/>

## What this site is

InstaScript turns public Instagram Reels, video files, and audio files into text inside the browser. Uploaded audio is processed on the visitor's device with the `whisper-tiny.en` WASM model. Results can be downloaded as `.txt` or `.srt`.

## Supported inputs

- Local MP4, MOV, WebM, MP3, WAV, M4A, or OGG files up to 100 MB.
- Speech-transcription links: public Instagram post and Reel URLs. TikTok and Facebook videos must be saved and opened as local files.
- Speech recognition is English only. Audio is processed in roughly 30-second chunks.
- Separate YouTube tools read existing captions from public links. Lookup responses, including available caption text, may be cached for one hour. See the [privacy policy](https://instascript.app/privacy).

## Machine-readable resources

- [OpenAPI description](https://instascript.app/openapi.json) for the public read-only API.
- [API catalog](https://instascript.app/.well-known/api-catalog).
- `POST https://instascript.app/mcp` for the Streamable HTTP MCP endpoint. Available tools are `find_page`, `get_benchmark`, and `site_info`. Clients send JSON-RPC requests by POST. A browser GET returns HTTP 405; OPTIONS is supported.
- [MCP server card](https://instascript.app/.well-known/mcp/server-card.json).
- [Agent Skill artifact](https://instascript.app/ai/skills/site-lookup/SKILL.md) and [skill discovery index](https://instascript.app/.well-known/agent-skills/index.json).
- [ARD capability manifest](https://instascript.app/.well-known/ai-catalog.json).
- [I-Lang service index](https://instascript.app/ai/index.ilang).

HTML pages provide a Markdown representation through content negotiation with `Accept: text/markdown`.

## Public read-only API

- `GET /api/pages?q=WORDS` finds public pages matching a task. An empty query lists all pages.
- `GET /api/benchmark?length_seconds=30` returns historical 2026-09-14 single-model timings. Without a parameter it returns all historical rows; with a length it returns the closest observed row, not interpolation. Current two-model measurements are linked separately.
- `POST /api/extract` resolves a public Instagram URL to a media URL and caption. Other hosts are rejected.

These endpoints need no key and return public data only. Authentication is not available; the advertised OAuth endpoints answer HTTP 503.

## Limits and provenance

The service does not transcribe a remote video on behalf of a caller, except for fetching public Instagram media through `/api/extract`. Benchmark API/MCP rows measure only the historical whisper-tiny.en model, not today's language-detection plus transcription workflow. They are single WASM observations, not averages, predictions or guarantees. Page facts come from the published HTML; benchmark facts come from the [historical single-model CSV](https://instascript.app/benchmark/whisper-tiny-en-browser-benchmark.csv), [current two-model CSV (2026-10-14)](https://instascript.app/benchmark/current-english-browser-20261014.csv) and [method notes](https://instascript.app/benchmark/README.md). A resource cache hit does not mean a model instance is still in memory.
