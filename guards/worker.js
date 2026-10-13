// Private Durable Object service. No public endpoint exposes guard operations.
export default { fetch() { return new Response("Not found", { status: 404 }); } };

export class RequestGuard {
  constructor(state) { this.state = state; }
  async fetch(request) {
    const action = new URL(request.url).pathname;
    const body = await request.json().catch(() => ({}));
    const now = Date.now(), day = new Date(now).toISOString().slice(0, 10);
    const result = await this.state.storage.transaction(async storage => {
      let current = await storage.get("counter");
      if (action === "/request") {
        if (!current || now >= current.until) current = { count: 0, until: now + 60000 };
        if (current.count >= 20) return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.until - now) / 1000)) };
        current.count++;
      } else if (action === "/reserve") {
        if (!current || current.day !== day) current = { day, used: 0, next: 0, leases: {} };
        if (now < current.next || current.used + 50000 > 480000) return { allowed: false };
        const id = crypto.randomUUID();
        current.used += 50000; current.next = now + 12000; current.leases[id] = 50000;
        await storage.put("counter", current);
        return { allowed: true, id };
      } else if (action === "/settle") {
        if (!current || current.day !== day || !current.leases?.[body.id]) return { allowed: false };
        const reserved = current.leases[body.id];
        // Missing usage headers retain the full reservation; never assume zero.
        const actual = Number(body.usedMs);
        if (Number.isFinite(actual) && actual > 0) current.used += actual - reserved;
        delete current.leases[body.id];
      } else return { allowed: false };
      await storage.put("counter", current);
      return { allowed: true };
    });
    const midnight = Date.parse(day + "T00:00:00Z") + 86400000;
    await this.state.storage.setAlarm(action === "/request" ? now + 120000 : midnight);
    return Response.json(result, { headers: { "Cache-Control": "no-store" } });
  }
  async alarm() { await this.state.storage.deleteAll(); }
}
