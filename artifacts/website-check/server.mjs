import http from "node:http";
import { randomUUID } from "node:crypto";
import { mkdir, open, readdir, readFile, unlink, link } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ScanError, normalizeUrl, scanWebsite } from "./scanner.mjs";
import { authorized, renderInbox } from "./inbox.mjs";

const HOUR = 3600000;
export function createHandler({
  scan = scanWebsite,
  dataDir = process.env.LEAD_DATA_DIR || path.join(import.meta.dirname, "data"),
  origins = (
    process.env.ALLOWED_ORIGINS || "http://localhost:5173,http://127.0.0.1:5173"
  ).split(","),
} = {}) {
  const cache = new Map(),
    reports = new Map(),
    rates = new Map(),
    pending = new Map();
  let active = 0;
  const prune = () => {
    const now = Date.now();
    for (const [key, value] of cache) if (value.until < now) cache.delete(key);
    for (const [key, value] of reports)
      if (value.until < now) reports.delete(key);
    for (const [key, value] of rates) if (value.until < now) rates.delete(key);
  };
  function limit(key, max) {
    const entry = rates.get(key) || { count: 0, until: Date.now() + HOUR };
    if (entry.count >= max) throw new ScanError("rate_limited", 429);
    if (rates.size >= 20000 && !rates.has(key))
      throw new ScanError("busy", 503);
    entry.count++;
    rates.set(key, entry);
  }
  async function saveLead(lead) {
    await mkdir(dataDir, { recursive: true, mode: 0o700 });
    const temporary = path.join(dataDir, `${lead.id}.${randomUUID()}.tmp`);
    const file = await open(temporary, "wx", 0o600);
    try {
      try {
        await file.writeFile(JSON.stringify(lead, null, 2));
        await file.sync();
      } finally {
        await file.close();
      }
      // Publish only a complete, fsynced file. Exclusive link makes retries idempotent.
      try {
        await link(temporary, path.join(dataDir, `${lead.id}.json`));
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
      }
    } finally {
      await unlink(temporary).catch(() => {});
    }
  }
  return async (req, res) => {
    const requestOrigin = req.headers.origin;
    const originAllowed = Boolean(requestOrigin && origins.includes(requestOrigin));
    function reply(status, data) {
      res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        ...(originAllowed
          ? {
              "Access-Control-Allow-Origin": requestOrigin,
              Vary: "Origin",
            }
          : {}),
        ...(status === 429 ? { "Retry-After": "3600" } : {}),
      });
      res.end(JSON.stringify(data));
    }
    try {
      prune();
      const route = req.url?.split("?")[0];
      if (route?.startsWith("/api/website-check") && req.method === "OPTIONS") {
        if (!originAllowed) return reply(403, { error: "origin_rejected" });
        res.writeHead(204, {
          "Access-Control-Allow-Origin": requestOrigin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "600",
          Vary: "Origin",
        });
        return res.end();
      }
      if (route === "/api/website-check/inbox" && req.method === "GET") {
        if (
          !authorized(req.headers.authorization, process.env.INBOX_PASSWORD)
        ) {
          res.writeHead(401, {
            "WWW-Authenticate":
              'Basic realm="Kevin Rebuilds demo inbox", charset="UTF-8"',
            "Cache-Control": "no-store",
          });
          return res.end("Sign in to view enquiries.");
        }
        const html = await renderInbox(dataDir);
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow",
          "Content-Security-Policy":
            "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
          "X-Content-Type-Options": "nosniff",
        });
        return res.end(html);
      }
      if (route === "/api/website-check/health" && req.method === "GET")
        return reply(200, { ok: true });
      if (!["/api/website-check", "/api/website-check/demo"].includes(route))
        return reply(404, { error: "not_found" });
      if (req.method !== "POST")
        return reply(405, { error: "method_not_allowed" });
      if (requestOrigin && !originAllowed)
        return reply(403, { error: "origin_rejected" });
      if (!/^application\/json\b/i.test(req.headers["content-type"] || ""))
        return reply(415, { error: "invalid_request" });
      const peer = req.socket.remoteAddress;
      // Nginx must overwrite this header. Never trust arbitrary forwarded headers.
      const ip =
        process.env.TRUST_PROXY === "1" &&
        ["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(peer)
          ? String(req.headers["x-real-ip"] || peer)
          : peer;
      limit(`requests:${ip}`, 80);
      let body = "";
      for await (const chunk of req) {
        body += chunk;
        if (Buffer.byteLength(body) > 8192)
          throw new ScanError("invalid_request", 413);
      }
      let data;
      try {
        data = JSON.parse(body);
      } catch {
        throw new ScanError("invalid_request", 400);
      }
      if (!data || typeof data !== "object" || Array.isArray(data))
        throw new ScanError("invalid_request", 400);
      if (route === "/api/website-check") {
        limit(`scan:${ip}`, 12);
        const target = normalizeUrl(data.url);
        const key = target.hostname;
        let cached = cache.get(key);
        if (!cached) {
          let work = pending.get(key);
          if (!work) {
            if (active >= 3 || reports.size >= 2000)
              throw new ScanError("busy", 503);
            active++;
            work = Promise.resolve()
              .then(() => scan(target.href))
              .then((report) => {
                const entry = {
                  report: { ...report, id: randomUUID() },
                  until: Date.now() + HOUR,
                };
                cache.set(key, entry);
                reports.set(entry.report.id, entry);
                return entry;
              })
              .finally(() => {
                active--;
                pending.delete(key);
              });
            pending.set(key, work);
          }
          cached = await work;
        }
        return reply(200, cached.report);
      }
      limit(`lead:${ip}`, 5);
      const report = reports.get(data.scanId)?.report;
      if (!report) throw new ScanError("scan_expired", 400);
      if (
        typeof data.name !== "string" ||
        data.name.trim().length < 2 ||
        data.name.length > 100 ||
        typeof data.email !== "string" ||
        data.email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
        data.consent !== true ||
        (data.note != null &&
          (typeof data.note !== "string" || data.note.length > 1000)) ||
        (data.companyWebsite != null && data.companyWebsite !== "")
      )
        throw new ScanError("invalid_form", 400);
      // Stable idempotency across retries/restarts: derive ID from scan + normalized email.
      const { createHash } = await import("node:crypto");
      const id = createHash("sha256")
        .update(`${report.id}:${data.email.trim().toLowerCase()}`)
        .digest("hex")
        .slice(0, 32);
      const lead = {
        id,
        createdAt: new Date().toISOString(),
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        note: data.note?.trim() || "",
        language: data.language === "en" ? "en" : "nl",
        consent: {
          version: "demo-request-v1",
          text: "Contact me by email about my free personal homepage demo.",
          acceptedAt: new Date().toISOString(),
        },
        report,
      };
      await saveLead(lead);
      return reply(201, { ok: true, reference: id.slice(0, 8) });
    } catch (error) {
      if (!(error instanceof ScanError))
        console.error(
          "Website check request failed:",
          error.code || error.name,
        );
      reply(error instanceof ScanError ? error.status : 500, {
        error: error instanceof ScanError ? error.code : "server_error",
      });
    }
  };
}

// Retain enquiries for 90 days. Data is outside the public document root.
export async function pruneLeads(dataDir, now = Date.now()) {
  for (const name of await readdir(dataDir).catch(() => [])) {
    if (!/^[a-f0-9]{32}\.json$/.test(name)) continue;
    const file = path.join(dataDir, name);
    const lead = JSON.parse(await readFile(file, "utf8"));
    if (Date.parse(lead.createdAt) < now - 90 * 24 * HOUR) await unlink(file);
  }
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const dataDir =
    process.env.LEAD_DATA_DIR || path.join(import.meta.dirname, "data");
  const server = http.createServer(
    { requestTimeout: 15000, headersTimeout: 10000 },
    createHandler({ dataDir }),
  );
  server.listen(
    Number(process.env.PORT || 3010),
    process.env.HOST || "127.0.0.1",
    () => console.log("Website-check server ready"),
  );
  const cleanup = () =>
    pruneLeads(dataDir).catch(() =>
      console.error("Lead retention cleanup failed"),
    );
  cleanup();
  setInterval(cleanup, 24 * HOUR).unref();
}
