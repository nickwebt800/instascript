# Focus Group Transcription: Check Turns Before Naming Speakers

Canonical: <https://instascript.app/focus-group-transcription>

Transcribe the recording into an editable draft, check each speaker change against the sound, mark unresolved overlap, and retain the moderator's question beside the answer; never turn an automatic subtitle boundary into a verified speaker change.

Use the [interview transcription guide](/interview-transcription) to make and replay an English draft, then choose a retention convention with the [verbatim transcription guide](/verbatim-transcription). This page concentrates on the manual turn record that a group discussion needs. InstaScript does not automatically identify speakers or separate overlapping voices.

## Set the turn convention before editing

Decide what identifies a speaker in your working transcript and what you will write when identity is uncertain. Keep those labels consistent without publishing an identity key in a shared transcript. Mark an unresolved passage for replay rather than guessing which participant would have said it. A readable paragraph is not evidence that the speaker label is right.

If you later import a checked transcript into research software, consult that product's actual format requirements. The [MAXQDA focus-group import manual](https://www.maxqda.com/help/import/importing-focus-group-transcripts) describes how supplied speaker labels structure an import. That formatting step uses the text you supply; it does not independently verify an attribution from this website's recording.

## Our boundary check: one cue becomes separate cues

The following is a real segmentation comparison on a public oral-history interview, archive identifier ncr002360, from the [Library of Congress audio](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3). It is an individual interview. It is used here to inspect machine boundaries, not to measure focus-group speaker identification, group agreement or overlapping speech. The [selected output records](/data/focus-group-transcription-record.json) preserve the exact versions and times.

The tiny.en run put the ranch and homestead phrases together in cue 4 at 6.040–10.840 seconds. The small.en run divided them between cue 4 at 5.940–8.660 seconds and cue 5 at 8.900–10.740 seconds. This is a directly observed change of machine grouping. Neither run returned a verified speaker label at the split. The additional cue cannot, on this evidence, be treated as an additional conversational turn.

For our manual review record, we therefore give this span a **speaker-change status: not established**, with separate locators for both outputs. We do not write a new participant name at the small.en split. We also keep the full span available for playback rather than presenting the shorter cue as a self-contained answer. That is an editorial response to this boundary example, not a claim that we listened and resolved the identity.

The distinction matters when carrying a draft into a group transcript: a new row may exist because the recognizer split a sentence, not because a new person spoke. Verify the actual source before importing a row-based speaker assignment. The present recording cannot tell us how well either model would handle a room of participants, and we have not run such a test.

## A shifted phrase should retain its source locator

At another position, tiny.en cue 16 ends at 46.520 seconds before the words **around here**, which occur in its next cue. small.en cue 17 contains that phrase within its 43.160–47.000-second span. The data record includes the following tiny.en cue so the comparison can be inspected rather than inferred from an omitted fragment.

Our proposed turn worksheet records a span to review instead of matching the same integer cue number between the outputs. Its fields are source version, time window, machine cue references, proposed turn label, identity evidence and unresolved point. For this example, identity evidence is unfilled. Moving the phrase back into its surrounding statement is a proposed editorial grouping; it must be checked before replacing either draft.

Do not count a person twice because their words are split across machine rows. Conversely, do not merge nearby rows into one attributed turn merely because their sentences read smoothly together. Both decisions require information the unlabelled machine output does not supply. If a later listener identifies a change, add the evidence and preserve the earlier unresolved state in the revision history.

The [turn-review worksheet](/data/focus-group-turn-worksheet.md) contains these actual boundary observations and deliberately empty identity fields. It is a manual template, not an automatically generated participant roster. Its useful output is an explicit unresolved attribution, with enough location information for someone to finish checking it.

## Preserve the exchange around overlap

For your own group recording, retain the question, the audible response and any interruption needed to interpret it. Describe overlap only when you can hear it. If you cannot distinguish words or identity, record that uncertainty at the source position; do not manufacture parallel lines of dialogue to make the transcript look complete.

Choose a consistent notation and explain it to the recipient. A bracketed uncertainty is a review instruction, not a verbatim spoken phrase. If the recording includes video, use any permitted visual evidence as a separate basis for checking identity; do not claim an audio-only recognizer read facial expressions. This page's experiment contains no video or overlap verification.

## What was run, and what remains yours to check

The retained experiment used the same untrimmed 62.496-second recording on 24 October 2026 with faster-whisper 1.2.1, tiny.en and small.en. Both ran on CPU int8 with English selected, beam size 5, temperature 0, word timestamps on, voice-activity filtering off and previous-text conditioning on. The downloadable record gives the saved configuration and selected segments. These local experimental models do not add a speaker-identification feature to InstaScript.

An independent reference for the original spoken wording was not established; the archive viewer's own transcript is machine generated. The example supports a boundary-disagreement observation, not accuracy, diarization performance or an attribution verdict. For your focus group, complete the identity and overlap checks against that group's recording before sharing a named transcript. When you need someone else to complete that work, specify the unresolved spans and the required review deliverable rather than handing over a confident-looking draft with unexplained labels.
