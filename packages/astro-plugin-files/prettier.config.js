/** @type {import('prettier').Config & import('@ianvs/prettier-plugin-sort-imports').PluginConfig} */
export default {
  singleQuote: false,
  semi: false,
  useTabs: false,
  proseWrap: "always",
  arrowParens: "avoid",
  bracketSpacing: true,
  trailingComma: "es5",
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "",
    "^[./]",
    "^@/",
    "",
    "<TYPES>^[./]",
    "<TYPES>",
  ],
  importOrderTypeScriptVersion: "5.0.0",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
}
