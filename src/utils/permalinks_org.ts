import slugify from 'limax';

import { SITE, APP_BLOG, APP_PATENT, APP_ARTICLE } from '~/utils/config';

import { trim } from '~/utils/utils';

export const trimSlash = (s: string) => trim(trim(s, '/'));
const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
  return '/' + paths + (SITE.trailingSlash && paths ? '/' : '');
};

const BASE_PATHNAME = SITE.base || '/';

export const cleanSlug = (text = '') =>
  trimSlash(text)
    .split('/')
    .map((slug) => slugify(slug))
    .join('/');

export const BLOG_BASE = cleanSlug(APP_BLOG?.list?.pathname);
export const CATEGORY_BASE = cleanSlug(APP_BLOG?.category?.pathname);
export const TAG_BASE = cleanSlug(APP_BLOG?.tag?.pathname) || 'tag';

export const POST_PERMALINK_PATTERN = trimSlash(APP_BLOG?.post?.permalink || `${BLOG_BASE}/%slug%`);

export const PATENT_BASE = cleanSlug(APP_PATENT?.list?.pathname);

export const POST_PATENT_PERMALINK_PATTERN = trimSlash(APP_PATENT?.post?.permalink || `${PATENT_BASE}/%slug%`);

export const ARTICLE_BASE = cleanSlug(APP_ARTICLE?.list?.pathname);
export const ARTICLE_CATEGORY_BASE = cleanSlug(APP_ARTICLE?.category?.pathname);
export const ARTICLE_TAG_BASE = cleanSlug(APP_ARTICLE?.tag?.pathname) || 'tag';

/** */
export const getCanonical = (path = ''): string | URL => {
  const url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash == false && path && url.endsWith('/')) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith('/')) {
    return url + '/';
  }
  return url;
};

/** */
export const getPermalink = (slug = '', type = 'page'): string => {
  let permalink: string;

  switch (type) {
    case 'category':
      permalink = createPath(CATEGORY_BASE, trimSlash(slug));
      break;

    case 'tag':
      permalink = createPath(TAG_BASE, trimSlash(slug));
      break;

    case 'articlecategory':
      permalink = createPath(ARTICLE_CATEGORY_BASE, trimSlash(slug));
      break;

    case 'articletag':
      permalink = createPath(ARTICLE_TAG_BASE, trimSlash(slug));
      break;
    case 'post':
      permalink = createPath(trimSlash(slug));
      break;

    case 'page':
    default:
      permalink = createPath(slug);
      break;
  }



  return definitivePermalink(permalink);
};

/** */
export const getHomePermalink = (): string => getPermalink('/');

/** */

export const getBlogPermalink = (): string => getPermalink(BLOG_BASE);
/** */
export const getPatentPermalink = (): string => getPermalink(PATENT_BASE);

export const getArticlePermalink = (): string => getPermalink(ARTICLE_BASE);


/** */
export const getAsset = (path: string): string =>
  '/' +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');

/** */
const definitivePermalink = (permalink: string): string => createPath(BASE_PATHNAME, permalink);
