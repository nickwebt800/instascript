# Plain Text Transcript Export: Keep a Review Record

Canonical: <https://instascript.app/qualitative-plain-text-handoff>

When exporting a checked transcript to plain text, retain its source reference, version, export settings and unresolved decisions in a separate review record. Open the downloaded file and compare it with the checked text. In InstaScript, TXT can include available start timestamps; it does not automatically include end times, speaker attribution or a research review history.

[Download the export-review worksheet](/data/qualitative-plain-text-handoff-worksheet.md)

## What can disappear when the words still look right?

A readable export is only one part of a research handoff. The [ATLAS.ti formatting guide](https://atlasti.com/guides/interview-analysis-guide/transcription-formatting) already discusses speakers, turn divisions, line numbers, timestamps and metadata kept separate from dialogue. [Harvard Library's recording and transcription guidance](https://guides.library.harvard.edu/c.php?g=796889&p=10476360) emphasizes matching transcription choices to the method and revising automated text. Those principles apply before choosing a download format; a successful download does not establish that they were followed.

Our contribution below is a small, inspectable export experiment and a companion worksheet. It compares actual downloads from the prepared-sample interface after replacing all three cue texts with invented sentences. The sample's existing times were reused solely as test values. The new words do not describe its recording, and no speech recognition or human audio verification was performed for this exercise.

## Our fictional export experiment: inspect three files

![Read the exported file](/assets/research-export/01-files-wide.svg)

Fictional replacements; no recording was checked.

We entered these invented sentences into the sample's editable cues: “I kept the paper map.”, “The route was [unclear].” and “I did not use the shortcut.” The starts were 0, 3.6 and 7.5 seconds; the ends were 3.6, 7.5 and 11 seconds. Here, [unclear] is an authored unresolved marker, not a model confidence score or a detected audio problem. The exercise record is EXPORT-R7, version V1.

Download the [plain TXT](/data/qualitative-plain-text-handoff-plain.txt), [TXT with starts](/data/qualitative-plain-text-handoff-timed.txt) and [SRT](/data/qualitative-plain-text-handoff-sample.srt). These are the actual browser downloads with the fictional replacements. They contain no participant data. Changing the timestamp checkbox did not rerun transcription or change the words.

| Download | What survived in this exercise | What was not added automatically |
| --- | --- | --- |
| Plain TXT | All three edited sentences and the literal [unclear] marker, joined by spaces | Cue boundaries, starts, ends, EXPORT-R7, V1 or review decisions |
| TXT with starts | One edited cue per line, prefixed by [00:00:00.000], [00:00:03.600] or [00:00:07.500] | End times, stable research cue IDs, version or speaker attribution |
| SRT | Three numbered cues with the supplied start/end pairs and edited words | Project reference, version, review status or a record of earlier edits |

The plain file reads “I kept the paper map. The route was [unclear]. I did not use the shortcut.” It is easy to read, but its spaces cannot tell a recipient which boundaries came from the editor. The timestamped file retains three visible starts. Those starts are text anchors, not playable media links, word-level alignment or evidence that an interval was checked. SRT retains intervals for subtitles; its cue numbers are sequence numbers, not persistent identifiers across later resegmentation.

## Our reproducible check: match bytes without claiming review

![Keep a companion record](/assets/research-export/02-record-wide.svg)

A fingerprint compares bytes, not research approval.

The [standalone Node exercise](/data/qualitative-plain-text-handoff-reproduce.cjs) embeds those three downloads and a fictional companion record. Its [actual output](/data/qualitative-plain-text-handoff-example.json) includes SHA-256 fingerprints for each UTF-8 file. Run it with Node to repeat its consistency checks; it reads no study files and makes no network requests. A matching fingerprint says that bytes match the reference supplied to the check. It cannot establish who created that reference, who reviewed speech or whether disclosure is permitted.

Our first counterexample keeps exactly the same plain text while changing the cue grouping. That demonstrates why the plain file alone cannot recover its original cue boundaries. A second counterexample changes the last cue's end from 11 to 12 seconds while retaining its start and text. The timestamped TXT is identical in both cases. Keeping starts therefore does not preserve end times. These are constructed information-loss examples, not observed recognition errors or estimates of real-world frequency.

The companion record lists EXPORT-R7, V1, the three file fingerprints, the declared settings and the unresolved-marker decision. All review fields explicitly say “fictional text only; no recording review.” The checker rejects a wrong version, a different declared mode, changed bytes, a missing fingerprint and a claim that this exercise establishes audio verification. It does not authenticate a reviewer or manage access. Someone who changes both a file and its reference record can create a new matching pair; protect project records through your own approved process.

## Our worksheet: make the handoff decision explicit

![Know what cannot return](/assets/research-export/03-loss-wide.svg)

Constructed counterexamples; no accuracy estimate.

Use the [blank export-review worksheet](/data/qualitative-plain-text-handoff-worksheet.md) beside the transcript in your permitted project storage. Record a project-safe reference and version, the chosen format and timestamp setting, and where the checked source and recording may be accessed. Record a fingerprint only if your workflow can produce and retain it reliably. Do not put direct identifiers, private recording paths or a reidentification key into a broadly shared manifest.

Next, open the actual downloaded file. Compare the first and last passage, each unresolved marker and any passage selected for analysis against the version you intended to export. Write what was inspected and what remains pending. For this fixture the decision is “bytes match the invented reference; [unclear] remains unresolved; no recording checked.” For a real project, replace that with the work actually performed, including any relevant scope limitation. A label such as “checked” without its scope should not stand in for review evidence.

Finally, record what the recipient needs next. If replay intervals matter, a start-only TXT is insufficient on its own; retain the permitted timed companion and source reference. If speaker labels matter, inspect whether they are actually in the text rather than assuming the exporter identified speakers. After another text edit, export again and update the companion record. This worksheet documents a handoff; it neither approves a quotation nor replaces the separate [transcript correction review](/qualitative-transcript-corrections).

## Does InstaScript save a research project with the export?

No. The shared English transcription tool exports edited words and available timing, with optional starts for TXT, Markdown and Copy. Complete valid timing is required for SRT/VTT; missing ends are not estimated. It does not automatically diarize speakers, produce coding decisions or attach this worksheet. Local files and same-origin editor transfers stay in the browser; public Instagram fetching uses servers, and YouTube tools read existing captions. See the [privacy policy](/privacy) for those distinct boundaries.

Use the [audio transcription tool](/audio-to-text) for a permitted English recording, then inspect its result and downloads yourself. Browser decoding and the 100 MB limit still apply. First use downloads language-detection and English-recognition models. The public exercise here demonstrates export behavior, not recognition accuracy, research approval or automatic import compatibility with an analysis package.
