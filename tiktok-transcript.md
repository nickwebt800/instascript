# TikTok Transcript & Video Transcription Tool | InstaScript

> TikTok transcript and TikTok video transcription in your browser. Save the video, drop the file in, get timestamped text you can copy or download as TXT or SRT. No signup.

Canonical: <https://instascript.app/tiktok-transcript>

[InstaScript](https://instascript.app/)

# TikTok Transcript & Video Transcription

Turn a TikTok video into text — free, in your browser

Save the TikTok to your phone or computer first, then drop the file here.

Paste a public Instagram Reel or video post URL

## What is a TikTok transcript?

A **TikTok transcript** is the spoken content of a TikTok video written out as text. Instead of replaying a clip to catch what was said, you read (or search) the words. A TikTok video transcription usually includes **timestamps** — the start time of each line — so you can jump back to the exact moment in the video.

People use TikTok transcripts to turn a video into a blog post or newsletter, pull quotes, write captions and subtitles, keep notes from tutorials and talks, and make videos searchable.

## How to transcribe a TikTok video in 3 steps

1. **Save the video to your device.** In the TikTok app use Share → Save video. On desktop, download the clip or record your screen while it plays. Any MP4, WebM, MP3 or WAV file up to 100 MB works.
2. **Drop the file into the box above** (or tap to browse from your phone).
3. **Press Transcribe.** The text appears with timestamps. Copy it, or download it as .txt or .srt.

## What the result looks like

Each line of the TikTok transcription starts with the time it was spoken, so the text stays tied to the video:

```
[00:00] So I tried this editing trick for a week
[00:04] and here is what actually changed
[00:09] first, the export time dropped in half
```

The same text is available in two downloads: **.txt** for plain notes and **.srt** for subtitles you can drop into an editor.

## How long does a TikTok take to transcribe?

The rows below run from 11 seconds of speech up to 120 seconds, so whichever length your clip is, there is a row near it. They were measured with audio files of known length; a TikTok saved to your phone goes through the same audio path, so a clip with the same spoken length should land in the same range. **That step is inference** — the rows themselves are measured.

| Audio length | Time to transcribe | Model download included |
| --- | --- | --- |
| 11 s | 16.89 s | yes — first run on a fresh page |
| 11 s | 6.49 s | no |
| 30 s | 8.98 s | no |
| 60 s | 16.06 s | no |
| 120 s | 28.58 s | no |

**How to read these rows:** the first run has to fetch the model before it can do anything, so it is the slowest one on the list. The runs after it reuse the model already loaded in the page, and those came out at roughly a quarter of the clip's length — take any row and divide the second number by the first. That "about a quarter" is arithmetic on the rows above, not a separate measurement.

These are my measurements on my own machine: one laptop, one browser, the WASM build without WebGPU, one run per length and no repeats. Your device will land somewhere else — quicker on a newer CPU, slower on an older phone — so read the rows as a shape, not a promise.

Raw data: [download the CSV](https://raw.githubusercontent.com/nickwebt800/instascript/main/benchmark/whisper-tiny-en-browser-benchmark.csv) · method and environment: [benchmark README on GitHub](https://github.com/nickwebt800/instascript/blob/main/benchmark/README.md).

## FAQ

### Can I paste a TikTok link instead of uploading?

Not on this page. The link option on this site currently works with public Instagram URLs, so for a TikTok you save the video to your device and upload the file. The transcription itself is the same either way.

### Does it work on my phone?

Yes. The page works in a mobile browser: save the TikTok, then use the upload box above. The first run downloads the speech model to your browser, so a longer video takes longer on mobile data.

### Is the video uploaded anywhere?

No. Transcription runs inside your browser with a local speech model. The file is not uploaded to a server, and no account is needed.

### Which languages are supported?

English. The tool checks the audio language first and returns a message instead of a guess when the audio is not English.

### How long can the video be?

Files up to 100 MB. Long clips are processed in 30-second chunks, so a long video takes proportionally longer and uses more memory on your device.

InstaScript is an independent personal project. It is not affiliated with, endorsed by, or sponsored by TikTok, ByteDance, or OpenAI.
