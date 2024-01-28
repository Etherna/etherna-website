import fs from "node:fs"
import path from "node:path"
import {
  API_EXTENSION_TYPES,
  APP_EXTENSION_TYPES,
  APP_SHARED_DEPS,
  API_SHARED_DEPS as DIRECTUS_SHARED_DEPS,
  EXTENSION_PKG_KEY,
  HYBRID_EXTENSION_TYPES,
} from "@directus/extensions"
import alias from "@rollup/plugin-alias"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import terser from "@rollup/plugin-terser"
import typescript from "@rollup/plugin-typescript"
import vue from "@vitejs/plugin-vue"
import * as glob from "glob"
import esbuild from "rollup-plugin-esbuild"
import styles from "rollup-plugin-styles"
import svg from "rollup-plugin-svg-import"

import type { NESTED_EXTENSION_TYPES } from "@directus/extensions"
import type { RollupOptions } from "rollup"

// eslint-disable-next-line turbo/no-undeclared-env-vars
const dev = process.env.ROLLUP_WATCH === "true"
const migrationsOnly = process.argv.includes("--migrationsOnly")

// Clean extensions
const migrationsFolders = ["extensions/migrations"]
const extensionsFolders = [...API_EXTENSION_TYPES, ...APP_EXTENSION_TYPES].map(
  (type) => `extensions/${type.replace(/s?$/, "s")}`,
)

const foldersToRemove = migrationsOnly ? migrationsFolders : extensionsFolders
foldersToRemove.forEach((folder) => {
  if (fs.existsSync(folder)) {
    fs.rmSync(folder, { recursive: true })
  }
})

const APP_PLUGINS = [
  vue({ isProduction: true }),
  styles(),
  esbuild(),
  alias({
    // This fixes symlinks issue: https://github.com/vitejs/vite/issues/11657
    entries: [
      {
        find: "slate-blocks/textual",
        replacement: "../../packages/slate-blocks/textual/index.ts",
      },
      {
        find: "slate-blocks/ui",
        replacement: "../../packages/slate-blocks/ui/index.ts",
      },
    ],
  }),
  nodeResolve({ browser: true }),
  commonjs({ esmExternals: true }),
  json(),
  svg({ stringify: true }),
  replace({
    values: {
      "process.env.NODE_ENV": JSON.stringify(
        dev ? "development" : "production",
      ),
    },
    preventAssignment: true,
  }),
  !dev ? terser() : (undefined as any),
]

const API_PLUGINS = [
  esbuild(),
  nodeResolve({ preferBuiltins: true }),
  commonjs(),
  json(),
  !dev ? terser() : (undefined as any),
]

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8")) as {
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

const API_SHARED_DEPS = [
  ...DIRECTUS_SHARED_DEPS,
  ...Object.keys(packageJson.dependencies),
].filter(dep => dep !== "@directus/extensions" && dep !== "@directus/extensions-sdk")

const bundles = glob.sync("src/**/package.json")

type ExtensionType = (typeof NESTED_EXTENSION_TYPES)[number] | "migrations"

const rollupEntries = bundles
  .flatMap((bundle) => {
    interface HybridSource {
      api: string
      app: string
    }
    type HybridSourceType = keyof HybridSource
    const bundlePackageJson = JSON.parse(fs.readFileSync(bundle, "utf-8")) as {
      [EXTENSION_PKG_KEY]: {
        entries: {
          type: ExtensionType
          name: string
          source: string | HybridSource
        }[]
      }
    }
    return bundlePackageJson[EXTENSION_PKG_KEY].entries.flatMap(
      ({ type, name, source }) => {
        if (migrationsOnly && type !== "migrations") {
          return false as unknown as RollupOptions
        }
        if (!migrationsOnly && type === "migrations") {
          return false as unknown as RollupOptions
        }

        const entries =
          // eslint-disable-next-line no-nested-ternary
          typeof source === "string"
            ? type === "migrations"
              ? glob
                  .sync(`${path.resolve(path.dirname(bundle), source)}/*.ts`)
                  .map((entry) => ({
                    output: path.basename(entry, ".ts"),
                    entry: path.relative(path.dirname(bundle), entry),
                  }))
              : [{ output: "index" as const, entry: source }]
            : // eslint-disable-next-line @typescript-eslint/no-shadow
              Object.entries(source).map(([type, entry]) => ({
                output: type as HybridSourceType,
                entry: entry as string,
              }))

        return entries.map(({ output, entry }) => {
          const input = path.resolve(path.dirname(bundle), entry)
          const isApiExtension = API_EXTENSION_TYPES.includes(
            type as (typeof API_EXTENSION_TYPES)[number],
          )
          const isAppExtension = APP_EXTENSION_TYPES.includes(
            type as (typeof APP_EXTENSION_TYPES)[number],
          )
          const isHybridExtension = HYBRID_EXTENSION_TYPES.includes(
            type as (typeof HYBRID_EXTENSION_TYPES)[number],
          )
          const isMigrations = type === "migrations"

          if (
            !isApiExtension &&
            !isAppExtension &&
            !isHybridExtension &&
            !isMigrations
          ) {
            return false as unknown as RollupOptions
          }

          const external =
            isApiExtension || isMigrations ? API_SHARED_DEPS : APP_SHARED_DEPS
          const plugins =
            isApiExtension || isMigrations ? API_PLUGINS : APP_PLUGINS
          const format = isApiExtension || isMigrations ? "cjs" : "es"
          const exports = isApiExtension || isMigrations ? "default" : undefined

          return {
            input,
            output: {
              file: `extensions/${type.replace(/s?$/, "s")}/${
                name ? `${name}/` : ``
              }${output}.js`,
              format,
              exports,
            },
            external,
            plugins,
          } satisfies RollupOptions
        })
      },
    )
  })
  .filter(Boolean)

export default rollupEntries
