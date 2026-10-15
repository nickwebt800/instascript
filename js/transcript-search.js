import { subtitleTime } from "./subtitles.js?v=p0-export-20261014";

// ASCII-only folding preserves UTF-16 offsets, including emoji and non-Latin text.
const fold = text => text.replace(/[A-Z]/g, letter => letter.toLowerCase());
export function findTranscriptMatches(result, query) {
  if (!result || typeof query !== "string" || !query.trim()) return [];
  const needle = fold(query);
  const blocks = result.cues?.length ? result.cues : [{ text: result.text || "" }];
  const matches = [];
  blocks.forEach((cue, cueIndex) => {
    const text = fold(cue.text);
    for (let start = text.indexOf(needle); start !== -1; start = text.indexOf(needle, start + needle.length)) {
      matches.push({ cueIndex, start, end: start + needle.length });
    }
  });
  return matches;
}

export function createTranscriptSearch(section, output, mediaReview) {
  const root = document.createElement("div");
  root.className = "transcript-search";
  const label = document.createElement("label");
  label.textContent = "Find in this transcript";
  const input = document.createElement("input");
  input.type = "search";
  input.id = "transcriptSearch";
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
  const previous = button("Previous"), next = button("Next"), clear = button("Clear search");
  const count = document.createElement("p");
  count.className = "search-count";
  count.id = "transcriptSearchCount";
  count.setAttribute("role", "status");
  count.setAttribute("aria-atomic", "true");
  input.setAttribute("aria-describedby", count.id);
  controls.append(input, previous, next, clear);
  const preview = document.createElement("div");
  preview.className = "search-preview";
  preview.hidden = true;
  const snippet = document.createElement("p");
  snippet.className = "search-snippet";
  const actions = document.createElement("div");
  actions.className = "actions";
  const edit = button("Edit this match"), play = button("Play match");
  actions.append(edit, play);
  preview.append(snippet, actions);
  root.append(label, controls, count, preview);
  section.insertBefore(root, output);
  let result = null, rows = [], matches = [], active = 0, activeRow = null;

  function render() {
    activeRow?.classList.remove("search-active-cue");
    activeRow = null;
    const match = matches[active];
    count.textContent = !input.value.trim() ? "Search the current edited words. Enter: next. Shift+Enter: previous."
      : match ? (active + 1) + " of " + matches.length + " matches" : "No matches in this transcript.";
    previous.disabled = next.disabled = !match;
    clear.disabled = !input.value;
    preview.hidden = !match;
    snippet.replaceChildren();
    if (!match) return;
    const cue = result.cues.length ? result.cues[match.cueIndex] : { text: result.text, start: null };
    activeRow = rows[match.cueIndex]?.row;
    activeRow?.classList.add("search-active-cue");
    // Render one bounded preview. Navigation still reaches every occurrence.
    let start = Math.max(0, match.start - 65), end = Math.min(cue.text.length, match.end + 65);
    if (start > 0 && /[\uDC00-\uDFFF]/.test(cue.text[start])) start--;
    if (end < cue.text.length && /[\uDC00-\uDFFF]/.test(cue.text[end])) end++;
    const mark = document.createElement("mark");
    mark.textContent = cue.text.slice(match.start, match.end);
    snippet.append((start ? "…" : "") + cue.text.slice(start, match.start), mark,
      cue.text.slice(match.end, end) + (end < cue.text.length ? "…" : ""));
    const timed = Number.isFinite(cue.start) && cue.start >= 0;
    play.disabled = !timed || !mediaReview.player;
    play.textContent = timed ? "Play at " + subtitleTime(cue.start, ".") : "No timestamp";
    play.title = play.disabled ? "Playback needs a recording and a valid start time." : "Play the cue containing this match.";
  }

  function refresh() {
    const old = matches[active];
    matches = findTranscriptMatches(result, input.value);
    const retained = old ? matches.findIndex(match => match.cueIndex === old.cueIndex && match.start === old.start) : -1;
    active = retained >= 0 ? retained : Math.min(active, Math.max(0, matches.length - 1));
    render();
  }

  function navigate(delta) {
    if (!matches.length) return;
    active = (active + delta + matches.length) % matches.length;
    render();
    input.focus({ preventScroll: true });
    // Scroll just the result viewport; keep the search controls and focus in place.
    const row = rows[matches[active].cueIndex]?.row;
    if (row) {
      const box = row.getBoundingClientRect(), viewport = output.getBoundingClientRect();
      if (box.top < viewport.top || box.bottom > viewport.bottom) output.scrollTop += box.top - viewport.top - 12;
    }
  }

  input.addEventListener("input", event => {
    if (event.isComposing) return;
    active = 0;
    matches = findTranscriptMatches(result, input.value);
    render();
  });
  input.addEventListener("compositionend", () => { active = 0; refresh(); });
  input.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.key === "Enter") { event.preventDefault(); navigate(event.shiftKey ? -1 : 1); }
    if (event.key === "Escape") { event.preventDefault(); input.value = ""; refresh(); }
  });
  previous.addEventListener("click", () => navigate(-1));
  next.addEventListener("click", () => navigate(1));
  clear.addEventListener("click", () => { input.value = ""; refresh(); input.focus({ preventScroll: true }); });
  edit.addEventListener("click", () => {
    const match = matches[active], field = match && rows[match.cueIndex]?.input;
    if (!field) return;
    field.focus({ preventScroll: true });
    field.setSelectionRange(match.start, match.end);
    field.scrollIntoView({ block: "nearest" });
  });
  play.addEventListener("click", () => {
    const match = matches[active];
    if (match && result.cues.length) mediaReview.seek(result.cues[match.cueIndex].start);
  });
  function set(nextResult, nextRows = []) {
    input.value = "";
    active = 0;
    result = nextResult;
    rows = nextRows;
    matches = [];
    input.disabled = !result;
    render();
  }
  set(null);
  return { set, refresh };
}
