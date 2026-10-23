# Verbatim style exercise: source, convention and export verification

Created and published for InstaScript on 2026-10-23. Original fictional script, no participant recording, personal data or third-party video text. One installed Microsoft Zira Desktop en-US synthetic voice, Windows System.Speech, rate -1. This is an authored editing demonstration, not an automatic speech-recognition or accuracy benchmark.

## Spoken script and recording construction

Um, I, I saved the draft.

We can send it Friday, no, Monday.

I think the label is blue.

Please do not remove the word not.

Each phrase was synthesized as PCM WAV. Segment PCM byte length divided by byte rate gives its actual duration; one second of silent PCM was inserted between adjacent segments. The resulting WAV duration is 15.856371882086169 seconds (Chrome media duration 15.856372). Cue boundaries are these authored phrase windows rounded to milliseconds, not ASR word alignment or a measurement of natural human hesitation. The synthesized voice does not model human stuttering, emotion, laughter or overlapping conversation. No non-speech event is invented in the transcript.

## Actual editor operation

The full SRT was authored from the synthetic spoken script and constructed segment boundaries. It was pasted into the live Subtitle Editor, loaded into four rows, and the WAV was opened locally. The actual Play cue 2 control was clicked; media currentTime was observed at 4.636235 seconds after seeking to the second phrase window. Full SRT was downloaded. Only the first Caption field was manually changed to I saved the draft. Clean SRT was then downloaded. Files were read back from Chrome's actual subtitles SRT downloads, matched to the authored sample, and renamed full-verbatim.srt and clean-verbatim.srt. They are real editor downloads, not merely programmatic serialization substitutes. Clipboard readback was empty in this run, so Copy equality is not claimed.

The first cue removes Um, and one repeated I,. All other words, including Friday, no, Monday, I think, and both not tokens remain. No grammar rewriting or summary. All four starts and ends compare equal across actual exported files: 0.000–3.574, 4.574–8.538, 9.538–11.922, 12.922–15.856 seconds. These source-derived values are specific to this WAV. Equal boundaries do not prove word-level alignment or subtitle readability.

## Convention and limits

Full retains all words in the authored synthetic script. Clean removes only the isolated filler and accidental repeated pronoun. Intelligent follows the same conservative clean convention in this exercise; no third derivative is manufactured to imply a universal distinction. For real work, obtain the required written specification. This sample is not certified, a legal record, or a claim that the site automatically preserves every filler. Local editor import, replay, text edits and exports stay in the browser. The public assets here are deliberately published teaching materials.
