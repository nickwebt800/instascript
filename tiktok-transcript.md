# TikTok Transcript & Video Transcription Tool | InstaScript

> TikTok transcript and TikTok video transcription in your browser. Save the video, drop the file in, get timestamped text you can copy or download as TXT, SRT or VTT. No signup.

Canonical: <https://instascript.app/tiktok-transcript>

[InstaScript](https://instascript.app/)

# TikTok Transcript & Video Transcription

Turn a TikTok video into text — free, in your browser

Save the TikTok to your phone or computer first, then drop the file here.

Paste a public Instagram Reel or video post URL

## What is a TikTok transcript?

A **TikTok transcript** is the spoken content of a TikTok video written out as text. Instead of replaying a clip to catch what was said, you read (or search) the words. A TikTok video transcription usually includes **timestamps** — the start time of each line — so you can jump back to the exact moment in the video.

People use TikTok transcripts to turn a video into a blog post or newsletter, pull quotes, write captions and subtitles, keep notes from tutorials and talks, and make videos searchable.

## How to transcribe a TikTok video in 3 steps

1. **Save the video to your device.** In the TikTok app use Share → Save video. On desktop, download the clip or record your screen while it plays. Any MP4, WebM, MP3 or WAV file up to 100 MB works.
2. **Drop the file into the box above** (or tap to browse from your phone).
3. **Press Transcribe.** The text appears with timestamps. Copy it, or download it as .txt or .srt.

## What the result looks like

Each line of the TikTok transcription starts with the time it was spoken, so the text stays tied to the video:

```
[00:00] So I tried this editing trick for a week
[00:04] and here is what actually changed
[00:09] first, the export time dropped in half
```

The same text is available in two downloads: **.txt** for plain notes and **.srt** for subtitles you can drop into an editor.

## How long does a TikTok take to transcribe?

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

## FAQ

### Can I paste a TikTok link instead of uploading?

Not on this page. The link option on this site currently works with public Instagram URLs, so for a TikTok you save the video to your device and upload the file. The transcription itself is the same either way.

### Does it work on my phone?

Yes. The page works in a mobile browser: save the TikTok, then use the upload box above. The first run downloads the speech model to your browser, so a longer video takes longer on mobile data.

### Is the video uploaded anywhere?

No. Transcription runs inside your browser with a local speech model. The file is not uploaded to a server, and no account is needed.

### Which languages are supported?

English. The tool checks the audio language first and returns a message instead of a guess when the audio is not English.

### How long can the video be?

Files up to 100 MB. Long clips are processed in 30-second chunks, so a long video takes proportionally longer and uses more memory on your device.

InstaScript is an independent personal project. It is not affiliated with, endorsed by, or sponsored by TikTok, ByteDance, or OpenAI.

## Cancel and retry

Only one transcription task can run at a time. While processing, input controls are locked. **Cancel processing** discards its result. A model download or local audio/model operation already in progress may need to finish first; another task can start after it ends.

If a task fails or is cancelled, **Try the same input again** reuses the selected file in this tab. Selecting a different input clears that retry target. Local file contents are not uploaded.

Model loading and speech recognition do not have a fixed timeout.

## Review and edit your transcript

After transcription, replay the original recording and click a timestamp to seek to a cue. Edit cue text; Copy, TXT, SRT and VTT use your edits. **Open in Subtitle Editor** opens a local timing editor in another tab. Playback depends on browser codec support. The transcript and recording pass directly between same-origin tabs; no project is saved.

## Export your edited transcript

In the shared transcription tool, Copy and TXT use your edited words. They are plain text by default; enable Include timestamps in TXT and Copy to add available start times. This option does not run speech recognition again. SRT, VTT and Open in Subtitle Editor require non-empty cue text and complete valid start/end times. Missing end times are not estimated. If timing is incomplete, keep the recording for review and copy or download TXT instead.

## Search your current transcript

After transcription, use **Find in this transcript** to search your latest
edited words. Previous and Next navigate occurrences; a preview highlights
one match. Choose **Edit this match** to select its text, or play its cue when
a recording and start time are available. Enter moves forward, Shift+Enter
moves back, and Escape in the search box clears the query.

Search is literal, ignores ASCII letter case, and stays inside each cue in
your current tab. Queries are not uploaded or saved. Search does not change
cue timing or exports.
