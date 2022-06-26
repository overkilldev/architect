import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

export const dist = "dist/bundle";

export const bundleConfig = {
  input: "src/index.ts",
  output: [
    {
      file: `${dist}.cjs.js`,
      format: "cjs",
      sourcemap: true
    },
    {
      file: `${dist}.esm.js`,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    esbuild({
      sourceMap: true,
      target: "es2017",
      minify: process.env.NODE_ENV === "production",
      tsconfig: "./tsconfig.json" // default
    })
  ]
};

export const declarationsConfig = {
  input: "src/index.ts",
  output: [
    {
      file: `${dist}.d.ts`,
      format: "es"
    }
  ],
  plugins: [dts()]
};

export default [bundleConfig, declarationsConfig];
