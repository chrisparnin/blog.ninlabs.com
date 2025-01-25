import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.ninlabs.com",
  build: {
    assets: 'media',
  },
  vite: {
    define: {
      'urls.media': JSON.stringify('/media'),
    },
  },
  integrations: [tailwind({
    applyBaseStyles: false,
  }), mdx(), sitemap(), icon()],
});