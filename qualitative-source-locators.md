# Deidentified Transcripts: Keep a Restricted Source Locator

Canonical: <https://instascript.app/qualitative-source-locators>

For qualitative research transcription, label the working copy with a project reference and keep the source mapping in a separately protected record, under your project's permissions and retention rules. Check the reference and version before an authorized reviewer uses the locator. A code is not proof of anonymity: narrative details, metadata and recordings can still identify people.

[Download the blank source-locator worksheet](/data/qualitative-source-locators-worksheet.md)

## What belongs in each record?

A working copy can contain a project reference, its version, the prepared text and the state of disclosure review. A separately protected mapping can hold the corresponding source identifier and a location for authorized review. Whether anyone may retain, link, consult or share these materials depends on the project’s consent, approvals and rules. The mapping itself can be sensitive. Separating files is an organizational step; access controls and the review of what is actually shared still matter.

[ATLAS.ti's formatting guide](https://atlasti.com/guides/interview-analysis-guide/transcription-formatting) already discusses generalizing or removing identifying details. [Research data guidance](https://www.eur.nl/en/research/research-services/research-data-management/anonymisation-research-data/qualitative-data) recommends storing a replacement log securely and separately, and reassessing remaining risk. The illustration below turns the narrower source-locator question into a fictional check; it is not a validated privacy method.

## Our fictional exercise: one copy, one restricted mapping

![Keep the source mapping separate](/assets/research-locators/01-separate-wide.svg?v=20261028)

Fictional exercise. No participant or recording.

Everything in this example is invented: the labels, excerpt, version and times. There is no recording or participant. The working copy is CASE-X7, version V1, with the sentence “I waited at [place removed] before the appointment.” The bracket indicates a fictional removal; it does not tell us what was removed. Review remains pending.

| Working copy | Value | Restricted mapping | Value |
| --- | --- | --- | --- |
| Reference | CASE-X7 | Reference | CASE-X7 |
| Version | V1 | Version | V1 |
| Text | I waited at [place removed] before the appointment. | Source | SOURCE-R2 |
| Disclosure review | pending | Replay range | 42–50 seconds, invented |

In the exercise, an authorized reviewer compares both reference and version before consulting the restricted mapping. The resulting locator points to SOURCE-R2 at 42–50 seconds. It is a fictional pointer, not evidence that an actual source exists or that the words were checked. The working copy does not contain that source field or range. For a real project, avoid exposing source paths, identifying filenames or the mapping to people who are not authorized to receive them.

The same case reference on different transcript versions is not enough to choose a locator. Suppose the working text is V2 but the mapping says V1: the exercise returns unresolved. Do not silently apply the older interval to a changed recording or version. The permitted reviewer must investigate the source and document a new mapping when appropriate.

## Our reproducible check: stop when a link is ambiguous

![Resolve one reference and version](/assets/research-locators/02-check-wide.svg?v=20261028)

A matching record does not establish permission.

Download the [fictional example JSON](/data/qualitative-source-locators-example.json) and the [standalone Node check](/data/qualitative-source-locators-reproduce.cjs). Run the check with Node to print the embedded records and test results. It reads no research files and makes no network requests. The standalone example uses only the invented records above. A matching reference and version resolves to one invented range. Four alternatives deliberately return unresolved: no record, a version mismatch, duplicate matching records and a zero-length interval. A separate check confirms that the example working object has no source or time fields. It does not inspect a real document, metadata, or access permissions.

These checks show only that a small fixture follows its stated rules. They cannot verify that a person is authorized, that a source actually exists, that a time range contains the excerpt, or that a transcript is safe to share. A case reference can itself become identifying when joined with other information. Treat the output as a teaching exercise, not a security or anonymization assessment.

## Our worksheet: resolve or leave pending

![Keep ambiguous links unresolved](/assets/research-locators/03-pending-wide.svg?v=20261028)

Codes alone do not make a transcript anonymous.

Use the [blank source-locator worksheet](/data/qualitative-source-locators-worksheet.md) to prepare two records according to your institution's approved storage and access arrangements. In the working record, note the reference, version, prepared excerpt and review status. In the restricted record, note the corresponding reference and version, source identifier, locator, authorized access and retention rule. Do not place real keys or research content in this public example.

A reviewer can ask: Does exactly one permitted mapping match this reference and version? Is the locator valid for that source? Has the prepared copy and its metadata been reviewed for direct and indirect identifiers? Does the proposed use fit the participant information and project approval? If any answer is unknown, leave the relevant step pending and follow the project’s review process. An internally consistent mapping does not answer the disclosure questions.

If the text or source changes, record the new version and recheck the locator. Avoid treating an old position as durable simply because its case label still matches. For another versioning problem, the [transcript corrections guide](/qualitative-transcript-corrections) shows how quotations can shift or disappear after a revision.

## Does a pseudonym make the copy anonymous?

No. A name can be removed while an unusual role, location, event or combination of details still points to a person. The [Oxford study on qualitative deidentification](https://academic.oup.com/jamiaopen/article/4/3/ooab069/6356665) examines identifiers beyond standard clinical categories. The [qualitative data sharing lesson](https://managing-qualitative-data.org/modules/3/b/) also warns about metadata and explains why a linking key should not be included with shared data. Evaluate the whole record and intended audience, not just the name field.

## Does InstaScript store the mapping?

No. This is a manual research guide; InstaScript does not provide project accounts, a source-key vault, access permissions or saved research history. Its [Audio to Text tool](/audio-to-text) creates English drafts from browser-decodable local files up to 100 MB; actual format decoding depends on the browser. Model resources download on first use and cached resources may still need initialization. Local files and transcript edits stay in the browser. Instagram URL fetching involves servers; YouTube tools retrieve existing captions and successful queries may be cached for one hour. See the [privacy policy](/privacy).
