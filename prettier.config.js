/** @type {import('prettier').Config & import('@ianvs/prettier-plugin-sort-imports').PluginConfig} */
export default {
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
