# Subtitle Converter: Choose What to Keep | InstaScript

> Choose a local subtitle converter for SRT, VTT, ASS or TXT. Check which timing, text and styling survive before importing the converted file.

Canonical: <https://instascript.app/subtitle-converter>

To convert subtitles, choose the output your destination accepts: [VTT to SRT](https://instascript.app/vtt-to-srt) for a SubRip track, [SRT to VTT](https://instascript.app/srt-to-vtt) for a web player, or [SRT/VTT to TXT](https://instascript.app/srt-to-text) for reading. Open or paste your file in the linked tool, convert, review, and download locally.

This **subtitle converter** guide helps you choose among InstaScript's existing tools. Conversion changes a file's representation; it does not fix speech errors, translate words, or synchronize subtitles to a different video.

[Choose your conversion](https://instascript.app/subtitle-converter#conversion-routes)

## Choose by source and destination

Start with both file types. An SRT converter is useful only if its supported input and output match your next step. Keep your original before changing anything.

- **VTT or SBV to SRT:** use [VTT to SRT](https://instascript.app/vtt-to-srt). Select SRT as the output and inspect the returned cue text and times.

- **SRT to VTT:** use [SRT to VTT](https://instascript.app/srt-to-vtt). It checks every numbered cue, removes source tags, and warns about adjacent overlaps. Local SRT files must be under 8 MB.

- **ASS or SSA to SRT:** use [ASS to SRT](https://instascript.app/ass-to-srt). Dialogue text and usable times become plain SRT cues; positioning, fonts and animation do not carry over.

- **SRT or VTT to TXT:** use [SRT to Text](https://instascript.app/srt-to-text). Timing, cue numbers and markup are removed. TXT cannot function as a timed subtitle track.

- **Untimed TXT to SRT or VTT:** use [TXT to SRT](https://instascript.app/txt-to-srt). Its generated timeline is an estimated draft to edit manually, not alignment to a recording.
These routes process subtitle text, without a speech-language restriction. They do not extract embedded subtitles from a video container or read image-based subtitle tracks. If you only need to change words or cue times, open [Subtitle Editor](https://instascript.app/subtitle-editor) instead.

## Make a preservation checklist before converting

Write down the parts you need to keep: dialogue, cue boundaries, line breaks, speaker labels and visual placement. Then mark which are essential to your use. This small checklist makes a conversion decision inspectable instead of treating a successful download as proof that everything survived.

**For reading notes,** dialogue and cue order may be enough. Losing timing can be intentional. A speaker's name written in the dialogue can remain useful, while a speaker identified only by a color may become impossible to distinguish after styling is removed.

**For a subtitle track,** keep start times, end times and meaningful line breaks as well as the words. Two captions can contain identical text yet behave differently if one stays visible through a pause. Compare boundaries against the original file before comparing the picture.

**For styled captions,** decide whether position carries meaning. An upper-screen label may identify a different speaker from dialogue at the bottom. Flattening both to plain cues may lose that relationship. Keep the styled source and use a destination that supports it if plain subtitles cannot express the distinction.

## Worked example: the same words can lose their timing

This invented example illustrates conversion choices. It is not taken from a video, a channel, or a measured transcription result.

```text
1
00:00:01,250 --> 00:00:03,000
Keep the blue folder.

2
00:00:04,500 --> 00:00:06,000
Archive the spare copy.
```

A timed SRT-to-VTT conversion should represent the first boundary as `00:00:01.250 --> 00:00:03.000`, with a WEBVTT header in the file. The punctuation changes; the intended start and end do not. Check the second cue too, rather than judging only the header or extension.

A TXT export contains the two instructions without those ranges. Converting that TXT back to timed subtitles cannot recover the original 1.500-second pause between cues. A draft generator may assign a different schedule because the missing timing is no longer present in its input.

For that reason, use the timed original when you need a different timed format. Keep TXT as a reading copy. If you have already edited the TXT, compare those word changes against the original cues in the editor instead of assuming a new draft timeline reproduces the old one.

## Check one cue, then the whole file

Choose a cue containing a number, a line break or a literal speaker label. Compare its source and output side by side. Check that the number has not changed, the line break still makes sense and the start and end match when timing is meant to survive. Then repeat at the beginning, middle and end.

Next compare the cue counts and the final timestamp. A lower count can mean an empty or invalid cue was skipped. Some existing conversion routes keep usable cues rather than rejecting every malformed block. Review omitted material before accepting the result; the presence of output is not a complete validation certificate.

Finally import the result into the destination player or editor and turn on its subtitle track. Check the same passages against playback. If all are displaced equally, investigate an offset; if displacement grows, investigate a mismatched source edit. A format change alone does not repair either problem.

Keep three separate files when you make corrections: the original, the immediate conversion, and the reviewed export. That lets you locate whether a problem came from the source, the conversion, or a later edit, without relying on a browser tab as your only copy.

## When to stop and use another workflow

If your input contains only prose, choose the TXT timing draft route. If it contains audio or video rather than subtitle text, the separate [Video to Text](https://instascript.app/video-to-text) workflow recognizes browser-decodable English speech from local media up to 100 MB. It requires model loading and language checks.

If the file uses a format outside the routes above, do not simply rename its extension. These tools do not offer every subtitle format or create missing words from an image. For translation, [Subtitle Translator](https://instascript.app/subtitle-translator) is a manual target-text editor; it does not automatically translate the file.

## Local files and privacy

Files opened in these subtitle converters and edits made in Subtitle Editor stay in your browser. Copy and download produce local output without uploading the subtitle contents. There is no account history or saved cloud project; download your work before closing the tab.

Public Instagram and YouTube lookup are separate server-assisted workflows. Following a source link contacts its destination. See the [privacy policy](https://instascript.app/privacy) for those service boundaries.

## Begin with the format you need

Use the [conversion routes above](https://instascript.app/subtitle-converter#conversion-routes) to open the matching tool. For common web-player delivery, start with [SRT to VTT](https://instascript.app/srt-to-vtt); for a plain reading copy, use [SRT to Text](https://instascript.app/srt-to-text). Review the downloaded file in its intended destination before replacing your original.
