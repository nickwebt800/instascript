# Voicemail Transcription: Turn a Recording into Text | InstaScript

> Transcribe one permitted local voicemail in your browser. Review timestamps, then copy TXT or download SRT.

Canonical: <https://instascript.app/voicemail-transcription>

[InstaScript](https://instascript.app/)

# Voicemail Transcription: Turn a Recording into Text

Choose a voicemail recording you are allowed to use, run the browser model, and review the timed transcript before saving TXT, SRT or VTT. “Voicemail to text” is the same workflow.

## Voicemail transcription: the direct answer

**Voicemail transcription** turns speech in a local recording into searchable words. It does not connect to a carrier mailbox, bypass a passcode, or fetch a private link. Only the audio file you choose is processed.

## How to transcribe a voicemail

1. Export one browser-readable M4A, MP3, WAV or OGG file up to 100 MB.
2. Press **Transcribe this file**. The first run downloads the speech model into the browser cache.
3. Replay names, phone numbers, dates and callback instructions, then copy TXT or download SRT.

## Example output

    [00:00] Hi, this is Jordan from the service desk
    [00:08] Please call back before four on Thursday
    [00:15] The reference number is five eight two one

TXT is searchable. SRT preserves numbered cues and time ranges. Neither adds speaker labels or call metadata.

## Measured browser timings

These are single runs from the site's measured WASM browser benchmark on one laptop:

| Audio length | Elapsed time | Model download |
| --- | ---: | --- |
| 11 s | 16.89 s | yes, first run |
| 11 s | 6.49 s | no, cached |
| 30 s | 8.98 s | no |
| 60 s | 16.06 s | no |
| 120 s | 28.58 s | no |

[Raw benchmark CSV](https://raw.githubusercontent.com/nickwebt800/instascript/main/benchmark/whisper-tiny-en-browser-benchmark.csv) contains the measured rows and method. Device load, silence and codec affect elapsed time.

## Privacy and review limits

The selected recording is decoded and transcribed in your browser. There is no account, transcript history or server upload for this local-file workflow.

Voicemail compression, hold music, echo, clipping and overlapping voices can hide words. The model is intended for English speech and does not translate or identify speakers. Replay every number, name and callback detail against the original audio.

## FAQ

### Can I paste a voicemail service link?

No. Save a permitted recording and choose the local file. Phone, carrier and private cloud links are not fetched.

### Does the voicemail leave my device?

No for this local workflow. The speech model runs in the browser and the page does not keep a server copy.

### What if the recording will not decode?

Try exporting a browser-readable WAV or MP3. A file extension alone does not reveal its codec.

### Can I make captions from the result?

Yes. Download SRT and inspect cue breaks in a subtitle editor. The export contains speech timing, not styling or a video preview.

## Related tools

- [Audio to Text](https://instascript.app/audio-to-text) — transcribe local audio files.
- [Voice Memo to Text](https://instascript.app/voice-memo-to-text) — transcribe a phone recording with timed exports.
- [MP3 to Text](https://instascript.app/mp3-to-text) — focus on MP3 files and timed output.
- [Subtitle Editor](https://instascript.app/subtitle-editor) — edit SRT, VTT or SBV timing and text.

## Cancel and retry

Only one transcription task can run at a time. While processing, input controls are locked. **Cancel processing** discards its result. A model download or local audio/model operation already in progress may need to finish first; another task can start after it ends.

If a task fails or is cancelled, **Try the same input again** reuses the selected file in this tab. Selecting a different input clears that retry target. Local file contents are not uploaded.

Model loading and speech recognition do not have a fixed timeout.

## Review and edit your transcript

After transcription, replay the original recording and click a timestamp to seek to a cue. Edit cue text; Copy, TXT, SRT and VTT use your edits. **Open in Subtitle Editor** opens a local timing editor in another tab. Playback depends on browser codec support. The transcript and recording pass directly between same-origin tabs; no project is saved.

## Export your edited transcript

In the shared transcription tool, Copy and TXT use your edited words. They are plain text by default; enable Include timestamps in TXT and Copy to add available start times. This option does not run speech recognition again. SRT, VTT and Open in Subtitle Editor require non-empty cue text and complete valid start/end times. Missing end times are not estimated. If timing is incomplete, keep the recording for review and copy or download TXT instead.
