# Thematic Coding: Build a Claim from Passages, Not Cue Counts

Canonical: <https://instascript.app/thematic-coding>

Read the whole exchange, label relevant passages with an explicit coding rule, group related labels into a provisional idea, and test that idea against passages that complicate it; keep each excerpt attached to its source and transcript version throughout.

This exercise follows a candidate interpretation through actual saved recognition outputs. The code labels and review decisions are authored examples, not automated research findings. The source wording has not been independently verified, so the exercise shows how to examine a proposed claim without presenting it as an established account of the speaker.

## Define the claim you want to examine

For this exercise, our question is how the recorded draft represents a person's account of taking on work. Start with a small descriptive label before writing a larger explanation. A label identifies material to examine; the larger explanation must account for its context and for relevant material that does not fit neatly.

The [Nielsen Norman Group guide](https://www.nngroup.com/articles/thematic-analysis/) describes coding text segments and reviewing possible themes against the data. Here we add a particular source problem to that workflow: the same recording has machine-generated versions with different boundaries. Neither the number of rows nor agreement between those versions supplies an independent research participant.

## Our candidate-code record: job need and liking the task

The public source is Library of Congress oral-history recording ncr002360. You can open the [specific audio file](https://stream-media.loc.gov/afc/buckaroos/afc1991021_017.mp3); the [retained output data](/data/thematic-coding-record.json) gives the selected recognition segments and their settings. It is an individual interview, not a focus group. No independent human reference for the original words has been established.

tiny.en cue 7 at 17.860–20.120 seconds contains **I just needed a job really.** small.en cue 8 at 17.640–19.760 seconds contains the same words with an added comma. Our proposed descriptive label is **needing a job**. Its inclusion condition is a checked passage in which that need is expressed. The machine text identifies a candidate for review; it does not itself satisfy the independent wording check.

Later, both outputs contain **I just like to do it.** tiny.en puts this in cue 22 at 59.820–61.400 seconds; small.en uses cue 22 at 59.640–61.360 seconds. Our proposed label for that candidate passage is **liking the task**. We keep it beside the job-need candidate rather than discarding it because it complicates a simpler story.

Suppose an analyst proposed **work was only a necessity** as the organizing claim. In this exercise, that exclusive wording would need reconsideration: the retained drafts also include a liking statement. That is a conditional interpretation of the machine text, not a finding about the person. Even after the words are checked, deciding what they mean would still require the surrounding exchange and the study's actual question.

Our example ledger therefore leaves the final theme unassigned. It records the proposed labels, the passages that prompted them and the reason an exclusive-necessity claim has not been accepted. This is more informative than filling a theme cell with a confident conclusion simply because a table has room for one.

## Keep the negation with the passage

Both runs also return a statement that the job is not that difficult. tiny.en cue 20 reports 54.840–57.040 seconds and ends with a comma; small.en cue 20 reports 54.800–56.780 seconds and ends with a period. These are saved output windows, not independently validated speech boundaries or measurements of a pause.

For a candidate label such as **finding the task manageable**, our authored inclusion rule keeps the negation and the nearby explanation available for checking. Selecting just the word **difficult** would not support the same reading of the draft. A keyword hit can locate a passage; it cannot decide the direction of the claim on its own.

We have not checked the original wording or assigned a completed research code. The point of this ledger is to show exactly which text the proposed label depends on. If a listener later amends that text, the affected label and its associated interpretation should be reconsidered rather than silently carried forward as though nothing had changed.

## Separate machine rows from the evidence unit

The statement about a task having to be done is divided differently in the saved versions. tiny.en cue 18 ends with **one of those things**, followed by **that has to be done.** in cue 19. small.en ends cue 18 earlier and puts **one of those things that has to be done.** into cue 19. Its preceding equipment word also differs. The complete selected rows are preserved in the downloadable record.

Our proposed unit for reviewing that statement spans the relevant material instead of inheriting a single machine row. If a coding operation assigns a label to each row, changing the segmentation can change the labelled row set without adding another recorded statement. Describe what your unit means before using a row tally as evidence for a pattern.

The same caution applies across models. These passes processed the same audio, so retaining a job-need candidate from each pass gives alternative representations of the same source passage. It does not create corroboration from another interview. Keep both versions for transcript review, and connect them to a common source locator before collating analytical excerpts.

Download the [candidate-code and theme-review ledger](/data/thematic-coding-ledger.md). It separates source passages, proposed descriptive labels, a provisional organizing claim and the material that complicates that claim. The decision fields state what this exercise has withheld; they do not pretend a research team reached consensus or validated a theme.

## What the experiment supports

The saved runs used faster-whisper 1.2.1 with tiny.en and small.en on CPU int8 on 24 October 2026. Both processed the same untrimmed recording, decoded as 62.496 seconds, with English selected, beam size 5, temperature 0, word timestamps enabled, voice-activity filtering disabled and previous-text conditioning enabled. The linked data records those settings and the exact selected segments. No recognition accuracy, code frequency, coder agreement or study-level theme prevalence was calculated.

The observation is that actual output wording, punctuation and grouping can affect the passage an analyst selects. Our recommended handling is to preserve the versioned excerpt and inspect what a proposed interpretation depends on. This short individual recording cannot establish a pattern across a study population, thematic saturation or a validated explanation of anyone's experience.

For preparing and replaying a draft, use the [interview transcription guide](/interview-transcription). The [verbatim transcription guide](/verbatim-transcription) helps you specify what wording a derivative may remove. InstaScript does not automatically code research data or develop themes. Finish this exercise by revisiting the proposed claim alongside all its candidate passages, including the one that makes the simple story less convincing.
