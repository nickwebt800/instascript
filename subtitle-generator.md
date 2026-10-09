# Subtitle Generator: Timed TXT and SRT Drafts

> Generate a timed English speech subtitle draft from a public Instagram video or local media, then review and export TXT or SRT.

Canonical: <https://instascript.app/subtitle-generator>

## The direct answer

Open the [Instagram Transcript](https://instascript.app/) tool. Paste a public Instagram Reel or video URL, or select a saved MP4, MOV, WebM, MP3, WAV, M4A, or OGG file. InstaScript recognizes English speech in your browser and returns timestamped cues you can download as SRT or TXT.

Use a URL that works without a login, or a file you may process. Replay important cues, correct wording and timing, then export SRT for a subtitle player or TXT for notes.

This is a speech subtitle draft. It does not burn captions into video, read text in frames, translate speech, add visual styling, or identify speakers.

## Output and review

| Output | Use it for | Review |
| --- | --- | --- |
| Timestamped cues | Checking each spoken segment | Names, numbers, URLs and line breaks |
| SRT | Players and subtitle editors | Cue duration, overlap and reading speed |
| TXT | Searchable notes or a script draft | Paragraph breaks and spelling |

Use the [Subtitle Editor](https://instascript.app/subtitle-editor) to change cue text or shift timings. Keep the source recording beside the export.

## Public URL or local file

A public Instagram URL can fail when media is private, removed, region-limited, expired, or protected by a login. Save a copy you are allowed to use and upload it instead. Uploads are limited to 100 MB and decoded on your device. URL fetch time is separate from local transcription.

```srt
1
00:00:00,000 --> 00:00:03,000
Review the first subtitle cue

2
00:00:03,000 --> 00:00:06,000
Correct names before export
```

## Measured browser timings

| Audio length | Time | Model state |
| --- | --- | --- |
| 11 s | 16.89 s | first run, model load included |
| 11 s | 6.49 s | cached |
| 30 s | 8.98 s | cached |
| 60 s | 16.06 s | cached |
| 120 s | 28.58 s | cached |

These are single WASM observations on one laptop; URL fetch time is excluded. See the [measured method](https://github.com/nickwebt800/instascript/tree/main/benchmark).

## Review before publishing

- Replay words covered by music, effects, echo, clipping, or crosstalk.
- Check accents, names, numbers, product terms, and URLs against the recording.
- Split long cues and remove overlaps when viewers need more reading time.
- Text printed in frames needs visual inspection or OCR.
- The current browser model is English-focused; non-English speech needs full manual review.

## FAQ

### Does this burn subtitles into my video?

No. It creates editable TXT and SRT files for later styling in a video editor.

### Does it copy the post's written caption?

No. It transcribes spoken audio, not the written post description.

### Is an uploaded recording stored?

Uploaded media is decoded and transcribed in your browser. A public URL needs a temporary media fetch before local processing.

### Is InstaScript affiliated with Instagram?

No. InstaScript is independent of Instagram and Meta.

## More tools

- [Instagram Transcript](https://instascript.app/)
- [Caption Generator](https://instascript.app/caption-generator)
- [Subtitle Editor](https://instascript.app/subtitle-editor)
- [Privacy Policy](https://instascript.app/privacy)
