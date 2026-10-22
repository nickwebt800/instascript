# TXT to SRT Converter | Free Browser Subtitle Tool | InstaScript

> Convert TXT, SRT or VTT text into editable SRT and VTT subtitles in your browser. No upload, no account.

Canonical: <https://instascript.app/txt-to-srt>

[Open the tool](https://instascript.app/txt-to-srt)

## Build subtitles from text, one step at a time

Use this TXT to SRT converter when you already have the words and need an editable subtitle draft. Keep the tool above open while you follow the steps. Text timing is estimated from your settings; it is not matched to speech.

Download the [three-line practice TXT](https://instascript.app/assets/tutorials/txt-to-srt/practice.txt). It is original teaching text, not a transcript. With the default settings it creates three cues, starting at 0.000, 3.100 and 6.200 seconds. These times illustrate the calculation, not synchronization with a recording.

## 1. How do I choose between plain text and existing timestamps?

Open one UTF-8 TXT, SRT or VTT file with **Open TXT / SRT / VTT**, or paste its text. Use **Plain text timing** for words without timecodes. Use **Existing timestamps** for SRT or VTT time ranges. Opening an SRT or VTT file selects that mode automatically; when pasting, choose it yourself.


Plain text mode removes common leading numbers such as `1.` or `2)`. It does not recognize an audio track. Keep an original copy before editing an existing subtitle file.

![The two input modes above the practice text: use plain text timing for TXT, existing timestamps for SRT or VTT.](https://instascript.app/assets/tutorials/txt-to-srt/01-mode-wide.svg)

Opening a file fills the text box. Generate timeline is a separate action.

**Check:** The text box contains your words and the intended mode is selected.

## 2. Which timing settings should I change first?

Start with **Start time**, **Default duration (s)** and **Gap between entries (s)**. With the practice text, the defaults place cue 1 at `00:00:00,000 → 00:00:03,000` and cue 2 at `00:00:03,100 → 00:00:06,100`. A gap adds silence between successive draft cues.


The reading-speed setting can lengthen a cue, but duration is still bounded by **Shortest duration** and **Longest duration**. A maximum can cap a long cue before it reaches the requested reading time. **Split mode** chooses lines or sentences; **Max characters per line** splits longer text into separate cues, including long unbroken words. These are draft rules, not an accessibility or synchronization guarantee.

![Default duration is three seconds and the entry gap is 0.1 seconds; the first generated cue starts at zero and ends at three seconds.](https://instascript.app/assets/tutorials/txt-to-srt/02-timing-wide.svg)

The example times come from the practice text with default settings. They do not measure speech.

**Check:** Use positive duration values and compare the resulting cues with the recording.

## 3. How do I generate the timeline and check the result?

Choose **Generate timeline**. The editor opens below the settings, with one row per generated cue. For the practice TXT at default settings, expect three rows. Check the words, cue count and first and last timecodes before making edits.


Changing a setting alone does not rebuild the rows. Choosing Generate timeline again rebuilds them from the source box and replaces row edits. For example, changing the default duration from `3` to `4` makes the second practice cue start at `00:00:04,100` after regeneration. Save useful edits before rebuilding.

![Generate timeline produces the status message 3 entries ready to edit.](https://instascript.app/assets/tutorials/txt-to-srt/03-generate-wide.svg)

The status confirms that rows were created. It does not confirm alignment or subtitle quality.

**Check:** The expected rows appear; your changed settings affect a newly generated timeline.

## 4. How do I fix words or timing before downloading?

Edit a row’s **Caption**, **Start** or **End**. For this example, change “Open the garden gate.” to “Open the blue garden gate.” Text edits do not automatically lengthen that row. Set End later than Start and check whether the words fit.


**Add entry** appends a row; fill in its words and review its times. **Remove** deletes its row. This converter does not provide the stricter invalid-cue export blocking used by [Subtitle Editor](https://instascript.app/subtitle-editor): malformed time input can become zero, and empty or reversed cues need manual checking. Download a draft and open it in Subtitle Editor for stricter validation and optional local recording playback.

![The caption is edited to Open the blue garden gate; start and end times must be checked separately.](https://instascript.app/assets/tutorials/txt-to-srt/04-edit-wide.svg)

This is a deliberate wording change in the practice draft, not a speech-recognition correction.

**Check:** No blank captions, reversed times or accidental zero-length cues remain.

## 5. How do I save SRT or VTT and check what was downloaded?

Choose **Download SRT** or **Download VTT** for your destination player. **Copy SRT** copies subtitle syntax including timecodes. The downloads contain the current row edits. Reopen your saved file, use Existing timestamps, and generate its rows to verify the wording and boundaries.


SRT numbers each cue and uses comma-separated milliseconds. VTT starts with `WEBVTT` and uses periods. This tool rewrites cue text and timing; it is not a lossless preservation tool for VTT styling or positioning. Keep a separate original. Download before closing the tab; there is no project history or cloud save.

![Copy SRT, Download SRT and Download VTT controls alongside the actual edited SRT excerpt.](https://instascript.app/assets/tutorials/txt-to-srt/05-save-wide.svg)

This download was made after setting the duration to four seconds and editing the first caption.

**Check:** Your downloaded file contains the latest edit and the expected timecodes.

## More questions and common problems

### Why do my subtitles not match the speech?

TXT contains no speech timing. The generated timeline is an estimate. Open the SRT with your recording in [Subtitle Editor](https://instascript.app/subtitle-editor), compare the beginning, middle and end, and adjust cues. This page does not listen or perform forced alignment.

### Why did my edits disappear after changing settings?

Generate timeline rebuilds rows from the source text. Save the current draft first; change the source box too if you want a wording correction to survive regeneration.

### Why are there no rows after I paste an SRT?

Select Existing timestamps and confirm that the source contains recognizable time ranges with `-->` and caption text. A file extension alone does not make plain text into timed subtitles.

### Does existing-timestamps mode preserve every time exactly?

It reads usable SRT/VTT ranges, but invalid or non-positive end ranges can receive a default-duration fallback, and malformed times can become zero. Review imported times. Use [Subtitle Editor](https://instascript.app/subtitle-editor) if you need invalid source timings rejected before editing.

### Are my files uploaded, and can I use another language?

Parsing, editing and export stay in this browser, without an account or saved history. You supply the words; the converter does not translate or run language detection. For English speech without text, use [Video to Text](https://instascript.app/video-to-text) first.

InstaScript is an independent project and is not affiliated with the platforms or model providers mentioned.
