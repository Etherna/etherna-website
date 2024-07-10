import fs from "node:fs"
import path from "node:path"

import baseBody from "./dynamic-base-body.html"
import baseHead from "./dynamic-base-head.html"

import type { AstroIntegration } from "astro"

export default function dynamicBase(): AstroIntegration {
  return {
    name: "astro-plugin-dynamic-base",
    hooks: {
      "astro:build:done": ({ dir, pages }) => {
        console.info(
          "\x1b[32mdynamic-base:\x1b[0m Injecting dynamic load script... "
        )

        for (const page of pages) {
          const pagePath = path.join(dir.pathname, `${page.pathname}index.html`)
          const pageContent = fs.readFileSync(pagePath, "utf8")
          const newPageContent = pageContent
            .replace("</head>", `${baseHead}</head>`)
            .replace("</body>", `${baseBody}</body>`)
          fs.writeFileSync(pagePath, newPageContent, "utf8")
        }
      },
    },
  }
}
