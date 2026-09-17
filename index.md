# InstaScript - Instagram Transcript Tool

> Free Instagram transcript tool: turn Reels, video and audio files (MP4, MOV, WebM, MP3, WAV, M4A, OGG) into text. Paste-a-link takes public Instagram URLs.

Canonical: <https://instascript.app/>

Turn Instagram Reels and any video or audio file into text

Paste a public Instagram Reel or video post URL

## How long does a transcript take?

For a Reel the short rows are the useful ones: 30 seconds of speech came out at 8.98 s, and 120 seconds at 28.58 s, once the model was already in the page. The first run on a fresh page is the slow one, because it has to fetch the model before it can start. The rows below were measured with audio files of known length; a Reel goes through the same audio path, so one with the same spoken length should land in the same range — **that step is inference**, the rows themselves are measured.

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

## How an Instagram transcript generator works

**Instagram to text** means turning the spoken words in a public Reel or an uploaded recording into readable text with timestamps. Paste a public Instagram URL, or upload a file from your device, then copy the result or download it as TXT or SRT.

## FAQ

### Can I make an Instagram Reels transcript from a public link?

Yes. Paste a public Instagram Reel or video post URL above. The page fetches the media link, while the speech recognition runs in your browser and returns the transcript when the audio is supported.

## More transcription tools

- [Video to Text](https://instascript.app/video-to-text) — turn an MP4, MOV or WebM file into a timestamped video transcript.
- [Audio to Text](https://instascript.app/audio-to-text) — transcribe an MP3, WAV or voice memo into written text.
- [TikTok Transcript](https://instascript.app/tiktok-transcript) — save a TikTok video and read what is said in it.
- [Facebook Video Transcript](https://instascript.app/facebook-video-transcript) — get the spoken words out of a Facebook video file.

## Recommended

[ElevenLabs](https://try.elevenlabs.io/4cwahrcf3vyn) — an AI voice generator and text-to-speech studio for creators who want to turn written scripts into narration. A free tier is available to try.

This homepage includes an affiliate link; a qualifying ElevenLabs signup may earn us a commission at no extra cost to you.
