import { z, defineCollection } from 'astro:content';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const patentSummaryLinksDef = z.object({
  summaryTitle: z.string(),
  link: z.string().url(),
})

const externalLinksDef = z.object({
  sourceText: z.string(),
  link: z.string().url(),
})

const downloadableDocumentssDef = z.object({
  pdfLink: z.string().url().optional(),
  claimSummaryLink: z.string().url().optional(),
});

const blogCitationsDef = z.object({
  citationNumber: z.number().optional(),
  author: z.string().optional(),
  name: z.string().optional(),
  publisher: z.string().optional(),
  datePublished: z.string().optional(),
  about: z.string().optional(),
  citationText: z.string().optional(),
});

const postCollection = defineCollection({
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    sectiontype: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
    patentId: z.string().optional(),
    patentStatus: z.string().optional(),
    inventor: z.string().optional(),
    altText: z.string().optional(),
    patentSummaryLinks: z.array(patentSummaryLinksDef).optional(),
    applicationDate: z.date().optional(),
    priorityDate: z.date().optional(),
    expiryDate: z.date().optional(),
    currentAssignee: z.string().optional(),
    externalLinks: z.array(externalLinksDef).optional(),
    downloadableDocuments: downloadableDocumentssDef.optional(),
    patentFamilyMembers: z.array(z.string()).optional(),
    blogCitations: z.array(blogCitationsDef).optional(),
  }),
});

export const collections = {
  post: postCollection,
};
