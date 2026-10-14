# Instagram Reels Transcript: URL, TXT and SRT

> Turn a public Instagram Reel URL or a saved Reel file into timestamped spoken text in your browser.

Canonical: <https://instascript.app/instagram-reels-transcript>

## The short answer

Open the [Instagram Transcript](https://instascript.app/) tool, paste a public Reel URL, or upload a saved Reel video. The browser returns spoken words with timestamps that you can copy or download as TXT, SRT or VTT.

1. Use a public Reel URL that opens without a login, or choose a saved video file.
2. Let the page fetch or decode the media and run the English speech model locally.
3. Check timestamps against the audio before quoting or publishing the result.

Uploaded files stay on the device. A public URL requires a temporary media fetch before local speech recognition.

## Public URL or saved file

The URL path works when a public Reel media URL is available without an Instagram login. Use a saved MP4, MOV, or WebM file for private, deleted, login-only, region-restricted, or expired posts. Uploads are limited to 100 MB. A Reel without a usable audio track cannot produce a useful speech transcript.

## Output

TXT is useful for searching and editing. SRT contains numbered cues with start and end times for subtitle players and editors. The SRT is generated from recognized speech segments; it is not Instagram's written caption.

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

## Accuracy and FAQ

Music, effects, accents, names, numbers, and overlapping voices can change a segment. The current browser model is English-focused, so replay important timestamps.

### Can I transcribe a private Instagram Reel?

Not through the public URL path. Save a copy you are allowed to use and upload the local file.

### Does this extract Instagram's written caption?

No. It transcribes spoken audio, not post text or words shown in the video frames.

### Can I download subtitles?

Yes. Download SRT for a subtitle track or TXT for plain text, then review the result.

### Is InstaScript affiliated with Instagram?

No. InstaScript is independent of Instagram and Meta.

## Language checks

Speech recognition supports English only. Detected non-English speech is rejected; an uncertain or failed language check stops processing with a separate error and creates no transcript.

## Export your edited transcript

In the shared transcription tool, Copy and TXT use your edited words. They are plain text by default; enable Include timestamps in TXT and Copy to add available start times. This option does not run speech recognition again. SRT, VTT and Open in Subtitle Editor require non-empty cue text and complete valid start/end times. Missing end times are not estimated. If timing is incomplete, keep the recording for review and copy or download TXT instead.
