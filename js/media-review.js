// Object URLs are browser-local and are released on replacement and page exit.
export function createMediaReview(container, status) {
  let player = null, objectUrl = null;
  const clear = () => {
    if (player) { player.pause(); player.removeAttribute("src"); player.load(); }
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    player = null; objectUrl = null; container.innerHTML = "";
  };
  const set = blob => {
    clear();
    if (!(blob instanceof Blob)) return;
    const video = blob.type.startsWith("video/") || /\.(mp4|mov|webm)$/i.test(blob.name || "");
    player = document.createElement(video ? "video" : "audio");
    player.controls = true; player.preload = "metadata";
    player.className = "review-player";
    player.setAttribute("aria-label", "Local recording for reviewing subtitles");
    player.addEventListener("error", () => status("This browser could not play the recording. You can still edit and export the text."));
    objectUrl = URL.createObjectURL(blob); player.src = objectUrl; container.appendChild(player);
  };
  const seek = seconds => {
    if (!player || !Number.isFinite(seconds) || seconds < 0) return false;
    try {
      player.currentTime = Number.isFinite(player.duration) ? Math.min(seconds, player.duration) : seconds;
      const playing = player.play();
      playing?.catch(() => status("Press Play in the media controls to review this timestamp."));
      return true;
    } catch { status("Wait for the recording to load, then try the timestamp again."); return false; }
  };
  window.addEventListener("pagehide", clear);
  return { set, clear, seek, get player() { return player; } };
}
