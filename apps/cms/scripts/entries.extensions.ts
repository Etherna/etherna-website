import path from "node:path"
import { API_EXTENSION_TYPES, APP_SHARED_DEPS } from "@directus/extensions"
import { API_SHARED_DEPS } from "./externals"
import { API_PLUGINS, APP_PLUGINS } from "./plugins"
import { getBundlesEntries, getExtensionsBaseFolder } from "./utils"

import type { RollupOptions } from "rollup"

export function getExtensionsEntries() {
  const entries = getBundlesEntries().filter((entry) => entry.type !== "migrations")
  const folder = getExtensionsBaseFolder()
  const extensionsEntries = entries.map((entry) => {
    const name = path.basename(path.dirname(entry.path))
    const isApiExtension = (API_EXTENSION_TYPES as readonly string[]).includes(entry.type)

    return {
      type: entry.type,
      name,
      rollupOptions: {
        input: entry.path,
        output: {
          file: path.resolve(`${folder}/${entry.type}s/${name}/${entry.output}.js`),
          format: isApiExtension ? "cjs" : "es",
          exports: isApiExtension ? "default" : undefined,
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
