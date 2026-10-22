# YouTube Transcript Generator

> YouTube transcript generator: paste a YouTube link and read the transcript. This page reads the caption track the video already has, with timestamps, copy and TXT download. No signup.

Canonical: <https://instascript.app/youtube-transcript>

[Open the tool](https://instascript.app/youtube-transcript)

## Read a caption track and keep a verifiable quotation

Paste a public YouTube video or Shorts link above to read an existing caption track. This tool does not recognize the audio, create missing captions or translate a track. Search and source links help you check a quotation.

Success-state illustrations below use prepared fictional captions (“Keep the blue folder”). They demonstrate the real controls with controlled teaching data, not a successful live YouTube lookup. A live query on October 23, 2026 returned a track with empty content; service success remains unverified.

## 1. How do I choose a caption language?

Submit a supported public video URL. If multiple languages are listed, choose a track and submit again: changing language clears the previous transcript and search. A listed language is an existing YouTube track, not a language newly recognized by this site. Check the source title before quoting.

![How do I choose a caption language? Prepared fictional captions shown in the real controls; not a successful live YouTube lookup.](https://instascript.app/assets/tutorials/youtube-transcript/01-source-wide.svg)

Prepared fictional captions shown in the real controls; not a successful live YouTube lookup.

**Check:** The source video and selected track match the text you intend to read.

## 2. How do I find and verify a sentence?

Find in this transcript searches literal words within each segment, ignoring ASCII letter case. Previous/Next and Enter/Shift+Enter navigate matches; Escape clears the query. A timestamp link opens YouTube in another tab at a whole-second start, rather than playing an embedded video here. Replay the surrounding phrase before treating a match as a quotation. Caption text here is read-only.

![How do I find and verify a sentence? Prepared fictional captions shown in the real controls; not a successful live YouTube lookup.](https://instascript.app/assets/tutorials/youtube-transcript/02-find-wide.svg)

Prepared fictional captions shown in the real controls; not a successful live YouTube lookup.

**Check:** The passage is supported by the source audio and surrounding context.

## 3. How do I save a reading copy with its source?

Use TXT for reading, or Markdown for a transcript note with the source title, URL and language information. Timestamps and Plain Text change the view used for text output; neither setting edits the underlying caption words. SRT is useful for a timed draft. Current SRT export uses a two-second fallback for missing or zero duration, so inspect cue ends before subtitle delivery. The [Download walkthrough](https://instascript.app/youtube-transcript-download) covers artifact delivery in detail.

![How do I save a reading copy with its source? Prepared fictional captions shown in the real controls; not a successful live YouTube lookup.](https://instascript.app/assets/tutorials/youtube-transcript/03-save-wide.svg)

Prepared fictional captions shown in the real controls; not a successful live YouTube lookup.

**Check:** The actual downloaded note contains the intended track and source information; editorial notes are clearly your own.

## 4. What if the query returns no usable text?

An unavailable service, rejected source validation and empty caption content are different from confirmed absence of captions. Check the URL and source access, then retry later or use the source platform if available. The error below is from the real live query; the prepared success screens do not establish that this query succeeded.

![What if the query returns no usable text? Actual live-query error on October 23, 2026; no usable caption text was returned.](https://instascript.app/assets/tutorials/youtube-transcript/04-recover-wide.svg)

Actual live-query error on October 23, 2026; no usable caption text was returned.

**Check:** Report the observed failure without inferring that every video or language has no captions.

## More questions and limits

### Does the video get transcribed by a speech model?

No. This separate workflow reads existing YouTube captions. Other-language tracks do not change the English-only recognition used by local-file tools.

### Where does the lookup happen?

The site endpoint discovers tracks and may return caption content; successful responses may cache for one hour. Your browser may contact Google for source validation and to fetch a selected track. Search and downloads run in the tab without account transcript history. Opening a source link contacts YouTube. See the [privacy policy](https://instascript.app/privacy).

### Can I edit the retrieved caption words here?

The caption display is read-only. Keep editorial corrections in your own notes, or download SRT and open [Subtitle Editor](https://instascript.app/subtitle-editor) for local subtitle edits. The original source track is unchanged.
