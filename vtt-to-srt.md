# VTT to SRT Converter: Convert VTT, SRT and SBV

> Convert VTT, SRT, or SBV subtitles in your browser without uploading the source.

Canonical: <https://instascript.app/vtt-to-srt>

## Supported subtitle formats

Use the [VTT to SRT Converter](https://instascript.app/vtt-to-srt) with one local VTT, SRT, or SBV file, or paste subtitle text. It writes standard SRT or WebVTT while keeping cue order, time ranges, line breaks, and subtitle text.

SBV input uses the comma-separated time range form commonly found in SubViewer files. The converter does not transcribe audio, merge files, store projects, require a login, or send subtitle text to a server.

## How conversion works

The browser reads each cue's start time, end time, and text. SRT output receives numbered cues and comma milliseconds. VTT output receives a `WEBVTT` header and period milliseconds. Existing cue times are not recalculated beyond the format's three-digit millisecond field. Invalid cues are reported instead of silently invented.

## FAQ

### Can I convert VTT to SRT without uploading the file?

Yes. Paste VTT text or open one local VTT file. Reading and conversion happen in this browser.

### Can I convert SRT to VTT?

Yes. Open or paste SRT, choose VTT as the output format, and download the WebVTT result.

### Does it support SBV?

Yes. SBV is accepted as an input format; choose SRT or VTT for output.

### Can I convert several files at once?

No. The page handles one subtitle file at a time so the workflow stays local and reviewable.
