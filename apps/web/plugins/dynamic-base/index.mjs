// @ts-check

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

/**
 * @returns {import('astro').AstroIntegration}
 */
const dynamicBase = () => ({
  name: "dynamic-base",
  hooks: {
    // "astro:config:setup": ({ config, updateConfig }) => {
    //   if (process.env.NODE_ENV === "production") {
    //     updateConfig({
    //       ...config,
    //       base: "/__dynamic_base__/",
    //     })
    //   }
    // },
    "astro:build:done": ({ dir, pages }) => {
      console.info("\x1b[32mdynamic-base:\x1b[0m Injecting dynamic load script... ")

      const __filename = fileURLToPath(import.meta.url)
      const __dirname = path.dirname(__filename)

      const scriptHead = fs.readFileSync(path.resolve(__dirname, "dynamic-base-head.html"), "utf8")
      const scriptBody = fs.readFileSync(path.resolve(__dirname, "dynamic-base-body.html"), "utf8")

      for (const page of pages) {
        const pagePath = path.join(dir.pathname, `${page.pathname}index.html`)
        const pageContent = fs.readFileSync(pagePath, "utf8")
        const newPageContent = pageContent
          .replace("</head>", `${scriptHead}</head>`)
          .replace("</body>", `${scriptBody}</body>`)
        fs.writeFileSync(pagePath, newPageContent, "utf8")
      }
    },
  },
})

export default dynamicBase
