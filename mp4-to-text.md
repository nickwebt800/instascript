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

These single runs come from the site's measured WASM browser benchmark. Device, browser, cache state, video decoding and audio content can change the result.

| Audio length | Elapsed time | Model download |
| --- | ---: | --- |
| 11 s | 16.89 s | yes, first run |
| 11 s | 6.49 s | no, cached |
| 30 s | 8.98 s | no |
| 60 s | 16.06 s | no |
| 120 s | 28.58 s | no |

[Raw benchmark CSV](https://raw.githubusercontent.com/nickwebt800/instascript/main/benchmark/whisper-tiny-en-browser-benchmark.csv) contains the measured rows and method notes.

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
