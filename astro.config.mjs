import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import compress from 'astro-compress';
import icon from 'astro-icon';
import tasks from './src/utils/tasks';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin } from './src/utils/frontmatter.mjs';

import { ANALYTICS, SITE } from './src/utils/config.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const whenExternalScripts = (items = []) =>
  ANALYTICS.vendors.googleAnalytics.id && ANALYTICS.vendors.googleAnalytics.partytown
    ? Array.isArray(items)
      ? items.map((item) => item())
      : [items()]
    : [];

export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',

  output: 'static',
  redirects: {
    '/patent': '/patents',
    '/tag': '/topics',
    '/market-potential': '/category/market-potential',
    '/patent-landscape/': '/category/patent-landscape',
    '/blogs': '/category/blogs',
    '/patent-summaries': '/category/patent-summaries',
    '/use-cases': '/category/use-cases',
    '/category': {
      status: 302,
      destination: '/article'
    }
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    // sitemap(
    //   {
    //     filter: (page) => 
    //     page !== 'https://www.intellectualfrontiers.com/landing/sales' &&
    //     page !== 'https://www.intellectualfrontiers.com/blog/' &&
    //     page !== 'https://www.intellectualfrontiers.com/click-through' &&
    //     page !== 'https://www.intellectualfrontiers.com/homes/mobile-app' &&
    //     page !== 'https://www.intellectualfrontiers.com/homes/personal' &&
    //     page !== 'https://www.intellectualfrontiers.com/homes/saas' &&
    //     page !== 'https://www.intellectualfrontiers.com/homes/startup' &&
    //     page !== 'https://www.intellectualfrontiers.com/landing/click-through' &&
    //     page !== 'https://www.intellectualfrontiers.com/landing/lead-generation' &&
    //     page !== 'https://www.intellectualfrontiers.com/landing/pre-launch' &&
    //     page !== 'https://www.intellectualfrontiers.com/landing/product' &&
    //     page !== 'https://www.intellectualfrontiers.com/landing/subscription' &&
    //     page !== 'https://www.intellectualfrontiers.com/pricing' &&
    //     page !== 'https://www.intellectualfrontiers.com/resources' &&
    //     page !== 'https://www.intellectualfrontiers.com/services',
    //   }
    // ),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    tasks(),

    compress({
      CSS: true,
      HTML: false,
      Image: false,
      JavaScript: true,
      SVG: true,
      Logger: 1,
    }),
  ],

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
