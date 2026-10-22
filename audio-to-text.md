# Audio Transcription — MP3, WAV & Voice Memos to Text

> Audio transcription in your browser: upload an MP3, WAV, M4A or voice memo and get the spoken words with timestamps. Copy the text or download TXT / SRT. No signup.

Canonical: <https://instascript.app/audio-to-text>

[Open the tool](https://instascript.app/audio-to-text)

## A complete local audio review workflow

Use the tool above for one local MP3, WAV, M4A or OGG file up to 100 MB when this browser can decode it. It recognizes English speech; the format name does not guarantee a supported codec.

Try the [public practice WAV file](https://instascript.app/assets/tutorials/audio-to-text/kennedy-practice.wav). Eleven-second public-domain excerpt from John F. Kennedy’s January 20, 1961 inaugural address. See the [recording provenance](https://instascript.app/assets/demo/SOURCE.md). The sample demonstrates this codec in the tested browser, not every file configuration, recording length or multi-speaker podcast. Screenshots show actual recognition and explicit teaching edits; they are not speed or accuracy measurements.

## 1. How do I prepare an audio file?

Use the full recording, with audible speech near its beginning for the language check. Listen for clipping, echo, music and overlapping voices. A compressed copy cannot restore words already missing in the source.

![How do I prepare an audio file? Actual file selection in this tool. The public teaching sample is not a personal recording.](https://instascript.app/assets/tutorials/audio-to-text/01-choose-wide.svg)

Actual file selection in this tool. The public teaching sample is not a personal recording.

**Check:** The source is playable, complete and within the size limit.

## 2. What is the language and model-loading sequence?

The browser first decodes the recording, checks its language with a multilingual checkpoint, then recognizes English with a separate English checkpoint. First use may download both models. Cached resource files can avoid another download, but they do not guarantee an initialized model: the English instance is released before the next language check. There is no fixed completion time.

![What is the language and model-loading sequence? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/audio-to-text/02-process-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

**Check:** Wait for a transcript or a specific error; a progress screen alone is not a result.

## 3. How do I find a phrase in a long result?

Find in this transcript searches literal text within each cue, ignoring ASCII letter case. Use Previous or Next and Edit this match to select the occurrence you want. Search uses current edits in this tab; it does not search other recordings, upload the query or alter exports.

![How do I find a phrase in a long result? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/audio-to-text/03-find-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

**Check:** Check a match in its surrounding sentence before treating it as a quote.

## 4. How do I correct words while listening?

Check short words such as not, dates and quantities. Keep uncertainty visible instead of filling gaps from context alone. Click a transcript timestamp to seek in the local recording player. Replay the surrounding phrase before editing its cue. Text edits do not move cue boundaries. Use Find in this transcript to locate an exact word in the latest edits; Previous and Next navigate matches, Enter moves forward, Shift+Enter moves back, and Escape clears the search.

![How do I correct words while listening? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/audio-to-text/04-review-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

**Check:** Playback supports the revised wording; a text correction has not silently become a timing correction.

## 5. Which output fits my next task?

Use TXT for plain reading, Markdown for transcript notes, and SRT or VTT for a timed track. Save the recording separately. Copy, TXT and Markdown use your edited words and are untimed by default. Enable Include timestamps in TXT, Markdown and Copy to include available start times. Markdown escapes markup and exports transcript paragraphs, without creating a summary. SRT, VTT and Open in Subtitle Editor require nonempty text and complete valid start/end times; missing ends are not estimated. If timing is incomplete, save TXT or Markdown and keep the recording.

![Which output fits my next task? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/audio-to-text/05-save-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

First cue from the actual teaching export (including the deliberate [reviewed] edit):

```srt
1
00:00:00,000 --> 00:00:07,740
And so my fellow Americans ask not what your country can do for you [reviewed]
```

**Check:** The actual downloaded artifact contains your current edits and the intended time representation.

## More questions and limits

### Does my recording leave this device?

Local decoding, recognition, replay, edits and downloads run in your browser. Model resources need network access, but the local recording and transcript are not uploaded. There is no account history or saved cloud project; download your work before closing the tab. Same-origin editor transfer keeps the cues and recording local between tabs. Instagram URL retrieval and YouTube caption lookup have separate server-assisted privacy boundaries.

### What if decoding or the language check fails?

An undecodable file is different from a language result. Detected non-English speech stops recognition; an uncertain result or a technical language-check failure stops with a separate message and creates no transcript. For a damaged or unsupported file, export a new playable audio copy from its source: renaming the extension does not convert it. [Recording Format Guide](https://instascript.app/recording-format-guide) explains these boundaries.

### Can I cancel and try again?

Only one transcription task runs at a time. Cancel processing discards its result; an in-progress model or audio operation may need to finish before controls unlock. Then use Try the same input again. Choosing another input clears the previous retry target. A cancellation is not a transcript of silence.

## How long does an audio file take?

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

## Recommended

[ElevenLabs](https://try.elevenlabs.io/4cwahrcf3vyn) &mdash; an AI voice generator and text-to-speech studio for turning spoken notes into polished audio. A free tier is available to try.


      This audio page includes an affiliate link; a qualifying ElevenLabs signup may earn us a commission at no extra cost to you.
