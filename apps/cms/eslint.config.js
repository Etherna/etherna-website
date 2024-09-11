import next from "eslint-config-custom/next.js"

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
  ...next,
]
