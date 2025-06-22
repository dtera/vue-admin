import { defineConfig } from "@vben/vite-config";

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          "/api/all7b": {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
            target: "http://localhost:8080",
            ws: true
          },
          "/api": {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
            target: "http://localhost:5320/api",
            ws: true
          }
        }
      }
    }
  };
});
