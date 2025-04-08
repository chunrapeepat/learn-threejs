import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "./",
  server: {
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  appType: "mpa",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        lesson1: path.resolve(__dirname, "src/lesson1-basics/index.html"),
      },
    },
  },
  publicDir: path.resolve(__dirname, "./public"),
});
