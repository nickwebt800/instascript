import { subtitleTime } from "./subtitles.js?v=p0-export-20261014";

// Each view edits only its own result. Export helpers remain the source of truth.
export function renderTranscriptCues(container, result, mediaReview, onEdit) {
  container.replaceChildren();
  const cues = result.cues.length ? result.cues : [{ start: null, text: result.text }];
  return cues.map((cue, index) => {
    const row = document.createElement("div");
    row.className = "transcript-cue";
    const stamp = document.createElement("button");
    stamp.type = "button";
    stamp.className = "timestamp";
    const timed = Number.isFinite(cue.start) && cue.start >= 0;
    const time = timed ? subtitleTime(cue.start, ".") : "Untimed";
    stamp.textContent = timed ? time.split(".")[0] : time;
    stamp.disabled = !mediaReview.player || !timed;
    stamp.setAttribute("aria-label", timed ? "Play recording from " + time : "No start timestamp available");
    stamp.addEventListener("click", () => mediaReview.seek(cue.start));
    const input = document.createElement("textarea");
    input.className = "transcript-cue-text";
    input.rows = 2;
    input.value = cue.text;
    input.setAttribute("aria-label", timed ? "Transcript text at " + time : "Untimed transcript text");
    const edited = event => {
      if (result.cues.length) result.cues[index].text = input.value;
      else result.text = input.value;
      onEdit(event);
    };
    input.addEventListener("input", edited);
    input.addEventListener("compositionend", edited);
    row.append(stamp, input);
    container.appendChild(row);
    return { row, input, stamp };
  });
}

export async function copyTranscriptText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(text); return; } catch { /* Embedded browser fallback. */ }
  }
  const previous = document.activeElement;
  const input = document.createElement("textarea");
  input.value = text;
  input.readOnly = true;
  input.style.cssText = "position:fixed;opacity:0";
  document.body.appendChild(input);
  let copied = false;
  try { input.select(); copied = document.execCommand("copy"); }
  finally { input.remove(); previous?.focus({ preventScroll: true }); }
  if (!copied) throw new Error("Clipboard unavailable");
}

export function downloadTranscriptFile(content, filename, mime) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  // Let the browser start consuming the URL before releasing it.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
