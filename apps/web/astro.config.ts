// @ts-check

import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import dynamicBase from "astro-plugin-dynamic-base"
import files from "astro-plugin-files"
import { defineConfig } from "astro/config"
import unfonts from "unplugin-fonts/astro"
import { loadEnv } from "vite"

const { PUBLIC_DIRECTUS_URL } = loadEnv(process.env.NODE_ENV as string, process.cwd(), "") as {
  PUBLIC_DIRECTUS_URL: string
}
const cmsOrigin = new URL(PUBLIC_DIRECTUS_URL).hostname

// https://astro.build/config
export default defineConfig({
  site: "https://info.etherna.io",
  image: {
    domains: [cmsOrigin],
  },
  integrations: [
    react(),
    files(),
    dynamicBase(),
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
  },
})
