# YouTube Transcript Generator — YouTube to Transcript & Video to Transcript | InstaScript

> YouTube transcript generator: paste a YouTube link and read the transcript. This page reads the caption track the video already has, with timestamps, copy and TXT download. No signup.

Canonical: <https://instascript.app/youtube-transcript>

[InstaScript](https://instascript.app/)

# YouTube Transcript Generator

Paste a YouTube link, read what is said in it — free, no signup

Other transcript tools: [Instagram Transcript](https://instascript.app/) · [TikTok Transcript](https://instascript.app/tiktok-transcript) · [Facebook Video Transcript](https://instascript.app/facebook-video-transcript) · [Video to Text](https://instascript.app/video-to-text) · [Audio to Text](https://instascript.app/audio-to-text)

Paste a YouTube link above and press **Get Transcript**. Public videos that already have captions work; youtube.com, youtu.be and /shorts/ links are all accepted. If a video has more than one caption track, a language dropdown appears.

## How this YouTube transcript generator works

**It reads the caption track the video already has on YouTube — it does not listen to the audio and does not re-write it from scratch.** That is the whole reason it is quick: nothing has to play through, so a result lands in seconds instead of making you wait for a recording to finish.

Two steps happen when you press the button. This site asks YouTube which caption tracks the video has and hands the list back to the page. Your own browser then downloads the track you picked straight from YouTube. The words were already written down when the video was published, so there is no speech recognition in the loop and no audio file is uploaded anywhere.

YouTube now asks the browser that requests captions to pass a bot check first. Your browser does that check itself; this site never sees the result of it. The practical consequence: an extension that blocks Google scripts, or a privacy browser in its strictest mode, can stop the download. When that happens the page tells you instead of guessing.

## What you get back

- **Timestamped transcript** — each line starts with the time it was spoken, so you can jump back to that moment.
- **Plain text** — the same words with the timestamps taken out, one button away.
- **Copy** for pasting into notes or a document.
- **.txt** for plain notes and **.srt** for subtitles you can drop into an editor.

## When there is nothing to get

This page reads captions; it cannot create them. These cases come back with a message instead of a transcript:

- **The video has no captions at all.** Plenty of uploads never got any.
- **Auto captions have not been generated yet** on a fresh upload.
- **Music-only videos** — there is no speech to write down.
- **Live streams and live replays.** I tried one (a 24/7 live music stream) and it reported no caption track, exactly as it should.
- **Private, members-only, age-restricted or deleted videos.** YouTube does not hand those out.

If you have the video as a file instead of a link, use [Video to Text](https://instascript.app/video-to-text) or [Audio to Text](https://instascript.app/audio-to-text) — those run a speech model in your browser and do not need a caption track.

## What I measured on this page

Every row below is one run on the live page, on my own laptop and my own connection, on 17 September 2026. Time to result is the whole trip: looking the video up, the browser check, and the caption download.

| Video | Length | Track | Lines | Characters | Time to result |
| --- | --- | --- | --- | --- | --- |
| Me at the zoo | 0:19 | English | 6 | 212 | 18.8 s |
| Despacito | 4:42 | English | 90 | 2,901 | 1.5 s |
| Despacito | 4:42 | Spanish | 91 | 2,908 | 8.4 s |
| Your Body Language May Shape Who You Are (TED) | 21:03 | English | 428 | 19,673 | 10.3 s |
| 24/7 live music stream | live | none found | — | — | "no caption track" |

**How to read the time column:** the 1.5 s row is a video I had already looked up, so the answer was still cached; the others include a fresh lookup. The same video came out at 1.5 s cached and 13.8 s cold, which is the size of that difference.

**Where my testing stops:** the longest video I tried is 21:03. I am not going to print a length limit, a free-use limit or an accuracy figure, because I have not measured one — the rows above are what I actually ran.

## What is a YouTube transcript?

A **YouTube transcript** is the spoken content of a video written out as text, usually with the time each line starts. People use them to pull quotes, turn a talk into notes or a blog post, find the exact minute something was said, read a video in a second language, and make a video searchable. When a page says "YouTube transcript" it normally means the caption text that already sits on the video, not a fresh transcription of the audio.

## How to turn YouTube to transcript text

1. **Copy the video link** from the address bar, the Share button, or a youtu.be short link.
2. **Paste it in the box above** and press Get Transcript.
3. **Read, copy or download.** Pick another language from the dropdown if the video has more than one caption track.

## FAQ

### Can I turn a YouTube video to transcript text on my phone?

Yes. The page is built for a phone screen: paste the link in the YouTube app's Share sheet copy, or open this page in your mobile browser and paste there. Copy and download both work on mobile.

### Is my video uploaded anywhere?

No video file is uploaded, because no video file is downloaded. The link you paste goes to this site's own lookup endpoint, and the caption text is fetched by your browser directly from YouTube. Nothing is stored and there is no account.

### Which languages are supported?

Whatever caption tracks the video has. If a video has more than one, the page lists them and you pick; if it has one, you get that one. I am not going to quote a number of supported languages — it is a property of the video, not of this page.

### How long can the video be?

I have not found a ceiling, so I will not print one. The longest video I ran through this page is 21:03 and it came back as 428 lines. Longer videos mean more text in the browser, which is a limit of your device, not of the page.

### Why did it fail on a video that clearly has captions?

Three reasons, in order of likelihood: an extension or strict privacy setting blocked the browser check YouTube asks for; the captions are switched off for embedding; or YouTube throttled the request — wait a minute and try again.

### Do you store the transcript?

No. The text is built in your browser and stays there until you copy or download it. See the [privacy policy](https://instascript.app/privacy).

InstaScript is an independent personal project. It is not affiliated with, endorsed by, or sponsored by YouTube or Google.
