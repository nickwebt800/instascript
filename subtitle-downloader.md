# Subtitle Downloader: Choose a Track, Check the File

> Download an existing YouTube subtitle track as SRT or TXT, choose the right language, and check timing before using the file in an editor or player.

Canonical: <https://instascript.app/subtitle-downloader>

[Open the matching tool](https://instascript.app/youtube-transcript-download)

## Choose a caption track, then inspect the file

This guide helps you accept or reject a subtitle download. Use the [YouTube Transcript Download tool](https://instascript.app/youtube-transcript-download) for existing public caption tracks; there is no subtitle database or arbitrary movie search here.



![Choose the output by its destination. Read / quote. TXT or Markdown. Check source and language. Timed delivery. SRT. Check cue ends in the player. WebVTT destination. Checked SRT → VTT. Validate the converted artifact](https://instascript.app/assets/tutorials/subtitle-downloader/source-choices-wide.svg)

Decision diagram, not a platform screenshot. Read / quote: TXT or Markdown: Check source and language; Timed delivery: SRT: Check cue ends in the player; WebVTT destination: Checked SRT → VTT: Validate the converted artifact.

## 1. Confirm the source and language

Read the source title and available caption languages before exporting. After changing a language in the YouTube tool, submit again; it clears the previous result. Different languages are separate existing tracks, not automatic translations by InstaScript. A query failure does not prove captions are absent.

**Check:** The result belongs to the intended video and selected track.

## 2. Choose text or timed delivery

Use TXT for reading, Markdown for transcript notes with source information, or SRT for a timed file. For VTT, convert a checked SRT in [SRT to VTT](https://instascript.app/srt-to-vtt). This does not create missing captions, repair words or render a video.

**Check:** The destination accepts the actual file type you saved.

## 3. Accept the artifact only after opening it

Compare the first, middle and last passage and verify the cue count and final range. Current YouTube SRT export uses a two-second fallback when a segment duration is missing or zero, so not every end is an original track boundary. Keep the original and check subtitle playback before delivery.

**Check:** A readable file and correct extension are accompanied by correct content and useful timing.

## More questions and limits

### What processing and privacy boundaries apply?

YouTube lookup is server-assisted and successful query responses may cache for one hour. Your browser may contact Google to validate and fetch a selected track. Search and downloads do not create an account history. Following timestamp links contacts YouTube.

### Where should I continue?

[Open the matching tool](https://instascript.app/youtube-transcript-download) and follow its current input requirements. Keep the original, review your result and download it before closing the tab.
