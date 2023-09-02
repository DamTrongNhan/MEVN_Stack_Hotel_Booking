import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3001,
    proxy: {
      "/user": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
      "/room": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
      "/booking": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
      "/photos": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
    },
  },
});
