import chalk from "chalk"
import { rollup, watch } from "rollup"

import "dotenv/config"

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
          console.log(chalk.gray(`${endId} - `) + chalk.green("✅ Compiled succesfully"))
          break
        case "ERROR":
          const errorEntry = findEntry(data.error.watchFiles![0]!)
          const errorId = `${errorEntry.type}:${errorEntry.name}`
          console.log(chalk.gray(`${errorId} - `) + chalk.red(data.error.message))
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

          console.log(chalk.gray(`${id} - `) + chalk.green("✅ Compiled succesfully"))
        } catch (error: any) {
          console.log(chalk.gray(`${id} - `) + chalk.red(error.message))
        }
      }),
    )
  }
}

run()
