import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/careercompassai/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 43817,
    strictPort: true,
  },
  preview: {
    port: 43817,
    strictPort: true,
  },
}));
