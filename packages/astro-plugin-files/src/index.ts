import fs from "node:fs"

import { fileService } from "./service"
import { hashFileName, joinPaths, loadRemoteFile } from "./utils"

import type { FileOptions } from "./service"
import type { AstroConfig, AstroIntegration } from "astro"

// eslint-disable-next-line import/no-default-export
export default function files(): AstroIntegration {
  let astroConfig: AstroConfig | undefined

  return {
    name: "astro-plugin-files",
    hooks: {
      "astro:config:setup": ({ config, command, injectRoute }) => {
        astroConfig = config

        globalThis.astroFile = {}

        if (command === "dev") {
          injectRoute({
            pattern: "/_file",
            entrypoint: "./node_modules/astro-plugin-files/dist/endpoint.js",
            prerender: false,
          })
        }
      },
      "astro:build:start": () => {
        globalThis.astroFile.addStaticFile = options => {
          const finalFilePath = hashFileName(options)

          const url = joinPaths(
            astroConfig?.build.assetsPrefix ?? "_astro",
            finalFilePath
          )

          globalThis.astroFile.staticFiles ??= new Map()
          globalThis.astroFile.staticFiles.set(options.src, {
            url,
            filename: options.filename,
          })

          return encodeURI(url)
        }
      },
      "astro:build:done": async ({ dir }) => {
        if (!globalThis.astroFile.staticFiles) return

        const staticFilesEntries = Array.from(
          globalThis.astroFile.staticFiles.entries()
        )

        await Promise.allSettled(
          staticFilesEntries.map(async ([src, fileEntry]) => {
            const fileData = await loadRemoteFile(src)

            if (!fileData) return

            const copyPath = joinPaths(dir.pathname, fileEntry.url)

            await fs.promises.writeFile(copyPath, fileData.data)
          })
        )
      },
    },
  }
}

export function getFile(options: FileOptions) {
  if (globalThis.astroFile.addStaticFile) {
    return globalThis.astroFile.addStaticFile(options)
  }

  // injected route url for preview in dev mode
  return fileService.getUrl(options)
}
