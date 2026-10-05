# Voice Memo to Text: Transcribe a Recording in Your Browser | InstaScript

> Turn one local voice memo into searchable spoken text in your browser. Review timestamps, then copy TXT or download SRT.

Canonical: <https://instascript.app/voice-memo-to-text>

[InstaScript](https://instascript.app/)

# Voice Memo to Text: Transcribe a Recording in Your Browser

Choose a voice memo you are allowed to use, run the browser model, and review the timestamped transcript before saving TXT or SRT.

## Voice memo to text: the direct answer

**Voice memo to text** means turning speech in a local recording into searchable words. This page processes one file in the browser and keeps timestamps for notes or subtitle cues. It does not fetch a phone backup, private cloud link, title or metadata as a transcript.

## How to transcribe a voice memo

1. Export one browser-readable M4A, MP3, WAV or OGG file up to 100 MB.
2. Press **Transcribe this file**. The first run downloads the speech model into the browser cache.
3. Check names, numbers and dates, then copy TXT or download SRT.

The model is intended for English speech and handles one local file per run.

## Example output

    [00:00] Call the clinic before ten
    [00:07] Ask about the revised appointment time
    [00:15] Add the confirmation number to the notes

TXT is easy to search. SRT keeps numbered cues and time ranges. Neither export adds speaker labels or caption styling.

## Measured browser timings

These single runs come from the site's measured WASM browser benchmark on one laptop:

| Audio length | Elapsed time | Model download |
| --- | ---: | --- |
| 11 s | 16.89 s | yes, first run |
| 11 s | 6.49 s | no, cached |
| 30 s | 8.98 s | no |
| 60 s | 16.06 s | no |
| 120 s | 28.58 s | no |

[Raw benchmark CSV](https://raw.githubusercontent.com/nickwebt800/instascript/main/benchmark/whisper-tiny-en-browser-benchmark.csv) contains the measured rows and method notes. Codec, cache state and device load change elapsed time.

## Privacy and review limits

The selected recording is decoded and transcribed in your browser. There is no account, transcript history or server upload for this local-file workflow. Save the result before closing the tab.

The model is intended for English speech. Unsupported codecs, DRM, music, clipping, echo and overlapping voices can cause an error or incorrect words. It does not translate or label speakers.

## FAQ

### Can I paste a voice memo link?

No. Save a recording you are permitted to use and choose the local file. Private cloud links are not fetched.

### Does the memo leave my device?

No for this local-file workflow. The speech model runs in the browser and the page does not keep a server copy.

### What if the memo will not decode?

Try opening it in a player or exporting a browser-friendly WAV or MP3. The extension alone does not identify its codec.

### Can I make subtitles from the result?

Yes. Download SRT, then inspect cue breaks in a subtitle editor. The export contains speech timing, not styling or a video preview.

### Why is the first run slower?

The first run loads and initializes the speech model. A later file can reuse the cached model.

## Related tools

- [Audio to Text](https://instascript.app/audio-to-text) — transcribe local audio files.
- [M4A to Text](https://instascript.app/m4a-to-text) — focus on M4A recordings and timed exports.
- [MP3 to Text](https://instascript.app/mp3-to-text) — focus on MP3 files and timed exports.
- [Subtitle Editor](https://instascript.app/subtitle-editor) — edit SRT, VTT or SBV timing and text.
