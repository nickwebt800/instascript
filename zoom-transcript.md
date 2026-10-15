# Zoom Transcript: Transcribe a Recording in Your Browser | InstaScript

> Turn one local Zoom recording into searchable spoken text in your browser. Review timestamps, then copy TXT or download SRT.

Canonical: <https://instascript.app/zoom-transcript>

[InstaScript](https://instascript.app/)

# Zoom Transcript: Transcribe a Recording in Your Browser

Export a recording you are allowed to use, choose the local file, and review its timestamped transcript before saving TXT, SRT or VTT.

## Zoom transcript: the direct answer

**Zoom transcript** means turning spoken audio in a local meeting recording into searchable words. This page processes one file in the browser and keeps timestamps for notes or subtitle cues. It does not sign in to a meeting account or fetch a private cloud link.

## How to transcribe a Zoom recording

1. Choose one MP4, MOV, WebM, MP3, WAV or M4A file up to 100 MB.
2. Press **Transcribe this file**. The first run downloads the speech model into the browser cache.
3. Check names, numbers and decisions, then copy TXT or download SRT.

The model is intended for English speech and handles one local file per run.

## Example output

    [00:00] Thanks for joining the weekly review
    [00:08] The delivery date moved to Thursday
    [00:15] I will send the action list after this call

TXT is easy to search. SRT keeps numbered cues and time ranges. Speaker identity is not inferred unless someone says their name.

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

## Privacy and review limits

The selected recording is decoded and transcribed in your browser. There is no account, transcript history or server upload for this local-file workflow. Save the result before closing the tab.

Crosstalk, echo, muted sections, names and acronyms can change words or cue boundaries. The model is intended for English speech; it does not translate, label speakers or read slide and chat text.

## FAQ

### Can I paste a Zoom cloud link?

No. Download a recording you are permitted to use and choose the local file. Private or access-controlled links are not fetched.

### Does the recording leave my device?

No for the local-file workflow. The speech model runs in the browser and the page does not keep a server copy.

### Can I make subtitles from a meeting?

Yes. Download SRT, then inspect cue breaks in a subtitle editor. The export contains speech timing, not speaker labels or styling.

### Why is the first run slower?

The first run loads and initializes the speech model. A later file can reuse the cached model.

## Related tools

- [Audio to Text](https://instascript.app/audio-to-text) — transcribe local audio files.
- [Video to Text](https://instascript.app/video-to-text) — transcribe MP4, MOV or WebM files.
- [MP4 to Text](https://instascript.app/mp4-to-text) — a focused local video workflow.
- [Subtitle Editor](https://instascript.app/subtitle-editor) — edit SRT, VTT or SBV timing and text.

## Cancel and retry

Only one transcription task can run at a time. While processing, input controls are locked. **Cancel processing** discards its result. A model download or local audio/model operation already in progress may need to finish first; another task can start after it ends.

If a task fails or is cancelled, **Try the same input again** reuses the selected file in this tab. Selecting a different input clears that retry target. Local file contents are not uploaded.

Model loading and speech recognition do not have a fixed timeout.

## Review and edit your transcript

After transcription, replay the original recording and click a timestamp to seek to a cue. Edit cue text; Copy, TXT, SRT and VTT use your edits. **Open in Subtitle Editor** opens a local timing editor in another tab. Playback depends on browser codec support. The transcript and recording pass directly between same-origin tabs; no project is saved.

## Export your edited transcript

In the shared transcription tool, Copy and TXT use your edited words. They are plain text by default; enable Include timestamps in TXT, Markdown and Copy to add available start times. This option does not run speech recognition again. SRT, VTT and Open in Subtitle Editor require non-empty cue text and complete valid start/end times. Missing end times are not estimated. If timing is incomplete, keep the recording for review and copy or download TXT instead.

## Search your current transcript

After transcription, use **Find in this transcript** to search your latest
edited words. Previous and Next navigate occurrences; a preview highlights
one match. Choose **Edit this match** to select its text, or play its cue when
a recording and start time are available. Enter moves forward, Shift+Enter
moves back, and Escape in the search box clears the query.

Search is literal, ignores ASCII letter case, and stays inside each cue in
your current tab. Queries are not uploaded or saved. Search does not change
cue timing or exports.

## Export Markdown notes

Choose Markdown to save a .md note with a title and your latest edited words, one paragraph per speech cue (or the available untimed text). Include timestamps in TXT, Markdown and Copy adds only available start times; missing times are not estimated. Markdown punctuation and HTML-like words are escaped as text. The note is built in your browser without uploading content or adding it to a history. This exports a transcript, not an AI summary.
