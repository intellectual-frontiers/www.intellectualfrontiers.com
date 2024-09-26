import type { PaginateFunction } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { APP_ARTICLE } from '~/utils/config';
import { cleanSlug, trimSlash, ARTICLE_BASE, POST_PERMALINK_PATTERN, ARTICLE_CATEGORY_BASE, ARTICLE_TAG_BASE } from './permalinks';

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

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
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
    blogCitations = [],
  } = data;

  const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());
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
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,

    //The patent id number
    patentId: post.data.patentId,
    blogCitations: blogCitations,
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

/** */
export const isBlogEnabled = APP_ARTICLE.isEnabled;
export const isBlogListRouteEnabled = APP_ARTICLE.list.isEnabled;
export const isBlogPostRouteEnabled = APP_ARTICLE.post.isEnabled;
export const isBlogCategoryRouteEnabled = APP_ARTICLE.category.isEnabled;
export const isBlogTagRouteEnabled = APP_ARTICLE.tag.isEnabled;

export const blogListRobots = APP_ARTICLE.list.robots;
export const blogPostRobots = APP_ARTICLE.post.robots;
export const blogCategoryRobots = APP_ARTICLE.category.robots;
export const blogTagRobots = APP_ARTICLE.tag.robots;

export const blogPostsPerPage = APP_ARTICLE?.postsPerPage;

/*Return all the posts irrespective of section type */
export const fetchTaggedPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  //return article posts
  //return _posts ? _posts.filter(item => item.sectiontype ===('article')) : [];

  //return all posts;
  return _posts ? _posts : [];
};


/** */
export const fetchPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  //return _posts;
  return _posts ? _posts.filter(item => item.sectiontype === ('article')) : [];
};

export const fetchArticlePosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  //return _posts;
  return _posts ? _posts.filter(item => item.sectiontype === ('article')) : [];
};

/** */
export const findPostsBySlugs = async (slugs: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchArticlePosts();

  return slugs.reduce(function (r: Array<Post>, slug: string) {
    posts.some(function (post: Post) {
      return slug === post.slug && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findPostsByIds = async (ids: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPosts();

  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findLatestPosts = async ({ count }: { count?: number }): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchPosts();

  //return posts ? posts.slice(0, _count) : [];
  return posts ? posts.filter(item => item.sectiontype === ('article')).slice(0, _count) : [];
};

/** */
export const getStaticPathsArticleList = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  return paginate(await fetchPosts(), {
    params: { article: ARTICLE_BASE || undefined },
    pageSize: blogPostsPerPage,
  });
};

/** */
export const getStaticPathsArticlePost = async () => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  return (await fetchPosts()).flatMap((post) => ({
    params: {
      article: post.permalink,
    },
    props: { post },
  }));
};

/** */
export const getStaticPathsArticleCategory = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchPosts();
  const categories = new Set<string>();
  posts.map((post) => {
    typeof post.category === 'string' && categories.add(post.category.toLowerCase());
  });

  return Array.from(categories).flatMap((category) =>
    paginate(
      posts.filter((post) => typeof post.category === 'string' && category === post.category.toLowerCase()),
      {
        params: { category: category, article: ARTICLE_CATEGORY_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { category },
      }
    )
  );
};

/** */
export const getStaticPathsArticleTag = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchTaggedPosts();
  const tags = new Set<string>();
  posts.map((post) => {
    Array.isArray(post.tags) && post.tags.map((tag) => tags.add(tag.toLowerCase()));
  });

  return Array.from(tags).flatMap((tag) =>
    paginate(
      posts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.toLowerCase() === tag)),
      {
        params: { tag: tag, article: ARTICLE_TAG_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { tag },
      }
    )
  );
};

/* Function to fetch all posts that are categorized as articles */
export const fetchPatentPosts = async (): Promise<Array<Post>> => {
  // Check if the posts have already been loaded
  if (!_posts) {
    // If not, load the posts
    _posts = await load();
  }

  // Filter the posts to include only those that are categorized as 'article' and not 'patent-summaries'
  // This ensures that the returned posts are specifically articles and excludes patent summaries
  return _posts ? _posts.filter(item => item.sectiontype === 'patent') : [];
};

export const getPatents = async (id?: string, tags?: string[], category?: string) => {
  const posts = await fetchPatentPosts();

  // Define a helper function to transform post data
  const transformPostData = (post) => ({
    patentId: post.patentId,
    title: post.title,
    url: post.permalink,
    category: post.category!,
    excerpt: post.excerpt || '',
    thumbnail: post.image,
    tags: post.tags || [],
  });

  let filteredPosts;

  if (category === "blogs") {
    // Filter blogs based on tags
    filteredPosts = posts.filter((post) =>
      post.tags?.length && post.tags.some(tag => tags?.includes(tag.toLowerCase()))
    ).map(transformPostData);
  } else {
    // Filter patents based on ID
    filteredPosts = posts.filter(post => post.patentId === id).map(transformPostData);
  }

  return filteredPosts;
};


export const getFurtherReadingArticles = async (id?: string, tags?: string[], category?: string, slug?: string) => {
  const posts = await fetchPosts();

  // Filter posts into two arrays: blogPosts and otherPosts
  const blogPosts = posts.filter(post => post.category === "blogs" && post.permalink !== slug);
  const otherPosts = posts.filter(post => post.category !== "blogs" && post.permalink !== slug);

  // Transform post data
  const transformPostData = (post) => ({
    title: post.title,
    url: post.permalink,
    category: post.category!,
    excerpt: post.excerpt || '',
    thumbnail: post.image,
    tags: post.tags || [],
  });

  // Transform blogPosts
  const transformedBlogPosts = blogPosts.map(transformPostData);

  let filteredOtherPosts;
  if (category !== "blogs") {
    // Filter patents based on ID
    filteredOtherPosts = otherPosts.filter(post => post.patentId === id).map(transformPostData);
  } else {
    // Filter other posts based on tags since blog posts are not specific to patents
    filteredOtherPosts = otherPosts.filter((post) =>
      post.tags?.length && post.tags.some(tag => tags?.includes(tag.toLowerCase()))
    ).map(transformPostData);
  }

  // You can now use transformedBlogPosts and filteredOtherPosts separately
  return { blogPosts: transformedBlogPosts, otherPosts: filteredOtherPosts };
};