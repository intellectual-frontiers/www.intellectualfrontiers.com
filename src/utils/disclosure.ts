// disclosure.ts
import type { PaginateFunction } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { APP_DISCLOSURE } from '~/utils/config';
import { cleanSlug, trimSlash, DISCLOSURE_BASE, POST_DISCLOSURE_PATTERN, DISCLOSURE_CATEGORY_BASE, DISCLOSURE_TAG_BASE } from './permalinks';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_DISCLOSURE_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedPost = async (post: CollectionEntry<'post'>): Promise<Post> => {
  const { id, slug: rawSlug = '', data } = post;
  const { Content, remarkPluginFrontmatter } = await post.render();

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
    sectiontype,
    disclosureAuthors = [],
    disclosureId,
    disclosureStatus,
    abstract,
    downloadPdfLink,
    aiSummary,
    language,
    access,
    patentId,
    downloadableDocuments,
    references = [],
    patentFamilyMembers = [],
  } = data;

  const slug = cleanSlug(rawSlug);
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;
  const category = rawCategory ? cleanSlug(rawCategory) : undefined;
  const tags = rawTags.map((tag: string) => cleanSlug(tag));

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author,

    draft: draft,
    sectiontype,
    metadata,
    Content: Content,
    disclosureAuthors: disclosureAuthors,
    disclosureId: disclosureId,
    disclosureStatus: disclosureStatus,
    abstract: abstract,
    downloadPdfLink: downloadPdfLink,
    downloadableDocuments: downloadableDocuments,
    language: language,
    aiSummary: aiSummary,
    access: access,
    patentId: patentId,
    patentFamilyMembers: patentFamilyMembers,
    readingTime: remarkPluginFrontmatter?.readingTime,
    references: references,
  };
};

const load = async function (): Promise<Array<Post>> {
  const posts = await getCollection('post');
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

let _posts: Array<Post>;

export const isBlogEnabled = APP_DISCLOSURE.isEnabled;
export const isBlogListRouteEnabled = APP_DISCLOSURE.list.isEnabled;
export const isBlogPostRouteEnabled = APP_DISCLOSURE.post.isEnabled;
export const isBlogCategoryRouteEnabled = APP_DISCLOSURE.category.isEnabled;
export const isBlogTagRouteEnabled = APP_DISCLOSURE.tag.isEnabled;

export const blogListRobots = APP_DISCLOSURE.list.robots;
export const blogPostRobots = APP_DISCLOSURE.post.robots;
export const blogCategoryRobots = APP_DISCLOSURE.category.robots;
export const blogTagRobots = APP_DISCLOSURE.tag.robots;

export const blogPostsPerPage = APP_DISCLOSURE?.postsPerPage;

export const fetchDisclosurePosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  return _posts ? _posts.filter(item => item.sectiontype === ('disclosure')) : [];
};

export const findPostsBySlugs = async (slugs: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchDisclosurePosts();

  return slugs.reduce(function (r: Array<Post>, slug: string) {
    posts.some(function (post: Post) {
      return slug === post.slug && r.push(post);
    });
    return r;
  }, []);
};

export const findLatestDisclosurePosts = async ({ count }: { count?: number }): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchDisclosurePosts();

  return posts ? posts.slice(0, _count) : [];
};

export const getStaticPathsDisclosureList = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];

  const posts = await fetchDisclosurePosts();
  const totalPages = Math.ceil(posts.length / blogPostsPerPage);

  return paginate(posts, {
    params: { disclosure: DISCLOSURE_BASE || undefined },
    pageSize: blogPostsPerPage,
    props: { totalPages },
  });
};

export const getStaticPathsDisclosurePost = async () => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  return (await fetchDisclosurePosts()).flatMap((post) => ({
    params: {
      disclosure: post.permalink,
    },
    props: { post },
  }));
};

export const getStaticPathsDisclosureCategory = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchDisclosurePosts();
  const categories = new Set<string>();
  posts.map((post) => {
    typeof post.category === 'string' && categories.add(post.category.toLowerCase());
  });

  return Array.from(categories).flatMap((category) =>
    paginate(
      posts.filter((post) => typeof post.category === 'string' && category === post.category.toLowerCase()),
      {
        params: { category: category, disclosure: DISCLOSURE_CATEGORY_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { category },
      }
    )
  );
};

export const getStaticPathsDisclosureTag = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchDisclosurePosts();
  const tags = new Set<string>();
  posts.map((post) => {
    Array.isArray(post.tags) && post.tags.map((tag) => tags.add(tag.toLowerCase()));
  });

  return Array.from(tags).flatMap((tag) =>
    paginate(
      posts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.toLowerCase() === tag)),
      {
        params: { tag: tag, disclosure: DISCLOSURE_TAG_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { tag },
      }
    )
  );
};

export const getRelatedDisclosurePosts = async (originalPost: Post, maxResults: number = 4): Promise<Post[]> => {
  const posts = await fetchDisclosurePosts();
  const originalTagsSet = new Set(originalPost.tags ? originalPost.tags.map((tag) => tag.toLowerCase()) : []);

  return posts
    .filter(post =>
      post.slug !== originalPost.slug &&
      post.tags &&
      post.tags.some(tag => originalTagsSet.has(tag.toLowerCase()))
    )
    .slice(0, maxResults);
};

export const getRelatedDisclosurePostsByAuthors = async (originalPost: Post, maxResults: number = 4): Promise<Post[]> => {
  const posts = await fetchDisclosurePosts();
  const originalAuthorsSet = new Set(
    originalPost.disclosureAuthors
      ? originalPost.disclosureAuthors.map((author) => author.toLowerCase())
      : []
  );

  return posts
    .filter(post =>
      post.slug !== originalPost.slug &&
      post.disclosureAuthors &&
      post.disclosureAuthors.some(author => originalAuthorsSet.has(author.toLowerCase()))
    )
    .slice(0, maxResults);
};

export const fetchPatentPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  //return _posts;
  return _posts ? _posts.filter(item => item.sectiontype === ('patent')) : [];
};

// Function to filter out all the posts that are related to the patent ID passed as an argument
export const getRelatedPosts = async (id?: string) => {
  // Fetch all posts
  const posts = await fetchPatentPosts();

  // Filter the posts to exclude those with the category "blog"
  const related = posts.filter(post => {
    // Exclude posts categorized as "blog" to focus on patent-related content
    if (post.category !== 'blogs') {
      // If the post is not a blog, check if its patentId matches the provided ID
      return post.patentId === id;
    }
    // If the post is a blog, exclude it from the related posts
    return false;
  }).map(post => {
    // Transform each filtered post into a simplified object structure
    return {
      title: post.title, // The title of the post
      url: post.permalink, // The URL where the post can be found
      category: post.category, // The category of the post
      excerpt: post.excerpt, // A brief summary of the post content
      thumbnail: post.image, // The URL of the post's featured image
      publishedDate: post.publishDate, // The date the post was published
      patentId: post.patentId,
    };
  });

  // Return the array of related posts in the simplified object structure
  return related;
}

export const getPatentFamilyMembers = async (id?: string): Promise<Array<string>> => {
  if (!id) return [];

  const posts = await fetchPatentPosts();

  // Find the post with the matching ID
  const originalPost = posts.find(post => post.patentId === id);

  // Return the patent family members if they exist, otherwise an empty array
  return originalPost?.patentFamilyMembers || [];
};