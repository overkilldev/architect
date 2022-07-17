/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import prismjs from "vite-plugin-prismjs";
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
  plugins: [
    tsconfigPaths(),
    svgrPlugin(),
    react(),
    prismjs({
      languages: [
        "aspnet",
        "c",
        "csharp",
        "cs",
        "dotnet",
        "cpp",
        "dart",
        "docker",
        "dockerfile",
        "go",
        "java",
        "json",
        "kotlin",
        "kt",
        "kts",
        "markdown",
        "md",
        "objectivec",
        "objc",
        "php",
        "python",
        "py",
        "jsx",
        "tsx",
        "ruby",
        "rb",
        "rust",
        "sass",
        "scss",
        "scala",
        "solidity",
        "sol",
        "swift",
        "toml",
        "typescript",
        "ts",
        "yaml",
        "yml",
        "zig"
      ]
    })
  ],
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
