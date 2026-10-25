# Participant Clarifications: Keep Later Feedback Separate

Canonical: <https://instascript.app/qualitative-participant-clarifications>

In qualitative research transcription, save a later participant clarification as a dated, linked source alongside the recording-based transcript. Label its origin when quoting it. A request to correct a misheard word needs an audio check; a later explanation does not become recorded speech simply because it appears in a revised document.

[Download the blank review worksheet](/data/qualitative-participant-clarifications-worksheet.md)

## What kind of change am I looking at?

Ask whether the proposal concerns the words captured during the interview, information supplied afterward, or permission to use material. These questions can arrive in the same message but need separate decisions. A spelling correction, an expanded explanation and a request to withhold a passage should not collapse into one unexplained replacement.

[Hagens, Dobrow and Chafe's transcript-review study](https://link.springer.com/article/10.1186/1471-2288-9-47) distinguished transcription repairs, added details, changed details, rephrasing, removals and new statements. Its discussion warns that revised and unrevised transcripts can become different kinds of data. That study supports distinguishing changes; it does not validate the worksheet below or prescribe a universal retention rule.

[Rowlands's account of transcript review](https://journals.sagepub.com/doi/full/10.1177/16094069211066170) discusses participant involvement and the methodological consequences of revising speech. The purpose of review therefore needs to be explicit. An interview transcript check and a discussion of an analyst's findings are different activities, even when a project uses the term member checking for both.

## Our fictional exercise: one passage, two sources

![Transcript, later written clarification and analyst memo have distinct origins.](/assets/research-clarifications/01-separate-wide.svg)

Fictional exercise: a source relation does not make two records the same source.

Everything in this exercise is authored training material. There is no participant, email, recording, human-verified transcript or observed research finding. The dates and time interval are invented locators. They illustrate a record structure, not evidence that an interview occurred. Do not use these sentences as participant quotations in a study.

The fictional transcript record T01, version 1, is dated 2026-10-20 and has the invented interval 00:12-00:18. Its text is: **I stopped using the evening desk because it was hard to reach.** This is the exercise's recording-layer text. In real work that label would require an identifiable recording and a documented check; the label alone would prove nothing.

The fictional follow-up record F01 is dated 2026-10-22, relates to T01 and contains: **By hard to reach, I meant the bus connection after work, not the desk staff.** Its source kind is written follow-up. It has no audio start or end time. Giving it T01's interval would wrongly suggest that the clarification was audible in the original passage.

The fictional analyst memo M01 says: **Consider whether access refers to transport here; do not infer staff availability from T01 alone.** Its source kind is analyst memo. It is neither a participant addition nor a transcription correction. Keeping this third record visible prevents an analyst's interpretation from being attributed to the participant.

| Record | Origin in the exercise | Locator | Permitted description in this exercise |
|---|---|---|---|
| T01 v1 | Fictional transcript | Invented 00:12-00:18 | Transcript-layer wording; no actual audio verification |
| F01 | Fictional written follow-up | 2026-10-22; linked to T01 | Later clarification; no recording timestamp |
| M01 | Fictional analyst memo | Memo linked to T01 and F01 | Analyst interpretation; no participant attribution |

## Our worksheet: record the relation before choosing a replacement

![The written clarification links to T01 but has its own date and no recording interval.](/assets/research-clarifications/02-link-wide.svg)

A later source keeps its own locator; the interval shown belongs only to the invented transcript.

Use a separate change-request row. In the supplied example, request C01 links F01 to T01 and proposes replacing **hard to reach** with **poorly connected by bus**. The request status is **pending review**. T01's text is retained unchanged in the exercise, and F01 remains a separate record. This avoids treating a proposed wording change as an already verified repair.

The blank worksheet asks for a request ID, target record and version, proposed change, origin, date received, relation to the original passage, audio-check status, use decision and reason. Put the date of the feedback in its own field. A later collection date is analytically useful context; it should not be disguised as the interview date.

For C01, the audio-check status is **not applicable to fictional material**, and the use decision is **pending**. A real reviewer could classify an actual request as a confirmed mishearing only after checking its evidence. If the recording does not resolve a term, preserve that uncertainty rather than awarding the participant's later phrasing a verified-audio label.

Our proposed analysis note keeps the distinction readable: **T01 describes difficulty reaching an evening desk. In F01, the fictional follow-up attributes that difficulty to transport. M01 flags a narrower interpretation for review.** This note is authored for training. It does not claim that a code has been accepted, that a participant approved an interpretation, or that transport is an established theme.

## Our reproducible check: what can the file actually establish?

![Attribute each source, review the proposal, and record the permitted use decision.](/assets/research-clarifications/03-attribute-wide.svg)

C01 remains pending. The example grants no right to retain or quote material.

Download the [example JSON](/data/qualitative-participant-clarifications-example.json), [standalone Node check](/data/qualitative-participant-clarifications-reproduce.cjs) and [blank worksheet](/data/qualitative-participant-clarifications-worksheet.md). Save the check and run `node qualitative-participant-clarifications-reproduce.cjs`. It needs no package installation, network connection or research material. Its output reproduces the downloadable JSON.

The check confirms that T01, F01 and M01 have different source kinds; F01 links to T01; F01 has no recording interval; C01 remains pending; and T01's original sentence survives unchanged. A deliberately merged candidate attaches the follow-up sentence to T01's interval. The check rejects that candidate with `later_source_has_recording_interval`. This is a validation of our invented record convention, not a test of transcription accuracy or research validity.

Try the exercise before using the blank form. Find the sentence about transport and identify its source, date and relation to T01. Then find the interpretation about staff availability and identify its author role. If either is cited as speech at 00:12, the citation has crossed a source boundary. Record the problem and revise the attribution rather than silently rewriting the transcript.

## Does separate storage override a participant's use restrictions?

No. This worksheet is an attribution aid, not permission to retain or quote restricted material. Follow the study's agreed review and withdrawal process, access controls and applicable retention decisions. If a passage cannot be used, a link in a ledger does not make it usable. Record the decision only to the extent the project permits; do not preserve disallowed content just to complete this example's fields.

## Can InstaScript manage this review automatically?

No. This is a manual research guide. InstaScript does not authenticate participant feedback, reconcile research codes, maintain a cloud project history or decide which account of an event is true. Keep the downloaded worksheet in your approved research environment. Do not paste private participant information into public example files or public repositories.

For a permitted local English recording, the [audio-to-text tool](/audio-to-text) can produce an editable draft. It accepts browser-decodable MP3, WAV, M4A, OGG, MP4, MOV and WebM files up to 100 MB. First use downloads language-detection and English-recognition models; cached resources may still need initialization. Local media and edits stay in the browser. TXT and Markdown can preserve edited text; SRT/VTT require complete valid cue times and nonempty text. Public Instagram and YouTube lookups have different server boundaries in the [privacy policy](/privacy).

For the broader evidence-versus-interpretation workflow, return to [qualitative research transcription](/qualitative-research-transcription). If an actual transcript correction has already changed a coded passage, use the separate [coded-quotation migration exercise](/qualitative-transcript-corrections). Today's two-source exercise answers an earlier question: what kind of source is the new wording before any migration takes place?
