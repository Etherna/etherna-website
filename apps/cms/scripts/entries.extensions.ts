import path from "node:path"
import { API_EXTENSION_TYPES, API_SHARED_DEPS, APP_SHARED_DEPS } from "@directus/extensions"
import { API_PLUGINS, APP_PLUGINS } from "./plugins"
import { getBundlesEntries, getExtensionsBaseFolder } from "./utils"

import type { RollupOptions } from "rollup"

export function getExtensionsEntries() {
  const entries = getBundlesEntries().filter((entry) => entry.type !== "migrations")
  const folder = getExtensionsBaseFolder()
  const extensionsEntries = entries.map((entry) => {
    const name = path.basename(path.dirname(entry.path))
    const isApiExtension = (API_EXTENSION_TYPES as readonly string[]).includes(entry.type)
    const format = isApiExtension ? "cjs" : "es"
    const exports = isApiExtension ? "default" : undefined
    const extension = format === "cjs" ? "cjs" : "mjs"
    const file = path.resolve(`${folder}/${name}/${entry.output}.${extension}`)

    return {
      type: entry.type,
      name,
      rollupOptions: {
        input: entry.path,
        output: {
          file,
          format,
          exports,
        },
        external: isApiExtension ? API_SHARED_DEPS : APP_SHARED_DEPS,
        plugins: isApiExtension ? API_PLUGINS : APP_PLUGINS,
        logLevel: "warn",
        onwarn: (warning, warn) => {
          if (warning.code === "CIRCULAR_DEPENDENCY") return
          if (warning.message.includes("you should resolve to an absolute path")) return
          warn(warning)
        },
      } satisfies RollupOptions,
    }
  })
  return extensionsEntries
}
