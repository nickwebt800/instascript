# WAV to Text: Transcribe a WAV File in Your Browser | InstaScript

> Turn one local WAV recording into searchable spoken text in your browser. Review timestamps, then copy TXT or download SRT.

Canonical: <https://instascript.app/wav-to-text>

[InstaScript](https://instascript.app/)

# WAV to Text: Transcribe a WAV File in Your Browser

Choose a WAV recording you are allowed to use, run the browser model, and review the timestamped transcript before saving TXT or SRT.

## WAV to text: the direct answer

**WAV to text** means turning speech in a local WAV recording into searchable words. The page processes one file in the browser and keeps timestamps for notes or subtitle cues. WAV often contains uncompressed PCM, but its header and sample format still have to be browser-readable.

## How to transcribe a WAV recording

1. Choose one WAV file up to 100 MB.
2. Press **Transcribe this file**. The first run downloads the speech model into the browser cache.
3. Check names, numbers and dates, then copy TXT or download SRT.

The model is intended for English speech and handles one local file per run.

## Example output

`[00:00] The interview starts after the tone` · `[00:08] Please read the reference number back` · `[00:16] We will send the notes this afternoon`

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

[Raw benchmark CSV](https://raw.githubusercontent.com/nickwebt800/instascript/main/benchmark/whisper-tiny-en-browser-benchmark.csv) contains the measured rows and method notes. Sample format, cache state and device load change elapsed time.

## Privacy and review limits

The selected WAV is decoded and transcribed in your browser. There is no account, transcript history or server upload for this local-file workflow. A damaged header, unusual sample encoding, clipping, music, echo or overlapping voices can cause an error or incorrect words. It does not translate or label speakers.

## FAQ

### Can I paste a WAV link?

No. Save a recording you are permitted to use and choose the local file. Private cloud links are not fetched.

### Does the WAV leave my device?

No for this local workflow. The speech model runs in the browser and the page does not keep a server copy.

### What if the WAV will not decode?

Try a standard PCM WAV or export an MP3. A `.wav` suffix alone does not identify a browser-readable sample format.

### Can I make subtitles from the result?

Yes. Download SRT, then inspect cue breaks in a subtitle editor. The export contains speech timing, not styling or a video preview.

## Related tools

- [Audio to Text](https://instascript.app/audio-to-text) — transcribe local audio files.
- [MP3 to Text](https://instascript.app/mp3-to-text) — focus on MP3 recordings and timed exports.
- [M4A to Text](https://instascript.app/m4a-to-text) — focus on M4A recordings and timed exports.
- [Subtitle Editor](https://instascript.app/subtitle-editor) — edit SRT, VTT or SBV timing and text.
