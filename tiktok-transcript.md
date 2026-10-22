# TikTok Transcript & Video Transcription

> TikTok transcript and TikTok video transcription in your browser. Save the video, drop the file in, get timestamped text you can copy or download as TXT, SRT or VTT. No signup.

Canonical: <https://instascript.app/tiktok-transcript>

[Open the tool](https://instascript.app/tiktok-transcript)

## Check spoken words across short-video cuts

Use a permitted video file already saved on this device, up to 100 MB. This page does not fetch TikTok URLs or turn a saved bookmark into a media file.

Try the [public practice MP4 file](https://instascript.app/assets/tutorials/tiktok-transcript/kennedy-practice.mp4). Eleven-second public-domain excerpt from John F. Kennedy’s January 20, 1961 inaugural address. See the [recording provenance](https://instascript.app/assets/demo/SOURCE.md). The MP4 uses a neutral picture; it is not a platform export or meeting. The sample demonstrates this codec in the tested browser, not every file configuration, recording length or multi-speaker podcast. Screenshots show actual recognition and explicit teaching edits; they are not speed or accuracy measurements.

## 1. What file can I select here?

Choose an actual local video that plays with sound. Source access and download availability vary; this tutorial starts after obtaining a file you are allowed to use. The practice MP4 is a historical audio excerpt with a neutral picture, not a TikTok download. The browser first decodes the recording, checks its language with a multilingual checkpoint, then recognizes English with a separate English checkpoint. First use may download both models. Cached resource files can avoid another download, but they do not guarantee an initialized model: the English instance is released before the next language check. There is no fixed completion time.

![What file can I select here? Actual file selection in this tool. The public teaching sample is not a personal recording.](https://instascript.app/assets/tutorials/tiktok-transcript/01-choose-wide.svg)

Actual file selection in this tool. The public teaching sample is not a personal recording.

**Check:** You have a playable media file, rather than a post URL or bookmark.

## 2. How do I check speech at a fast cut?

Replay both sides of a cut and listen for a clipped first or final word. Visible captions can be edited differently from speech; compare them separately. This tool does not read text from the picture. Click a transcript timestamp to seek in the local recording player. Replay the surrounding phrase before editing its cue. Text edits do not move cue boundaries. Use Find in this transcript to locate an exact word in the latest edits; Previous and Next navigate matches, Enter moves forward, Shift+Enter moves back, and Escape clears the search.

![How do I check speech at a fast cut? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/tiktok-transcript/02-review-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

**Check:** A cut has not removed a negation, changed a number or joined unrelated phrases.

## 3. How do I use the reviewed captions?

Keep text notes or take a valid timed file to [Subtitle Editor](https://instascript.app/subtitle-editor). This page does not burn captions into video or promise a direct SRT upload in a mobile publishing screen. Copy, TXT and Markdown use your edited words and are untimed by default. Enable Include timestamps in TXT, Markdown and Copy to include available start times. Markdown escapes markup and exports transcript paragraphs, without creating a summary. SRT, VTT and Open in Subtitle Editor require nonempty text and complete valid start/end times; missing ends are not estimated. If timing is incomplete, save TXT or Markdown and keep the recording.

![How do I use the reviewed captions? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/tiktok-transcript/03-save-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

First cue from the actual teaching export (including the deliberate [reviewed] edit):

```srt
1
00:00:00,000 --> 00:00:07,740
And so my fellow Americans ask not what your country can do for you [reviewed]
```

**Check:** The final caption presentation is previewed in the app or editor where it will actually appear.

## More questions and limits

### Does my recording leave this device?

Local decoding, recognition, replay, edits and downloads run in your browser. Model resources need network access, but the local recording and transcript are not uploaded. There is no account history or saved cloud project; download your work before closing the tab. Same-origin editor transfer keeps the cues and recording local between tabs. Instagram URL retrieval and YouTube caption lookup have separate server-assisted privacy boundaries.

### What if decoding or the language check fails?

An undecodable file is different from a language result. Detected non-English speech stops recognition; an uncertain result or a technical language-check failure stops with a separate message and creates no transcript. For a damaged or unsupported file, export a new playable audio copy from its source: renaming the extension does not convert it. [Recording Format Guide](https://instascript.app/recording-format-guide) explains these boundaries.

### Can I cancel and try again?

Only one transcription task runs at a time. Cancel processing discards its result; an in-progress model or audio operation may need to finish before controls unlock. Then use Try the same input again. Choosing another input clears the previous retry target. A cancellation is not a transcript of silence.

### Where is the complete audio workflow?

[Audio to Text](https://instascript.app/audio-to-text) explains search, text corrections and output choices. For timing changes, use [Subtitle Editor](https://instascript.app/subtitle-editor).
