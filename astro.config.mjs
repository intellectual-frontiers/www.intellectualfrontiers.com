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
import pageInsight from "astro-page-insight";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const whenExternalScripts = (items = []) => ANALYTICS.vendors.googleAnalytics.id && ANALYTICS.vendors.googleAnalytics.partytown ? Array.isArray(items) ? items.map(item => item()) : [items()] : [];

// https://astro.build/config
export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  output: 'static',
  redirects: {
    '/patent': '/patents',
    '/category/patents': '/patents',
    '/tag': '/topics',
    '/market-potential': '/category/market-potential',
    '/patent-landscape/': '/category/patent-landscape',
    '/blogs': '/category/blogs',
    '/patent-summaries': '/category/patent-summaries',
    '/use-cases': '/category/use-cases',
    '/use-cases/revolutionizing-healthcare-the-future-of-medical-devices-operation-automation': '/market-potential/revolutionizing-healthcare-the-future-of-medical-devices-operation-automation',
    '/use-cases/revolutionizing-healthcare-the-future-of-medical-devices-operation-automation/': '/market-potential/revolutionizing-healthcare-the-future-of-medical-devices-operation-automation',
    '/use-cases/digital-payment-systems-evolving-markets-and-emerging-trends': '/market-potential/digital-payment-systems-evolving-markets-and-emerging-trends',
    '/use-cases/digital-payment-systems-evolving-markets-and-emerging-trends/': '/market-potential/digital-payment-systems-evolving-markets-and-emerging-trends',
    '/patent-summaries/the-complexities-of-data-management-in-contemporary-healthcare': '/patent-summaries/the-complexities-of-data-management-in-contemporary-healthcare-solutions',
    '/patent-summaries/the-complexities-of-data-management-in-contemporary-healthcare/': '/patent-summaries/the-complexities-of-data-management-in-contemporary-healthcare-solutions',
    '/patent-summaries/tasks-scheduling-based-on-triggering-event-and-work-lists-management': '/patents/tasks-scheduling-based-on-triggering-event-and-work-lists-management',
    '/patent-summaries/tasks-scheduling-based-on-triggering-event-and-work-lists-management/': '/patents/tasks-scheduling-based-on-triggering-event-and-work-lists-management',
    '/topics/us10489830b2': '/patents/aggregation-of-rating-indicators',
    '/topics/us9846896b2': '/patents/aggregation-of-rating-indicators-us9846896b2',
    "/topics/us11270263b2": "/patents/blockchain-based-crowdsourced-initiatives-tracking-system",
    "/topics/us11475441b2": "/patents/blockchain-enabled-service-delivery-evidence-system",
    "/topics/us10984913b2": "/patents/blockchain-system-for-natural-language-processing",
    "/topics/us11561884b2": "/patents/computer-controlled-metrics-and-task-lists-management-us11561884b2",
    "/topics/us11651459b2": "/patents/computer-controlled-precision-education-and-training-us11651459b2",
    "/topics/us20230245255a1": "/patents/computer-controlled-precision-education-and-training-us2023245255a1",
    "/topics/us11423500b2": "/patents/computer-controlled-precision-education-and-training",
    "/topics/us11888597b2": "/patents/computer-executable-and-traceable-metric-queues-system-us11888597b2",
    "/topics/us11388077b2": "/patents/computer-executable-and-traceable-metric-queues-system",
    "/topics/us7039898b2": "/patents/computer-system-for-performing-reusable-software-application-development-from-a-set-of-declarative-executable-specifications",
    "/topics/us9418355b2": "/patents/crowdsourced-responses-management-to-cases",
    "/topics/us10811124b2": "/patents/device-driven-non-intermediated-blockchain-system-over-a-social-integrity-network-us10811124b2",
    "/topics/us10490304b2": "/patents/device-driven-non-intermediated-blockchain-system-over-a-social-integrity-network",
    "/topics/us11568401b2": "/patents/digital-payment-system-us11568401b2",
    "/topics/us10643208b2": "/patents/digital-payment-system",
    "/topics/us9870591b2": "/patents/distributed-electronic-document-review-in-a-blockchain-system-and-computerized-scoring-based-on-textual-and-visual-feedback",
    "/topics/us11044221b2": "/patents/integration-of-devices-through-a-social-networking-platform-us11044221b2",
    "/topics/us11777894b2": "/patents/integration-of-devices-through-a-social-networking-platform-us11777894b2",
    "/topics/us20240015129a1": "/patents/integration-of-devices-through-a-social-networking-platform-us20240015129a1",
    "/topics/us9525753b2": "/patents/integration-of-devices-through-a-social-networking-platform-us9525753b2",
    "/topics/us10320735b2": "/patents/integration-of-devices-through-a-social-networking-platform",
    "/topics/us10839020b2": "/patents/multi-source-user-generated-electronic-data-integration-in-a-blockchain-based-transactional-system",
    "/topics/us10586069b2": "/patents/networking-devices-for-storing-profiles-longitudinally",
    "/topics/us10089492b2": "/patents/patient-navigation-and-situational-awareness-derived-through-context-sensitive-information-blocks-delivery",
    "/topics/us11874949b2": "/patents/self-controlled-digital-authorization-over-communication-networks-us11874949b2",
    "/topics/us10963585b2": "/patents/self-controlled-digital-authorization-over-communication-networks",
    "/topics/us10638999b2": "/patents/system-for-controlling-medical-devices-us10638999b2",
    "/topics/us11006920b2": "/patents/system-for-controlling-medical-devices",
    "/topics/us10403399b2": "/patents/tasks-scheduling-based-on-triggering-event-and-work-lists-management",
    "/topics/us2024006038a1": "/patents/team-based-tele-diagnostics-blockchain-enabled-system-us20240006038a1",
    "/topics/us11769573b2": "/patents/team-based-tele-diagnostics-blockchain-enabled-system",
    '/patents/computer-controlled-precision-education-and-training-us11561884b2': '/patents/computer-controlled-precision-education-and-training',
    '/patents/computer-controlled-precision-education-and-training-us11561884b2/': '/patents/computer-controlled-precision-education-and-training',
    '/topics/software-development': '/topics/software',
    '/patent-summaries/blockchain-powered--healthcare--data--for--natural--language--processing--nlp--collection--storage--and--standardization/': '/patent-summaries/blockchain-powered-healthcare-data-for-natural-language-processing-nlp-collection-storage-and-standardization',
    '/our-intellectual-property-assets': '/about',
    '/patents/-system-for-controlling-medical-devices/': '/patents/system-for-controlling-medical-devices',
    '/category': {
      status: 302,
      destination: '/article'
    }
  },
  integrations: [tailwind({
    applyBaseStyles: false
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
  mdx(), icon({
    include: {
      tabler: ['*'],
      'flat-color-icons': ['template', 'gallery', 'approval', 'document', 'advertising', 'currency-exchange', 'voice-presentation', 'business-contact', 'database']
    }
  }), ...whenExternalScripts(() => partytown({
    config: {
      forward: ['dataLayer.push']
    }
  })), tasks(), compress({
    CSS: true,
    HTML: false,
    Image: false,
    JavaScript: true,
    SVG: true,
    Logger: 1
  }), pageInsight({
    lh: {  // Lighthouse Config
      // `weight` is the threshold value in the audit.
      // All audit items have weights assigned by lighthouse and can be filtered by thresholds(`weight`).
      // Default: 0
      weight: 0,
      // `breakPoint` is used to determine whether on mobile or desktop.
      // if the viewport width is less than the `breakPoint`, the lighthouse will run as a mobile device.
      // Default: 767
      breakPoint: 1024,
      // `pwa` is used to determine whether to include the PWA audit.
      // Default: false
      pwa: true,
    },
    // `firstFetch` is used for when to do the first fetch.
    // Default: "none"
    firstFetch: "none", // ["load", "open", "none"]
    // `cache` is used to enable the cache feature.
    // Default: false
    cache: true,
    build: { // Build time Config
      // `bundle` is used to determine whether to bundle the page insight.
      // Default: false
      bundle: true,
      // `showOnLoad` is used to determine whether to show the page insight on page load.
      // Default: false
      showOnLoad: true,
    },
  })],
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin]
  },
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    }
  }
});