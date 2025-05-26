import lib from "eslint-config-custom/lib.js"

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    ignores: ["**/*.js"],
  },
  ...lib,
]
