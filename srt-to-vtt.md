# SRT to VTT

> Convert SRT to VTT locally. Validate every cue, preserve timing, download WebVTT, and check your subtitle file before attaching it to a web player.

Canonical: <https://instascript.app/srt-to-vtt>

[Open the tool](https://instascript.app/srt-to-vtt)

## Validate the whole SRT before converting

Open one UTF-8 SRT file under 8 MB and 2 million characters, or paste under 2 million characters. The converter validates 1–10,000 numbered cues, then produces a read-only WebVTT result locally.

Use the [invented practice SRT](https://instascript.app/assets/tutorials/srt-to-vtt/practice.srt). Its text is fictional and the illustrated WebVTT was downloaded from this converter.

## 1. What must each SRT block contain?

Each block needs a numeric identifier, a range in HH:MM:SS,mmm --> HH:MM:SS,mmm form, and nonempty text. Separate blocks with a blank line. The end must be after the start and cue starts must be chronological. Multiline text is allowed. An invalid block stops the whole conversion; it does not silently discard a bad cue.

![What must each SRT block contain? Actual converter interface using the invented practice SRT; source changes require conversion again.](https://instascript.app/assets/tutorials/srt-to-vtt/01-source-wide.svg)

Actual converter interface using the invented practice SRT; source changes require conversion again.

**Check:** Every source block is complete, including the last one.

## 2. How do I fix an error without exporting stale text?

Read the error, correct the SRT source and press Convert to WebVTT again. Source changes hide and clear the previous result. Adjacent overlaps produce a review warning and retain their times; out-of-order starts, empty text and zero-length ranges block conversion. Use [Subtitle Editor](https://instascript.app/subtitle-editor) if the original needs timing changes.

![How do I fix an error without exporting stale text? Actual converter interface using the invented practice SRT; source changes require conversion again.](https://instascript.app/assets/tutorials/srt-to-vtt/02-fix-wide.svg)

Actual converter interface using the invented practice SRT; source changes require conversion again.

**Check:** The current source validates as a whole; overlap warnings have been reviewed.

## 3. What should I check in the downloaded VTT?

The result is read-only. Copy WebVTT and Download VTT use that result. Conversion adds WEBVTT, removes numeric cue identifiers and replaces timestamp commas with periods. It retains valid ranges, order and text line breaks, normalizes outer whitespace and removes source tags. Ampersands and angle brackets are escaped; source entities are treated as literal text. Font, color, position and animation are not transferred.

![What should I check in the downloaded VTT? Actual converter interface using the invented practice SRT; source changes require conversion again.](https://instascript.app/assets/tutorials/srt-to-vtt/03-save-wide.svg)

Actual converter interface using the invented practice SRT; source changes require conversion again.

**Check:** The downloaded file has the header, expected cue count, matching ranges and intended words.

## More questions and limits

### Will conversion synchronize a different video?

No. The original times are retained. Preview beginning, middle and final cues with the exact destination recording. Offsets and progressive drift need review, not just another extension.

### How do I use WebVTT in a web player?

For a video you host, point a subtitle track at the actual VTT URL, use a matching language label, and serve UTF-8 with Content-Type: text/vtt. Start on the same origin; cross-origin tracks need an appropriate CORS configuration. Enable the subtitle track and test playback. See the [WebVTT specification](https://www.w3.org/TR/webvtt1/).

### Is this speech recognition or automatic translation?

No. This page converts existing subtitle text in any language without loading a speech model. It does not generate timing, translate words or render burned-in captions. For VTT/SRT/SBV input and SRT output, use [VTT to SRT](https://instascript.app/vtt-to-srt).

### What leaves this tab?

Subtitle contents, file reading, conversion and downloads stay local. The page and static resources are requested from the host. There is no account history or saved cloud project; download your work before closing the tab.
