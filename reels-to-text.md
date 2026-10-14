# Reels to Text: Spoken Transcript, TXT and SRT

> Turn a public Instagram Reel URL or a saved Reel file into timestamped spoken text in your browser.

Canonical: <https://instascript.app/reels-to-text>

## The direct answer

To turn an Instagram Reel into text, open the [Instagram Transcript](https://instascript.app/) tool and paste a public Reel URL, or upload a saved MP4, MOV or WebM file. InstaScript recognizes the spoken audio in your browser, then lets you copy the timestamped result or download TXT, SRT and VTT.

This is a speech transcript. It does not read the post caption, comments, hashtags, or words drawn on the video frames.

## Choose the input that will work

Use a public URL when the Reel opens without an Instagram login and its media is available to the fetch path. Use a saved file when the Reel is private, deleted, region-limited, login-gated, or the URL returns a page without playable media. Uploads are limited to 100 MB.

A public link can fail even when it looks correct: the session may be required, the media address may have expired, or the video may contain no audio track. Saving a copy you are allowed to use moves the problem from URL access to a local upload. A silent Reel still has no speech to recognize.

## What you receive

Each recognized segment is tied to its start time, so you can jump back to the exact moment that needs checking:

```text
[00:00] Open the Reel transcript tool
[00:04] paste a public link or select the saved file
[00:10] review the words before you publish them
```

Choose TXT for searchable notes, quotes, or editing. Choose SRT when a subtitle editor or player needs numbered cues with start and end times. The SRT is generated from the recognized speech; it is not Instagram's original caption file.

## Where the work happens

For a file, decoding and speech recognition run on your device. A public URL needs a network fetch to obtain the media first; after that, the browser model handles the audio. The model download makes the first run slower, while later runs may use the cached model. No account transcript is created by the tool.

## Measured browser timings

These are single observations from one laptop using the WASM path. They do not include the time needed to fetch a particular Reel URL:

| Audio length | Wall-clock time | Model state |
| --- | ---: | --- |
| 11 s | 16.89 s | first run, model load included |
| 11 s | 6.49 s | cached |
| 30 s | 8.98 s | cached |
| 60 s | 16.06 s | cached |
| 120 s | 28.58 s | cached |

See the [raw benchmark rows](https://github.com/nickwebt800/instascript/tree/main/benchmark) for the method. Your browser, device, cache, and audio can change the result.

## Review before relying on it

Music, effects, quick speech, accents, names, numbers, and people talking over one another can change a segment. Replay the timestamp before using a line as a quote or record. Speech recognition supports English only. Detected non-English speech is rejected; an uncertain or failed language check stops processing with a separate error and creates no transcript.

## FAQ

### Can I use a private Reel URL?

No. Save a copy you have permission to process and upload the local file instead.

### Will this extract the words shown on screen?

No. It recognizes spoken audio. Use a separate OCR workflow for text printed in the frames.

### Should I download TXT, SRT or VTT?

TXT is the simple reading and editing format. SRT is the timestamped subtitle format for compatible editors and players.

### Is InstaScript an Instagram product?

No. InstaScript is an independent project and is not affiliated with Instagram or Meta.

## More transcription tools

- [Instagram Transcript](https://instascript.app/) — paste a public Instagram URL or upload a media file.
- [Instagram Reels Transcript](https://instascript.app/instagram-reels-transcript) — another Reel-focused transcript workflow with TXT, SRT and VTT output.
- [Instagram Video to Text](https://instascript.app/instagram-video-to-text) — convert a public Instagram video or saved file.
- [Video to Text](https://instascript.app/video-to-text) — transcribe an MP4, MOV or WebM file.


## Export your edited transcript

In the shared transcription tool, Copy and TXT use your edited words. They are plain text by default; enable Include timestamps in TXT and Copy to add available start times. This option does not run speech recognition again. SRT, VTT and Open in Subtitle Editor require non-empty cue text and complete valid start/end times. Missing end times are not estimated. If timing is incomplete, keep the recording for review and copy or download TXT instead.
