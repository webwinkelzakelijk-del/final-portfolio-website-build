import { defineConfig } from "astro/config";

// Static build: `npm run build` writes the complete site to ./dist.
// Upload the CONTENTS of ./dist to the CloudPanel site root (htdocs).
export default defineConfig({
  site: "https://www.kevinrebuilds.com",
  trailingSlash: "ignore",
  build: { format: "directory", inlineStylesheets: "auto" },
  // Keep the old URLs working.
  redirects: {
    "/werk": "/#werk",
    "/contact": "/#contact",
  },
  server: { port: 4321, host: true },
  vite: {
    server: {
      // Local development: forward the free website check to the Node scanner
      // (artifacts/website-check, `npm start` on port 3010).
      proxy: { "/api/website-check": "http://127.0.0.1:3010" },
    },
  },
});
