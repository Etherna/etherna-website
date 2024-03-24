const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/browser",
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
  overrides: [
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
      plugins: ["@typescript-eslint"],
      extends: ["plugin:vue/vue3-recommended", "custom"],
      rules: {
        "@typescript-eslint/consistent-type-imports": "warn",
        // Require empty line between certain statements
        "padding-line-between-statements": [
          "warn",
          {
            blankLine: "always",
            prev: [
              "block",
              "block-like",
              "cjs-export",
              "class",
              "export",
              "import",
              "multiline-block-like",
              "multiline-const",
              "multiline-expression",
              "multiline-let",
              "multiline-var",
            ],
            next: "*",
          },
          {
            blankLine: "always",
            prev: ["const", "let"],
            next: [
              "block",
              "block-like",
              "cjs-export",
              "class",
              "export",
              "import",
            ],
          },
          {
            blankLine: "always",
            prev: "*",
            next: [
              "multiline-block-like",
              "multiline-const",
              "multiline-expression",
              "multiline-let",
              "multiline-var",
            ],
          },
          {
            blankLine: "any",
            prev: ["export", "import"],
            next: ["export", "import"],
          },
        ],
        // Same ordering of component tags everywhere
        "vue/component-tags-order": [
          "error",
          {
            order: ["template", "script", "style"],
          },
        ],
        // Require empty line between component tags
        "vue/padding-line-between-blocks": "error",
        // Allow single word component names ("Example" instead of "MyExample")
        "vue/multi-word-component-names": "off",
        // Don't require default value for props that are not marked as required
        "vue/require-default-prop": "off",
      },
    },
  ],
};
