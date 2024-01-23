const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
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
    "eslint-comments/require-description": "off",
    "import/order": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-default-export": "off",
    // No console & debugger statements in production
    "no-console":
      process.env.NODE_ENV === "production"
        ? ["error", { allow: ["info", "warn", "error", "debug", "table"] }]
        : "off",
    "no-await-in-loop": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
};
