/** @type {import('prettier').Config} */
module.exports = {
  htmlWhitespaceSensitivity: "ignore",
  singleQuote: false,
  semi: false,
  useTabs: false,
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
  tailwindConfig: "./tailwind.config.ts",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
}
