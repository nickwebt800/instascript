# M4A to Text: Transcribe an M4A File in Your Browser

> Transcribe one local M4A file in your browser. Review English speech and save TXT or Markdown with optional timestamps, or valid timed SRT/VTT cues.

Canonical: <https://instascript.app/m4a-to-text>

[Open the tool](https://instascript.app/m4a-to-text)

## From an M4A recording to checked text

Choose one local M4A up to 100 MB above, transcribe clear English speech, then replay and correct the result before saving it. M4A is a container; its extension alone cannot guarantee browser decoding.

Try the [public practice M4A file](https://instascript.app/assets/tutorials/m4a-to-text/kennedy-practice.m4a). Eleven-second public-domain excerpt from John F. Kennedy’s January 20, 1961 inaugural address. See the [recording provenance](https://instascript.app/assets/demo/SOURCE.md). The sample demonstrates this codec in the tested browser, not every file configuration, recording length or multi-speaker podcast. Screenshots show actual recognition and explicit teaching edits; they are not speed or accuracy measurements.

## 1. How do I choose an M4A recording to transcribe?

Save the complete recording on this device, then choose it above. An iCloud page, sharing link or phone backup is not a local audio file. Check the beginning and end in a player first. Keep the original; if your phone offers an export, use a recording you are allowed to process.

![How do I choose an M4A recording to transcribe? Actual file selection in this tool. The public teaching sample is not a personal recording.](https://instascript.app/assets/tutorials/m4a-to-text/01-choose-wide.svg)

Actual file selection in this tool. The public teaching sample is not a personal recording.

**Check:** The selected file has the expected name and size, and Transcribe this file is available.

## 2. Why does the first transcription take longer?

The browser first decodes the recording, checks its language with a multilingual checkpoint, then recognizes English with a separate English checkpoint. First use may download both models. Cached resource files can avoid another download, but they do not guarantee an initialized model: the English instance is released before the next language check. There is no fixed completion time. Keep the tab open. Cancel if you selected the wrong source; wait for the controls to unlock before retrying.

![Why does the first transcription take longer? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/m4a-to-text/02-process-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

**Check:** The processing message describes the current stage; a cached file is not proof that initialization has finished.

## 3. How do I replay and correct the M4A transcript?

Replay names, numbers, dates and short negations. The illustrated [reviewed] suffix is an intentional teaching edit, not recognized speech. Click a transcript timestamp to seek in the local recording player. Replay the surrounding phrase before editing its cue. Text edits do not move cue boundaries. Use Find in this transcript to locate an exact word in the latest edits; Previous and Next navigate matches, Enter moves forward, Shift+Enter moves back, and Escape clears the search.

![How do I replay and correct the M4A transcript? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/m4a-to-text/03-review-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

**Check:** The edited cue still matches the audible recording; unresolved words remain marked for review.

## 4. Should I save TXT, Markdown, SRT or VTT?

Choose a reading copy for notes, or a timed file for a subtitle destination. Open in Subtitle Editor lets you change timing in another tab when the cues validate. Copy, TXT and Markdown use your edited words and are untimed by default. Enable Include timestamps in TXT, Markdown and Copy to include available start times. Markdown escapes markup and exports transcript paragraphs, without creating a summary. SRT, VTT and Open in Subtitle Editor require nonempty text and complete valid start/end times; missing ends are not estimated. If timing is incomplete, save TXT or Markdown and keep the recording.

![Should I save TXT, Markdown, SRT or VTT? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/m4a-to-text/04-save-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

First cue from the actual teaching export (including the deliberate [reviewed] edit):

```srt
1
00:00:00,000 --> 00:00:07,740
And so my fellow Americans ask not what your country can do for you [reviewed]
```

**Check:** Open the downloaded file and confirm the last edit and expected timing; do not infer correct captions from the filename.

## 5. What should I do if the file will not decode or the task stops?

An undecodable file is different from a language result. Detected non-English speech stops recognition; an uncertain result or a technical language-check failure stops with a separate message and creates no transcript. For a damaged or unsupported file, export a new playable audio copy from its source: renaming the extension does not convert it. [Recording Format Guide](https://instascript.app/recording-format-guide) explains these boundaries. Only one transcription task runs at a time. Cancel processing discards its result; an in-progress model or audio operation may need to finish before controls unlock. Then use Try the same input again. Choosing another input clears the previous retry target. A cancellation is not a transcript of silence.

![What should I do if the file will not decode or the task stops? Actual decode failure from a deliberately damaged teaching copy, separate from the playable practice file.](https://instascript.app/assets/tutorials/m4a-to-text/05-recover-wide.svg)

Actual decode failure from a deliberately damaged teaching copy, separate from the playable practice file.

**Check:** Retry uses a playable original or a genuinely converted copy, rather than the deliberately damaged teaching file.

## More questions and limits

### Does my recording leave this device?

Local decoding, recognition, replay, edits and downloads run in your browser. Model resources need network access, but the local recording and transcript are not uploaded. There is no account history or saved cloud project; download your work before closing the tab. Same-origin editor transfer keeps the cues and recording local between tabs. Instagram URL retrieval and YouTube caption lookup have separate server-assisted privacy boundaries.

### What if decoding or the language check fails?

An undecodable file is different from a language result. Detected non-English speech stops recognition; an uncertain result or a technical language-check failure stops with a separate message and creates no transcript. For a damaged or unsupported file, export a new playable audio copy from its source: renaming the extension does not convert it. [Recording Format Guide](https://instascript.app/recording-format-guide) explains these boundaries.

### Can I cancel and try again?

Only one transcription task runs at a time. Cancel processing discards its result; an in-progress model or audio operation may need to finish before controls unlock. Then use Try the same input again. Choosing another input clears the previous retry target. A cancellation is not a transcript of silence.

### Where is the complete audio workflow?

[Audio to Text](https://instascript.app/audio-to-text) explains search, text corrections and output choices. For timing changes, use [Subtitle Editor](https://instascript.app/subtitle-editor).

## Measured browser timings

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
