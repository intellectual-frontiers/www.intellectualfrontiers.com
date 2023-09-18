import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import * as ameRPU from "astro-markdown-experience/rewrite-previewable-url";
import robotsTxt from "astro-robots-txt";



// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [ameRPU.typicalRemarkRewritePreviewableURLsPlugin({})],
  },
  site: "https://www.intellectualfrontiers.com/",
  integrations: [
    robotsTxt(),
    starlight({
      title: "Intellectual Frontiers",
      customCss: ["./src/styles/custom.css"],
      social: {
        github: "https://github.com/intellectual-frontiers",
      },
      sidebar: [
        {
          label: "About our IP",
          link: "/about",
        },
        {
          label: "Use Cases",
          autogenerate: { directory: "use-cases" },
        },
        {
          label: "Patents",
          autogenerate: { directory: "patents" },
        },
      ],
      head: [
        {
          tag: "meta",
          attrs: {
            name: "google-site-verification",
            content: "BbkYCQaDnpMzS3hZLItIMBOQUDoJWkJilmNH5XwORto",
            defer: true,
          },
        },
        {
          tag: "script",
          content: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PCFBB6RZ');`,
        },
      ],
    }),
  ],
});
