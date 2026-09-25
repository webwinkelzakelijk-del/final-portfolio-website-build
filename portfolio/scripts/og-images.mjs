// Generates the social preview images (1200x630) in public/og/.
// Run after changing page titles:  npm run og
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const pages = {
  "home-nl": ["Digitale oplossingen.", "Gebouwd voor jouw bedrijf.", "Websites · Webapps · Automatiseringen"],
  "home-en": ["Digital solutions.", "Built for your business.", "Websites · Web apps · Automations"],
  "websites-nl": ["Een website op maat", "voor jouw bedrijf.", "Oplossing · Websites"],
  "websites-en": ["A custom website", "for your business.", "Solution · Websites"],
  "webapps-nl": ["Een webapp die past", "bij jouw werkwijze.", "Oplossing · Webapps"],
  "webapps-en": ["A web app that fits", "the way you work.", "Solution · Web apps"],
  "automation-nl": ["Koppel je systemen,", "minder handwerk.", "Oplossing · Automatisering"],
  "automation-en": ["Connect your systems,", "less manual work.", "Solution · Automation"],
  "thanks-nl": ["Bedankt voor", "je aanvraag.", "Kevin Rebuilds"],
  "thanks-en": ["Thank you for", "your request.", "Kevin Rebuilds"],
};
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const font = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

await mkdir("public/og", { recursive: true });
const portrait = await sharp("src/assets/kevin-head.webp")
  .resize(230, 230)
  .composite([{ input: Buffer.from('<svg width="230" height="230"><circle cx="115" cy="115" r="115"/></svg>'), blend: "dest-in" }])
  .png()
  .toBuffer();

for (const [name, [l1, l2, eyebrow]] of Object.entries(pages)) {
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><radialGradient id="g" cx="0.85" cy="0.3" r="0.7"><stop offset="0" stop-color="#1f4fe0" stop-opacity="0.16"/><stop offset="1" stop-color="#1f4fe0" stop-opacity="0"/></radialGradient></defs>
  <rect width="1200" height="630" fill="#ffffff"/><rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="600" width="1200" height="30" fill="#1f4fe0"/>
  <text x="80" y="120" font-family="${font}" font-size="44" font-weight="800" fill="#0d1526" letter-spacing="-1.5">kevin<tspan fill="#1f4fe0">rebuilds.</tspan></text>
  <text x="80" y="232" font-family="${font}" font-size="24" font-weight="600" fill="#6b7689" letter-spacing="4">${esc(eyebrow.toUpperCase())}</text>
  <text x="80" y="330" font-family="${font}" font-size="56" font-weight="800" fill="#0d1526" letter-spacing="-1.5">${esc(l1)}</text>
  <text x="80" y="402" font-family="${font}" font-size="56" font-weight="800" fill="#1f4fe0" letter-spacing="-1.5">${esc(l2)}</text>
  <text x="80" y="520" font-family="${font}" font-size="26" font-weight="500" fill="#4d5a70">www.kevinrebuilds.com</text>
  <circle cx="1015" cy="300" r="126" fill="#ffffff" stroke="#e3e8f1" stroke-width="4"/>
</svg>`;
  await sharp(Buffer.from(svg))
    .composite([{ input: portrait, left: 900, top: 185 }])
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(`public/og/${name}.png`);
  console.log("og:", name);
}
