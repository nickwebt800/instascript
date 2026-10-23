# Voice Memo to Text: Transcribe a Recording in Your Browser

> Voice memo to text in your browser: transcribe one local recording and export timestamped TXT, SRT or VTT while it stays on your device.

Canonical: <https://instascript.app/voice-memo-to-text>

[Open the tool](https://instascript.app/voice-memo-to-text)

## Check a saved voice memo before it becomes a record

Start with an existing local memo, rather than a phone backup or sharing page. The tool above recognizes English speech from browser-decodable recordings up to 100 MB.

Try the [public practice M4A file](https://instascript.app/assets/tutorials/voice-memo-to-text/kennedy-practice.m4a). Eleven-second public-domain excerpt from John F. Kennedy’s January 20, 1961 inaugural address. See the [recording provenance](https://instascript.app/assets/demo/SOURCE.md). The sample demonstrates this codec in the tested browser, not every file configuration, recording length or multi-speaker podcast. Screenshots show actual recognition and explicit teaching edits; they are not speed or accuracy measurements.

## 1. Which copy of my memo should I select?

Choose the full saved recording, and keep its date and source in your own notes. A short preview may omit the last instruction. Phone export controls vary; this guide starts after you have a local file and does not show an unverified phone menu.

![Which copy of my memo should I select? Actual file selection in this tool. The public teaching sample is not a personal recording.](https://instascript.app/assets/tutorials/voice-memo-to-text/01-choose-wide.svg)

Actual file selection in this tool. The public teaching sample is not a personal recording.

**Check:** The file opens locally and includes the whole memo.

## 2. What happens after I press Transcribe this file?

The browser first decodes the recording, checks its language with a multilingual checkpoint, then recognizes English with a separate English checkpoint. First use may download both models. Cached resource files can avoid another download, but they do not guarantee an initialized model: the English instance is released before the next language check. There is no fixed completion time.

![What happens after I press Transcribe this file? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/voice-memo-to-text/02-process-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

**Check:** Language-check failure and a non-English result remain separate outcomes.

## 3. How do I check names and dates in a memo?

Write down the memo date separately before interpreting words such as tomorrow or next Friday. Replay names rather than silently replacing an unfamiliar one with a familiar spelling. Click a transcript timestamp to seek in the local recording player. Replay the surrounding phrase before editing its cue. Text edits do not move cue boundaries. Use Find in this transcript to locate an exact word in the latest edits; Previous and Next navigate matches, Enter moves forward, Shift+Enter moves back, and Escape clears the search.

![How do I check names and dates in a memo? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/voice-memo-to-text/03-review-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

**Check:** A calendar date is an editorial note unless the speaker actually said it.

## 4. How do I keep a useful copy of the memo?

Keep the original recording and reviewed transcript together. Put your action list in a separate note so a later reader can distinguish spoken words from your interpretation. Copy, TXT and Markdown use your edited words and are untimed by default. Enable Include timestamps in TXT, Markdown and Copy to include available start times. Markdown escapes markup and exports transcript paragraphs, without creating a summary. SRT, VTT and Open in Subtitle Editor require nonempty text and complete valid start/end times; missing ends are not estimated. If timing is incomplete, save TXT or Markdown and keep the recording.

![How do I keep a useful copy of the memo? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/voice-memo-to-text/04-save-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

First cue from the actual teaching export (including the deliberate [reviewed] edit):

```srt
1
00:00:00,000 --> 00:00:07,740
And so my fellow Americans ask not what your country can do for you [reviewed]
```

**Check:** The saved transcript retains the latest corrections; a separate notes file identifies its source.

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

If your memo is an interview, use the [interview transcription guide](/interview-transcription) to review the exchange before quoting it.

Before cleaning up a spoken note, compare the full and clean examples in the [verbatim transcription guide](/verbatim-transcription).
