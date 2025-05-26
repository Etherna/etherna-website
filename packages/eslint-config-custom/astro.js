// @ts-check

import eslintPluginAstro from "eslint-plugin-astro"
import tseslint from "typescript-eslint"

import baseConfig from "./base.js"

export default tseslint.config(
  {
    ignores: ['**/.astro',],
  },
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
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  },
)