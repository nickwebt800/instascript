# WhatsApp Voice to Text: TXT and SRT

> Convert a permitted WhatsApp voice message file into timestamped English text, TXT, SRT or VTT in your browser.

Canonical: <https://instascript.app/whatsapp-voice-to-text>

## The direct answer

Save or export the WhatsApp voice message you are allowed to use, then open the [InstaScript](https://instascript.app/) tool and choose the local audio file. The browser recognizes supported English speech and returns timestamped text with TXT, SRT and VTT downloads.

Export the message, select the file, let the browser process it, then replay important segments and correct names or numbers before sharing the result.

A private WhatsApp chat or message URL is not fetched. This workflow uses a permitted local file and transcribes speech, not message text, stickers, images or speaker identity.

## Output and review

| Output | Useful for | Check |
| --- | --- | --- |
| Timestamped transcript | Finding a moment | Names, numbers and URLs |
| TXT | Searchable notes or a reply draft | Paragraph breaks and spelling |
| SRT | Subtitle players and editors | Cue timing and line length |

For an iPhone voice memo or another local recording, the [voice memo workflow](https://instascript.app/voice-memo-to-text) applies too.

## WhatsApp file or private link?

Use an audio file that you may process. A chat link, cloud backup, disappearing message, account-only media, or a file blocked by device permissions cannot be read here. If the saved file is not browser-readable, export a permitted compatible copy. Uploads are limited to 100 MB.

```text
[00:00:00] Can you send the revised quote?
[00:00:04] I will review it this afternoon.
```

## Measured browser timings

| Audio length | Time | Model state |
| --- | --- | --- |
| 11 s | 16.89 s | first run, model load included |
| 11 s | 6.49 s | cached |
| 30 s | 8.98 s | cached |
| 60 s | 16.06 s | cached |
| 120 s | 28.58 s | cached |

These are single WASM observations on one laptop; file selection time is excluded. Your device, browser and codec can change the result. See the [measured method](https://github.com/nickwebt800/instascript/tree/main/benchmark).

## Review a voice message transcript

- Replay words covered by music, noise, clipping, echo or overlapping speakers.
- Check names, phone numbers, prices, dates and links against the recording.
- Expect weaker results for very short words, whispers, accents and non-English speech; the current model is English-focused.
- Text visible in an image or video is not part of speech transcription.
- Remove private details from copies shared beyond the people who authorized the recording.

## FAQ

### Can I paste a WhatsApp message link?

No. Use a permitted local audio file exported from the message.

### Does it transcribe the chat text?

No. It recognizes spoken audio only. Written messages, reactions and attachments are separate content.

### Is the voice message uploaded?

Local files are decoded and transcribed in your browser. The transcript is not saved as an account record.

### Can I create subtitles from the result?

Yes. Download SRT, review its cues, and edit it in the [Subtitle Editor](https://instascript.app/subtitle-editor) if needed.

## More tools

- [Instagram Transcript](https://instascript.app/)
- [Voice Memo to Text](https://instascript.app/voice-memo-to-text)
- [Audio to Text](https://instascript.app/audio-to-text)
- [Privacy Policy](https://instascript.app/privacy)

## Export your edited transcript

In the shared transcription tool, Copy and TXT use your edited words. They are plain text by default; enable Include timestamps in TXT and Copy to add available start times. This option does not run speech recognition again. SRT, VTT and Open in Subtitle Editor require non-empty cue text and complete valid start/end times. Missing end times are not estimated. If timing is incomplete, keep the recording for review and copy or download TXT instead.
