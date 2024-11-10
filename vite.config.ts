/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-tests.ts",
    restoreMocks: true,
  },
});
