import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  root: "apps/vue",
  base: "./",
  plugins: [vue()],
  build: {
    outDir: "../../dist/vue",
    emptyOutDir: true,
  },
});
