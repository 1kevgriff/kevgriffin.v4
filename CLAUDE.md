# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run develop` - Start the Gridsome development server
- `npm run build` - Build the static site for production
- `npm run explore` - Open GraphQL explorer to query site data
- `npm run create-post` - Interactive script to create a new blog post with proper frontmatter

### Docker Development
- `npm run docker:build` - Build Docker image for development
- `npm run docker:develop` - Run development server in Docker container (port 8080)

## Architecture Overview

This is a Gridsome-based static site (Vue.js) for Kevin W. Griffin's personal blog and consulting website. The site generates static HTML from markdown content.

### Content System
- **Blog posts** live in `/blog/` as markdown files with YAML frontmatter
- **Documentation pages** are in `/docs/` for courses and consulting content
- Posts require: `title`, `date`, `description`, `summary`, `tags[]`, and `categories[]` in frontmatter
- New posts should be created using `npm run create-post` to ensure proper formatting

### Key Components Architecture
- **Templates** (`/src/templates/`): Define how content types are rendered
  - `Post.vue` - Individual blog post pages
  - `Tag.vue` - Tag archive pages
  - `Documentation.vue` - Documentation pages
- **Layouts** (`/src/layouts/`): Wrap pages with common UI elements
- **Pages** (`/src/pages/`): Static pages like Index, Contact, Articles list

### Plugin System
The site uses both Gridsome plugins and custom local plugins:
- **Custom Email CTA Plugin** (`/localPlugins/email-cta-insert/`): Automatically inserts email CTAs into blog posts
- **Remark Plugins**: Handle YouTube embeds, Twitter embeds, and syntax highlighting
- Content is processed through the remark pipeline configured in `gridsome.config.js`

### Styling
- Uses TailwindCSS (PostCSS 7 compatible version due to Gridsome constraints)
- Custom theme configuration in `tailwind.config.js`
- Main styles in `/src/css/main.css` with GitHub markdown styles

### Search Implementation
- Client-side search using Fuse.js
- Search index is generated at build time from all content
- Search component uses the generated index for fast client-side searching

### Deployment & Redirects
- Primary deployment to Azure Static Web Apps (configured in `staticwebapp.config.json`)
- Extensive redirect rules for legacy URLs and domain migrations
- Alternative Netlify deployment available (`netlify.toml`)

### GraphQL Data Layer
Gridsome provides a GraphQL data layer for querying content:
- Use `page-query` or `static-query` in Vue components
- Content is available at build time through GraphQL
- Use `npm run explore` to interactively query the data layer

## Important Notes

- No testing framework is configured - manual testing only
- When modifying content queries, rebuild to see changes
- The site uses static generation, so dynamic features require client-side JavaScript
- Legacy URL redirects are critical for SEO - check `staticwebapp.config.json` before removing redirects
- Email CTAs are automatically inserted via the custom plugin - no manual insertion needed