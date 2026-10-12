# Instagram Reels Transcript: URL, TXT and SRT

> Turn a public Instagram Reel URL or a saved Reel file into timestamped spoken text in your browser.

Canonical: <https://instascript.app/instagram-reels-transcript>

## The short answer

Open the [Instagram Transcript](https://instascript.app/) tool, paste a public Reel URL, or upload a saved Reel video. The browser returns spoken words with timestamps that you can copy or download as TXT or SRT.

1. Use a public Reel URL that opens without a login, or choose a saved video file.
2. Let the page fetch or decode the media and run the English speech model locally.
3. Check timestamps against the audio before quoting or publishing the result.

Uploaded files stay on the device. A public URL requires a temporary media fetch before local speech recognition.

## Public URL or saved file

The URL path works when a public Reel media URL is available without an Instagram login. Use a saved MP4, MOV, or WebM file for private, deleted, login-only, region-restricted, or expired posts. Uploads are limited to 100 MB. A Reel without a usable audio track cannot produce a useful speech transcript.

## Output

TXT is useful for searching and editing. SRT contains numbered cues with start and end times for subtitle players and editors. The SRT is generated from recognized speech segments; it is not Instagram's written caption.

## Measured browser timings

These are single observations from one laptop using the WASM path. URL download time is excluded.

| Audio length | Wall-clock time | Model state |
| --- | ---: | --- |
| 11 s | 16.89 s | first run, model load included |
| 11 s | 6.49 s | cached |
| 30 s | 8.98 s | cached |
| 60 s | 16.06 s | cached |
| 120 s | 28.58 s | cached |

See the [raw benchmark rows](https://github.com/nickwebt800/instascript/tree/main/benchmark) for the method.

## Accuracy and FAQ

Music, effects, accents, names, numbers, and overlapping voices can change a segment. The current browser model is English-focused, so replay important timestamps.

### Can I transcribe a private Instagram Reel?

Not through the public URL path. Save a copy you are allowed to use and upload the local file.

### Does this extract Instagram's written caption?

No. It transcribes spoken audio, not post text or words shown in the video frames.

### Can I download subtitles?

Yes. Download SRT for a subtitle track or TXT for plain text, then review the result.

### Is InstaScript affiliated with Instagram?

No. InstaScript is independent of Instagram and Meta.
