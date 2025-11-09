# Gridsome to Astro Migration Plan

## Overview
This document outlines the complete migration strategy from Gridsome to the latest version of Astro. The migration is broken into manageable phases that can be executed independently to work within context windows.

## Current State Analysis

### Site Statistics
- **Blog Posts**: 85 markdown files in `/blog/`
- **Documentation**: 5 markdown files in `/docs/`
- **Static Assets**: Located in `/static/`
- **Current Stack**: Gridsome 0.7.23, Vue 2, TailwindCSS (PostCSS 7)

### Key Features to Migrate
- Blog with YAML frontmatter
- Tag-based categorization
- Client-side search (Fuse.js)
- RSS feed
- Sitemap generation
- Dark mode toggle
- Disqus comments
- Google Analytics
- Extensive URL redirects

## Migration Phases

### Phase 1: Astro Project Setup
**Goal**: Create new Astro project with core integrations

**Tasks**:
- [ ] Initialize Astro project with latest version
- [ ] Install and configure TailwindCSS integration
- [ ] Set up content collections for blog and docs
- [ ] Configure TypeScript (recommended for content collections)
- [ ] Set up development environment

**Commands**:
```bash
npm create astro@latest kevgriffin-astro -- --template blog
cd kevgriffin-astro
npx astro add tailwind
npx astro add sitemap
npx astro add rss
```

**Deliverables**:
- Working Astro development environment
- Basic project structure
- TailwindCSS configured

---

### Phase 2: Content Schema & Migration
**Goal**: Define content collections and migrate markdown files

**Tasks**:
- [ ] Define content collection schemas in `src/content/config.ts`
- [ ] Create migration script for blog posts
- [ ] Create migration script for documentation
- [ ] Update frontmatter to match Astro requirements
- [ ] Migrate static assets to `/public/`

**Content Collection Schema**:
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()),
    categories: z.array(z.string()),
    permalink: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
  }),
});

export const collections = { blog, docs };
```

**Migration Script Tasks**:
- Copy `/blog/*.md` to `/src/content/blog/`
- Copy `/docs/*.md` to `/src/content/docs/`
- Update frontmatter date format if needed
- Ensure permalink structure compatibility

**Deliverables**:
- All content migrated to Astro structure
- Content collections configured
- Static assets in public directory

---

### Phase 3: Layout & Component Migration
**Goal**: Convert Vue components to Astro components

**Tasks**:
- [ ] Create base layout (`src/layouts/BaseLayout.astro`)
- [ ] Create blog post layout (`src/layouts/BlogPost.astro`)
- [ ] Convert navigation component
- [ ] Convert footer component
- [ ] Implement theme toggle (dark mode)
- [ ] Create pagination component

**Component Mapping**:
| Gridsome Component | Astro Component |
|-------------------|-----------------|
| `/src/layouts/Default.vue` | `/src/layouts/BaseLayout.astro` |
| `/src/templates/Post.vue` | `/src/layouts/BlogPost.astro` |
| `/src/components/SearchComponent.vue` | `/src/components/Search.astro` (with Vue island) |
| `/src/components/Pagination.vue` | `/src/components/Pagination.astro` |
| `/src/components/ThemeSwitcher.vue` | `/src/components/ThemeSwitcher.astro` |

**Deliverables**:
- All layouts converted
- Core components migrated
- Theme switching functional

---

### Phase 4: Page Routes Migration
**Goal**: Recreate all static and dynamic routes

**Tasks**:
- [ ] Create index page (`src/pages/index.astro`)
- [ ] Create articles listing (`src/pages/articles/index.astro`)
- [ ] Create blog post route (`src/pages/[...slug].astro`)
- [ ] Create tag pages (`src/pages/article-tags/[tag].astro`)
- [ ] Create contact page (`src/pages/contact.astro`)
- [ ] Create consulting page (`src/pages/consulting.astro`)
- [ ] Create courses page (`src/pages/courses.astro`)
- [ ] Create 404 page (`src/pages/404.astro`)

**Dynamic Routing Strategy**:
```typescript
// src/pages/[...slug].astro
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.data.permalink || post.slug },
    props: { post },
  }));
}
```

**Deliverables**:
- All routes functioning
- Proper URL structure maintained
- 404 page configured

---

### Phase 5: Feature Implementation
**Goal**: Restore all site features

**Tasks**:
- [ ] Implement client-side search with Fuse.js
- [ ] Configure RSS feed generation
- [ ] Set up sitemap generation
- [ ] Add Disqus comments integration
- [ ] Configure Google Analytics
- [ ] Implement social sharing buttons
- [ ] Add syntax highlighting for code blocks

**Search Implementation**:
- Use Astro island for Vue search component
- Generate search index at build time
- Maintain client-side functionality

**Integrations**:
```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://kevgriffin.com',
  integrations: [
    tailwind(),
    sitemap(),
    rss({
      // RSS configuration
    }),
  ],
});
```

**Deliverables**:
- Search functionality working
- RSS feed generating
- Analytics configured
- Comments functional

---

### Phase 6: Styling & Asset Optimization
**Goal**: Update and optimize styles

**Tasks**:
- [ ] Migrate TailwindCSS config to latest version
- [ ] Update custom CSS styles
- [ ] Optimize fonts and icons
- [ ] Implement responsive design
- [ ] Add view transitions (Astro feature)
- [ ] Optimize images with Astro Image

**TailwindCSS Update**:
- Remove PostCSS 7 compatibility constraints
- Update to TailwindCSS 3.x
- Migrate custom theme configuration
- Update utility classes if needed

**Deliverables**:
- Modern TailwindCSS setup
- Optimized assets
- Responsive design working

---

### Phase 7: Redirects & SEO
**Goal**: Maintain SEO and handle redirects

**Tasks**:
- [ ] Migrate redirect rules from `staticwebapp.config.json`
- [ ] Configure redirects for deployment platform
- [ ] Maintain URL structure for SEO
- [ ] Add OpenGraph meta tags
- [ ] Implement structured data

**Redirect Strategy**:
- Create `_redirects` file for Netlify
- Update `staticwebapp.config.json` for Azure
- Use Astro redirects in config

**Deliverables**:
- All redirects working
- SEO preserved
- Meta tags configured

---

### Phase 8: Deployment Configuration
**Goal**: Deploy to production

**Tasks**:
- [ ] Configure Azure Static Web Apps
- [ ] Update GitHub Actions workflow
- [ ] Configure build commands
- [ ] Test deployment pipeline
- [ ] Set up environment variables

**Build Configuration**:
```json
{
  "build": {
    "command": "npm run build",
    "outputDirectory": "dist"
  }
}
```

**Deliverables**:
- Successful deployment
- CI/CD pipeline working
- Production site live

---

## Testing Checklist

### Content
- [ ] All blog posts render correctly
- [ ] Documentation pages display properly
- [ ] Images and assets load
- [ ] Code syntax highlighting works

### Features
- [ ] Search returns accurate results
- [ ] RSS feed validates
- [ ] Sitemap generates correctly
- [ ] Comments load and function
- [ ] Analytics tracks pageviews

### Navigation
- [ ] All internal links work
- [ ] Tag pages list correct posts
- [ ] Pagination functions
- [ ] Menu navigation works on mobile

### Performance
- [ ] Lighthouse scores acceptable
- [ ] Page load times optimized
- [ ] Images lazy load
- [ ] CSS/JS bundled efficiently

### SEO & Redirects
- [ ] Old URLs redirect properly
- [ ] Meta tags present
- [ ] OpenGraph tags working
- [ ] Structured data validates

## Commands Reference

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Content Management
```bash
# Create new blog post
npm run create-post  # Will need to be recreated for Astro
```

## Notes

### Breaking Changes
- GraphQL queries replaced with content collections
- Vue components need conversion to Astro/React/Vue islands
- Build process completely different
- Some Gridsome plugins have no direct Astro equivalent

### Improvements in Astro
- Better TypeScript support
- Faster build times
- Modern tooling
- Better image optimization
- View transitions
- Partial hydration

### Migration Tools
Consider using:
- `@astrojs/vue` for keeping some Vue components
- `astro-fuse` for search functionality
- `@astrojs/rss` for RSS feeds
- `@astrojs/sitemap` for sitemaps

## Phase Execution Order

1. **Phase 1**: Project Setup (30 min)
2. **Phase 2**: Content Migration (1-2 hours)
3. **Phase 3**: Layout & Components (2-3 hours)
4. **Phase 4**: Page Routes (1-2 hours)
5. **Phase 5**: Features (2-3 hours)
6. **Phase 6**: Styling (1-2 hours)
7. **Phase 7**: Redirects & SEO (1 hour)
8. **Phase 8**: Deployment (1 hour)

**Estimated Total Time**: 10-15 hours

## Success Criteria

The migration is complete when:
1. All content is accessible in Astro
2. Site builds successfully with `npm run build`
3. All features have functional equivalents
4. Deployment to Azure Static Web Apps works
5. No broken links or missing redirects
6. Performance metrics equal or better than Gridsome version