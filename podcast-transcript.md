# Podcast Transcript: Turn an Episode into TXT or SRT | InstaScript

> Make a searchable podcast transcript from a local audio file in your browser. Review timestamps, then copy TXT or download SRT.

Canonical: <https://instascript.app/podcast-transcript>

[InstaScript](https://instascript.app/)

# Podcast Transcript: Turn an Episode into TXT or SRT

Choose an audio file from a podcast episode, let the browser transcribe the spoken English, and review the timestamped result before exporting it.

## Podcast transcript: the direct answer

A **podcast transcript** is the spoken audio written as searchable text. This page accepts one local audio file at a time, processes it in your browser, and produces timestamped text that you can copy or download as TXT or SRT. It does not create a transcript from an episode title or show notes.

## How to transcribe an episode

1. Save the episode audio you are allowed to use and choose it above.
2. Press **Transcribe this file**. The first run downloads the speech model into the browser cache.
3. Check names, numbers, quotes and speaker changes against the recording.
4. Copy the plain text or download SRT when you need timed subtitle cues.

The workflow is suitable for a downloaded MP3, WAV, M4A or OGG recording up to 100 MB. It is English-focused and handles one file per run.

## Spotify podcast transcript and Riverside FM transcript boundaries

Searches for a **Spotify podcast transcript** or **Riverside FM transcript** often start with a hosted episode link. This page does not fetch audio from those services, bypass a login, or read a private project. Use an audio file you have permission to process, then keep the exported transcript with the source episode for review.

## What the output looks like

Each segment keeps timing so a line can be checked against the audio:

    [00:00] Welcome back to the weekly product notes
    [00:08] Today we are comparing two release paths
    [00:16] The second path needs one more review

TXT is easiest to search and edit. SRT contains numbered cues and time ranges for subtitle editors. Neither format identifies a speaker unless the speaker says their name.

## Measured browser timings

These single runs come from the site's measured browser benchmark. They show the first model load separately from cached processing; device, browser, cache and audio content change the result.

| Audio length | Elapsed time | Model download |
| --- | ---: | --- |
| 11 s | 16.89 s | yes, first run |
| 11 s | 6.49 s | no, cached |
| 30 s | 8.98 s | no |
| 60 s | 16.06 s | no |
| 120 s | 28.58 s | no |

[Raw benchmark CSV](https://raw.githubusercontent.com/nickwebt800/instascript/main/benchmark/whisper-tiny-en-browser-benchmark.csv) contains the measured rows and method notes.

## Privacy and review limits

The selected file is decoded and transcribed in the browser. The page has no account, transcript history or server upload for this local-file workflow. Download the result before closing the tab.

Music beds, laughter, crosstalk, room echo, clipped audio and unfamiliar accents can change words or timestamps. The model is intended for English speech; it does not translate, label speakers, summarize an episode or recover text shown only on screen.

## FAQ

### Can I paste a Spotify or Riverside link?

No. Save an audio file you are allowed to use and choose that file. Private, login-only and protected links are not fetched by this page.

### Is this different from podcast transcription?

No. “Podcast transcript” describes the text artifact, while “podcast transcription” describes the conversion process from spoken audio to written words.

### Does the audio leave my device?

No for the local-file workflow. The speech model runs in the browser and the page does not keep a server copy of the file or transcript.

### Why is the first run slower?

The first run loads and initializes the speech model. A later file can reuse the cached model, which is why the benchmark has separate first-run and cached rows.

### Can I use the result as captions?

Yes. Download SRT, then inspect cue breaks and names in your subtitle editor. The export contains speech timing, not caption styling or a video preview.

## Related tools

- [Audio to Text](https://instascript.app/audio-to-text) — transcribe MP3, WAV, M4A or OGG files.
- [MP3 to Text](https://instascript.app/mp3-to-text) — a focused local MP3 workflow.
- [Subtitle Editor](https://instascript.app/subtitle-editor) — edit SRT, VTT or SBV timing and text.
- [SRT to Text](https://instascript.app/srt-to-text) — remove subtitle timing to get plain text.

