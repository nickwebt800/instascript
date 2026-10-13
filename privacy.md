# Privacy Policy - InstaScript

> Privacy Policy for InstaScript - how we handle your data.

Canonical: <https://instascript.app/privacy>

# InstaScript

Turn video and audio into text — free, in your browser

Last updated: October 13, 2026

### 1. Data We Collect

When you open a local audio, video or subtitle file, processing happens in your browser. **Your local files and the text you edit or generate from them are not uploaded to our servers.** Public Instagram and YouTube links involve server requests, as described below.

We do not require an account or ask for your name, email address or phone number to use the tools. Locally generated speech transcripts and subtitle edits stay in your browser tab unless you copy or download them. YouTube caption lookup responses may be cached as described in section 2. **InstaScript does not run its own analytics, tracking or session-recording scripts.** Basic traffic measurement, if any, comes from our host and is described in section 3.

### 2. URL-Based Transcription

**Instagram:** the public post URL is sent to our extraction endpoint. It fetches the page and resolves playable media, using the fallbacks in section 3 when needed. The media proxy buffers up to 100 MB in server memory before returning the file to your browser. Its responses use `Cache-Control: no-store`; the application does not save the media to persistent storage. Audio decoding and speech recognition then happen in your browser. A written post description is not a speech transcript.

**YouTube:** the link is sent to our caption lookup endpoint. The server queries YouTube, may use Cloudflare Browser Rendering, and may fetch existing caption text. Successful lookup responses, including caption URLs and any caption text returned by YouTube, may be cached by Cloudflare for up to one hour. When the browser fetches a selected caption track directly from YouTube, it may also contact Google services for a browser bot check. TXT and SRT exports are created locally. This workflow reads existing captions; it does not upload or transcribe video audio, and it does not create an account history.

### 3. Third-Party Services

- **Hugging Face CDN** — delivers the speech models to your browser on first use; the browser caches them afterward.
- **jsDelivr** — delivers the Transformers.js library to your browser for speech recognition.
- **Cloudflare** — hosts the website and Functions, provides CDN caching, and may fetch public Instagram or YouTube pages through Browser Rendering. It may measure aggregate traffic and set cookies needed for security and bot protection.
- **Jina AI Reader** — may receive the public Instagram embed URL as a fallback when the site's normal and Cloudflare fetches cannot resolve it. It returns page content to the extraction function; uploaded files and transcripts are not sent there.
- **YouTube and Google** — receive video and caption requests and, when needed, browser bot-check requests. These requests are subject to their own privacy policies; your local media files and subtitle edits are not sent to them.

### 4. Advertising

This website may display advertisements from third-party advertising networks (for example Google AdSense or another ad network). These partners may use cookies, web beacons, or similar technologies to serve and measure ads, and they may collect information such as your IP address, browser type, and the pages you view on this site.

We do not sell, rent, or trade your personal information, and we do not pass any file you upload or any transcript you generate to an advertising partner. Use of advertising technologies is governed by the respective ad network's privacy policy.

**Affiliate links.** Some pages may link to third-party products such as ElevenLabs using affiliate links. If you sign up through one of these links, InstaScript may earn a commission at no extra cost to you. The linked service handles your information under its own privacy policy.

### 5. Cookies

InstaScript does not set cookies of its own. Our host, Cloudflare, may set cookies required for security and bot protection, and third-party advertising partners may set cookies to deliver and measure ads. You can control cookies through your browser settings.

### 6. Children's Privacy

This website is not directed at children under 13 and we do not knowingly collect personal information from children.

### 7. Changes to This Policy

We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.

### 8. Contact

If you have questions about this Privacy Policy, or you want to ask what data we hold or have it deleted, email **contact@instascript.app** or visit our [contact page](https://instascript.app/contact).
