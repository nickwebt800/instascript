# Translate SRT: Review Meaning Without Losing Timing | InstaScript

> Translate SRT wording manually while preserving cue times. Use a local editor, check meaning across cue boundaries, and inspect the exported subtitle file.

Canonical: <https://instascript.app/translate-srt>

To **translate SRT**, open a local subtitle file in the [Subtitle Translator](https://instascript.app/subtitle-translator), replace the wording in each cue with your own translation, and download SRT with the original start and end times. This is a manual workflow: InstaScript does not generate translations automatically.

[Open the manual SRT editor](https://instascript.app/subtitle-translator)

## Start with a timed source

Keep an untouched copy of the source SRT. Open one SRT or VTT file in the [local translation editor](https://instascript.app/subtitle-translator). Each row shows the source text, its timing and an editable Translation field. Replace the field with wording you have written or reviewed.

Subtitle text is not subject to the English-only speech-recognition restriction. You supply the target-language text; the editor does not detect a language or assess translation quality. If you only have a recording, create and check its English transcript first using the [audio workflow](https://instascript.app/audio-to-text). This guide begins with existing timed text.

The editor accepts subtitle text under 2 million characters and up to 10,000 cues. Invalid source timing and empty source cues must be corrected before import. It cannot open a movie, extract image subtitles, or translate a private video link.

## Review a meaning unit before editing a cue

A subtitle cue is a display interval, not necessarily a complete sentence. Read the cue before and after the one you are translating. Resolve what a pronoun refers to, whether a statement is negated and whether a condition finishes later. Then decide how to distribute the target wording across the available intervals.

Create a small review ledger beside your working copy. For each uncertain passage, note the cue number, the unresolved meaning and the evidence needed. Use a neutral label such as context needed, terminology check or playback check. The editor does not store this ledger; keep it in your own notes without adding reviewer comments to the subtitle text.

Separate a linguistic question from a timing question. An unfamiliar technical term needs a verified translation. A correct sentence that cannot be read during its display interval needs shortening or a timing review. Changing timecodes cannot repair a wrong meaning, and a fluent translation does not prove that the original cue boundaries were suitable.

Review repeated terms as a group. Choose one rendering for the same concept unless the context changes. Keep quantities, units, names and negative instructions consistent with the source. Do not normalize a questionable number merely because a different number sounds more plausible; flag it and consult the recording or an authorized reference.

## Worked example: the condition lives in the next cue

This English-only illustration is invented for this guide. It demonstrates a review problem, not an actual transcript, translation result or measured reading-speed standard.

```srt
1
00:00:02,000 --> 00:00:04,000
Keep the spare valve closed

2
00:00:04,000 --> 00:00:06,500
unless the pressure falls.
```

Read the two cues together: the instruction contains an exception. A version that drops “unless” changes the operational meaning even if each remaining sentence looks grammatical. Before writing the target text, put a note in the review ledger: preserve the closed state and its exception.

A target language may place the exception earlier in the sentence. That creates a boundary decision: can the meaning remain understandable while each translated cue stays in its original interval? Replay both cues together, including the transition. Do not judge the first cue solely as a line of isolated text.

If the wording cannot fit, shorten it without removing the condition, or use [Subtitle Editor](https://instascript.app/subtitle-editor) for a deliberate timing review. This translation editor preserves times; it does not redistribute words between cues automatically. Check any timing changes against the recording before publishing.

Use the same test for a correction, a contrast or a delayed subject. Ask what a viewer would understand at the end of the first cue, then what changes when the second appears. A subtitle can preserve all the words yet mislead temporarily if a critical exception arrives too late.

## Check every translation field before downloading

Translation fields initially contain the source wording. An untouched field therefore remains in the source language. If you clear a field or leave only whitespace, export falls back to that cue’s source text. A successful download is not confirmation that every cue has been translated.

Review the first cue, the last cue and every item in your ledger, then scan the entire file for unchanged source passages. Repeated words may legitimately remain the same, so inspect context rather than treating every exact match as a mistake. Keep private reviewer notes outside the export.

Choose **Download translated SRT** and retain the source separately. The editor exports one SRT; it does not create a side-by-side bilingual subtitle track, translate a batch, or burn captions into a video.

## Inspect the file in three passes

First check structure: compare the number of cues and the first and last start/end times with the source. Unchanged timecodes verify timing preservation, not linguistic correctness. Renumbering a sequence is different from losing a cue; compare the text and intervals as well as the displayed numbers.

Next check meaning: revisit every ledger item, all numbers and units, and each instruction containing a negative or condition. Read across adjacent cues. Ask a qualified target-language reviewer to resolve ambiguities you cannot verify rather than presenting an unchecked sentence as final.

Finally load the exported SRT with the intended recording in your destination player. Check line wrapping, character display, punctuation and whether a viewer has time to read before the next cue. Player presentation can differ from the editor. Reopen the downloaded file for corrections instead of assuming an earlier tab contains your latest version.

## VTT input and the privacy boundary

To translate a VTT file with this workflow, open it in the same editor and supply the target wording. Output is SRT: timecodes use HH:MM:SS,mmm. VTT positioning settings, style blocks and cue tags are not retained. Valid overlapping cues keep their timing; review them in the destination player.

Local subtitle parsing, edits and SRT generation happen in your browser. The subtitle content is not uploaded or sent to a translation service. Download your work before closing the tab; there is no account project or cloud translation history. See the [privacy policy](https://instascript.app/privacy).

When you are ready to translate an SRT file, [open the manual editor](https://instascript.app/subtitle-translator), keep the original beside it, and check the exported file before sharing it.
