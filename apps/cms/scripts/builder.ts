import { rollup, watch } from "rollup"

import "dotenv/config"

import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import nodePath from "node:path"
import { gray, green, red } from "./console"
import { getExtensionsEntries } from "./entries.extensions"
import { getMigrationsEntries } from "./entries.migrations"
import { deleteFolders, getExtensionsFolders, getMigrationsFolder } from "./utils"

const dev = process.argv.includes("--watch")
const migrationsOnly = process.argv.includes("--migrationsOnly")

const entries = migrationsOnly ? getMigrationsEntries() : getExtensionsEntries()

async function run() {
  const folders = migrationsOnly ? [getMigrationsFolder()] : getExtensionsFolders()
  deleteFolders(folders)

  if (dev) {
    const watcher = watch(entries.map((entry) => entry.rollupOptions))
    watcher.on("event", (data) => {
      const findEntry = (path: string) =>
        entries.find((entry) => entry.rollupOptions.input === path)!

      switch (data.code) {
        case "BUNDLE_END":
          const endEntry = findEntry(data.input as string)
          const endId = `${endEntry.type}:${endEntry.name}`
          console.log(gray(`${endId} - `) + green("✅ Compiled succesfully"))
          break
        case "ERROR":
          const errorEntry = findEntry(data.error.watchFiles![0]!)
          const errorId = `${errorEntry.type}:${errorEntry.name}`
          console.log(gray(`${errorId} - `) + red(data.error.message))
          break
      }
    })

    process.stdin.resume()
  } else {
    await Promise.all(
      entries.map(async (entry) => {
        const id = `${entry.type}:${entry.name}`

        try {
          const output = await rollup(entry.rollupOptions)
          output.write(entry.rollupOptions.output)

          console.log(gray(`${id} - `) + green("✅ Compiled succesfully"))
        } catch (error: any) {
          console.log(gray(`${id} - `) + red(error.message))
        }
      }),
    )
  }

  // create package jsons
  if (!migrationsOnly) {
    await Promise.all(
      entries.map((entry) => {
        const outputFile = entry.rollupOptions.output.file
        const outputFolder = nodePath.dirname(outputFile)
        const packageJson = {
          name: `directus-extension-${entry.name}`,
          version: "1.0.0",
          type: "module",
          "directus:extension": {
            type: entry.type,
            path: `index.${entry.rollupOptions.output.format === "cjs" ? "cjs" : "mjs"}`,
            source: `index.${entry.rollupOptions.output.format === "cjs" ? "cjs" : "mjs"}`,
            host: "^11.0.0",
          },
        }

        if (!existsSync(outputFolder)) {
          mkdirSync(outputFolder, { recursive: true })
        }

        writeFileSync(
          nodePath.resolve(outputFolder, "package.json"),
          JSON.stringify(packageJson, null, 2),
        )
      }),
    )
  }
}

run()
