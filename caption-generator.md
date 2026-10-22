# Caption Generator

> Generate a timed English caption draft from a public Instagram video or local audio/video, then review and download TXT, SRT or VTT in your browser.

Canonical: <https://instascript.app/caption-generator>

[Open the matching tool](https://instascript.app/video-to-text)

## Make spoken caption drafts, then check the words

Here, caption means text representing speech. This workflow does not create marketing descriptions, social post ideas or creative copy.



## 1. Start with audible English speech

Open [Video to Text](https://instascript.app/video-to-text) for a local video or [Audio to Text](https://instascript.app/audio-to-text) for an audio recording. One browser-decodable file up to 100 MB is processed at a time; model downloads and language checks apply. For a supported public Instagram URL, use [Instagram Transcript Generator](https://instascript.app/instagram-transcript-generator): server media retrieval precedes browser recognition, and restricted or unavailable media may fail to fetch.

**Check:** The source is speech, rather than a prompt for creative writing.

## 2. Preserve meaning before adjusting appearance

Replay names, numbers, negatives and qualifications. Editing a cue changes its words but does not move its timing. For a fictional phrase such as “Do not send it until Friday,” dropping not or until changes the instruction.

**Check:** The wording preserves what the speaker said.

## 3. Deliver a reviewed file to a real caption destination

Use TXT/Markdown for reading, or valid SRT/VTT for a timed draft. [Subtitle Editor](https://instascript.app/subtitle-editor) lets you correct cue times. The page does not burn text into video; verify final appearance in your chosen editor or platform.

**Check:** The destination accepts your output and the final captions have been previewed.

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
