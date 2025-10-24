import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-explicit-any": ["off"],
      "no-undef": "off",
      "@typescript-eslint/key-spacing": "off",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      ".husky/**",
    ],
  },
];

export default eslintConfig;
