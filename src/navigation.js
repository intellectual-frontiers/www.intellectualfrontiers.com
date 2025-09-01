// navigation.js
import { getPermalink, /*getBlogPermalink, getAsset,*/getPatentPermalink, getArticlePermalink, getDisclosurePermalink } from './utils/permalinks';

export const headerData = {
  links: [
    // {
    //   text: 'Home',
    //   // links: [
    //   //   {
    //   //     text: 'SaaS',
    //   //     href: getPermalink('/homes/saas'),
    //   //   },
    //   //   {
    //   //     text: 'Startup',
    //   //     href: getPermalink('/homes/startup'),
    //   //   },
    //   //   {
    //   //     text: 'Mobile App',
    //   //     href: getPermalink('/homes/mobile-app'),
    //   //   },
    //   //   {
    //   //     text: 'Personal',
    //   //     href: getPermalink('/homes/personal'),
    //   //   },
    //   // ],
    //   href: '/',
    // },
    {
      text: 'About Us',
      href: '/about',
    },
    {
      text: 'Patents for Sale',
      href: getPatentPermalink('/patents'),
    },
    {
      text: 'Defensive Disclosures',
      href: getDisclosurePermalink('/defensive-dosclosures'),
    },
    {
      text: 'Topics',
      href: '/topics',
    },
    {
      text: 'FAQs',
      href: '/faq',
    },
    // {
    //   text: 'Blog',
    //   href: getPermalink('/blog'),
    // },
    // {
    //   text: 'Articles',
    //   href: getPermalink('/article'),
    // },
    {
      text: 'Articles',
      links: [
        {
          text: 'Patent Landscapes',
          href: getPermalink('/patent-landscape'),
        },
        {
          text: 'Patent Summaries',
          href: getPermalink('/patent-summaries'),
        },
        {
          text: 'Market Potential',
          href: getPermalink('/market-potential'),
        },
        {
          text: 'Use Cases',
          href: getPermalink('/use-cases'),
        },
        {
          text: 'Blogs',
          href: getPermalink('/blogs'),
        },
      ],
      href: '/',
    },
  ],
  actions: [{ text: 'Contact Us', href: '/contact' }],
};

export const footerData = {
  links: [
    {
      title: 'Categories',
      links: [
        { text: 'Patents for Sale', href: '/patents' },
        { text: 'Patent Landscape', href: '/patent-landscape' },
        { text: 'Patent Summaries', href: '/patent-summaries' },
        { text: 'Market Potential', href: '/market-potential' },
        { text: 'Use Cases', href: '/use-cases' },
        { text: 'Blogs', href: '/blogs' },
        // { text: 'Privacy Policy', href: '#' },
        // { text: 'Terms of Use', href: '#' },
        // { text: 'Pricing', href: '#' },
        // { text: 'Resources', href: '#' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { text: 'Patents for Sale', href: '/patents' },
        { text: 'All Topics', href: '/topics' },
        { text: 'FAQs', href: '/faq' },
        { text: 'Articles', href: '/article' },
        { text: 'About Us', href: '/about' },
        { text: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Defensive Disclosures',
      links: [
        { text: 'About Defensive Disclosures', href: '/defensive-disclosures' },
        { text: 'Published Defensive Disclosures', href: '/defensive-disclosures#browse-disclosures' },
        { text: 'Submit Defensive Disclosures', href: '/contact' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://twitter.com/IntelFrontiers' },
    { ariaLabel: 'Spotify', icon: 'tabler:brand-spotify', href: 'https://open.spotify.com/show/2K9w0Pkdqh2w6DQTLiz7eO?si=eb058dc33e1a4dc6' },
    // { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: '#' },

  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
    Made by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `,
};
