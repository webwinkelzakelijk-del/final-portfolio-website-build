// Screenshot via the Chrome DevTools Protocol with headless Edge: real device
// emulation and real waiting time, so scroll/entrance animations finish.
// Usage: node scripts/cdp-shot.mjs <url> <out.png> <width> <height> <scale> [mobile] [fullHeight]
import { spawn } from "node:child_process";
import { writeFile, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const [url, out, w = "1440", h = "900", scale = "1", mobile = "", full = ""] = process.argv.slice(2);
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9300 + Math.floor(Math.random() * 400);
const profile = await mkdtemp(path.join(tmpdir(), "cdp-"));
const proc = spawn(edge, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    target = list.find((t) => t.type === "page");
  } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
const send = (method, params = {}) => new Promise((resolve) => { const i = ++id; pending.set(i, resolve); ws.send(JSON.stringify({ id: i, method, params })); });

const isMobile = mobile === "mobile";
await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: +scale, mobile: isMobile });
if (isMobile) await send("Emulation.setUserAgentOverride", { userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Mobile Safari/537.36" });
await send("Page.enable");
await send("Page.navigate", { url });
await sleep(4000);
// Scroll through the page to trigger reveal animations, then back to the top.
const target_h = full ? +full : +h;
for (let y = 0; y <= target_h; y += Math.round(+h * 0.6)) {
  await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y})` });
  await sleep(350);
}
await send("Runtime.evaluate", { expression: "window.scrollTo(0, 0)" });
await sleep(2500);
const shot = await send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: Boolean(full),
  clip: { x: 0, y: 0, width: +w, height: target_h, scale: 1 },
});
await writeFile(out, Buffer.from(shot.result.data, "base64"));
console.log("saved", out);
ws.close();
proc.kill();
process.exit(0);
