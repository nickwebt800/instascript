# Voicemail Transcription: Turn a Recording into Text

> Voicemail transcription in your browser: turn one permitted local voicemail recording into timestamped text, TXT, SRT or VTT without uploading the audio.

Canonical: <https://instascript.app/voicemail-transcription>

[Open the tool](https://instascript.app/voicemail-transcription)

## Review a voicemail before returning the call

Choose a voicemail recording already saved on this device, up to 100 MB. This tool transcribes browser-decodable English audio; it does not connect to a telephone account or inbox.

Try the [public practice synthetic message](https://instascript.app/assets/tutorials/voicemail-transcription/fictional-voicemail.wav). Original fictional teaching message synthesized with Windows System.Speech on October 23, 2026. No real caller, phone number, voicemail inbox or personal message is used. This synthetic sample is not a voicemail-service or human-speech accuracy benchmark. Screenshots show actual recognition and explicit teaching edits; they are not speed or accuracy measurements.

## 1. Which voicemail file can I use?

Start with a permitted local recording, not an inbox link or phone number. Keep the message date separately. The practice recording is an original synthetic message about a garden club; its names and extension are fictional.

![Which voicemail file can I use? Actual file selection in this tool. The public teaching sample is not a personal recording.](https://instascript.app/assets/tutorials/voicemail-transcription/01-choose-wide.svg)

Actual file selection in this tool. The public teaching sample is not a personal recording.

**Check:** The recording is the complete message you intend to review.

## 2. What happens while the message is processed?

The browser first decodes the recording, checks its language with a multilingual checkpoint, then recognizes English with a separate English checkpoint. First use may download both models. Cached resource files can avoid another download, but they do not guarantee an initialized model: the English instance is released before the next language check. There is no fixed completion time.

![What happens while the message is processed? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/voicemail-transcription/02-process-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

**Check:** A failed check does not establish what language the caller used.

## 3. Which details need a second listen?

Replay the caller name, extension, deadline and each condition. In the fictional sample, distinguish before Friday at nine from the message date, and preserve do not and unless. Do not infer missing digits from a familiar contact. Click a transcript timestamp to seek in the local recording player. Replay the surrounding phrase before editing its cue. Text edits do not move cue boundaries. Use Find in this transcript to locate an exact word in the latest edits; Previous and Next navigate matches, Enter moves forward, Shift+Enter moves back, and Escape clears the search.

![Which details need a second listen? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/voicemail-transcription/03-review-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

**Check:** Every digit and condition needed for a reply has been checked against the recording.

## 4. How do I save the checked message?

Keep verbatim words separate from your intended reply. Add contact details only when verified from an appropriate source; this page does not place a call or create a task list. Copy, TXT and Markdown use your edited words and are untimed by default. Enable Include timestamps in TXT, Markdown and Copy to include available start times. Markdown escapes markup and exports transcript paragraphs, without creating a summary. SRT, VTT and Open in Subtitle Editor require nonempty text and complete valid start/end times; missing ends are not estimated. If timing is incomplete, save TXT or Markdown and keep the recording.

![How do I save the checked message? Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.](https://instascript.app/assets/tutorials/voicemail-transcription/04-save-wide.svg)

Actual local sample workflow. Any [reviewed] suffix is a deliberate teaching edit, not recognized speech.

First cue from the actual teaching export (including the deliberate [reviewed] edit):

```srt
1
00:00:00,000 --> 00:00:07,360
This is Alex from the Garden Club. Please call extension 426 before Friday at 9. [reviewed]
```

**Check:** Your reading copy preserves negations and conditions without silently rewriting them.

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
