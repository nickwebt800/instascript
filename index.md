# InstaScript - Instagram Transcript Tool

> Free Instagram transcript tool: turn Reels, video and audio files (MP4, MOV, WebM, MP3, WAV, M4A, OGG) into text. Paste-a-link takes public Instagram URLs.

Canonical: <https://instascript.app/>

Turn Instagram Reels and any video or audio file into text

Paste a public Instagram Reel or video post URL

## How long does a transcript take?

For a Reel the short rows are the useful ones: 30 seconds of speech came out at 8.98 s, and 120 seconds at 28.58 s, once the transcription model was already in the page. The first run on a fresh page is the slow one, because it has to fetch the language detection and transcription models before it can start. The rows below were measured with audio files of known length; a Reel goes through the same audio path, so one with the same spoken length should land in the same range — **that step is inference**, the rows themselves are measured.

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

## Limits and errors

Speech recognition supports English only. Detected non-English speech is rejected; an uncertain or failed language check stops processing with a separate error and creates no transcript.

A written post description is not a speech transcript. If playable video cannot be fetched, no transcript is created; upload a saved video or try another public Reel.

SRT export is available only when the speech result has timestamped segments.

## FAQ

### Can I make an Instagram Reels transcript from a public link?

Yes. Paste a public Instagram Reel or video post URL above. The page fetches the media link, while the speech recognition runs in your browser and returns the transcript when the audio is supported.

## More transcription tools

### Transcript tools

- [Instagram Transcript Generator](https://instascript.app/instagram-transcript-generator) — Get timestamped text from a public Instagram Reel or a saved video, with TXT and SRT downloads.
- [Instagram Reels Transcript](https://instascript.app/instagram-reels-transcript) — Turn a public Instagram Reel or saved video into timestamped transcript text, TXT or SRT.
- [Instagram Video to Text](https://instascript.app/instagram-video-to-text) — Convert a public Instagram video or saved file into timestamped spoken text, TXT or SRT.
- [Reels to Text](https://instascript.app/reels-to-text) — Turn a public Instagram Reel or saved file into timestamped spoken text, TXT or SRT.
- [Instagram Caption Extractor](https://instascript.app/instagram-caption-extractor) — Separate written Instagram post captions from spoken transcript text and verify the result before export.
- [Caption Generator](https://instascript.app/caption-generator) — Generate a timed English speech caption draft from public Instagram media or a local audio/video file, with TXT and SRT export.
- [Subtitle Generator](https://instascript.app/subtitle-generator) — Generate a timed English speech subtitle draft from public Instagram media or a local audio/video file, with TXT and SRT export.
- [WhatsApp Voice to Text](https://instascript.app/whatsapp-voice-to-text) — Turn a permitted local WhatsApp voice message into timestamped English text, TXT or SRT in the browser.
- [Video to Text](https://instascript.app/video-to-text) — Turn an MP4, MOV or WebM video file into a timestamped transcript.
- [Audio to Text](https://instascript.app/audio-to-text) — Transcribe an MP3, WAV or voice memo into written text.
- [MP3 to Text](https://instascript.app/mp3-to-text) — Transcribe a local MP3 into timestamped text, then download TXT or SRT.
- [M4A to Text](https://instascript.app/m4a-to-text) — Transcribe one local M4A recording into timestamped text, then download TXT or SRT.
- [WAV to Text](https://instascript.app/wav-to-text) — Transcribe one local WAV recording into timestamped text, TXT or SRT in the browser.
- [Voice Memo to Text](https://instascript.app/voice-memo-to-text) — Turn one local voice memo into timestamped text, TXT or SRT in the browser.
- [Voicemail Transcription](https://instascript.app/voicemail-transcription) — Turn one permitted local voicemail recording into timestamped English text, TXT or SRT in the browser.
- [Podcast Transcript](https://instascript.app/podcast-transcript) — Turn a local podcast episode into timestamped text, TXT or SRT in the browser.
- [MP4 to Text](https://instascript.app/mp4-to-text) — Transcribe the spoken audio in one local MP4 and export timestamped TXT or SRT in the browser.
- [Zoom Transcript](https://instascript.app/zoom-transcript) — Turn a permitted local Zoom recording into timestamped spoken text, TXT or SRT in the browser.
- [Vimeo Transcript](https://instascript.app/vimeo-transcript) — Turn a permitted local Vimeo recording into timestamped spoken text, TXT or SRT in the browser.
- [TikTok Transcript](https://instascript.app/tiktok-transcript) — Read what is said in a TikTok video. Save the video, then upload the file; TikTok links are not fetched.
- [Facebook Video Transcript](https://instascript.app/facebook-video-transcript) — Get the spoken words out of a Facebook video by uploading the saved file.
- [Twitter Video Transcript](https://instascript.app/twitter-video-transcript) — Turn a permitted saved X video into spoken transcript text with timestamps, TXT and SRT export in the browser.

### YouTube tools

- [YouTube Transcript](https://instascript.app/youtube-transcript) — Read existing caption tracks from a public YouTube link and export TXT or SRT.
- [YouTube Shorts Transcript](https://instascript.app/youtube-shorts-transcript) — Read an existing caption track from a public YouTube Short, with timestamped copy plus TXT and SRT export.
- [YouTube Transcript Download](https://instascript.app/youtube-transcript-download) — Take a YouTube video's caption track away as a file: TXT for reading and writing, SRT for subtitles and video editors.
- [How to Get a YouTube Transcript](https://instascript.app/how-to-get-a-transcript-of-a-youtube-video) — A guide to finding, copying and checking YouTube existing captions.

### Subtitle tools

- [TXT to SRT Converter](https://instascript.app/txt-to-srt) — Convert plain TXT text or an existing SRT/VTT file into editable SRT and VTT subtitles in the browser.
- [VTT to SRT Converter](https://instascript.app/vtt-to-srt) — Convert VTT to SRT, SRT to VTT, or SBV subtitles in one browser-based subtitle tool.
- [Subtitle Editor](https://instascript.app/subtitle-editor) — Edit an SRT, VTT or SBV file in the browser. Change cue timing and text, add or remove entries, shift all timecodes, export SRT or VTT. Receive a transcript directly from another tab and review it with a local recording.
- [ASS to SRT Converter](https://instascript.app/ass-to-srt) — Convert one ASS or SSA subtitle file to reviewable SRT cues in the browser, preserving timing and dialogue text.
- [SRT to Text Converter](https://instascript.app/srt-to-text) — Remove SRT or VTT cue numbers and timecodes to get clean plain text in the browser.
- [Subtitle Translator](https://instascript.app/subtitle-translator) — Edit translated SRT or VTT cue text locally while preserving the original timing and export an SRT.

## Recommended

[ElevenLabs](https://try.elevenlabs.io/4cwahrcf3vyn) — an AI voice generator and text-to-speech studio for creators who want to turn written scripts into narration. A free tier is available to try.

This homepage includes an affiliate link; a qualifying ElevenLabs signup may earn us a commission at no extra cost to you.

## Cancel and retry

Only one transcription task can run at a time. While processing, input controls are locked. **Cancel processing** aborts the active link lookup or media download. A model download or local audio/model operation already in progress may need to finish first; its result is discarded before another task can start.

If a task fails or is cancelled, **Try the same input again** reuses the selected file or submitted URL in this tab. Selecting a different input clears that retry target. Inputs are not saved as a server-side history.

Instagram lookup has a 60-second timeout and media download has a 120-second timeout, including reading the response body. These limits do not apply to model loading or speech recognition.

## Review and edit your transcript

After transcription, replay the original recording and click a timestamp to seek to a cue. Edit cue text; Copy, TXT and SRT use your edits. **Open in Subtitle Editor** opens a local timing editor in another tab. Playback depends on browser codec support. The transcript and recording pass directly between same-origin tabs; no project is saved.
