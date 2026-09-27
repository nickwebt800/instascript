# Subtitle Editor: Edit SRT and VTT in Your Browser

> Open an SRT, VTT or SBV file, change timing and text for any cue, add or remove entries, shift all timecodes at once, then export SRT or VTT — all in the browser with no upload or account.

Canonical: <https://instascript.app/subtitle-editor>

## The direct answer

A subtitle editor lets you fix the text and timing of cues inside a subtitle file. Open the [Subtitle Editor](https://instascript.app/subtitle-editor) page, choose **Open SRT / VTT / SBV** to load a local file, or paste subtitle text into the box. Click **Load into editor** and each cue appears as a row you can edit: start time, end time and caption text. Add entries, remove entries, or shift every timecode by a fixed number of seconds. Export the result as SRT or VTT.

Nothing leaves your browser. The file is read locally, edited locally, and exported locally.

## What you can edit

Each cue becomes one row in the editor table:

| Field | What it does |
| --- | --- |
| Start | The time the cue appears, in `HH:MM:SS,mmm` format |
| End | The time the cue disappears |
| Caption | The subtitle text shown during that time range |

Change any field and the entry updates immediately. Use **Add entry** to create a new blank cue after the last one. Use **Remove** on any row to delete it. The **Shift all times** field adds or subtracts a number of seconds from every start and end time at once, which is the fastest way to fix a subtitle track that is uniformly early or late. Negative values move subtitles earlier.

## Supported formats

This subtitle editor reads:

- **SRT** — numbered cues with `HH:MM:SS,mmm` timecodes and `-->` separators.
- **WebVTT** — `WEBVTT` header with `HH:MM:SS.mmm` timecodes.
- **SBV** — comma-separated time ranges in `HH:MM:SS,mmm` form.

Output is standard **SRT** or **WebVTT**. Cue order, time ranges, line breaks and subtitle text are preserved during editing. One local file at a time.

## How the editor handles timecodes

Timecodes are stored as seconds internally and formatted back for display and export. You can type times in common shorthand such as `1:23.4` or `00:01:23,400` and the editor reads the numbers. The shift feature is simple arithmetic: it adds your shift value to every start and end time. Times below zero are clamped to zero.

If a source has a cue that does not match SRT, VTT or SBV syntax, the editor reports that no usable cues were found so you can correct the pasted text.

## What this editor does not do

- It does not show a video preview or an audio waveform.
- It does not transcribe audio. Use the [Instagram Transcript](https://instascript.app/) or [Video to Text](https://instascript.app/video-to-text) tool to get text first.
- It does not merge multiple files, store projects, or require a login.
- It does not send subtitle text to a server.

## FAQ

### Can I edit SRT files without uploading them?

Yes. Open one local SRT file or paste its text. Parsing and editing happen in this browser only.

### Can I edit VTT files here too?

Yes. Paste or open a VTT file. The WEBVTT header and period-separated milliseconds are handled automatically.

### Does this subtitle editor support SBV?

Yes. SBV input with comma-separated time ranges is accepted. Export as SRT or VTT.

### Can I shift all subtitle times at once?

Yes. Enter a number of seconds in the **Shift all times** field and click **Apply shift**. Use a negative number to move subtitles earlier.

### Can I edit several subtitle files at once?

No. This page handles one subtitle file at a time so the workflow stays local and easy to review.

### Does this editor show a video preview?

No. It works on subtitle text and timecodes only. Export the SRT or VTT and open it in your media player to check the result against the video.

### How do I get subtitles to edit?

If you have a video or audio file and need text first, use [Instagram Transcript](https://instascript.app/) or [Video to Text](https://instascript.app/video-to-text) to get an SRT. Then open that SRT here to edit timing and captions. If you have plain text and want to build subtitles from scratch, use the [TXT to SRT Converter](https://instascript.app/txt-to-srt).

## More subtitle tools

- [TXT to SRT Converter](https://instascript.app/txt-to-srt) — build SRT or VTT from plain text with an editable timeline.
- [VTT to SRT Converter](https://instascript.app/vtt-to-srt) — convert between VTT, SRT and SBV without editing.
- [SRT to Text Converter](https://instascript.app/srt-to-text) — strip timecodes and get clean plain text.