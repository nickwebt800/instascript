# Privacy Policy - InstaScript

> Privacy Policy for InstaScript - how we handle your data.

Canonical: <https://instascript.app/privacy>

# InstaScript

Turn video and audio into text — free, in your browser

Last updated: October 29, 2026

### 1. Data We Collect

When you open a local audio, video or subtitle file, processing happens in your browser. **Your local files and the text you edit or generate from them are not uploaded to our servers.** Public Instagram and YouTube links involve server requests, as described below.

We do not require an account or ask for your name, email address or phone number to use the tools. Locally generated speech transcripts and subtitle edits stay in your browser tab unless you copy or download them. YouTube caption lookup responses may be cached as described in section 2. **InstaScript uses Ahrefs Web Analytics and Google Analytics 4 for public-page visit counts, without session recordings or tool-interaction tracking.** Our analytics and hosting providers are described in section 3.

### 2. URL-Based Transcription

**Instagram:** the public post URL is sent to our extraction endpoint. It fetches the page and resolves playable media, using the fallbacks in section 3 when needed. The media proxy streams the file to your browser with a 100 MB transfer limit. Oversized transfers are rejected or interrupted. Its responses use `Cache-Control: no-store`; the application does not save the media to persistent storage. Audio decoding and speech recognition then happen in your browser. A written post description is not a speech transcript.

**YouTube:** the link is sent to our caption lookup endpoint. The server queries YouTube, may use Cloudflare Browser Rendering, and may fetch existing caption text. Successful lookup responses, including caption URLs and any caption text returned by YouTube, may be cached by Cloudflare for up to one hour. When the browser fetches a selected caption track directly from YouTube, it may also contact Google services for a browser bot check. TXT, Markdown and SRT exports are created locally. This workflow reads existing captions; it does not upload or transcribe video audio, and it does not create an account history.

### 3. Third-Party Services

- **Hugging Face CDN** — delivers the speech models to your browser on first use; the browser caches them afterward.
- **jsDelivr** — delivers the Transformers.js library to your browser for speech recognition.
- **Cloudflare** — hosts the website and Functions, provides CDN caching, and may fetch public Instagram or YouTube pages through Browser Rendering. It may measure aggregate traffic and set cookies needed for security and bot protection.
- **Jina AI Reader** — may receive the public Instagram embed URL as a fallback when the site's normal and Cloudflare fetches cannot resolve it. It returns page content to the extraction function; uploaded files and transcripts are not sent there.
- **YouTube and Google** — receive video and caption requests and, when needed, browser bot-check requests. These requests are subject to their own privacy policies; your local media files and subtitle edits are not sent to them.

### Public-page analytics

The trackers run in an isolated sandbox that cannot read the tool page, local files, form inputs, transcripts, subtitle edits or generated download and source links. We send only the catalog page URL and title, without the actual page query string or fragment. For Ahrefs, the referring domain (without its path or query) is sent as the custom source_domain property; unavailable and internal referrers are grouped as direct. This property, rather than the default referral report, is used to review incoming directory traffic. No click or form events from the tools are collected. Tracking is disabled on previews, local development, unlisted routes and when the browser sends Do Not Track or Global Privacy Control.

Ahrefs receives ordinary connection and device information, including IP address, browser, language and screen dimensions. Ahrefs states that its analytics uses no cookies, discards raw IP addresses and uses daily identifiers rather than tracking visitors across days. Aggregate data may be used by Ahrefs to improve its services. See [Ahrefs data collection details](https://help.ahrefs.com/en/articles/10247870-about-ahrefs-web-analytics).

Google Analytics 4 receives the catalog page URL and title and ordinary connection and device data. Its standard page-view measurement runs in the same sandbox; its page referrer is blank and enhanced measurement and advertising signals are disabled. Google may use identifiers or cookies where the browser permits them. See [how Google uses information from sites that use its services](https://policies.google.com/technologies/partner-sites).

### 4. Advertising

This website may display advertisements from third-party advertising networks (for example Google AdSense or another ad network). These partners may use cookies, web beacons, or similar technologies to serve and measure ads, and they may collect information such as your IP address, browser type, and the pages you view on this site.

We do not sell, rent, or trade your personal information, and we do not pass any file you upload or any transcript you generate to an advertising partner. Use of advertising technologies is governed by the respective ad network's privacy policy.

**Affiliate links.** Some pages may link to third-party products such as ElevenLabs using affiliate links. If you sign up through one of these links, InstaScript may earn a commission at no extra cost to you. The linked service handles your information under its own privacy policy.

The homepage also offers an optional VideoStudio recommendation after a valid SRT download starts from a real transcript. Following its link contacts CJ affiliate tracking and the destination site, which may use cookies or similar technologies to attribute a purchase. This recommendation loads no third-party scripts, images or tracking pixels. It sends no recording, filename, submitted URL, transcript or subtitle content with the link and suppresses the referring page. It does not automatically upload or import your SRT. The external services handle the visit under their own privacy policies.

### 5. Cookies

Google Analytics may use cookies or identifiers where the browser permits them. Our host, Cloudflare, may set cookies required for security and bot protection, and third-party advertising partners may set cookies to deliver and measure ads. You can control cookies through your browser settings.

### 6. Children's Privacy

This website is not directed at children under 13 and we do not knowingly collect personal information from children.

### 7. Changes to This Policy

We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.

### 8. Contact

If you have questions about this Privacy Policy, or you want to ask what data we hold or have it deleted, email **contact@instascript.app** or visit our [contact page](https://instascript.app/contact).

## Local review and abuse protection

Local recording playback and subtitle edits remain in the browser. Opening Subtitle Editor passes the transcript and recording directly between same-origin tabs without uploading or saving a project. Abuse protection uses short-lived request counters keyed by a daily rotating IP digest, and browser lookup quota counters; it does not store raw IP addresses, submitted URLs, media or transcript text in these counters. Shared counters, when configured, expire after inactivity or at the end of the UTC day.

## Prepared sample and transcript search

The homepage sample requests public audio and prepared text from this site's
host only after you choose **Try a sample**. It does not run speech recognition
or request a speech model. Sample edits, exports and searches within your
current transcript run in your browser tab. The application does not send
these edits or search queries to a server or save them in persistent storage.

YouTube caption searches also stay in the current tab. A source time link opens YouTube in a new tab and sends only the video ID and whole-second start time in that link, without the search query. No YouTube player is embedded in the result. Existing caption lookup and cache behavior are unchanged.

## Markdown note downloads

Markdown notes are generated in the current browser tab and saved only when you choose the download. We do not send the note or its text to a server or save it as an account history. YouTube notes include a canonical source link and may include linked timestamps; following those links contacts YouTube. Local-recording notes use a generic title and do not include the original filename or submitted Instagram URL.
