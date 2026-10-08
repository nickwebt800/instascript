# Caption Generator: Timed TXT and SRT Drafts

> Generate a timed English speech caption draft from a public Instagram video or local media, then review and export TXT or SRT.

Canonical: <https://instascript.app/caption-generator>

## The direct answer

Open the [Instagram Transcript](https://instascript.app/) tool. Paste a public Instagram Reel or video URL, or upload a saved MP4, MOV, WebM, MP3, WAV, M4A, or OGG file. InstaScript recognizes English speech in your browser and provides timestamped text plus TXT and SRT downloads.

Choose a URL that works without a login, or a file you may process. Wait for the speech segments, replay important timestamps, edit the cues, and export SRT for a player or TXT for notes.

This is a speech-based caption draft. It does not add animated styling, read text in video frames, translate speech, or identify speakers.

## Output and review

| Output | Best use | Check |
| --- | --- | --- |
| Timestamped transcript | Reviewing speech segments | Names, numbers, URLs and line breaks |
| TXT | Searchable notes or a script draft | Paragraph breaks and spelling |
| SRT | Subtitle players and editors | Cue length, overlap and reading speed |

SRT is timed text, not a finished visual design. Use the [Subtitle Editor](https://instascript.app/subtitle-editor) to adjust wording and timing. Keep the source media beside the export.

## URL or local file

A public URL can fail when media is private, removed, region-limited, expired, or protected. Save a copy you are allowed to use and upload it instead. Uploads are limited to 100 MB and are processed on your device.

```text
[00:00] Choose the input that you can review
[00:04] Generate a timed speech draft
[00:09] Correct names before publishing
```

## Measured browser timings

| Audio length | Time | Model state |
| --- | --- | --- |
| 11 s | 16.89 s | first run, model load included |
| 11 s | 6.49 s | cached |
| 30 s | 8.98 s | cached |
| 60 s | 16.06 s | cached |
| 120 s | 28.58 s | cached |

These are single WASM observations on one laptop; URL fetch time is not included. See the [measured method](https://github.com/nickwebt800/instascript/tree/main/benchmark).

## Review before export

- Replay words covered by music, effects, echo, clipping, or crosstalk.
- Check accents, names, numbers, product terms, and URLs against the recording.
- Split long cues and remove overlaps in an editor.
- Text shown on screen needs visual inspection or OCR.
- The current model is English-focused; non-English output needs full manual review.

## FAQ

### Does it create burned-in captions?

No. It creates TXT and SRT files for later styling in a video editor.

### Does it copy the written Instagram post caption?

No. It transcribes spoken audio, not the post description.

### Is my uploaded video stored?

Uploaded media is decoded and transcribed in your browser. A public URL needs a temporary media fetch before local processing.

### Is InstaScript affiliated with Instagram?

No. InstaScript is independent of Instagram and Meta.

## More tools

- [Instagram Transcript](https://instascript.app/)
- [Video to Text](https://instascript.app/video-to-text)
- [Subtitle Editor](https://instascript.app/subtitle-editor)
- [Privacy Policy](https://instascript.app/privacy)
