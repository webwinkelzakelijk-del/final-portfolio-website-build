import { createHash, timingSafeEqual } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export function authorized(header, password) {
  if (!password || password.length < 24 || !header?.startsWith("Basic "))
    return false;
  const actual = Buffer.from(header.slice(6), "base64").toString("utf8");
  const hash = (value) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(actual), hash(`kevin:${password}`));
}
const escape = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );

export async function renderInbox(dataDir) {
  const leads = [];
  for (const name of await readdir(dataDir).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  })) {
    if (!/^[a-f0-9]{32}\.json$/.test(name)) continue;
    leads.push(JSON.parse(await readFile(path.join(dataDir, name), "utf8")));
  }
  leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return `<!doctype html><html lang="nl"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Demo-aanvragen · Kevin Rebuilds</title><style>
  *{box-sizing:border-box}body{font:16px/1.6 system-ui,sans-serif;background:#f2f5fc;color:#142b57;margin:0;padding:28px 18px}main{max-width:900px;margin:auto}h1{line-height:1.15;font-size:clamp(28px,6vw,42px);letter-spacing:-1px}a{color:#244dce;overflow-wrap:anywhere}article{background:white;border:1px solid #d3def1;border-radius:18px;padding:24px;margin:24px 0}h2{margin:0;font-size:22px}p{overflow-wrap:anywhere}small{color:#566986}.note{white-space:pre-wrap}.checks{display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:0}.checks li{background:#edf3ff;border-radius:6px;padding:4px 8px;font-size:12px}.reply{display:inline-block;padding:12px 18px;background:#244dce;color:white;border-radius:8px;text-decoration:none}details{margin:16px 0}summary{cursor:pointer;min-height:44px}a:focus-visible,summary:focus-visible{outline:3px solid #244dce;outline-offset:4px}
  </style><main><small>KEVIN REBUILDS · PRIVÉ</small><h1>Jouw demo-aanvragen.</h1><p>${leads.length} aanvragen · nieuwste eerst</p><p><small>Dit is je inbox voor website-demo’s. Aanvragen blijven maximaal 90 dagen bewaard. Vernieuw deze pagina om nieuwe aanvragen te zien. Er worden geen automatische e-mailmeldingen verstuurd.</small></p>${leads.length ? leads.map((lead) => `<article><small>${escape(new Date(lead.createdAt).toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" }))} · ${escape(lead.id.slice(0, 8))}</small><h2>${escape(lead.name)}</h2><p><a href="${escape(lead.report.url)}" target="_blank" rel="noopener noreferrer">${escape(lead.report.domain)}</a> · ${escape(lead.report.score)}/10 ${lead.report.partial ? "(gedeeltelijke meting)" : ""}</p><p>${escape(lead.email)}</p>${lead.note ? `<p class="note">${escape(lead.note)}</p>` : ""}<ul class="checks">${lead.report.checks.map((check) => `<li>${escape(check.id)}: ${escape(check.status)}${check.lcp != null ? ` · LCP ${escape(check.lcp)} s` : ""}</li>`).join("")}</ul><details><summary>Toestemming &amp; aanvraag</summary><p>Taal: ${escape(lead.language)}<br>Toestemming: ${escape(lead.consent.text)}<br>Gegeven op: ${escape(lead.consent.acceptedAt)}</p></details><a class="reply" href="mailto:${escape(encodeURIComponent(lead.email))}?subject=${encodeURIComponent("Jouw gratis website-demo — Kevin Rebuilds")}">Beantwoord per e-mail →</a></article>`).join("") : "<article><h2>Nog geen aanvragen.</h2><p>Nieuwe demo-aanvragen verschijnen hier automatisch na het vernieuwen.</p></article>"}</main></html>`;
}
