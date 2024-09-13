/** @type {import('prettier').Config} */
module.exports = {
  htmlWhitespaceSensitivity: "ignore",
  printWidth: 100,
  singleQuote: false,
  semi: false,
  useTabs: false,
  bracketSpacing: true,
  proseWrap: "always",
  arrowParens: "always",
  trailingComma: "all",
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "",
    "^[./]",
    "^@/",
    "",
    "<TYPES>^[./]",
    "<TYPES>^@/",
    "<TYPES>",
  ],
  importOrderTypeScriptVersion: "5.0.0",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
}
