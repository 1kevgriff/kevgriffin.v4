# Gridsome to Astro Migration - Product Requirements Document

## Executive Summary
Complete migration of Kevin W. Griffin's personal blog and consulting website from Gridsome to Astro 5.0, maintaining 100% feature parity, visual consistency, and SEO preservation.

## Important Technical Notes
- **Tool Timeouts**: Use maximum timeout (600000ms/10 minutes) for all build and development server operations
- **Docker Development**: Current setup uses Docker for Gridsome development - may need to run commands inside container
- **Node Version**: Gridsome requires legacy Node options (`NODE_OPTIONS=--openssl-legacy-provider`)

## Project Goals
- **Primary Goal**: Migrate from Gridsome to Astro with zero loss of functionality or SEO
- **Secondary Goals**: 
  - Modernize the tech stack
  - Improve build performance
  - Maintain or improve site performance
  - Enable easier future maintenance

## Success Criteria
- ✅ 100% visual parity with current Gridsome site
- ✅ All URLs remain identical (SEO preservation)
- ✅ All features work: search, RSS, sitemap, redirects
- ✅ Performance equal or better than current site
- ✅ Clean migration with no broken links or missing content
- ✅ All blog posts render correctly with proper formatting
- ✅ YouTube/Twitter embeds and code highlighting work

## Current Site Analysis

### Technology Stack
- **Framework**: Gridsome 0.7.23 (Vue.js based)
- **Styling**: Tailwind CSS (PostCSS 7 compatible version)
- **Search**: Client-side with Fuse.js
- **Comments**: Vue Disqus
- **Analytics**: Google Analytics (gtag)
- **Deployment**: Azure Static Web Apps

### Content Structure
- **Blog Posts**: 150+ markdown files in `/blog/` directory
- **Format**: Markdown with YAML frontmatter
- **Required Frontmatter**: title, date, description, summary, tags[], categories[], permalink
- **Documentation**: `/docs/` directory with course/consulting content

### Key Features
1. **Content Features**
   - Blog posts with custom permalinks
   - Tag-based categorization and archive pages
   - YouTube and Twitter embeds
   - Syntax highlighting for code blocks
   - RSS feed generation
   - XML sitemap generation

2. **UI Features**
   - Homepage with hero section and latest article highlight
   - Article listing with pagination
   - Client-side search across all content
   - Theme switcher
   - Responsive design

3. **SEO & Redirects**
   - Extensive redirect rules for legacy URLs
   - Custom permalinks preserved from WordPress migration
   - Meta tags and Open Graph support

## Migration Phases

### Phase 1: Backup & Setup
**Note**: Use maximum tool timeout (600000ms/10 minutes) for all CLI operations to ensure completion
- [ ] Create `/_archive` directory and copy current Gridsome site (keep original for reference)
- [ ] Start Gridsome dev server for screenshot capture (timeout: 600000)
- [ ] Use Playwright to capture comprehensive screenshots:
  - [ ] Homepage (desktop, tablet, mobile)
  - [ ] Blog post page (with code highlighting, embeds)
  - [ ] Articles listing page (with pagination)
  - [ ] Tag archive page
  - [ ] Contact page
  - [ ] 404 page
  - [ ] Search functionality in action
  - [ ] Theme switcher (both light and dark modes)
- [ ] Save screenshots to `/screenshots/before/` directory
- [ ] Document all current URLs and their content in a manifest
- [ ] Capture current Lighthouse scores for performance baseline
- [ ] Initialize new Astro 5.0 project with TypeScript

### Phase 2: Core Infrastructure Migration

#### Astro Configuration
```javascript
// astro.config.mjs structure needed:
{
  site: 'https://consultwithgriff.com',
  integrations: [
    tailwind(),
    mdx(), // For enhanced markdown
    sitemap({
      filter: (page) => !page.includes('/no-more-stream-notifications/')
      // Add other exclusions as needed
    }),
    embeds(), // From astro-embed for YouTube, Twitter, etc.
  ],
  markdown: {
    syntaxHighlight: 'shiki', // or 'prism'
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: true
    },
    extendDefaultPlugins: true,
    gfm: true // GitHub Flavored Markdown
  },
  image: {
    domains: ['consultwithgriff.com'], // For remote images
    remotePatterns: [{ protocol: 'https' }]
  }
}
```

#### Required Packages
- `astro` (latest)
- `@astrojs/tailwind`
- `@astrojs/mdx` (for enhanced markdown with components)
- `@astrojs/sitemap`
- `@astrojs/rss`
- `astro-embed` (for YouTube, Twitter/X, and other embeds)
- `tailwindcss`
- `fuse.js` (for search)
- `astro-icon` (for optimized icons)
- `@astrojs/vue` (only if absolutely needed for complex components)

### Phase 3: Content Migration

#### Content Collections Setup
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    categories: z.array(z.string()),
    permalink: z.string(),
    excerpt: z.string().optional(),
  })
});
```

#### Migration Steps
1. Move `/blog/*.md` → `/src/content/blog/*.mdx` (convert to MDX for better component support)
2. Move `/docs/*.md` → `/src/content/docs/*.mdx`
3. Move `/blog/images/` → `/src/assets/images/` (for Astro image optimization)
4. Update frontmatter fields as needed
5. Replace markdown YouTube embeds with `<YouTube />` component
6. Replace Twitter embeds with `<Tweet />` component
7. Update image references to use Astro's `<Image />` component

### Phase 4: Component & Layout Migration

#### Component Mapping
| Gridsome Component | Astro Component | Notes |
|-------------------|-----------------|-------|
| `src/layouts/Default.vue` | `src/layouts/Default.astro` | Main layout with header/footer |
| `src/templates/Post.vue` | `src/pages/[...permalink].astro` | Dynamic route for posts |
| `src/templates/Tag.vue` | `src/pages/article-tags/[id].astro` | Tag archive pages |
| `src/pages/Index.vue` | `src/pages/index.astro` | Homepage |
| `src/pages/Articles.vue` | `src/pages/articles.astro` | Article listing |
| `src/pages/Contact.vue` | `src/pages/contact.astro` | Contact page |
| `src/components/SearchInput.vue` | `src/components/SearchInput.astro` | Client-side search |
| `src/components/PaginationPosts.vue` | `src/components/Pagination.astro` | Pagination |

#### Dynamic Routing Strategy
```typescript
// src/pages/[...permalink].astro
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { permalink: post.data.permalink },
    props: { post }
  }));
}
```

### Phase 5: Features & Functionality

#### Search Implementation (Modern Astro Approach)
1. **Option A: Pagefind** (Recommended)
   - Use `astro-pagefind` integration for static search
   - Zero JavaScript until search is activated
   - Better performance than Fuse.js
   
2. **Option B: Fuse.js** (If maintaining current approach)
   - Generate search index at build time
   - Create `/src/pages/search.json.ts` endpoint
   - Use Web Components or Islands architecture for search UI
   
3. **Implementation**: Use Astro Islands for search component
   ```astro
   <SearchComponent client:idle />
   ```

#### RSS Feed Configuration
```typescript
// src/pages/rss.xml.ts
export async function GET() {
  const posts = await getCollection('blog');
  return rss({
    title: 'Kevin W. Griffin | Developer, Training, Entrepreneur',
    description: 'Blog RSS Feed',
    site: 'https://consultwithgriff.com',
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: `/${post.data.permalink}/`
    }))
  });
}
```

#### Redirect Configuration
- Migrate all redirects from `static/staticwebapp.config.json`
- Implement in Astro config or middleware
- Maintain 301 status codes for SEO

### Phase 6: SEO & Performance

#### Critical SEO Elements
- Preserve exact URL structure via permalink field
- Maintain meta tags and Open Graph data
- Generate sitemap with identical URLs
- Keep RSS feed at `/rss.xml`
- Implement Google Analytics gtag

#### Performance Optimizations
- Use Astro's `<Image />` component for optimization
- Implement proper caching headers
- Minimize JavaScript bundle size
- Ensure fast initial page load

### Phase 7: Validation & Testing

#### Visual Testing Checklist
- [ ] Homepage renders identically
- [ ] Blog post layout matches original
- [ ] Article listing maintains design
- [ ] Tag pages display correctly
- [ ] Mobile responsive design works
- [ ] Theme switcher functions

#### Functional Testing Checklist
- [ ] All navigation links work
- [ ] Search returns correct results
- [ ] Pagination works correctly
- [ ] RSS feed validates
- [ ] Sitemap generates properly
- [ ] All redirects function
- [ ] YouTube embeds display
- [ ] Code highlighting works
- [ ] Images load correctly

#### Content Validation
- [ ] All blog posts accessible
- [ ] Frontmatter renders correctly
- [ ] Tags and categories work
- [ ] Dates display properly
- [ ] Excerpts show correctly

### Phase 8: Deployment Configuration

#### Azure Static Web Apps Setup
```json
{
  "output": "dist",
  "platform": {
    "apiRuntime": "node:18"
  },
  "routes": [
    // Migrate all redirect rules
  ]
}
```

#### Deployment Checklist
- [ ] Configure build command: `npm run build`
- [ ] Set output directory: `dist`
- [ ] Configure environment variables
- [ ] Test deployment workflow
- [ ] Verify production build

## Technical Considerations

### Content Improvements (Astro Best Practices)

#### YouTube Embeds
**Current**: Remark plugin for YouTube URLs
**Astro Way**: Use `astro-embed` package with `<YouTube />` component
```astro
---
import { YouTube } from 'astro-embed';
---
<YouTube id="dQw4w9WgXcQ" />
```
Benefits: Better performance, lazy loading, privacy mode options

#### Twitter/X Embeds
**Current**: Remark plugin for Twitter
**Astro Way**: Use `<Tweet />` component from `astro-embed`
```astro
---
import { Tweet } from 'astro-embed';
---
<Tweet id="1234567890" />
```
Benefits: Static rendering, no client-side script loading

#### Image Optimization
**Current**: Static images in `/blog/images/`
**Astro Way**: Use Astro's `<Image />` component
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.png';
---
<Image src={heroImage} alt="Description" />
```
Benefits: Automatic optimization, lazy loading, responsive images

#### Code Syntax Highlighting
**Current**: Gridsome remark-shiki plugin
**Astro Way**: Built-in Shiki support in config
Benefits: No extra plugins needed, better performance, more themes

### Permalink Strategy
- Use frontmatter `permalink` field to maintain URLs
- Configure dynamic catch-all route `[...permalink].astro`
- Ensure no URL changes for SEO preservation

### Markdown Processing - Astro Best Practices
- **YouTube Embeds**: Use MDX with Astro's `<YouTube />` component or lite-youtube-embed for better performance
- **Twitter/X Embeds**: Use astro-embed's `<Tweet />` component for optimal loading
- **Syntax Highlighting**: Use Astro's built-in Shiki or Prism (configured in astro.config.mjs)
- **External Links**: Configure markdown.extendDefaultPlugins in Astro config
- **Recommendation**: Migrate to MDX for better component integration and performance

### Search Implementation
- Build-time index generation
- Client-side rendering with Vue or React component
- Maintain Fuse.js for fuzzy search capability

### Component Migration Strategy
- **Prefer Astro Components**: Convert all Vue components to `.astro` files
- **Use Islands Architecture**: For interactive components, use `client:*` directives
  - `client:load` - Load immediately (critical interactivity)
  - `client:idle` - Load when browser is idle (search, theme switcher)
  - `client:visible` - Load when visible (comments, non-critical features)
- **Avoid Framework Components**: Only use Vue/React if absolutely necessary
- **Example Migration**:
  ```astro
  <!-- Old Vue approach -->
  <SearchInput />
  
  <!-- New Astro approach -->
  <SearchInput client:idle />
  ```

## Risk Mitigation

### Potential Risks
1. **URL changes breaking SEO** → Use permalink field strictly
2. **Missing redirects** → Comprehensive redirect mapping
3. **Broken embeds** → Test all remark plugins thoroughly
4. **Search functionality** → Implement early and test extensively
5. **Visual differences** → Use Playwright for comparison

### Rollback Strategy
- Keep `/_archive` directory until migration verified
- Maintain ability to redeploy Gridsome site
- Document all configuration changes

## Timeline Estimates

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Backup & Setup | 2 hours | None |
| Phase 2: Core Infrastructure | 3 hours | Phase 1 |
| Phase 3: Content Migration | 2 hours | Phase 2 |
| Phase 4: Component Migration | 6 hours | Phase 2 |
| Phase 5: Features | 4 hours | Phase 3, 4 |
| Phase 6: SEO & Performance | 2 hours | Phase 5 |
| Phase 7: Testing | 3 hours | Phase 6 |
| Phase 8: Deployment | 2 hours | Phase 7 |
| **Total Estimate** | **24 hours** | |

## Acceptance Criteria

### Must Have
- All existing content accessible at same URLs
- Visual design matches exactly
- Search functionality works
- RSS feed and sitemap generate
- All redirects function
- YouTube/Twitter embeds work
- Code syntax highlighting works

### Should Have
- Improved build times (Astro is significantly faster than Gridsome)
- Better TypeScript support
- Easier content management
- Modern markdown features (MDX components)
- Better image optimization

### Nice to Have
- PageSpeed score improvements
- Reduced JavaScript bundle size
- Modern development experience
- View Transitions API for smoother navigation
- Simplified deployment

## Notes & References

### Current Dependencies to Migrate
- `@gridsome/plugin-google-analytics` → Astro gtag integration
- `@gridsome/plugin-sitemap` → `@astrojs/sitemap`
- `@gridsome/source-filesystem` → Astro Content Collections
- `@gridsome/transformer-remark` → Astro markdown processing
- `gridsome-plugin-remark-shiki` → Shiki integration
- `gridsome-plugin-remark-twitter` → Custom remark plugin
- `gridsome-plugin-remark-youtube` → Custom remark plugin
- `gridsome-plugin-rss` → `@astrojs/rss`
- `vue-fuse` → Fuse.js with custom component
- `vue-disqus` → Disqus embed component

### File Structure Mapping
```
Gridsome                          → Astro
/blog/*.md                        → /src/content/blog/*.md
/docs/*.md                        → /src/content/docs/*.md
/src/layouts/Default.vue          → /src/layouts/Default.astro
/src/templates/*.vue              → /src/pages/[dynamic].astro
/src/pages/*.vue                  → /src/pages/*.astro
/src/components/*.vue             → /src/components/*.astro
/static/*                         → /public/*
/gridsome.config.js               → /astro.config.mjs
```

### Commands Reference
```bash
# Gridsome commands → Astro equivalents
npm run develop    → npm run dev
npm run build      → npm run build
npm run explore    → (GraphQL explorer not needed)
npm run create-post → (not needed - use MDX files directly)

# Important: For all build/dev commands, use maximum timeout:
# timeout: 600000 (10 minutes)
# This ensures Gridsome's slow builds and Astro's initial setup complete
```

## Appendix: Screenshot Comparison Strategy

### Before Screenshots (Phase 1)
Directory: `/screenshots/before/`
- `homepage-desktop-1920x1080.png`
- `homepage-tablet-768x1024.png`
- `homepage-mobile-375x667.png`
- `blog-post-desktop.png` (include one with YouTube embed)
- `blog-post-code-highlighting.png`
- `articles-listing-page1.png`
- `articles-listing-page2.png` (pagination test)
- `tag-archive-signalr.png`
- `contact-page.png`
- `404-page.png`
- `search-open.png`
- `search-results.png`
- `theme-light.png`
- `theme-dark.png`

### After Screenshots (Phase 7)
Directory: `/screenshots/after/`
- Same structure as above for direct comparison

### Visual Regression Testing
- Use Playwright's screenshot comparison
- Accept up to 5% difference for anti-aliasing
- Flag any major layout shifts
- Document intentional improvements

---

*Last Updated: [Current Date]*
*Status: Planning Phase*
*Owner: Migration Team*