import { z, defineCollection } from 'astro:content';

// Define access levels as a const assertion for reusability
const ACCESS_LEVELS = ['free', 'paid'] as const;

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

const episodeSchema = z.object({
  title: z.string(),
  audioUrl: z.string(),
  pubDate: z.coerce.date().optional(),
  cover: z.string().optional(),
  explicit: z.boolean().optional(),
  episode: z.number().optional(),
  season: z.number().optional(),
  episodeType: z.string().optional(),
  duration: z.coerce.string(), //duration in format hh:mm:ss
  size: z.number(), // size in megabytes
});

const notebookLMResources = z.object({
  externalLink: z.string().url().optional(),
  audioPath: z.string().optional(),
});

const authnAuthzSchema = z.object({
  strategy: z.enum(['token']).optional(), // Restricting to "token" for now
  validTokens: z.array(z.string()).optional(),
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
    notebookLMResources: notebookLMResources.optional(),
    authnAuthz: authnAuthzSchema.optional(),
    disclosureAuthors: z.array(z.string()).optional(),
    disclosureId: z.string().optional(),
    abstract: z.string().optional(),
    downloadPdfLink: z.string().optional(),
    language: z.string().optional(),
    aiSummary: z.string().optional(),
    // Restrict access to specific values with default fallback
    access: z.enum(ACCESS_LEVELS).default('paid'),
    disclosureStatus: z.string().optional(),
    references: z.array(z.string()).optional(),
  }),
});
export type episodeSchema = z.infer<typeof episodeSchema>;

const episodeCollection = defineCollection({ schema: episodeSchema });
export type AccessLevel = typeof ACCESS_LEVELS[number]; // Export the type for use elsewhere

export const collections = {
  post: postCollection,
  'episode': episodeCollection,
};

// Export ACCESS_LEVELS for use in other parts of your app
export { ACCESS_LEVELS };