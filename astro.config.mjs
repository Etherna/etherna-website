// @ts-check

// import mdx from "@astrojs/mdx"

import image from "@astrojs/image"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"
import svgr from "vite-plugin-svgr"

// https://astro.build/config
/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site: "https://info.etherna.io",
  integrations: [
    react(),
    image(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          it: "it",
        },
      },
    }),
  ],
  vite: {
    resolve: {
      alias: [{ find: "@", replacement: resolve(dirname(fileURLToPath(import.meta.url)), "src") }],
    },
    plugins: [svgr()],
  },
})
