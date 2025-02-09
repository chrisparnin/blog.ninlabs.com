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
  redirects: {
    '/2013/01/programmer-interrupted': '/blog/programmer-interrupted',
    '/2012/05/crowd-documentation': '/blog/2012-05-25-crowd-documentation',
    '/2013/03/api-documentation/': '/blog/api-documentation'
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