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
      ],
    }),
  ],
});
