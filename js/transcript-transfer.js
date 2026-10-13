import { validateSubtitleCues } from "./subtitles.js?v=p2-20261013";

export function sendTranscriptToEditor(cues, media, status) {
  const error = validateSubtitleCues(cues);
  if (error) { status(error); return; }
  const nonce = crypto.randomUUID(), origin = window.location.origin;
  const editor = window.open("/subtitle-editor#transcript=" + nonce, "_blank");
  if (!editor) { status("Allow this site's editor tab to open, or download SRT and open it in Subtitle Editor."); return; }
  const payload = cues.map(cue => ({ start: cue.start, end: cue.end, text: cue.text }));
  const cleanup = () => { clearTimeout(timer); window.removeEventListener("message", receive); window.removeEventListener("pagehide", cleanup); };
  let sent = false;
  const receive = event => {
    if (event.origin !== origin || event.source !== editor || event.data?.nonce !== nonce) return;
    if (event.data.type === "instascript:ready" && !sent) {
      sent = true; editor.postMessage({ type: "instascript:transcript", nonce, cues: payload, media }, origin);
    } else if (event.data.type === "instascript:accepted") { cleanup(); status("Transcript opened in Subtitle Editor. Both tabs process your content locally."); }
  };
  const timer = setTimeout(() => { cleanup(); status("The editor did not respond. Download SRT and open it in Subtitle Editor instead."); }, 15000);
  window.addEventListener("message", receive);
  window.addEventListener("pagehide", cleanup, { once: true });
}

export function receiveTranscriptFromOpener(accept) {
  const nonce = new URLSearchParams(window.location.hash.slice(1)).get("transcript");
  const opener = window.opener, origin = window.location.origin;
  if (!nonce || !opener) return;
  const receive = event => {
    if (event.origin !== origin || event.source !== opener || event.data?.nonce !== nonce || event.data.type !== "instascript:transcript") return;
    const error = validateSubtitleCues(event.data.cues);
    if (error) return;
    accept(event.data.cues.map(cue => ({ start: cue.start, end: cue.end, text: cue.text })), event.data.media instanceof Blob ? event.data.media : null);
    opener.postMessage({ type: "instascript:accepted", nonce }, origin);
    window.removeEventListener("message", receive);
    window.opener = null;
    history.replaceState(null, "", window.location.pathname);
  };
  window.addEventListener("message", receive);
  opener.postMessage({ type: "instascript:ready", nonce }, origin);
}
