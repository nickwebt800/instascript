# Fictional interview exercise: source and verification

Published with the interview transcription guide on 2026-10-23. This material was authored for InstaScript. It contains no participant recording, personal data, video title or channel source.

## Recording

The script is: Question. Did you approve the Friday release? Answer. No. I approved the review, not the release. It still needs approval. Please keep the original recording so you can check this correction.

Windows System.Speech synthesized the script with the installed Microsoft Zira Desktop en-US voice at rate -1. A single synthetic voice reads both roles. This is a teaching exercise, not a real multi-speaker interview or a recognition-accuracy benchmark.

## What was actually checked

Chrome ran the existing production Audio to Text page: local file selection, audio decoding, separate language detection, English recognition, result search, timestamp playback, manual punctuation edit, Copy and actual TXT/Markdown/SRT/VTT downloads. The WAV player reported 16.767483 seconds. This is the recording duration, not processing time or a maximum supported duration. The first recognized reply cue read No I approved the review. It was manually changed to No. I approved the review. The next cue still read Not the release.

recognized.txt is an actual downloaded recognition draft. reviewed.txt, reviewed.md, reviewed.srt and reviewed.vtt are actual downloaded outputs after the edit. The Copy text was checked against the reviewed TXT. Markdown escapes punctuation; SRT and VTT preserve valid cue times. These files are not estimates or manually generated substitutes for downloads. The timed files locate the reply at 00:00:06.280 in this specific WAV; other encoded copies can produce different cue boundaries.

The same synthetic source was encoded as MP3, M4A/AAC, OGG/Opus, MP4/AAC, MOV/AAC and WebM/Opus and selected in the same real page workflow. WAV/PCM plus these specific encoded copies reached a speech result in the tested Chrome. MP4/MOV/WebM contain a black video frame and this synthetic audio; they are not actual filmed interviews. This is a check of the named encodings, not a guarantee for every codec configuration under each extension. Encoding was performed with FFmpeg supplied by imageio-ffmpeg, outside the site; InstaScript does not convert media formats.

A separate local fixture of 104857601 bytes was selected and the page rejected it with File too large. Maximum size is 100 MB. That test verifies the current size guard; it does not measure the longest usable recording. The current client checks bytes rather than a minutes-per-file cutoff. No maximum successful interview duration was established.

## Missing timing is a separate validation case

The shared transcript serializer was also run with a constructed cue containing start 0, missing end, and text No. I approved the review. Plain-text serialization retained that text; SRT serialization rejected it with Cue 1 needs valid times with an end after its start. This was a code-level validation check, not a failure observed in the WAV example. The downloadable WAV example had complete cue times.

No elapsed-time, recognition-accuracy, real-speaker diarization or statistical performance claim is made. Use the recording and artifacts to inspect the demonstrated edit and output boundary. Local sources and results are not uploaded by the transcription tool; the public files here are deliberately published teaching assets.
