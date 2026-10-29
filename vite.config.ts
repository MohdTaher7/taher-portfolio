import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// `npm run build` → normal code-split static site (deploy anywhere).
// `npm run build:artifact` → one self-contained HTML file for the Claude artifact.
export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: [react(), ...(mode === "artifact" ? [viteSingleFile()] : [])],
  build: {
    outDir: mode === "artifact" ? "dist-artifact" : "dist",
    assetsInlineLimit: mode === "artifact" ? 100_000_000 : 4096,
    copyPublicDir: mode !== "artifact",
  },
}));
