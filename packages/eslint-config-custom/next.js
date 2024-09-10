const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    "@vercel/style-guide/eslint/typescript",
    "eslint-config-turbo",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  rules: {
    "import/no-default-export": "off",
    // No console & debugger statements in production
    "no-console":
      process.env.NODE_ENV === "production"
        ? ["error", { allow: ["info", "warn", "error", "debug", "table"] }]
        : "off",
    "no-debugger": process.env.NODE_ENV !== "development" ? "error" : "off",
    // Require empty line between class members
    "lines-between-class-members": [
      "warn",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "import/order": "off",
    // Require brace style for multi-line control statements
    curly: ["warn", "multi-line"],
    // Force import type statements for type-only imports
    "@typescript-eslint/consistent-type-imports": ["error" , { fixStyle: "separate-type-imports" }],
    // Allow ts-directive comments (used to suppress TypeScript compiler errors)
    "@typescript-eslint/ban-ts-comment": "off",
    // Allow ts-directive comments (used to suppress TypeScript compiler errors)
    "@typescript-eslint/ban-types": "off",
    // Allow usage of require statements (consider enabling this rule later on)
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-empty-interface": "off",
    "eslint-comments/require-description": "off",
  },
};
