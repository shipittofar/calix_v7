import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Colours come only from the palette tokens (docs/design-system.md §1).
    files: ["**/*.{ts,tsx}"],
    ignores: ["lib/palette.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/#[0-9a-fA-F]{3,8}\\b/]",
          message: "Use CALIX palette tokens instead of hex colour literals.",
        },
      ],
    },
  },
  globalIgnores([".next/**", ".next-preview/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
