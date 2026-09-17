# YouTube Transcript Download — YouTube Subtitles Download & YouTube SRT Download | InstaScript

> YouTube transcript download: paste a YouTube link and take the transcript away as a file. TXT for notes and documents, SRT for subtitles and video editors. Timestamps from the video's own caption track. No signup.

Canonical: <https://instascript.app/youtube-transcript-download>

[InstaScript](https://instascript.app/)

# YouTube Transcript Download

Paste a YouTube link, take the words away as a file — TXT or SRT, no signup

Other transcript tools: [Instagram Transcript](https://instascript.app/) · [YouTube Transcript](https://instascript.app/youtube-transcript) · [TikTok Transcript](https://instascript.app/tiktok-transcript) · [Facebook Video Transcript](https://instascript.app/facebook-video-transcript) · [Video to Text](https://instascript.app/video-to-text) · [Audio to Text](https://instascript.app/audio-to-text)

Paste a public YouTube link above and press **Download Transcript**. youtube.com, youtu.be and /shorts/ links all work. You get a .txt and a .srt file, both built in your own browser and saved to your device.

## How this download works

**It reads the caption track the video already has and writes it to a file — it never listens to the audio and never re-writes the words from scratch.** Nothing has to play through, which is why the file is ready in seconds.

Two things happen when you press the button. This site asks YouTube which caption tracks the video has and hands that list to the page. Your own browser then fetches the track you picked straight from YouTube, and **the file is assembled in your browser and saved by your browser**. No copy of your transcript is sent to this site, no file is parked on a server, and there is nothing to delete afterwards.

YouTube asks the browser that requests captions to pass a bot check first. Your browser does that check itself; this site never sees the result. An extension that blocks Google scripts, or a privacy browser in its strictest mode, can stop the download before a file exists.

## YouTube subtitles download: TXT or SRT

- **TXT** is the one for reading and writing. Plain text, opens in any editor, pastes into a document, works with translation and search tools. Default view has `[mm:ss]` at the start of each line; switch to *Plain text* before downloading and the times are removed.
- **SRT** is the one for playing and editing. Standard subtitle file: a number, a start and end time, then the text, separated by blank lines. Media players load it next to the video, subtitle editors open it as a track, video editors import it as a subtitle track.

Both files are UTF-8 with Unix line endings, named after the video title — *Me at the zoo* saves as `Me-at-the-zoo.txt` and `Me-at-the-zoo.srt`.

## YouTube SRT download: where the timestamps come from

**The times are not calculated here — they come with the caption track.** YouTube sends every caption line with the millisecond it starts at and how long it lasts. The SRT copies those two numbers: the start on the left, and the end is that start plus the duration that came with the line. Milliseconds are kept.

In the file from *Me at the zoo*, the first cue reads `00:00:01,200 --> 00:00:03,360`: the line arrived with a start of 1,200 ms and a duration of 2,160 ms, and 1,200 + 2,160 = 3,360. Nothing was estimated.

One gap this page fills: if a line arrives with no duration, the file gives it two seconds. Across the three videos measured, cues that came out at exactly 2.000 seconds: 1 of 6 on the 0:19 video, 4 of 428 on the 21:03 video, 1 of 90 on the 4:42 video. Some may genuinely be two-second lines in the original track — once the file is written the two cases cannot be told apart.

## One caption line, one line in the file

**The files are line-by-line, not grouped into paragraphs.** Each caption line becomes one line in the TXT and one cue in the SRT. Nothing is merged, no sentence is split across cues. The 21:03 talk came back as 428 lines, and the SRT grew to 1,712 lines because every cue carries a number and a time line as well as the words.

## What a long video's file looks like

The longest video run through this page is a 21:03 TED talk: 428 lines, a **23.0 KB TXT (23,528 bytes)** and a **34.2 KB SRT (34,976 bytes)**. The SRT is about 1.5× the TXT — the cost of the timing lines. The same ratio held on the other videos: 0:19 gave 265 B and 415 B; 4:42 gave 4,087 B and 6,418 B. The longest single cue in the long file lasted 7.2 seconds and the shortest 1.0 second.

## When the download fails, this is what you see

- **No caption track came back:** "This lookup came back with no caption track. Either this video has none, or YouTube did not hand one over this time. Try it once more: if it comes back empty again, the video most likely has no captions, and captions cannot be made here — this page only reads the ones that already exist." Triggered on purpose twice while testing.
- **Temporarily unavailable:** "The caption lookup is unavailable right now. There is nothing wrong with your link — try it again later." Hit once during testing.
- **The bot check could not be completed:** the page explains that YouTube asked for a proof-of-origin token the browser could not produce, and points at strict privacy settings or script blockers. Not triggered during testing — quoted, not observed.
- **A track exists but came back empty:** YouTube sent nothing for it; usual causes are captions switched off after publishing, auto captions not generated yet, or an empty track.

Not in that list: a length limit, a quota, a daily allowance or a waiting room. There is no account here.

## What I measured on this page

Every row is one run on the live page, in a real browser, on my own connection, on 17 September 2026. File sizes are read off the files that actually landed on disk.

| Video | Length | Track | Lines | TXT | SRT | SRT cues | Time to result |
|---|---|---|---|---|---|---|---|
| Me at the zoo | 0:19 | English | 6 | 265 B | 415 B | 6 | 12.3 s |
| Despacito | 4:42 | English | 90 | 4,087 B | 6,418 B | 90 | 1.1 s |
| Despacito | 4:42 | Spanish | 91 | 4,107 B | 6,464 B | 91 | 1.0 s |
| Your Body Language May Shape Who You Are (TED) | 21:03 | English | 428 | 23,528 B | 34,976 B | 428 | 22.4 s |

The time column is the whole trip from pressing the button to the transcript appearing. The two rows at about one second were still cached from a recent lookup; the 12.3 s and 22.4 s rows were cold starts.

**Where my testing stops:** the longest video run is 21:03. No length ceiling, file size ceiling, accuracy figure or language count has been measured, so none is stated.

## FAQ

**Can I download a YouTube transcript on my phone?** Yes. Both download buttons work in a mobile browser. On Android the file lands in Downloads; on iPhone it goes to Files.

**Is the transcript uploaded anywhere?** No. The file is built in your browser and saved to your device. See the [privacy policy](https://instascript.app/privacy).

**Which caption language do I get?** Whatever the video has. With more than one track a dropdown appears; pick, then press the button again to rebuild the file in that language.

**Why is the SRT bigger than the TXT?** The timing lines. Every cue carries a number and a start/end line, plus blank separators: 23,528 bytes became 34,976 bytes on the 21:03 video.

**Do the SRT times match the video exactly?** They match the caption track, which is what YouTube shows as subtitles. If the uploader's captions drift, the file drifts with them.

**Can I get captions for a video that has none?** Not from this page — it only reads captions that already exist. [Video to Text](https://instascript.app/video-to-text) or [Audio to Text](https://instascript.app/audio-to-text) run a speech model in your browser instead.

**Do you keep a copy of the file?** No. There is no upload step, so there is nothing to keep.

---

InstaScript is an independent personal project. It is not affiliated with, endorsed by, or sponsored by YouTube or Google.
