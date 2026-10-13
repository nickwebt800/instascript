# SRT to VTT: Validate Subtitles for a Web Player

> To convert SRT to VTT, open one local SRT file or paste its numbered cues, select **Convert to WebVTT**, then copy or download the `.vtt` result. No upload or account is required.

Canonical: <https://instascript.app/srt-to-vtt>

## A complete conversion, not a renamed extension

The [SRT to VTT converter](https://instascript.app/srt-to-vtt) requires numbered SRT blocks with `HH:MM:SS,mmm --> HH:MM:SS,mmm` timing, a blank line between blocks, and nonempty text. It checks every block before producing output. A malformed block, empty cue, invalid minute/second field or end at or before the start blocks the entire conversion; it does not silently export only the valid cues.

Input is one UTF-8 SRT file under 8 MB and 2 million characters, or pasted SRT under 2 million characters; output supports 1–10,000 cues. Editing the source hides the previous result until you convert again. WebVTT output is read-only so copied text and the downloaded file remain identical.

## Inspect the artifact

Original example SRT:

```srt
1
00:00:01,250 --> 00:00:03,500
Check the first cue.
Keep this line break.

2
00:00:04,000 --> 00:00:05,750
Check the final cue.
```

Converted WebVTT:

```vtt
WEBVTT

00:00:01.250 --> 00:00:03.500
Check the first cue.
Keep this line break.

00:00:04.000 --> 00:00:05.750
Check the final cue.
```

SRT to WebVTT conversion adds the `WEBVTT` header, removes numeric cue identifiers and changes timestamp commas to periods. It keeps cue order, millisecond timing and text line breaks. Leading/trailing text whitespace is normalized; source markup is removed. Literal ampersands and angle brackets are escaped for WebVTT. Source entities are treated as literal text. Font, color, positioning and other styling are not transferred.

## A web-player handoff checklist

After you convert SRT to VTT, check the cue count against the source, then inspect the first and final time ranges. This catches an incomplete source before you attach it to a longer recording. Overlapping adjacent cues produce a review warning and keep their original times. Out-of-order start times block conversion until you correct the source. Conversion does not repair synchronization.

For a video you host, a track can point to the downloaded file:

```html
<video controls src="recording.mp4">
  <track kind="subtitles" src="converted-subtitles.vtt"
    srclang="en" label="English" default>
</video>
```

Use the language code and label that match your actual subtitles. Serve the file as UTF-8 with `Content-Type: text/vtt`. Begin with video and subtitles on the same origin; cross-origin tracks need an appropriate CORS configuration. A file that downloads successfully can still fail to load in a player when its URL, content type or access policy is wrong. Enable the player's subtitle track and check a cue near the beginning, middle and end against the recording. See the [WebVTT specification](https://www.w3.org/TR/webvtt1/) for the file format and browser track behavior.

## Choose the right next step

If the subtitles drift progressively, use [Subtitle Editor](https://instascript.app/subtitle-editor) to correct timing. If you need the reverse format change or SBV input, use [VTT to SRT](https://instascript.app/vtt-to-srt). To write target-language cue text while keeping the source times, use the manual [Subtitle Translator](https://instascript.app/subtitle-translator).

## Privacy and limits

Reading, validation and export run locally in this tab. Subtitle text and filenames are not uploaded or saved as a server project. The page itself and its static assets are requested from the host; copying or sharing your export is your choice. See the [privacy policy](https://instascript.app/privacy).

No speech model is downloaded. This is format conversion, with no audio transcription, automatic translation, timing generation, video rendering or burned-in captions. Existing subtitle text can be in any language; that does not change the English-only speech recognition on the separate transcription tools. Conversion speed has not been benchmarked and the historical speech-model timings do not measure this converter.

## FAQ

### Is changing .srt to .vtt enough?

No. WebVTT needs its header and timestamp syntax. Use the converter and review the artifact.

### Will this synchronize late subtitles?

No. Cue times are retained. Correct offsets in Subtitle Editor, then convert the corrected SRT.

### Can I upload VTT or SBV here?

This page accepts numbered SRT only. The general VTT to SRT tool accepts VTT, SRT and SBV.
