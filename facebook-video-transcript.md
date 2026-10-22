# Facebook Video Transcript

> Facebook video transcript made in your browser. Save or record the video, upload the file, and read the spoken words as timestamped text. Copy it or download TXT / SRT. No signup.

Canonical: <https://instascript.app/facebook-video-transcript>

[Open the tool](https://instascript.app/facebook-video-transcript)

## Verify a quotation from a saved Facebook recording

Start with a permitted local video file up to 100 MB. Saving a post to a collection is not the same as having a local media file; this page does not fetch Facebook URLs or access private posts.

Try the [public practice MP4 file](https://instascript.app/assets/tutorials/facebook-video-transcript/kennedy-practice.mp4). Eleven-second public-domain excerpt from John F. Kennedy’s January 20, 1961 inaugural address. See the [recording provenance](https://instascript.app/assets/demo/SOURCE.md). The MP4 uses a neutral picture; it is not a platform export or meeting. The sample demonstrates this codec in the tested browser, not every file configuration, recording length or multi-speaker podcast. Screenshots show actual recognition and explicit teaching edits; they are not speed or accuracy measurements.

## 1. Do I have an actual recording file?

Open the saved local media and check that the full passage plays with sound. Download and export availability depend on the source; this guide does not promise access to every post. The practice MP4 is a historical speech with a neutral picture, not a Facebook export. The browser first decodes the recording, checks its language with a multilingual checkpoint, then recognizes English with a separate English checkpoint. First use may download both models. Cached resource files can avoid another download, but they do not guarantee an initialized model: the English instance is released before the next language check. There is no fixed completion time.

![Do I have an actual recording file? Actual file selection in this tool. The public teaching sample is not a personal recording.](https://instascript.app/assets/tutorials/facebook-video-transcript/01-choose-wide.svg)

Actual file selection in this tool. The public teaching sample is not a personal recording.

**Check:** The chosen input is a recording, not a shortcut, bookmark or login page.

## 2. How do I check a replay with missing sections?

Compare the opening and ending with the context you intend to cite. A shortened replay cannot establish what happened in omitted sections. Check names, dates and qualifiers in the audio rather than borrowing them from the post description. Click a transcript timestamp to seek in the local recording player. Replay the surrounding phrase before editing its cue. Text edits do not move cue boundaries. Use Find in this transcript to locate an exact word in the latest edits; Previous and Next navigate matches, Enter moves forward, Shift+Enter moves back, and Escape clears the search.

![How do I check a replay with missing sections? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/facebook-video-transcript/02-review-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

**Check:** The quotation is supported by this recording and any coverage gap is documented.

## 3. What should accompany the saved transcript?

Keep your source reference and recording coverage in separate notes. The transcript export does not scrape a post description, comments or words visible only in the video. Copy, TXT and Markdown use your edited words and are untimed by default. Enable Include timestamps in TXT, Markdown and Copy to include available start times. Markdown escapes markup and exports transcript paragraphs, without creating a summary. SRT, VTT and Open in Subtitle Editor require nonempty text and complete valid start/end times; missing ends are not estimated. If timing is incomplete, save TXT or Markdown and keep the recording.

![What should accompany the saved transcript? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/facebook-video-transcript/03-save-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

First cue from the actual teaching export (including the deliberate [reviewed] edit):

```srt
1
00:00:00,000 --> 00:00:07,740
And so my fellow Americans ask not what your country can do for you [reviewed]
```

**Check:** Your saved artifact distinguishes source speech from your own contextual notes.

## More questions and limits

### Does my recording leave this device?

Local decoding, recognition, replay, edits and downloads run in your browser. Model resources need network access, but the local recording and transcript are not uploaded. There is no account history or saved cloud project; download your work before closing the tab. Same-origin editor transfer keeps the cues and recording local between tabs. Instagram URL retrieval and YouTube caption lookup have separate server-assisted privacy boundaries.

### What if decoding or the language check fails?

An undecodable file is different from a language result. Detected non-English speech stops recognition; an uncertain result or a technical language-check failure stops with a separate message and creates no transcript. For a damaged or unsupported file, export a new playable audio copy from its source: renaming the extension does not convert it. [Recording Format Guide](https://instascript.app/recording-format-guide) explains these boundaries.

### Can I cancel and try again?

Only one transcription task runs at a time. Cancel processing discards its result; an in-progress model or audio operation may need to finish before controls unlock. Then use Try the same input again. Choosing another input clears the previous retry target. A cancellation is not a transcript of silence.

### Where is the complete audio workflow?

[Audio to Text](https://instascript.app/audio-to-text) explains search, text corrections and output choices. For timing changes, use [Subtitle Editor](https://instascript.app/subtitle-editor).
