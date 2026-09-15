# Kevin Rebuilds — Cobalt

The portfolio lives in `artifacts/coming-soon`. It is a static React + Vite site; the portfolio itself does not need the API server or a database.

The homepage is served from `/`. The complete project overview is a separate multi-page entry at `/werk/`; the Work link in the main navigation opens that page.

## Develop

```sh
pnpm install --frozen-lockfile
pnpm --filter @workspace/coming-soon dev
```

The default port is 5173. Set `PORT` to choose a different port. `BASE_PATH` sets the base path when deploying under a subdirectory.

## Build

```sh
pnpm run build
```

This type-checks and builds the entire workspace. The portfolio's deployable files are in `artifacts/coming-soon/dist`. For the portfolio alone:

```sh
pnpm --filter @workspace/coming-soon typecheck
pnpm --filter @workspace/coming-soon build
pnpm --filter @workspace/coming-soon serve
```

## Content and behavior

- `src/App.tsx` contains paired Dutch/English copy, the project content, and interactions. Dutch is the default for new visitors. A language choice is remembered locally. Explicit `?lang=nl` and `?lang=en` links take precedence over the stored choice.
- `src/index.css` contains the Cobalt design, breakpoints, device previews, and reduced-motion styles.
- `index.html` provides Dutch metadata before JavaScript loads. Page title, description, and language metadata update when the visitor changes language.
- Forma Studio, Ritme, and Flowdesk are clearly labelled **concept projects**. Replace their text and previews with verified client work when available; do not present the examples as completed commissions.
- Project cards open native dialogs with keyboard focus handling. Ritme and Flowdesk contain local interactive demonstrations.
- The contact page submits enquiries to the portfolio inbox through FormSubmit's AJAX endpoint. It includes explicit success and error states plus a honeypot field for basic spam protection.
- `public/images/kevin-head-portrait.webp` is the optimized portrait used in the About section. The original source image remains outside the repository.

## Browser verification

Checked at 320, 390, 768, 1024, and 1440 pixels wide: no page overflow, Dutch on a fresh visit, language persistence and explicit-language links, project open/close, keyboard Tab/Shift+Tab and Escape, focus returning to the project card, habit toggle, workflow replay, service disclosures, email copy, contact links, image loading, and reduced motion.

The workspace keeps Windows x64 native dependencies as well as Linux x64 dependencies for local Windows development and Replit. The pnpm install guard is cross-platform.
