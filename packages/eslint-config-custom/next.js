import { fixupConfigRules } from "@eslint/compat"
import next from "@next/eslint-plugin-next"

import baseConfig from "./base.js"
import { flatCompat } from "./compat.js"

const nextConfig = /** @type {import("eslint").Linter.Config[]} */ (
  fixupConfigRules(
    /** @type {import("@eslint/compat").FixupConfigArray} */
    (flatCompat.config(next.configs["core-web-vitals"])),
  )
)

/** @type {import("eslint").Linter.Configf[]} */
export default [
  ...baseConfig,
  ...nextConfig,
  {
    languageOptions: {
      globals: {
        React: true,
        JSX: true,
      },
    },
    rules: {},
  },
]
