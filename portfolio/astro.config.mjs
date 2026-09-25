import { defineConfig } from "astro/config";

// Static build: `npm run build` writes the complete site to ./dist.
// Upload the CONTENTS of ./dist to the site's document root on the server.
export default defineConfig({
  site: "https://www.kevinrebuilds.com",
  trailingSlash: "ignore",
  build: { format: "directory", inlineStylesheets: "auto" },
  // Old URLs from the previous site keep working.
  redirects: {
    "/werk": "/#voorbeelden",
    "/contact": "/#aanvragen",
  },
  server: { port: 4321, host: true },
});
