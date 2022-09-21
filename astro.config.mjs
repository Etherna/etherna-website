// @ts-check

import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import turbolinks from "@astrojs/turbolinks"
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site: "https://info.etherna.io",
  integrations: [turbolinks(), mdx(), sitemap()],
})
