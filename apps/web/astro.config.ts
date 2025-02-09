import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import matomo from "astro-matomo"
import dynamicBase from "astro-plugin-dynamic-base"
import files from "astro-plugin-files"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import unfonts from "unplugin-fonts/astro"
import { loadEnv } from "vite"
import svgr from "vite-plugin-svgr"

const localEnv = loadEnv(process.env.NODE_ENV as string, process.cwd(), "PUBLIC_")

const PUBLIC_PAYLOAD_URL = process.env.PUBLIC_PAYLOAD_URL || localEnv.PUBLIC_PAYLOAD_URL || ""
const PUBLIC_ANALYTICS_URL = process.env.PUBLIC_ANALYTICS_URL || localEnv.PUBLIC_ANALYTICS_URL || ""
const PUBLIC_ANALYTICS_SITE_ID =
  process.env.PUBLIC_ANALYTICS_SITE_ID || localEnv.PUBLIC_ANALYTICS_SITE_ID || ""

const cmsOrigin = new URL(PUBLIC_PAYLOAD_URL ?? "").hostname

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
    tailwind({
      applyBaseStyles: false,
    }),
    matomo({
      enabled: true,
      host: (PUBLIC_ANALYTICS_URL ?? "http://not.found").replace(/\/?$/, "/"),
      siteId: parseInt(PUBLIC_ANALYTICS_SITE_ID ?? "0"),
    }),
  ],
  vite: {
    resolve: {
      alias: [{ find: "@", replacement: resolve(dirname(fileURLToPath(import.meta.url)), "src") }],
    },
    plugins: [
      svgr({
        // svgrOptions: { exportType: "named", ref: true, svgo: false, titleProp: true },
        // include: "**/*.svg",
      }),
    ],
  },
})
