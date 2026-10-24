# Qualitative Research Transcription: Keep the Evidence Separate from the Interpretation

Canonical: <https://instascript.app/qualitative-research-transcription>

First, save the recording, transcription draft and analysis as separate records. Next, establish the spoken wording and speaker turns against the recording. Then attach codes to identifiable passages, keeping interpretation separate from the words being coded. Qualitative research transcription is the preparation of recorded speech as text for qualitative analysis.

The tool supplies editable speech text, not research codes or verified speaker identities. The comparison below uses actual local recognition runs on a public oral-history interview. It is an **evidence-review draft**: the independent verbatim audio reference has not been established, and the original-wording column remains pending. It must not be presented as a finished, human-verified transcription demonstration.

## What qualitative transcription needs to preserve

Treat the recording, the transcription draft and the analysis as separate records. A recognizer's output is a proposed reading of speech. A code is an analyst's label for a passage. A theme is a further analytical claim. Moving a phrase between cues or replacing an unfamiliar noun may change what a text search retrieves, even before anyone starts coding.

[Start an English draft with Audio to Text](https://instascript.app/audio-to-text#walkthrough-tool).

Use the [interview transcription guide](/interview-transcription) for the existing file-to-draft workflow and the [verbatim transcription guide](/verbatim-transcription) for full and clean conventions. This page examines a different question: what happens to the evidence units when two actual runs disagree? It does not repeat the synthetic full/clean editing exercise.

## A public interview that can be rerun

The recording is a Library of Congress oral-history selection, identifier **ncr002360**. Open the [specific MP3](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3), or select that identifier in the [Library's speech-to-text viewer](https://speech-to-text.labs.loc.gov/). It is a fieldwork/oral-history interview, not a synthetic conversation or a focus group. The downloaded file decoded to **62.496 seconds** in this run; the Library's browser player displayed the same duration. The archive identifier locates the reproducible source.

On **24 October 2026**, we ran the same untrimmed MP3 locally with **faster-whisper 1.2.1**. Output A used **tiny.en** and output B used **small.en**, both on CPU with int8 computation, English selected, beam size 5, temperature 0, word timestamps enabled, voice-activity filtering disabled and previous-text conditioning enabled. The model names and settings describe the actual runs; these are not extra models offered by the InstaScript website. The script, original downloaded bytes, complete JSON segments and untouched text outputs were retained for this review.

Neither pass was prompted to remove fillers, create a clean transcript or assign speakers. **Output A is an unedited recognition draft, not a verified verbatim transcript.** Both returned **22 machine segments**. The table selects **12 distinct A cues**, using their existing boundaries; it does not split a few passages into extra invented cues. When B uses a different grouping, its actual cue or cues are shown in full, so some compared windows cover different spans.

The [selected run records and configuration](/data/qualitative-research-transcription-record.json) preserve the experiment. The numbers in this method are read from the run configuration, decoder/player duration and saved segment records. No recognition accuracy, error rate, percentage or mean timing error was calculated.

## Actual cue comparison

The differences fall into **wording**, **cue grouping/timing**, and **punctuation**. These are observed output differences, not three deliberate editing settings. The clickable time is A's reported start in the original file; it is a review locator, not an independently validated speech onset.

**Reference gap:** the Library viewer explicitly labels its own text as automated speech recognition. Its record is therefore not a human ground truth. We also could not obtain an independent verbatim transcript from the main catalogue item, which did not load in this environment. Rather than substitute either model's answer for the original audio wording, that column is left explicitly pending.

| Time / actual cue IDs | Original audio wording | Output A — unchanged ASR draft | Other output B — unchanged ASR draft | Observed difference |
|---|---|---|---|---|
| [00:00.000](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3#t=0); A1 / B1 | **Pending independent listening; not established by model agreement.** | **00:00.000–00:02.740** “Here you are away from your home, so to speak.” | **00:00.000–00:02.640** “Here you are, away from your home, so to speak.” | **Punctuation.** An internal comma appears in B but not in A. The words agree. |
| [00:04.840](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3#t=4.84); A3 / B3 | **Pending independent listening; not established by model agreement.** | **00:04.840–00:05.920** “Oh no, not really.” | **00:04.780–00:05.760** “Oh, no, not really.” | **Punctuation.** B separates Oh and no with a comma; A does not. |
| [00:06.040](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3#t=6.04); A4 / B4+5 | **Pending independent listening; not established by model agreement.** | **00:06.040–00:10.840** “I just started working on the ranch cleaning up the old homestead” | **00:05.940–00:08.660** “I just started working on the ranch,” / **00:08.900–00:10.740** “cleaning up the old homestead.” | **Cue grouping / timing.** A places the ranch and homestead phrases in one cue; B returns separate cues. |
| [00:10.840](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3#t=10.84); A5 / B6 | **Pending independent listening; not established by model agreement.** | **00:10.840–00:15.020** “unless said we'd die like to cut hay and run the swathe there.” | **00:11.000–00:14.660** “And Les said, would I like to cut hay and run the swather?” | **Wording.** The reported name, question wording and machine noun differ. Neither version is certified here. |
| [00:17.860](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3#t=17.86); A7 / B8 | **Pending independent listening; not established by model agreement.** | **00:17.860–00:20.120** “I just needed a job really.” | **00:17.640–00:19.760** “I just needed a job, really.” | **Punctuation.** B sets really off with a comma; A does not. |
| [00:20.400](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3#t=20.4); A8 / B9 | **Pending independent listening; not established by model agreement.** | **00:20.400–00:22.600** “And I don't want to commute into winter muckus,” | **00:20.200–00:22.280** “And I don't want to commute into Winnemucca.” | **Wording.** A returns winter muckus; B returns Winnemucca. The place-name reading needs independent verification. |
| [00:29.040](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3#t=29.04); A11 / B12 | **Pending independent listening; not established by model agreement.** | **00:29.040–00:31.240** “or something of that kind.” | **00:28.880–00:30.700** “or something of that kind.” | **Cue grouping / timing.** The same phrase has different start and end timestamps in the two runs. |
| [00:31.560](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3#t=31.56); A12 / B13 | **Pending independent listening; not established by model agreement.** | **00:31.560–00:33.140** “So do you leave town and come to the valley?” | **00:31.480–00:33.000** “Why did you leave town and come to the valley?” | **Wording.** The opening of the interviewer question differs: So do you versus Why did you. |
| [00:34.320](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3#t=34.32); A13 / B14 | **Pending independent listening; not established by model agreement.** | **00:34.320–00:38.200** “Well, I came from Tahoe, which was not really town,” | **00:34.300–00:38.040** “Well, I came from Tahoe, which was not really town.” | **Punctuation.** A ends the cue with a comma and B with a full stop; these are machine punctuation choices. |
| [00:43.520](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3#t=43.52); A16 / B17 | **Pending independent listening; not established by model agreement.** | **00:43.520–00:46.520** “So this is theres plenty of country for riding horses” | **00:43.160–00:47.000** “So there's plenty of country for riding horses around here.” | **Cue grouping / timing.** B includes around here in its cue; A puts those words in its following cue 17. A also contains extra wording. |
| [00:48.720](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3#t=48.72); A18 / B18+19 | **Pending independent listening; not established by model agreement.** | **00:48.720–00:52.880** “So I think really the swathe is just one of those things” | **00:48.520–00:51.960** “So I think, really, the swather is just” / **00:51.960–00:54.320** “one of those things that has to be done.” | **Cue grouping / timing.** The runs divide the swather-related statement at different words; the machine noun also differs. |
| [00:54.840](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3#t=54.84); A20 / B20 | **Pending independent listening; not established by model agreement.** | **00:54.840–00:57.040** “And it's not that difficult a job,” | **00:54.800–00:56.780** “And it's not that difficult a job.” | **Punctuation.** A ends with a comma, B with a full stop. Their boundaries also differ. |

The table establishes that these saved outputs differ at these recorded positions. It does **not** establish which model heard the correct word, which time boundary matches the sound, or whether a comma represents a pause. It cannot support a ranking of transcription systems or a conclusion about other interviews. The missing reference is a material gap, not an error statistic waiting to be inferred.

## Transcription analysis: locate the disagreement before interpreting it

In A5 and B6, the reported name, question and equipment word differ. A search using just one version's noun would not retrieve the other wording verbatim. Until the sound has been independently checked, keep a neutral review flag on the passage rather than code it as evidence that a particular person requested a particular task. The strings are actual outputs; the proposed handling is an editorial recommendation for this example.

In A8 and B9, the candidate place names differ. A geographic code should not silently turn one candidate into an established location. Store the unresolved reading alongside the recording locator. If the wording is resolved later, the resolution should be an explicit transcript amendment, so the analyst can tell which reading an earlier search or memo used.

In A4, a single machine cue contains material spread across B4 and B5. That is why a cue number is not a portable evidence identifier between these runs. A reference such as B5 identifies a different unit from A5. Keep the run or transcript version with every cue reference, and map the passage before carrying an annotation into another version.

## From a coded interview transcript to thematic analysis

A **coded interview transcript** adds analytical labels to selected text; it does not make the words correct by adding those labels. For this draft, a label such as **transcript needs lexical review** describes the review task. It is not a substantive theme about the interviewee. We have not produced or tested a research codebook from this recording.

For **thematic analysis transcription**, choose the passage you intend to analyse after resolving the relevant transcription uncertainty. Keep the exact excerpt and its transcript version with any candidate code. If a corrected place name, omitted word or changed turn affects a coded passage, revisit that passage's annotation. Do not claim that a theme has been validated merely because two systems returned similar sentences. This short comparison does not establish saturation, participant agreement or the findings of a qualitative study.

## What changes for a focus group transcript?

A **focus group transcript** also needs a defensible account of who spoke and which turns overlap. This source is an individual oral-history interview; the runs did not return verified speaker identities. Nothing in this example measures multi-speaker attribution or overlapping group speech. Do not relabel these cues as a focus-group test or append invented speaker names to make them look like one.

InstaScript's English recognition workflow does not automatically identify speakers, separate overlapping voices or code research data. A focus-group deliverable needs its own turn-by-turn checks against that group's recording. The current table demonstrates output disagreement on this specific interview only.

## Transcription services for qualitative research: define the handoff

If you commission **transcription services for qualitative research**, specify what is handed back when a word remains unresolved: the alternative readings, the source position, the convention used and the person responsible for resolving it. Ask that transcript amendments be distinguishable from analytical notes. These are proposed deliverable requirements, not findings from a service-provider comparison or evidence that any particular service meets them.

The concrete outstanding deliverable in this example is an independently checked wording reference. Once it exists, each pending cell can be replaced with the checked passage, and each lexical disagreement can be assessed against the recording. Until then, the defensible endpoint is a preserved disagreement record. The next analytical decision belongs after that missing evidence, rather than being written into the transcript now.

![Preserve both text versions, locate the quotation, then review its code.](/assets/research-corrections/01-preserve-wide.svg)

A proposed review workflow. Text matching does not certify a correction.

After a text revision, use the [transcript correction and coded-quote exercise](/qualitative-transcript-corrections) to check missing, shifted and repeated quotations.
