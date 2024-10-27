import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Kusini-Frontend/",
  plugins: [react()],
  build: {
    outDir: "docs",
  },
});
