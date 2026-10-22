# MP3 to Text: Transcribe an MP3 File in Your Browser

> MP3 to text in your browser: drop in an MP3 and get spoken words with timestamps, TXT, SRT and VTT downloads. Your file stays on this device.

Canonical: <https://instascript.app/mp3-to-text>

[Open the tool](https://instascript.app/mp3-to-text)

## Turn an MP3 speech recording into a checked reading copy

Choose a local MP3 up to 100 MB above. Clear English speech is the useful input; a music file, album cover or ID3 description does not supply a transcript.

Try the [public practice MP3 file](https://instascript.app/assets/tutorials/mp3-to-text/kennedy-practice.mp3). Eleven-second public-domain excerpt from John F. Kennedy’s January 20, 1961 inaugural address. See the [recording provenance](https://instascript.app/assets/demo/SOURCE.md). The sample demonstrates this codec in the tested browser, not every file configuration, recording length or multi-speaker podcast. Screenshots show actual recognition and explicit teaching edits; they are not speed or accuracy measurements.

## 1. Is this MP3 useful for speech recognition?

Play a section with speech and check whether music or compression hides consonants. The public practice file is a genuine encoded MP3; it tests this sample in this browser, not every MP3 encoder or mixed music track. The browser first decodes the recording, checks its language with a multilingual checkpoint, then recognizes English with a separate English checkpoint. First use may download both models. Cached resource files can avoid another download, but they do not guarantee an initialized model: the English instance is released before the next language check. There is no fixed completion time.

![Is this MP3 useful for speech recognition? Actual file selection in this tool. The public teaching sample is not a personal recording.](https://instascript.app/assets/tutorials/mp3-to-text/01-choose-wide.svg)

Actual file selection in this tool. The public teaching sample is not a personal recording.

**Check:** You selected the intended speech recording, rather than a link or an unrelated music file.

## 2. What should I check around music and short words?

Listen just before and after each uncertain phrase. A plausible sentence may still omit a negation under a music bed; mark what cannot be confirmed. Click a transcript timestamp to seek in the local recording player. Replay the surrounding phrase before editing its cue. Text edits do not move cue boundaries. Use Find in this transcript to locate an exact word in the latest edits; Previous and Next navigate matches, Enter moves forward, Shift+Enter moves back, and Escape clears the search.

![What should I check around music and short words? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/mp3-to-text/02-review-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

**Check:** The quotation is supported by audible words, with uncertain gaps identified.

## 3. Should I export a reading copy or timed subtitles?

Do not use a reading export as a replacement for the original MP3. To deliver captions, also check the cue timing in the destination player. Copy, TXT and Markdown use your edited words and are untimed by default. Enable Include timestamps in TXT, Markdown and Copy to include available start times. Markdown escapes markup and exports transcript paragraphs, without creating a summary. SRT, VTT and Open in Subtitle Editor require nonempty text and complete valid start/end times; missing ends are not estimated. If timing is incomplete, save TXT or Markdown and keep the recording.

![Should I export a reading copy or timed subtitles? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/mp3-to-text/03-save-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

First cue from the actual teaching export (including the deliberate [reviewed] edit):

```srt
1
00:00:00,000 --> 00:00:07,740
And so my fellow Americans ask not what your country can do for you [reviewed]
```

**Check:** The chosen output contains the corrections and has been opened after download.

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

## Recommended

[ElevenLabs](https://try.elevenlabs.io/4cwahrcf3vyn) &mdash; an AI voice generator and text-to-speech studio for turning spoken notes into polished audio. A free tier is available to try.


      This audio page includes an affiliate link; a qualifying ElevenLabs signup may earn us a commission at no extra cost to you.
