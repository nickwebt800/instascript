import { boundedFetch } from "./http.js";

const localClients = new Map();
let localBrowser = { day: "", used: 0, next: 0, leases: new Map() };

async function shared(env, name, action, data = {}) {
  const binding = env?.REQUEST_GUARD;
  const stub = binding.get(binding.idFromName(name));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await stub.fetch("https://guard.internal" + action, { method: "POST", body: JSON.stringify(data), signal: controller.signal });
    if (!response.ok) throw new Error("Guard unavailable");
    return await response.json();
  } finally { clearTimeout(timer); }
}

export async function checkRequestLimit(request, env) {
  const day = new Date().toISOString().slice(0, 10);
  // A rotating digest is used solely for short-lived security counters.
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(day + ":" + (request.headers.get("CF-Connecting-IP") || "local")));
  const key = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
  try {
    if (env?.REQUEST_GUARD) return await shared(env, "requests:" + key, "/request");
    const now = Date.now();
    for (const [name, counter] of localClients) if (now >= counter.until) localClients.delete(name);
    if (!localClients.has(key) && localClients.size >= 2000) return { allowed: false, retryAfter: 60 };
    const current = localClients.get(key) || { count: 0, until: now + 60000 };
    if (current.count >= 20) return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.until - now) / 1000)) };
    current.count++; localClients.set(key, current); return { allowed: true };
  } catch { return { allowed: false, unavailable: true, retryAfter: 30 }; }
}

export async function reserveBrowser(env) {
  const day = new Date().toISOString().slice(0, 10);
  if (env?.REQUEST_GUARD) return shared(env, "browser-budget", "/reserve");
  if (localBrowser.day !== day) localBrowser = { day, used: 0, next: 0, leases: new Map() };
  if (Date.now() < localBrowser.next || localBrowser.used + 50000 > 480000) return { allowed: false };
  const id = crypto.randomUUID(); localBrowser.used += 50000; localBrowser.next = Date.now() + 12000;
  localBrowser.leases.set(id, 50000); return { allowed: true, id };
}

async function settleBrowser(env, lease, usedMs) {
  if (env?.REQUEST_GUARD) { await shared(env, "browser-budget", "/settle", { id: lease.id, usedMs }); return; }
  const reserved = localBrowser.leases.get(lease.id);
  if (!reserved) return;
  if (Number.isFinite(usedMs) && usedMs > 0) localBrowser.used += usedMs - reserved;
  localBrowser.leases.delete(lease.id);
}

export async function guardedBrowserFetch(env, url, options, { deadline = Infinity } = {}) {
  let lease;
  try { lease = await reserveBrowser(env); } catch { throw new Error("Browser quota guard unavailable"); }
  if (!lease.allowed) throw new Error("Browser lookup quota temporarily unavailable");
  let usedMs = null;
  try {
    const timeout = Math.min(50000, deadline - Date.now());
    if (timeout <= 0) throw new Error("Browser lookup timed out");
    const { response, bytes } = await boundedFetch(url, { options, timeout, maximum: 5 * 1024 * 1024,
      allowUrl: target => target.protocol === "https:" && target.hostname === "api.cloudflare.com", maxRedirects: 0 });
    const measured = Number(response.headers.get("X-Browser-Ms-Used"));
    if (measured > 0) usedMs = measured;
    return new Response(bytes, { status: response.status, headers: { "Content-Type": "application/json", "X-Browser-Ms-Used": String(usedMs || 0), "Cache-Control": "no-store" } });
  } finally { try { await settleBrowser(env, lease, usedMs); } catch { /* Keep the conservative reservation. */ } }
}
