# Subtitle Editor: Edit SRT and VTT in Your Browser

> Open SRT, VTT or SBV subtitles, edit words and timing, replay a local recording, then save SRT or VTT. No upload or account.

Canonical: <https://instascript.app/subtitle-editor>

[Open the editor](https://instascript.app/subtitle-editor#subtitle-tool)

## Edit subtitles, one step at a time

Open a subtitle file, correct its words and timing, replay your recording, then save SRT or VTT. Follow the questions below in order, or jump to the step you need.

1. [How do I open a subtitle file?](https://instascript.app/subtitle-editor#open-subtitles)
2. [How do I change subtitle text and timing?](https://instascript.app/subtitle-editor#edit-cues)
3. [How do I move all subtitles earlier or later?](https://instascript.app/subtitle-editor#shift-times)
4. [How do I check subtitles against my recording?](https://instascript.app/subtitle-editor#review-recording)
5. [Why are the export buttons disabled?](https://instascript.app/subtitle-editor#fix-export)
6. [How do I save the edited subtitles?](https://instascript.app/subtitle-editor#save-subtitles)

**Follow along:** save the [practice SRT](https://instascript.app/assets/tutorials/subtitle-editor/practice.srt) and [11-second practice recording](https://instascript.app/assets/demo/kennedy-1961.wav), then open them in the editor above. The public-domain JFK recording uses prepared phrase timings. It is an editing demonstration, not a live transcription or accuracy measurement. [Recording source and rights](https://instascript.app/assets/demo/SOURCE.md).

### 1. How do I open a subtitle file?

Choose **Open SRT / VTT / SBV** and select one subtitle file, then click **Load into editor**. You can also paste subtitle text into the box before loading it. Each cue becomes a row with a start time, end time and caption text.

Selecting a file fills the text box; it does not load the editable rows yet. Check that the text appears, then load it. If the file cannot be read, save a UTF-8 copy and try again. Invalid timing or empty source cues must be fixed before import.

![Choose Open SRT / VTT / SBV, then click Load into editor to turn the practice file into three editable rows.](https://instascript.app/assets/tutorials/subtitle-editor/01-open-narrow.svg)

Choose the file first, then load the rows. Pasted subtitle text follows the same loading step.

**Check:** You should see three editable rows when using the practice file.

[Back to the editor](https://instascript.app/subtitle-editor#subtitle-tool)

### 2. How do I change subtitle text and timing?

Edit the **Caption** field to change the words. Edit **Start** and **End** to change when that cue appears and disappears. Your changes apply immediately to the editor; save a download to keep them after closing the tab.

Use times such as `00:00:03,600` or shorthand such as `3.6`. End must be later than Start. The picture changes punctuation only to make an edit visible; use your recording to decide the correct wording.

**Add entry** creates a blank cue after the last entry. Give it text and valid times before exporting. **Remove** deletes that row. Keep an untouched source file so you can start again if needed.

![Close-ups of the Start and End fields and the Caption field before and after a punctuation edit.](https://instascript.app/assets/tutorials/subtitle-editor/02-edit-narrow.svg)

Edit one row at a time. Text changes do not automatically adjust the timing.

**Check:** Read the edited words, then verify that Start is earlier than End.

[Back to the editor](https://instascript.app/subtitle-editor#subtitle-tool)

### 3. How do I move all subtitles earlier or later?

Use **Shift all times (seconds)** when the whole subtitle track is consistently early or late. Enter an offset and click **Apply shift** once. A positive value moves every cue later; a negative value moves every cue earlier.

In this example, `0.5` moves cue 2 from `00:00:03,600 → 00:00:07,500` to `00:00:04,100 → 00:00:08,000`. These are the practice file’s actual before-and-after times.

Each click applies the offset again. Check the result before clicking twice. Times below zero are clamped to zero; a large negative shift can make a cue end at its start and block export. Repair that cue or reload your original file. If timing drifts unevenly, review individual cues instead of applying one offset to everything.

![Enter 0.5 in Shift all times and apply it once; cue 2 changes from 3.600–7.500 seconds to 4.100–8.000 seconds.](https://instascript.app/assets/tutorials/subtitle-editor/03-shift-narrow.svg)

A positive half-second shift moves both boundaries later. It changes every cue in the file.

**Check:** Replay the beginning and end of the recording after an overall shift.

[Back to the editor](https://instascript.app/subtitle-editor#subtitle-tool)

### 4. How do I check subtitles against my recording?

Choose **Open recording for review** and select a local audio or video file. Click a cue’s number in the first column to start playback from that cue’s start time. If playback does not begin, press Play in the media controls.

Listen for names, numbers, missing words and the start of each phrase. The player lets you hear the recording; it does not automatically align captions, display an audio waveform or overlay the subtitle track. Check the exported file with your video in its destination player too.

Playback depends on the browser’s codec support. If the recording cannot play, you can still edit and export subtitles. The recording stays in this tab and is released when you clear the editor.

![Open a local recording, then click the number 2 beside a cue to replay it from 3.600 seconds.](https://instascript.app/assets/tutorials/subtitle-editor/04-review-narrow.svg)

The practice recording is played locally. Its player shows whole seconds, while cues keep millisecond timing.

**Check:** Start from a cue number and confirm that you hear the expected phrase.

[Back to the editor](https://instascript.app/subtitle-editor#subtitle-tool)

### 5. Why are the export buttons disabled?

Every cue needs text and valid times with End later than Start. If a cue fails that check, **Copy SRT** and both download buttons are disabled. Read the status message above the recording controls to find the cue that needs attention.

The example deliberately sets cue 1’s Start and End to zero. Restore its End to `00:00:03,600` to repair this practice cue. For your own file, use the correct time from the recording. If the message says a cue needs subtitle text, fill its Caption field or remove the unwanted row.

Check the message again after each repair: another invalid cue may still need attention. Valid overlapping cues keep their timing; overlap alone is not an export error.

![A zero-duration cue triggers the real invalid-time message and disables Download SRT; valid times and non-empty text restore export.](https://instascript.app/assets/tutorials/subtitle-editor/05-fix-narrow.svg)

This invalid time was introduced for the demonstration. Fix the reported cue before downloading.

**Check:** The status should say “Subtitles are ready for export.” and the download buttons should be enabled.

[Back to the editor](https://instascript.app/subtitle-editor#subtitle-tool)

### 6. How do I save the edited subtitles?

Choose **Download SRT** or **Download VTT**, using the format your destination player or editor accepts. Both include your edited words and times. **Copy SRT** copies the subtitle syntax, including timecodes, rather than plain transcript text.

Reopen the downloaded file and check the first and last cues, the lines you edited and any shifted times. Then test it with the recording in the destination player. A successful download confirms that a file was created, not that the wording or synchronization is correct.

Download before closing or reloading the tab. There is no account project history or automatic cloud save. To remove timecodes instead, use [SRT to Text](https://instascript.app/srt-to-text).

![Download SRT or VTT, then inspect the actual SRT download showing the edited first cue and its start and end times.](https://instascript.app/assets/tutorials/subtitle-editor/06-save-narrow.svg)

The file excerpt comes from an actual download after the punctuation edit. Keep your original separately.

**Check:** Confirm that the exported file contains your latest changes.

[Back to the editor](https://instascript.app/subtitle-editor#subtitle-tool)

## More questions

### Which subtitle formats can I edit?

Open one SRT, VTT or SBV file, or paste its text. Export SRT or VTT. SRT uses comma-separated milliseconds; WebVTT uses a `WEBVTT` header and period-separated milliseconds. SBV input uses comma-separated time ranges.

The editor works with cue text and timing. VTT style blocks, positioning settings and inline formatting tags are not retained. Use subtitles under 2 million characters and up to 10,000 cues. It does not merge or batch-edit files.

### Are my subtitles or recording uploaded?

No. Local subtitle parsing, edits, playback and downloads happen in your browser. No account is needed. Another InstaScript transcription tab can send cues and a recording directly to this same-origin editor tab; that transfer is not placed in the URL or saved as a cloud project. See the [privacy policy](https://instascript.app/privacy).

### Can I edit subtitles in another language?

Yes. You supply the subtitle text; this editor does not run speech recognition or translate it. The English-only limit belongs to the separate speech transcription tools. If you want to enter a translation while keeping source timing, use the [manual Subtitle Translator](https://instascript.app/subtitle-translator).

### What if I only have a recording or plain text?

For an English recording, use [Video to Text](https://instascript.app/video-to-text) or [Audio to Text](https://instascript.app/audio-to-text) first, review the transcript, and send valid timed cues to this editor or export SRT. If you only have plain text, [TXT to SRT](https://instascript.app/txt-to-srt) creates an estimated timing draft for manual review. This editor does not transcribe audio or perform automatic alignment.
