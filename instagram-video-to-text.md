# Instagram Video to Text: Transcript, TXT and SRT

> Convert a public Instagram video URL or a saved MP4, MOV or WebM file into timestamped spoken text in your browser.

Canonical: <https://instascript.app/instagram-video-to-text>

## The short answer

To convert an Instagram video to text, open the [Instagram Transcript](https://instascript.app/) tool and paste a public Instagram URL, or upload a saved video file. InstaScript transcribes spoken audio in the browser and lets you copy the result or download TXT, SRT or VTT.

This converts spoken audio. It does not extract the written Instagram caption, comments, or text burned into the video.

## Public URL or saved video?

Use a public URL when the post opens without a login and its media can be reached by the fetch path. Upload a saved file for private, deleted, login-gated, region-restricted, or otherwise unavailable posts. Uploads accept MP4, MOV and WebM files up to 100 MB.

A link can fail when a session is required, a media address has expired, or the response has no audio track. A saved file bypasses that URL-specific failure, but a silent video has no spoken words to transcribe.

## TXT, SRT and VTT output

The transcript is divided into timestamped speech segments:

```text
[00:00] The first step is to open the video tool
[00:05] then choose the saved Instagram file
[00:11] and download the transcript as subtitles
```

TXT is best for notes and editing. SRT adds numbered cues with start and end times for compatible editors and players. It is generated from recognized speech segments, not Instagram's original caption track.

## Processing boundary

An uploaded file is decoded and transcribed on your device. A public URL requires a fetch step to obtain the media first, after which speech recognition runs in the browser. The first visit can take longer because the model loads; later runs can reuse its cache.

## Measured timings

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

## Accuracy checks

Music, sound effects, fast speech, accents, names, numbers, and overlapping speakers can change the output. Replay important timestamps before publishing a quote. Speech recognition supports English only. Detected non-English speech is rejected; an uncertain or failed language check stops processing with a separate error and creates no transcript.

## FAQ

### Can I convert a private Instagram video from its URL?

No. Save a copy you are allowed to use and upload the local file.

### Does this read text written in the Reel?

No. It recognizes spoken audio, not post captions, comments, or text inside the frames.

### Which file should I download?

Choose TXT for plain text and SRT for timestamped subtitles.

## More transcription tools

- [Instagram Transcript](https://instascript.app/)
- [Instagram Transcript Generator](https://instascript.app/instagram-transcript-generator)
- [Instagram Reels Transcript](https://instascript.app/instagram-reels-transcript)
- [Video to Text](https://instascript.app/video-to-text)

## Export your edited transcript

In the shared transcription tool, Copy and TXT use your edited words. They are plain text by default; enable Include timestamps in TXT and Copy to add available start times. This option does not run speech recognition again. SRT, VTT and Open in Subtitle Editor require non-empty cue text and complete valid start/end times. Missing end times are not estimated. If timing is incomplete, keep the recording for review and copy or download TXT instead.
