import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeUrl,
  isPublicIPv4,
  publicAddress,
  inspectHtml,
  calculateScore,
  readPage,
} from "../scanner.mjs";

test("normalizes public domains and strips sensitive paths and query parameters", () => {
  assert.equal(normalizeUrl("  bedrijf.nl  ").href, "https://bedrijf.nl/");
  assert.equal(
    normalizeUrl("https://bedrijf.nl/account?token=secret#private").href,
    "https://bedrijf.nl/",
  );
  assert.equal(
    normalizeUrl("http://www.bedrijf.nl/").href,
    "http://www.bedrijf.nl/",
  );
});
test("rejects non-web protocols, credentials, internal and numeric hosts and arbitrary ports", () => {
  for (const input of [
    "",
    null,
    "localhost",
    "https://127.0.0.1",
    "https://2130706433",
    "https://0x7f000001",
    "https://[::1]",
    "http://192.168.1.1",
    "https://foo.internal",
    "https://foo.local",
    "https://bedrijf.nl:8080",
    "https://user:pass@bedrijf.nl",
    "file:///etc/passwd",
    "ftp://bedrijf.nl",
    "http://bedrijf.nl\\@127.0.0.1",
    "a b.nl",
  ]) {
    assert.throws(() => normalizeUrl(input), undefined, String(input));
  }
});
test("rejects private/reserved DNS answers including mixed public/private records", async () => {
  for (const address of [
    "0.0.0.0",
    "10.1.2.3",
    "100.64.0.1",
    "127.0.0.1",
    "169.254.169.254",
    "172.16.1.1",
    "192.168.2.1",
    "192.0.0.1",
    "198.18.0.1",
    "198.51.100.5",
    "203.0.113.1",
    "224.0.0.1",
    "255.255.255.255",
    "::1",
  ])
    assert.equal(isPublicIPv4(address), false, address);
  assert.equal(isPublicIPv4("8.8.8.8"), true);
  await assert.rejects(
    publicAddress("bedrijf.nl", async () => ["8.8.8.8", "127.0.0.1"]),
    /blocked_address/,
  );
  assert.equal(
    await publicAddress("bedrijf.nl", async () => ["8.8.8.8"]),
    "8.8.8.8",
  );
  await assert.rejects(
    readPage(new URL("http://127.0.0.1/private")),
    /invalid_url/,
  );
});
test("HTML checks tolerate attribute ordering and quoting; comments and scripts cannot fake checks", () => {
  const report = inspectHtml(
    `<title>Bedrijf</title><meta content='width=device-width, initial-scale=1' name='viewport'>
    <meta name=description content='Beschrijving'><footer>Copyright 2019–2026</footer>`,
    "https://bedrijf.nl/",
  );
  assert(report.checks.every((check) => check.status === "pass"));
  assert.equal(report.copyrightYear, 2026);
  const empty = inspectHtml(
    `<!-- <title>Fake</title> --><script>const a='<meta name="description" content="fake">'</script>`,
    "http://bedrijf.nl/",
  );
  assert(empty.checks.every((check) => check.status === "fail"));
});
test("score excludes unavailable measurements and weights partial speed values fairly", () => {
  const checks = inspectHtml(
    "<title>Bedrijf</title>",
    "https://bedrijf.nl/",
  ).checks;
  assert.equal(
    calculateScore([...checks, { status: "unknown", weight: 4 }]),
    5,
  );
  assert.equal(
    calculateScore([...checks, { status: "warn", weight: 4, value: 0.5 }]),
    5,
  );
  assert.equal(calculateScore([{ status: "unknown", weight: 4 }]), null);
});
