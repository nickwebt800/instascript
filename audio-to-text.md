# Audio to Text — Transcribe MP3, WAV & Voice to Text | InstaScript

> Audio to text in your browser: upload an MP3, WAV, M4A or voice memo and get the spoken words written out with timestamps. Copy the text or download TXT / SRT. No signup.

Canonical: <https://instascript.app/audio-to-text>

[InstaScript](https://instascript.app/)

# Audio to Text — Transcribe MP3, WAV & Voice Memos

Turn an audio file into text — free, in your browser

Voice memos, podcast files and recorded calls all work.

Paste a public Instagram Reel or video post URL

## What does audio to text mean?

**Audio to text** — also described as **transcribe audio**, **MP3 to text** or **voice to text** — means converting the speech in a sound file into written words. The audio file is not changed; you get a text version of what was said, usually with a time marker at the start of each line so you can find that part of the recording again.

People run audio to text on voice memos and voice notes, interviews, podcast episodes, recorded meetings and lectures, dictation, and any clip where reading is easier than listening. Unlike dictation built into an app, this works on a file you already have.

## How to transcribe audio in 3 steps

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

These five runs were measured on this page with audio files of known length. Nothing here is estimated: each row is one run, timed from the click on *Transcribe* to the moment the transcript appeared.

| Audio length | Time to transcribe | Model download included |
| --- | --- | --- |
| 11 s | 16.89 s | yes — first run on a fresh page |
| 11 s | 6.49 s | no |
| 30 s | 8.98 s | no |
| 60 s | 16.06 s | no |
| 120 s | 28.58 s | no |

**How to read these rows:** the first run has to fetch the model before it can do anything, so it is the slowest one on the list. The runs after it reuse the model already loaded in the page, and those came out at roughly a quarter of the recording's length — take any row and divide the second number by the first. That "about a quarter" is arithmetic on the rows above, not a separate measurement.

These are my measurements on my own machine: one laptop, one browser, the WASM build without WebGPU, one run per length and no repeats. Your device will land somewhere else — quicker on a newer CPU, slower on an older phone — so read the rows as a shape, not a promise.

Raw data: [download the CSV](https://raw.githubusercontent.com/nickwebt800/instascript/main/benchmark/whisper-tiny-en-browser-benchmark.csv) · method and environment: [benchmark README on GitHub](https://github.com/nickwebt800/instascript/blob/main/benchmark/README.md).

## FAQ

### Which audio formats can I transcribe?

MP3, WAV, M4A and OGG, and other formats your browser can decode. If it plays in the browser, the speech in it can be transcribed. Files up to 100 MB.

### Is voice to text different from audio to text?

It is the same job described two ways: spoken voice in, written text out. A voice memo recorded on a phone is just an audio file, so it goes through the same box above.

### Does the audio leave my device?

No. The model runs in your browser and the file is not uploaded anywhere. There is no account to create and nothing is stored on a server.

### How long a recording can I transcribe?

Up to 100 MB per file. The audio is handled in 30-second passes, so an hour-long recording takes noticeably longer than a short memo and uses more memory in the browser.

### Can I transcribe audio on my phone?

Yes. Open this page in a mobile browser and pick the recording from your phone. The first run downloads the speech model, so allow a little extra time on mobile data.

### Which languages are supported?

English. The spoken language is identified first, and non-English audio returns a notice instead of a guess.

InstaScript is an independent personal project. It is not affiliated with, endorsed by, or sponsored by any platform or by OpenAI.

## Recommended

[ElevenLabs](https://try.elevenlabs.io/4cwahrcf3vyn) — AI voice generator and text-to-speech studio. Turn text into natural-sounding speech for your videos. Free tier available to try.

Affiliate link: we are an independent affiliate of ElevenLabs and may earn a commission if you sign up through this link, at no extra cost to you.
