# Subtitle Converter: Choose What to Keep

> Choose a local subtitle converter for SRT, VTT, ASS or TXT. Check which timing, text and styling survive before importing the converted file.

Canonical: <https://instascript.app/subtitle-converter>

[Open the matching tool](https://instascript.app/srt-to-vtt)

## Choose the conversion that preserves what you need

Start with the source format and the destination requirement. A successful download cannot recover information that the chosen output does not store.



![Decide which information may be lost. SRT → VTT. Keep valid timing and line breaks. Remove source styling. ASS → SRT. Keep usable dialogue and times. Lose fonts / positions / animation. SRT/VTT → TXT. Keep a reading copy. Remove timing and cue numbers](https://instascript.app/assets/tutorials/subtitle-converter/source-choices-wide.svg)

Decision diagram, not a platform screenshot. SRT → VTT: Keep valid timing and line breaks: Remove source styling; ASS → SRT: Keep usable dialogue and times: Lose fonts / positions / animation; SRT/VTT → TXT: Keep a reading copy: Remove timing and cue numbers.

| Input | Output | Next tool |
| --- | --- | --- |
| VTT / SBV | SRT | [VTT to SRT](https://instascript.app/vtt-to-srt) |
| SRT | VTT | [SRT to VTT](https://instascript.app/srt-to-vtt) |
| ASS / SSA | SRT | [ASS to SRT](https://instascript.app/ass-to-srt) |
| SRT / VTT | TXT | [SRT to Text](https://instascript.app/srt-to-text) |
| Untimed TXT | Draft SRT / VTT | [TXT to SRT](https://instascript.app/txt-to-srt) |

## 1. Choose by input and output

Use [VTT/SBV to SRT](https://instascript.app/vtt-to-srt) for a SubRip destination; [SRT to VTT](https://instascript.app/srt-to-vtt) for WebVTT; [ASS/SSA to SRT](https://instascript.app/ass-to-srt) for plain cues from styled dialogue; [SRT/VTT to TXT](https://instascript.app/srt-to-text) for a reading copy. Untimed [TXT to SRT/VTT](https://instascript.app/txt-to-srt) creates an estimated draft timeline, not forced alignment.

**Check:** Both source and destination match the selected tool.

## 2. Compare one cue in each representation

Invented source: 00:00:01,250 → 00:00:03,000, “Keep the blue folder.” SRT to VTT represents the same boundary with periods and a WEBVTT header. TXT keeps the words but removes the range. Rebuilding subtitles from that TXT cannot recover the original timing.

**Check:** Timing, line breaks and styling are checked separately from the words.

## 3. Validate the whole artifact in its destination

The SRT to VTT tool rejects an invalid numbered block rather than silently exporting a partial file; adjacent overlaps produce a warning. Some other routes keep usable cues, so inspect omitted material. Compare cue count, first/final range and key passages in the target player. Converting does not repair an offset or progressive drift; use [Subtitle Editor](https://instascript.app/subtitle-editor) to edit timing.

**Check:** Keep the original, immediate conversion and reviewed version as separate files.

## More questions and limits

### What processing and privacy boundaries apply?

The linked subtitle tools read, convert and export locally without uploading subtitle contents or imposing a speech-language limit. No cloud project is saved. They do not transcribe audio or automatically translate; save your work before closing the tab.

### Where should I continue?

[Open the matching tool](https://instascript.app/srt-to-vtt) and follow its current input requirements. Keep the original, review your result and download it before closing the tab.
