
### Commands

All commands are run from the root of the project, from a terminal:

| Command               | Action                                             |
| :-------------------- | :------------------------------------------------- |
| `pnpm install`         | Installs dependencies                              |
| `pnpm run dev`         | Starts local dev server at `localhost:3000`        |
| `pnpm run build`       | Build your production site to `./dist/`            |
| `npm run preview`     | Preview your build locally, before deploying       |
| `npm run format`      | Format codes with Prettier                         |
| `npm run lint:eslint` | Run Eslint                                         |
| `npm run astro ...`   | Run CLI commands like `astro add`, `astro preview` |

<br>

### Configuration

Basic configuration file: `./src/config.yaml`

```yaml
site:
  name: 'Example'
  site: 'https://example.com'
  base: '/' # Change this if you need to deploy to Github Pages, for example
  trailingSlash: false # Generate permalinks with or without "/" at the end

  googleSiteVerificationId: false # Or some value,

# Default SEO metadata
metadata:
  title:
    default: 'Example'
    template: '%s — Example'
  description: 'This is the default meta description of Example website'
  robots:
    index: true
    follow: true
  openGraph:
    site_name: 'Example'
    images:
      - url: '~/assets/images/default.jpg'
        width: 1200
        height: 628
    type: website
  twitter:
    handle: '@twitter_user'
    site: '@twitter_user'
    cardType: summary_large_image

i18n:
  language: en
  textDirection: ltr

apps:
  blog:
    isEnabled: true
    postsPerPage: 6

    post:
      isEnabled: true
      permalink: '/blog/%slug%' # Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      robots:
        index: true

    list:
      isEnabled: true
      pathname: 'blog' # Blog main path, you can change this to "articles" (/articles)
      robots:
        index: true

    category:
      isEnabled: true
      pathname: 'category' # Category main path /category/some-category, you can change this to "group" (/group/some-category)
      robots:
        index: true

    tag:
      isEnabled: true
      pathname: 'tag' # Tag main path /tag/some-tag, you can change this to "topics" (/topics/some-category)
      robots:
        index: false

analytics:
  vendors:
    googleAnalytics:
      id: null # or "G-XXXXXXXXXX"

ui:
  theme: 'system' # Values: "system" | "light" | "dark" | "light:only" | "dark:only"
```

<br>

### Deploy

#### Deploy to production (manual)

You can create an optimized production build with:

```shell
npm run build
```

Now, your website is ready to be deployed. All generated files are located at
`dist` folder, which you can deploy the folder to any hosting service you
prefer.

#### Deploy to Netlify

Clone this repository on own GitHub account and deploy to Netlify:

[![Netlify Deploy button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/onwidget/astrowind)

#### Deploy to Vercel

Clone this repository on own GitHub account and deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fonwidget%2Fastrowind)

<br>

### Token-Based Page Protection

To restrict access to certain pages (e.g., unpublished patent applications or sensitive reports), we've tried out a **token-based protection system**. This mechanism ensures that only users with a valid token can view protected content.

#### **Implementation Details:**

1. **Markdown Frontmatter:**
   - Protected pages are marked with an `authnAuthz` field in the frontmatter, specifying the protection strategy and the list of valid tokens.
   
   Example frontmatter for a protected page:
   ```
    authnAuthz:
     strategy: token
     validTokens: ["token-1", "token-2"]
    metadata:
     robots:
      index: false
      follow: false
   ``` 


2. **Token Validation:**
   - A **React component** is used to check for the presence of a valid token passed via the **URL query parameter** (e.g., `?token=token-1`).
   - If the token matches any of the valid tokens in the page’s frontmatter, the content is displayed.
   - If the token is invalid or missing, the page content is hidden, and an access-denied message is shown.

3. **Secure Token Management:**
   - Tokens are stored in the page’s **Markdown frontmatter**, ensuring they are easy to manage on a per-page basis.

4. **Preventing Indexing of Protected Pages:**

   - To ensure that protected pages are not indexed by search engines, the robots field in the frontmatter is configured as follows:
   ```
    metadata:
     robots:
      index: false
      follow: false
   ``` 


 

<!-- Security scan triggered at 2025-09-02 00:49:33 -->