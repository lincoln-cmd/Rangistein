// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

// https://astro.build/config
export default defineConfig({
  site: 'https://rangistein.pages.dev',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeMathjax, {
      tex: {
        packages: { '[+]': ['mhchem'] },
      },
    }]],
  },
});