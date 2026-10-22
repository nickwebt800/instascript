# YouTube Transcript Download — YouTube Subtitles Download & YouTube SRT Download | InstaScript

> YouTube transcript download: paste a YouTube link and take the transcript away as a file. TXT for notes and documents, SRT for subtitles and video editors. Timestamps from the video's own caption track. No signup.

Canonical: <https://instascript.app/youtube-transcript-download>

[Open the tool](https://instascript.app/youtube-transcript-download)

## Download a caption track you can check

Use this YouTube transcript download tool to retrieve an existing caption track, choose its language, and save the format you need. It does not generate missing captions or translate a track.

Language and export illustrations use prepared practice captions to show the controls; they are not captions retrieved from the linked video. You can inspect the [practice SRT](https://instascript.app/assets/tutorials/youtube-transcript-download/practice.srt) separately. The lookup-error illustration comes from an actual query. A prepared example does not show that a live query will succeed.

## 1. How do I start a YouTube transcript download?

Paste a public `youtube.com`, `youtu.be` or YouTube Shorts link into **YouTube video URL**, then choose **Download Transcript**. That button starts the lookup; when captions arrive, choose a separate download button in the result. It does not automatically save every file.


The site asks for existing caption tracks. The browser may also need to contact YouTube and Google for a bot check and fetch the selected track. Allow time for the status to change. This process does not upload or transcribe video audio, and there is no guarantee that a public video’s captions can be retrieved.

![The YouTube URL form and actual Paste a YouTube link first validation message.](https://instascript.app/assets/tutorials/youtube-transcript-download/01-lookup-wide.svg)

Download Transcript requests captions. Saving TXT, Markdown or SRT is a separate step.

**Check:** Wait for a readable transcript or a specific error before choosing a file format.

## 2. How do I choose a different subtitle language?

When several tracks are available, use **Caption language**. Selecting another language clears the previous result and search. Choose **Download Transcript** again to request that selected track; wait for the new result before saving. With one available track, the selector is hidden.


The options belong to that video. An auto-generated label describes the source track; it is not a quality rating. The tool cannot add an unavailable language or automatically translate a caption track. Check a few lines in the returned language before exporting.

![Prepared example showing Caption language before and after selecting Spanish, with the instruction to submit again.](https://instascript.app/assets/tutorials/youtube-transcript-download/02-language-wide.svg)

Prepared practice captions illustrate the real selection controls. This is not a successful live video lookup.

**Check:** The result has reloaded after your language choice; do not reuse the old file.

## 3. Should I download TXT, Markdown or SRT?

**Download TXT** saves readable text. In **Timestamps** mode each caption line has its start time; **Plain text** joins the words into one block without times. **Copy** follows the same view mode. Choose the mode before saving.


**Markdown** adds a title, canonical YouTube source link and the selected caption language when available. Timestamps mode adds available start links to whole-second YouTube positions; Plain text omits those time links. It creates transcript notes, not an AI summary. **Download SRT** saves timed cues for a subtitle editor or player, independently of the text-view toggle.

![Prepared example of timestamp/plain-text and download controls, with actual practice TXT exports with and without timestamps.](https://instascript.app/assets/tutorials/youtube-transcript-download/03-formats-wide.svg)

Both TXT excerpts were downloaded from the prepared practice example, not a live caption track.

**Check:** Use SRT for a timed subtitle track; choose text-view mode for TXT and Markdown.

## 4. How do I check the downloaded SRT before using it?

Open the SRT in a text editor or [Subtitle Editor](https://instascript.app/subtitle-editor). Check the language and words near the beginning and end, then compare several time ranges against the video you are permitted to use. Each caption segment becomes one SRT cue; exporting does not correct wording or timing drift.


Start times and durations normally come from the track. The current exporter substitutes a **two-second duration** when a segment has a missing or zero duration; it is not an audio-alignment measurement. Do not assume every end time was supplied by YouTube. The TXT joins lines in Plain text mode; the SRT keeps separate cues. Saving SRT creates a separate file and does not burn captions into a video or change captions on YouTube.

![Prepared caption Open the garden gate and its exported SRT time range from zero to three seconds.](https://instascript.app/assets/tutorials/youtube-transcript-download/04-check-wide.svg)

This example has an explicit three-second duration. Missing or zero durations use the exporter’s two-second fallback.

**Check:** Inspect words and synchronization in the destination player, not just the file extension.

## 5. What should I do when no caption file comes back?

Read the error before retrying. An empty lookup or an empty track response does not prove that a video has no captions. Check captions on YouTube and retry later if the service is unavailable or rate limited. Repeated retries are not a way to create a missing track.


A browser-check error can involve blocked Google scripts, network restrictions or upstream refusal. If appropriate, test another browser or review site-specific blocking settings. Success is not guaranteed. If you have a permitted local recording with English speech, [Video to Text](https://instascript.app/video-to-text) is a separate recognition workflow. It cannot fetch an arbitrary YouTube URL.

![Actual query error reporting that a caption track exists but returned no text, with recovery choices.](https://instascript.app/assets/tutorials/youtube-transcript-download/05-error-wide.svg)

Observed on October 22, 2026. The query did not produce a downloadable transcript.

**Check:** Separate an unavailable query from confirmed absence of a caption track.

## More questions and common problems

### Can I correct the transcript on this page?

The returned captions are read-only. Download SRT and use [Subtitle Editor](https://instascript.app/subtitle-editor) to edit a local copy. This does not update YouTube.

### How do I find a phrase before downloading?

Use Find in this transcript. Previous/Next and Enter/Shift+Enter navigate literal matches within a cue, ignoring ASCII letter case; Escape clears. Locate caption reveals the line and switches to Timestamps if needed. Changing view preserves the search; changing the track clears it. Search and highlighting do not enter exports.

### Does clicking a timestamp play the video here?

A timestamp or Open YouTube link opens YouTube in a new tab at a whole-second start. No player is embedded. The link contains the video ID and time, without your search query. Opening it contacts YouTube.

### Are captions or downloads stored on a server?

Lookup sends the video link to the server, which may fetch existing captions. Successful responses, including caption text, may be cached for one hour. Selected tracks and bot checks may contact YouTube/Google from the browser. Files are built locally; there is no account history. See the [privacy policy](https://instascript.app/privacy).

### Can I download on a phone?

Use a mobile browser and its download controls. Where the file is saved or opened depends on your browser and device settings. Check the browser’s downloads or share/save menu.

## Historical measurement notes

Previously published observations; not new measurements for this walkthrough.

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


InstaScript is an independent project and is not affiliated with the platforms or model providers mentioned.
