import { checkSubtitleQuality, QUALITY_DEFAULTS, QUALITY_LABELS } from "./subtitle-quality.js?v=quality-20261030";

export function createSubtitleQualityReview(root, getCues, locateCue) {
  const find = role => root.querySelector('[data-quality="' + role + '"]');
  const status = find("status"), results = find("results"), summary = find("summary"), counts = find("counts");
  const list = find("list"), filter = find("filter"), pageStatus = find("page"), check = find("check");
  const previous = find("previous"), next = find("next");
  const fields = Object.fromEntries(Object.keys(QUALITY_DEFAULTS).map(key => [key, find(key)]));
  let report = null, page = 0, stale = false;
  const pageSize = 50;

  function reset(message = "Choose Check subtitles to review the current editor rows.", available = true) {
    report = null; page = 0; stale = false; results.hidden = true;
    list.replaceChildren(); summary.textContent = ""; counts.textContent = ""; filter.value = "all";
    status.textContent = message; check.textContent = "Check subtitles"; check.disabled = !available;
  }
  function invalidate() {
    if (!report && !stale) return;
    report = null; stale = true; results.hidden = true; list.replaceChildren();
    status.textContent = "Needs recheck: subtitles or thresholds changed. The previous report and cue links are no longer current.";
    check.textContent = "Recheck subtitles";
  }
  function renderPage() {
    if (!report) return;
    const selected = report.rows.filter(row => row.flags.length && (filter.value === "all" || row.flags.includes(filter.value)));
    const pages = Math.max(1, Math.ceil(selected.length / pageSize));
    page = Math.min(page, pages - 1);
    list.replaceChildren();
    for (const row of selected.slice(page * pageSize, (page + 1) * pageSize)) {
      const item = document.createElement("li"), button = document.createElement("button"), detail = document.createElement("p");
      button.type = "button"; button.className = "btn-ghost";
      button.textContent = "Edit cue " + (row.index + 1);
      button.addEventListener("click", () => {
        if (report) locateCue(row.index, row.flags.includes("invalidTime") ? "start" : "text");
      });
      const hints = row.flags.map(flag => QUALITY_LABELS[flag]).join(" · ");
      detail.textContent = hints + ". " + row.characters + " characters; " + row.lineCount + " lines; longest line " + row.longestLine
        + (row.duration === null ? "; duration and CPS unavailable." : "; " + row.duration.toFixed(3) + " s; " + (row.cps === null ? "CPS unavailable." : row.cps.toFixed(2) + " CPS."))
        + (row.overlapWith === null ? "" : " Overlaps cue " + (row.overlapWith + 1) + " (one example).");
      item.append(button, detail); list.appendChild(item);
    }
    pageStatus.textContent = selected.length
      ? "Showing " + (page * pageSize + 1) + "–" + Math.min((page + 1) * pageSize, selected.length) + " of " + selected.length + " matching cues."
      : "No cues match this filter.";
    previous.disabled = page === 0; next.disabled = page + 1 >= pages;
  }

  check.addEventListener("click", () => {
    try {
      report = checkSubtitleQuality(getCues(), Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.value])));
      stale = false; page = 0; filter.value = "all";
      summary.textContent = report.rows.length + " cues checked · " + report.issueCues + " with any issue · "
        + report.hintCues + " with review hints · " + report.errorCues + " with export errors.";
      counts.textContent = Object.entries(report.counts).map(([key, count]) => QUALITY_LABELS[key] + ": " + count).join(" · ");
      find("counting").textContent = report.counting === "graphemes"
        ? "Characters are counted as Unicode graphemes (combined characters count together)."
        : "This browser uses Unicode code points: emoji sequences and combining marks may count as several characters.";
      status.textContent = report.issueCues
        ? "Check complete. Review hints do not block export. Fix invalid timing or empty text before exporting."
        : "No issues found under the current rules. Check wording and timing against your recording too.";
      check.textContent = "Recheck subtitles"; results.hidden = false; renderPage();
    } catch (error) {
      reset(error.message);
    }
  });
  for (const field of Object.values(fields)) field.addEventListener("input", invalidate);
  find("defaults").addEventListener("click", () => {
    for (const [key, value] of Object.entries(QUALITY_DEFAULTS)) fields[key].value = value;
    invalidate();
    if (!stale) status.textContent = "Default thresholds restored. Choose Check subtitles to review the current rows.";
  });
  filter.addEventListener("change", () => { page = 0; renderPage(); });
  previous.addEventListener("click", () => { page--; renderPage(); });
  next.addEventListener("click", () => { page++; renderPage(); });
  reset();
  return { reset, invalidate };
}
