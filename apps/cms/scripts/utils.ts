import fs from "node:fs"
import path from "node:path"
import {
  API_EXTENSION_TYPES,
  APP_EXTENSION_TYPES,
  EXTENSION_PKG_KEY,
  ExtensionType,
  HYBRID_EXTENSION_TYPES,
} from "@directus/extensions"
import * as glob from "glob"

interface HybridSource {
  api: string
  app: string
}

type HybridSourceType = keyof HybridSource

export function getExtensionsBaseFolder() {
  return process.env.EXTENSIONS_PATH || "./extensions"
}

export function getMigrationsFolder() {
  return path.resolve(getExtensionsBaseFolder(), "migrations")
}

export function getExtensionsFolders() {
  const extensionsFolders = [...API_EXTENSION_TYPES, ...APP_EXTENSION_TYPES].map((type) =>
    path.resolve(getExtensionsBaseFolder(), type.replace(/s?$/, "s")),
  )

  return extensionsFolders
}

export function deleteFolders(foldersToRemove: string[]) {
  foldersToRemove.forEach((folder) => {
    if (fs.existsSync(folder)) {
      fs.rmSync(folder, { recursive: true })
    }
  })
}

export function getBundlesEntries() {
  const bundles = glob.sync("src/**/package.json")

  return bundles.flatMap((bundle) => {
    const bundlePackageJson = JSON.parse(fs.readFileSync(bundle, "utf-8")) as {
      [EXTENSION_PKG_KEY]: {
        entries: {
          type: ExtensionType | "migrations"
          name: string
          source: string | HybridSource
        }[]
      }
    }

    const entries = bundlePackageJson[EXTENSION_PKG_KEY].entries.flatMap(
      ({ type, name, source }) => {
        const bundlePaths =
          typeof source === "string"
            ? [{ output: "index", path: path.resolve(path.dirname(bundle), source) }]
            : Object.entries(source).map(([key, src]) => ({
                path: path.resolve(path.dirname(bundle), src),
                output: key,
              }))
        return bundlePaths.flatMap(({ path, output }) => ({
          type,
          name,
          path,
          output,
        }))
      },
    )

    return entries
  })
}
