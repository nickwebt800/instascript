# Uncertain Transcript Terms: Keep Candidates Separate

Canonical: <https://instascript.app/qualitative-uncertain-terms>

For qualitative research transcription, preserve the draft wording and attach uncertain terminology to a specific occurrence. Put candidate spellings in a separate review ledger, with their source and an unresolved status. A project glossary can suggest a word; it cannot establish what a recording contains. Review each occurrence before changing a versioned transcript.

[Download the blank terminology worksheet](/data/qualitative-uncertain-terms-worksheet.md)

## Why a familiar spelling is still a candidate

A specialist term may look more plausible than a recognizer's ordinary word. That plausibility is a reason to investigate, rather than evidence that the speaker used it. Replacing every matching word can also alter an unrelated occurrence elsewhere in the interview.

[ATLAS.ti's interview transcription guide](https://atlasti.com/guides/interview-analysis-guide/interview-transcription) discusses technical vocabulary, preparing a glossary and checking a draft against its recording. Those are established preparation and review steps. The occurrence ledger below is our own teaching device for keeping a spelling suggestion separate from a transcription decision; it is not a validated method or a built-in InstaScript feature.

## Our fictional exercise: one word appears twice

![One spelling, two occurrences](/assets/research-terms/01-occurrence-wide.svg)

Two exact mirror tokens remain pending in FICT-T04 v1. Fictional exercise; no recording.

All names, sentences, document IDs and time ranges here are invented. There is no recording, research participant, recognition experiment or human audio check. FICT-T04 version v1 contains two practice cues. Neither sentence is a research finding.

| Source cue | Invented replay range | Unchanged draft text |
| --- | --- | --- |
| C01 | 12 to 16 seconds | We used mirror at the workshop. |
| C02 | 27 to 31 seconds | A mirror hung beside the door. |

Our invented project sheet LEX-01 lists the candidate name Mirro. A reviewer suspects that the first occurrence of mirror might refer to that fictional name. The second occurrence could simply refer to an ordinary object. This exercise intentionally supplies no answer about either recording occurrence, because no recording exists.

Create U01 for C01, selecting mirror at [8,14), and U02 for C02, selecting mirror at [2,8). Offsets are zero-based, end-exclusive JavaScript UTF-16 positions in these exact ASCII strings. Store the selected text with each locator. If a transcript changes, these positions need review against its new version; the numbers alone are not durable identifiers.

## Our ledger: occurrence, candidate and evidence stay distinct

![A candidate is not a decision](/assets/research-terms/02-candidate-wide.svg)

Mirro from fictional LEX-01 is a candidate only for U01. Fictional exercise; no recording.

For U01, retain the observed draft string mirror, propose Mirro, and name LEX-01 as the candidate source. Set reviewStatus to pending and audioChecked to false. For U02, retain mirror and leave the candidate list empty. An empty list means no candidate has been supplied, not that the wording is confirmed.

| Review item | Draft token | Candidate source | Status |
| --- | --- | --- | --- |
| U01 / C01 | mirror | Mirro from fictional LEX-01 | Pending; no audio |
| U02 / C02 | mirror | No candidate supplied | Pending; no audio |

The project sheet establishes only that this invented name is available for consideration. It does not establish pronunciation, the speaker's intended referent, or what either sentence says in audio. A real project's glossary should likewise retain its origin and version, rather than acquiring authority just because a candidate was entered into a table.

Keep possible meaning in a separate analyst note. For example, a hypothesis that a workshop used a particular product must not become a finding merely because a candidate matches a project list. The worksheet leaves interpretation and publication decisions pending alongside the wording check.

## Our reproducible check: a global replacement changes both cues

![Inspect the replacement scope](/assets/research-terms/03-reject-wide.svg)

Unsafe global replacement changes both cues; zero changes are approved. Fictional exercise; no recording.

Download the [public fictional example JSON](/data/qualitative-uncertain-terms-example.json) and [standalone Node reproduction file](/data/qualitative-uncertain-terms-reproduce.cjs). Running the file prints its embedded fixture and check results. It reads no research files, accesses no microphone and sends no network requests.

The script counts two exact, lowercase mirror tokens in the supplied draft. A deliberately unsafe global replacement produces We used Mirro at the workshop. and A Mirro hung beside the door. Both strings appear in the output as a warning example. Neither is an approved correction, and the source object remains unchanged.

Three rejection checks make the locator limits visible. A request for v2 against the v1 document is rejected. A locator that points at a different string is rejected. A record claiming audioChecked true is rejected in this fixture because the example contains no audio. This last check enforces the teaching fixture's boundary; software cannot determine whether a real person honestly reviewed a real recording.

The output retains two pending decisions and zero approved replacements. It does not rank Mirro above mirror or compute a confidence score. Passing the script demonstrates internal consistency of these fictional records, not transcription accuracy, inter-reviewer agreement or glossary effectiveness.

## Our worksheet: close one decision without closing every occurrence

Use the [blank terminology review worksheet](/data/qualitative-uncertain-terms-worksheet.md) outside this website. Record document/version, cue, exact draft token, context, replay range, candidates, candidate source, reviewer and decision evidence. For a real authorized source, distinguish not checked, reviewed but unresolved, and a documented decision. None of those states should be inferred from a completed candidate field.

If you later establish a correction for U01 in your own material, create a new transcript version and record the original wording, replacement, reason and review date. Do not automatically apply that decision to U02. If the sound remains unclear, retain an uncertainty convention appropriate to your project and record the unresolved item; do not choose the most professional-looking spelling just to finish the table.

A second person should be able to locate the same occurrence and see what evidence supported the decision. Our [transcript correction guide](/qualitative-transcript-corrections) addresses what happens to coded quotations after a revision. Today's exercise addresses the earlier question of whether a proposed terminology change has enough support to enter a revision at all.

## Can InstaScript apply or learn this glossary?

No. This guide provides a manual worksheet, public example and standalone consistency check. It adds no custom-vocabulary training, automatic terminology replacement, verified speakers, research coding or saved project history. The [Audio to Text tool](/audio-to-text) creates English drafts from local browser-decodable files up to 100 MB. MP3, WAV, M4A, OGG, MP4, MOV and WebM availability depends on your browser's decoding support. First use downloads language-check and English recognition models; cached resources can still need initialization.

Local recordings and transcript edits stay in the browser. Public Instagram URLs involve server fetching; YouTube tools retrieve existing caption tracks and may cache successful queries for one hour. Public-page analytics is separate from local file processing; see the [privacy policy](/privacy) for its scope and providers. Do not put private project names or research excerpts into public example files or external searches.

## What can I do if I cannot resolve the term?

Keep the draft, its context and the pending decision together. Follow the project's uncertainty notation, and explain the limitation when it affects an interpretation or quotation. A later participant explanation is another source: use the [participant clarification workflow](/qualitative-participant-clarifications) to keep it distinct from recorded wording.

The useful result can be an unresolved, locatable item. Our exercise ends there deliberately. A clean spelling and an internally consistent ledger are not substitutes for evidence from the source you are authorized to review.
