# Transcribe Saved Recordings: Check Formats and Keep Timing | InstaScript

> Prepare a saved recording for English transcription. Check audio decoding, missing voices and changed recording clocks before reviewing text and subtitle exports.

Canonical: <https://instascript.app/recording-format-guide>


To transcribe a saved recording, open the local video tool, choose the complete file and select **Transcribe this file**. InstaScript makes an English speech draft only if your browser decodes the audio successfully. Review the draft against the recording before exporting it. For a MOV to text task, the audio inside the file matters more than its extension.

[Open the local video tool](/video-to-text)

## A file check before a speech check

Use a recording you own or have permission to process, up to 100 MB. This guide opens the existing video tool; it has no upload form or separate format-conversion engine. A private sharing link is not a local media file. Save the complete permitted recording first.

The tool reads the file through the browser's **decodeAudioData** operation before running language detection and English recognition. [MDN documents that this decoder needs complete file data](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData). A player opening the picture does not prove that this audio-decoding operation will succeed. A silent video cannot supply spoken words, and visible captions are not read by OCR.

First use downloads and initializes language-detection and English-transcription models. Cached resources can reduce downloading later; they do not guarantee an initialized model or a completion time. This guide contains no new format benchmarks, accuracy scores or speed estimates.

## Keep a source-to-copy check card

Before changing a difficult recording, make a private check card with three fields: source duration, the speech you can actually hear, and the relationship between the original and any exported copy. Keep filenames and private speech in your own workspace. You do not need to send them to this website or include them in a support message.

For duration, listen to the end rather than trusting a thumbnail or the first few seconds. A clip can open normally while a download is incomplete. Compare the ending with the permitted source. If the recording stops before the final instruction, obtain the missing part before treating any transcript as complete.

For audible speech, listen at the start, middle and end with the normal playback controls. In a meeting or screen recording, check that both the local microphone and the other participant can be heard. A draft cannot establish what an absent track contained. This tool mixes decoded channels to mono; it does not provide a track selector or separate speaker transcripts. If the needed voice is missing or obscured, prepare a suitable copy in a trusted local editor and replay it first.

For the copy relationship, record whether you only changed the encoding, trimmed the opening, changed speed or combined clips. Those operations have different timing consequences. Keep the original untouched and compare the copy with it before running recognition. A different extension is not evidence that a conversion succeeded.

## MOV to text: inspect the audio, then the draft

A MOV recording can carry video and audio together. [MDN's container guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Containers) explains the distinction between a media container and its encoded streams. This page does not certify every MOV audio track for every browser. The actual file must pass the tool's decoder.

If decoding fails, retain the source and use a trusted local editor to export a separate audio copy, such as WAV or MP3, then test that copy. This site does not perform that conversion. Check the beginning and ending again; renaming a file to .wav changes its label, not its encoded contents.

## Keep the recording clock attached to the words

Consider an invented review exercise: a recording has an opening slate lasting six seconds, followed by a spoken instruction at original time 00:18. An audio copy removes only that slate and keeps the same playback speed. The same instruction now occurs at copy time 00:12. Those are two valid positions in different recordings, not competing estimates of one timestamp.

Use the copy's transcript and subtitle times with the copy you transcribed. If you need subtitles for the original video, review them against that original in a suitable editor. In this simple exercise the offset is six seconds, but do not apply one offset to a copy with cuts in the middle or changed speed. Review points before and after each edit instead.

Now imagine the spoken instruction is, “Send the draft on Tuesday—only after approval.” A rough transcript that loses “only after approval” changes the meaning even if every cue lands on time. Replay the complete sentence and its next cue. Keep the condition alongside the action, and inspect the exported text to make sure your edit survived. This example is authored for this guide; it is not a quotation, model result or measured accuracy test.

Use two separate acceptance questions: **Are these the words that can be heard?** and **Do these times locate those words in this recording?** Correct text cannot repair a mismatched recording clock. Correct timing cannot repair a missing negative, quantity or condition. Leave unresolved passages for review instead of inventing a plausible completion.

## Other saved formats in the same workflow

**FLAC to text and AAC to text:** these are requests to recognize speech, not to turn audio bytes directly into letters. Native decoding of these specific files is not certified here. If the tool cannot decode a recording, prepare and inspect a separate local audio copy before retrying.

**AMR to text and WMA to text:** an older recording may play in its original application without being usable by this browser decoder. Keep that playable original. Use a trusted local conversion workflow when needed; this guide does not claim a built-in AMR or WMA converter.

**WebM to text, MKV to text and 3GP to text:** video packaging does not guarantee an accessible speech track. Confirm which voice is audible and test the exact saved file in the tool. No universal support for these containers or their codecs is promised. These are preparation notes within one guide, not separate transcription engines.

## Respond to the stage that stopped

A **could not decode** error occurs before language recognition. Check completeness and the audio encoding or try a reviewed local copy. A **language check could not run** message is a technical failure. Retry after checking connectivity; do not label the recording non-English on that evidence.

**Could not determine the audio language** means the check was uncertain. Clear English speech near the beginning is needed. A detected non-English notice is a separate outcome: the recognizer currently handles English only. None of these stopped states is a successful empty transcript. Cancellation may wait for an active local model operation to finish before a retry can begin.

## Export the reviewed artifact

Copy and TXT use your edited words and default to plain text. **Include timestamps in TXT, Markdown and Copy** adds available cue start times. Markdown produces transcript notes, not an AI summary. SRT, VTT and **Open in Subtitle Editor** require non-empty text and complete valid start and end times; missing ends are not estimated. Keep TXT when timing is incomplete.

Local recordings, edits and exports stay in your browser and are not uploaded by the tool. Opening the editor passes the recording and cues between same-origin tabs; it creates no cloud project or account history. Model downloads and separate public-page analytics still make network requests; see the [privacy policy](/privacy). Recognition, track separation, translation and burning captions into video are different tasks; this workflow offers English recognition and local review, not the latter three services.

When the file and its clock are ready, open the [local video tool](/video-to-text). If you already have timed subtitle text, go directly to the [Subtitle Editor](/subtitle-editor) instead.
