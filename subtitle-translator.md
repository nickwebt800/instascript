# Subtitle Translator: Edit SRT Cues Locally

> Manually translate subtitle wording while preserving SRT or VTT timing in your browser.

Canonical: <https://instascript.app/subtitle-translator>

## The direct answer

Open the [Subtitle Translator](https://instascript.app/subtitle-translator), choose one local SRT or VTT file, and type the target-language wording in each cue. Download the result as an SRT with the original start and end times.

This is a local translation editor. It does not call an automatic translation service, transcribe audio, or upload subtitle text.

Need help with unchanged words or subtitle timing? Follow the [illustrated SRT translation guide](https://instascript.app/translate-srt).

## What stays the same

The cue timecodes stay attached to their original text. Only the editable wording changes. The exported file is an SRT that you can check in a subtitle player or the [Subtitle Editor](https://instascript.app/subtitle-editor).

```srt
1
00:00:00,000 --> 00:00:03,000
Translated cue text goes here

2
00:00:03,000 --> 00:00:06,000
Keep each line easy to read
```

## Review before publishing

- Check names, numbers, URLs, punctuation, and line breaks against the source.
- Shorten a translation when its reading speed is too high for the cue duration.
- Keep the source recording beside the SRT for a final timing check.
- Use the [Instagram Transcript](https://instascript.app/) tool first when you need speech recognition from a permitted recording.

## FAQ

### Does it translate automatically?

No. You enter the target-language text locally, so each wording change is reviewable and the subtitle text stays in the browser.

### Can I translate an SRT to another language?

Yes. Open the SRT, replace each cue's wording, and download a translated SRT with the original timing.

### Can I use a VTT file?

Yes. VTT cues are read locally and exported as SRT. VTT timecodes are converted to SRT HH:MM:SS,mmm format. VTT positioning settings, style blocks and cue tags are not retained. Invalid timecodes, end times at or before the start, and empty cues must be corrected before export. Valid overlapping cues keep their original timing.

Use subtitle text under 2 million characters and up to 10,000 cues. Invalid timing and empty source cues must be corrected before opening the file.
