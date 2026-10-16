# Subtitle Downloader: Choose a Track, Check the File | InstaScript

> Download an existing YouTube subtitle track as SRT or TXT, choose the right language, and check timing before using the file in an editor or player.

Canonical: <https://instascript.app/subtitle-downloader>

# Subtitle Downloader: Choose a Track, Check the File

To use a **subtitle downloader**, open the [YouTube download tool](https://instascript.app/youtube-transcript-download), paste a public video link, and select **Download Transcript**. Choose an available caption language, submit again after changing it, and download SRT for timed subtitles or TXT for reading.

This guide helps you select and inspect the file. The linked tool reads existing YouTube caption tracks; it does not create missing captions, search a movie subtitle database, or retrieve private streaming subtitles.

[Open subtitle download tool](https://instascript.app/youtube-transcript-download)

## Choose the output for the next job

**For a media player or video editor, choose SRT.** It contains numbered cues, start and end times, and text. Import it as a subtitle track and preview it with the matching video. A separate SRT file does not burn words into the picture.

**For reading or a document, choose TXT.** Use Timestamps for start-time references or Plain text for continuous text. TXT is not a timed subtitle track. Markdown is also available for a note with source links; it does not replace an SRT file.

**For a web player that needs WebVTT, convert the SRT afterward.** Use [SRT to VTT](https://instascript.app/srt-to-vtt), then test the exported VTT in your player. Renaming an extension does not convert its syntax. This download tool does not offer a direct VTT export.

## Select the language before saving

Available caption languages depend on the video. A translated or automatically generated source track can contain errors. Reading a non-English track here does not make the separate local speech-recognition tool multilingual. Downloading an existing track is different from recognizing speech or translating a subtitle file.

1. Paste a public YouTube watch, short link, or Shorts URL into the [download tool](https://instascript.app/youtube-transcript-download) and run the lookup.
2. If Caption language appears, select the track you want and submit the link again. Changing the dropdown clears the previous result; the old text is not a new-language download.
3. Read several lines in the returned result. A language label tells you which track was selected, not that its words have been independently checked.
4. Choose Download SRT or Download TXT, then open the saved file. Keep a separate copy of any corrections made later in an editor.

## A three-pass check for the downloaded file

Treat a successful download as the beginning of review. Use three passes: inspect the file structure, match the file to the source, and preview the subtitles in the destination. Each pass answers a different question. A file can be valid SRT while showing the wrong language or appearing several seconds too early.

**Pass 1: structure.** Open the SRT in a text editor. Look for a cue number, a timing line with an arrow, text, and a blank separator. Check that an end time follows its start. If the file contains a web page, an error message, or only prose, changing its filename will not make it a usable subtitle file.

**Pass 2: source match.** Compare the opening speech, a passage in the middle, and the final spoken passage against the matching video. Check the selected language, names, quantities and negation. A file with the same subject may still belong to a different edit. An extra introduction or a removed pause can make an otherwise readable track drift.

**Pass 3: destination.** Import the file into the player or editor where you will use it. Confirm that the subtitle track is enabled, letters render correctly, and line breaks remain readable at your intended display size. Preview at the same three positions. Passing a text-file check does not prove that a particular player loaded the track.

## Worked example: a gap is not a missing subtitle

This is an invented teaching example, not a download from a real video or a measured recognition result. It illustrates what to inspect in an SRT file.

```srt
1
00:00:02,000 --> 00:00:04,000
Close the lid before starting.

2
00:00:05,500 --> 00:00:08,000
Wait until the indicator turns green.
```

The first cue ends at 4.000 seconds and the next begins at 5.500 seconds. That leaves a 1.500-second gap. Keep the gap if there is silence in the source. Do not stretch the first instruction across it simply because continuous text looks neater in an editor.

Now imagine the second line appears as soon as the lid closes, before the second instruction is spoken. Check the matching source passage before changing any times. If all three review positions are early by the same amount, a uniform shift may be appropriate. If the opening matches but later positions increasingly drift, a single shift will not solve the underlying mismatch.

If only one cue has a problem, inspect that cue and its neighbors. Extending it into the next cue can create an overlap. Keep the untouched download separately so you can compare your edits and undo a repair that made another passage worse.

## Use a stop, repair, or accept decision

**Stop and choose again** when the language or source edit is wrong. Timing repairs cannot turn a different track into the correct one. Recheck the selected language and run the lookup again before editing individual lines.

**Repair a copy** when you can verify the words and the defect is specific: one cue ends too late, an unwanted line break splits a phrase, or the complete track needs a confirmed constant offset. Use [Subtitle Editor](https://instascript.app/subtitle-editor) for local SRT, VTT or SBV cue edits. Review the exported file again in the destination.

**Accept for your purpose** only after the file has passed the checks that matter to that purpose. A TXT note may be usable without subtitle timing. A subtitle track needs timing and legibility as well as correct words. Record unresolved passages in your own review notes instead of treating a clean file extension as proof of accuracy.

## Where the timing comes from

The YouTube download tool starts with the caption track's line start times and durations. Its SRT exporter uses a two-second duration when a source line has no duration. An exported two-second cue may therefore be a source value or a fallback; the finished SRT does not distinguish the two. Replay uncertain endings before reusing the file.

The tool does not automatically align downloaded captions to a different recording or repair drift. For a downloaded file you already own, use the editor to inspect cues. If you have untimed text instead, [TXT to SRT](https://instascript.app/txt-to-srt) creates an estimated timing draft, not alignment to audio.

## If no usable track comes back

An empty lookup does not prove that the video has no captions. The request may fail, a track may be empty, or the service may be temporarily unavailable. Read the error and retry later when appropriate. Browser requests can also depend on Google scripts and a bot check; this guide does not bypass them.

If you know no suitable caption track exists and have permission to use a saved recording, the separate [Video to Text](https://instascript.app/video-to-text) tool can transcribe browser-decodable English audio from local media up to 100 MB. That is a speech-recognition workflow with model loading and language checks, not another subtitle download route. It does not import private video links.

## Privacy and saved files

YouTube lookup uses a server and may fetch existing caption text there. Successful responses may be cached for one hour. When needed, the browser requests a selected track directly from YouTube and may contact Google for a bot check. TXT, Markdown and SRT exports are built locally. Opening a source-time link contacts YouTube.

Local subtitle files opened in Subtitle Editor or the format converters are processed in the browser without uploading their contents. There is no account history or saved cloud project. Keep the original file and your reviewed copy on your device before closing the tab. See the [privacy policy](https://instascript.app/privacy) for the full service boundaries.

## Start with an existing track

Open the [YouTube download tool](https://instascript.app/youtube-transcript-download) to retrieve an available track. Use [Subtitle Editor](https://instascript.app/subtitle-editor) to review a subtitle file you already have, or [SRT to VTT](https://instascript.app/srt-to-vtt) when your destination requires WebVTT. These are separate steps; this guide is not a new download engine.
