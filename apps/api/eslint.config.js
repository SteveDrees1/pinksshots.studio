const js = require("@eslint/js");

module.exports = [
  { ignores: ["dist/**", "node_modules/**", "src/db/migrations/**"] },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { process: "readonly", console: "readonly", Buffer: "readonly" },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
