import eslintPluginAstro from "eslint-plugin-astro"

import baseConfig from "./base.js"

/** @type {import("eslint").Linter.Configf[]} */
export default [
  ...baseConfig,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      globals: {
        React: true,
        JSX: true,
      },
    },
    rules: {},
  },
]
