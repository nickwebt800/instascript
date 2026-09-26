# Instagram Video to Text: Transcript, TXT and SRT

> Convert a public Instagram video URL or a saved MP4, MOV or WebM file into timestamped spoken text in your browser.

Canonical: <https://instascript.app/instagram-video-to-text>

## The short answer

To convert an Instagram video to text, open the [Instagram Transcript](https://instascript.app/) tool and paste a public Instagram URL, or upload a saved video file. InstaScript transcribes spoken audio in the browser and lets you copy the result or download TXT or SRT.

This converts spoken audio. It does not extract the written Instagram caption, comments, or text burned into the video.

## Public URL or saved video?

Use a public URL when the post opens without a login and its media can be reached by the fetch path. Upload a saved file for private, deleted, login-gated, region-restricted, or otherwise unavailable posts. Uploads accept MP4, MOV and WebM files up to 100 MB.

A link can fail when a session is required, a media address has expired, or the response has no audio track. A saved file bypasses that URL-specific failure, but a silent video has no spoken words to transcribe.

## TXT and SRT output

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

These are single browser measurements on one machine using WASM:

| Audio length | Wall-clock time | Model state |
| --- | ---: | --- |
| 11 s | 16.89 s | first run, model load included |
| 11 s | 6.49 s | cached |
| 30 s | 8.98 s | cached |
| 60 s | 16.06 s | cached |
| 120 s | 28.58 s | cached |

The raw rows and method are in the [benchmark directory](https://github.com/nickwebt800/instascript/tree/main/benchmark). URL download time is not included.

## Accuracy checks

Music, sound effects, fast speech, accents, names, numbers, and overlapping speakers can change the output. Replay important timestamps before publishing a quote. The current browser model is English-focused, so non-English output is a draft.

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
