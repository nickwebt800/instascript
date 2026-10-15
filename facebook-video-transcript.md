# Facebook Video Transcript Tool & Transcription | InstaScript

> Facebook video transcript made in your browser. Save or record the video, upload the file, and read the spoken words as timestamped text. Copy it or download TXT / SRT. No signup.

Canonical: <https://instascript.app/facebook-video-transcript>

[InstaScript](https://instascript.app/)

# Facebook Video Transcript

Read what a Facebook video says — free, in your browser

Save the video to your device (or screen-record it), then drop the file here.

Paste a public Instagram Reel or video post URL

## What is a Facebook video transcript?

A **Facebook video transcript** is the spoken audio of a Facebook video written out as text. It lets you read what was said in a post, a recorded live session, a talk, or a shared clip without replaying it. Facebook video transcription normally keeps **timestamps** at the start of each line, so any sentence can be traced back to its moment in the recording.

Common uses: writing notes from a recorded talk or church service, quoting a public video accurately, creating subtitles, and keeping a text copy of a video that may later be removed.

## How to get a Facebook video transcript in 3 steps

1. **Get the video onto your device.** Facebook lets you save many videos from the post menu; if saving is not offered, record your screen or record the audio while it plays. MP4, WebM, MP3 and WAV up to 100 MB are accepted.
2. **Upload the file in the box above** — drag and drop on desktop, tap to choose on a phone.
3. **Press Transcribe** and read the timestamped text. Copy it, or download .txt or .srt.

## What the result looks like

Every line carries the time it was said, which keeps the text usable as notes or as a subtitle track:

```
[00:00] Welcome everyone, thanks for joining tonight
[00:05] we are going to cover three things
[00:11] the first one is the most common mistake
```

Download the same text as **.txt** for reading and quoting, or **.srt** when you need subtitles.

## How long does a Facebook video take?

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

### Can you transcribe a Facebook video from its link?

Not from a Facebook link. The link box on this site currently accepts public Instagram URLs. For Facebook, save or record the video and upload the file — the transcription step is identical.

### Does it work for long videos and recorded lives?

Yes, as long as the file is under 100 MB. Audio is processed in 30-second passes, so a one-hour recording takes longer than a one-minute clip and needs more memory in the browser.

### Do I have to send the video to a server?

No. The model runs in your own browser and the file stays on your device. No account, no upload queue, no waiting for an email.

### Can it transcribe languages other than English?

No. The tool identifies the spoken language first and shows a short notice when the audio is not English, rather than producing a guess.

### Does it work on a phone?

Yes, in a mobile browser. Save or screen-record the video first, then upload it from your phone. On the first run the speech model is downloaded to the browser.

InstaScript is an independent personal project. It is not affiliated with, endorsed by, or sponsored by Facebook, Meta, or OpenAI.

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
cue timing or exports. The separate YouTube caption tools do not have this
search control.
