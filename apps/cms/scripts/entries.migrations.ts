import path from "node:path"
import * as glob from "glob"
import { API_SHARED_DEPS } from "./externals"
import { API_PLUGINS } from "./plugins"
import { getBundlesEntries, getMigrationsFolder } from "./utils"

import type { RollupOptions } from "rollup"

export function getMigrationsEntries() {
  const entries = getBundlesEntries().filter((entry) => entry.type === "migrations")
  const migrationsPaths = entries.flatMap((entry) => glob.sync(`${entry.path}/*.ts`))
  const folder = getMigrationsFolder()
  const migrationsEntries = migrationsPaths.map((input) => {
    const type = "migrations"
    const name = path.basename(input, ".ts")

    return {
      type,
      name,
      rollupOptions: {
        input,
        output: {
          file: `${folder}/${name}.cjs`,
          format: "cjs",
          exports: "default",
        },
        external: API_SHARED_DEPS,
        plugins: API_PLUGINS,
      } satisfies RollupOptions,
    }
  })
  return migrationsEntries
}
