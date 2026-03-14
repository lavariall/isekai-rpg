import jsdoc from "eslint-plugin-jsdoc";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["src/**/*.ts"],
    plugins: {
      jsdoc: jsdoc,
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    rules: {
      "jsdoc/require-jsdoc": [
        "error",
        {
          "publicOnly": true,
          "require": {
            "MethodDefinition": true,
            "ClassDeclaration": true
          }
        }
      ],
      "jsdoc/require-description": "warn"
    },
  },
];
