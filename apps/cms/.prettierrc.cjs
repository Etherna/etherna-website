/** @type {import('prettier').Config} */
module.exports = {
  htmlWhitespaceSensitivity: "ignore",
  singleQuote: false,
  semi: false,
  useTabs: false,
  printWidth: 100,
  importOrder: [
    "<THIRD_PARTY_MODULES>",
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
