import { subtitleTime } from "./subtitles.js?v=p0-export-20261014";

// Treat transcript words as text, never as Markdown instructions or raw HTML.
function escapeText(text) {
  return text.replace(/[\\`*_{}\[\]()#+.!<>|~&=-]/g, "\\$&");
}

function paragraph(text) {
  return text.trim().replace(/\r\n?/g, "\n").split("\n")
    .map(line => escapeText(line.trim())).join("  \n");
}

export function transcriptMarkdown(result, { title = "Transcript", timestamps = false, videoId = "", language = "" } = {}) {
  const cues = result?.cues?.length ? result.cues : [{ text: result?.text }];
  const source = typeof videoId === "string" && /^[A-Za-z0-9_-]{11}$/.test(videoId)
    ? "https://www.youtube.com/watch?v=" + videoId : "";
  const body = cues.filter(cue => typeof cue?.text === "string" && cue.text.trim()).map(cue => {
    const validStart = typeof cue.start === "number" && Number.isFinite(cue.start)
      && cue.start >= 0 && Number.isSafeInteger(Math.round(cue.start * 1000));
    let prefix = "";
    if (timestamps && validStart) {
      const time = subtitleTime(cue.start, ".");
      prefix = source ? "[" + time + "](" + source + "&t=" + Math.floor(cue.start) + "s) " : "**" + time + "** ";
    }
    return prefix + paragraph(cue.text);
  }).join("\n\n");
  if (!body) return "";
  const heading = typeof title === "string" ? title.replace(/\s+/g, " ").trim() : "";
  const track = typeof language === "string" ? language.replace(/\s+/g, " ").trim() : "";
  return "# " + escapeText(heading || "Transcript") + "\n\n"
    + (source ? "Source: " + source + "\n\n" : "")
    + (source && track ? "Caption language: " + escapeText(track) + "\n\n" : "")
    + body + "\n";
}

export function youtubeTranscriptMarkdown(segments, options) {
  return transcriptMarkdown({ cues: segments.map(segment => ({ text: segment.text, start: segment.start })) }, options);
}
