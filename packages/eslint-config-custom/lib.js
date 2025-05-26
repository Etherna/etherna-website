// @ts-check

import baseConfig from "./base.js"
import tseslint from "typescript-eslint"

export default tseslint.config(
  ...baseConfig,
  {
    rules: {},
  },
)
