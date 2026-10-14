import { serializeSubtitleCues, subtitleTime, validateSubtitleCues } from "./subtitles.js?v=p0-export-20261014";

// Keep unknown times unknown. All exports read the same editable result.
export function createTranscriptResult(result) {
  return {
    text: typeof result?.text === "string" ? result.text : "",
    cues: Array.isArray(result?.chunks) ? result.chunks.map(chunk => ({
      start: typeof chunk?.timestamp?.[0] === "number" ? chunk.timestamp[0] : null,
      end: typeof chunk?.timestamp?.[1] === "number" ? chunk.timestamp[1] : null,
      text: typeof chunk?.text === "string" ? chunk.text : "",
    })) : [],
  };
}

export function hasTranscriptStartTimes(result) {
  return Boolean(result?.cues?.some(cue => Number.isFinite(cue.start) && cue.start >= 0));
}

export function transcriptText(result, timestamps = false) {
  if (!result?.cues?.length) return result?.text?.trim() || "";
  return result.cues.filter(cue => cue.text.trim()).map(cue => {
    const prefix = timestamps && Number.isFinite(cue.start) && cue.start >= 0
      ? "[" + subtitleTime(cue.start, ".") + "] " : "";
    return prefix + cue.text.trim();
  }).join(timestamps ? "\n" : " ");
}

export function transcriptSubtitleError(result) {
  if (!result?.cues?.length) return "No timed speech segments are available.";
  return validateSubtitleCues(result.cues);
}

export function transcriptSubtitles(result, format) {
  const error = transcriptSubtitleError(result);
  if (error) throw new Error(error);
  return serializeSubtitleCues(result.cues, format);
}
