# Qualitative Coding: Keep Uncertain Words Out of Your Findings

Canonical: <https://instascript.app/qualitative-coding>

Read a passage in its recording context, mark the exact excerpt you intend to code, and attach a label with its inclusion rule; if a disputed word changes that label, flag the passage for listening before treating it as evidence.

This guide shows a manual coding decision record built around actual disagreements between saved recognition outputs. It does not offer automatic research coding. Keep the recording, transcript version and analytical notes separately so another reader can follow the decision you made.

## Choose what your label is meant to capture

Write your research question beside the material before applying a code. Decide whether the label concerns an explicit topic, a reported action or your interpretation. Those are different claims: a place mentioned in speech is not automatically evidence of attachment to that place, and a question is not its respondent's answer. The [University of Illinois coding guide](https://guides.library.illinois.edu/qualitative/coding) explains why the coding strategy and unit should follow the study's methodology.

For this exercise, the aim is narrower: identify where recognition uncertainty prevents a proposed label from being supported. The labels below are editorial suggestions for review, not findings about the interviewee. No codebook was tested on a research dataset, and no agreement statistic was calculated.

## Our worked record: a candidate place label

We reused an actual local comparison of a public Library of Congress oral-history interview, archive identifier ncr002360. The [original audio file](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3) is the playback source; the [archive's experimental viewer](https://speech-to-text.labs.loc.gov/) can also locate that identifier. It is an individual interview, not a focus group. The archive viewer's own text is automated and is not an independent human reference.

In the saved tiny.en output, the passage at 20.400–22.600 seconds contains **winter muckus**. The small.en output at 20.200–22.280 seconds contains **Winnemucca**. Those strings and times come from the [retained experiment excerpt](/data/qualitative-coding-record.json). They do not establish which words were spoken. A familiar-looking place name is still a candidate until checked against the recording.

Our proposed coding decision is to withhold a specific location label. Put **place wording unresolved** in a transcription-review field instead. Keep the candidate spellings in that field, with the run names and their separate time windows. Do not silently normalize the draft and then cite the normalized name as though the recognizer or a human listener had established it.

If your analytical question concerns commuting, you can examine the wider passage for that topic without claiming a confirmed destination. Record the scope of the claim: mentioning a commute and identifying a place are separate decisions. The unresolved place should not disappear merely because a broader code remains usable. This distinction is our handling of this particular output pair, not a universal coding rule validated by the experiment.

## A question can change the candidate code

Another saved pair differs at the start of an interviewer question. tiny.en returns **So do you** in its 31.560–33.140-second cue; small.en returns **Why did you** at 31.480–33.000 seconds. A proposed label about a reason for moving depends on the question and the answer in context. Selecting the smoother question would supply a premise the current comparison has not verified.

For the decision record, enter **question wording unresolved**, list both versions and leave the proposed reason-related interpretation undecided. Replay through the following answer rather than coding the opening phrase alone. If a later reviewer resolves it, keep the old candidate text in the change history and distinguish the corrected transcript from the previous draft. A correction may require revisiting a code; changing the transcript should not secretly rewrite an earlier analytical memo.

The equipment-related passage provides a similar boundary. At 10.840–15.020 seconds, tiny.en contains **swathe**; the corresponding small.en cue at 11.000–14.660 seconds contains **swather** and different surrounding wording. A label for a specific machine should remain pending. Our worksheet separates the noun-review task from any broader action label the complete exchange may eventually support.

## Fill a decision record you can inspect later

Use these fields in your own working document: source identifier; transcript version; excerpt and its locator; proposed code; inclusion condition; unresolved wording; decision and reason; reviewer; revision date. Leave a field blank when the information is unavailable. A machine's cue number alone does not identify a passage across different transcripts.

For the place example, the proposed code is a named destination, its inclusion condition is a checked place reference in the relevant exchange, and the current decision is withheld because the outputs disagree and the independent wording reference is missing. This is a completed decision to postpone that specific attribution, not a completed geographical finding. The reviewer and later resolution remain unfilled.

Download the [decision worksheet](/data/qualitative-coding-worksheet.md) to retain that distinction. The observation fields reproduce this run; the suggested decisions are explicitly marked as editorial recommendations. Reuse the field structure for your study, but replace the example with your own permitted material and the methodological requirements you actually follow.

## Recognition settings and the next action

The saved comparison ran on 24 October 2026 with faster-whisper 1.2.1, tiny.en and small.en, CPU int8, English selected, beam size 5, temperature 0, word timestamps enabled, voice-activity filtering disabled and previous-text conditioning enabled. Both used the same untrimmed recording, decoded as 62.496 seconds. These are local experimental runs; small.en is not an extra model selectable on this website. The [data and method](/data/qualitative-coding-record.json) retain the configuration and selected output records. No accuracy measurement or judgment of the original words follows from their disagreement.

For the recording-to-draft steps, use the [interview transcription guide](/interview-transcription). For decisions about retaining repetitions and corrections, read the [verbatim transcription guide](/verbatim-transcription). InstaScript's existing English file tool produces a draft for manual checking; it does not assign research codes, identify speakers or validate themes. Your next action here is to resolve the flagged wording before promoting the affected code into a finding.

![A candidate is not a decision](/assets/research-terms/02-candidate-wide.svg)

Mirro from fictional LEX-01 is a candidate only for U01. Fictional exercise; no recording.

An uncertain project term needs its own occurrence decision before it enters a transcript revision. Try the [terminology review worksheet](/qualitative-uncertain-terms).
