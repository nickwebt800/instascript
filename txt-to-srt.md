# TXT to SRT Converter: Editable SRT and VTT Subtitles

> Turn plain text or an existing subtitle file into editable SRT or VTT subtitles in your browser.

Canonical: <https://instascript.app/txt-to-srt>

## The direct answer

Open the [TXT to SRT Converter](https://instascript.app/txt-to-srt), paste plain text or open one local TXT, SRT, or VTT file, set the timing options, and review the generated cues before downloading SRT or VTT.

The file is read and converted locally. Text is not sent to a server, and there is no account, history, project storage, or batch upload.

## What it supports

- Plain text mode: each line or sentence becomes a cue.
- Existing timestamps mode: read SRT and VTT ranges and edit each cue.
- Numbered text lines: common leading numbers such as `1.` or `2)` are removed.
- Long captions: split at word boundaries using the character limit.
- Output: standard SRT or WebVTT with millisecond timecodes.

The first cue uses the selected start time. Duration uses the default duration and reading-speed limit, bounded by the shortest and longest settings. The next cue starts after the previous cue plus the entry gap.

## FAQ

### Can I convert a TXT file to SRT without uploading it?

Yes. Choose **Open TXT / SRT / VTT**. The browser reads the file locally.

### Can I convert numbered text?

Yes. Plain text mode removes common leading line numbers before creating cues.

### What is the difference between SRT and VTT?

SRT uses comma-separated milliseconds and numbered cues. VTT starts with `WEBVTT` and uses a period before milliseconds.

### Does this make subtitles from audio?

No. This page times text you provide. Use [Audio to Text](https://instascript.app/audio-to-text) or [Video to Text](https://instascript.app/video-to-text) for speech transcription.
