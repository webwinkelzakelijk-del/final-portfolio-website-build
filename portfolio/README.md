# Kevin Rebuilds — portfolio v2

Static, bilingual portfolio built with **Astro**, **GSAP (ScrollTrigger)** and **Lenis** smooth scroll.

- Dutch at `/`, English at `/en/` (separate HTML pages, so both are indexed by Google, with `hreflang` tags).
- Old links keep working: `?lang=en` → `/en/`, `/werk/` → `/#werk`, `/contact/` → `/#contact`.
- Every animation respects `prefers-reduced-motion`, and all content is readable without JavaScript.

## Where to change things

| What | File |
| --- | --- |
| All text (NL + EN), e-mail, Fiverr link | `src/i18n/content.ts` |
| Page structure / sections | `src/components/Home.astro` |
| Colours, fonts, layout | `src/styles/global.css` (tokens at the top) |
| Animations & interactions | `src/scripts/main.ts` |
| Contact form (FormSubmit) | `src/scripts/contact.ts` |
| SEO: title, description, OG image, structured data | `src/layouts/Base.astro` |
| Photos | `src/assets/` (automatically optimised to WebP at build) |

## Run locally

```sh
cd portfolio
npm install
npm run dev        # http://localhost:4321
```

## Build & deploy to CloudPanel

```sh
npm run build      # writes the complete site to portfolio/dist
```

Upload the **contents** of `portfolio/dist/` to the site's document root in CloudPanel
(`/home/<site-user>/htdocs/www.kevinrebuilds.com/`), overwriting the old files.
Use CloudPanel's File Manager, or SFTP (FileZilla / WinSCP) with the site user.

### Optional: automatic deploy from GitHub

`.github/workflows/deploy.yml` builds the site on every push to `main` that touches `portfolio/`.
It only uploads when these repository secrets exist (GitHub → Settings → Secrets and variables → Actions):

| Secret | Example |
| --- | --- |
| `DEPLOY_HOST` | `2.28.224.109` |
| `DEPLOY_USER` | the CloudPanel **site user** (not root) |
| `DEPLOY_PATH` | `/home/<site-user>/htdocs/www.kevinrebuilds.com/` |
| `DEPLOY_SSH_KEY` | a private key whose public key is added to that site user in CloudPanel → SSH/FTP |

Without the secrets the workflow still builds (a free sanity check) and skips the upload.
