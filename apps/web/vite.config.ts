/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    outDir: "build",
    cssCodeSplit: false,
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  plugins: [tsconfigPaths(), svgrPlugin(), react()],
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser"
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.tsx"
  }
});
