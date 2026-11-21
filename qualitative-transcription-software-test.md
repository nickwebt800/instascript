# Choosing Transcription Software: Test Required Evidence Before Scoring Features

Choose a transcription workflow by testing the requirements your project cannot do without. Use the same permitted sample, inspect the saved output in the intended destination, and retain failures and untested steps. A feature score cannot compensate for a failed requirement. No software winner has been established by the component exercise below.

## Declare a decision before trying the tool

Write down what must survive the workflow. If you need timed text in a particular analysis application, the requirement is not simply that a download button says SRT. Define what you expect to see after import: the required passages, usable times, and whatever source association your project needs. Check those observations separately. If speaker identities matter, require a speaker review step; do not treat a plausible name in generated text as evidence of identity.

Keep processing approval in its own field. An upload that technically succeeds does not establish permission to send study recordings to that service. Use permitted public material or an explicitly fictional text fixture for planning, and reserve private study material for an approved route.

Surrey's CAQDAS selection guidance supports considering the project, data and working needs and trying developer demonstrations. It is guidance about analysis software selection, not a validation of transcription engines. Harvard's recording and transcription guide connects transcription choices to the study's methodological approach and notes the need to revise automatic output. Neither source establishes a universal best product.



## Original exercise: the same component, two input conditions

This fictional workshop example contains no recorded speech. The first line is “The workshop opens on Friday.” The second is “Only if the room is available.” Invented cue ranges are 0–2 and 2.5–5 seconds. They are test inputs, not measured utterance boundaries or verified speech.

The declared component requirement is that both cue texts and both time ranges survive serialization and parsing. We executed the current InstaScript SRT serializer and its shared parser in Node. The complete input produced a 126-byte SRT file, and the parsed cues matched the input exactly. The linked sample and observation record expose the exact test input and its narrow result.

For the second input, we deliberately removed the second cue's end time. Export refused that input with a timing error. Under the declared requirement to deliver a complete timed file, this input cannot pass. Refusal is appropriate application behavior: the exercise does not mark the software defective or authorize inventing a missing time. Repair requires evidence for the missing boundary or a different, explicitly accepted requirement.

This is one component with two input states. These are not two products, two recognition runs or an accuracy comparison. Serializer and parser belong to the same implementation family. Agreement between them does not prove that a third-party importer handles the file correctly. The component roundtrip alone does not establish a browser download or external application result. The separate QualCoder observations below test a narrower destination route; speech recognition, speaker identity and processing approval remain untested.



## Keep the decision pending when evidence is missing

The original policy exercise treats every declared requirement as pass, fail or untested. One failed requirement makes the tested configuration ineligible under that requirement set. An untested requirement keeps the decision pending. Only when all required conditions pass does the policy call the configuration eligible for those declared conditions. Eligibility is not a market ranking or general endorsement.

The seven policy checks include a pass plus an untested downstream import, which remains pending, and a failed component requirement plus an untested import, which remains ineligible. Optional conveniences are deliberately absent from this decision. You can compare them after establishing the required conditions, while retaining the scope and date of every observation.

This differs from recording what plain text loses: the question here is whether the evidence is sufficient to make a selection decision at all. It also differs from checking an account's processing route. A route can be approved while an import requirement remains untested. A component can pass while policy approval remains unknown. Preserve those independent findings.


## Original destination observation: QualCoder 4.0, two routes

On November 14, 2026, we opened the official Windows portable release of QualCoder 4.0 and created a new, isolated project. The fixture contains no research participants or recording. We first chose Manage, Files, Import, selected All Files, and selected the exact 126-byte complete.srt created by our component experiment. The application displayed “Not supported file type” and “Cannot import file.” The project retained zero files. This direct-file route did not meet the declared requirement to import the two timed passages. It is not a test of recognition quality or every QualCoder import route.

Before a second test, we declared a different condition: preserve the literal text through plain-text import and a project close/reopen. We copied the same bytes to workshop-timecodes.txt. Its SHA-256 stayed 0d37291844c7cf85d1338a3b90afb0bb66579eeb4b518a6de326926344566043. This is an explicit change of input configuration, not a successful retry of direct SRT import.

The TXT file appeared as one imported file. Opening it showed both invented sentences in order and the literal ranges 00:00:00,000 --> 00:00:02,000 and 00:00:02,500 --> 00:00:05,000. We confirmed the text dialog, closed the project, reopened the same project directory, returned to Files, and opened the imported text again. The same sentences and timecode strings remained visible. That observation passes this narrow text-persistence condition. The strings were displayed in a text editor; we did not demonstrate clickable media locations, parsed interval objects or source-linked playback. There is no recording in the fixture to verify them against.

![Separate the observed import routes](/assets/g03-routes-wide.svg)

| Declared condition | Actual observation | Consequence |
|---|---|---|
| Direct import of complete.srt as the required timed transcript | Unsupported-file warning; zero imported files | This tested route fails that condition |
| Import workshop-timecodes.txt as literal text | Both sentences and timecode strings visible | Text-only condition passes on import |
| Preserve that text after project close/reopen | Same content visible after reopening | Narrow text-persistence condition passes |
| Navigate the correct recording from these timecodes | No recording; not tested | Remains untested |
| Actual browser-download artifact | Operator supplied the saved download; bytes matched; direct import was tested again | Artifact checked; direct SRT import still refused |

The desktop result changes a selection decision that a serializer/parser roundtrip cannot settle: an internally valid SRT can still be refused by a specific destination's direct-file importer. A plain-text alternative can preserve readable syntax without meeting a requirement for usable timed media navigation. Neither result identifies a universal best tool. Retain the failed condition rather than allowing a convenience score or a successful text-only path to erase it.

![Observe import and reopen independently](/assets/g03-reopen-verified-wide.svg)

QualCoder's documentation describes a separate media-associated transcript path and SRT used alongside a video. We did not execute that path. Do not infer from this direct-file rejection that the application cannot work with timecoded transcription at all. The requirement record must name both product version and actual route.

## Actual download follow-up

On November 15, the operator supplied the saved file from a manual browser download. We read that actual file: 126 bytes, with the same SHA-256 as the component fixture. Both sentences and all four literal boundaries matched. We then selected that actual downloaded SRT in QualCoder's same file-import command. The unsupported-file warning appeared again; no new file was added. The existing TXT record remained separate.

This resolves access to the download artifact, with operator-assisted provenance rather than an automated download-event capture. The earlier event timeout remains in our record. The observed end-to-end attempt ends in a refused direct import; it is not a successful timed-import chain. Byte identity also connects this download to the separately tested TXT alternative, whose literal text persisted after project close/reopen. No playable recording association was established.

## Use a requirement record

For each candidate, record the exact workflow and version, requirement, test input alias, expected observation, actual observation, saved artifact, result, test date and next action. Keep fictional aliases separate from private study identifiers. The companion worksheet is blank by design; it does not invent comparative product results.

Before recommending a tool from this exercise, check any required speech, speaker and media-navigation behavior with permitted material. A rejected direct-import condition remains rejected. Keep untested candidates unranked. InstaScript's local-file speech recognition is English-only; this component exercise does not widen that language support or measure recognition quality or speed.

Sources: [Surrey selection guidance](https://www.surrey.ac.uk/computer-assisted-qualitative-data-analysis/resources/choosing-appropriate-caqdas-package), [Harvard recording and transcription](https://guides.library.harvard.edu/c.php?g=796889&p=10476360). Surrey/Harvard sources checked November 9; QualCoder documentation checked November 14, 2026. [QualCoder official documentation](https://qualcoder.org/doc/en/print/). The figures and worksheet are original; no human transcript verification is claimed.


## Download the exercise materials

- [Blank destination worksheet](/data/qualitative-transcription-software-test-worksheet.csv)
- [Fictional SRT sample](/data/qualitative-transcription-software-test-sample.srt)
- [Separate TXT alternative](/data/qualitative-transcription-software-test-sample.txt)
- [Observation record](/data/qualitative-transcription-software-test-observations.json)

Related: [plain-text export review](/qualitative-plain-text-handoff), [privacy](/privacy).


## Can I use ChatGPT for qualitative research transcription?

Some ChatGPT routes can transcribe audio, but the product surface and available tools matter. Check the route you will actually use, retain a transcript rather than only a summary, and review it against permitted source audio. An attachment preview alone does not establish that transcription ran. This November 21, 2026 supplement is a documentation review and fictional planning exercise, not a ChatGPT transcription test.

[Download the route worksheet](/data/qualitative-chatgpt-route-worksheet.csv). Keep this route check alongside the destination test above: receiving text and importing usable evidence are separate observations.

### Which ChatGPT route does the documentation describe?

[OpenAI's upload documentation](https://help.openai.com/en/articles/8555545-uploading-files-and-audio-to-chatgpt) describes eligible paid Chat users using GPT-6 at Instant for attached-audio transcription, subject to availability. It explicitly separates attachment or preview success from transcription support, and says this uploaded-audio capability is unavailable in Work and Codex. Do not transfer a successful Chat observation to another surface. Model availability by itself is insufficient.

[ChatGPT Record documentation](https://help.openai.com/en/articles/11487532-chatgpt-record) describes a recording workflow with transcripts and generated notes, currently identifying the macOS app as its surface. Its introductory availability statements differ in scope, so confirm the actual workspace and client before planning a session. We did not resolve that difference through an account test. Generated notes are a separate artifact from a transcript.

[Voice Dictation documentation](https://help.openai.com/en/articles/12168547-voice-dictation-faq) describes recording a prompt, receiving editable text, and sending that text as a message. It also describes sending audio for transcription and retaining associated audio with chat history. This is a different workflow from testing an existing interview file or Record session. These documentation statements do not establish approval to process study data.

The three descriptions answer different questions about input and output. Record the exact route instead of writing only a product name. We have not tested their accuracy, speaker attribution, export formats, retention in a particular account, or behavior on long interviews. Check current documentation and your actual account when using the worksheet. Limits and availability can change.

![Name the route before observing an artifact](/assets/research-chatgpt-route/01-narrow.svg)

### Our fictional route cards: one request, three different observations

The authored fixture is BEACON-G05. There is no recording, participant, account session or model response behind these cards. The invented request is to retain an interview transcript for later review. All observations below are fictional teaching inputs. A card is a record supplied to the exercise, not evidence that a real product produced its contents.

Card A names an attached-recording route in an invented Chat session. Its observation is a preview, with no transcript artifact retained. The exercise reports preview-only. That result leaves the transcript request unestablished. It does not mean the service rejected the file or can never transcribe it. A reviewer would next request the transcript on the eligible route and record the actual response; they would not promote the preview into a completed transcription.

Card B names an invented Record session. A generated-notes artifact is retained, but no transcript artifact is retained in the card. The exercise reports notes-only. A concise note may be useful, but its presence does not answer whether the transcript is available. The next action is to locate and inspect the transcript separately. This card does not claim that actual Record omits transcripts; its supplied observation is deliberately incomplete.

Card C names an invented attached-recording session in Chat and retains an artifact explicitly declared to be transcript text. The exercise reports transcript-present, with source review pending. The declaration says what the author recorded, not whether the words are accurate. We cannot check speech, speaker identities or missing passages without a source. A transcript artifact can be present while evidence review remains incomplete.

Now copy Card C but change its requested surface to Work while keeping the observation's surface as Chat. The exercise refuses that association. An observation from one surface cannot settle another surface's capability. A second counterexample changes only the recorded session ID; it is also refused. These failures address evidence belonging to the wrong route or session, without pretending to detect whether a real transcript is correct.

![Keep the observation and its limits together](/assets/research-chatgpt-route/02-narrow.svg)

### Our reproducible checks and blank worksheet

Download the [standalone Node exercise](/data/qualitative-chatgpt-route-reproduce.cjs) and [actual exercise output](/data/qualitative-chatgpt-route-example.json). The script uses embedded fictional records and sends no requests. It checks matching route fingerprints, observation categories, artifact references and the absence of a completed source-review claim. It deliberately does not infer an artifact's type from a filename, recognize speech, call ChatGPT or inspect any private file.

The route fingerprint contains the surface, mode, client and session alias. Changing any of those fields requires its own observation. The script refuses mismatches and unknown artifact categories. An artifact category is a manually supplied label; a passing check cannot prove that someone inspected the artifact or that its label is correct. The exercise helps expose missing evidence rather than manufacture it.

Use the blank worksheet to record the requested route, the observed route, observation date, permitted sample alias, requested output, observed artifact category, retained artifact reference, and source-review status. Keep documentation evidence and an executed test in separate fields. Write not tested when the route was not executed; do not record a product failure merely because the current device or account did not expose it.

For a real workflow, retain the unmodified transcript output before making analysis notes. Review important passages against the recording, record unresolved wording and inspect the output in its actual destination. Keep a summary separately labelled even if it appears in the same conversation. If the required route cannot be accessed, leave that row untested and compare only the evidence actually collected.

This addition does not change the QualCoder observations above or establish a software winner. InstaScript's browser speech workflow remains English-only, for browser-decodable local media up to 100 MB, with local files processed on-device. It does not operate ChatGPT, identify research participants or certify any external processing route. Our worksheet is a manual companion, with no upload form or account history.

### Questions before using the worksheet

**Does seeing the recording in an attachment prove transcription completed?** No. Retain the actual transcript response from the intended route; a preview is a separate observation.

**Does a generated summary satisfy a transcript requirement?** Its presence alone does not. Inspect and retain the transcript artifact separately, then review it against the permitted source.

**Was ChatGPT tested in this supplement?** No. Official documents were read on November 21, 2026. The three BEACON-G05 cards and their outputs are authored fiction; the Node checks test record consistency only.
