import type { APIRoute } from "astro";
import { SITE_URL } from "../config";
import { ROUTES, type PageKey } from "../i18n/routes";

// Indexable pages only (the thank-you pages are noindex).
const PAGES: PageKey[] = ["home", "websites", "webapps", "automation"];
const abs = (p: string) => new URL(p, SITE_URL).href;

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = PAGES.flatMap((page) =>
    (["nl", "en"] as const).map((lang) => `  <url>
    <loc>${abs(ROUTES[page][lang])}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="nl" href="${abs(ROUTES[page].nl)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${abs(ROUTES[page].en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(ROUTES[page].nl)}"/>
  </url>`),
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
