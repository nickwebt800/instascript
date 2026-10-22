# Subtitle Generator

> Generate a timed English subtitle draft from a public Instagram video or local media, then review and export TXT, SRT or VTT in your browser.

Canonical: <https://instascript.app/subtitle-generator>

[Open the matching tool](https://instascript.app/video-to-text)

## Review the timing of a speech-derived subtitle draft

This guide focuses on timed cues. For general word corrections see [Caption Generator](https://instascript.app/caption-generator); for the complete local recording workflow see [Video to Text](https://instascript.app/video-to-text).



## 1. Recognize the speech in the actual recording

Use the linked tool for one browser-decodable local English recording up to 100 MB. Model loading and a language check come first. Existing text can instead go to [TXT to SRT](https://instascript.app/txt-to-srt), whose estimated timeline is a manual draft, not audio alignment.

**Check:** The source of the words and the source of the timing are known.

## 2. Check both boundaries of every important cue

A correct sentence can still appear too early or remain through a pause. SRT/VTT export and editor transfer require nonempty text and complete valid start/end times. Missing ends are not invented; keep TXT/Markdown if the result cannot validate.

**Check:** The cue starts and ends match the exact recording edit.

## 3. Refine and preview the subtitle track

Open valid cues in [Subtitle Editor](https://instascript.app/subtitle-editor) to edit timing and text locally. Keep the recording, original cues and reviewed export. Test the final SRT/VTT in its destination player; this tool does not translate automatically or render burned-in subtitles.

**Check:** Beginning, middle and final cues have been checked against playback.

## More questions and limits

### What processing and privacy boundaries apply?

Local decoding, recognition, replay, edits and downloads run in your browser. Model resources need network access, but the local recording and transcript are not uploaded. There is no account history or saved cloud project; download your work before closing the tab. Same-origin editor transfer keeps the cues and recording local between tabs. Instagram URL retrieval and YouTube caption lookup have separate server-assisted privacy boundaries.

### Where should I continue?

[Open the matching tool](https://instascript.app/video-to-text) and follow its current input requirements. Keep the original, review your result and download it before closing the tab.

## Output and review

| Output | Use it for | Review |
| --- | --- | --- |
| Timestamped cues | Checking each spoken segment | Names, numbers, URLs and line breaks |
| SRT | Players and subtitle editors | Cue duration, overlap and reading speed |
| TXT | Searchable notes or a script draft | Paragraph breaks and spelling |

Use the [Subtitle Editor](https://instascript.app/subtitle-editor) to change cue text or shift timings. Keep the source recording beside the export.
