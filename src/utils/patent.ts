import type { PaginateFunction } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { APP_BLOG ,APP_PATENT} from '~/utils/config';
import { cleanSlug, trimSlash, BLOG_BASE, POST_PERMALINK_PATTERN, CATEGORY_BASE, TAG_BASE,PATENT_BASE,POST_PATENT_PERMALINK_PATTERN } from './permalinks';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  
}: {
  id: string;
  slug: string;
  publishDate: Date;
 
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
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
    patentSummaryLinks = [],
    applicationDate,
    priorityDate,
    expiryDate
  } = data;

  const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;
  const category = rawCategory ? cleanSlug(rawCategory) : undefined;
  const tags = rawTags.map((tag: string) => cleanSlug(tag));

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author,

    draft: draft,

    metadata,
    sectiontype,

    Content: Content,
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,
    
    //The patent id number
    patentId: post.data.patentId,
    //The patent status
    patentStatus: post.data.patentStatus,
    //The inventor name
    inventor: post.data.inventor,
    //The image alt text for cover image
    altText: post.data.altText,
    patentSummaryLinks: patentSummaryLinks,
    applicationDate: applicationDate,
    priorityDate: priorityDate,
    expiryDate: expiryDate,
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
export const isBlogEnabled = APP_PATENT.isEnabled;
export const isBlogListRouteEnabled = APP_PATENT.list.isEnabled;
export const isBlogPostRouteEnabled = APP_PATENT.post.isEnabled;
// export const isBlogCategoryRouteEnabled = APP_PATENT.category.isEnabled;
// export const isBlogTagRouteEnabled = APP_PATENT.tag.isEnabled;

export const blogListRobots = APP_PATENT.list.robots;
export const blogPostRobots = APP_PATENT.post.robots;
// export const blogCategoryRobots = APP_PATENT.category.robots;
// export const blogTagRobots = APP_PATENT.tag.robots;

export const blogPostsPerPage = APP_PATENT?.postsPerPage;

/** */


export const fetchPatentPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  //return _posts;
  return _posts ? _posts.filter(item => item.sectiontype===('patent')) : [];
};

/** */
export const findPostsBySlugs = async (slugs: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchPatentPosts();

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

  const posts = await fetchPatentPosts();

  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findLatestPatentPosts = async ({ count }: { count?: number }): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchPatentPosts();

  //return posts ? posts.slice(0, _count) : [];
  return posts ? posts.filter(item => item.sectiontype===('patent')).slice(0, _count) : [];
};

/** */
export const getStaticPathsPatentList = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  return paginate(await fetchPatentPosts(), {
    params: { patent: PATENT_BASE || undefined },
    pageSize: blogPostsPerPage,
  });
};

/** */
export const getStaticPathsPatentPost = async () => {
  //if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  return (await fetchPatentPosts()).flatMap((post) => ({
    params: {
      patent: post.permalink,
    },
    props: { post },
  }));
};

/** */
export const getStaticPathsBlogCategory = async ({ paginate }: { paginate: PaginateFunction }) => {
  //if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchPatentPosts();
  const categories = new Set<string>();
  posts.map((post) => {
    typeof post.category === 'string' && categories.add(post.category.toLowerCase());
  });

  return Array.from(categories).flatMap((category) =>
    paginate(
      posts.filter((post) => typeof post.category === 'string' && category === post.category.toLowerCase()),
      {
        params: { category: category, blog: CATEGORY_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { category },
      }
    )
  );
};

/** */
export const getStaticPathsBlogTag = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchPatentPosts();
  const tags = new Set<string>();
  posts.map((post) => {
    Array.isArray(post.tags) && post.tags.map((tag) => tags.add(tag.toLowerCase()));
  });

  return Array.from(tags).flatMap((tag) =>
    paginate(
      posts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.toLowerCase() === tag)),
      {
        params: { tag: tag, blog: TAG_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { tag },
      }
    )
  );
};
