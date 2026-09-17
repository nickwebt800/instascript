# Transcribe Video — MP4, MOV, WebM to Text | InstaScript

> Video transcript generator in your browser: drop an MP4, MOV or WebM file and read the spoken words with timestamps. Copy the text or download TXT / SRT. No signup.

Canonical: <https://instascript.app/video-to-text>

[InstaScript](https://instascript.app/)

# Transcribe Video — MP4, MOV, WebM to Text

Turn a video file into text — free, in your browser

Any video file on your device works — screen recordings included.

Paste a public Instagram Reel or video post URL

## What does turning a video into text mean?

**Video to text** means taking the speech inside a video file and writing it out as readable text. The video itself is not changed — you get the words that were spoken, usually with the time each line starts, so you can jump back to that moment in the clip.

The same job goes by a few names: a **video transcript generator**, a **video to text converter**, or just video to text. Whichever you call it, the work is identical — the file stays on your device and the spoken words come back as text you can copy, search or download.

It is used for meeting and lecture recordings, interviews, screen recordings, vlogs and demos: anything where the useful part is what someone said and you would rather read, search or quote it than scrub through the timeline.

## How to use a video transcript generator in 3 steps

1. **Have the video file ready.** MP4, MOV and WebM all work, including screen recordings and phone camera clips, up to 100 MB.
2. **Drop the file into the box above** — or tap it to pick a video from your phone.
3. **Press Transcribe.** The video transcript appears with timestamps. Copy it, or download .txt for notes and .srt for subtitles.

## What the video transcript looks like

Each line carries the time it was spoken, so the text stays linked to the video:

```
[00:00] Today we are going to look at three settings
[00:05] the first one controls how much is cached
[00:11] and the second one is the one people miss
```

The same text downloads as **.txt** (plain text) or **.srt** (a subtitle file most editors can open).

## How long does a video take to transcribe?

It tracks the length of the soundtrack, not the size of the video file: a small MP4 and a large one with the same two minutes of speech take about the same time. The five rows below were measured with audio files of known length; a video goes through the same audio path, so a file with the same spoken length should land in the same range. **That last step is inference** — the rows themselves are measured.

| Audio length | Time to transcribe | Model download included |
| --- | --- | --- |
| 11 s | 16.89 s | yes — first run on a fresh page |
| 11 s | 6.49 s | no |
| 30 s | 8.98 s | no |
| 60 s | 16.06 s | no |
| 120 s | 28.58 s | no |

**Reading the video timings:** the first run includes fetching the model, while later runs reuse it in the page. In these rows, the later runs take roughly a quarter of the recording length; that comparison is arithmetic from the measurements above, not a separate test.

These video-page measurements came from one laptop, one browser and the WASM build without WebGPU, with one run at each length and no repeats. A different device may be faster or slower, so use the table to understand the pattern rather than as a promise.

The underlying timings are available in the [raw benchmark CSV](https://raw.githubusercontent.com/nickwebt800/instascript/main/benchmark/whisper-tiny-en-browser-benchmark.csv); the [benchmark README on GitHub](https://github.com/nickwebt800/instascript/blob/main/benchmark/README.md) records the method and environment.

## FAQ

### Which video formats can I convert to text?

MP4, MOV and WebM, plus anything else your browser can decode. What matters is the audio track: if the browser can play the sound, it can be transcribed. Files up to 100 MB.

### How long does a video take?

Audio is processed in 30-second passes, so a 10-minute recording takes longer than a 30-second clip. The first run also downloads the speech model to your browser.

### Is the video uploaded to a server?

No. The speech model runs inside your own browser and the file stays on your device. No account, no upload, no queue.

### Can I use this video to text converter on my phone?

Yes, in a mobile browser. Pick the video from your camera roll in the upload box above; the page works on a phone screen and the transcript can be copied straight from it.

### Which languages work?

English. The tool identifies the spoken language first and shows a short notice instead of a guess when the audio is not English.

### Can I get subtitles from the result?

Yes. Download the .srt file and drop it into a video editor or a player that loads external subtitles.

This video transcription page is an independent personal project. It is not affiliated with, endorsed by, or sponsored by any platform or by OpenAI.

## Recommended

[ElevenLabs](https://try.elevenlabs.io/4cwahrcf3vyn) — an AI voice generator and text-to-speech studio that can turn a finished video transcript into narration. A free tier is available to try.

This video page includes an affiliate link; a qualifying ElevenLabs signup may earn us a commission at no extra cost to you.
