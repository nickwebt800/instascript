# ASS to SRT Converter: Convert ASS and SSA Subtitles in Your Browser

> Convert one ASS or SSA subtitle file into reviewable SRT cues locally. Timing and dialogue text are retained; ASS styling is removed because SRT cannot represent it.

Canonical: <https://instascript.app/ass-to-srt>

## The direct answer

Open [ASS to SRT Converter](https://instascript.app/ass-to-srt), choose a local `.ass` or `.ssa` file, or paste its text, then click **Convert to SRT**. The page reads the `[Events]` section, finds each `Dialogue:` row, and writes numbered SRT cues with `HH:MM:SS,mmm` timecodes. Review the result, copy it, or download `converted-subtitles.srt`.

Everything happens in the browser. Subtitle text is not uploaded or stored.

## What the converter maps

ASS/SSA dialogue rows can contain layer, style, margins, effect and other columns. The converter follows the file's `Format:` line to locate `Start`, `End` and `Text`. It preserves cue order and valid time ranges, converts `\\N` and `\\n` to line breaks, and changes `\\h` to a regular space.

ASS override blocks such as `{\\an8}` are removed from the caption text. Fonts, colors, karaoke timing, positioning and other visual styles cannot be represented by SRT, so they are intentionally not recreated.

## Local limits

- One local ASS or SSA file at a time.
- The file must contain an `[Events]` section with a usable `Format:` and `Dialogue:` rows.
- The tool does not transcribe audio, preview video, merge files, or upload subtitle text.
- For cue-by-cue corrections after conversion, use the [Subtitle Editor](https://instascript.app/subtitle-editor).

## FAQ

### Does this support SSA?

Yes. SSA and ASS use the same event-row shape for the fields needed here.

### Are styles preserved?

No. SRT has no style or positioning model. The converter strips inline override tags and keeps readable dialogue plus timing.

### What if the file has no Format line?

The converter does not guess a custom column order. Add a valid `[Events]` `Format:` line or use a subtitle editor that can inspect the source first.

### Can I edit the result?

Yes. The result textarea is editable before copying or downloading. You can also open the SRT in the [Subtitle Editor](https://instascript.app/subtitle-editor).

## More subtitle tools

- [VTT to SRT Converter](https://instascript.app/vtt-to-srt) — convert VTT, SRT or SBV subtitles.
- [TXT to SRT Converter](https://instascript.app/txt-to-srt) — build timed subtitles from plain text.
- [Subtitle Editor](https://instascript.app/subtitle-editor) — edit cue timing and caption text.
