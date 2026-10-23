# Interview Transcription: Make a Draft You Can Check

Canonical: <https://instascript.app/interview-transcription>

To transcribe an interview for free, open Audio to Text, choose your English recording, select Transcribe this file, then replay and correct the draft before downloading it.

[Open the free transcription tool](/audio-to-text#walkthrough-tool)

No account or payment is required for the local tool. Your recording stays in your browser. First use may download the language-check and English speech models; wait for a result or a specific error before treating the task as complete.

## Start with the recording you actually have

Save a complete audio or video file that you are allowed to process. Open the tool, choose that file and select **Transcribe this file**. This page hands off to the existing local tool; it does not join an interview, import a private sharing link or record a live call. For a phone recording, the [phone call transcription guide](/phone-call-transcription) explains the capture boundary. A saved memo can also start in [Voice Memo to Text](/voice-memo-to-text).

Listen to the opening and ending before recognition. Keep the original when preparing an audio copy. If you trim the recording, its transcript timestamps refer to the trimmed copy. Do not attach those times to another edit of the interview without checking them against that version.

## A recording-to-download check you can repeat

The files below come from an authored, fictional exchange rendered with a synthetic English voice. One voice reads both roles; this is not a real participant interview, a speaker-identification test or an accuracy benchmark. [Play or save the exercise recording](/assets/interview/fictional-interview.wav) and inspect its [source and method](/assets/interview/SOURCE.md).

The question is “Did you approve the Friday release?” The reply is “No. I approved the review, not the release.” In the actual recognition draft, the reply begins “No I approved the review.” and the next cue contains “Not the release.” Read together, those cues reject release approval. Quoting just the middle clause would remove the correction that gives the answer its meaning.

We searched **review** in the result, replayed its timestamp, and changed the first reply cue to **No. I approved the review.** The added stop is a manual punctuation edit. The following negative statement remains in its own cue. We then used Copy and downloaded TXT, Markdown, SRT and VTT. Opening the actual files confirmed that the correction remained in the exports; changing text did not change the cue times.

Compare the [recognition TXT](/assets/interview/recognized.txt), [reviewed TXT](/assets/interview/reviewed.txt), [reviewed Markdown](/assets/interview/reviewed.md), [reviewed SRT](/assets/interview/reviewed.srt) and [reviewed VTT](/assets/interview/reviewed.vtt). These are inspectable outputs from this exercise, not proposed transcripts or invented alignment times. In the SRT, locate the corrected reply and the next cue; compare both with the recording. In TXT, check that the same words survive even though cue boundaries are absent.

## Build a question-to-evidence review card

Before quoting an interview, make a small note beside the passage with four fields: **question asked**, **answer plus correction**, **recording position**, and **unresolved detail**. Fill these from the recording rather than from the smoothness of the generated prose. The card is a manual review aid; the website does not generate it or certify the conclusion.

For the exercise, write the question as release approval, the answer as review approval only, and keep the explicit refusal of release approval alongside it. Use the reply cue as the route back to the sound. Do not turn that cue into a wall-clock meeting time or a position in the untrimmed source unless you have checked that relationship.

For an actual interview, listen to the question before the answer and continue through any correction after it. A reply such as “yes” has little meaning without the question it answers. Keep uncertain names unresolved when the sound does not establish them. If you later replace a participant name with a pseudonym, mark that as an editorial change in your own working record; it is not something the recognizer heard.

Finish by opening your saved file and reading the passage again. Confirm that its wording includes the correction, that the source recording is still available to you, and that any interpretation is separate from the transcript. A successful download proves that a file was saved, not that the interpretation inside it is justified.

## When words are usable but subtitle timing is not

Copy, TXT and Markdown preserve the current edited words. Their timestamp option adds available start times; it does not create missing end times or run recognition again. SRT, VTT and **Open in Subtitle Editor** require nonempty cue text and complete valid start and end times.

A separate validation check with a missing cue end rejected subtitle serialization while retaining a plain-text reading copy. That is a deliberately constructed validation case, not a failure observed in the fictional recording. The downloadable exercise above had complete times. Keeping these cases separate prevents a working example from becoming a claim that every future result can be exported as subtitles.

If your result lacks valid times, save the usable words as TXT or Markdown and retain the audio for review. Do not invent a last end time to unlock SRT. If you need a timed deliverable, review and author the timings against the recording in an appropriate editor. Editing a word alone does not repair timing. An estimated timeline made from plain text is also not evidence that the words line up with the interview.

## Research interview transcription

An interview transcript records an exchange; a research interview transcript must also fit the study's chosen transcription convention. Decide whether the analysis needs exact repetitions, false starts and pauses or a more readable working copy, and retain the recording so those decisions can be checked. The [Harvard recording and transcription guide](https://guides.library.harvard.edu/c.php?g=796889&p=10476360) connects transcription choices to research methodology.

InstaScript supplies an English speech draft and local editing. It does not perform research coding, identify participants or automatically anonymize them. Keep participant identity information and your interpretations separate from the reviewed words, and use only a workflow permitted by your study's data-handling rules.

## Focus group transcription

A focus group adds a different problem: turns can overlap, a short response may answer another participant, and an apparent agreement may be only a backchannel. Keep those limitations visible instead of formatting the draft as a verified account of who agreed with whom.

The current tool does not automatically label speakers or separate overlapping voices. Add a speaker label manually only when the recording supports it. Use a neutral unresolved label when it does not. Return to the whole exchange before attributing a quotation. If the analysis depends on precise turn-taking or non-speech behavior, arrange the necessary human review rather than treating the speech draft as a complete research record.

## Formats, limits and exports checked for this workflow

The shared file picker accepts audio and video. Our synthetic-clip check exercised WAV with PCM audio, MP3, M4A with AAC, OGG with Opus, MP4 with AAC, MOV with AAC and WebM with Opus in Chrome. Each file must still pass your browser's audio decoder; these specific test encodings do not certify every file carrying the same extension.

The file-size limit is **100 MB**. A deliberately oversized local fixture was rejected before recognition. A maximum recording length in minutes has **not been established**: the current code checks file size rather than a minutes-per-file limit, and this short exercise does not establish a longest successful interview. Available memory, decoding and model processing still constrain a run. There is no promise of unlimited duration or a fixed completion time.

English speech recognition follows a separate language check. Detected non-English speech, an uncertain check and a technical failure stop with different messages. Copy, TXT, Markdown, SRT and VTT were exercised in the fictional recording check; subtitle exports remain conditional on complete valid timing. Local files and edits are not uploaded, while model downloads and separate public-page analytics make network requests. See the [privacy policy](/privacy).

## When is paid human transcription worth considering?

Use the free draft when you have a permitted English recording and can review it yourself. Consider a human transcription or review workflow when the required detail exceeds this tool's output: overlapping speech that must be attributed, specialist terms you cannot verify, a strict transcription convention, or a delivery requirement calling for an accountable human reviewer. This is a decision about the required record, not a guarantee that paying removes uncertainty. Agree what needs to be captured and how unresolved passages will be marked.

When you are ready to make a draft you can inspect, [open Audio to Text](/audio-to-text#walkthrough-tool), retain the recording, and check your saved words before quoting them.
