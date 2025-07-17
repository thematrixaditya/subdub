import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], rules: {
      "quotes": ["error", "double"]
    },
  },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  {
    files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"], rules: {
      "quotes": ["error", "double"]
    },
  },
  {
    files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"], rules: {
      "quotes": ["error", "double"]
    },
  },
  {
    files: ["**/*.json5"], plugins: { json }, language: "json/json5", extends: ["json/recommended"], rules: {
      "quotes": ["error", "double"]
    },
  },
  {
    files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"], rules: {
      "quotes": ["error", "double"]
    },
  },
  {
    files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"], rules: {
      "quotes": ["error", "double"]
    },
  },
]);
