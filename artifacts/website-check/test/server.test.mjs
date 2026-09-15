import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createHandler, pruneLeads } from "../server.mjs";

test("API caches scans, validates submissions, stores enquiries once and applies limits", async (t) => {
  const dataDir = await mkdtemp(
    path.join(os.tmpdir(), "kr-website-check-test-"),
  );
  let count = 0;
  const server = http.createServer(
    createHandler({
      dataDir,
      scan: async (url) => {
        count++;
        return {
          domain: "bedrijf.nl",
          url,
          checks: [],
          score: 7,
          partial: true,
        };
      },
    }),
  );
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    await rm(dataDir, { recursive: true });
  });
  const base = `http://127.0.0.1:${server.address().port}/api/website-check`;
  const post = (route, data, origin = "http://localhost:5173") =>
    fetch(`${base}${route}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", origin },
      body: JSON.stringify(data),
    });
  const preflight = await fetch(base, {
    method: "OPTIONS",
    headers: {
      origin: "http://localhost:5173",
      "access-control-request-method": "POST",
      "access-control-request-headers": "content-type",
    },
  });
  assert.equal(preflight.status, 204);
  assert.equal(
    preflight.headers.get("access-control-allow-origin"),
    "http://localhost:5173",
  );
  assert.equal(
    (await fetch(base, {
      method: "OPTIONS",
      headers: { origin: "https://attacker.com" },
    })).status,
    403,
  );
  assert.equal(
    (await post("", { url: "bedrijf.nl" }, "https://attacker.com")).status,
    403,
  );
  assert.equal((await post("", { url: "http://127.0.0.1" })).status, 400);
  assert.equal((await post("", null)).status, 400);
  const [a, b] = await Promise.all([
    post("", { url: "bedrijf.nl" }),
    post("", { url: "bedrijf.nl" }),
  ]);
  const report = await a.json();
  assert.equal(
    a.headers.get("access-control-allow-origin"),
    "http://localhost:5173",
  );
  assert.equal(report.id, (await b.json()).id);
  assert.equal(count, 1);
  const lead = {
    scanId: report.id,
    name: "Test Bedrijf",
    email: "test@example.com",
    consent: true,
  };
  assert.equal((await post("/demo", { ...lead, consent: false })).status, 400);
  assert.equal(
    (await post("/demo", { ...lead, email: "bad-address" })).status,
    400,
  );
  const submitted = await post("/demo", lead);
  assert.equal(submitted.status, 201);
  assert.equal((await post("/demo", lead)).status, 201);
  const files = await readdir(dataDir);
  assert.equal(files.length, 1);
  const saved = JSON.parse(
    await readFile(path.join(dataDir, files[0]), "utf8"),
  );
  assert.equal(saved.report.id, report.id);
  assert.equal(saved.email, lead.email);
  assert.equal(saved.consent.version, "demo-request-v1");
  assert.equal(
    (await post("/demo", { ...lead, scanId: "invented" })).status,
    400,
  );
  assert.equal((await post("/demo", lead)).status, 429);
  for (let i = 0; i < 10; i++) await post("", { url: "bedrijf.nl" });
  assert.equal((await post("", { url: "bedrijf.nl" })).status, 429);
  const oldFile = path.join(dataDir, `${"a".repeat(32)}.json`);
  await writeFile(
    oldFile,
    JSON.stringify({ createdAt: "2020-01-01T00:00:00Z" }),
  );
  await pruneLeads(dataDir);
  assert.equal((await readdir(dataDir)).length, 1);
});

test("write failures never claim the enquiry was received", async (t) => {
  const folder = await mkdtemp(
    path.join(os.tmpdir(), "kr-website-check-failure-"),
  );
  const dataDir = path.join(folder, "not-a-directory");
  await writeFile(dataDir, "test");
  const server = http.createServer(
    createHandler({ dataDir, scan: async () => ({ checks: [] }) }),
  );
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    await rm(folder, { recursive: true });
  });
  const base = `http://127.0.0.1:${server.address().port}/api/website-check`;
  const post = (route, data) =>
    fetch(base + route, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  const report = await (await post("", { url: "bedrijf.nl" })).json();
  const response = await post("/demo", {
    scanId: report.id,
    name: "Test",
    email: "test@example.com",
    consent: true,
  });
  assert.equal(response.status, 500);
  assert.equal((await response.json()).error, "server_error");
});
