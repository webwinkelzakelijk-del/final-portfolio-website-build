# Kevin Rebuilds: website (Precision Studio)

Static, bilingual business website built with **Astro 7**. No UI framework, one font file, about 6.5 KB of JavaScript.

- Dutch at `/`, English at `/en/`, each with its own URL, `hreflang`, canonical and social preview.
- Service pages: `/websites/`, `/webapps/`, `/automatisering/` and `/en/websites/`, `/en/web-apps/`, `/en/automation/`.
- Old URLs keep working: `?lang=en` → `/en/`, `/werk/` → `/#voorbeelden`, `/contact/` → `/#aanvragen`.
- Everything is readable without JavaScript. Animations respect `prefers-reduced-motion`.

## Where to change things

| What | File |
| --- | --- |
| Homepage, navigation, form and footer text (NL + EN) | `src/i18n/site.ts` |
| Service page content (NL + EN) | `src/i18n/services.ts` |
| URLs and section anchors | `src/i18n/routes.ts` |
| E-mail address, form delivery | `src/config.ts` |
| Colours, typography, layout | `src/styles/global.css` (design tokens at the top) |
| Demo interfaces (website, portal, flow) | `src/components/previews/` |
| Interactions and form validation | `src/scripts/site.ts` |
| Structured data (JSON-LD) | `src/seo/schema.ts` |
| robots.txt, llms.txt, font, favicon | `public/` |

## Run locally

```sh
cd portfolio
npm install
npm run dev        # http://localhost:4321
```

## Build

```sh
npm run check      # type check
npm run build      # complete site in portfolio/dist
npm run preview    # serve the production build locally
npm run og         # only after changing titles: regenerates public/og/*.png
```

## Deploy to the existing hosting (CloudPanel)

1. Run `npm run build`.
2. Upload the **contents** of `portfolio/dist/` to the site's document root, e.g. `/home/<site-user>/htdocs/www.kevinrebuilds.com/`, via CloudPanel's File Manager or SFTP (FileZilla/WinSCP) with the site user. Overwrite existing files.
3. Old files from the previous site can remain. Only remove them if you're sure nothing else needs them.
4. Optional automatic deploy: `.github/workflows/deploy.yml` builds this folder on every push to `main` and uploads it when the `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH` and `DEPLOY_SSH_KEY` secrets are set.

The server needs no special rules: every page is a plain `index.html` in its own folder, and `404.html` sits at the root. In CloudPanel's Vhost editor you can point Nginx's `error_page 404` to `/404.html`.

## Contact form

The form posts to **FormSubmit**, the same service and inbox the previous site used.

- With JavaScript: the request is sent in the background. Success is shown **only** when FormSubmit confirms delivery; otherwise the visitor sees an error with the e-mail address as a fallback.
- Without JavaScript: a normal form post to FormSubmit, which then redirects to `/bedankt/` or `/en/thank-you/`.
- Spam protection: a honeypot field (`_honey`) and a minimum fill-in time. The no-JS path also uses FormSubmit's own captcha.

### Still to set up (once)

1. **Activate FormSubmit for this inbox.** The first submission from the live domain triggers an activation e-mail from FormSubmit to `webwinkelzakelijk@gmail.com`; click the link in it. Until then FormSubmit does not deliver, and the site correctly shows "not sent".
2. **Recommended: hide the address.** After activation FormSubmit shows a random alias. Build with it:
   `PUBLIC_FORMSUBMIT_ID=<alias> npm run build` (PowerShell: `$env:PUBLIC_FORMSUBMIT_ID="<alias>"; npm run build`).
3. To temporarily switch the form off: `PUBLIC_FORMSUBMIT_ID=""`. The form is then hidden and visitors see the e-mail address instead.

## SEO & GEO (AI search)

- Unique title, meta description, canonical, `hreflang` (nl, en, x-default) and Open Graph/Twitter image per page.
- `sitemap.xml` (with language alternates) and `robots.txt`, which explicitly allows search and AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and others).
- `llms.txt`: a short, factual summary of the services for AI assistants.
- JSON-LD with only verifiable facts: `WebSite`, `ProfessionalService` (with an offer catalogue of the three services), `Person`, and per service page `Service`, `FAQPage` and `BreadcrumbList`. There are deliberately no reviews, ratings, address or client counts.
- Service pages answer questions directly (who it's for, problems, what I build, process, FAQ), which is what both Google and AI answer engines quote.

## Checks performed

- `astro check`: 0 errors, 0 warnings. Production build of 11 pages.
- Lighthouse (production build, Edge headless):
  - homepage mobile: Performance 98, Accessibility 100, Best Practices 100, SEO 100
  - homepage desktop: 100 / 100 / 100 / 100
  - `/webapps/` mobile: 99 / 100 / 100 / 100
- No horizontal overflow at 320, 375, 768 and 1024 px on the home and service pages.
- Form states tested with a mocked network call (no real submissions): validation summary and inline errors, loading, "not delivered", network error, success.
- Language switch keeps the section, redirects, service preselection and all 42 internal links/anchors checked.

## Local tooling (not deployed)

- `scripts/og-images.mjs`: generates the social preview images.
- `scripts/screenshot.ps1` + `scripts/mobile-frame.html`: full-page screenshots with headless Edge (the frame gives a true 390 px mobile viewport).
- `docs/screenshots/`: desktop and mobile screenshots of this version.
