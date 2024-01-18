// @ts-check

import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"
import unfonts from "unplugin-fonts/astro"
import svgr from "vite-plugin-svgr"

// import dynamicBase from "./plugins/dynamic-base/index.mjs"
// import files from "./plugins/files/index.mjs"

// https://astro.build/config
export default defineConfig({
  site: "https://info.etherna.io",
  experimental: {
    assets: true,
  },
  integrations: [
    react(),
    // files(),
    // dynamicBase(),
    unfonts({
      custom: {
        families: [
          {
            name: "Geist",
            src: "./fonts/geist-sans/*.woff2",
          },
          {
            name: "Geist Mono",
            src: "./fonts/geist-mono/*.woff2",
          },
          {
            name: "DM Serif Display",
            src: "./fonts/dm-serif-display/*.woff2",
          },
        ],
      },
    }),
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
    plugins: [
      svgr({
        svgrOptions: {
          namedExport: "ReactComponent",
        },
      }),
    ],
  },
})
