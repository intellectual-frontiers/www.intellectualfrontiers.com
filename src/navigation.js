import { getPermalink, /*getBlogPermalink, getAsset,*/getPatentPermalink,getArticlePermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      // links: [
      //   {
      //     text: 'SaaS',
      //     href: getPermalink('/homes/saas'),
      //   },
      //   {
      //     text: 'Startup',
      //     href: getPermalink('/homes/startup'),
      //   },
      //   {
      //     text: 'Mobile App',
      //     href: getPermalink('/homes/mobile-app'),
      //   },
      //   {
      //     text: 'Personal',
      //     href: getPermalink('/homes/personal'),
      //   },
      // ],
      href: '/',
    },
    {
      text: 'About Us',
      href: '/about',
    },
    {
      text: 'Patents for Sale',
      href: getPatentPermalink('/patents'),
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
    //   //text: 'Blog',
    //   //href: getPermalink('/blog'),
    // },
    {
      text: 'Articles',
      href: getPermalink('/article'),
    }
  ],
  // actions: [{ text: 'Contact/Chatbot', href: '/contact' }],
};

export const footerData = {
  links: [
    {
      title: 'Categories',
      links: [
        { text: 'Patents for Sale', href: '/patents' },
        { text: 'Patent Landscape', href: '/category/patent-landscape' },
        { text: 'Patent Summaries', href: '/category/patent-summaries' },
        { text: 'Market Potential', href: '/category/market-potential' },
        { text: 'Blogs', href: '/category/blogs' },
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
      ],
    },
    {
      title: 'Contact',
      links: [
        // { text: 'consectetur adipiscing elit.', href: '#' },
        { text: 'hello@intellectualfrontiers.com', href: 'mailto:hello@intellectualfrontiers.com' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://twitter.com/IntelFrontiers' },
    // { ariaLabel: 'Flipboard', icon: 'tabler:brand-flipboard', href: '#' },
    // { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: '#' },
   
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
    Made by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `,
};
