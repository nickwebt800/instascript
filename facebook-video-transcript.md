# Facebook Video Transcript Tool & Transcription | InstaScript

> Facebook video transcript made in your browser. Save or record the video, upload the file, and read the spoken words as timestamped text. Copy it or download TXT / SRT. No signup.

Canonical: <https://instascript.app/facebook-video-transcript>

[InstaScript](https://instascript.app/)

# Facebook Video Transcript

Read what a Facebook video says — free, in your browser

Save the video to your device (or screen-record it), then drop the file here.

Paste a public Instagram Reel or video post URL

## What is a Facebook video transcript?

A **Facebook video transcript** is the spoken audio of a Facebook video written out as text. It lets you read what was said in a post, a recorded live session, a talk, or a shared clip without replaying it. Facebook video transcription normally keeps **timestamps** at the start of each line, so any sentence can be traced back to its moment in the recording.

Common uses: writing notes from a recorded talk or church service, quoting a public video accurately, creating subtitles, and keeping a text copy of a video that may later be removed.

## How to get a Facebook video transcript in 3 steps

1. **Get the video onto your device.** Facebook lets you save many videos from the post menu; if saving is not offered, record your screen or record the audio while it plays. MP4, WebM, MP3 and WAV up to 100 MB are accepted.
2. **Upload the file in the box above** — drag and drop on desktop, tap to choose on a phone.
3. **Press Transcribe** and read the timestamped text. Copy it, or download .txt or .srt.

## What the result looks like

Every line carries the time it was said, which keeps the text usable as notes or as a subtitle track:

```
[00:00] Welcome everyone, thanks for joining tonight
[00:05] we are going to cover three things
[00:11] the first one is the most common mistake
```

Download the same text as **.txt** for reading and quoting, or **.srt** when you need subtitles.

## How long does a Facebook video take?

Recorded lives and talks run long, so for those the 60-second and 120-second rows are the ones that matter. The rows were measured with audio files of known length; a Facebook video you saved or recorded goes through the same audio path, so one with the same spoken length should take about as long. **That step is inference** — the rows themselves are measured.

| Audio length | Time to transcribe | Model download included |
| --- | --- | --- |
| 11 s | 16.89 s | yes — first run on a fresh page |
| 11 s | 6.49 s | no |
| 30 s | 8.98 s | no |
| 60 s | 16.06 s | no |
| 120 s | 28.58 s | no |

**How to read these rows:** the first run has to fetch the model before it can do anything, so it is the slowest one on the list. The runs after it reuse the model already loaded in the page, and those came out at roughly a quarter of the video's length — take any row and divide the second number by the first. That "about a quarter" is arithmetic on the rows above, not a separate measurement.

These are my measurements on my own machine: one laptop, one browser, the WASM build without WebGPU, one run per length and no repeats. Your device will land somewhere else — quicker on a newer CPU, slower on an older phone — so read the rows as a shape, not a promise.

Raw data: [download the CSV](https://raw.githubusercontent.com/nickwebt800/instascript/main/benchmark/whisper-tiny-en-browser-benchmark.csv) · method and environment: [benchmark README on GitHub](https://github.com/nickwebt800/instascript/blob/main/benchmark/README.md).

## FAQ

### Can you transcribe a Facebook video from its link?

Not from a Facebook link. The link box on this site currently accepts public Instagram URLs. For Facebook, save or record the video and upload the file — the transcription step is identical.

### Does it work for long videos and recorded lives?

Yes, as long as the file is under 100 MB. Audio is processed in 30-second passes, so a one-hour recording takes longer than a one-minute clip and needs more memory in the browser.

### Do I have to send the video to a server?

No. The model runs in your own browser and the file stays on your device. No account, no upload queue, no waiting for an email.

### Can it transcribe languages other than English?

No. The tool identifies the spoken language first and shows a short notice when the audio is not English, rather than producing a guess.

### Does it work on a phone?

Yes, in a mobile browser. Save or screen-record the video first, then upload it from your phone. On the first run the speech model is downloaded to the browser.

InstaScript is an independent personal project. It is not affiliated with, endorsed by, or sponsored by Facebook, Meta, or OpenAI.
