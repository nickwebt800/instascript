# Video Transcript — MP4, MOV, WebM to Text | InstaScript

> Video transcript generator in your browser: drop an MP4, MOV or WebM file and read the spoken words with timestamps. Copy the text or download TXT / SRT. No signup.

Canonical: <https://instascript.app/video-to-text>

[Open the tool](https://instascript.app/video-to-text)

## Turn a recording into text you have checked

A video transcript is the spoken words from a recording, with available cue times for review. This video to text tool processes local files in the browser, supports English speech, and accepts files up to 100 MB when the browser can decode their audio.

For a short practice run, download the [11-second public-domain JFK recording](https://instascript.app/assets/demo/kennedy-1961.wav) and select it above. This page also accepts audio files; the illustrated run uses that WAV, not a video codec test. Recognition requires model downloads. The screenshots show an actual recognition run; the added “[reviewed]” marker is a deliberate editing demonstration, not part of the recording. [Source and rights](https://instascript.app/assets/demo/SOURCE.md).

## 1. Which video file should I open first?

Choose a local MP4, MOV or WebM file with clear English speech and a size below 100 MB. Drop it on the upload area or choose **browse**. Check the selected file, then choose **Transcribe this file**. This page accepts local audio too; the public practice WAV lets you try the workflow without a private recording.


The container extension does not guarantee that the browser can decode its audio. A screen recording must actually contain the voices you need. This page has no video-link field, audio-track selector or format converter. For unusual containers, consult the [Recording Format Guide](https://instascript.app/recording-format-guide).

![Local file upload area and selected public JFK WAV with the Transcribe this file button.](https://instascript.app/assets/tutorials/video-to-text/01-file-wide.svg)

The practice uses an audio file accepted by this page. MP4, MOV and WebM decoding still depends on the browser.

**Check:** The intended local file is selected and its audio includes the speech you need.

## 2. Why does the first transcription take longer?

The workflow decodes audio, checks its language, loads the English recognition model and transcribes speech. The first use downloads both the language detector and English model, so keep a working connection and allow the stage messages to change. Model loading and recognition have no fixed completion time.


Cached model resources can help later runs, but the English instance is released before a new language check. A cache hit does not mean all initialization disappears. The language check samples the beginning of the recording. Clearly detected non-English speech, uncertain language and technical detection failure have separate notices and stop without producing a transcript.

![Actual processing status and cancel control, alongside the decode, language-check and transcription stages.](https://instascript.app/assets/tutorials/video-to-text/02-process-wide.svg)

Captured during a real two-model run. This is not a timing estimate or performance benchmark.

**Check:** Read the current stage; a failed language check is not evidence that the speech is non-English.

## 3. How do I check and correct the transcript?

After transcription, use the local recording player and click a cue timestamp to replay from its start. Listen for names, numbers and missing words, then edit the corresponding text field. Copy and downloads use the latest wording. The “[reviewed]” marker in the illustration was added solely to demonstrate that an edit reaches the saved file.


The recognition result is a draft, especially with music, overlapping voices or unclear speech. Playback depends on browser codec support. Wording changes do not retime cues. When the cues have complete valid timing, **Open in Subtitle Editor** sends the transcript and recording directly to another same-origin tab for timing edits. If the tab is blocked or transfer fails, download SRT and open it there manually.

![Local recording player and an actual recognized cue edited with a deliberate reviewed marker.](https://instascript.app/assets/tutorials/video-to-text/03-review-wide.svg)

The WAV was actually recognized and replayed locally. The marker demonstrates editing and should be removed from a finished transcript.

**Check:** Compare the actual words with the recording, then verify the edited text.

## 4. How do I find a word in a long transcript?

Use **Find in this transcript** after recognition. Previous and Next move through matches in the latest edited words. Choose **Edit this match** to select its text, or play its cue when a recording and start time are available. Enter moves forward, Shift+Enter moves back, and Escape in the search box clears the query.


Matching is literal, ignores ASCII letter case and stays within one cue. A phrase split between cues will not match across that boundary. Search does not alter words, timing or exports, and the query is not uploaded or saved.

![Search controls showing the deliberate reviewed marker found in the edited transcript.](https://instascript.app/assets/tutorials/video-to-text/04-search-wide.svg)

This match is in the edited result. It does not measure recognition accuracy.

**Check:** Search a distinctive word within a cue and review the match in context.

## 5. Should I save TXT, Markdown, SRT or VTT?

**Copy** and **TXT** use edited words, with no times by default. Enable **Include timestamps in TXT, Markdown and Copy** to add available start times. **Markdown** saves a generic title and one paragraph per cue, escaping Markdown punctuation and HTML-like words. It contains transcript text, not an AI summary, and omits your original filename.


**SRT**, **VTT** and editor transfer require non-empty text and complete valid start/end times. Missing ends are not estimated. If those controls are unavailable, read the export message and save TXT or Markdown instead. Download before closing the tab; there is no automatic cloud save or transcript history. A subtitle file does not burn captions into your video.

![TXT, Markdown, SRT and VTT controls, the text timestamp checkbox, and an actual edited SRT download.](https://instascript.app/assets/tutorials/video-to-text/05-export-wide.svg)

The excerpt comes from the real recognition run after the deliberate “[reviewed]” edit. It is not a prepared recognition result.

**Check:** Reopen the download and confirm your latest wording, format and desired timestamps.

## 6. How do I recover from an error or cancel a run?

For a decode error, check that the recording has a supported audio codec; try a compatible export such as MP4 with AAC, or a playable WAV/MP3. Renaming a file extension does not convert it. The error illustration was produced using an intentionally invalid audio file. A technical language-check failure instead calls for checking the connection and retrying, not assuming the audio is non-English.


**Cancel processing** discards the task’s result. A model download or local audio/model operation already in progress may need to finish before another task can start. After failure or cancellation, **Try the same input again** reuses the selected file in this tab. Selecting a different input replaces that retry target; only one task runs at a time.

![Real decode error with the Try the same input again control, produced by an intentionally invalid teaching file.](https://instascript.app/assets/tutorials/video-to-text/06-retry-wide.svg)

This failure was deliberately triggered for the tutorial. It is separate from language rejection and model-loading errors.

**Check:** Wait until controls unlock, then retry the retained file or select a compatible recording.

## More questions and common problems

### Can this transcribe speech in another language?

Speech recognition is English only. Non-English, uncertain language and detection failure stop separately. Editing subtitle text in [Subtitle Editor](https://instascript.app/subtitle-editor) has no English-only restriction because you supply the words.

### Can I paste a YouTube or Instagram URL here?

This page uses local files. For public Instagram media use the [Instagram Transcript](https://instascript.app/) tool; its URL lookup involves servers. For existing YouTube captions use [YouTube Transcript Download](https://instascript.app/youtube-transcript-download). A caption lookup is different from speech recognition.

### Does my recording or transcript leave this browser?

Local file decoding, recognition, edits, playback and exports happen here. Model files are downloaded from delivery services; your local recording is not uploaded. Editor transfer uses same-origin browser messaging and does not put transcript text in the URL or save a cloud project. See the [privacy policy](https://instascript.app/privacy).

### Can I use this on a phone?

You can select files in a mobile browser, but decoding support, available memory and processing time vary. A small clear recording is a useful first check.

## Historical measurement notes

Previously published observations; not new measurements for this walkthrough.

## How long does a video take to transcribe?

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

[ElevenLabs](https://try.elevenlabs.io/4cwahrcf3vyn) — an AI voice generator and text-to-speech studio for turning a finished transcript into narration. A qualifying signup may earn us a commission at no extra cost to you.

InstaScript is an independent project and is not affiliated with the platforms or model providers mentioned.
