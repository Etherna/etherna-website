import alias from "@rollup/plugin-alias"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import terser from "@rollup/plugin-terser"
import vue from "@vitejs/plugin-vue"
import esbuild from "rollup-plugin-esbuild"
import styles from "rollup-plugin-styles"
import svg from "rollup-plugin-svg-import"

const dev = process.env.ROLLUP_WATCH === "true"

export const APP_PLUGINS = [
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

export const API_PLUGINS = [
  esbuild(),
  nodeResolve({ preferBuiltins: true }),
  commonjs(),
  json(),
  !dev ? terser() : (undefined as any),
]
