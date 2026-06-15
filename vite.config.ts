import { defineConfig } from "vite";

// 纯静态 SPA。base 用相对路径，方便部署到任意子路径（GitHub Pages / Cloudflare / Vercel 皆可）。
// JSX 设置（react-jsx + jsxImportSource: preact）由 tsconfig 提供，Vite/esbuild 自动读取。
export default defineConfig({
  base: "./",
  build: {
    target: "es2022",
    sourcemap: false,
  },
});
