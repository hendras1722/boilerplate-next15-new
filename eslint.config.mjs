import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import nPlugin from "eslint-plugin-n";
import promisePlugin from "eslint-plugin-promise";
import unicornPlugin from "eslint-plugin-unicorn";
import alignAssignments from "eslint-plugin-align-assignments";
import globals from "globals";

// 🔹 Import config prettier terbaru untuk Flat Config
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

export default tseslint.config(
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", ".husky/**"],
  },

  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
      unicorn: unicornPlugin,
      "align-assignments": alignAssignments,
      prettier: pluginPrettier, // plugin prettier
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/key-spacing": "off",
      "block-spacing": ["error", "always"],
      "react-hooks/exhaustive-deps": "off",
      "no-undef": "off",
      "align-assignments/align-assignments": "warn",
    },
  },

  prettier
);
