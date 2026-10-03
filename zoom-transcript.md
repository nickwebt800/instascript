# Zoom Transcript: Transcribe a Recording in Your Browser | InstaScript

> Turn one local Zoom recording into searchable spoken text in your browser. Review timestamps, then copy TXT or download SRT.

Canonical: <https://instascript.app/zoom-transcript>

[InstaScript](https://instascript.app/)

# Zoom Transcript: Transcribe a Recording in Your Browser

Export a recording you are allowed to use, choose the local file, and review its timestamped transcript before saving TXT or SRT.

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

These single runs come from the site's measured WASM browser benchmark on one laptop:

| Audio length | Elapsed time | Model download |
| --- | ---: | --- |
| 11 s | 16.89 s | yes, first run |
| 11 s | 6.49 s | no, cached |
| 30 s | 8.98 s | no |
| 60 s | 16.06 s | no |
| 120 s | 28.58 s | no |

[Raw benchmark CSV](https://raw.githubusercontent.com/nickwebt800/instascript/main/benchmark/whisper-tiny-en-browser-benchmark.csv) contains the measured rows and method notes. Device load, silence and recording length change elapsed time.

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
