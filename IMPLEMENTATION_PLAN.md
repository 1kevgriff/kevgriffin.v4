# Gridsome to Astro Migration: Implementation Plan

**Project**: Complete 1-for-1 Migration from Gridsome to Astro
**Timeline**: 4 weeks (80 hours total effort)
**Current Site**: https://consultwithgriff.com
**Status**: Ready to Execute Phase 3 (Prepare)
**Last Updated**: November 9, 2025

---

## Executive Summary

This implementation plan translates the comprehensive JTBD document into actionable tasks for executing the Gridsome to Astro migration. The plan follows the 8-phase Job Map structure and provides detailed task breakdowns, time estimates, dependencies, and acceptance criteria.

### Project Scope
- **Content**: 85 blog posts + 5 documentation pages
- **Components**: 1 layout, 4 templates, 4 pages, 5 components
- **Features**: Search, pagination, theme switching, RSS, sitemap, 191+ redirects
- **Target**: 100% feature parity with zero visual differences

### Timeline Overview
- **Week 1**: Setup & Prototype (Phases 3-4)
- **Week 2**: Content & Component Migration (Phase 5)
- **Week 3**: Testing & Refinement (Phases 6-7)
- **Week 4**: Deployment & Validation (Phase 8)

### Key Milestones
- ✅ **M0**: JTBD Document Complete (Phases 1-2) - DONE
- 🎯 **M1**: Astro Project Setup Complete (Phase 3) - Week 1, Day 3
- 🎯 **M2**: Prototype Validated (Phase 4) - Week 1, Day 7
- 🎯 **M3**: Full Migration Complete (Phase 5) - Week 2, Day 14
- 🎯 **M4**: Testing Complete (Phase 6) - Week 3, Day 19
- 🎯 **M5**: Production Ready (Phase 7) - Week 3, Day 21
- 🎯 **M6**: Live Deployment (Phase 8) - Week 4, Day 28

### Resource Requirements
- **Developer Time**: 80 hours (full-time: 2 weeks, part-time: 4 weeks)
- **Tools**: Node.js 20+, Astro CLI, Playwright, Git, VS Code
- **Services**: Azure Static Web Apps, GitHub Actions
- **Budget**: $0 (all open-source tools, existing hosting)

---

## Phase Status Overview

| Phase | Status | Duration | Completion |
|-------|--------|----------|------------|
| 1. Define | ✅ COMPLETE | 8 hours | 100% |
| 2. Locate | ✅ COMPLETE | 8 hours | 100% |
| 3. Prepare | 🎯 NEXT | 12 hours | 0% |
| 4. Confirm | ⏳ PENDING | 8 hours | 0% |
| 5. Execute | ⏳ PENDING | 24 hours | 0% |
| 6. Monitor | ⏳ PENDING | 12 hours | 0% |
| 7. Modify | ⏳ PENDING | 8 hours | 0% |
| 8. Conclude | ⏳ PENDING | 4 hours | 0% |

**Legend**: ✅ Complete | 🎯 Current/Next | ⏳ Pending | ❌ Blocked

---

## Phase 1: Define (COMPLETED ✅)

**Duration**: 8 hours
**Status**: ✅ COMPLETE
**Completion Date**: November 9, 2025

### Completed Tasks

✅ **T1.1: Audit Current Architecture** (3 hours)
- Analyzed Gridsome codebase structure
- Documented 85 blog posts with frontmatter schemas
- Cataloged 5 documentation pages
- Mapped all Vue components (layouts, templates, pages, components)
- Identified all plugins and dependencies

✅ **T1.2: Research Astro Architecture** (3 hours)
- Used Context7 to research Astro Content Collections
- Studied Astro routing and pagination patterns
- Researched remark/rehype plugin ecosystem
- Identified Astro equivalents for Gridsome features

✅ **T1.3: Create JTBD Document** (2 hours)
- Wrote comprehensive 23,000+ word JTBD
- Defined core job statement and job map
- Documented context, success criteria, pain points
- Analyzed competing solutions
- Created detailed migration mapping

### Deliverables
- ✅ JTBD.md (23,000+ words)
- ✅ Complete codebase analysis
- ✅ Astro documentation research notes

---

## Phase 2: Locate (COMPLETED ✅)

**Duration**: 8 hours (completed during Phase 1)
**Status**: ✅ COMPLETE
**Completion Date**: November 9, 2025

### Completed Tasks

✅ **T2.1: Inventory Content Assets** (2 hours)
- Located all 85 blog posts in `/blog/`
- Located all 5 documentation pages in `/docs/`
- Documented frontmatter schemas for both collections
- Identified relative image paths and external embeds

✅ **T2.2: Catalog Component Architecture** (2 hours)
- Mapped Default.vue layout structure
- Documented all 4 templates (Post, Tag, Documentation, Redirect)
- Cataloged all 4 pages (Index, Articles, Contact, 404)
- Listed all 5 components (SearchInput, Pagination, ThemeSwitcher, SearchFocus)

✅ **T2.3: Document Plugin Ecosystem** (2 hours)
- Identified YouTube embed plugin
- Identified Twitter embed plugin
- Identified Gist embed plugin
- Documented Shiki syntax highlighting configuration
- Listed external link handling requirements

✅ **T2.4: Map Styling System** (1 hour)
- Documented TailwindCSS configuration
- Identified custom theme variables (light/dark modes)
- Located Google Fonts configuration
- Found GitHub markdown styles integration

✅ **T2.5: Document Integrations** (1 hour)
- Located Fuse.js search implementation
- Found RSS feed configuration
- Identified sitemap settings
- Documented Google Analytics setup
- Found 191+ redirect rules in staticwebapp.config.json

### Deliverables
- ✅ Complete content inventory (90 items)
- ✅ Component architecture map
- ✅ Plugin requirements list
- ✅ Styling system documentation
- ✅ Integration specifications

---

## Phase 3: Prepare (NEXT 🎯)

**Duration**: 12 hours (3 days part-time)
**Status**: 🎯 READY TO START
**Target Completion**: Week 1, Day 3

### Overview
Set up the Astro project environment with all necessary dependencies, configurations, and tooling. This phase creates the foundation for the migration without touching existing Gridsome code.

### Tasks

#### T3.1: Initialize Astro Project (2 hours)

**Description**: Create new Astro project in a separate directory for safe parallel development.

**Steps**:
1. Create new directory: `kevgriffin.v4-astro`
2. Run `npm create astro@latest`
3. Choose options:
   - Template: Empty
   - TypeScript: Yes (strict)
   - Install dependencies: Yes
   - Git: Yes (new repository or branch)
4. Verify dev server runs: `npm run dev`
5. Verify build works: `npm run build`

**Acceptance Criteria**:
- ✅ Astro project initializes without errors
- ✅ Dev server runs on http://localhost:4321
- ✅ Build produces `dist/` directory
- ✅ No console errors in browser

**Time Estimate**: 2 hours
**Dependencies**: None
**Output**: Working Astro project skeleton

---

#### T3.2: Configure Content Collections (3 hours)

**Description**: Set up Content Collections for blog posts and documentation with proper schemas matching current frontmatter.

**Steps**:
1. Create `src/content/config.ts`
2. Define `blog` collection schema:
   ```typescript
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
   ```
3. Define `docs` collection schema:
   ```typescript
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
   ```
4. Export collections: `export const collections = { blog, docs };`
5. Create directory structure:
   - `src/content/blog/`
   - `src/content/docs/`
6. Copy 3 sample posts to test schema validation
7. Run build to verify schema works

**Acceptance Criteria**:
- ✅ Content Collections configuration compiles without errors
- ✅ Schema validation works on sample posts
- ✅ TypeScript types generated for collection entries
- ✅ `getCollection('blog')` returns expected structure

**Time Estimate**: 3 hours
**Dependencies**: T3.1
**Output**: Working Content Collections with validated schemas

---

#### T3.3: Install and Configure Remark Plugins (2 hours)

**Description**: Set up remark/rehype plugins for markdown processing to match Gridsome functionality.

**Steps**:
1. Install dependencies:
   ```bash
   npm install remark-gfm remark-frontmatter remark-external-links
   npm install @remark-embedder/core @remark-embedder/transformer-oembed
   npm install rehype-shiki
   ```

2. Configure in `astro.config.mjs`:
   ```javascript
   import { defineConfig } from 'astro/config';
   import remarkEmbedder from '@remark-embedder/core';
   import oembedTransformer from '@remark-embedder/transformer-oembed';
   import remarkExternalLinks from 'remark-external-links';
   import remarkGfm from 'remark-gfm';

   export default defineConfig({
     markdown: {
       remarkPlugins: [
         remarkGfm,
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

3. Test with sample post containing:
   - YouTube embed
   - Code block
   - External link

**Acceptance Criteria**:
- ✅ YouTube embeds render correctly
- ✅ Code blocks have syntax highlighting with correct theme
- ✅ External links have proper target and rel attributes
- ✅ No console errors during markdown processing

**Time Estimate**: 2 hours
**Dependencies**: T3.2
**Output**: Configured remark plugin pipeline

---

#### T3.4: Configure TailwindCSS (2 hours)

**Description**: Set up TailwindCSS with custom configuration matching current Gridsome theme.

**Steps**:
1. Install TailwindCSS:
   ```bash
   npx astro add tailwind
   ```

2. Copy `tailwind.config.js` from Gridsome project

3. Migrate custom theme configuration:
   ```javascript
   module.exports = {
     theme: {
       extend: {
         spacing: {
           '80': '20rem',
           '108': '27rem',
         },
         borderWidth: {
           '14': '14px',
         },
       },
     },
   }
   ```

4. Copy `src/css/main.css` from Gridsome

5. Add CSS variables for theme switching:
   ```css
   .theme-light {
     --bg-background-primary: white;
     --text-copy-primary: #2d3748;
     /* ... */
   }
   .theme-dark {
     --bg-background-primary: #0D2438;
     --text-copy-primary: #cbd5e0;
     /* ... */
   }
   ```

6. Import in layout:
   ```astro
   ---
   import '../css/main.css';
   ---
   ```

7. Test theme classes apply correctly

**Acceptance Criteria**:
- ✅ TailwindCSS compiles without errors
- ✅ Custom spacing and border utilities available
- ✅ Theme variables accessible in components
- ✅ CSS output minified in production build

**Time Estimate**: 2 hours
**Dependencies**: T3.1
**Output**: Configured TailwindCSS with custom theme

---

#### T3.5: Configure Google Fonts (30 minutes)

**Description**: Set up Nunito Sans font matching current site.

**Steps**:
1. Install Astro Font:
   ```bash
   npm install astro-font
   ```

2. Configure in `astro.config.mjs`:
   ```javascript
   import { defineConfig } from 'astro/config';
   import AstroFont from 'astro-font';

   export default defineConfig({
     integrations: [
       AstroFont({
         config: [
           {
             name: 'Nunito Sans',
             src: [
               {
                 weight: '400',
                 style: 'normal',
                 url: 'https://fonts.gstatic.com/...',
               },
               {
                 weight: '700',
                 style: 'normal',
                 url: 'https://fonts.gstatic.com/...',
               },
             ],
             preload: true,
             display: 'swap',
             selector: 'body',
             fallback: 'sans-serif',
           },
         ],
       }),
     ],
   });
   ```

3. Test font loads and displays correctly

**Acceptance Criteria**:
- ✅ Nunito Sans loads with weights 400 and 700
- ✅ Font displays with `swap` strategy (no FOIT)
- ✅ Font preloaded for performance
- ✅ Fallback to sans-serif if font fails

**Time Estimate**: 30 minutes
**Dependencies**: T3.4
**Output**: Configured Google Fonts integration

---

#### T3.6: Set Up Project Tooling (1 hour)

**Description**: Configure development tooling for consistent code quality.

**Steps**:
1. Configure Prettier:
   ```json
   {
     "semi": true,
     "singleQuote": true,
     "tabWidth": 2,
     "trailingComma": "es5",
     "plugins": ["prettier-plugin-astro"]
   }
   ```

2. Configure ESLint:
   ```json
   {
     "extends": [
       "eslint:recommended",
       "plugin:astro/recommended"
     ]
   }
   ```

3. Add npm scripts to `package.json`:
   ```json
   {
     "scripts": {
       "dev": "astro dev",
       "build": "astro build",
       "preview": "astro preview",
       "format": "prettier --write .",
       "lint": "eslint ."
     }
   }
   ```

4. Create `.gitignore`:
   ```
   node_modules/
   dist/
   .astro/
   .env
   ```

**Acceptance Criteria**:
- ✅ Prettier formats code consistently
- ✅ ESLint catches common errors
- ✅ npm scripts work correctly
- ✅ Git ignores build artifacts

**Time Estimate**: 1 hour
**Dependencies**: T3.1
**Output**: Configured development tooling

---

#### T3.7: Create Migration Scripts (1.5 hours)

**Description**: Build utility scripts to help with content migration and validation.

**Steps**:
1. Create `scripts/migrate-content.js`:
   - Copies markdown files from Gridsome to Astro
   - Validates frontmatter against schemas
   - Logs any issues

2. Create `scripts/validate-images.js`:
   - Checks all image paths in markdown
   - Verifies images exist
   - Reports broken links

3. Create `scripts/generate-search-index.js`:
   - Extracts title and summary from all posts
   - Generates `/public/search.json`
   - Runs during build process

4. Add to `package.json`:
   ```json
   {
     "scripts": {
       "migrate": "node scripts/migrate-content.js",
       "validate": "node scripts/validate-images.js"
     }
   }
   ```

**Acceptance Criteria**:
- ✅ Migration script successfully copies files
- ✅ Validation script reports all issues
- ✅ Search index script generates valid JSON
- ✅ Scripts provide clear console output

**Time Estimate**: 1.5 hours
**Dependencies**: T3.2
**Output**: Migration and validation scripts

---

### Phase 3 Deliverables
- ✅ Initialized Astro project with TypeScript
- ✅ Configured Content Collections with schemas
- ✅ Installed and configured remark plugins
- ✅ Set up TailwindCSS with custom theme
- ✅ Configured Google Fonts (Nunito Sans)
- ✅ Configured development tooling
- ✅ Created migration utility scripts

### Phase 3 Decision Point
**Go/No-Go Criteria**:
- ✅ Astro dev server runs without errors
- ✅ Content Collections schema validates sample posts
- ✅ Remark plugins process markdown correctly
- ✅ TailwindCSS compiles and theme variables work
- ✅ Build process completes successfully

**If No-Go**: Review and resolve configuration issues before proceeding to Phase 4

---

## Phase 4: Confirm (Prototype & Validation)

**Duration**: 8 hours (4 days part-time)
**Status**: ⏳ PENDING
**Target Completion**: Week 1, Day 7
**Prerequisites**: Phase 3 complete

### Overview
Create a working prototype with 3-5 sample posts to validate the migration approach. Set up Playwright testing framework and capture baseline screenshots from the live site.

### Tasks

#### T4.1: Migrate Sample Content (1.5 hours)

**Description**: Migrate 3-5 representative blog posts to test Content Collections.

**Steps**:
1. Select 5 diverse posts:
   - Post with YouTube embed
   - Post with Twitter embed
   - Post with code blocks and syntax highlighting
   - Post with images
   - Post with custom permalink

2. Run migration script:
   ```bash
   npm run migrate -- --sample
   ```

3. Verify frontmatter validates against schema

4. Check markdown renders correctly:
   - Embeds work
   - Code highlighting correct
   - Images display
   - Links work

5. Test with `getCollection('blog')`

**Acceptance Criteria**:
- ✅ All 5 posts migrate without schema errors
- ✅ Embeds render correctly (YouTube, Twitter)
- ✅ Code blocks have correct syntax highlighting
- ✅ Images display with correct paths
- ✅ Custom permalinks work

**Time Estimate**: 1.5 hours
**Dependencies**: T3.2, T3.3, T3.7
**Output**: 5 migrated sample posts

---

#### T4.2: Build Homepage Prototype (2 hours)

**Description**: Create homepage with layout and latest post showcase.

**Steps**:
1. Create `src/layouts/Default.astro`:
   - HTML structure
   - Header with navigation
   - Main content area with `<slot />`
   - Footer with social links
   - Import TailwindCSS

2. Create `src/pages/index.astro`:
   ```astro
   ---
   import { getCollection } from 'astro:content';
   import DefaultLayout from '../layouts/Default.astro';

   const posts = await getCollection('blog');
   const latestPost = posts.sort((a, b) =>
     new Date(b.data.date) - new Date(a.data.date)
   )[0];
   ---
   <DefaultLayout title="Kevin W. Griffin">
     <section class="hero">
       <img src="/kevin_rockon.jpg" alt="Kevin W. Griffin">
       <h1>Kevin W. Griffin</h1>
       <p>Developer, Training, Entrepreneur</p>
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
   </DefaultLayout>
   ```

3. Copy hero image to `public/`

4. Test homepage renders correctly

**Acceptance Criteria**:
- ✅ Layout structure matches Gridsome version
- ✅ Navigation links render
- ✅ Latest post displays correctly
- ✅ Hero image loads
- ✅ Footer social links work

**Time Estimate**: 2 hours
**Dependencies**: T4.1
**Output**: Working homepage prototype

---

#### T4.3: Build Blog Post Template (2 hours)

**Description**: Create individual blog post page with full metadata.

**Steps**:
1. Create `src/pages/[...slug].astro`:
   ```astro
   ---
   import { getCollection, render } from 'astro:content';
   import DefaultLayout from '../layouts/Default.astro';

   export async function getStaticPaths() {
     const posts = await getCollection('blog');
     return posts.map(post => ({
       params: { slug: post.data.permalink || post.id },
       props: { post }
     }));
   }

   const { post } = Astro.props;
   const { Content } = await render(post);

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

2. Copy GitHub markdown styles CSS

3. Test with sample posts

**Acceptance Criteria**:
- ✅ Post content renders correctly
- ✅ All metadata displays (title, date, reading time)
- ✅ OpenGraph and Twitter Card tags present
- ✅ Canonical URL correct
- ✅ Tags link to tag archives
- ✅ Back to articles link works

**Time Estimate**: 2 hours
**Dependencies**: T4.1, T4.2
**Output**: Working blog post template

---

#### T4.4: Build Search Component Prototype (1.5 hours)

**Description**: Implement basic client-side search with Fuse.js.

**Steps**:
1. Install Fuse.js:
   ```bash
   npm install fuse.js
   ```

2. Create `src/components/SearchInput.astro`:
   ```astro
   ---
   ---
   <div id="search-container">
     <input id="search-input" type="search" placeholder="Search articles..." />
     <div id="search-results" style="display: none;"></div>
   </div>

   <script>
     import Fuse from 'fuse.js';

     let fuse;
     const searchInput = document.getElementById('search-input');
     const resultsDiv = document.getElementById('search-results');

     fetch('/search.json')
       .then(res => res.json())
       .then(data => {
         fuse = new Fuse(data, {
           keys: ['title', 'summary'],
           threshold: 0.5,
         });
       });

     searchInput.addEventListener('input', (e) => {
       const query = e.target.value;
       if (!query || !fuse) {
         resultsDiv.style.display = 'none';
         return;
       }

       const results = fuse.search(query).slice(0, 5);
       if (results.length > 0) {
         resultsDiv.innerHTML = results.map(r => `
           <a href="/${r.item.path}/">
             <h4>${r.item.title}</h4>
             <p>${r.item.summary}</p>
           </a>
         `).join('');
         resultsDiv.style.display = 'block';
       }
     });

     document.addEventListener('keydown', (e) => {
       if (e.key === '/' && document.activeElement !== searchInput) {
         e.preventDefault();
         searchInput.focus();
       }
       if (e.key === 'Escape') {
         resultsDiv.style.display = 'none';
       }
     });
   </script>

   <style>
     /* Search styling */
   </style>
   ```

3. Run search index generation script

4. Add to layout header

5. Test search functionality:
   - Type query
   - Verify results display
   - Test "/" keyboard shortcut
   - Test Escape key

**Acceptance Criteria**:
- ✅ Search index generates correctly
- ✅ Search results display on input
- ✅ "/" keyboard shortcut focuses input
- ✅ Escape hides results
- ✅ Results link to correct posts

**Time Estimate**: 1.5 hours
**Dependencies**: T4.2, T3.7
**Output**: Working search component

---

#### T4.5: Set Up Playwright Testing (1 hour)

**Description**: Install and configure Playwright for visual regression testing.

**Steps**:
1. Install Playwright:
   ```bash
   npm install -D @playwright/test
   npx playwright install
   ```

2. Create `playwright.config.ts`:
   ```typescript
   import { defineConfig, devices } from '@playwright/test';

   export default defineConfig({
     testDir: './tests',
     fullyParallel: true,
     retries: 2,
     reporter: 'html',
     use: {
       baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4321',
       screenshot: 'only-on-failure',
       trace: 'on-first-retry',
     },
     projects: [
       {
         name: 'chromium',
         use: { ...devices['Desktop Chrome'] },
       },
       {
         name: 'Mobile Chrome',
         use: { ...devices['Pixel 5'] },
       },
     ],
     webServer: {
       command: 'npm run dev',
       url: 'http://localhost:4321',
       reuseExistingServer: true,
     },
   });
   ```

3. Create `tests/` directory

4. Add npm scripts:
   ```json
   {
     "scripts": {
       "test": "playwright test",
       "test:ui": "playwright test --ui"
     }
   }
   ```

5. Verify Playwright runs:
   ```bash
   npm run test
   ```

**Acceptance Criteria**:
- ✅ Playwright installs without errors
- ✅ Configuration loads correctly
- ✅ Test runner starts successfully
- ✅ Can run empty test suite

**Time Estimate**: 1 hour
**Dependencies**: T4.3
**Output**: Configured Playwright testing framework

---

#### T4.6: Capture Baseline Screenshots (1.5 hours)

**Description**: Take reference screenshots from live https://consultwithgriff.com site.

**Steps**:
1. Create `tests/baselines.spec.ts`:
   ```typescript
   import { test, expect } from '@playwright/test';

   const pages = [
     { name: 'Homepage', url: '/' },
     { name: 'Sample Post 1', url: '/signalr-transports-explained/' },
     { name: 'Sample Post 2', url: '/azure-functions-host-error/' },
   ];

   const viewports = [
     { name: 'Desktop', width: 1920, height: 1080 },
     { name: 'Mobile', width: 375, height: 667 },
   ];

   for (const page of pages) {
     for (const viewport of viewports) {
       test(`${page.name} - ${viewport.name}`, async ({ page: pw }) => {
         await pw.setViewportSize({ width: viewport.width, height: viewport.height });
         await pw.goto(page.url);
         await pw.waitForLoadState('networkidle');
         await expect(pw).toHaveScreenshot(`${page.name}-${viewport.name}.png`, {
           fullPage: true,
         });
       });
     }
   }
   ```

2. Run against live site:
   ```bash
   PLAYWRIGHT_BASE_URL=https://consultwithgriff.com npm run test -- --update-snapshots
   ```

3. Verify screenshots captured in `tests/baselines.spec.ts-snapshots/`

4. Commit baseline screenshots to git

**Acceptance Criteria**:
- ✅ Baseline screenshots captured for all pages
- ✅ Both desktop and mobile viewports captured
- ✅ Screenshots include full page (scroll)
- ✅ No errors during capture

**Time Estimate**: 1.5 hours
**Dependencies**: T4.5
**Output**: Baseline screenshots for visual regression

---

### Phase 4 Deliverables
- ✅ 5 sample blog posts migrated and rendering
- ✅ Working homepage with latest post
- ✅ Working blog post template with metadata
- ✅ Functional search component
- ✅ Configured Playwright testing framework
- ✅ Baseline screenshots from live site

### Phase 4 Decision Point
**Go/No-Go Criteria**:
- ✅ Sample posts render identically to Gridsome
- ✅ Embeds (YouTube, Twitter) work correctly
- ✅ Search returns expected results
- ✅ Visual comparison shows <5% difference
- ✅ No blocking technical issues discovered

**If No-Go**: Address issues, refine approach, update JTBD if major changes needed

---

## Phase 5: Execute (Full Migration)

**Duration**: 24 hours (10 days part-time)
**Status**: ⏳ PENDING
**Target Completion**: Week 2, Day 14
**Prerequisites**: Phase 4 complete and validated

### Overview
Migrate all content, convert all components, implement all features. This is the bulk of the implementation work.

### Tasks

#### T5.1: Migrate All Blog Posts (4 hours)

**Description**: Migrate remaining 80 blog posts from Gridsome to Astro.

**Steps**:
1. Run full migration script:
   ```bash
   npm run migrate -- --all
   ```

2. Validate all frontmatter:
   ```bash
   npm run validate
   ```

3. Fix any schema validation errors

4. Verify all posts accessible via `getCollection('blog')`

5. Spot-check 10 random posts for rendering issues

6. Test posts with:
   - YouTube embeds (5 posts)
   - Twitter embeds (5 posts)
   - Gist embeds (3 posts)
   - Heavy code blocks (5 posts)
   - Images (10 posts)

**Acceptance Criteria**:
- ✅ All 85 posts migrated successfully
- ✅ Zero schema validation errors
- ✅ All embeds render correctly
- ✅ All images display
- ✅ All code blocks have syntax highlighting

**Time Estimate**: 4 hours
**Dependencies**: T4.1
**Output**: 85 migrated blog posts

---

#### T5.2: Migrate Documentation Pages (1 hour)

**Description**: Migrate 5 documentation pages to Astro.

**Steps**:
1. Copy docs from `/docs/` to `src/content/docs/`:
   - Consulting.md
   - Courses.md
   - SignalR-Mastery.md
   - Training.md
   - Coasters.md

2. Validate frontmatter against docs schema

3. Create `src/pages/[...docs].astro` template:
   ```astro
   ---
   import { getCollection, render } from 'astro:content';
   import DefaultLayout from '../layouts/Default.astro';

   export async function getStaticPaths() {
     const docs = await getCollection('docs');
     return docs.map(doc => ({
       params: { docs: doc.data.permalink || doc.id },
       props: { doc }
     }));
   }

   const { doc } = Astro.props;
   const { Content } = await render(doc);
   ---
   <DefaultLayout title={doc.data.title}>
     <article class="markdown-body">
       <Content />
     </article>
   </DefaultLayout>
   ```

4. Test all 5 docs pages render correctly

**Acceptance Criteria**:
- ✅ All 5 docs pages migrated
- ✅ Frontmatter validates correctly
- ✅ Custom permalinks work
- ✅ Content renders with markdown styles

**Time Estimate**: 1 hour
**Dependencies**: T5.1
**Output**: 5 migrated documentation pages

---

#### T5.3: Build Blog Listing with Pagination (2 hours)

**Description**: Create paginated blog listing page.

**Steps**:
1. Create `src/pages/articles/[...page].astro`:
   ```astro
   ---
   import { getCollection } from 'astro:content';
   import type { GetStaticPaths } from 'astro';
   import DefaultLayout from '../../layouts/Default.astro';
   import PaginationPosts from '../../components/PaginationPosts.astro';

   export const getStaticPaths = (async ({ paginate }) => {
     const posts = await getCollection('blog');
     const sorted = posts.sort((a, b) =>
       new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
     );
     return paginate(sorted, { pageSize: 10 });
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
           <p>{post.data.excerpt || post.data.summary}</p>
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

2. Create `src/components/PaginationPosts.astro`:
   ```astro
   ---
   interface Props {
     base: string;
     totalPages: number;
     currentPage: number;
   }

   const { base, totalPages, currentPage } = Astro.props;

   const prevUrl = currentPage > 1
     ? currentPage === 2 ? base : `${base}/${currentPage - 1}/`
     : null;

   const nextUrl = currentPage < totalPages
     ? `${base}/${currentPage + 1}/`
     : null;
   ---
   <nav class="pagination">
     {prevUrl && <a href={prevUrl}>← Previous</a>}
     <span>Page {currentPage} of {totalPages}</span>
     {nextUrl && <a href={nextUrl}>Next →</a>}
   </nav>
   ```

3. Test pagination:
   - Navigate to /articles/
   - Click next/previous
   - Verify correct posts per page (10)
   - Check page numbers correct

**Acceptance Criteria**:
- ✅ Blog listing shows 10 posts per page
- ✅ Pagination links work correctly
- ✅ Posts sorted by date (newest first)
- ✅ Page numbers display correctly
- ✅ First and last pages handle edge cases

**Time Estimate**: 2 hours
**Dependencies**: T5.1
**Output**: Paginated blog listing

---

#### T5.4: Build Tag Archive Pages (2 hours)

**Description**: Create dynamic tag archive pages with pagination.

**Steps**:
1. Create `src/pages/article-tags/[tag]/[...page].astro`:
   ```astro
   ---
   import { getCollection } from 'astro:content';
   import type { GetStaticPaths } from 'astro';
   import DefaultLayout from '../../../layouts/Default.astro';
   import PaginationPosts from '../../../components/PaginationPosts.astro';

   export const getStaticPaths = (async ({ paginate }) => {
     const posts = await getCollection('blog');
     const allTags = [...new Set(posts.flatMap(p => p.data.tags))];

     return allTags.flatMap(tag => {
       const tagPosts = posts
         .filter(p => p.data.tags.includes(tag))
         .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

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

2. Test tag pages:
   - Click tags from blog posts
   - Verify filtered posts correct
   - Test pagination (3 per page)

**Acceptance Criteria**:
- ✅ Tag pages generate for all unique tags
- ✅ Posts filtered correctly by tag
- ✅ Pagination shows 3 posts per page
- ✅ Tag links work from blog posts

**Time Estimate**: 2 hours
**Dependencies**: T5.1, T5.3
**Output**: Dynamic tag archive pages

---

#### T5.5: Build Theme Switcher (1.5 hours)

**Description**: Implement light/dark theme toggle with localStorage.

**Steps**:
1. Create `src/components/ThemeSwitcher.astro`:
   ```astro
   ---
   ---
   <button id="theme-toggle" aria-label="Toggle theme">
     <svg id="sun-icon" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
       <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
     </svg>
     <svg id="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
       <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
     </svg>
   </button>

   <script>
     const button = document.getElementById('theme-toggle');
     const sunIcon = document.getElementById('sun-icon');
     const moonIcon = document.getElementById('moon-icon');
     const body = document.body;

     // Initialize from localStorage
     let theme = localStorage.getItem('theme') || 'light';
     body.className = `theme-${theme}`;

     if (theme === 'dark') {
       sunIcon?.classList.remove('hidden');
       moonIcon?.classList.add('hidden');
     }

     // Toggle theme
     button?.addEventListener('click', () => {
       const isDark = body.className === 'theme-dark';
       theme = isDark ? 'light' : 'dark';

       body.className = `theme-${theme}`;
       localStorage.setItem('theme', theme);

       sunIcon?.classList.toggle('hidden');
       moonIcon?.classList.toggle('hidden');
     });
   </script>

   <style>
     #theme-toggle {
       /* Button styling */
     }
     #theme-toggle svg {
       width: 1.5rem;
       height: 1.5rem;
     }
   </style>
   ```

2. Add to layout header

3. Test theme switching:
   - Click button
   - Verify dark theme applies
   - Refresh page
   - Verify theme persists

**Acceptance Criteria**:
- ✅ Theme toggles on button click
- ✅ Theme persists in localStorage
- ✅ Theme applies on page load
- ✅ Icons swap correctly (sun/moon)
- ✅ CSS variables update

**Time Estimate**: 1.5 hours
**Dependencies**: T4.2
**Output**: Working theme switcher

---

#### T5.6: Build Contact Page (1 hour)

**Description**: Create contact page with form and social links.

**Steps**:
1. Create `src/pages/contact.astro`:
   ```astro
   ---
   import DefaultLayout from '../layouts/Default.astro';
   ---
   <DefaultLayout title="Contact">
     <h1>Contact Me</h1>

     <p>Get in touch for consulting, training, or speaking engagements.</p>

     <!-- Contact form or email link -->
     <div class="contact-info">
       <p>Email: <a href="mailto:kevin@consultwithgriff.com">kevin@consultwithgriff.com</a></p>
       <p>Book a consultation: <a href="https://onecal.io/consultwithgriff" target="_blank" rel="noopener">OneCal</a></p>
     </div>

     <div class="social-links">
       <a href="https://youtube.com/@consultwithgriff" target="_blank" rel="noopener">YouTube</a>
       <a href="https://github.com/1kevgriff" target="_blank" rel="noopener">GitHub</a>
       <a href="https://twitter.com/1kevgriff" target="_blank" rel="noopener">Twitter</a>
     </div>
   </DefaultLayout>
   ```

2. Copy contact page content from Gridsome

3. Test all links work

**Acceptance Criteria**:
- ✅ Contact page renders correctly
- ✅ Email link works
- ✅ OneCal booking link works
- ✅ Social media links correct

**Time Estimate**: 1 hour
**Dependencies**: T4.2
**Output**: Contact page

---

#### T5.7: Build 404 Page (30 minutes)

**Description**: Create custom 404 error page.

**Steps**:
1. Create `src/pages/404.astro`:
   ```astro
   ---
   import DefaultLayout from '../layouts/Default.astro';
   ---
   <DefaultLayout title="Page Not Found">
     <h1>404: Page Not Found</h1>
     <p>Sorry, the page you're looking for doesn't exist.</p>
     <a href="/">← Go home</a>
   </DefaultLayout>
   ```

2. Test 404 page with invalid URL

**Acceptance Criteria**:
- ✅ 404 page renders for invalid URLs
- ✅ Home link works

**Time Estimate**: 30 minutes
**Dependencies**: T4.2
**Output**: Custom 404 page

---

#### T5.8: Implement RSS Feed (1 hour)

**Description**: Generate RSS feed for all blog posts.

**Steps**:
1. Install RSS integration:
   ```bash
   npx astro add rss
   ```

2. Create `src/pages/rss.xml.ts`:
   ```typescript
   import rss from '@astrojs/rss';
   import { getCollection } from 'astro:content';

   export async function GET(context) {
     const posts = await getCollection('blog');
     const sorted = posts.sort((a, b) =>
       new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
     );

     return rss({
       title: 'Kevin W. Griffin | Developer, Training, Entrepreneur',
       description: 'Articles on software development, .NET, Azure, and consulting',
       site: context.site || 'https://consultwithgriff.com',
       items: sorted.map(post => ({
         title: post.data.title,
         description: post.data.summary,
         link: `/${post.data.permalink || post.id}/`,
         pubDate: new Date(post.data.date),
         author: 'Kevin W. Griffin',
       })),
     });
   }
   ```

3. Test RSS feed:
   - Visit /rss.xml
   - Validate XML format
   - Check all posts present

**Acceptance Criteria**:
- ✅ RSS feed generates at /rss.xml
- ✅ Valid XML format
- ✅ All posts included
- ✅ Metadata correct (title, description, date)

**Time Estimate**: 1 hour
**Dependencies**: T5.1
**Output**: RSS feed at /rss.xml

---

#### T5.9: Implement Sitemap (1 hour)

**Description**: Generate XML sitemap with exclusions.

**Steps**:
1. Install sitemap integration:
   ```bash
   npx astro add sitemap
   ```

2. Configure in `astro.config.mjs`:
   ```javascript
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

3. Build and verify sitemap:
   ```bash
   npm run build
   ```

4. Check `dist/sitemap-index.xml` and `dist/sitemap-0.xml`

**Acceptance Criteria**:
- ✅ Sitemap generates at /sitemap-index.xml
- ✅ Excluded pages not in sitemap
- ✅ All blog posts and docs included
- ✅ Valid XML format

**Time Estimate**: 1 hour
**Dependencies**: T5.1, T5.2
**Output**: XML sitemap with exclusions

---

#### T5.10: Configure Redirects (2 hours)

**Description**: Migrate all 191+ redirect rules to Azure Static Web Apps config.

**Steps**:
1. Copy `staticwebapp.config.json` from Gridsome project to `public/`

2. Verify all redirect rules present:
   - `/blog*` → `/`
   - `/shows/*` → `/`
   - `/tag*` → `/`
   - `/page/*` → `/`
   - `/author/*` → `/`
   - `/wp-content/*` → `/`
   - All 191+ specific post redirects

3. Test sample redirects:
   - Visit 10-20 old URLs
   - Verify redirect to correct destination
   - Check status code (301)

**Acceptance Criteria**:
- ✅ All 191+ redirects configured
- ✅ Sample redirects tested and working
- ✅ 301 status codes correct
- ✅ 404 fallback works

**Time Estimate**: 2 hours
**Dependencies**: None (static config)
**Output**: Complete redirect configuration

---

#### T5.11: Integrate Google Analytics (30 minutes)

**Description**: Add Google Analytics tracking.

**Steps**:
1. Install Partytown (for better performance):
   ```bash
   npx astro add partytown
   ```

2. Add GA script to layout:
   ```astro
   ---
   // src/layouts/Default.astro
   ---
   <html>
     <head>
       <!-- Google Analytics -->
       <script type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=G-G6TPE6V0YJ"></script>
       <script type="text/partytown">
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', 'G-G6TPE6V0YJ');
       </script>
     </head>
     <body>
       <!-- ... -->
     </body>
   </html>
   ```

3. Test analytics:
   - Visit pages in dev
   - Check network tab for GA requests
   - Verify tracking ID correct

**Acceptance Criteria**:
- ✅ GA script loads correctly
- ✅ Tracking ID matches (G-G6TPE6V0YJ)
- ✅ Page views tracked
- ✅ Partytown offloads to web worker

**Time Estimate**: 30 minutes
**Dependencies**: T4.2
**Output**: Google Analytics integration

---

#### T5.12: Finalize Layout and Navigation (2 hours)

**Description**: Complete header, footer, and navigation matching Gridsome.

**Steps**:
1. Update `src/layouts/Default.astro` header:
   - Logo/title
   - Navigation: Consulting, Articles, Courses, Contact
   - Book a Consultation link (OneCal)
   - Mobile hamburger menu
   - Search input
   - Theme switcher

2. Update footer:
   - Social links: Email, YouTube, GitHub, Twitter, Mastodon, Instagram
   - Microsoft MVP badge
   - Copyright notice

3. Add mobile menu functionality:
   ```astro
   <button id="mobile-menu-toggle">☰</button>
   <nav id="mobile-menu" class="hidden">
     <!-- Navigation links -->
   </nav>

   <script>
     const toggle = document.getElementById('mobile-menu-toggle');
     const menu = document.getElementById('mobile-menu');

     toggle?.addEventListener('click', () => {
       menu?.classList.toggle('hidden');
     });
   </script>
   ```

4. Test responsive behavior

**Acceptance Criteria**:
- ✅ Header matches Gridsome layout
- ✅ Navigation links work
- ✅ Mobile menu toggles correctly
- ✅ Footer social links correct
- ✅ MVP badge displays

**Time Estimate**: 2 hours
**Dependencies**: T4.2, T4.4, T5.5
**Output**: Complete layout with navigation

---

#### T5.13: Copy Static Assets (1 hour)

**Description**: Copy all static assets from Gridsome project.

**Steps**:
1. Copy from Gridsome `static/` to Astro `public/`:
   - Images (hero image, MVP badge, etc.)
   - Favicon and icons
   - Any PDFs or downloadable files
   - robots.txt (if exists)

2. Update image paths in components if needed

3. Verify all assets accessible

**Acceptance Criteria**:
- ✅ All static assets copied
- ✅ Images display correctly
- ✅ Favicon loads
- ✅ No 404s for assets

**Time Estimate**: 1 hour
**Dependencies**: None
**Output**: All static assets in place

---

#### T5.14: Update Deployment Configuration (1.5 hours)

**Description**: Configure GitHub Actions for Astro deployment.

**Steps**:
1. Update `.github/workflows/azure-static-web-apps.yml`:
   ```yaml
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
       name: Build and Deploy
       steps:
         - uses: actions/checkout@v3
           with:
             submodules: true

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '20'

         - name: Install dependencies
           run: npm ci

         - name: Build Astro site
           run: npm run build

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

2. Test workflow:
   - Commit to feature branch
   - Verify workflow runs
   - Check build succeeds

**Acceptance Criteria**:
- ✅ GitHub Actions workflow updated
- ✅ Build step uses `npm run build`
- ✅ Output location set to `dist`
- ✅ Test build succeeds

**Time Estimate**: 1.5 hours
**Dependencies**: All previous tasks
**Output**: Updated deployment workflow

---

### Phase 5 Deliverables
- ✅ All 85 blog posts migrated
- ✅ All 5 documentation pages migrated
- ✅ Complete layout with navigation
- ✅ Paginated blog listing
- ✅ Tag archive pages
- ✅ Working search functionality
- ✅ Theme switcher
- ✅ Contact and 404 pages
- ✅ RSS feed
- ✅ Sitemap with exclusions
- ✅ All 191+ redirects configured
- ✅ Google Analytics integrated
- ✅ All static assets in place
- ✅ Deployment workflow configured

### Phase 5 Decision Point
**Go/No-Go Criteria**:
- ✅ All content accessible
- ✅ All features functional
- ✅ Build completes without errors
- ✅ No critical bugs identified
- ✅ Visual spot-check passes

**If No-Go**: Fix critical issues before proceeding to testing phase

---

## Phase 6: Monitor (Testing & Validation)

**Duration**: 12 hours (5 days part-time)
**Status**: ⏳ PENDING
**Target Completion**: Week 3, Day 19
**Prerequisites**: Phase 5 complete

### Overview
Comprehensive testing to validate 1-for-1 migration. Run visual regression tests, functional tests, content validation, SEO checks, and performance benchmarks.

### Tasks

#### T6.1: Run Visual Regression Tests (3 hours)

**Description**: Execute Playwright visual regression tests against baseline.

**Steps**:
1. Update Playwright tests to cover all page types:
   ```typescript
   // tests/visual-regression.spec.ts
   const pages = [
     { name: 'Homepage', url: '/' },
     { name: 'Blog Listing Page 1', url: '/articles/' },
     { name: 'Blog Listing Page 2', url: '/articles/2/' },
     { name: 'Sample Post 1', url: '/signalr-transports-explained/' },
     { name: 'Sample Post 2', url: '/azure-functions-host-error/' },
     { name: 'Sample Post 3', url: '/entity-framework-migrations/' },
     { name: 'Tag Archive - Azure', url: '/article-tags/azure/' },
     { name: 'Tag Archive - .NET', url: '/article-tags/dotnet/' },
     { name: 'Documentation - Consulting', url: '/consulting/' },
     { name: 'Documentation - Courses', url: '/courses/' },
     { name: 'Contact', url: '/contact/' },
     { name: '404', url: '/non-existent-page/' },
   ];

   const viewports = [
     { name: 'Desktop', width: 1920, height: 1080 },
     { name: 'Tablet', width: 768, height: 1024 },
     { name: 'Mobile', width: 375, height: 667 },
   ];

   for (const page of pages) {
     for (const viewport of viewports) {
       test(`${page.name} - ${viewport.name} - Light`, async ({ page: pw }) => {
         await pw.setViewportSize(viewport);
         await pw.goto(page.url);
         await pw.waitForLoadState('networkidle');
         await expect(pw).toHaveScreenshot({
           fullPage: true,
           maxDiffPixels: 100,
         });
       });

       test(`${page.name} - ${viewport.name} - Dark`, async ({ page: pw }) => {
         await pw.setViewportSize(viewport);
         await pw.goto(page.url);
         await pw.evaluate(() => {
           document.body.className = 'theme-dark';
           localStorage.setItem('theme', 'dark');
         });
         await pw.waitForLoadState('networkidle');
         await expect(pw).toHaveScreenshot({
           fullPage: true,
           maxDiffPixels: 100,
         });
       });
     }
   }
   ```

2. Run tests:
   ```bash
   npm run test
   ```

3. Review test results:
   ```bash
   npx playwright show-report
   ```

4. Document any visual differences:
   - Screenshot each diff
   - Note acceptable vs. unacceptable differences
   - Create issues for fixes needed

**Acceptance Criteria**:
- ✅ All tests run without errors
- ✅ Visual differences <5% threshold
- ✅ All viewports tested (desktop, tablet, mobile)
- ✅ Both themes tested (light, dark)
- ✅ Test report generated

**Time Estimate**: 3 hours
**Dependencies**: T5.14
**Output**: Visual regression test report with diff images

---

#### T6.2: Execute Functional Tests (3 hours)

**Description**: Test all interactive features work correctly.

**Steps**:
1. Create functional test suite:
   ```typescript
   // tests/functional.spec.ts
   import { test, expect } from '@playwright/test';

   test('Search functionality', async ({ page }) => {
     await page.goto('/');

     // Test keyboard shortcut
     await page.keyboard.press('/');
     await expect(page.locator('#search-input')).toBeFocused();

     // Type search query
     await page.fill('#search-input', 'Azure');
     await page.waitForTimeout(500); // Debounce

     // Verify results appear
     await expect(page.locator('#search-results')).toBeVisible();
     await expect(page.locator('#search-results a')).toHaveCount(5, { timeout: 2000 });

     // Test escape key
     await page.keyboard.press('Escape');
     await expect(page.locator('#search-results')).toBeHidden();
   });

   test('Theme switcher persistence', async ({ page }) => {
     await page.goto('/');

     // Toggle to dark theme
     await page.click('#theme-toggle');
     await expect(page.locator('body')).toHaveClass('theme-dark');

     // Reload page
     await page.reload();

     // Verify theme persisted
     await expect(page.locator('body')).toHaveClass('theme-dark');

     // Toggle back to light
     await page.click('#theme-toggle');
     await expect(page.locator('body')).toHaveClass('theme-light');
   });

   test('Blog pagination navigation', async ({ page }) => {
     await page.goto('/articles/');

     // Verify first page
     await expect(page.locator('h1')).toContainText('Articles');
     await expect(page.locator('article')).toHaveCount(10);

     // Click next page
     await page.click('text=Next');
     await expect(page).toHaveURL('/articles/2/');
     await expect(page.locator('article')).toHaveCount(10);

     // Click previous page
     await page.click('text=Previous');
     await expect(page).toHaveURL('/articles/');
   });

   test('Tag archive filtering', async ({ page }) => {
     // Go to a blog post
     await page.goto('/signalr-transports-explained/');

     // Click a tag
     await page.click('text=SignalR');
     await expect(page).toHaveURL(/\/article-tags\/signalr/);

     // Verify filtered posts
     await expect(page.locator('h1')).toContainText('signalr');
     await expect(page.locator('article')).toHaveCountGreaterThan(0);
   });

   test('Mobile menu toggle', async ({ page }) => {
     await page.setViewportSize({ width: 375, height: 667 });
     await page.goto('/');

     // Verify menu hidden initially
     await expect(page.locator('#mobile-menu')).toBeHidden();

     // Click hamburger
     await page.click('#mobile-menu-toggle');
     await expect(page.locator('#mobile-menu')).toBeVisible();

     // Click again to close
     await page.click('#mobile-menu-toggle');
     await expect(page.locator('#mobile-menu')).toBeHidden();
   });

   test('YouTube embed renders', async ({ page }) => {
     // Find a post with YouTube embed
     await page.goto('/post-with-youtube/'); // Replace with actual post

     // Verify iframe present
     await expect(page.locator('iframe[src*="youtube.com"]')).toBeVisible();
   });

   test('Code block syntax highlighting', async ({ page }) => {
     // Find a post with code blocks
     await page.goto('/post-with-code/'); // Replace with actual post

     // Verify Shiki classes present
     await expect(page.locator('.shiki')).toBeVisible();
   });
   ```

2. Run functional tests:
   ```bash
   npm run test tests/functional.spec.ts
   ```

3. Review results and document failures

**Acceptance Criteria**:
- ✅ All functional tests pass
- ✅ Search returns correct results
- ✅ Theme switcher persists state
- ✅ Pagination navigates correctly
- ✅ Tag filtering works
- ✅ Mobile menu toggles
- ✅ Embeds render correctly

**Time Estimate**: 3 hours
**Dependencies**: T5.14
**Output**: Functional test suite with pass/fail report

---

#### T6.3: Validate All Content Accessible (2 hours)

**Description**: Verify all 90 content items are accessible and render correctly.

**Steps**:
1. Create content validation script:
   ```javascript
   // scripts/validate-content.js
   import { getCollection } from 'astro:content';
   import fs from 'fs/promises';

   const posts = await getCollection('blog');
   const docs = await getCollection('docs');

   console.log(`\n📊 Content Validation Report`);
   console.log(`============================\n`);

   // Validate blog posts
   console.log(`Blog Posts: ${posts.length}/85`);
   const missingPosts = 85 - posts.length;
   if (missingPosts > 0) {
     console.error(`❌ Missing ${missingPosts} blog posts`);
   } else {
     console.log(`✅ All blog posts present`);
   }

   // Check for schema errors
   let schemaErrors = 0;
   for (const post of posts) {
     try {
       // Validate required fields
       if (!post.data.title) schemaErrors++;
       if (!post.data.date) schemaErrors++;
       if (!post.data.summary) schemaErrors++;
       if (!post.data.tags || post.data.tags.length === 0) schemaErrors++;
     } catch (error) {
       schemaErrors++;
     }
   }

   console.log(`Schema Errors: ${schemaErrors}`);
   if (schemaErrors === 0) {
     console.log(`✅ All posts have valid frontmatter`);
   } else {
     console.error(`❌ ${schemaErrors} posts have schema errors`);
   }

   // Validate documentation
   console.log(`\nDocumentation Pages: ${docs.length}/5`);
   if (docs.length === 5) {
     console.log(`✅ All documentation pages present`);
   } else {
     console.error(`❌ Missing ${5 - docs.length} documentation pages`);
   }

   // Validate images
   console.log(`\nValidating images...`);
   let brokenImages = 0;
   for (const post of posts) {
     const content = post.body;
     const imageRegex = /!\[.*?\]\((\.\/images\/.*?)\)/g;
     const matches = [...content.matchAll(imageRegex)];

     for (const match of matches) {
       const imagePath = match[1].replace('./', `src/content/blog/${post.id}/`);
       try {
         await fs.access(imagePath);
       } catch {
         console.error(`❌ Missing image: ${imagePath}`);
         brokenImages++;
       }
     }
   }

   console.log(`Broken Images: ${brokenImages}`);
   if (brokenImages === 0) {
     console.log(`✅ All images present`);
   }

   console.log(`\n============================`);
   console.log(`Validation ${schemaErrors === 0 && brokenImages === 0 && posts.length === 85 && docs.length === 5 ? '✅ PASSED' : '❌ FAILED'}\n`);
   ```

2. Run validation:
   ```bash
   node scripts/validate-content.js
   ```

3. Fix any issues found

4. Run again until all validations pass

**Acceptance Criteria**:
- ✅ All 85 blog posts present
- ✅ All 5 documentation pages present
- ✅ Zero schema validation errors
- ✅ All images accessible
- ✅ No broken internal links

**Time Estimate**: 2 hours
**Dependencies**: T5.1, T5.2
**Output**: Content validation report

---

#### T6.4: Perform SEO Validation (2 hours)

**Description**: Verify all SEO elements are correct.

**Steps**:
1. Create SEO validation test:
   ```typescript
   // tests/seo.spec.ts
   import { test, expect } from '@playwright/test';

   const pages = [
     { url: '/', title: 'Kevin W. Griffin' },
     { url: '/articles/', title: 'Articles' },
     { url: '/signalr-transports-explained/', title: 'SignalR Transports Explained' },
   ];

   for (const page of pages) {
     test(`SEO - ${page.url}`, async ({ page: pw }) => {
       await pw.goto(page.url);

       // Check title
       await expect(pw).toHaveTitle(new RegExp(page.title, 'i'));

       // Check meta description
       const metaDescription = await pw.locator('meta[name="description"]');
       await expect(metaDescription).toHaveCount(1);
       const content = await metaDescription.getAttribute('content');
       expect(content).toBeTruthy();
       expect(content.length).toBeGreaterThan(50);

       // Check canonical URL
       const canonical = await pw.locator('link[rel="canonical"]');
       await expect(canonical).toHaveCount(1);
       const href = await canonical.getAttribute('href');
       expect(href).toContain('consultwithgriff.com');

       // Check OpenGraph tags
       await expect(pw.locator('meta[property="og:title"]')).toHaveCount(1);
       await expect(pw.locator('meta[property="og:description"]')).toHaveCount(1);
       await expect(pw.locator('meta[property="og:image"]')).toHaveCount(1);

       // Check Twitter Card tags
       await expect(pw.locator('meta[name="twitter:card"]')).toHaveCount(1);
       await expect(pw.locator('meta[name="twitter:image"]')).toHaveCount(1);
     });
   }

   test('Sitemap accessible', async ({ page }) => {
     const response = await page.goto('/sitemap-index.xml');
     expect(response?.status()).toBe(200);
     expect(response?.headers()['content-type']).toContain('xml');
   });

   test('RSS feed accessible', async ({ page }) => {
     const response = await page.goto('/rss.xml');
     expect(response?.status()).toBe(200);
     expect(response?.headers()['content-type']).toContain('xml');
   });

   test('Robots.txt accessible', async ({ page }) => {
     const response = await page.goto('/robots.txt');
     expect(response?.status()).toBe(200);
   });
   ```

2. Run SEO tests:
   ```bash
   npm run test tests/seo.spec.ts
   ```

3. Test redirects:
   ```typescript
   // tests/redirects.spec.ts
   const redirects = [
     { from: '/blog/old-post/', to: '/', status: 301 },
     { from: '/tag/azure/', to: '/', status: 301 },
     { from: '/page/2/', to: '/', status: 301 },
     // Test 10-20 sample redirects
   ];

   for (const redirect of redirects) {
     test(`Redirect ${redirect.from}`, async ({ page }) => {
       const response = await page.goto(redirect.from);
       expect(response?.status()).toBe(redirect.status);
       expect(page.url()).toBe(`https://consultwithgriff.com${redirect.to}`);
     });
   }
   ```

4. Run redirect tests

**Acceptance Criteria**:
- ✅ All pages have title tags
- ✅ All pages have meta descriptions
- ✅ All pages have canonical URLs
- ✅ All pages have OpenGraph tags
- ✅ All pages have Twitter Card tags
- ✅ Sitemap accessible and valid
- ✅ RSS feed accessible and valid
- ✅ Sample redirects working (301 status)

**Time Estimate**: 2 hours
**Dependencies**: T5.8, T5.9, T5.10
**Output**: SEO validation report

---

#### T6.5: Run Performance Benchmarks (2 hours)

**Description**: Measure performance and compare to Gridsome baseline.

**Steps**:
1. Run Lighthouse audits:
   ```bash
   npx lighthouse https://localhost:4321 --view
   npx lighthouse https://localhost:4321/articles/ --view
   npx lighthouse https://localhost:4321/signalr-transports-explained/ --view
   ```

2. Record scores:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

3. Measure Core Web Vitals:
   - Largest Contentful Paint (LCP)
   - First Input Delay (FID)
   - Cumulative Layout Shift (CLS)

4. Compare build times:
   ```bash
   # Gridsome (record from old builds)
   time gridsome build

   # Astro
   time npm run build
   ```

5. Compare bundle sizes:
   - Gridsome `dist/` size
   - Astro `dist/` size
   - JavaScript bundle sizes
   - CSS file sizes

6. Create performance report:
   ```markdown
   # Performance Comparison

   ## Lighthouse Scores
   | Metric | Gridsome | Astro | Change |
   |--------|----------|-------|--------|
   | Performance | 92 | 98 | +6 ⬆️ |
   | Accessibility | 88 | 91 | +3 ⬆️ |
   | Best Practices | 95 | 100 | +5 ⬆️ |
   | SEO | 100 | 100 | 0 |

   ## Core Web Vitals
   | Metric | Gridsome | Astro | Target | Status |
   |--------|----------|-------|--------|--------|
   | LCP | 2.8s | 1.9s | <2.5s | ✅ |
   | FID | 80ms | 45ms | <100ms | ✅ |
   | CLS | 0.08 | 0.02 | <0.1 | ✅ |

   ## Build Performance
   - Gridsome: 45s
   - Astro: 28s (-38% ⬆️)

   ## Bundle Sizes
   - Gridsome JS: 285 KB
   - Astro JS: 142 KB (-50% ⬆️)
   ```

**Acceptance Criteria**:
- ✅ Lighthouse Performance ≥90
- ✅ Lighthouse SEO = 100
- ✅ LCP <2.5s
- ✅ FID <100ms
- ✅ CLS <0.1
- ✅ Performance equal or better than Gridsome

**Time Estimate**: 2 hours
**Dependencies**: T5.14
**Output**: Performance benchmark report

---

### Phase 6 Deliverables
- ✅ Visual regression test report
- ✅ Functional test results
- ✅ Content validation report
- ✅ SEO validation report
- ✅ Performance benchmark report
- ✅ Comprehensive test documentation

### Phase 6 Decision Point
**Go/No-Go Criteria**:
- ✅ Visual regression tests pass (≥95% match)
- ✅ All functional tests pass
- ✅ All content accessible (90/90 items)
- ✅ All SEO elements correct
- ✅ Performance meets targets
- ✅ No critical issues identified

**If No-Go**: Move to Phase 7 (Modify) to fix issues before deployment

---

## Phase 7: Modify (Fixes & Optimization)

**Duration**: 8 hours (4 days part-time)
**Status**: ⏳ PENDING
**Target Completion**: Week 3, Day 21
**Prerequisites**: Phase 6 complete with issues identified

### Overview
Address all issues discovered during testing phase. Fix visual differences, functional bugs, content issues, SEO problems, and performance bottlenecks.

### Task Categories

#### T7.1: Fix Visual Parity Issues (3 hours)

**Description**: Address all visual differences identified in regression tests.

**Common Issues to Fix**:
1. **Spacing/Layout**:
   - Adjust margins and padding to match exactly
   - Fix container widths
   - Correct responsive breakpoints

2. **Typography**:
   - Verify font sizes match
   - Check line heights
   - Confirm font weights
   - Ensure letter spacing correct

3. **Colors**:
   - Match exact hex values
   - Verify theme variables
   - Check hover states
   - Confirm link colors

4. **Components**:
   - Search input styling
   - Pagination buttons
   - Tag badges
   - Code blocks
   - Blockquotes

5. **Responsive Behavior**:
   - Mobile menu styling
   - Tablet breakpoint layouts
   - Image scaling
   - Navigation responsiveness

**Process**:
1. Review Playwright diff images
2. Identify root cause of each difference
3. Update TailwindCSS classes or custom CSS
4. Re-run visual regression tests
5. Repeat until all tests pass

**Acceptance Criteria**:
- ✅ Visual regression tests pass at 95%+ match rate
- ✅ All layouts match Gridsome version
- ✅ Responsive behavior identical
- ✅ No visual regressions introduced

**Time Estimate**: 3 hours
**Dependencies**: T6.1
**Output**: Visual parity achieved

---

#### T7.2: Fix Functional Bugs (2 hours)

**Description**: Resolve any functional issues discovered during testing.

**Common Issues to Fix**:
1. **Search**:
   - Results not displaying
   - Keyboard shortcuts not working
   - Search index missing posts
   - Incorrect result ranking

2. **Pagination**:
   - Wrong number of posts per page
   - Broken next/previous links
   - Incorrect page numbers
   - First/last page edge cases

3. **Theme Switcher**:
   - Theme not persisting
   - Flash of unstyled content
   - Icons not swapping
   - CSS variables not updating

4. **Navigation**:
   - Mobile menu not toggling
   - Links pointing to wrong URLs
   - Active state not highlighting
   - Dropdown menus not working

5. **Embeds**:
   - YouTube videos not loading
   - Twitter posts not embedding
   - Gists not displaying

**Process**:
1. Review functional test failures
2. Debug each issue
3. Implement fix
4. Re-run functional tests
5. Repeat until all tests pass

**Acceptance Criteria**:
- ✅ All functional tests pass
- ✅ No JavaScript console errors
- ✅ All interactive features work
- ✅ No broken functionality

**Time Estimate**: 2 hours
**Dependencies**: T6.2
**Output**: All features working correctly

---

#### T7.3: Fix Content Issues (1 hour)

**Description**: Resolve any content-related problems.

**Common Issues to Fix**:
1. **Missing Content**:
   - Posts not appearing
   - Images not displaying
   - Links broken

2. **Frontmatter Errors**:
   - Schema validation failures
   - Missing required fields
   - Incorrect data types

3. **Markdown Rendering**:
   - Formatting issues
   - Code blocks not highlighting
   - Lists not rendering
   - Headings incorrect

4. **Permalinks**:
   - Custom URLs not working
   - 404 errors for valid posts
   - Duplicate URLs

**Process**:
1. Review content validation report
2. Fix each identified issue
3. Re-run content validation
4. Manual spot-check random posts

**Acceptance Criteria**:
- ✅ All 90 items accessible
- ✅ Zero schema errors
- ✅ All images display
- ✅ All markdown renders correctly

**Time Estimate**: 1 hour
**Dependencies**: T6.3
**Output**: All content issues resolved

---

#### T7.4: Optimize Performance (1 hour)

**Description**: Improve performance metrics if below targets.

**Optimization Strategies**:

1. **Images**:
   - Convert to WebP format
   - Add responsive sizes
   - Implement lazy loading
   - Use Astro's image optimization

2. **JavaScript**:
   - Code split by page
   - Defer non-critical scripts
   - Minimize inline scripts
   - Use Partytown for analytics

3. **CSS**:
   - Purge unused styles
   - Critical CSS inline
   - Defer non-critical CSS
   - Optimize font loading

4. **Caching**:
   - Add cache headers
   - Enable CDN caching
   - Implement service worker

5. **Assets**:
   - Minify HTML/CSS/JS
   - Compress assets with gzip/brotli
   - Optimize SVGs
   - Remove unused fonts

**Process**:
1. Review Lighthouse recommendations
2. Implement top 3-5 optimizations
3. Re-run Lighthouse audits
4. Repeat until targets met

**Acceptance Criteria**:
- ✅ Lighthouse Performance ≥90
- ✅ Core Web Vitals all green
- ✅ Bundle size minimized
- ✅ Load time optimized

**Time Estimate**: 1 hour
**Dependencies**: T6.5
**Output**: Performance optimized

---

#### T7.5: Refine SEO Implementation (1 hour)

**Description**: Fix any SEO issues and enhance metadata.

**Enhancements**:

1. **Meta Tags**:
   - Add missing descriptions
   - Optimize title lengths (<60 chars)
   - Enhance OpenGraph images
   - Add Twitter Creator tags

2. **Structured Data**:
   - Add JSON-LD for articles
   - Add author information
   - Add breadcrumbs
   - Add organization schema

3. **Redirects**:
   - Test all 191+ redirects
   - Fix any broken redirects
   - Add missing redirects

4. **Internal Links**:
   - Fix broken links
   - Add contextual links
   - Improve anchor text

**Process**:
1. Review SEO validation report
2. Implement fixes and enhancements
3. Re-run SEO tests
4. Validate with Google Search Console (if possible)

**Acceptance Criteria**:
- ✅ All SEO tests pass
- ✅ Structured data valid
- ✅ All redirects working
- ✅ No broken links

**Time Estimate**: 1 hour
**Dependencies**: T6.4
**Output**: SEO optimized

---

### Phase 7 Deliverables
- ✅ All visual parity issues fixed
- ✅ All functional bugs resolved
- ✅ All content issues corrected
- ✅ Performance optimized
- ✅ SEO refined
- ✅ All tests passing

### Phase 7 Decision Point
**Go/No-Go Criteria**:
- ✅ All Phase 6 tests now pass
- ✅ No critical issues remaining
- ✅ Visual parity achieved (95%+)
- ✅ All features functional
- ✅ Performance meets targets
- ✅ Ready for production deployment

**If No-Go**: Continue iteration until all criteria met

---

## Phase 8: Conclude (Deployment & Verification)

**Duration**: 4 hours (2 days part-time)
**Status**: ⏳ PENDING
**Target Completion**: Week 4, Day 28
**Prerequisites**: Phase 7 complete, all tests passing

### Overview
Final pre-deployment checks, staging deployment, production deployment, and post-deployment monitoring.

### Tasks

#### T8.1: Pre-Deployment Checklist (1 hour)

**Description**: Final validation before production deployment.

**Checklist**:
```markdown
## Content
- [ ] All 85 blog posts migrated and accessible
- [ ] All 5 documentation pages migrated and accessible
- [ ] All images loading correctly
- [ ] All embeds rendering (YouTube, Twitter, Gists)
- [ ] All code blocks have syntax highlighting

## Features
- [ ] Search functionality working
- [ ] Pagination working (blog listing, tag archives)
- [ ] Theme switcher working with persistence
- [ ] Mobile menu working
- [ ] Navigation links all correct
- [ ] RSS feed generating at /rss.xml
- [ ] Sitemap generating at /sitemap-index.xml
- [ ] Google Analytics tracking active

## SEO & Redirects
- [ ] All 191+ redirects configured
- [ ] Meta tags present on all pages
- [ ] Canonical URLs correct
- [ ] OpenGraph tags correct
- [ ] Twitter Card tags correct
- [ ] Social media previews working

## Performance
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse SEO = 100
- [ ] Core Web Vitals all green
- [ ] Build completes successfully
- [ ] No console errors

## Testing
- [ ] Visual regression tests passing (95%+)
- [ ] Functional tests passing (100%)
- [ ] Content validation passing
- [ ] SEO validation passing
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness confirmed

## Deployment
- [ ] GitHub Actions workflow tested
- [ ] Build output to `dist/` correct
- [ ] Azure Static Web Apps config present
- [ ] Environment variables set (if any)
- [ ] Rollback plan documented

## Documentation
- [ ] README updated with Astro instructions
- [ ] Development guide created
- [ ] Content authoring guide written
- [ ] Deployment process documented
```

**Process**:
1. Go through checklist systematically
2. Fix any last-minute issues
3. Get all checkboxes checked
4. Document rollback procedure

**Acceptance Criteria**:
- ✅ All checklist items complete
- ✅ Rollback plan documented
- ✅ No critical issues
- ✅ Ready for deployment

**Time Estimate**: 1 hour
**Dependencies**: T7.5
**Output**: Deployment readiness confirmation

---

#### T8.2: Staging Deployment (30 minutes)

**Description**: Deploy to staging environment for final validation.

**Steps**:
1. Create staging branch:
   ```bash
   git checkout -b staging/astro-migration
   git push origin staging/astro-migration
   ```

2. Configure staging slot in Azure Static Web Apps (if available)

3. Deploy to staging:
   - Trigger GitHub Actions workflow
   - Monitor deployment logs
   - Wait for deployment complete

4. Verify staging site:
   - Visit staging URL
   - Smoke test key pages:
     - Homepage
     - Blog listing
     - Sample blog post
     - Search
     - Theme switcher
   - Check no errors in console

5. Share staging URL with stakeholders for review

**Acceptance Criteria**:
- ✅ Staging deployment successful
- ✅ Staging site accessible
- ✅ Smoke tests pass
- ✅ No deployment errors
- ✅ Stakeholder approval received

**Time Estimate**: 30 minutes
**Dependencies**: T8.1
**Output**: Validated staging deployment

---

#### T8.3: Production Deployment (1 hour)

**Description**: Deploy to production at https://consultwithgriff.com.

**Steps**:
1. Schedule deployment during low-traffic window

2. Create backup of current Gridsome site:
   ```bash
   git tag gridsome-final
   git push origin gridsome-final
   ```

3. Merge to master:
   ```bash
   git checkout master
   git merge astro-migration
   git push origin master
   ```

4. Monitor GitHub Actions deployment:
   - Watch workflow logs
   - Wait for "Deployment Complete" message
   - Verify no errors

5. Verify production site:
   - Visit https://consultwithgriff.com
   - Test homepage loads
   - Test 5-10 random blog posts
   - Test search
   - Toggle theme
   - Test navigation
   - Check RSS feed: /rss.xml
   - Check sitemap: /sitemap-index.xml
   - Test 5-10 redirects

6. Monitor for issues:
   - Check browser console for errors
   - Check Azure Static Web Apps logs
   - Monitor analytics for traffic restoration

**Acceptance Criteria**:
- ✅ Deployment successful
- ✅ Site live at consultwithgriff.com
- ✅ All smoke tests pass
- ✅ No critical errors
- ✅ Traffic flowing normally

**Time Estimate**: 1 hour
**Dependencies**: T8.2
**Output**: Live production deployment

---

#### T8.4: Post-Deployment Verification (1 hour)

**Description**: Monitor and validate production deployment.

**Steps**:
1. Run production Lighthouse audits:
   ```bash
   npx lighthouse https://consultwithgriff.com --view
   npx lighthouse https://consultwithgriff.com/articles/ --view
   ```

2. Monitor analytics:
   - Check Google Analytics real-time
   - Verify traffic patterns normal
   - Check bounce rate
   - Monitor session duration

3. Check search engine status:
   - Visit Google Search Console
   - Check for crawl errors
   - Monitor indexing status
   - Verify sitemap submitted

4. Monitor error logs:
   - Check Azure Static Web Apps logs
   - Look for 404 errors
   - Check for JavaScript errors
   - Monitor server errors

5. Test from different locations/devices:
   - Desktop (Windows, Mac)
   - Mobile (iOS, Android)
   - Different browsers
   - Different networks

6. Gather user feedback:
   - Monitor social media mentions
   - Check for support requests
   - Look for bug reports

**24-Hour Monitoring**:
- Traffic returns to normal
- No increase in 404 errors
- No critical bugs reported
- Analytics showing normal patterns
- Search rankings stable

**Acceptance Criteria**:
- ✅ Lighthouse scores meet targets
- ✅ Analytics show normal traffic
- ✅ No critical errors in logs
- ✅ No user-reported issues
- ✅ 24-hour stability confirmed

**Time Estimate**: 1 hour (initial + 24hr monitoring)
**Dependencies**: T8.3
**Output**: Deployment success confirmation

---

#### T8.5: Documentation & Knowledge Transfer (30 minutes)

**Description**: Update documentation for new Astro setup.

**Steps**:
1. Update README.md:
   ```markdown
   # Kevin W. Griffin Blog - Astro

   Personal blog and consulting website built with Astro.

   ## Development

   ```bash
   npm install
   npm run dev
   ```

   Visit http://localhost:4321

   ## Building

   ```bash
   npm run build
   ```

   Output to `dist/`

   ## Deployment

   Automatic deployment via GitHub Actions to Azure Static Web Apps.

   ## Content Management

   Blog posts: `src/content/blog/`
   Documentation: `src/content/docs/`

   See CONTENT_GUIDE.md for creating new posts.
   ```

2. Create CONTENT_GUIDE.md:
   - Frontmatter schema explanation
   - How to create new posts
   - Image handling
   - Embedding YouTube/Twitter/Gists
   - Using tags and categories

3. Create DEPLOYMENT.md:
   - Deployment process
   - Rollback procedure
   - Monitoring checklist
   - Troubleshooting guide

4. Archive Gridsome documentation:
   - Move old docs to `docs/legacy/`
   - Add migration notes
   - Document lessons learned

**Acceptance Criteria**:
- ✅ README updated
- ✅ Content guide created
- ✅ Deployment guide created
- ✅ Gridsome documentation archived

**Time Estimate**: 30 minutes
**Dependencies**: T8.4
**Output**: Updated documentation

---

### Phase 8 Deliverables
- ✅ Pre-deployment checklist completed
- ✅ Successful staging deployment
- ✅ Successful production deployment
- ✅ Post-deployment verification complete
- ✅ Updated documentation
- ✅ Migration complete!

### Phase 8 Success Criteria
**Migration Successful When**:
- ✅ Site live at https://consultwithgriff.com
- ✅ All monitoring green
- ✅ No critical issues within 24 hours
- ✅ Analytics show normal traffic
- ✅ Search rankings stable
- ✅ User feedback positive or neutral
- ✅ Team confident in new setup

---

## Timeline & Milestones

### Week-by-Week Breakdown

**Week 1: Setup & Prototype**
- **Mon-Wed (Days 1-3)**: Phase 3 - Prepare
  - Initialize Astro project
  - Configure Content Collections
  - Set up remark plugins
  - Configure TailwindCSS and fonts
  - Create migration scripts
  - **Milestone M1**: Astro Project Setup Complete

- **Thu-Sun (Days 4-7)**: Phase 4 - Confirm
  - Migrate 5 sample posts
  - Build homepage and post template
  - Implement search prototype
  - Set up Playwright
  - Capture baseline screenshots
  - **Milestone M2**: Prototype Validated

**Week 2: Full Migration**
- **Mon-Fri (Days 8-14)**: Phase 5 - Execute
  - Migrate all 85 blog posts
  - Migrate 5 documentation pages
  - Build all page types (listing, tags, contact, 404)
  - Implement all features (search, theme, RSS, sitemap)
  - Configure redirects
  - Finalize layout and navigation
  - Update deployment config
  - **Milestone M3**: Full Migration Complete

**Week 3: Testing & Refinement**
- **Mon-Wed (Days 15-19)**: Phase 6 - Monitor
  - Run visual regression tests
  - Execute functional tests
  - Validate all content
  - Perform SEO validation
  - Run performance benchmarks
  - **Milestone M4**: Testing Complete

- **Thu-Sun (Days 20-21)**: Phase 7 - Modify
  - Fix visual parity issues
  - Resolve functional bugs
  - Correct content issues
  - Optimize performance
  - Refine SEO
  - **Milestone M5**: Production Ready

**Week 4: Deployment**
- **Mon-Tue (Days 22-28)**: Phase 8 - Conclude
  - Complete pre-deployment checklist
  - Deploy to staging
  - Deploy to production
  - Post-deployment verification
  - Update documentation
  - **Milestone M6**: Live Deployment

---

## Risk Assessment & Mitigation

### High-Risk Areas

#### Risk 1: Content Loss During Migration
**Probability**: Low | **Impact**: Critical

**Mitigation**:
- ✅ Use migration scripts with validation
- ✅ Maintain Gridsome codebase as backup
- ✅ Tag Gridsome final version in git
- ✅ Test migration with sample posts first
- ✅ Validate all content before deleting Gridsome

**Contingency**:
- Rollback to Gridsome if content issues discovered
- Re-run migration with fixes
- Manual content verification as fallback

---

#### Risk 2: SEO Ranking Loss
**Probability**: Medium | **Impact**: High

**Mitigation**:
- ✅ Test all 191+ redirects thoroughly
- ✅ Maintain exact URL structure
- ✅ Preserve all meta tags
- ✅ Keep canonical URLs identical
- ✅ Monitor Google Search Console

**Contingency**:
- Quick rollback if rankings drop >20%
- Submit updated sitemap to Google
- Request re-indexing of key pages
- Monitor and fix any 404 spikes

---

#### Risk 3: Visual Differences Breaking User Experience
**Probability**: Medium | **Impact**: Medium

**Mitigation**:
- ✅ Comprehensive Playwright visual regression tests
- ✅ Manual review of all page types
- ✅ Test across browsers and devices
- ✅ Stakeholder review of staging

**Contingency**:
- Phase 7 dedicated to fixing visual issues
- Iterate until 95%+ match achieved
- Delay deployment if critical UX breaks

---

#### Risk 4: Broken Embeds or Features
**Probability**: Low | **Impact**: Medium

**Mitigation**:
- ✅ Test embeds during prototype phase
- ✅ Comprehensive functional tests
- ✅ Validate remark plugin configuration
- ✅ Manual testing of random posts

**Contingency**:
- Fix embed issues in Phase 7
- Add polyfills if needed
- Manual iframe fallbacks for problematic embeds

---

#### Risk 5: Deployment Failure
**Probability**: Low | **Impact**: High

**Mitigation**:
- ✅ Test deployment workflow in staging
- ✅ Verify Azure Static Web Apps config
- ✅ Have rollback procedure documented
- ✅ Monitor deployment logs

**Contingency**:
- Immediate rollback to Gridsome
- Debug deployment issue
- Re-deploy when fixed
- Maintain Gridsome as fallback

---

### Rollback Procedure

**If Critical Issues Occur Post-Deployment**:

1. **Immediate Actions** (5 minutes):
   ```bash
   # Revert to previous commit
   git revert HEAD --no-edit
   git push origin master --force
   ```

2. **Verify Gridsome Restored** (10 minutes):
   - Check site loads at consultwithgriff.com
   - Verify content accessible
   - Test key features
   - Confirm analytics tracking

3. **Communicate** (15 minutes):
   - Update stakeholders
   - Post status update if public-facing
   - Document issue for investigation

4. **Post-Rollback** (ongoing):
   - Investigate root cause
   - Fix issue in Astro branch
   - Re-test thoroughly
   - Plan second deployment attempt

---

## Success Metrics & Quality Gates

### Phase 3 Quality Gate
- ✅ Dev server runs without errors
- ✅ Content Collections schema validates
- ✅ Remark plugins process markdown correctly
- ✅ Build completes successfully

**If Not Met**: Fix configuration issues, update JTBD if major changes needed

---

### Phase 4 Quality Gate
- ✅ Sample posts render identically to Gridsome
- ✅ Embeds work correctly
- ✅ Search returns expected results
- ✅ Visual comparison <5% difference
- ✅ No blocking technical issues

**If Not Met**: Refine approach, consider alternative remark plugins, update migration strategy

---

### Phase 5 Quality Gate
- ✅ All content accessible (90/90 items)
- ✅ All features functional
- ✅ Build completes without errors
- ✅ No critical bugs identified

**If Not Met**: Fix issues before moving to testing

---

### Phase 6 Quality Gate
- ✅ Visual regression tests ≥95% match
- ✅ All functional tests pass
- ✅ All content validated
- ✅ All SEO elements correct
- ✅ Performance meets targets

**If Not Met**: Move to Phase 7 for fixes, iterate until met

---

### Phase 7 Quality Gate
- ✅ All Phase 6 tests now pass
- ✅ No critical issues remaining
- ✅ Visual parity achieved
- ✅ All features functional
- ✅ Performance optimized

**If Not Met**: Continue iteration, delay deployment until ready

---

### Phase 8 Success Metrics
- ✅ Zero downtime during deployment
- ✅ 100% content preserved (90/90 items)
- ✅ 100% feature parity
- ✅ SEO rankings stable within 2 weeks
- ✅ Performance equal or better
- ✅ User experience unchanged
- ✅ Build time improved
- ✅ Development experience improved

---

## Recommended Starting Point

Based on the JTBD analysis and current project status:

### Start Here: Phase 3 (Prepare)

**Why Phase 3?**
1. **Phases 1-2 Complete**: The JTBD document fulfills Define and Locate phases
2. **Foundation First**: Setup provides stable base for migration
3. **Low Risk**: Configuration phase with no content changes
4. **Quick Win**: Can complete in 3 days, builds confidence
5. **Validates Approach**: Ensures Astro works before full migration

### First Task: T3.1 - Initialize Astro Project

**Next Steps**:
1. ✅ Review this implementation plan
2. ✅ Set up development environment
3. ✅ Create new directory for Astro project
4. ✅ Begin T3.1: Initialize Astro Project
5. ✅ Follow Phase 3 tasks sequentially
6. ✅ Reach Milestone M1 (Astro Project Setup Complete)

**Then**: Move to Phase 4 (Confirm) to validate approach with prototype before committing to full migration.

---

## Conclusion

This implementation plan provides a comprehensive, step-by-step guide for migrating from Gridsome to Astro. The plan:

✅ **Follows JTBD Structure**: Aligned with 8-phase job map
✅ **Actionable Tasks**: 70+ specific tasks with time estimates
✅ **Risk-Aware**: Includes quality gates, rollback procedures
✅ **Validated Approach**: Prototype phase before full migration
✅ **Production-Ready**: Complete deployment and monitoring strategy
✅ **Success-Focused**: Clear metrics and acceptance criteria

**Total Effort**: 80 hours (4 weeks part-time, 2 weeks full-time)

**Expected Outcome**: Successful 1-for-1 migration with 100% feature parity, improved performance, and modernized technology stack.

---

**Ready to start?** Begin with Phase 3, Task T3.1: Initialize Astro Project.

**Questions?** Refer back to JTBD.md for strategic context and migration rationale.

**Blocked?** Use quality gates to identify issues early and iterate until resolved.

Good luck with your migration! 🚀
