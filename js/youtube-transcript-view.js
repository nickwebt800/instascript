import { findTranscriptMatches } from "./transcript-search.js?v=demo-search-20261015b";

// A source link contains only a validated video ID and a whole-second start.
export function captionSourceUrl(videoId, start) {
  if (typeof videoId !== "string" || !/^[\w-]{11}$/.test(videoId) || !Number.isFinite(start)
    || start < 0 || !Number.isSafeInteger(Math.floor(start))) return null;
  return "https://www.youtube.com/watch?v=" + videoId + "&t=" + Math.floor(start) + "s";
}

export function captionSearchResult(segments) {
  return { cues: segments.map(segment => ({
    text: typeof segment.text === "string" ? segment.text : "",
    start: segment.start,
  })) };
}

function formatTime(seconds) {
  const total = Math.max(0, Math.floor(seconds));
  const pad = value => String(value).padStart(2, "0");
  const hours = Math.floor(total / 3600);
  return (hours ? hours + ":" : "") + pad(Math.floor(total % 3600 / 60)) + ":" + pad(total % 60);
}

export function createYouTubeTranscriptView(section, output, showTimestamps) {
  const root = document.createElement("div");
  root.className = "transcript-search youtube-search";
  const label = document.createElement("label");
  label.textContent = "Find in this transcript";
  const input = document.createElement("input");
  input.id = "transcriptSearch";
  input.type = "search";
  input.autocomplete = "off";
  input.spellcheck = false;
  label.htmlFor = input.id;
  const controls = document.createElement("div");
  controls.className = "search-controls";
  function button(text) {
    const element = document.createElement("button");
    element.type = "button";
    element.className = "btn-ghost";
    element.textContent = text;
    return element;
  }
  function sourceLink() {
    const element = document.createElement("a");
    element.target = "_blank";
    element.rel = "noopener noreferrer";
    return element;
  }
  const previous = button("Previous"), next = button("Next"), clear = button("Clear search");
  controls.append(input, previous, next, clear);
  const count = document.createElement("p");
  count.id = "transcriptSearchCount";
  count.className = "search-count";
  count.setAttribute("role", "status");
  count.setAttribute("aria-atomic", "true");
  input.setAttribute("aria-describedby", count.id);
  const preview = document.createElement("div");
  preview.className = "search-preview";
  const snippet = document.createElement("p");
  snippet.className = "search-snippet";
  const actions = document.createElement("div");
  actions.className = "actions";
  const locate = button("Locate caption");
  const visit = sourceLink();
  visit.className = "btn-ghost";
  actions.append(locate, visit);
  const note = document.createElement("p");
  note.className = "search-count";
  note.textContent = "Source links open YouTube in a new tab at a whole-second start time.";
  preview.append(snippet, actions, note);
  root.append(label, controls, count, preview);
  section.insertBefore(root, output);
  let segments = null, result = null, videoId = "", mode = "timestamps";
  let matches = [], active = 0, rows = [], activeRow = null;

  function update() {
    activeRow?.classList.remove("youtube-caption-active");
    activeRow = null;
    const match = matches[active];
    count.textContent = !input.value.trim() ? "Search the current caption track. Enter: next. Shift+Enter: previous."
      : match ? (active + 1) + " of " + matches.length + " matches" : "No matches in this transcript.";
    previous.disabled = next.disabled = !match;
    clear.disabled = !input.value;
    preview.hidden = !match;
    snippet.replaceChildren();
    visit.hidden = true;
    visit.removeAttribute("href");
    if (!match) return;
    const cue = result.cues[match.cueIndex];
    activeRow = rows[match.cueIndex];
    activeRow?.classList.add("youtube-caption-active");
    let start = Math.max(0, match.start - 65), end = Math.min(cue.text.length, match.end + 65);
    if (start > 0 && /[\uDC00-\uDFFF]/.test(cue.text[start])) start--;
    if (end < cue.text.length && /[\uDC00-\uDFFF]/.test(cue.text[end])) end++;
    const mark = document.createElement("mark");
    mark.textContent = cue.text.slice(match.start, match.end);
    snippet.append((start ? "…" : "") + cue.text.slice(start, match.start), mark,
      cue.text.slice(match.end, end) + (end < cue.text.length ? "…" : ""));
    const url = captionSourceUrl(videoId, cue.start);
    if (url) {
      visit.href = url;
      visit.textContent = "Open YouTube at " + formatTime(cue.start) + " ↗";
      visit.setAttribute("aria-label", "Open YouTube at " + formatTime(cue.start) + " in a new tab");
      visit.hidden = false;
    }
    note.textContent = url ? "Source links open YouTube in a new tab at a whole-second start time."
      : "This caption has no valid source timestamp. You can still locate its words.";
  }

  function scrollToMatch(focus = false) {
    const row = rows[matches[active]?.cueIndex];
    if (!row) return;
    const box = row.getBoundingClientRect(), viewport = output.getBoundingClientRect();
    if (box.top < viewport.top || box.bottom > viewport.bottom) output.scrollTop += box.top - viewport.top - 12;
    if (focus) row.focus({ preventScroll: true });
  }
  function navigate(delta) {
    if (!matches.length) return;
    active = (active + delta + matches.length) % matches.length;
    update();
    input.focus({ preventScroll: true });
    scrollToMatch();
  }
  function search() {
    active = 0;
    matches = findTranscriptMatches(result, input.value);
    update();
  }
  input.addEventListener("input", event => { if (!event.isComposing) search(); });
  input.addEventListener("compositionend", search);
  input.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.key === "Enter") { event.preventDefault(); navigate(event.shiftKey ? -1 : 1); }
    if (event.key === "Escape") { event.preventDefault(); input.value = ""; search(); }
  });
  previous.addEventListener("click", () => navigate(-1));
  next.addEventListener("click", () => navigate(1));
  clear.addEventListener("click", () => { input.value = ""; search(); input.focus({ preventScroll: true }); });
  locate.addEventListener("click", () => {
    if (mode !== "timestamps") showTimestamps();
    scrollToMatch(true);
  });

  function render(nextSegments, nextVideoId, nextMode) {
    const replaced = segments !== nextSegments || videoId !== nextVideoId;
    segments = nextSegments;
    videoId = nextVideoId;
    mode = nextMode;
    if (replaced) {
      result = captionSearchResult(segments);
      input.value = "";
      matches = [];
      active = 0;
    }
    input.disabled = !segments.length;
    output.replaceChildren();
    rows = [];
    if (mode === "timestamps") {
      result.cues.forEach(cue => {
        const row = document.createElement("p");
        row.className = "youtube-caption";
        row.tabIndex = -1;
        const url = captionSourceUrl(videoId, cue.start);
        const stamp = url ? sourceLink() : document.createElement("span");
        stamp.className = "timestamp";
        stamp.textContent = url ? "[" + formatTime(cue.start) + "] " : "[Untimed] ";
        if (url) {
          stamp.href = url;
          stamp.setAttribute("aria-label", "Open YouTube at " + formatTime(cue.start) + " in a new tab");
        }
        row.append(stamp, document.createTextNode(cue.text));
        rows.push(row);
        output.append(row);
      });
    } else {
      const row = document.createElement("p");
      row.textContent = result.cues.map(cue => cue.text).join(" ");
      output.append(row);
    }
    update();
  }
  function reset() {
    segments = result = null;
    videoId = "";
    matches = [];
    rows = [];
    active = 0;
    input.value = "";
    input.disabled = true;
    output.replaceChildren();
    update();
  }
  reset();
  return { render, reset };
}
