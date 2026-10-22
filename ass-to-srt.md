# ASS to SRT Converter | Convert ASS and SSA Subtitles | InstaScript

> Convert ASS or SSA subtitle files to clean SRT subtitles in your browser. Preserve cue timing, unwrap line breaks and review the result locally.

Canonical: <https://instascript.app/ass-to-srt>

[Open the tool](https://instascript.app/ass-to-srt)

## Convert ASS to SRT and inspect what survives

Convert one ASS or SSA text file into SRT dialogue cues in the browser. Start with a copy: ASS fonts, placement, effects and other presentation features do not transfer through this converter.

Use the [two-cue practice ASS](https://instascript.app/assets/tutorials/ass-to-srt/practice.ass). It contains original teaching text, an inline positioning override, a line-break marker and a comma in the second caption. The examples below show actual conversion and an edited download.

## 1. How do I start an ASS to SRT conversion?

Choose **Open ASS / SSA** and select one local text file, or paste its contents. Choosing a file fills the source box. Then choose **Convert to SRT** to build the result. The practice file produces two cues.


The parser reads Dialogue rows inside `[Events]`. A Format line identifies Start, End and Text columns; a missing Format line uses the default column positions. For custom layouts, inspect the declaration and keep Text as the final field. Preserve the full original so you can investigate any omitted lines.

![Open ASS or SSA, Convert to SRT, and the actual 2 cues ready to review summary.](https://instascript.app/assets/tutorials/ass-to-srt/01-open-wide.svg)

File selection and conversion are separate actions. Compare the cue count with usable dialogue in your source.

**Check:** The selected source is readable, and conversion reports the expected cue count.

## 2. What is preserved, and what disappears from ASS subtitles?

The converter writes numbered SRT cues from usable dialogue, retaining source order and parsed time ranges. The practice interval `0:00:01.20 → 0:00:03.40` becomes `00:00:01,200 → 00:00:03,400`. ASS line-break markers become real line breaks, and the comma in the second caption remains part of its text.


Inline brace override blocks are stripped. Fonts, colors, positioning and karaoke effects are not recreated. This parser is intended for dialogue text; inspect complex effects, vector drawing commands and unusual event layouts in an ASS-aware editor. A result alone does not confirm a faithful visual conversion. Invalid, empty or non-positive-duration dialogue can be skipped without a per-line warning.

![Actual SRT result containing numbered dialogue, millisecond timecodes and a line break, with notes on stripped ASS overrides.](https://instascript.app/assets/tutorials/ass-to-srt/02-review-wide.svg)

The practice positioning override was removed; its dialogue and line break remain. Complex ASS drawing and effects need separate review.

**Check:** Compare cue count, first and last times, line breaks and any effect-heavy lines.

## 3. How do I save a corrected SRT file?

The SRT result box is editable. Correct words or syntax there, then choose **Copy SRT** or **Download SRT**. The example changes “Open the gate.” to “Open the blue gate.” and verifies that edit in the actual download. Converting again rebuilds the result from the source and replaces result-box edits.


Result-box edits are not revalidated before export. Keep cue numbers, separators and valid time ranges intact. Reopen the download in [Subtitle Editor](https://instascript.app/subtitle-editor) for stricter cue checks and optional local recording review, then test the file in your destination player. Conversion does not burn captions into a video.

![Copy SRT and Download SRT controls with the actual saved first cue edited to Open the blue gate.](https://instascript.app/assets/tutorials/ass-to-srt/03-save-wide.svg)

The downloaded file and clipboard text were checked after the wording edit.

**Check:** Open the saved file and confirm both your latest correction and intact subtitle structure.

## More questions and common problems

### Why does the converter find no usable Dialogue cues?

Check for an Events section, recognizable Dialogue rows and usable Start/End/Text fields. If every row is unusable, the page hides the result and reports an error. It does not repair those rows. With a mixture of valid and invalid rows it can output only the valid ones, so compare the count even after success.

### Does conversion support SSA and custom event layouts?

SSA can use the same dialogue structure. A Format declaration can locate Start and End in a custom layout; Text should be the final field because text may contain commas. Without a Format declaration, default positions are used. A successful conversion is not proof that a custom layout was read correctly.

### Should I keep ASS if styling matters?

Keep the original ASS or SSA whenever you need its styles, layout or effects. This converter exports dialogue as SRT. Use an editor and destination player that support your original format when appearance must be retained.

### Are these files uploaded or saved as projects?

No. One local file or pasted source is processed in the browser. Copy and download use the current result box. There is no account history, batch conversion, audio transcription or video preview. See the [privacy policy](https://instascript.app/privacy).
