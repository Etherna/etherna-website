/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 100,
  semi: false,
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
