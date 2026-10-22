# Reels to Text

> Turn a public Instagram Reel URL or saved file into timestamped spoken text with TXT, SRT and VTT downloads in your browser.

Canonical: <https://instascript.app/reels-to-text>

[Open the matching tool](https://instascript.app/instagram-transcript-generator)

## Choose a source for Reel speech

To turn a Reel into text, start with the actual spoken recording. The full [Instagram Transcript Generator guide](https://instascript.app/instagram-transcript-generator) covers the public URL and review workflow.



## 1. Choose a public Reel or an existing local file

Use a supported public Instagram URL in the linked tool, or a permitted saved media file in [Video to Text](https://instascript.app/video-to-text). This page is a guide, without a separate engine or upload form. Local files are limited to 100 MB and actual browser decoding.

**Check:** Your input is a supported public source or a real local recording.

## 2. Check whether you need spoken or written words

Speech recognition is English only and performs a language check first. It does not retrieve comments or descriptions or perform OCR. [Compare caption sources](https://instascript.app/instagram-caption-extractor) before transcribing if the words are visible rather than spoken.

**Check:** The requested words belong to the audio.

## 3. Use the existing review and output tools

Follow the main walkthrough to replay, edit and save the transcript. TXT/Markdown is useful for reading; SRT/VTT requires complete valid times. Keep uncertainty visible and check the downloaded artifact before using it.

**Check:** The saved words have been compared with the source recording.

## More questions and limits

### What processing and privacy boundaries apply?

Local-file recognition and editing stay in the browser. Public Instagram URL retrieval uses the server and may use a fallback retrieval service before browser recognition. There is no saved transcript account history.

### Where should I continue?

[Open the matching tool](https://instascript.app/instagram-transcript-generator) and follow its current input requirements. Keep the original, review your result and download it before closing the tab.

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
