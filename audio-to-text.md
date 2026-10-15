# Audio Transcription — MP3, WAV & Voice Memos to Text | InstaScript

> Audio transcription in your browser: upload an MP3, WAV, M4A or voice memo and get the spoken words with timestamps. Copy the text or download TXT / SRT. No signup.

Canonical: <https://instascript.app/audio-to-text>

[InstaScript](https://instascript.app/)

# Audio Transcription — MP3, WAV & Voice Memos to Text

Turn an audio file into text — free, in your browser

Voice memos, podcast files and recorded calls all work.

Paste a public Instagram Reel or video post URL

## What does audio transcription mean?

**Audio to text** means converting the speech in a sound file into written words. The audio file is not changed; you get a text version of what was said, usually with a time marker at the start of each line so you can find that part of the recording again.

The same job goes by a few names: an **audio transcript generator**, an **audio to text converter**, or just audio to text. Whichever you call it, the work is identical — the file stays on your device and the spoken words come back as text you can copy, search or download.

People run audio to text on voice memos and voice notes, interviews, podcast episodes, recorded meetings and lectures, dictation, and any clip where reading is easier than listening. Unlike dictation built into an app, this works on a file you already have.

## How to use an audio transcript generator in 3 steps

1. **Have the audio file ready.** MP3, WAV, M4A and OGG all work, including voice memos exported from your phone, up to 100 MB.
2. **Drop the file into the box above** — or tap it to choose a recording on your phone.
3. **Press Transcribe.** The text comes back with timestamps. Copy it, or download it as .txt or .srt.

## What the transcript looks like

Every line starts with the moment it was spoken, so long recordings stay easy to scan:

```
[00:00] Quick note to myself about the client call
[00:06] they want the report by Friday morning
[00:12] and they asked for the numbers broken out by region
```

Download the text as **.txt** to paste into notes or documents, or as **.srt** when you need timed captions.

## How long does an audio file take?

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

### Which audio formats can I transcribe?

MP3, WAV, M4A and OGG, plus FLAC and AAC when your browser can decode them. That covers common **FLAC to text**, **AAC to text** and **OGG to text** requests; if the file plays in the browser, its speech can be transcribed. Files up to 100 MB.

### Is voice transcription a different job?

It is the same job described two ways: spoken voice in, written text out. A voice memo recorded on a phone is just an audio file, so it goes through the same box above.

### Does the audio leave my device?

No. The model runs in your browser and the file is not uploaded anywhere. There is no account to create and nothing is stored on a server.

### How long a recording can I transcribe?

Up to 100 MB per file. The audio is handled in 30-second passes, so an hour-long recording takes noticeably longer than a short memo and uses more memory in the browser.

### Can I use this audio to text converter on my phone?

Yes. Open this page in a mobile browser and pick the recording from your phone. The first run downloads the speech model, so allow a little extra time on mobile data.

### Which languages are supported?

English. The spoken language is identified first, and non-English audio returns a notice instead of a guess.

This audio transcription page is an independent personal project. It is not affiliated with, endorsed by, or sponsored by any platform or by OpenAI.

## Recommended

[ElevenLabs](https://try.elevenlabs.io/4cwahrcf3vyn) — an AI voice generator and text-to-speech studio for turning spoken notes into polished audio. A free tier is available to try.

This audio page includes an affiliate link; a qualifying ElevenLabs signup may earn us a commission at no extra cost to you.

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
