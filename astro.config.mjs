// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code"

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    expressiveCode({
      themes: ['solarized-dark'],
    }),
    mdx()
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
