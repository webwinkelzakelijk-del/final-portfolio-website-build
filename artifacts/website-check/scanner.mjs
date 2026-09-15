import { resolve4 } from "node:dns/promises";
import { isIP } from "node:net";
import http from "node:http";
import https from "node:https";

export class ScanError extends Error {
  constructor(code, status = 422) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

export function normalizeUrl(input) {
  if (
    typeof input !== "string" ||
    input.length > 500 ||
    /[\s\\]/.test(input.trim())
  )
    throw new ScanError("invalid_url", 400);
  let url;
  try {
    url = new URL(
      /^[a-z]+:\/\//i.test(input.trim())
        ? input.trim()
        : `https://${input.trim()}`,
    );
  } catch {
    throw new ScanError("invalid_url", 400);
  }
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.port ||
    isIP(url.hostname.replace(/[\[\]]/g, "")) ||
    !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/i.test(
      url.hostname,
    ) ||
    /\.(local|localhost|internal|test|invalid|example|onion)$/i.test(
      url.hostname,
    )
  )
    throw new ScanError("invalid_url", 400);
  // Scan only a public homepage; never forward query strings, passwords or paths.
  return new URL(`${url.protocol}//${url.hostname}/`);
}

export function isPublicIPv4(address) {
  if (isIP(address) !== 4) return false;
  const [a, b, c] = address.split(".").map(Number);
  return !(
    a === 0 ||
    a === 10 ||
    a === 127 ||
    a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && (b === 168 || b === 0 || (b === 88 && c === 99))) ||
    (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) ||
    (a === 203 && b === 0 && c === 113)
  );
}

export async function publicAddress(hostname, resolver = resolve4) {
  let addresses;
  try {
    addresses = await Promise.race([
      resolver(hostname),
      new Promise((_, reject) => {
        const timer = setTimeout(
          () => reject(new ScanError("unreachable")),
          4000,
        );
        timer.unref();
      }),
    ]);
  } catch {
    throw new ScanError("unreachable");
  }
  if (!addresses.length || addresses.some((ip) => !isPublicIPv4(ip)))
    throw new ScanError("blocked_address", 400);
  return addresses[0];
}

export async function readPage(
  url,
  redirects = 0,
  deadline = Date.now() + 20000,
) {
  // Revalidate and pin DNS on EVERY redirect, including same-host redirects.
  normalizeUrl(url.href);
  if (redirects > 4 || Date.now() > deadline)
    throw new ScanError("unreachable");
  const address = await publicAddress(url.hostname);
  const result = await new Promise((resolve, reject) => {
    const transport = url.protocol === "https:" ? https : http;
    const req = transport.get(
      url,
      {
        agent: false,
        lookup: (_hostname, options, callback) =>
          options.all
            ? callback(null, [{ address, family: 4 }])
            : callback(null, address, 4),
        headers: {
          "User-Agent": "KevinRebuilds-WebsiteCheck/1.0",
          Accept: "text/html",
          "Accept-Encoding": "identity",
        },
      },
      (res) => {
        if (
          [301, 302, 303, 307, 308].includes(res.statusCode) &&
          res.headers.location
        ) {
          resolve({ location: res.headers.location });
          res.destroy();
          return;
        }
        if (
          res.statusCode < 200 ||
          res.statusCode >= 300 ||
          (res.headers["content-encoding"] &&
            res.headers["content-encoding"] !== "identity") ||
          !/text\/html|application\/xhtml\+xml/i.test(
            res.headers["content-type"] || "",
          )
        ) {
          res.destroy();
          reject(new ScanError("unreadable"));
          return;
        }
        let bytes = 0;
        const chunks = [];
        res.on("data", (chunk) => {
          bytes += chunk.length;
          if (bytes > 1500000) {
            reject(new ScanError("page_too_large"));
            res.destroy();
          } else chunks.push(chunk);
        });
        res.on("end", () =>
          resolve({
            html: Buffer.concat(chunks).toString("utf8"),
            url: url.href,
          }),
        );
        res.on("error", reject);
      },
    );
    const timer = setTimeout(
      () => req.destroy(new ScanError("unreachable")),
      Math.max(1, Math.min(8000, deadline - Date.now())),
    );
    req.on("close", () => clearTimeout(timer));
    req.on("error", reject);
  });
  if (result.location) {
    let next;
    try {
      next = new URL(result.location, url);
    } catch {
      throw new ScanError("unreadable");
    }
    return readPage(next, redirects + 1, deadline);
  }
  return result;
}

function meta(html, name) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const attributes = {};
    for (const match of tag.matchAll(
      /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g,
    ))
      attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4];
    if (attributes.name?.toLowerCase() === name)
      return attributes.content || "";
  }
  return "";
}

export function inspectHtml(html, url, now = new Date()) {
  const source = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "");
  const title =
    source
      .match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]
      ?.replace(/<[^>]*>/g, "")
      .trim() || "";
  const viewport = /width\s*=\s*device-width/i.test(meta(source, "viewport"));
  const description = Boolean(meta(source, "description").trim());
  const copyright = [
    ...source
      .replace(/<[^>]*>/g, " ")
      .matchAll(
        /(?:©|&copy;|&#169;|&#x0*a9;|copyright)\s*(?:\(c\))?\s*((?:19|20)\d{2})(?:\s*[-–—]\s*((?:19|20)\d{2}))?/gi,
      ),
  ]
    .map((m) => Number(m[2] || m[1]))
    .filter((year) => year <= now.getFullYear());
  return {
    checks: [
      {
        id: "https",
        status: url.startsWith("https:") ? "pass" : "fail",
        weight: 2,
      },
      { id: "viewport", status: viewport ? "pass" : "fail", weight: 2 },
      { id: "title", status: title ? "pass" : "fail", weight: 1 },
      { id: "description", status: description ? "pass" : "fail", weight: 1 },
    ],
    copyrightYear: copyright.length ? Math.max(...copyright) : null,
  };
}

export function calculateScore(checks) {
  const measured = checks.filter((c) => c.status !== "unknown");
  const available = measured.reduce((sum, c) => sum + c.weight, 0);
  const points = measured.reduce(
    (sum, c) => sum + c.weight * (c.value ?? (c.status === "pass" ? 1 : 0)),
    0,
  );
  return available ? Math.round((points / available) * 100) / 10 : null;
}

async function mobileSpeed(url) {
  const unknown = { id: "speed", status: "unknown", weight: 4 };
  try {
    const endpoint = new URL(
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
    );
    endpoint.searchParams.set("url", url);
    endpoint.searchParams.set("strategy", "mobile");
    endpoint.searchParams.set("category", "performance");
    if (process.env.PAGESPEED_API_KEY)
      endpoint.searchParams.set("key", process.env.PAGESPEED_API_KEY);
    const response = await fetch(endpoint, {
      signal: AbortSignal.timeout(35000),
    });
    if (!response.ok) return unknown;
    const data = await response.json();
    const value = data.lighthouseResult?.categories?.performance?.score;
    const lcp =
      data.lighthouseResult?.audits?.["largest-contentful-paint"]?.numericValue;
    if (
      data.lighthouseResult?.runtimeError ||
      typeof value !== "number" ||
      !Number.isFinite(value) ||
      value < 0 ||
      value > 1
    )
      return unknown;
    return {
      id: "speed",
      status: value >= 0.9 ? "pass" : value >= 0.5 ? "warn" : "fail",
      weight: 4,
      value,
      lcp:
        typeof lcp === "number" && Number.isFinite(lcp)
          ? Math.round(lcp / 100) / 10
          : null,
    };
  } catch {
    return unknown;
  }
}

export async function scanWebsite(input) {
  const url = normalizeUrl(input);
  await publicAddress(url.hostname);
  let page;
  // Always try HTTPS first, even if the visitor pasted an HTTP address.
  url.protocol = "https:";
  try {
    page = await readPage(url);
  } catch (error) {
    if (
      error instanceof ScanError &&
      ["blocked_address", "invalid_url"].includes(error.code)
    )
      throw error;
    url.protocol = "http:";
    try {
      page = await readPage(url);
    } catch (fallbackError) {
      throw fallbackError instanceof ScanError
        ? fallbackError
        : new ScanError("unreachable");
    }
  }
  const inspected = inspectHtml(page.html, page.url);
  const speed = await mobileSpeed(page.url);
  const checks = [...inspected.checks, speed];
  return {
    domain: new URL(page.url).hostname,
    url: page.url,
    checkedAt: new Date().toISOString(),
    score: calculateScore(checks),
    checks,
    copyrightYear: inspected.copyrightYear,
    partial: speed.status === "unknown",
  };
}
