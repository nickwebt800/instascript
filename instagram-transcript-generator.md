# Instagram Transcript Generator: Timestamped Text, TXT and SRT

> Generate timestamped spoken text from a public Instagram Reel or a saved video in your browser.

Canonical: <https://instascript.app/instagram-transcript-generator>

## The short answer

Use the [Instagram Transcript](https://instascript.app/) page. Paste a public Reel URL or upload a saved video, then start the browser speech recognition. The result can be copied or downloaded as `.txt` or `.srt`.

1. Choose a public Reel URL or a saved video file.
2. Wait while the browser extracts audio and runs Whisper speech recognition.
3. Copy the timestamped text or download SRT for subtitles.

Uploaded files are processed in the browser. The URL option needs a server-side fetch only to obtain public media; speech recognition still runs locally.

## What it returns

The transcript contains recognized spoken audio in reading order with segment start times. TXT is convenient for notes and research. SRT contains numbered cues, start and end times, and cue text for compatible video editors and players.

## URL versus saved video

Public URLs are fastest when the Reel is available without a login. Private, removed, login-gated, region-restricted, or expired posts may need a saved copy that you are allowed to use. Uploads accept common MP4, MOV, and WebM files up to 100 MB and need a decodable audio track.

## Measured browser timings

These are single WASM observations from one laptop, not averages or a promise for every device.

| Audio length | Time | Model state |
| --- | ---: | --- |
| 11 s | 16.89 s | first run |
| 11 s | 6.49 s | cached |
| 30 s | 8.98 s | cached |
| 60 s | 16.06 s | cached |
| 120 s | 28.58 s | cached |

See the [benchmark method and raw rows](https://github.com/nickwebt800/instascript/tree/main/benchmark).

## FAQ

### Can it transcribe every Instagram Reel?

No. The URL path needs a public page and media URL available to an unauthenticated request. Use a local copy for private, expired, or login-only posts.

### Does it create captions from the text?

It creates a timestamped transcript and an SRT file that can be imported into a compatible editor or player.

### Is the transcript accurate for music?

Speech recognition is designed for spoken audio. Loud music, overlapping speakers, accents, and short words can reduce accuracy.

### Which language is supported?

The current browser model is tuned for English. Verify the output against the audio.

InstaScript is independent of Instagram and Meta.

## Language checks

Speech recognition supports English only. Detected non-English speech is rejected; an uncertain or failed language check stops processing with a separate error and creates no transcript.

## Export your edited transcript

In the shared transcription tool, Copy and TXT use your edited words. They are plain text by default; enable Include timestamps in TXT and Copy to add available start times. This option does not run speech recognition again. SRT, VTT and Open in Subtitle Editor require non-empty cue text and complete valid start/end times. Missing end times are not estimated. If timing is incomplete, keep the recording for review and copy or download TXT instead.
