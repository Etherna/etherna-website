/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions& import('@ianvs/prettier-plugin-sort-imports').PluginConfig} */
export default {
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
    "",
    "^react",
    "^next",
    "<THIRD_PARTY_MODULES>",
    "",
    "^lucide-react",
    "^@heroicons",
    "^@/assets",
    "^@/components/assets",
    "",
    "^[./]",
    "^@/",
    "",
    "<TYPES>^[./]",
    "<TYPES>^react",
    "<TYPES>^next",
    "<TYPES>^@/",
    "<TYPES>",
  ],
  importOrderTypeScriptVersion: "5.0.0",
  tailwindConfig: "./tailwind.config.ts",
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
}
