module.exports = {
  extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  env: {
    browser: true,
    es6: true
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  },
  overrides: [{
    files: "src/**/*.{ts,tsx}",
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname,
      sourceType: "module",
    },
    plugins: ["@typescript-eslint", "react"],
    rules: {
      "@typescript-eslint/semi": ["error"],
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "@typescript-eslint/no-unsafe-member-access": 0,
      "@typescript-eslint/no-unused-vars": [
          "error", { argsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/no-explicit-any": 1,
      "no-case-declarations": 0,
      "react/prop-types": 0,
       "react/react-in-jsx-scope": 0
    },
  }]
}
