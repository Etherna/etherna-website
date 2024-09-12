import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import tseslint from "typescript-eslint"

/** @type {import("eslint").Linter.Config[]} */
export default [
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  eslintConfigPrettier,
  {
    rules: {
      "no-console":
        process.env.NODE_ENV === "production"
          ? ["error", { allow: ["info", "warn", "error", "debug", "table"] }]
          : "off",
      "no-debugger": process.env.NODE_ENV !== "development" ? "error" : "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  {
    ignores: [".git", "node_modules", "dist", "build", ".next", "**/*.js"],
  },
]