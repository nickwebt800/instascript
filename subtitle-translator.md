# Subtitle Translator: Edit SRT Cues Locally | InstaScript

> Manually translate SRT subtitles in your browser while keeping their timecodes. Open one local SRT or VTT file, edit translated cues, and download SRT without uploading it.

Canonical: <https://instascript.app/subtitle-translator>

[Open the tool](https://instascript.app/subtitle-translator)

## Use the manual subtitle translator

Open a timed subtitle file, replace its wording with your own translation, and save an SRT with the original cue times. This short walkthrough covers the controls beside the tool. For meaning across cues, bilingual wording and longer review scenarios, use the illustrated SRT translation guide.

Try the [three-cue practice SRT](https://instascript.app/assets/tutorials/subtitle-translator/practice.srt). The garden instructions and manually entered Spanish are fictional teaching examples. They do not demonstrate automatic translation or measure translation quality. For detailed translation review, follow the [Translate SRT guide](https://instascript.app/translate-srt).

## 1. How do I open a file in this subtitle translator?

Choose **Open SRT / VTT** and select one local file. Cues load immediately, without a separate Load button. Each row shows its source time range, source words and a **Translation** field. The practice SRT opens as three rows.


Translation fields initially contain the original words. Opening a file has not translated it. Keep the untouched source separately. This editor accepts SRT or VTT, under 2 million characters and up to 10,000 cues. Invalid source times or empty source cues must be repaired before import.

![Open SRT or VTT loads cues immediately; the first Translation field contains the original garden instruction.](https://instascript.app/assets/tutorials/subtitle-translator/01-open-wide.svg)

These are actual interface crops after opening the three-cue practice SRT.

**Check:** The expected rows appear, with the correct source words and time ranges.

## 2. Where do I enter the translation, and what if I leave a field blank?

Replace the text in each **Translation** field with wording you have written or reviewed. The source remains visible alongside it. There is no target-language selector or automatic translation button. The example enters `Abre la puerta del jardín.` for the first instruction.


An untouched field exports the original wording. A blank or whitespace-only field also falls back to the source text; it does not delete the cue. Check every field before saving, including later rows. For a sentence split across cues or uncertain wording, use the [context-review steps](https://instascript.app/translate-srt#translate-across-cues) in the longer guide.

![Manually entered Spanish in the first Translation field and a deliberately blank second field whose actual SRT export retains Walk along the path.](https://instascript.app/assets/tutorials/subtitle-translator/02-replace-wide.svg)

The partial download really retained the second cue’s English source. A blank field is not a removal command.

**Check:** Each cue that needs translation contains your reviewed target-language wording.

## 3. How do I download the translated subtitles without changing timing?

Choose **Download translated SRT**. It saves the current wording with the imported start and end times. The practice first cue remains `00:00:01,200 → 00:00:03,400` after the Spanish edit. Open the actual download in [Subtitle Editor](https://instascript.app/subtitle-editor) and compare the cue count, words and times with the original.


VTT input is rewritten as SRT; positioning, style blocks and inline cue tags are not retained. Check the saved captions with the intended recording in your destination player, including line length and character display. Download before closing or reloading: there is no saved project or cloud translation history.

![Download translated SRT control and the actual saved Spanish first cue with its unchanged 1.200 to 3.400 second time range.](https://instascript.app/assets/tutorials/subtitle-translator/03-save-wide.svg)

The completed practice export was reopened in Subtitle Editor with all three original time ranges.

**Check:** The downloaded SRT has your intended wording and the source time ranges.

## More questions and common problems

### Why will my subtitle file not open?

Read the import message and repair a copy of the source. SRT/VTT needs non-empty cue text and valid time ranges with End after Start. A recording, image subtitle or URL is not a subtitle text file. The editor does not repair malformed source timing.

### Can I change timing or listen to the video here?

This translator edits wording while retaining imported times. Save SRT and use [Subtitle Editor](https://instascript.app/subtitle-editor) for cue timing and optional local recording playback. The translator has no audio player, waveform, automatic alignment or video rendering.

### Can I translate another language or create bilingual captions?

You supply the target-language text, including Unicode. The separate speech-recognition tools’ English-only limit does not apply to this manual editor. For bilingual lines and reading-space checks, use the [bilingual subtitle guidance](https://instascript.app/translate-srt#bilingual-subtitles).

### Are my subtitle files sent to a translation service?

No. Reading, manual editing and downloads happen in this browser, without an account or translation API call. Clear removes the current editor contents. Keep separate originals and downloads; there is no project history. See the [privacy policy](https://instascript.app/privacy).
