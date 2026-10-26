# Quote Across Transcript Cues: Keep Each Source Span

Canonical: <https://instascript.app/qualitative-cross-cue-quotes>

In qualitative research transcription, a quotation can cross two cues. Keep its transcript version and an ordered list of the exact text spans selected from each cue. Use the cue intervals as a broad replay locator, then check the surrounding exchange. Joining text does not establish word-level timing, speaker identity or a continuous recording excerpt.

[Download the blank passage worksheet](/data/qualitative-cross-cue-quotes-worksheet.md)

## Why a cue boundary does not settle the quotation

A subtitle cue is a display and timing unit. Your analytical passage may start halfway through one cue and finish in the next. Keep those two decisions visible: which characters belong in the quotation, and which part of the recording you need to replay. A single start time cannot preserve both decisions.

[Mohammed, Knowles and Cummings describe timestamps as reference aids during analysis and writing](https://journals.sagepub.com/doi/full/10.1177/16094069231197332). Their audiovisual method separates time from other recorded dimensions. This guide borrows that limited distinction, not their complete analytical method. Our mapping below is an authored teaching exercise, not a validated research protocol.

## Our fictional exercise: a sentence crosses two cues

![Select only the quoted text](/assets/research-cross-cue/01-select-wide.svg)

C01 [19,26) and C02 [0,31), in FICT-T03 version v1. Fictional exercise; no recording.

All text, cue identifiers and times in this exercise are invented. There is no recording, participant, recognition run or human audio verification behind it. The source document is FICT-T03, version v1. The phrase about a bus is a practice sentence, not a research finding.

| Cue | Invented interval | Entire cue text |
| --- | --- | --- |
| C01 | 10.0 to 13.0 seconds | At first I waited. The bus |
| C02 | 13.4 to 17.0 seconds | arrived late, so I walked home. |
| C03 | 18.0 to 21.0 seconds | The next morning I tried again. |

Our target Q01 is **The bus arrived late, so I walked home.** It takes only the final seven characters of C01, followed by the whole text of C02. The opening sentence in C01 remains context; it is not part of Q01. We insert one display space between the two selected strings and record that join explicitly.

The C01 span is [19,26); the C02 span is [0,31). These are zero-based, end-exclusive JavaScript UTF-16 positions in this exact version, not universal word indexes. The source strings here are plain ASCII. If your text includes emoji or combining characters, do not casually transfer these offsets to an editor using another indexing system.

## Our mapping: text selection and replay range answer different questions

![Keep replay separate from selection](/assets/research-cross-cue/02-locate-wide.svg)

Invented cue bounds yield a broad 10-to-17-second envelope; the 0.4-second gap is unresolved. Fictional exercise; no recording.

The ordered map is FICT-T03 / v1 / C01 [19,26), then C02 [0,31). It reconstructs Q01 without including the initial context sentence. Store the selected strings beside the offsets so another reader can see what those numbers actually select. Keep the full original cues available for checking context.

The broad replay envelope is 10.0 to 17.0 seconds, because those are the outer cue bounds. It includes the unquoted opening of C01 and a 0.4-second interval between cues. We do not know what occurs in that interval: it could reflect speech, silence or segmentation. No word timing can be derived from it. There is no seven-second audio excerpt to download in this fictional exercise.

If you later listen to a real source and establish a narrower interval, record that as a separate reviewed locator with its own evidence. Do not overwrite the original cue boundaries merely to make them match the desired quotation. A convenient playback window is not proof that its endpoints coincide with the first and last quoted words.

## Our reproducible check: three failures stay visible

![Leave unresolved fields visible](/assets/research-cross-cue/03-check-wide.svg)

A version mismatch or skipped cue is rejected; a missing end leaves timing unavailable. Fictional exercise; no recording.

Download the [public example JSON](/data/qualitative-cross-cue-quotes-example.json) and the [standalone Node reproduction file](/data/qualitative-cross-cue-quotes-reproduce.cjs). Run the reproduction file with Node to print the example and actual check outcomes. It uses only the fictional strings embedded in the file, reads no research files and sends no requests.

The successful case reconstructs Q01, reports the broad 10.0-to-17.0 envelope and reports the 0.4-second inter-cue interval. A version v2 request against the v1 source is rejected. A candidate selecting C01 followed by C03 is also rejected by this deliberately limited contiguous-passage checker: C02 was skipped, so the candidate needs an explicit separate-excerpt treatment.

A third check removes C02's end time. Text reconstruction still succeeds, while the replay envelope becomes unavailable. The missing end is not borrowed from C03 or estimated from the number of characters. This is a useful handoff state: exact text can be retained while timing remains unresolved.

The script checks document identity, version, ordered adjacent cue selection, integer span bounds and available positive timing. Passing those checks establishes only internal consistency of the supplied fictional records. It does not check audio, publication permission, transcript accuracy or whether a quotation fairly represents the full conversation.

## Our worksheet: make the handoff inspectable

Use the [blank passage worksheet](/data/qualitative-cross-cue-quotes-worksheet.md) to record a passage ID, document ID, version, ordered cue IDs, offsets, selected text and joining rule. Keep a second field for the replay envelope, a field for unresolved inter-cue intervals and a context-review status. The template starts with context review pending; completing its text fields does not mark the audio checked.

For Q01, a reviewer can reproduce the exact characters and see why C01's first sentence was excluded. They can also see that 10.0-to-17.0 is a broad invented locator. If the document changes, retain this map with v1 and review a new map against the new version. Our earlier [transcript correction exercise](/qualitative-transcript-corrections) addresses locating quotations after revision; today's task is selecting one passage across existing cue boundaries.

If you deliberately shorten a passage by omitting intervening content, keep the separate source spans and follow your project's quotation convention. The adjacency rejection here is a reminder to review that editorial decision, not a claim that nonadjacent quotations are always invalid. Do not hide an omission by presenting the first cue's start and the last cue's end as a complete account of what was selected.

## Can InstaScript create this research map automatically?

No. This page provides a manual worksheet and a standalone fictional example. It adds no research coding, verified speaker attribution, word alignment or stored project history. The [Audio to Text tool](/audio-to-text) makes English drafts from browser-decodable local recordings up to 100 MB; MP3, WAV, M4A, OGG, MP4, MOV and WebM support depends on actual decoding. First use loads language-check and English recognition models.

Local recordings and transcript edits remain in the browser. Public Instagram lookup uses servers; YouTube tools retrieve existing caption tracks and may cache successful queries for one hour. Those link-based routes are separate from this manual workflow. Review the [privacy policy](/privacy) before choosing a route for your material.

## What if I only have plain text or incomplete cue timing?

Keep document and version identifiers with the exact passage and a stable text locator you can reproduce. A plain-text export alone does not supply cue end times. In the shared tool, Copy and TXT use edited text, while SRT/VTT and editor transfer require non-empty text and complete valid cue timing. Do not manufacture a subtitle interval to fill a research worksheet.

Start with one quotation whose source you are authorized to review. Preserve the selected words, surrounding context and unresolved locator fields together. The next reviewer should be able to distinguish what the text map reproduces from what still needs a recording check.
