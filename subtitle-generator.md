# Subtitle Generator

> Generate a timed English subtitle draft from a public Instagram video or local media, then review and export TXT, SRT or VTT in your browser.

Canonical: <https://instascript.app/subtitle-generator>

[Open the matching tool](https://instascript.app/video-to-text)

## Review the timing of a speech-derived subtitle draft

This guide focuses on timed cues. For general word corrections see [Caption Generator](https://instascript.app/caption-generator); for the complete local recording workflow see [Video to Text](https://instascript.app/video-to-text).



## 1. Recognize the speech in the actual recording

Use the linked tool for one browser-decodable local English recording up to 100 MB. Model loading and a language check come first. For a supported public Instagram URL, use [Instagram Transcript Generator](https://instascript.app/instagram-transcript-generator): server media retrieval precedes browser recognition, and restricted or unavailable media may fail to fetch. Existing text can instead go to [TXT to SRT](https://instascript.app/txt-to-srt), whose estimated timeline is a manual draft, not audio alignment.

**Check:** The source of the words and the source of the timing are known.

## 2. Check both boundaries of every important cue

A correct sentence can still appear too early or remain through a pause. SRT/VTT export and editor transfer require nonempty text and complete valid start/end times. Missing ends are not invented; keep TXT/Markdown if the result cannot validate.

**Check:** The cue starts and ends match the exact recording edit.

## 3. Refine and preview the subtitle track

Open valid cues in [Subtitle Editor](https://instascript.app/subtitle-editor) to edit timing and text locally. Keep the recording, original cues and reviewed export. Test the final SRT/VTT in its destination player; this tool does not translate automatically or render burned-in subtitles.

**Check:** Beginning, middle and final cues have been checked against playback.

## More questions and limits

### What processing and privacy boundaries apply?

Local decoding, recognition, replay, edits and downloads run in your browser. Model resources need network access, but the local recording and transcript are not uploaded. There is no account history or saved cloud project; download your work before closing the tab. Same-origin editor transfer keeps the cues and recording local between tabs. Instagram URL retrieval and YouTube caption lookup have separate server-assisted privacy boundaries.

### Where should I continue?

[Open the matching tool](https://instascript.app/video-to-text) and follow its current input requirements. Keep the original, review your result and download it before closing the tab.

## Measured browser timings

These are historical measurements from 2026-09-14 using only whisper-tiny.en. They do not measure the current language-detection plus English-transcription workflow, and exclude Instagram lookup and media download.

| Audio length | Historical wall-clock time | Historical model load |
| --- | --- | --- |
| 11 s | 16.89 s | included |
| 11 s | 6.49 s | already in memory |
| 30 s | 8.98 s | already in memory |
| 60 s | 16.06 s | already in memory |
| 120 s | 28.58 s | already in memory |

In the historical test, the first run included model loading; subsequent runs retained the English model in memory. Current jobs release that instance before language detection, so a resource cache hit still requires initialization. Wall-clock time is not CPU time, and subtracting two runs does not isolate download or initialization time.

One machine, one WASM browser, one run per historical data point. Audio clips were constructed from a repeated public JFK recording. These rows do not predict today's end-to-end time, other devices or other recording content.

Sources: [historical raw CSV](https://instascript.app/benchmark/whisper-tiny-en-browser-benchmark.csv) · [current two-model measurements (2026-10-14)](https://instascript.app/benchmark/current-english-browser-20261014.csv) · [method, environment and limitations](https://instascript.app/benchmark/README.md).
