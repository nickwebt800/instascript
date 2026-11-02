# VTT to SRT Converter | SRT, VTT and SBV | InstaScript

> Convert VTT to SRT, SRT to VTT, or SBV subtitles in your browser. Paste text or open one local file with no upload or account.

Canonical: <https://instascript.app/vtt-to-srt>

[Open the tool](https://instascript.app/vtt-to-srt)

## Convert VTT to SRT in three checked steps

Read one local VTT, SRT or SBV source and export SRT or WebVTT. Use this page for a format change; compare the actual converted cues before replacing an original subtitle file.

Download the [two-cue practice VTT](https://instascript.app/assets/tutorials/vtt-to-srt/practice.vtt) or the [matching SBV](https://instascript.app/assets/tutorials/vtt-to-srt/practice.sbv). Both contain original teaching text. The first cue runs from 1.200 to 3.400 seconds; conversion should retain that interval.

## 1. How do I convert VTT to SRT, or SRT to VTT?

Choose **Open VTT / SRT / SBV**, or paste subtitle text. For VTT to SRT, select **SRT** under **Output format**, then choose **Convert subtitle**. For SRT to WebVTT, open SRT and select VTT. SBV can be used as the source for either output.


The output selector chooses the destination format; it does not describe the source file. Selecting a source file fills the text box but does not convert it. Keep an untouched original, especially if it contains styling, positioning or other metadata.

![Open VTT, SRT or SBV, Convert subtitle, and the Output format selector set to SRT.](https://instascript.app/assets/tutorials/vtt-to-srt/01-format-wide.svg)

Opening the practice VTT fills the source. The output is produced only when Convert subtitle is chosen.

**Check:** Your source text is present and the desired destination format is selected.

## 2. How do I check the SRT or WebVTT result?

Compare the reported cue count, words, line breaks and time ranges. The practice VTT has two cues; its first SRT range is `00:00:01,200 → 00:00:03,400`. SRT has sequence numbers and comma milliseconds. WebVTT starts with `WEBVTT` and uses periods.


This page changes subtitle syntax; it does not correct timing drift or measure speech. Unusable or empty cues are reported by source line. Mixed input is labeled as a partial result; if no usable cues remain, export stays disabled. VTT header metadata, NOTE/STYLE/REGION blocks, cue identifiers and positioning settings are omitted and counted. Caption markup and entities remain literal source text; rendering may differ across players. SRT numbering is regenerated. Keep the original and inspect it in a VTT-aware editor.

![Actual two-cue conversion summary and downloaded SRT first cue showing the 1.200 to 3.400 second range.](https://instascript.app/assets/tutorials/vtt-to-srt/02-review-wide.svg)

This excerpt comes from an actual download. Compare additional cues in your own file; success does not guarantee none were omitted.

**Check:** The converted count and cue boundaries match the source lines you intend to keep.

## 3. Can I edit the result before downloading?

Yes. Edit the result text, then choose **Copy result** or **Download result**. Both use the current result box. Copy and Download validate and use the same current result text. Manual edits are labeled separately from initial-source counts; invalid timing syntax, empty captions or invalid ranges block export. Rebuilding, clearing, opening another file or switching output format asks before replacing manual result edits. Source edits invalidate the old result immediately; format changes require conversion again. A newer file selection or source edit cancels an older file read.


Manual result edits are validated before Copy and Download. Reopen the saved file in [Subtitle Editor](https://instascript.app/subtitle-editor) to check cue structure and timing, then test it with the intended player. For a strict SRT-input workflow, the separate [SRT to VTT](https://instascript.app/srt-to-vtt) page provides another route. Save before closing; there is no stored project.

![Copy result and Download result controls, and Output format changed to VTT, which regenerates the output from parsed source cues.](https://instascript.app/assets/tutorials/vtt-to-srt/03-save-wide.svg)

Earlier illustration: the current version asks before replacing manual edits when changing format, then requires conversion again.

**Check:** Choose your final format before editing and confirm the saved file has your latest words.

## More questions and common problems

### Why did the cue count shrink?

The converter can skip entries with unusable or non-positive time ranges or empty text. Compare the source and result, repair a copy and convert again. The converter does not supply missing speech or invent a missing valid range.

### Why does conversion fail after I paste text?

Plain prose without subtitle ranges is not timed subtitle input. Check the displayed error and provide VTT, SRT or SBV. If you only have words, [TXT to SRT](https://instascript.app/txt-to-srt) creates an estimated draft for manual timing review.

### Will converting repair late subtitles or preserve every VTT feature?

No timing alignment is performed, and this is not a lossless VTT metadata editor. Use [Subtitle Editor](https://instascript.app/subtitle-editor) to review cue text and timing, and keep the original for styles, regions and player-specific presentation.

### Can I convert several files without an upload?

Conversion is local, with one source at a time. The page does not batch or merge files, store projects, call a speech model or upload subtitle contents. See the [privacy policy](https://instascript.app/privacy).


## Conversion diagnostics and current exports

The initial-source summary separates candidate cues, usable cues, skipped records, unrecognized content and omitted metadata. Unrecognized content means the complete source cue count is unknown. Source notices identify original lines without repeating caption text. Partial results require the omission acknowledgment before Copy or Download. Files must be UTF-8 under 8 MB; source text is limited to 2 million characters and 10,000 candidates. All subtitle languages are accepted; no recognition or translation runs. Copy and Download validate and use the same current result text. Manual edits are labeled separately from initial-source counts; invalid timing syntax, empty captions or invalid ranges block export. Rebuilding, clearing, opening another file or switching output format asks before replacing manual result edits. Source edits invalidate the old result immediately; format changes require conversion again. A newer file selection or source edit cancels an older file read.
