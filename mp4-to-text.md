# MP4 to Text: Transcribe an MP4 File in Your Browser | InstaScript

> Turn one local MP4 into searchable spoken text in your browser. Review timestamps, then copy TXT or download SRT.

Canonical: <https://instascript.app/mp4-to-text>

[InstaScript](https://instascript.app/)

# MP4 to Text: Transcribe an MP4 File in Your Browser

Choose an MP4 you are allowed to use, let the browser read its audio track, and review the timestamped transcript before exporting it.

## MP4 to text: the direct answer

**MP4 to text** means turning spoken audio in a local MP4 into searchable words. This page processes one file in the browser and produces timestamped text for copying, TXT notes or SRT subtitle cues. It does not fetch a video-platform link or read words shown only in the picture.

## How to transcribe an MP4

1. Choose one MP4, MOV or WebM file up to 100 MB.
2. Press **Transcribe this file**. The first run downloads the speech model into the browser cache.
3. Check names, numbers and cuts against the video, then copy TXT or download SRT.

The model is English-focused and handles one local file per run.

## What the output looks like

Each segment keeps timing so you can check the video:

    [00:00] Thanks for watching the product update
    [00:06] The next release needs one final check
    [00:13] We will publish the notes tomorrow

TXT is easy to search. SRT keeps numbered cues and time ranges. Neither format identifies a speaker unless the speaker says their name.

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

The selected MP4 is decoded and transcribed in your browser. There is no account, transcript history or server upload for this local-file workflow. Save the result before closing the tab.

Music, echo, clipping, rapid edits and overlapping voices can change words or cue boundaries. The model is intended for English speech; it does not translate, label speakers, read on-screen text or add caption styling.

## FAQ

### Can I paste a video link?

No. Save an MP4 you are allowed to use and choose the local file. Protected and private links are not fetched.

### Does the MP4 leave my device?

No for the local-file workflow. The speech model runs in the browser and the page does not keep a server copy.

### Can I use the result as captions?

Yes. Download SRT, then inspect cue breaks in a subtitle editor. The export contains speech timing, not styling or a video preview.

### Why is the first run slower?

The first run loads and initializes the speech model. A later file can reuse the cached model.

## Related tools

- [Video to Text](https://instascript.app/video-to-text) — transcribe an MP4, MOV or WebM file.
- [Audio to Text](https://instascript.app/audio-to-text) — transcribe local audio files.
- [MP3 to Text](https://instascript.app/mp3-to-text) — a focused local MP3 workflow.
- [Subtitle Editor](https://instascript.app/subtitle-editor) — edit SRT, VTT or SBV timing and text.

## Cancel and retry

Only one transcription task can run at a time. While processing, input controls are locked. **Cancel processing** discards its result. A model download or local audio/model operation already in progress may need to finish first; another task can start after it ends.

If a task fails or is cancelled, **Try the same input again** reuses the selected file in this tab. Selecting a different input clears that retry target. Local file contents are not uploaded.

Model loading and speech recognition do not have a fixed timeout.

## Review and edit your transcript

After transcription, replay the original recording and click a timestamp to seek to a cue. Edit cue text; Copy, TXT, SRT and VTT use your edits. **Open in Subtitle Editor** opens a local timing editor in another tab. Playback depends on browser codec support. The transcript and recording pass directly between same-origin tabs; no project is saved.

## Export your edited transcript

In the shared transcription tool, Copy and TXT use your edited words. They are plain text by default; enable Include timestamps in TXT and Copy to add available start times. This option does not run speech recognition again. SRT, VTT and Open in Subtitle Editor require non-empty cue text and complete valid start/end times. Missing end times are not estimated. If timing is incomplete, keep the recording for review and copy or download TXT instead.
