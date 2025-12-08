# Jobs to be Done: Gridsome to Astro Migration

**Product/Feature**: Complete 1-for-1 Migration from Gridsome to Astro
**Date Created**: November 9, 2025
**Current Site**: https://consultwithgriff.com
**Project Context**: Personal blog and consulting website with 85+ blog posts, 5 documentation pages, custom features, and extensive SEO requirements

---

## Executive Summary

This JTBD document defines the complete migration strategy from a Gridsome-based static site to Astro while maintaining 100% feature parity. The migration affects 85 blog posts, 5 documentation pages, custom components, search functionality, theme switching, 191+ SEO redirects, and a complete plugin ecosystem for content processing.

**Primary Job**: Migrate a production website from deprecated Gridsome/Vue 2 technology to modern Astro architecture without losing any content, functionality, or SEO value.

---

## Core Job Statement

**When** I need to maintain a professional blog and consulting website built on deprecated Gridsome technology with Vue 2, complex GraphQL queries, and PostCSS 7 constraints

**I want to** migrate to Astro's modern, content-focused architecture while achieving complete feature parity

**So I can** eliminate technical debt, improve site performance, simplify content management, future-proof the technology stack, and maintain the exact same user experience and SEO value that my business depends on.

### Alternate Job Perspectives

**Functional Job**: Convert 85+ markdown blog posts with complex frontmatter, 5 documentation pages, custom Vue components, remark plugins, search functionality, and deployment configurations from Gridsome's GraphQL-based system to Astro's Content Collections API.

**Emotional Job**: Feel confident that my professional reputation, SEO rankings, and business consulting pipeline remain protected during the technology transition.

**Social Job**: Demonstrate technical leadership by modernizing infrastructure while maintaining service continuity for my audience and consulting clients.

---

## Job Map

The migration follows these sequential phases:

### 1. Define Phase
**Objective**: What users need to understand before beginning the migration

**Activities**:
- Audit current Gridsome architecture and identify all features requiring migration
- Document all 85 blog posts with frontmatter schemas and special requirements
- Map all 5 documentation pages and their unique characteristics
- Catalog all Vue components, layouts, templates, and pages
- Identify all remark plugins and content processing requirements
- Document search implementation (Fuse.js, search.json generation)
- List all 191+ redirect rules for SEO preservation
- Review deployment configuration (Azure Static Web Apps, GitHub Actions)
- Establish success criteria for "1-for-1" migration
- Define rollback strategy and risk mitigation plan

**Key Questions**:
- What makes this a "1-for-1" migration vs. an upgrade?
- Which features are mission-critical vs. nice-to-have?
- What are the non-negotiable SEO requirements?
- How will visual parity be validated?

**Outputs**:
- Complete feature inventory checklist
- Content migration plan with preservation requirements
- Technical architecture comparison (Gridsome vs. Astro)
- Success criteria definition document

### 2. Locate Phase
**Objective**: Identify all inputs, resources, and dependencies needed for migration

**Resources Required**:

**Content Assets**:
- 85 blog posts in `/blog/` directory
  - Frontmatter: title, date, permalink, description, summary, tags, categories, excerpt, timeToRead
  - Relative images (e.g., `./images/filename.jpg`)
  - Embedded content (YouTube, Twitter, Gists)
  - Code blocks with syntax highlighting
- 5 documentation pages in `/docs/`
  - Custom permalink structures
  - Different frontmatter schema

**Component Architecture**:
- 1 layout: `Default.vue` (header, footer, nav, theme switcher, mobile menu)
- 4 templates: `Post.vue`, `Tag.vue`, `Documentation.vue`, `Redirect.vue`
- 4 pages: `Index.vue`, `Articles.vue`, `Contact.vue`, `404.vue`
- 5 components: `SearchInput.vue`, `PaginationPosts.vue`, `ThemeSwitcher.vue`, `SearchFocus.vue`

**Plugin Ecosystem**:
- `gridsome-plugin-remark-youtube` - YouTube embeds
- `gridsome-plugin-remark-twitter` - Twitter/X embeds
- `@noxify/gridsome-plugin-remark-embed` - Gist embeds
- `gridsome-plugin-remark-shiki` - Syntax highlighting (material-theme-palenight)
- External link handling (target, rel, anchor classes)

**Styling System**:
- TailwindCSS (PostCSS 7 compatible version)
- Custom theme variables (light/dark modes with CSS variables)
- Google Font: 'Nunito Sans' (weights: 400, 700)
- GitHub markdown styles
- Custom CSS for containers, checkmarks, responsive iframes

**Integrations & Features**:
- Search: Fuse.js with `/search.json` generation
- RSS feed: `/rss.xml` with all posts
- Sitemap with exclusions
- Google Analytics (G-G6TPE6V0YJ)
- Social media metadata (Twitter Cards, OpenGraph via Previewify.app)
- Theme switching with localStorage persistence

**Deployment Configuration**:
- Azure Static Web Apps configuration
- 191+ redirect rules in `staticwebapp.config.json`
- GitHub Actions workflow
- Netlify alternative configuration

**Documentation References**:
- Astro docs on Content Collections (/withastro/docs)
- Remark plugin ecosystem documentation
- Current Gridsome configuration in `gridsome.config.js`
- TailwindCSS configuration

### 3. Prepare Phase
**Objective**: Set up the Astro environment and migration strategy

**Activities**:

**1. Astro Project Initialization**:
- Install Astro with npm/yarn
- Configure Astro for static site generation
- Set up TypeScript (optional but recommended)
- Configure build output to `/dist` for Azure compatibility

**2. Content Collections Setup**:
```typescript
// src/content/config.ts
import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    permalink: z.string().optional(),
    description: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    categories: z.array(z.string()),
    excerpt: z.string().optional(),
    timeToRead: z.number().optional(),
  })
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    permalink: z.string().optional(),
    categories: z.array(z.string()),
    excerpt: z.string().optional(),
  })
});

export const collections = { blog, docs };
```

**3. Remark Plugin Configuration**:
Install Astro equivalents:
- `@astrojs/markdown-remark` - Core markdown processing
- `remark-gfm` - GitHub Flavored Markdown
- `remark-embedder` or custom plugins - YouTube/Twitter/Gist embeds
- `rehype-shiki` or `@astrojs/shiki` - Syntax highlighting with material-theme-palenight
- `remark-external-links` - External link handling

**4. Styling Migration**:
- Install TailwindCSS for Astro (`@astrojs/tailwind`)
- Migrate `tailwind.config.js` with custom spacing and colors
- Port CSS variables for theme switching
- Set up Google Fonts integration
- Import GitHub markdown styles

**5. Component Migration Plan**:
- Convert Vue layouts to Astro layouts
- Convert Vue templates to Astro pages with `getStaticPaths()`
- Convert Vue components to Astro components or client:load directives
- Plan for search component (remains client-side with Fuse.js)
- Plan for theme switcher (client-side localStorage interaction)

**6. Migration Tooling**:
- Create content migration scripts if needed for frontmatter transformations
- Set up validation scripts to compare content before/after
- Configure Playwright for visual regression testing

**7. Deployment Preparation**:
- Review Azure Static Web Apps requirements for Astro
- Plan redirect migration strategy
- Update GitHub Actions workflow for Astro build

**Outputs**:
- Initialized Astro project structure
- Content collections schema validated against existing frontmatter
- Remark plugin configuration tested with sample posts
- Component migration strategy documented
- Development environment functional (no Docker required!)

### 4. Confirm Phase
**Objective**: Validate migration approach with prototype testing

**Validation Activities**:

**1. Prototype Migration (3-5 sample posts)**:
- Migrate 3 representative blog posts with different features:
  - Post with YouTube embeds
  - Post with code blocks and syntax highlighting
  - Post with Twitter embeds and images
- Migrate 1 documentation page
- Verify frontmatter parsing and content rendering

**2. Component Proof of Concept**:
- Build homepage with latest post showcase
- Build blog listing page with pagination
- Build individual post page with all metadata
- Build tag archive page with pagination
- Implement search functionality with Fuse.js

**3. Feature Validation**:
- Theme switching works with localStorage persistence
- Pagination generates correct page numbers and navigation
- RSS feed generates with correct format
- Search index builds at compile time
- All embedded content renders correctly
- Syntax highlighting matches current theme
- Custom permalinks work as expected

**4. Visual Validation Preparation**:
- Set up Playwright test suite
- Capture baseline screenshots from https://consultwithgriff.com:
  - Homepage
  - Blog listing page (multiple pagination pages)
  - Sample individual blog posts (3-5 different types)
  - Tag archive pages
  - Documentation pages
  - Contact page
  - 404 page
- Define viewport sizes for testing (mobile, tablet, desktop)
- Establish acceptable visual difference threshold

**5. Performance Baseline**:
- Measure current Gridsome build time
- Measure current page load times and Core Web Vitals
- Set performance targets for Astro migration
- Compare bundle sizes

**6. SEO Validation**:
- Verify meta tags match (title, description, OpenGraph, Twitter Cards)
- Confirm canonical URLs generate correctly
- Test 10-20 sample redirects
- Validate RSS feed format and content

**Decision Point**:
- Does the prototype prove that 1-for-1 migration is achievable?
- Are there any blocking technical issues?
- Do we need to adjust the migration strategy?

**Outputs**:
- Working prototype with representative content
- Validated component architecture
- Confirmed remark plugin functionality
- Baseline Playwright test suite
- Go/No-go decision for full migration

### 5. Execute Phase
**Objective**: Perform the complete content and feature migration

**Content Migration**:

**Step 1: Blog Post Migration**
- Copy all 85 markdown files from `/blog/` to `/src/content/blog/`
- Validate frontmatter schemas match Content Collections definition
- Verify all relative image paths resolve correctly
- Test embedded content rendering (YouTube, Twitter, Gists)
- Confirm code blocks have correct syntax highlighting
- Validate custom permalinks generate correct routes

**Step 2: Documentation Migration**
- Copy all 5 markdown files from `/docs/` to `/src/content/docs/`
- Adjust frontmatter to match docs collection schema
- Test custom permalink routing
- Verify content renders with correct styling

**Step 3: Component Migration**

**Layout Migration** (`Default.vue` → `src/layouts/Default.astro`):
```astro
---
// src/layouts/Default.astro
import ThemeSwitcher from '../components/ThemeSwitcher.astro';
import SearchFocus from '../components/SearchFocus.astro';

const { title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="keywords" content="Gridsome,Vue,Tailwind,JavaScript,HTML,CSS,.NET,ASP.NET,Azure">
  <meta name="author" content="Kevin W. Griffin">
  <title>{title || 'Kevin W. Griffin | Developer, Training, Entrepreneur'}</title>
  {description && <meta name="description" content={description}>}
  <!-- Google Fonts, TailwindCSS, Custom CSS -->
</head>
<body class="theme-light">
  <header>
    <!-- Navigation with mobile menu -->
    <!-- Consulting | Articles | Courses | Contact | Book Consultation -->
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <!-- Social links: Email, YouTube, GitHub, Twitter, Mastodon, Instagram -->
    <!-- Microsoft MVP badge -->
    <!-- Copyright notice -->
  </footer>

  <ThemeSwitcher client:load />
  <SearchFocus client:load />
</body>
</html>
```

**Page Migrations**:

1. **Homepage** (`Index.vue` → `src/pages/index.astro`):
```astro
---
import { getCollection } from 'astro:content';
import DefaultLayout from '../layouts/Default.astro';

const posts = await getCollection('blog');
const latestPost = posts.sort((a, b) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
)[0];
---
<DefaultLayout title="Kevin W. Griffin">
  <section class="hero">
    <img src="/kevin_rockon.jpg" alt="Kevin W. Griffin">
    <!-- Hero content -->
  </section>

  {latestPost && (
    <section class="latest-article">
      <h2>Latest Article</h2>
      <a href={`/${latestPost.id}/`}>
        <h3>{latestPost.data.title}</h3>
        <p>{latestPost.data.summary}</p>
        <span>{latestPost.data.timeToRead} min read</span>
      </a>
    </section>
  )}

  <!-- Personal bio section -->
  <!-- Newsletter signup section -->
</DefaultLayout>
```

2. **Blog Listing** (`Articles.vue` → `src/pages/articles/[...page].astro`):
```astro
---
import { getCollection } from 'astro:content';
import type { GetStaticPaths } from 'astro';
import DefaultLayout from '../../layouts/Default.astro';
import PaginationPosts from '../../components/PaginationPosts.astro';

export const getStaticPaths = (async ({ paginate }) => {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort((a, b) =>
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return paginate(sortedPosts, { pageSize: 10 });
}) satisfies GetStaticPaths;

const { page } = Astro.props;
---
<DefaultLayout title="Articles">
  <h1>Articles</h1>

  <ul>
    {page.data.map(post => (
      <li>
        <h2><a href={`/${post.id}/`}>{post.data.title}</a></h2>
        <p class="meta">
          {new Date(post.data.date).toLocaleDateString()} •
          {post.data.timeToRead} min read
        </p>
        <p>{post.data.excerpt}</p>
      </li>
    ))}
  </ul>

  <PaginationPosts
    base="/articles"
    totalPages={page.lastPage}
    currentPage={page.currentPage}
  />
</DefaultLayout>
```

3. **Individual Blog Posts** (`Post.vue` → `src/pages/[...slug].astro`):
```astro
---
import { getCollection, getEntry, render } from 'astro:content';
import type { GetStaticPaths } from 'astro';
import DefaultLayout from '../layouts/Default.astro';

export const getStaticPaths = (async () => {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.data.permalink || post.id },
    props: { post },
  }));
}) satisfies GetStaticPaths;

const { post } = Astro.props;
const { Content } = await render(post);

// Generate OpenGraph image URL via Previewify.app
const ogImageUrl = `https://previewify.app/generate/templates/769?title=${encodeURIComponent(post.data.title)}`;
---
<DefaultLayout title={post.data.title} description={post.data.description}>
  <Fragment slot="head">
    <meta property="og:image" content={ogImageUrl}>
    <meta property="og:title" content={post.data.title}>
    <meta property="og:description" content={post.data.description}>
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content={ogImageUrl}>
    <link rel="canonical" href={`https://consultwithgriff.com/${post.data.permalink || post.id}/`}>
  </Fragment>

  <article>
    <header>
      <h1>{post.data.title}</h1>
      <p class="meta">
        {new Date(post.data.date).toLocaleDateString()} •
        {post.data.timeToRead} min read
      </p>
    </header>

    <div class="markdown-body">
      <Content />
    </div>

    <footer>
      <p>Tags:
        {post.data.tags.map(tag => (
          <a href={`/article-tags/${tag}/`}>{tag}</a>
        ))}
      </p>
    </footer>
  </article>

  <a href="/articles/">← Back to articles</a>
</DefaultLayout>
```

4. **Tag Archives** (`Tag.vue` → `src/pages/article-tags/[tag]/[...page].astro`):
```astro
---
import { getCollection } from 'astro:content';
import type { GetStaticPaths } from 'astro';
import DefaultLayout from '../../../layouts/Default.astro';
import PaginationPosts from '../../../components/PaginationPosts.astro';

export const getStaticPaths = (async ({ paginate }) => {
  const posts = await getCollection('blog');

  // Get all unique tags
  const allTags = [...new Set(posts.flatMap(post => post.data.tags))];

  // Create paginated routes for each tag
  return allTags.flatMap(tag => {
    const tagPosts = posts.filter(post => post.data.tags.includes(tag));
    return paginate(tagPosts, {
      params: { tag },
      pageSize: 3
    });
  });
}) satisfies GetStaticPaths;

const { page } = Astro.props;
const { tag } = Astro.params;
---
<DefaultLayout title={`Tag: ${tag}`}>
  <h1>Posts tagged with "{tag}"</h1>

  <ul>
    {page.data.map(post => (
      <li>
        <h2><a href={`/${post.id}/`}>{post.data.title}</a></h2>
        <p class="meta">
          {new Date(post.data.date).toLocaleDateString()} •
          {post.data.timeToRead} min read
        </p>
        <p>{post.data.summary}</p>
      </li>
    ))}
  </ul>

  <PaginationPosts
    base={`/article-tags/${tag}`}
    totalPages={page.lastPage}
    currentPage={page.currentPage}
  />
</DefaultLayout>
```

5. **Documentation Pages** (`Documentation.vue` → `src/pages/[...docs].astro`):
```astro
---
import { getCollection, render } from 'astro:content';
import type { GetStaticPaths } from 'astro';
import DefaultLayout from '../layouts/Default.astro';

export const getStaticPaths = (async () => {
  const docs = await getCollection('docs');
  return docs.map(doc => ({
    params: { docs: doc.data.permalink || doc.id },
    props: { doc },
  }));
}) satisfies GetStaticPaths;

const { doc } = Astro.props;
const { Content } = await render(doc);
---
<DefaultLayout title={doc.data.title}>
  <article class="markdown-body">
    <Content />
  </article>
</DefaultLayout>
```

**Component Migrations**:

1. **SearchInput** (remains mostly Vue/React with `client:load`):
```astro
---
// src/components/SearchInput.astro
---
<div id="search-container">
  <input type="search" id="search-input" placeholder="Search articles..." />
  <div id="search-results" style="display: none;"></div>
</div>

<script>
  import Fuse from 'fuse.js';

  let fuse: Fuse<any>;
  let searchData: any[] = [];

  // Load search index
  fetch('/search.json')
    .then(res => res.json())
    .then(data => {
      searchData = data;
      fuse = new Fuse(data, {
        keys: ['title', 'summary'],
        threshold: 0.5,
        includeMatches: true,
      });
    });

  // Search functionality
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const searchResults = document.getElementById('search-results') as HTMLElement;

  searchInput?.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value;
    if (!query || !fuse) {
      searchResults.style.display = 'none';
      return;
    }

    const results = fuse.search(query);
    if (results.length > 0) {
      searchResults.innerHTML = results.slice(0, 5).map(result => `
        <a href="/${result.item.path}/">
          <h4>${result.item.title}</h4>
          <p>${result.item.summary}</p>
        </a>
      `).join('');
      searchResults.style.display = 'block';
    } else {
      searchResults.style.display = 'none';
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput?.focus();
    }
    if (e.key === 'Escape') {
      searchResults.style.display = 'none';
      searchInput?.blur();
    }
  });
</script>

<style>
  /* Search styling */
</style>
```

2. **ThemeSwitcher**:
```astro
---
// src/components/ThemeSwitcher.astro
---
<button id="theme-toggle" aria-label="Toggle theme">
  <svg id="sun-icon" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <!-- Sun SVG path -->
  </svg>
  <svg id="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <!-- Moon SVG path -->
  </svg>
</button>

<script>
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  const body = document.body;

  // Initialize theme from localStorage
  const currentTheme = localStorage.getItem('theme') || 'light';
  body.className = `theme-${currentTheme}`;

  if (currentTheme === 'dark') {
    sunIcon?.classList.remove('hidden');
    moonIcon?.classList.add('hidden');
  }

  // Toggle theme
  themeToggle?.addEventListener('click', () => {
    const isDark = body.className === 'theme-dark';
    const newTheme = isDark ? 'light' : 'dark';

    body.className = `theme-${newTheme}`;
    localStorage.setItem('theme', newTheme);

    sunIcon?.classList.toggle('hidden');
    moonIcon?.classList.toggle('hidden');
  });
</script>
```

3. **PaginationPosts**:
```astro
---
// src/components/PaginationPosts.astro
interface Props {
  base: string;
  totalPages: number;
  currentPage: number;
}

const { base, totalPages, currentPage } = Astro.props;

const prevUrl = currentPage > 1
  ? currentPage === 2
    ? base
    : `${base}/${currentPage - 1}/`
  : null;

const nextUrl = currentPage < totalPages
  ? `${base}/${currentPage + 1}/`
  : null;
---

<nav class="pagination" aria-label="Pagination">
  {prevUrl && (
    <a href={prevUrl} class="pagination-prev">← Previous</a>
  )}

  <span class="pagination-info">
    Page {currentPage} of {totalPages}
  </span>

  {nextUrl && (
    <a href={nextUrl} class="pagination-next">Next →</a>
  )}
</nav>
```

**Step 4: Search Index Generation**

Create build-time script to generate `/search.json`:

```typescript
// src/utils/generateSearchIndex.ts
import { getCollection } from 'astro:content';
import fs from 'fs/promises';

export async function generateSearchIndex() {
  const posts = await getCollection('blog');

  const searchData = posts.map(post => ({
    title: post.data.title,
    summary: post.data.summary,
    path: post.data.permalink || post.id,
  }));

  await fs.writeFile(
    './public/search.json',
    JSON.stringify(searchData),
    'utf-8'
  );
}
```

Integrate into Astro build via `astro.config.mjs`:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import { generateSearchIndex } from './src/utils/generateSearchIndex';

export default defineConfig({
  integrations: [
    {
      name: 'search-index-generator',
      hooks: {
        'astro:build:done': async () => {
          await generateSearchIndex();
        }
      }
    }
  ]
});
```

**Step 5: RSS Feed Integration**

Install and configure `@astrojs/rss`:

```typescript
// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort((a, b) =>
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'Kevin W. Griffin | Developer, Training, Entrepreneur',
    description: 'Articles on software development, .NET, Azure, and consulting',
    site: context.site || 'https://consultwithgriff.com',
    items: sortedPosts.map(post => ({
      title: post.data.title,
      description: post.data.summary,
      link: `/${post.data.permalink || post.id}/`,
      pubDate: new Date(post.data.date),
      author: 'Kevin W. Griffin',
    })),
  });
}
```

**Step 6: Sitemap Integration**

Install and configure `@astrojs/sitemap`:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://consultwithgriff.com',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/no-more-stream-notifications/') &&
        !page.includes('/thanks-supercharge-signup/') &&
        !page.includes('/thanks-signalr-signup/') &&
        !page.includes('/thanks-signup/') &&
        !page.includes('/thanks-confirm/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ]
});
```

**Step 7: Redirect Configuration**

Migrate all 191 redirects to Astro/Azure Static Web Apps format:

```json
// public/staticwebapp.config.json
{
  "routes": [
    { "route": "/blog*", "redirect": "/", "statusCode": 301 },
    { "route": "/shows/*", "redirect": "/", "statusCode": 301 },
    { "route": "/tag*", "redirect": "/", "statusCode": 301 },
    { "route": "/page/*", "redirect": "/", "statusCode": 301 },
    { "route": "/author/*", "redirect": "/", "statusCode": 301 },
    { "route": "/wp-content/*", "redirect": "/", "statusCode": 301 }
    // ... all 191+ redirects
  ],
  "navigationFallback": {
    "rewrite": "/404/index.html"
  },
  "responseOverrides": {
    "404": {
      "rewrite": "/404/index.html"
    }
  }
}
```

**Step 8: Analytics Integration**

Install Astro Google Analytics:

```astro
---
// src/layouts/Default.astro
import { GoogleAnalytics } from '@astrojs/google-analytics';
---
<head>
  <!-- ... -->
  <GoogleAnalytics id="G-G6TPE6V0YJ" />
</head>
```

**Step 9: Deployment Configuration**

Update GitHub Actions workflow:

```yaml
# .github/workflows/azure-static-web-apps.yml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - master
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - master

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
          lfs: false

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: yarn install

      - name: Build Astro site
        run: yarn build

      - name: Deploy to Azure Static Web Apps
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          api_location: ""
          output_location: "dist"
```

**Outputs**:
- All 85 blog posts migrated and rendering correctly
- All 5 documentation pages migrated
- All components functional (layout, search, pagination, theme switcher)
- Search index generating at build time
- RSS feed and sitemap generating correctly
- All 191+ redirects configured
- Deployment pipeline updated and tested

### 6. Monitor Phase
**Objective**: Test feature parity and validate the migration

**Testing Activities**:

**1. Content Validation**:
- Verify all 85 blog posts are accessible and render correctly
- Check all 5 documentation pages load properly
- Confirm all images display (relative paths resolved)
- Test all embedded content (YouTube videos, Twitter posts, Gists)
- Validate code blocks have correct syntax highlighting with material-theme-palenight
- Check all custom permalinks route correctly

**2. Functional Testing**:
- **Search**: Type queries, verify results match, test keyboard shortcuts (/, Escape)
- **Pagination**: Navigate through blog listing pages, verify correct post counts (10 per page)
- **Tag Archives**: Click tags, verify filtered post lists, test pagination (3 per page)
- **Theme Switcher**: Toggle dark/light mode, verify localStorage persistence, refresh page
- **Navigation**: Test all menu items, mobile hamburger menu
- **RSS Feed**: Validate `/rss.xml` structure and all posts present
- **404 Page**: Test invalid URLs route to custom 404
- **Redirects**: Test sample redirects (10-20) from old URLs to new destinations

**3. Visual Regression Testing with Playwright**:

Create comprehensive test suite:

```typescript
// tests/visual-regression.spec.ts
import { test, expect } from '@playwright/test';

const pages = [
  { name: 'Homepage', url: '/' },
  { name: 'Articles Listing - Page 1', url: '/articles/' },
  { name: 'Articles Listing - Page 2', url: '/articles/2/' },
  { name: 'Sample Post 1', url: '/signalr-transports-explained/' },
  { name: 'Sample Post 2', url: '/azure-functions-host-error/' },
  { name: 'Sample Post 3', url: '/entity-framework-migrations/' },
  { name: 'Tag Archive - Azure', url: '/article-tags/azure/' },
  { name: 'Documentation - Consulting', url: '/consulting/' },
  { name: 'Contact', url: '/contact/' },
  { name: '404', url: '/non-existent-page/' },
];

const viewports = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1920, height: 1080 },
];

for (const page of pages) {
  for (const viewport of viewports) {
    test(`${page.name} - ${viewport.name} - Light Theme`, async ({ page: pw }) => {
      await pw.setViewportSize({ width: viewport.width, height: viewport.height });
      await pw.goto(page.url);

      // Wait for page to fully render
      await pw.waitForLoadState('networkidle');

      // Take screenshot
      await expect(pw).toHaveScreenshot(`${page.name}-${viewport.name}-light.png`, {
        fullPage: true,
        maxDiffPixels: 100, // Allow minor rendering differences
      });
    });

    test(`${page.name} - ${viewport.name} - Dark Theme`, async ({ page: pw }) => {
      await pw.setViewportSize({ width: viewport.width, height: viewport.height });
      await pw.goto(page.url);

      // Switch to dark theme
      await pw.evaluate(() => {
        document.body.className = 'theme-dark';
        localStorage.setItem('theme', 'dark');
      });

      await pw.waitForLoadState('networkidle');

      await expect(pw).toHaveScreenshot(`${page.name}-${viewport.name}-dark.png`, {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });
  }
}

test('Search functionality', async ({ page }) => {
  await page.goto('/');

  // Test search keyboard shortcut
  await page.keyboard.press('/');
  await expect(page.locator('#search-input')).toBeFocused();

  // Type search query
  await page.fill('#search-input', 'Azure');
  await page.waitForTimeout(500); // Wait for debounce

  // Verify results appear
  await expect(page.locator('#search-results')).toBeVisible();
  await expect(page.locator('#search-results a')).toHaveCount(5, { timeout: 1000 });

  // Test escape key
  await page.keyboard.press('Escape');
  await expect(page.locator('#search-results')).toBeHidden();
});

test('Theme switcher persistence', async ({ page }) => {
  await page.goto('/');

  // Click theme toggle
  await page.click('#theme-toggle');

  // Verify dark theme applied
  await expect(page.locator('body')).toHaveClass('theme-dark');

  // Reload page
  await page.reload();

  // Verify theme persisted
  await expect(page.locator('body')).toHaveClass('theme-dark');
});

test('Pagination navigation', async ({ page }) => {
  await page.goto('/articles/');

  // Verify first page content
  await expect(page.locator('h1')).toContainText('Articles');
  await expect(page.locator('article')).toHaveCount(10);

  // Click next page
  await page.click('text=Next');
  await expect(page).toHaveURL('/articles/2/');

  // Verify second page content
  await expect(page.locator('article')).toHaveCount(10);

  // Click previous page
  await page.click('text=Previous');
  await expect(page).toHaveURL('/articles/');
});
```

Run Playwright tests:
```bash
# Generate baseline screenshots from production site
PLAYWRIGHT_BASE_URL=https://consultwithgriff.com npx playwright test --update-snapshots

# Test Astro migration against baseline
PLAYWRIGHT_BASE_URL=http://localhost:4321 npx playwright test

# Review visual differences
npx playwright show-report
```

**4. Performance Testing**:
- Measure Astro build time vs. Gridsome
- Run Lighthouse audits on key pages
- Compare Core Web Vitals (LCP, FID, CLS)
- Analyze bundle sizes with Astro vs. Gridsome
- Test page load times with network throttling

**5. SEO Validation**:
- Verify all meta tags (title, description, OpenGraph, Twitter Cards)
- Confirm canonical URLs are correct
- Validate structured data if present
- Test social media preview cards (Twitter, LinkedIn, Facebook)
- Check robots.txt and sitemap.xml accessibility
- Validate RSS feed format with feed validator

**6. Cross-Browser Testing**:
- Chrome/Chromium
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

**7. Accessibility Testing**:
- Run axe or WAVE accessibility scanner
- Test keyboard navigation (Tab, Enter, Escape)
- Verify ARIA labels and semantic HTML
- Test screen reader compatibility
- Check color contrast ratios

**Monitoring Metrics**:
- Content migration: 90/90 items migrated successfully
- Visual parity: 95%+ screenshot match rate
- Functional tests: 100% pass rate
- Performance: Equal or better than Gridsome
- SEO: All critical tags present and correct
- Accessibility: WCAG 2.1 AA compliance maintained

**Outputs**:
- Comprehensive test report with pass/fail status
- Visual regression report with diff images
- Performance comparison report
- List of identified issues requiring fixes

### 7. Modify Phase
**Objective**: Adjust for edge cases, fix issues, and optimize

**Modification Activities**:

**1. Content Adjustments**:
- Fix any posts with rendering issues (malformed markdown, broken embeds)
- Adjust image paths that don't resolve correctly
- Update frontmatter for posts with edge case schemas
- Fix any code blocks with syntax highlighting issues

**2. Visual Parity Fixes**:
- Adjust CSS to match exact spacing, fonts, and colors
- Fix any layout shifts or responsive breakpoint differences
- Correct any component styling mismatches (buttons, forms, cards)
- Ensure theme switcher transitions match original
- Fix any mobile menu or navigation differences

**3. Functional Bug Fixes**:
- Address search results ranking or display issues
- Fix pagination edge cases (first/last page, single page)
- Correct any routing or permalink issues
- Fix theme persistence edge cases
- Address any embed rendering problems (YouTube, Twitter, Gists)

**4. Performance Optimizations**:
- Optimize images (convert to WebP, add responsive sizes)
- Implement lazy loading for images and embeds
- Add preload hints for critical resources
- Optimize font loading strategy
- Minimize and compress assets
- Implement caching strategies

**5. SEO Refinements**:
- Add missing meta tags if discovered
- Optimize OpenGraph images for different platforms
- Ensure all internal links are correct
- Fix any broken or redirected links
- Add structured data (JSON-LD) if beneficial

**6. Accessibility Improvements**:
- Add missing ARIA labels
- Improve keyboard navigation focus indicators
- Enhance screen reader announcements
- Improve color contrast where needed
- Add skip navigation links

**7. Code Quality**:
- Refactor duplicate code into reusable components
- Add TypeScript types for better type safety
- Document component props and usage
- Clean up unused dependencies
- Optimize bundle size

**Decision Criteria**:
- Visual differences < 5% threshold
- All functional tests passing
- Performance equal or better than Gridsome
- Zero SEO regressions
- Accessibility maintained or improved

**Outputs**:
- Updated codebase with all fixes applied
- Documentation of changes made
- Updated test suite with new edge cases
- Performance optimization report

### 8. Conclude Phase
**Objective**: Deploy to production and verify success

**Final Validation**:

**1. Pre-Deployment Checklist**:
- [ ] All 85 blog posts migrated and tested
- [ ] All 5 documentation pages migrated and tested
- [ ] All components functional (search, pagination, theme, navigation)
- [ ] All 191+ redirects configured and tested
- [ ] RSS feed generating correctly
- [ ] Sitemap generating with correct exclusions
- [ ] Analytics tracking configured (Google Analytics)
- [ ] Social media metadata correct (OpenGraph, Twitter Cards)
- [ ] All images loading correctly
- [ ] All embeds rendering (YouTube, Twitter, Gists)
- [ ] All code blocks styled correctly
- [ ] Theme switcher working with persistence
- [ ] Mobile responsive design confirmed
- [ ] Cross-browser compatibility verified
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] Performance benchmarks met or exceeded
- [ ] Visual regression tests passing (95%+ match)
- [ ] Functional tests passing (100%)
- [ ] Build process successful and fast
- [ ] GitHub Actions workflow tested
- [ ] Rollback plan documented and ready

**2. Staging Deployment**:
- Deploy to Azure Static Web Apps staging slot
- Run full test suite against staging environment
- Perform manual smoke testing of critical paths
- Share staging URL with stakeholders for review
- Collect feedback and address any concerns

**3. Production Deployment**:
- Schedule deployment during low-traffic window
- Create backup of current Gridsome site
- Merge migration branch to master
- Trigger GitHub Actions deployment
- Monitor deployment logs for errors
- Verify build completes successfully

**4. Post-Deployment Verification**:
- Visit https://consultwithgriff.com and verify homepage loads
- Test 10-20 random blog posts
- Test search functionality
- Toggle theme and verify persistence
- Test navigation and pagination
- Verify RSS feed accessible at /rss.xml
- Check sitemap.xml loads correctly
- Test 10-20 redirect rules
- Monitor analytics for traffic restoration
- Check browser console for JavaScript errors
- Verify all social media preview cards work

**5. Monitoring Setup**:
- Enable Azure Static Web Apps monitoring
- Set up uptime monitoring (UptimeRobot, Pingdom, etc.)
- Configure error tracking (Sentry, LogRocket, etc.)
- Monitor Core Web Vitals in Google Search Console
- Track search impressions and CTR for SEO impact
- Monitor 404 errors for broken links
- Set up alerts for build failures or downtime

**6. Performance Baseline**:
- Record post-migration Lighthouse scores
- Document Core Web Vitals (LCP, FID, CLS)
- Measure average page load time
- Record build time and deployment duration
- Compare to pre-migration Gridsome metrics

**7. Stakeholder Communication**:
- Announce migration completion
- Share before/after performance metrics
- Document any user-facing changes (should be zero!)
- Provide feedback channels for issue reporting
- Celebrate successful migration!

**8. Documentation & Knowledge Transfer**:
- Update README with Astro development instructions
- Document build and deployment process
- Create content authoring guide for new posts
- Document component usage and customization
- Archive Gridsome codebase with migration notes

**Success Metrics**:
- ✅ Zero downtime during deployment
- ✅ 100% content preserved (90 items)
- ✅ 100% feature parity
- ✅ SEO rankings maintained or improved
- ✅ Performance equal or better
- ✅ User experience unchanged (1-for-1 migration achieved)
- ✅ Build time improved (no Docker requirement)
- ✅ Development experience improved (modern tooling)

**Rollback Plan** (if needed):
1. Revert GitHub repository to previous commit
2. Re-trigger deployment of Gridsome version
3. Verify Gridsome site is live and functional
4. Investigate and document issues
5. Fix issues in migration branch
6. Re-test and re-deploy when ready

**Conclusion Criteria Met When**:
- Production site is live at https://consultwithgriff.com
- All monitoring shows green status
- No critical issues reported within 24 hours
- Analytics show normal traffic patterns
- Search rankings stable or improving
- User feedback is positive or neutral
- Development team confident in new Astro setup

---

## Context & Circumstances

### Functional Job Aspects

**Content Volume & Complexity**:
- 85 blog posts with varied publication dates (2022-2024)
- 5 documentation pages for courses and consulting services
- Rich frontmatter schemas (title, date, permalink, description, summary, tags, categories, excerpt, timeToRead)
- Relative image paths requiring resolution (`./images/filename.jpg`)
- Multiple content types: technical tutorials, industry commentary, course materials, business pages

**Feature Requirements**:
- **Search**: Client-side full-text search with Fuse.js fuzzy matching across title and summary fields
- **Pagination**: Blog listing (10 posts/page), Tag archives (3 posts/page)
- **Tags**: Dynamic tag archive pages with filtering and pagination
- **Embeds**: YouTube videos, Twitter posts, GitHub Gists embedded via remark plugins
- **Syntax Highlighting**: Shiki with material-theme-palenight theme for code blocks
- **Theme Switching**: Light/dark mode toggle with localStorage persistence
- **RSS Feed**: XML feed of all posts with full metadata
- **Sitemap**: XML sitemap with specific page exclusions
- **Analytics**: Google Analytics tracking (G-G6TPE6V0YJ)
- **Social Metadata**: Twitter Cards (summary_large_image), OpenGraph with Previewify.app generated images

**Technical Architecture**:
- **Current**: Gridsome (Vue 2, GraphQL, static generation)
- **Target**: Astro (framework-agnostic, Content Collections, static generation)
- **Styling**: TailwindCSS with custom theme configuration, CSS variables for theming
- **Fonts**: Google Fonts (Nunito Sans, weights 400/700)
- **Deployment**: Azure Static Web Apps with GitHub Actions CI/CD

**SEO & Redirects**:
- 191+ redirect rules for legacy URLs (WordPress migration, old blog structure)
- Canonical URLs for all pages
- Custom permalinks for blog posts (e.g., `/signalr-transports-explained/`)
- Meta descriptions and titles for every page
- Structured social media previews

**Development Constraints**:
- Gridsome requires Docker for local development (Node version constraints)
- PostCSS 7 compatibility requirement for TailwindCSS
- Vue 2 end-of-life concerns
- GraphQL complexity for simple content queries
- Deprecated/unmaintained dependencies

### Emotional Job Aspects

**Confidence & Trust**:
- Need certainty that no content will be lost during migration
- Anxiety about breaking SEO rankings (professional reputation depends on traffic)
- Fear of introducing bugs that affect user experience
- Concern about downtime impacting consulting business pipeline
- Worry about unforeseen technical challenges derailing timeline

**Professional Identity**:
- Website represents personal brand as developer and consultant
- Content quality and site performance reflect professional competence
- Desire to demonstrate technical leadership by adopting modern tools
- Pride in maintaining clean, well-architected codebase
- Commitment to best practices and staying current with technology

**Efficiency & Productivity**:
- Frustration with Gridsome development experience (Docker requirement)
- Desire for simpler local development setup
- Want faster build times and easier content authoring
- Aspiration for better documentation and community support
- Hope for reduced maintenance burden long-term

**Risk Tolerance**:
- Low tolerance for user-facing changes or disruptions
- High attention to detail for visual and functional parity
- Preference for thorough testing and validation before deployment
- Willingness to invest time upfront to avoid issues later
- Conservative approach: "1-for-1" migration before enhancements

### Social Job Aspects

**Audience Expectations**:
- Regular readers expect consistent experience and reliable access to content
- Consulting clients evaluate competence based on website quality
- Community members reference specific blog posts via direct links
- Social media followers click through from shared post previews
- Email subscribers rely on RSS feed for new content notifications

**Professional Network**:
- Peers in developer community may scrutinize technology choices
- Opportunity to share migration experience and lessons learned
- Potential to write blog post about Gridsome→Astro migration
- Desire to recommend Astro to others based on successful experience
- Responsibility to maintain professional appearance for business credibility

**Search Engine Relationship**:
- Established trust with Google (rankings, indexed pages, backlinks)
- Concern about losing search visibility during/after migration
- Need to preserve link equity through proper redirects
- Expectation that site speed improvements may boost rankings
- Awareness that poor migration could damage years of SEO work

**Vendor/Platform Dependencies**:
- Azure Static Web Apps hosting relationship
- GitHub as code repository and CI/CD platform
- Previewify.app for social media image generation
- OneCal for consultation booking integration
- Google Analytics for traffic insights

---

## Success Criteria

The migration is successful when ALL of the following criteria are met:

### Content Preservation (Must-Have)
- ✅ All 85 blog posts accessible at correct URLs
- ✅ All 5 documentation pages accessible at correct URLs
- ✅ All frontmatter fields preserved (title, date, permalink, description, summary, tags, categories)
- ✅ All markdown content renders identically (headings, lists, links, emphasis)
- ✅ All images display correctly (relative paths resolved)
- ✅ All embedded content works (YouTube, Twitter, Gists)
- ✅ All code blocks have syntax highlighting with correct theme
- ✅ Reading time calculations match or are recalculated accurately
- ✅ All internal links resolve correctly
- ✅ All tags and categories preserved

### Feature Parity (Must-Have)
- ✅ Search functionality works identically (same results, keyboard shortcuts)
- ✅ Pagination works on blog listing (10 posts/page, correct page numbers)
- ✅ Pagination works on tag archives (3 posts/page)
- ✅ Theme switcher toggles between light/dark mode
- ✅ Theme preference persists in localStorage across sessions
- ✅ Navigation works on all devices (desktop, tablet, mobile)
- ✅ Mobile menu functions correctly
- ✅ RSS feed available at /rss.xml with all posts
- ✅ Sitemap available at /sitemap.xml with correct exclusions
- ✅ Google Analytics tracking active
- ✅ Social media metadata present on all pages

### Visual Parity (Must-Have)
- ✅ Homepage layout matches exactly
- ✅ Blog listing page layout matches exactly
- ✅ Individual post pages match exactly
- ✅ Tag archive pages match exactly
- ✅ Documentation pages match exactly
- ✅ Contact page matches exactly
- ✅ 404 page matches exactly
- ✅ Navigation/header matches exactly
- ✅ Footer matches exactly
- ✅ Theme switcher button positioned correctly
- ✅ Responsive breakpoints behave identically
- ✅ Typography (fonts, sizes, spacing) matches
- ✅ Colors (text, backgrounds, accents) match exactly
- ✅ Dark theme styling matches exactly
- ✅ Playwright visual regression tests pass at 95%+ match rate

### SEO Preservation (Must-Have)
- ✅ All 191+ redirect rules functional (legacy URLs → current URLs)
- ✅ Canonical URLs present and correct on all pages
- ✅ Meta titles match or improve
- ✅ Meta descriptions match or improve
- ✅ OpenGraph tags present and correct
- ✅ Twitter Card tags present and correct
- ✅ Previewify.app social images generate correctly
- ✅ Robots.txt accessible and correct
- ✅ Sitemap indexed by search engines
- ✅ No increase in 404 errors
- ✅ Search rankings stable within 2 weeks post-migration
- ✅ Google Search Console shows no critical errors

### Performance (Should-Have)
- ✅ Lighthouse Performance score ≥90 (current or better)
- ✅ Lighthouse SEO score = 100
- ✅ Lighthouse Accessibility score ≥90
- ✅ Lighthouse Best Practices score ≥90
- ✅ Largest Contentful Paint (LCP) <2.5s
- ✅ First Input Delay (FID) <100ms
- ✅ Cumulative Layout Shift (CLS) <0.1
- ✅ Build time equal to or faster than Gridsome
- ✅ Page load time equal to or faster than Gridsome
- ✅ Bundle size equal to or smaller than Gridsome

### Development Experience (Should-Have)
- ✅ Local development runs without Docker
- ✅ npm run develop works on first try
- ✅ Hot reload faster than Gridsome
- ✅ Build process straightforward and documented
- ✅ Content authoring process simple (markdown files)
- ✅ New post creation script functional
- ✅ Deployment pipeline reliable (GitHub Actions)
- ✅ TypeScript types available for better DX (optional but nice)

### Operational Requirements (Must-Have)
- ✅ Zero downtime during deployment
- ✅ Rollback plan documented and tested
- ✅ Monitoring configured (uptime, errors, analytics)
- ✅ Documentation updated (README, development guide)
- ✅ No critical errors in browser console
- ✅ No broken links detected
- ✅ Cross-browser compatibility maintained (Chrome, Firefox, Safari, Edge)
- ✅ Mobile responsiveness maintained (iOS Safari, Chrome Mobile)

### Business Continuity (Must-Have)
- ✅ Consulting booking link works (OneCal integration)
- ✅ Contact form functional
- ✅ Email newsletter signup works
- ✅ Social media links correct (YouTube, GitHub, Twitter, Mastodon, Instagram)
- ✅ Microsoft MVP badge displayed
- ✅ Traffic to site returns to normal within 24 hours
- ✅ No increase in user support requests or complaints

### Time & Effort Constraints
- ⏱️ Migration completed within 2-4 weeks
- ⏱️ Testing and validation completed within 1 week
- ⏱️ Total effort <80 hours
- ⏱️ Minimal disruption to regular content publishing

### Validation Methods
- **Automated Testing**: Playwright visual regression, functional tests, accessibility tests
- **Manual Testing**: Smoke testing of critical paths, cross-browser testing
- **Performance Testing**: Lighthouse audits, Core Web Vitals measurement
- **SEO Validation**: Google Search Console monitoring, redirect testing, meta tag verification
- **User Acceptance**: Live site comparison, stakeholder approval
- **Analytics Monitoring**: Traffic patterns, bounce rate, session duration

---

## Pain Points

### Current Problems with Gridsome

**1. Technology Deprecation**
- **Vue 2 End-of-Life**: Gridsome built on Vue 2, which reached EOL in December 2023
- **Gridsome Unmaintained**: Last significant update over 2 years ago, community declining
- **Security Vulnerabilities**: Outdated dependencies accumulating known CVEs
- **No Future Updates**: Bug fixes and feature requests unlikely to be addressed
- **Talent Pool Shrinking**: Harder to find developers familiar with Gridsome
- **Documentation Gaps**: Fewer resources and community answers available

**2. Development Experience Friction**
- **Docker Requirement**: Local development requires Docker due to Node version constraints
  - Slow container startup time
  - Additional complexity in onboarding new contributors
  - Resource overhead (memory, CPU)
  - Incompatibility with some development workflows
- **Slow Build Times**: GraphQL data layer adds overhead to build process
- **Hot Reload Issues**: Sometimes requires full rebuild for changes to appear
- **Complex Setup**: Multiple configuration files, GraphQL schema management
- **Limited Debugging**: Errors in GraphQL queries hard to trace

**3. Technical Debt Accumulation**
- **PostCSS 7 Constraint**: Stuck on older TailwindCSS version (`postcss7-compat`)
  - Can't use TailwindCSS 3+ features
  - Missing JIT mode benefits
  - Larger CSS bundles
- **Dependency Hell**: Pinned to specific outdated versions
  - Can't update to latest security patches
  - Incompatibility with modern tooling
  - Increasing divergence from ecosystem standards

**4. Complexity for Content-Focused Site**
- **GraphQL Overkill**: Complex data layer unnecessary for static markdown content
  - Steep learning curve for content authors
  - Additional abstraction layer to maintain
  - Verbose queries for simple data fetching
- **Plugin Ecosystem**: Limited compared to modern alternatives
  - Some plugins abandoned or poorly maintained
  - Need custom solutions for common features

**5. Performance Concerns**
- **Large JavaScript Bundle**: Vue 2 runtime + GraphQL client shipped to browser
- **Hydration Overhead**: Full app rehydration even for static content
- **Build Performance**: GraphQL layer processing slows down builds
- **Limited Optimization Options**: Fewer modern performance features (image optimization, partial hydration, etc.)

### Migration-Specific Challenges

**1. Content Preservation Risks**
- **Data Loss**: Fear of losing blog posts, images, or metadata during migration
- **Broken Links**: Internal links may break if routing changes
- **Image Path Issues**: Relative paths need careful handling
- **Frontmatter Compatibility**: Schema changes could corrupt metadata

**2. SEO Vulnerability**
- **Ranking Loss**: Any URL changes or redirect issues could harm search visibility
- **Link Equity**: 191+ redirects are critical for preserving backlink value
- **Indexing Delays**: Search engines may take time to re-crawl migrated site
- **Social Media Previews**: OpenGraph/Twitter Card implementation must match exactly

**3. Feature Replication Complexity**
- **Search Implementation**: Fuse.js integration with build-time index generation
- **Theme Switching**: Client-side JavaScript with localStorage persistence
- **Embed Plugins**: Need Astro equivalents for YouTube/Twitter/Gist embeds
- **Syntax Highlighting**: Exact color theme match (material-theme-palenight)
- **Pagination Logic**: Different implementations for blog (10/page) vs. tags (3/page)

**4. Visual Parity Difficulty**
- **CSS Precision**: Exact spacing, colors, typography must match
- **Component Behavior**: Interactive elements (search, theme toggle, mobile menu) must behave identically
- **Responsive Breakpoints**: Different frameworks handle breakpoints differently
- **Theme Variables**: CSS custom properties must be preserved
- **Font Loading**: FOUT/FOIT behavior must match

**5. Testing & Validation Burden**
- **Manual Testing**: 85 posts × multiple devices × multiple browsers = hundreds of test scenarios
- **Visual Regression**: Automated screenshot comparison needs careful threshold tuning
- **Redirect Validation**: 191+ rules need individual verification
- **Performance Testing**: Lighthouse scores, Core Web Vitals across multiple pages
- **Cross-Browser Testing**: Safari, Firefox, Edge, mobile browsers

**6. Time & Effort Investment**
- **Opportunity Cost**: Time spent migrating = time not writing content or serving clients
- **Learning Curve**: Even with documentation, Astro has concepts to learn
- **Unexpected Issues**: Edge cases and gotchas only discovered during migration
- **Validation Thoroughness**: Pressure to test exhaustively to avoid post-launch issues

**7. Deployment Risks**
- **Downtime**: Any deployment issues could take site offline
- **Rollback Complexity**: Need tested rollback plan if issues arise
- **DNS/CDN Issues**: Azure Static Web Apps behavior may differ with Astro
- **Build Pipeline**: GitHub Actions workflow needs updating and testing

### Workarounds Currently Employed

**1. Docker Development**
- Running entire development environment in containers
- Scripted setup to simplify container management
- Acceptance of slower development feedback loop

**2. PostCSS 7 Compatibility Mode**
- Using `@tailwindcss/postcss7-compat` package
- Manually configuring older PostCSS version
- Forgoing modern TailwindCSS features

**3. Dependency Pinning**
- Strict version locking in package.json
- Avoiding dependency updates to prevent breakage
- Manual security patch backports when critical

**4. Custom Plugin Development**
- Building custom solutions for features lacking good plugins
- Maintaining internal plugin code

**5. Extensive Documentation**
- Detailed setup guides to compensate for complex environment
- Troubleshooting docs for common issues
- Knowledge silos as only one person understands full system

### Unmet Needs

**1. Modern Development Experience**
- Simple local setup without Docker
- Fast hot reload and build times
- Modern tooling integration (latest TypeScript, ESLint, Prettier)
- Better error messages and debugging

**2. Long-Term Viability**
- Active project with regular updates
- Large, growing community
- Clear project roadmap
- Commercial backing or strong governance

**3. Performance Optimization**
- Smaller JavaScript bundles
- Partial hydration or islands architecture
- Modern image optimization
- Streaming SSR options

**4. Simplicity for Content**
- Direct file-system routing
- Simple content queries without GraphQL
- Minimal configuration for common use cases
- Easy content authoring workflow

**5. Flexibility for Future**
- Ability to add interactive components when needed
- Framework-agnostic (not locked into Vue 2)
- Easy integration with modern tools and services
- Clear upgrade path as technology evolves

---

## Competing Solutions

### Option 1: Stay on Gridsome (Do Nothing)

**Description**: Continue using current Gridsome setup, accepting limitations and technical debt.

**Pros**:
- ✅ Zero migration effort or risk
- ✅ Known system with established workflows
- ✅ Site currently functional and performant
- ✅ No learning curve
- ✅ No deployment risk or downtime

**Cons**:
- ❌ Vue 2 end-of-life security concerns
- ❌ Gridsome effectively abandoned (last update 2+ years ago)
- ❌ Stuck on PostCSS 7 / old TailwindCSS
- ❌ Requires Docker for local development
- ❌ Accumulating technical debt
- ❌ Dependency vulnerabilities unfixed
- ❌ Declining community support
- ❌ No access to modern web features
- ❌ Eventually forced migration becomes harder
- ❌ Professional reputation risk (outdated technology)

**Why This Falls Short**:
- **Technical Debt Compounds**: Waiting makes migration harder and more risky
- **Security Risk**: Known vulnerabilities with no patches
- **Opportunity Cost**: Missing performance and DX improvements
- **Future-Proofing**: Site becomes harder to maintain over time
- **Professional Image**: Running deprecated technology undermines credibility as modern developer

**Current Workarounds**:
- Docker development environment
- Dependency version pinning
- Manual security monitoring
- Custom plugin maintenance

### Option 2: Upgrade to Vue 3 + Vite

**Description**: Rebuild site using Vue 3 with Vite as build tool, similar architecture to Gridsome but modernized.

**Pros**:
- ✅ Stay in Vue ecosystem (familiar)
- ✅ Modern Vue 3 Composition API
- ✅ Fast Vite build tool
- ✅ Active ecosystem and community
- ✅ Can reuse some Vue components

**Cons**:
- ❌ Requires complete rewrite (not migration)
- ❌ Still need custom SSG solution (Vite doesn't provide this out of box)
- ❌ Complex routing and content management setup
- ❌ Need to build Content Collections-like system
- ❌ Need to configure markdown processing pipeline
- ❌ Need to implement page generation logic
- ❌ Larger JavaScript bundle than necessary
- ❌ More complex than needed for content-focused site
- ❌ Not optimized for static content delivery

**Why This Falls Short**:
- **Over-Engineering**: Vue 3 SPA framework is overkill for static blog
- **Implementation Burden**: Building SSG features from scratch is significant work
- **Performance Overhead**: Shipping full Vue runtime for static content
- **Missing Features**: No equivalent to Astro's Content Collections or islands

### Option 3: Migrate to Next.js

**Description**: Move to Next.js with App Router, using React instead of Vue.

**Pros**:
- ✅ Industry-leading framework with strong backing (Vercel)
- ✅ Excellent documentation and community
- ✅ Powerful features (ISR, middleware, API routes)
- ✅ Great image optimization
- ✅ Strong TypeScript support
- ✅ Regular updates and improvements

**Cons**:
- ❌ React learning curve (coming from Vue)
- ❌ More complex than needed for static blog
- ❌ Large JavaScript bundle (React runtime)
- ❌ Overkill for content-focused site
- ❌ All components need "use client" directive for interactivity
- ❌ App Router complexity for simple content routes
- ❌ Opinionated file structure
- ❌ Slower builds than Astro for static content
- ❌ Framework lock-in (React-only)

**Why This Falls Short**:
- **Complexity**: Next.js optimized for complex apps, not simple blogs
- **Bundle Size**: React runtime overhead unnecessary for mostly static content
- **Learning Curve**: Significant investment to learn React + Next.js ecosystem
- **Over-Powered**: Features like middleware, ISR, API routes unused

### Option 4: Migrate to Gatsby

**Description**: Move to Gatsby, another React-based SSG with GraphQL data layer.

**Pros**:
- ✅ Designed for static content sites
- ✅ Large plugin ecosystem
- ✅ GraphQL data layer (familiar concept)
- ✅ Good image optimization
- ✅ Strong Markdown support

**Cons**:
- ❌ Similar to Gridsome (GraphQL-based SSG)
- ❌ Declining popularity and momentum
- ❌ Slower builds than modern alternatives
- ❌ Complex plugin ecosystem
- ❌ Large JavaScript bundles
- ❌ GraphQL complexity for simple content
- ❌ React lock-in
- ❌ Uncertainty about long-term viability
- ❌ Build performance issues at scale

**Why This Falls Short**:
- **Similar Problems**: Gatsby shares many issues with Gridsome (complexity, GraphQL, bundle size)
- **Declining Momentum**: Community shrinking, Netlify layoffs affected Gatsby team
- **Not Modern**: Architecture from earlier SSG generation, not leveraging latest web platform features
- **Lateral Move**: Doesn't solve core problems, just changes framework

### Option 5: Migrate to Astro (Recommended)

**Description**: Move to Astro, a modern content-focused web framework with islands architecture and zero-JS-by-default approach.

**Pros**:
- ✅ **Content-First Design**: Built specifically for content-focused sites like blogs
- ✅ **Content Collections**: Purpose-built API for managing markdown content with type-safe schemas
- ✅ **Zero JavaScript by Default**: Only ship JS for interactive components (islands architecture)
- ✅ **Framework Agnostic**: Can use React, Vue, Svelte, or vanilla JS for interactive components
- ✅ **Excellent Performance**: Minimal JavaScript, fast page loads, great Lighthouse scores
- ✅ **Simple Routing**: File-based routing, easy to understand
- ✅ **Modern Tooling**: Vite-based, fast dev server, hot reload
- ✅ **No Docker Required**: Works with modern Node versions (16+)
- ✅ **Active Development**: Regular releases, strong community, venture-backed
- ✅ **Great Documentation**: Comprehensive guides, tutorials, and API docs
- ✅ **Easy Content Queries**: Simple `getCollection()` API replaces complex GraphQL
- ✅ **Markdown/MDX First-Class**: Excellent remark/rehype plugin support
- ✅ **Built-in Optimizations**: Image optimization, CSS scoping, asset handling
- ✅ **Static Generation**: Fast builds, static output compatible with any host
- ✅ **TailwindCSS Support**: First-class integration with latest TailwindCSS
- ✅ **Migration Path**: Can gradually migrate components, test incrementally

**Cons**:
- ⚠️ Learning Curve: New framework to learn (though well-documented)
- ⚠️ Migration Effort: Requires upfront time investment (2-4 weeks)
- ⚠️ Testing Burden: Need comprehensive validation to ensure parity
- ⚠️ Newer Framework: Less mature than Next.js (though rapidly growing)
- ⚠️ Component Migration: Vue components need rewriting (though simple)

**Why This Succeeds**:
- **Perfect Fit**: Astro designed specifically for content-focused sites
- **Performance**: Islands architecture delivers minimal JavaScript
- **Simplicity**: Content Collections API simpler than GraphQL
- **Modern**: Leverages latest web platform features
- **Future-Proof**: Active development, clear roadmap, strong backing
- **Flexibility**: Framework-agnostic, can use Vue if needed
- **Better DX**: Fast builds, no Docker, modern tooling
- **1-for-1 Migration Achievable**: Architecture supports exact feature parity

**Migration Strategy**:
1. Set up Astro project with Content Collections
2. Migrate markdown content (85 posts + 5 docs)
3. Convert layouts to Astro syntax
4. Rewrite components (or use Vue with `client:load`)
5. Configure remark plugins for embeds and syntax highlighting
6. Implement search (Fuse.js client-side)
7. Set up theme switcher (client-side JS)
8. Configure RSS and sitemap
9. Migrate redirects to Azure Static Web Apps config
10. Test thoroughly with Playwright
11. Deploy to production

**Key Differentiators**:
- **Content Collections > GraphQL**: Type-safe, simple API for content
- **Islands > Full Hydration**: Only hydrate interactive components
- **Framework Agnostic > React Lock-in**: Use any UI framework or none
- **Zero JS Default > Large Bundles**: Opt-in to JavaScript
- **Vite > Webpack**: Fast builds and dev server

### Option 6: Migrate to Hugo or Jekyll

**Description**: Move to Hugo (Go) or Jekyll (Ruby) static site generators.

**Pros**:
- ✅ Extremely fast builds (especially Hugo)
- ✅ Simple, template-based
- ✅ Zero JavaScript runtime
- ✅ Long-established, stable

**Cons**:
- ❌ Limited interactivity (search, theme switcher require custom JS)
- ❌ Older architecture and conventions
- ❌ Limited modern web features
- ❌ Requires learning templating language (Go templates, Liquid)
- ❌ Less flexible component model
- ❌ Hugo uses Go, Jekyll uses Ruby (different ecosystems)
- ❌ Plugin ecosystems not as rich for modern web dev

**Why This Falls Short**:
- **Interactivity Challenges**: Building search and theme switcher more difficult
- **Modern Features**: Missing islands architecture, Content Collections API
- **Developer Experience**: Older tooling, not as refined as modern frameworks
- **Ecosystem**: Not as aligned with modern JavaScript development

---

## Detailed Migration Mapping: Gridsome → Astro

### 1. Content Collections (replaces GraphQL)

**Gridsome Approach**:
```javascript
// gridsome.config.js
module.exports = {
  transformers: {
    remark: {}
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: './blog/**/*.md',
      }
    }
  ]
}
```

```graphql
# Query in component
query {
  allPost(sortBy: "date", order: DESC) {
    edges {
      node {
        id
        title
        date
        path
      }
    }
  }
}
```

**Astro Equivalent**:
```typescript
// src/content/config.ts
import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
      title: z.string(),
      date: z.coerce.date(),
      permalink: z.string().optional(),
      description: z.string(),
      summary: z.string(),
      tags: z.array(z.string()),
      categories: z.array(z.string()),
    })
  })
};
```

```astro
---
// Query in component
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
const sorted = posts.sort((a, b) => b.data.date - a.data.date);
---
```

**Benefits**:
- ✅ Type-safe schemas with Zod
- ✅ Simpler API (no GraphQL complexity)
- ✅ Better TypeScript inference
- ✅ Faster builds (no GraphQL layer overhead)

### 2. Remark Plugin Configuration

**Gridsome Setup**:
```javascript
// gridsome.config.js
module.exports = {
  transformers: {
    remark: {
      plugins: [
        ['gridsome-plugin-remark-youtube', { width: '500px' }],
        ['gridsome-plugin-remark-twitter'],
        ['@noxify/gridsome-plugin-remark-embed', {
          enabledProviders: ['Youtube', 'Twitter', 'Gist']
        }],
        ['gridsome-plugin-remark-shiki', {
          theme: 'material-theme-palenight',
          skipInline: false
        }],
        ['remark-external-links', {
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer']
        }]
      ]
    }
  }
}
```

**Astro Equivalent**:
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import remarkEmbedder from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';
import { remarkExtendedTable } from 'remark-extended-table';
import remarkExternalLinks from 'remark-external-links';

export default defineConfig({
  markdown: {
    remarkPlugins: [
      [remarkEmbedder, {
        transformers: [oembedTransformer]
      }],
      [remarkExternalLinks, {
        target: '_blank',
        rel: ['nofollow', 'noopener', 'noreferrer']
      }]
    ],
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: false
    }
  }
});
```

**Migration Notes**:
- YouTube/Twitter embeds: Use `@remark-embedder/core` or custom plugin
- Gist embeds: May need custom remark plugin
- Syntax highlighting: Astro has built-in Shiki support
- External links: Direct remark plugin support

### 3. Routing & Dynamic Pages

**Gridsome - Individual Post**:
```vue
<!-- src/templates/Post.vue -->
<template>
  <Layout>
    <h1>{{ $page.post.title }}</h1>
    <VueRemarkContent />
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    title
    content
    date
  }
}
</page-query>
```

**Astro Equivalent**:
```astro
---
// src/pages/[...slug].astro
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.data.permalink || post.id },
    props: { post }
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---
<h1>{post.data.title}</h1>
<Content />
```

**Benefits**:
- ✅ File-based routing (clearer structure)
- ✅ `getStaticPaths()` more explicit than templates
- ✅ No separate query syntax to learn
- ✅ Better TypeScript support

### 4. Pagination

**Gridsome Pagination**:
```vue
<!-- src/pages/Articles.vue -->
<template>
  <Layout>
    <div v-for="post in $page.posts.edges" :key="post.node.id">
      <h2>{{ post.node.title }}</h2>
    </div>
    <Pager :info="$page.posts.pageInfo" />
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allPost (perPage: 10, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
      }
    }
  }
}
</page-query>
```

**Astro Equivalent**:
```astro
---
// src/pages/articles/[...page].astro
import { getCollection } from 'astro:content';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths = (async ({ paginate }) => {
  const posts = await getCollection('blog');
  return paginate(posts, { pageSize: 10 });
}) satisfies GetStaticPaths;

const { page } = Astro.props;
---
{page.data.map(post => (
  <h2>{post.data.title}</h2>
))}
<nav>
  {page.url.prev && <a href={page.url.prev}>Previous</a>}
  {page.url.next && <a href={page.url.next}>Next</a>}
</nav>
```

**Benefits**:
- ✅ Built-in `paginate()` helper
- ✅ Auto-generates pagination routes
- ✅ Clear `page` prop structure
- ✅ Easy access to prev/next URLs

### 5. Component Migration

**Gridsome Vue Component**:
```vue
<!-- src/components/ThemeSwitcher.vue -->
<template>
  <button @click="toggleTheme">
    <component :is="icon" />
  </button>
</template>

<script>
export default {
  data() {
    return {
      theme: 'light'
    }
  },
  computed: {
    icon() {
      return this.theme === 'dark' ? 'SunIcon' : 'MoonIcon'
    }
  },
  mounted() {
    this.theme = localStorage.getItem('theme') || 'light'
    document.body.className = `theme-${this.theme}`
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', this.theme)
      document.body.className = `theme-${this.theme}`
    }
  }
}
</script>
```

**Astro Equivalent (with client-side JS)**:
```astro
---
// src/components/ThemeSwitcher.astro
---
<button id="theme-toggle">
  <span id="icon"></span>
</button>

<script>
  const button = document.getElementById('theme-toggle');
  const icon = document.getElementById('icon');

  let theme = localStorage.getItem('theme') || 'light';
  document.body.className = `theme-${theme}`;
  icon.textContent = theme === 'dark' ? '☀️' : '🌙';

  button.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    document.body.className = `theme-${theme}`;
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
</script>
```

**Alternative (Vue in Astro with `client:load`)**:
```astro
---
// src/components/ThemeSwitcher.astro
import ThemeSwitcherVue from './ThemeSwitcher.vue';
---
<ThemeSwitcherVue client:load />
```

**Benefits**:
- ✅ Vanilla JS = smaller bundle
- ✅ OR reuse Vue component if preferred
- ✅ `client:load` directive for hydration control
- ✅ Islands architecture = less JavaScript

### 6. Layouts

**Gridsome Layout**:
```vue
<!-- src/layouts/Default.vue -->
<template>
  <div>
    <header>
      <g-link to="/">Home</g-link>
    </header>
    <main>
      <slot />
    </main>
    <footer>© 2024</footer>
  </div>
</template>
```

**Astro Equivalent**:
```astro
---
// src/layouts/Default.astro
---
<html>
  <head>
    <slot name="head" />
  </head>
  <body>
    <header>
      <a href="/">Home</a>
    </header>
    <main>
      <slot />
    </main>
    <footer>© 2024</footer>
  </body>
</html>
```

**Benefits**:
- ✅ Full HTML document control
- ✅ Named slots for flexibility
- ✅ Simpler syntax (no special components like `g-link`)

### 7. Search Implementation

**Gridsome Search**:
```vue
<!-- src/components/SearchInput.vue -->
<template>
  <div>
    <input v-model="query" @input="search" />
    <div v-if="results.length">
      <a v-for="result in results" :key="result.id" :href="result.path">
        {{ result.title }}
      </a>
    </div>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import axios from 'axios'

export default {
  data() {
    return {
      query: '',
      results: [],
      fuse: null
    }
  },
  async mounted() {
    const { data } = await axios.get('/search.json')
    this.fuse = new Fuse(data, {
      keys: ['title', 'summary'],
      threshold: 0.5
    })
  },
  methods: {
    search() {
      if (!this.query || !this.fuse) return
      this.results = this.fuse.search(this.query).slice(0, 5)
    }
  }
}
</script>
```

**Astro Equivalent (vanilla JS)**:
```astro
---
// src/components/SearchInput.astro
---
<div>
  <input id="search" type="search" />
  <div id="results"></div>
</div>

<script>
  import Fuse from 'fuse.js';

  let fuse;
  const searchInput = document.getElementById('search');
  const resultsDiv = document.getElementById('results');

  // Load search index
  fetch('/search.json')
    .then(res => res.json())
    .then(data => {
      fuse = new Fuse(data, {
        keys: ['title', 'summary'],
        threshold: 0.5
      });
    });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (!query || !fuse) {
      resultsDiv.innerHTML = '';
      return;
    }

    const results = fuse.search(query).slice(0, 5);
    resultsDiv.innerHTML = results.map(r => `
      <a href="/${r.item.path}/">${r.item.title}</a>
    `).join('');
  });
</script>
```

**Search Index Generation (Astro)**:
```typescript
// src/utils/generateSearchIndex.ts - Called during build
import { getCollection } from 'astro:content';
import fs from 'fs/promises';

export async function generateSearchIndex() {
  const posts = await getCollection('blog');
  const searchData = posts.map(p => ({
    title: p.data.title,
    summary: p.data.summary,
    path: p.data.permalink || p.id
  }));

  await fs.writeFile(
    './public/search.json',
    JSON.stringify(searchData)
  );
}
```

### 8. RSS Feed

**Gridsome RSS**:
```javascript
// gridsome.config.js
module.exports = {
  plugins: [
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'My Blog',
          feed_url: 'https://site.com/rss.xml',
          site_url: 'https://site.com'
        }
      }
    }
  ]
}
```

**Astro RSS**:
```typescript
// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'My Blog',
    description: 'Blog description',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.summary,
      link: `/${post.id}/`,
      pubDate: post.data.date,
    }))
  });
}
```

### 9. Deployment Configuration

**Gridsome GitHub Actions**:
```yaml
- name: Install Gridsome CLI
  run: npm install -g @gridsome/cli
- name: Install dependencies
  run: yarn install
- name: Build
  run: gridsome build
```

**Astro GitHub Actions**:
```yaml
- name: Setup Node
  uses: actions/setup-node@v3
  with:
    node-version: '20'
- name: Install dependencies
  run: yarn install
- name: Build
  run: yarn build
```

**Key Difference**: No Docker required, no global CLI tool needed!

---

## Validation Strategy with Playwright

### Test Coverage

**Visual Regression Tests**:
- Capture baseline screenshots from https://consultwithgriff.com
- Compare Astro migration against baselines
- Test all page types: homepage, blog listing, individual posts, tag archives, docs, contact, 404
- Test multiple viewports: mobile (375px), tablet (768px), desktop (1920px)
- Test both light and dark themes
- Threshold: <5% pixel difference acceptable

**Functional Tests**:
- Search: query input, results display, keyboard shortcuts (/, Escape), result links
- Pagination: navigation (prev/next), page numbers, correct post counts
- Theme switcher: toggle behavior, localStorage persistence, theme application
- Navigation: menu links, mobile hamburger, responsive behavior
- Embeds: YouTube videos load, Twitter posts embed, Gists display
- Code blocks: syntax highlighting applied, correct theme colors
- Forms: contact form submission (if applicable)

**Content Validation**:
- All 85 blog posts accessible (status 200)
- All 5 documentation pages accessible
- All images load (no 404s)
- All internal links resolve (no broken links)
- RSS feed valid XML
- Sitemap valid XML with correct URLs

**SEO Tests**:
- Meta titles present on all pages
- Meta descriptions present on all pages
- OpenGraph tags correct
- Twitter Card tags correct
- Canonical URLs correct
- Robots.txt accessible

**Performance Tests**:
- Lighthouse audits on key pages (homepage, blog listing, sample post)
- Core Web Vitals measurement (LCP, FID, CLS)
- Bundle size comparison

### Sample Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4321',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Conclusion

This JTBD document provides a comprehensive blueprint for migrating Kevin W. Griffin's consulting website from Gridsome to Astro. The migration addresses critical pain points (Vue 2 EOL, Gridsome deprecation, technical debt) while achieving complete feature parity.

### Key Success Factors:

1. **Clear Objectives**: 1-for-1 migration preserving all 85 posts, 5 docs, features, and SEO value
2. **Systematic Approach**: 8-phase job map from Define through Conclude
3. **Risk Mitigation**: Comprehensive testing with Playwright, rollback plan, validation at every step
4. **Technology Fit**: Astro purpose-built for content-focused sites like this
5. **Performance Gains**: Islands architecture, zero-JS-by-default, modern build tooling
6. **Developer Experience**: No Docker, fast builds, simple Content Collections API
7. **Future-Proofing**: Active development, strong community, framework-agnostic flexibility

### Expected Outcomes:

- ✅ **Content Preserved**: 100% of posts and pages migrated
- ✅ **Feature Parity**: All functionality replicated exactly
- ✅ **Visual Match**: 95%+ screenshot similarity via Playwright
- ✅ **SEO Maintained**: All 191+ redirects, meta tags, and rankings preserved
- ✅ **Performance Improved**: Smaller bundles, faster loads, better Core Web Vitals
- ✅ **DX Enhanced**: No Docker, faster builds, simpler development
- ✅ **Future-Ready**: Modern tech stack with clear upgrade path

### Timeline:
- **Weeks 1-2**: Setup, content migration, component development
- **Week 3**: Testing, validation, refinement
- **Week 4**: Deployment, monitoring, documentation

This migration transforms technical debt into technical advantage while maintaining the exact user experience and business continuity that Kevin's consulting practice depends on.

---

**Document Version**: 1.0
**Last Updated**: November 9, 2025
**Status**: Ready for Implementation
**Next Step**: Begin Define Phase with detailed feature inventory
