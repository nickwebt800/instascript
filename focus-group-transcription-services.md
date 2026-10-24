# Focus Group Transcription Services: Specify the Review You Need

Canonical: <https://instascript.app/focus-group-transcription-services>

Send a permitted recording with a written brief that names the required speaker labels, overlap notation and transcription convention; ask for unresolved passages and amendments to be returned with source positions, then check the delivered files against that brief before accepting them.

If you already have a machine draft, commission its review explicitly. Say whether you need wording correction, participant attribution, timing revision or all of those tasks. A request for a cleaner document can leave the most important uncertainty untouched. This guide provides a sample handoff and acceptance record; InstaScript does not sell a managed human transcription service.

## Write the deliverable before choosing a workflow

Name the source recording version, the intended use and the output you need. Decide whether a reviewer may remove fillers, merge broken sentences or alter time windows. If you need participant labels, explain what evidence the reviewer can use and what should happen when that evidence is insufficient. Keep a participant identity key separate from a copy intended for wider circulation.

Give the reviewer an authorized way to access the source and state your project's handling requirements. Ask them to confirm what happens to the recording and working files. A sample acceptance sheet is a specification you propose, not proof that a provider has agreed to it or follows it. Obtain the actual delivery terms rather than inferring them from a polished sample.

## Our acceptance case: the words match but the times move

For a concrete timing check, we reused saved local outputs on a public Library of Congress interview, archive identifier ncr002360. The [source recording](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3) is an individual oral-history interview, not a focus group. These are recognition outputs, not work purchased from a service. The example tests what a proposed acceptance question would reveal; it does not evaluate a vendor.

tiny.en placed **or something of that kind.** at 29.040–31.240 seconds. small.en placed the same words at 28.880–30.700 seconds. Both windows are retained in the [acceptance-case data](/data/focus-group-transcription-services-record.json). Matching wording alone would not tell a recipient that the locator changed. Without an independently checked alignment reference, this comparison does not identify the better window.

Our proposed acceptance question is therefore specific: did this delivery preserve the submitted draft's timestamps, or produce a new timing version? If the brief required unchanged cue times, the differing window would require an explained exception. If retiming was part of the commission, ask the reviewer to identify that revision and its source recording. Those are different briefs; the observed timing difference is not automatically a defect in either recognizer.

Enter the answer in the delivery record before attaching old annotations to the returned file. An amendment that moves a locator may affect a colleague's review notes even when its sentence is unchanged. The file should make that revision traceable instead of forcing the recipient to discover it through an unexplained mismatch. This handling is our proposed acceptance procedure, not an industry certification rule.

## A segmentation change needs a mapping, not just a new file

The retained swather-related span crosses a different boundary in the two outputs. tiny.en cue 18 runs from 48.720 to 52.880 seconds. small.en divides the corresponding material between cue 18 at 48.520–51.960 seconds and cue 19 at 51.960–54.320 seconds. The exact texts are in the downloadable case data; their wording also differs, so they cannot be treated as identical copies with different formatting.

For a commissioned review, our proposed acceptance sheet asks for a passage mapping when the grouping changes. Record the submitted cue references, the returned cue references and the source span used for checking. Leave the reviewer and resolution fields empty until a real reviewer completes them. Calling the new row by the old row's number would not establish that the same evidence unit survived.

This case also shows why the commission should distinguish a regenerated transcript from an edited draft. A fresh recognition pass may reorganize the text. If your project requires corrections to an existing annotated version, specify how its references should be retained or mapped. Do not assume that receiving a transcript in the same file format preserves those references.

## Punctuation changes belong in the agreed convention

In another retained passage, tiny.en ends the Tahoe statement with a comma, while small.en ends it with a period. The recorded windows are 34.320–38.200 and 34.300–38.040 seconds respectively. The outputs demonstrate different machine punctuation; they do not establish a measured pause or the speaker's intention.

Our acceptance sheet asks whether punctuation editing was allowed and whether it has been checked where it changes the apparent scope of an answer. It does not demand a log of every harmless keystroke. Instead, the proposed brief names changes that affect an attribution, a quotation or a locator as items to explain. This is a deliberate specification for this example, not a claim that all services return such a record.

Download the [handoff and acceptance worksheet](/data/focus-group-service-acceptance.md). It contains the actual observed timing, grouping and punctuation cases, followed by blank fields for a real delivery. Its decision prompts are authored review criteria. No human reviewer has resolved these sample passages, and none of its empty fields should be presented as a completed service check.

## Add the checks your actual focus group requires

Our local experiment ran on 24 October 2026 with faster-whisper 1.2.1, tiny.en and small.en on CPU int8. Both used the same 62.496-second untrimmed file, English selected, beam size 5, temperature 0, word timestamps enabled, voice-activity filtering disabled and previous-text conditioning enabled. The downloadable record preserves those settings and the selected output segments. This is a single-recording provenance record, not a service accuracy or turnaround measurement.

A real focus-group commission still needs checks on that group's speaker identities and overlap. This example has not tested either capability. If your deliverable requires those checks, name them as separate acceptance items and ask who will resolve passages that remain unclear. Keep unresolved items visible rather than accepting invented labels as completion.

For the free recording-to-draft process, start with the [interview transcription guide](/interview-transcription). Use the [verbatim transcription guide](/verbatim-transcription) to choose what a reviewer may retain or remove. Before accepting a returned transcript, inspect the actual file, its version and any outstanding questions against your written brief. The useful endpoint is an accountable record of what was checked and what still needs an answer.
