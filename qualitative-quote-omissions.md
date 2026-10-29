# Transcript Gaps and Shortened Quotes: Mark the Difference

Canonical: <https://instascript.app/qualitative-quote-omissions>

For qualitative research transcription, keep an unresolved gap in the transcript distinct from a deliberate cut in a published quotation. Preserve the source version, mark what is unknown, and record each editorial cut separately. An ellipsis cannot tell readers who removed words or whether those words were ever understood. Check the surrounding meaning before using a shortened extract.

[Download the omission-review worksheet](/data/qualitative-quote-omissions-worksheet.md)

## What kind of missing text is this?

A transcript gap records a limit in the available text: speech may be unclear, an identifier may have been removed, or a segment may not have been transcribed. An editorial omission happens later, when an author leaves known text out of an extract. These decisions need different explanations even if a project uses visually similar punctuation. Establish a notation key and follow the conventions appropriate to the study and publication.

The [Oxford methods paper's Table 1](https://academic.oup.com/eurjcn/article/23/5/553/7601062) already distinguishes unclear speech and author omissions. Its discussion also emphasizes checking context against recordings. [Harvard's transcription guidance](https://guides.library.harvard.edu/c.php?g=796889&p=10476360) ties transcription decisions to the study's methodology. Our exercise below adds a small inspectable ledger; it is not a new universal notation system.

## Our fictional pair: unknown words are not a deliberate cut

![Name the missing text](/assets/research-omissions/01-distinguish-wide.svg)

Invented text; no participant or recording.

All text, labels and versions in this exercise are invented. There is no participant or recording, and no claim that a person checked speech. Record A is EXCERPT-A, V1: “I kept the paper card because the screen was hard to read, but I still used the screen at home.” Record B is EXCERPT-B, V1: “I kept the [inaudible] card for later.” In this exercise only, [inaudible] means unresolved words, while […] means known text deliberately omitted from an extract.

| Record | Source text state | Proposed extract | What the record says |
| --- | --- | --- | --- |
| A, V1 | All words supplied in the fictional text | I kept the paper card […] but I still used the screen at home. | One deliberate internal cut; context review pending |
| B, V1 | [inaudible] remains unresolved | I kept the [inaudible] card for later. | No editorial cut; unknown words stay visible |
| B, V1, unsafe | Unknown span hidden | I kept the […] card for later. | Rejected by this exercise: unknown text recast as an editorial omission |

For A, the cut removes “ because the screen was hard to read, ” while retaining both the paper-card preference and continued screen use. That does not establish suitability for a real argument. The author still needs to decide whether removing the explanation changes what the quotation supports. For B, do not invent the missing word or silently present the remaining text as a fully understood passage.

Our notation key separates the reason for missing text from its appearance. A real project may also need separate labels for a pause, withheld identifying detail or an untranscribed section. This fixture handles only its declared unresolved marker; it cannot discover other kinds of gap. If a source already contains an ellipsis, preserve its origin in the note rather than assuming it was added by the current author.

## Our reproducible check: positions establish a cut, not its meaning

![Keep the cut inspectable](/assets/research-omissions/02-ledger-wide.svg)

Consistency checks do not establish meaning.

Download the [fictional records and actual output](/data/qualitative-quote-omissions-example.json) and the [standalone Node exercise](/data/qualitative-quote-omissions-reproduce.cjs). Run the script with Node. It prints embedded invented records and checks without reading research files or contacting a server. Each retained span uses zero-based JavaScript string positions with an exclusive end. The ledger records the exact text between retained spans, alongside the source reference and version.

The script reconstructs A from two ordered spans, inserts the declared editorial marker and compares the removed interval with the cut ledger. It also preserves B unchanged. Negative examples test a wrong version, missing cut record, altered cut text, reversed or overlapping spans, a range outside the source, silently omitted text and hiding B's unresolved marker. These are consistency checks for the teaching fixture, not an automatic review of scholarly quotations.

Our counterexample makes that limit explicit. A separate invented source says “I did not prefer the screen.” Retaining “I did” and “prefer the screen.” produces “I did […] prefer the screen.” The positions and deletion ledger are consistent, so the mechanical check accepts it. Yet deleting the negation reverses the statement. The exercise labels this result as mechanically accepted and unsuitable in meaning; it does not pretend that code discovered the reversal.

The distinction matters when designing a review process: a passed string check belongs in a different field from a decision about meaning. Do not automatically approve an extract because the words can be traced. For a source spanning subtitle segments, use the separate [cross-cue quotation exercise](/qualitative-cross-cue-quotes); its timing envelope cannot establish whether an omission is justified either.

## Our worksheet: keep two decisions visible

![Review meaning separately](/assets/research-omissions/03-meaning-wide.svg)

The reversal label is authored, not detected by code.

Use the [blank omission-review worksheet](/data/qualitative-quote-omissions-worksheet.md) for a manual review. First enter the source reference, exact version, full passage and notation key in the project's permitted storage. Record unresolved material as unresolved. Then enter the proposed extract, ordered retained spans, each removed interval and its stated reason. Include a field identifying whether an omission originated in the transcript or was introduced during preparation of the extract.

Keep separate fields for mechanical consistency and contextual review. For A, the former can say “matches the fictional ledger”; the latter remains pending until the proposed use is examined. For B, the preserved marker identifies the unresolved source text. For the negation counterexample, record “mechanically consistent” beside “reject: reverses the statement.” This makes disagreement visible without overwriting the source or turning a check result into approval.

Before using an extract, compare it with the surrounding passage and the argument it is supposed to support. Check whether a qualification, negation, speaker change or explanation disappeared. If the text version changes, rebuild the span record against that version and review again. If permission, context or the source is unavailable, leave the decision pending. This public worksheet provides no secure storage, disclosure review or participant authorization.

## Must every project use the same ellipsis?

No. The [Australian Government Style Manual](https://www.stylemanual.gov.au/grammar-punctuation-and-conventions/punctuation/ellipses) explains ellipses for omissions and unfinished expressions, and identifies ellipses already present in a source. The Oxford table presents a bracketed omission convention. Use the applicable publication style and explain your transcription key. Punctuation alone is not enough to reconstruct the preparation history.

## Can InstaScript approve an edited research quotation?

No. This page offers a manual guide and invented consistency exercise. The [local audio tool](/audio-to-text) can prepare an English speech draft from a browser-decodable file up to 100 MB; it does not decide how a researcher should report an extract. First use downloads model resources, and cached resources can still require initialization. Local files and edits remain in the browser. Instagram fetching uses servers; YouTube tools read existing captions and successful queries may be cached for one hour. See the [privacy policy](/privacy).
