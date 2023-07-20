// @ts-check

import { dirname, resolve } from "path"
import { fileURLToPath } from "url"
import image from "@astrojs/image"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"
import svgr from "vite-plugin-svgr"

import dynamicBase from "./plugins/dynamic-base/index.mjs"

// https://astro.build/config
/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site: "https://info.etherna.io",
  integrations: [
    react(),
    image(),
    dynamicBase(),
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
