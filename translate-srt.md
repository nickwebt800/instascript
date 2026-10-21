# Translate SRT: Review Meaning Without Losing Timing | InstaScript

> Translate SRT wording manually while preserving cue times. Use a local editor, check meaning across cue boundaries, and inspect the exported subtitle file.

Canonical: <https://instascript.app/translate-srt>

To **translate SRT**, open a local subtitle file in the [Subtitle Translator](https://instascript.app/subtitle-translator), replace the wording in each cue with your own translation, and download SRT with the original start and end times. This is a manual workflow: InstaScript does not generate translations automatically.

[Open the manual SRT editor](https://instascript.app/subtitle-translator)

## Translate subtitles, then check what you saved

Need to keep subtitle timing, fix untranslated lines or review a sentence split across cues? Choose the step below. [Jump to more translation problems](https://instascript.app/translate-srt#translation-questions).

1. [How do I open an SRT or VTT file for translation?](https://instascript.app/translate-srt#open-translation-source)
2. [How do I translate a sentence split across subtitle cues?](https://instascript.app/translate-srt#translate-across-cues)
3. [Where do I enter my translated subtitle text?](https://instascript.app/translate-srt#enter-translation)
4. [Why does my downloaded SRT still contain original-language subtitles?](https://instascript.app/translate-srt#original-words-remain)
5. [How do I export translated subtitles without changing the timecodes?](https://instascript.app/translate-srt#export-translated-srt)
6. [How do I check the translated SRT before publishing?](https://instascript.app/translate-srt#check-saved-translation)

**Follow along:** save the [practice SRT](https://instascript.app/assets/tutorials/translate-srt/practice.srt) and open it in the manual editor. Its bag-and-rain dialogue and Spanish wording are fictional teaching examples, not a real recording or a translation-quality measurement. The images show actual edits and downloads made with this file.

### 1. How do I open an SRT or VTT file for translation?

Open the [manual Subtitle Translator](https://instascript.app/subtitle-translator) and choose **Open SRT / VTT**. Select one local file. Its cues load automatically; there is no separate Load button. Each row shows a cue number, its original time range, the source wording and a **Translation** field.

Keep an untouched source copy. Translation fields initially contain the source words, so opening the file alone has not translated it. Check the first and last cues before editing. This editor accepts one SRT or VTT file at a time, under 2 million characters and up to 10,000 cues.

![Choose Open SRT / VTT to load the practice file automatically, then read the first cue and its original 2.000–4.000 second time range.](https://instascript.app/assets/tutorials/translate-srt/01-open-narrow.svg)

These are real interface crops from the manual translator. File selection loads the cues immediately.

**Check:** You should see three rows when using the practice SRT.

[Open the manual editor](https://instascript.app/subtitle-translator)

### 2. How do I translate a sentence split across subtitle cues?

Read the cue before and after the one you are editing. A display interval is not always a complete sentence. Identify the subject, negative wording, condition and correction before deciding how to phrase the translation.

In the practice file, cue 1 says **Leave the blue bag here** and cue 2 adds **unless it starts raining.** Translate them as one instruction with an exception. Dropping “unless” changes what the viewer is told to do. Cue 3, **Then bring it inside.**, depends on that context too.

A target language may place a condition differently. Read the translated cues together, including the moment between them, so the first cue does not give a misleading instruction. The editor keeps existing boundaries; it does not redistribute words or verify meaning.

Keep a separate review note for uncertain terms, quantities, names or context. Mark which cue needs checking, consult the source recording or a reliable reference, and keep those notes out of the subtitle text.

![Cue 1 says Leave the blue bag here; the next cue adds unless it starts raining. Read both before translating the instruction.](https://instascript.app/assets/tutorials/translate-srt/02-context-narrow.svg)

The bag-and-rain text is a fictional teaching example. Preserve the exception across the two cues.

**Check:** Read the translated pair as one sentence and confirm that its condition remains clear.

[Open the manual editor](https://instascript.app/subtitle-translator)

### 3. Where do I enter my translated subtitle text?

Replace the prefilled text in each **Translation** field with wording you have written or reviewed. The source text remains visible for comparison. You supply the target-language words; there is no language selector or automatic translation step.

The example changes cue 1 to **Deja aquí la bolsa azul** and cue 2 to **a menos que empiece a llover.** This illustrative Spanish text was entered into the editor; it was not generated by the tool.

Review repeated terms consistently, and check names, numbers, units and negative instructions against the source. A fluent sentence can still contain the wrong meaning. Ask a competent target-language reviewer to resolve wording you cannot verify.

![The Translation field starts with English source text; manually entered Spanish replaces it while the source and cue times remain unchanged.](https://instascript.app/assets/tutorials/translate-srt/03-translate-narrow.svg)

The editable field is the translation. The separate source wording stays available for comparison.

**Check:** Inspect every Translation field, not just the first row.

[Open the manual editor](https://instascript.app/subtitle-translator)

### 4. Why does my downloaded SRT still contain original-language subtitles?

An untouched Translation field still contains its source wording. A field cleared to blank or whitespace also exports the original words. Clearing a Translation field does not remove that subtitle.

In this demonstration, cue 1 is translated and cue 2 is deliberately left blank. The actual SRT download still contains **unless it starts raining.** in English. The untouched third cue also remains in English.

Return to the editor, supply the intended translation in every required field, download again, and inspect the new file. Repeated names or short words can legitimately match the source, so review their context rather than assuming every exact match is wrong.

![A blank Translation field for cue 2 exports its original English words instead of deleting the cue; the excerpt comes from the actual partial download.](https://instascript.app/assets/tutorials/translate-srt/04-fallback-narrow.svg)

Blank and untouched fields can leave a mixed-language file. A successful download does not confirm a complete translation.

**Check:** Scan the whole saved file for source-language passages you did not intend to keep.

[Open the manual editor](https://instascript.app/subtitle-translator)

### 5. How do I export translated subtitles without changing the timecodes?

Choose **Download translated SRT**. The downloaded file uses your entered wording with the source cue start and end times. This editor does not provide timing fields, stretch a timeline or align translated words to speech.

The practice export keeps all three time ranges. For example, cue 1 remains `00:00:02,000 → 00:00:04,000` after its wording changes to Spanish. Preserve the original file separately and compare cue counts and time ranges in the export.

VTT input is exported as SRT, with comma-separated milliseconds. VTT positioning settings, style blocks and inline cue tags are not retained. Matching timecodes confirm timing preservation; they do not confirm the translation is accurate or comfortably readable.

![Click Download translated SRT; the actual saved first cue contains Spanish wording and the unchanged 2.000–4.000 second timing.](https://instascript.app/assets/tutorials/translate-srt/05-export-narrow.svg)

This excerpt comes from the actual SRT export. Text changes while the original cue interval stays attached.

**Check:** Compare the source and saved file’s cue count, first and last times, and every cue you need to verify.

[Open the manual editor](https://instascript.app/subtitle-translator)

### 6. How do I check the translated SRT before publishing?

First check structure: reopen the actual download in [Subtitle Editor](https://instascript.app/subtitle-editor) and compare cue order, wording and start/end times. Open the saved file rather than relying on an older browser tab.

Next check meaning: read adjacent cues together, revisit your review notes, and verify names, quantities, conditions and corrections. For the practice file, make sure the exception in cue 2 still applies to the instruction in cue 1.

Finally check presentation: load the subtitles with the intended recording in your destination player or video editor. Inspect character display, line wrapping, placement and whether each line can be read during its interval. Player presentation may differ from this editor.

If wording does not fit, shorten it without losing the condition or other essential meaning. If timing needs adjustment, make a separate reviewed change in Subtitle Editor and test it against the recording.

![The actual translated SRT is reopened in Subtitle Editor with its Spanish text and original start time; review the second cue’s exception too.](https://instascript.app/assets/tutorials/translate-srt/06-review-narrow.svg)

Reopening verifies what was saved. Meaning and video presentation still need their own review.

**Check:** Keep the source, translated export and checked final version as separate files.

[Open the manual editor](https://instascript.app/subtitle-translator)

## More subtitle translation problems

1. [Can this tool translate my whole SRT automatically?](https://instascript.app/translate-srt#automatic-translation)
2. [Can I translate English subtitles into Spanish, Chinese or another language?](https://instascript.app/translate-srt#target-language)
3. [My translation is too long for the subtitle time. What should I do?](https://instascript.app/translate-srt#translation-too-long)
4. [How do I make subtitles that show both languages?](https://instascript.app/translate-srt#bilingual-subtitles)
5. [Why will my subtitle file not open?](https://instascript.app/translate-srt#subtitle-wont-open)
6. [Can I translate subtitles from an MP4 or YouTube link here?](https://instascript.app/translate-srt#video-without-subtitles)
7. [Are my subtitles sent to a translation server?](https://instascript.app/translate-srt#translation-privacy)
8. [Can I close the tab and continue translating later?](https://instascript.app/translate-srt#save-before-closing)

### Can this tool translate my whole SRT automatically?

No. It is a manual local editor. You write or paste the wording in each cue. It does not call a translation service or assess translation quality. If you need automatic translation, obtain and review that translation separately before entering it here.

### Can I translate English subtitles into Spanish, Chinese or another language?

You can enter your own target-language text, including Unicode characters. Subtitle editing does not have the English-only restriction used by the separate speech-recognition tools. The editor does not identify a language or check grammar. Verify fonts, character direction and readability in the player where the subtitles will be used.

### My translation is too long for the subtitle time. What should I do?

Read the whole meaning unit, then shorten the wording without removing a condition, negative, number or other essential detail. If a timing change is needed, save the translated SRT and open it in [Subtitle Editor](https://instascript.app/subtitle-editor). Review the change against the recording and neighboring cues. This translator does not calculate reading-speed targets or automatically retime captions.

### How do I make subtitles that show both languages?

There is no automatic bilingual export. You can manually enter the source and translation on separate lines within each Translation field; both lines become that cue’s text. Check the exported file and its display in the destination player, since two languages need more reading space and time. The tool does not create separate language tracks.

### Why will my subtitle file not open?

Use a readable SRT or VTT text file. Invalid timecodes, an end at or before the start, and empty source cues must be corrected before import. Use fewer than 2 million characters and no more than 10,000 cues. If importing fails, check the displayed error and repair a copy of the source. A video file, image subtitle or URL is not an SRT/VTT file.

### Can I translate subtitles from an MP4 or YouTube link here?

This editor starts with an existing local SRT or VTT. It does not read a video URL, listen to a recording, extract burned-in text or render captions into a video. For existing YouTube caption tracks, use [YouTube Transcript Download](https://instascript.app/youtube-transcript-download) first. For a permitted English recording without subtitles, use [Video to Text](https://instascript.app/video-to-text), review the transcript, then prepare a timed source for translation.

### Are my subtitles sent to a translation server?

No. Local file reading, manual edits and SRT downloads happen in your browser. There is no translation API request. No account is needed. See the [privacy policy](https://instascript.app/privacy).

### Can I close the tab and continue translating later?

Download your current SRT before closing or reloading. There is no saved project or cloud translation history. On reopening a partially translated export, its mixed-language wording becomes the source; keep the untouched original and separate review notes so you can tell what still needs work.
