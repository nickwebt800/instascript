(function () {
  "use strict";

  var links = [
    ["Instagram Transcript", "/"],
    ["Instagram Transcript Generator", "/instagram-transcript-generator"],
    ["Instagram Reels Transcript", "/instagram-reels-transcript"],
    ["Instagram Video to Text", "/instagram-video-to-text"],
    ["Reels to Text", "/reels-to-text"],
    ["Instagram Caption Extractor", "/instagram-caption-extractor"],
    ["Video to Text", "/video-to-text"],
    ["Audio to Text", "/audio-to-text"],
    ["TikTok Transcript", "/tiktok-transcript"],
    ["Facebook Video Transcript", "/facebook-video-transcript"],
    ["YouTube Transcript", "/youtube-transcript"],
    ["YouTube Transcript Download", "/youtube-transcript-download"],
    ["How to Get a YouTube Transcript", "/how-to-get-a-transcript-of-a-youtube-video"],
    ["TXT to SRT", "/txt-to-srt"],
    ["VTT to SRT", "/vtt-to-srt"],
    ["Privacy Policy", "/privacy"],
    ["About", "/about"],
    ["Contact", "/contact"]
  ];

  function buildNavigation() {
    var nav = document.createElement("nav");
    nav.className = "footer-nav";
    nav.setAttribute("aria-label", "Site navigation");

    links.forEach(function (item) {
      var link = document.createElement("a");
      link.href = item[1];
      link.textContent = item[0];
      nav.appendChild(link);
    });

    return nav;
  }

  document.querySelectorAll("footer[data-site-footer]").forEach(function (footer) {
    var existing = footer.querySelector(".footer-nav");
    if (existing) existing.replaceWith(buildNavigation());
  });
})();
