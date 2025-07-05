import astro from "eslint-config-custom/astro.js"

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
  ...astro,
]
