# How to Get a Transcript of a YouTube Video

**Open the video.** **Expand the description** — the `…more` link under the title. At the foot of the expanded text there is a control labelled **Show transcript**. Press it and the transcript opens beside the player, already cut into timestamped lines. **Select, copy, paste.** That is the whole job, and the rest of this page is about the parts of it that almost nobody measures: what the panel actually contains, what a copy produces byte by byte, and the two places where the popular instructions quietly break.

## Where the control is — and where it isn't

Most guides still send you to the three-dots menu next to Save, under the player. On the page I checked, that menu held a single item: **Report**. No transcript entry, nothing folded away below it.

The real control lives in the description, and it has an odd property worth knowing. Before you expand the description, the button exists in the page at zero width and zero height — present in the markup, invisible on screen. Expand the description and it becomes a normal clickable rectangle. So if you scan a collapsed page for the words "Show transcript" and conclude the video has no captions, you may simply be looking at an unexpanded description.

One more thing about that button: it is not the only wording you will meet. Older write-ups say "Open transcript". Same control, older label.

If the words are what you want rather than a file, copying them out of that panel is the whole job. If you want them as a file instead — a TXT you can paste into a document or an SRT you can drop next to the video — the [YouTube transcript download](/youtube-transcript-download) page builds both from the same caption track.

## What the panel contains

Three things, and the third one is the step that decides whether your copy is usable.

At the top sits a search field whose placeholder reads **Search in video**. It belongs to the panel, not to the browser. Pages that tell you to press Ctrl+F and hunt through the panel with the browser's find are describing a workaround for a field they did not notice was there.

At the bottom, a footer line names the language and appends **(auto-generated)** when the text was produced by speech recognition — `English (auto-generated)` on a machine-made track, plain `English` when a human wrote the captions. You do not need to open any settings menu to see which kind you are reading.

And in the panel's header there is a three-dots menu. Open it and you will find exactly one item: **Toggle timestamps**. Nothing else. It is the only setting YouTube gives you in there.

## What a copy produces, measured

Selecting the whole list and reading the selection back gives very different results depending on that one toggle. On a 21:03 talk:

- Timestamps on: **22,478 characters**, shaped as a timestamp line, then a text line, then another timestamp — `0:15`, a sentence fragment, `0:21`, the next fragment.
- Timestamps off: **20,100 characters** of continuous text. The stamps cost about 2,400 characters, roughly a tenth of the file.

Two things survive the toggle. Line breaks still follow caption cues rather than sentences, so "clean" text is a stack of short lines, not paragraphs. And the bracketed stage directions YouTube writes into captions — `[Music]`, `[Applause]` — plus credit lines at the top of professionally captioned videos come along regardless. Deleting lines that contain nothing but `\d{1,2}:\d{2}(:\d{2})?` is a five-second job in any editor with regular-expression replace; the brackets and the line breaks are the part that needs a human.

There is a subtler trap. The same video did not serve me the same text twice. On one visit the panel opened on the machine-made track; on another, the human-written one, with punctuation and full sentences where the first visit had none. Which track you land on is not something the panel asks you about first. Check the footer before you judge the quality of what you copied — you may be comparing two different documents.

## On a phone

"Mobile" is two different websites wearing one name. On `m.youtube.com` I found no transcript control anywhere. Point the same phone browser at `www.youtube.com` and the request is redirected to a URL carrying `app=desktop` — and there the control is present, in the description, exactly as on a laptop.

So the honest version of the mobile answer is: use the browser, not the short domain, and expect to land on a desktop-shaped page. I did not test the native app and I am not going to guess about it.

## When there is nothing to get

A transcript on YouTube is not a transcription service. It is a view onto a caption track that already exists — uploaded by the publisher or generated from the audio by YouTube. No track, no control, no transcript; the button is absent because there is nothing for it to open.

Getting text out of a captionless video means transcribing the audio, which is a different machine doing a different job. Its output is an approximation: names spelled phonetically, numbers off by a digit, speakers run together, no punctuation. Any promise of a "transcript" for a video without captions is selling you that approximation under a more confident name. Know which one you are buying before you quote it.

That is a different job with different tools. If you have the video as a file and there is no caption track to read, [Video to Text](/video-to-text) runs a speech model in your browser and does not need one.

## The short checklist

1. Expand the description. The control is at its foot, not in the three-dots menu.
2. Read the footer. `auto-generated` means expect phonetic errors.
3. Use the panel's own search field, not the browser's find.
4. Toggle the timestamps off **before** copying; afterwards is a worse cleanup job.
5. Strip the leftover brackets and cue breaks yourself.
6. No control at all? There is no caption track. Reading is finished here.

## FAQ

### How to get transcript from YouTube video without any software?

On YouTube's own page, with nothing installed: expand the description, press Show transcript, and copy out of the panel that opens beside the player. There is no download button in there, which is why copying is the last step rather than saving.

### How to get script from YouTube video when what I want is the script, not subtitles?

Same control, and the footer tells you which kind of script you are reading — a human-written track reads in full sentences, a machine-made one comes out unpunctuated. Toggle the timestamps off before you copy and you get the words as one block instead of alternating time and text lines.

### How to get a YouTube transcript when the video has no captions?

You cannot get one from YouTube, because there is no track for the control to open — the button simply is not there. The options at that point are a publisher who adds captions later, or transcribing the audio yourself.

## What I could not verify

The language name in the footer carries a dropdown chevron, but it did not open in an automated run, so I cannot say what it lists or how many languages a given video offers. One of the four videos I opened during testing never rendered the panel at all. Everything above was measured on desktop Chrome, English/US, signed out, 17 September 2026, on three videos of 1:59, 2:53 and 21:03. YouTube rearranges this surface without announcing it — re-check rather than trust the date.

---

InstaScript is an independent personal project. It is not affiliated with, endorsed by, or sponsored by YouTube or Google.
