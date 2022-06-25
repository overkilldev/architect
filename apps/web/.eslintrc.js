const path = require("path");

module.exports = {
  extends: ["../../.eslintrc"],
  rules: {},
  overrides: [
    {
      files: "**/*.+(ts|tsx)",
      parserOptions: {
        project: "./tsconfig.json"
      },
      rules: {},
      settings: {
        "import/resolver": {
          node: {
            paths: [path.resolve(__dirname, "src")]
          }
        }
      }
    }
  ]
};
