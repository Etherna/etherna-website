// @ts-check
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"

// https://astro.build/config
/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  integrations: [react(), mdx(), sitemap()],
})
