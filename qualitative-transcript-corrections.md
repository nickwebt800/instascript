# Transcript Corrections: Keep Coded Quotes Traceable

Canonical: <https://instascript.app/qualitative-transcript-corrections>

Save both versions, locate every changed quote, and review affected codes before carrying them into the corrected transcript.

A correction to qualitative research transcription can leave an older analytical excerpt pointing at the wrong characters. Keep the old excerpt intact, record the new wording separately, and decide whether the code still applies. This guide supplies a fictional before-and-after exercise you can inspect, rather than another definition of qualitative coding.

## What should stay attached to a coded quotation?

Retain a source identifier, transcript version, exact excerpt, passage locator, code and review decision. If a real recording exists, retain its source time as well. A character position locates text inside a particular file; it does not locate a spoken word in the recording. Keep those two kinds of locator separate.

The [qualitative research transcription guide](/qualitative-research-transcription) compares actual recognition disagreements. Here the task begins after somebody proposes a corrected text. The question is which existing quotations need attention, not which recognition model is right.

The [Oxford transcription methods article](https://academic.oup.com/fampra/article/25/2/127/497632) explains why representing speech involves interpretive decisions. The [ATLAS.ti documentation guide](https://atlasti.com/research-hub/data-documentation-qualitative-research) covers recording sources, preparation and changes. Our exercise below adds a small, reproducible quotation-migration record. It does not claim that version histories or transcript review are new ideas.

## Our exercise: one revision, three different review decisions

**Everything in this exercise is authored fictional training text.** There is no participant, source recording or speech-recognition run behind these sentences. The second version is a proposed edit for demonstrating review behavior, not a claim that anyone checked the words against audio. Its details must not be entered into a real study as evidence.

Version training-v1 reads: **I take the bus unless the route is cancelled. The clinic opens at nine. I wait outside.**

Version training-v2 reads: **I take the bus only if the route is running. On weekdays: The clinic opens at nine. I wait outside. I wait outside.**

We saved both complete strings and ran an exact-text lookup for the three old excerpts in training-v2. The [downloadable exercise record](/data/qualitative-transcript-corrections-example.json) contains the original positions, all new matches, file-text hashes and pending decisions. Positions start at zero and end just after the selected text. These ASCII-only strings avoid differences between character and UTF-16 code-unit counts.

| Quote and old code | Old span in training-v1 | Exact matches in training-v2 | Review action |
|---|---|---|---|
| Q1: unless the route is cancelled; exception condition | 15 to 44 | No exact match | Read the changed condition and reconsider the code; leave migration pending. |
| Q2: The clinic opens at nine.; opening time | 46 to 71 | One match, starting at 58 | Relocate the excerpt, then review the added weekday context. |
| Q3: I wait outside.; waiting location | 72 to 87 | Two matches, starting at 84 and 100 | Resolve which occurrence is intended; do not silently choose the first. |

The lookup reports a textual relationship between these particular strings. It does not accept the proposed edit, check its factual accuracy, or establish that the old code belongs on the new passage. All three example decisions remain pending for that reason.

## Why copying the old position fails

Q2 contains the same exact sentence in both versions, but the insertion before it shifts its start from 46 to 58. Reusing the old span 46 to 71 against training-v2 selects **n weekdays: The clinic op**. That is a piece of a different string, not the old quotation.

The changed condition earlier in the paragraph is not the only issue. Even a harmless-looking insertion can move every later character position. Therefore a successful file import or a visible code label is insufficient evidence that an excerpt survived a revision. Inspect the actual selected text.

In this exercise, locating Q2 at its new match gives the original sentence back. However, the added weekday phrase changes its surrounding context. Keep the code decision separate from the successful lookup: finding identical words establishes a match, not the scope of the opening-time claim.

## Why a unique match and a repeated match need different handling

Q1 has no exact match because its condition was rewritten. Do not replace it with a vaguely similar phrase and call that an unchanged quote. Preserve the old coded excerpt, record the proposed new excerpt, and write down whether the existing inclusion rule still fits. Without the recording or another authorized reference, this exercise cannot decide whether the edit itself is justified.

Q3 creates the opposite problem. Its old words occur twice in the new version. A search can list both positions, but those positions do not tell you which passage the earlier annotation intended. Retain the neighboring sentences or source locator and resolve the ambiguity explicitly. Choosing the first match automatically would hide a decision inside a technical convenience.

Use the [blank quotation review worksheet](/data/qualitative-transcript-corrections-worksheet.md) for each affected excerpt. It separates a wording change, a locator repair, a code decision and a reviewer sign-off. A postponed decision is a useful recorded state; it should not look like an approved code transfer.

## How can I repeat the exercise?

Download the [standalone reproduction script](/data/qualitative-transcript-corrections-reproduce.cjs) and run it with Node.js. It uses only the built-in crypto module, prints the two text versions, their SHA256 hashes and every exact-match position, and makes no network request. Compare its output with the exercise JSON. This is a text-position demonstration, not a test of any qualitative analysis application's import or quotation-repair behavior.

For your own material, use an approved local process and keep access appropriate to the project. Do not paste confidential research text into this public demonstration record or submit it to an unapproved service. The [Harvard recording and transcription guide](https://guides.library.harvard.edu/c.php?g=796889&p=10476360) provides broader preparation and tool-selection context.

## Can InstaScript migrate my research codes automatically?

No. InstaScript can produce an editable English speech draft from supported local recordings; it does not import a research project's codebook, track quotation identities across versions, verify speakers or apply research codes. Local media processing and transcript edits stay in the browser. The JSON and worksheet on this page are public fictional examples for manual review, not a project history saved by the site.

## Should I delete the old coded transcript after correcting it?

Keep the version needed to understand the earlier analysis under your project's retention and access rules. Record the revision and the review of affected quotations separately. The practical endpoint of this exercise is modest: another reviewer can distinguish an old excerpt, a new candidate location and a decision that still needs a person. No corrected sentence silently becomes a new research finding.

![Preserve both text versions, locate the quotation, then review its code.](/assets/research-corrections/01-preserve-wide.svg)

A proposed review workflow. Text matching does not certify a correction.

![Fictional quotation Q2 moves from character 46 to 58 after an insertion.](/assets/research-corrections/02-locate-wide.svg)

Fictional exercise: a surviving sentence can have a different text position.

![Absent, unique and repeated matches require different manual review decisions.](/assets/research-corrections/03-decide-wide.svg)

All code transfers in this exercise remain pending.

![Keep replay separate from selection](/assets/research-cross-cue/02-locate-wide.svg)

Invented cue bounds yield a broad 10-to-17-second envelope; the 0.4-second gap is unresolved. Fictional exercise; no recording.

A quotation spanning more than one cue needs a text-selection map as well as a replay locator. Try the [cross-cue passage worksheet](/qualitative-cross-cue-quotes).
