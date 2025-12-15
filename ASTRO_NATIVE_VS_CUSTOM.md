# Astro Native vs Custom Features Analysis

This document distinguishes between **native Astro blog functionality** and **custom/extended features** implemented in the AstroPaper theme.

## 🔵 Native Astro Features (Core Framework)

### Content Collections
- ✅ **Content Collections API** (`astro:content`) - Native Astro feature
  - `getCollection()` - Native function for fetching content
  - `defineCollection()` - Native schema definition
  - Type-safe markdown with Zod schemas
  - File-based routing from `src/pages/` directory

### Routing & Pages
- ✅ **File-based routing** - Native Astro routing system
  - `src/pages/index.astro` → `/`
  - `src/pages/posts/[...slug]/index.astro` → `/posts/*`
  - `src/pages/posts/[...page].astro` → `/posts/*` (pagination)
  - Dynamic routes with `getStaticPaths()`

### Markdown Processing
- ✅ **Built-in Markdown support** - Native Astro feature
  - Frontmatter parsing
  - Markdown to HTML conversion
  - `render()` function for content rendering

### Integrations (Official Astro Packages)
- ✅ **@astrojs/rss** - Official Astro RSS integration
- ✅ **@astrojs/sitemap** - Official Astro sitemap integration
- ✅ **@astrojs/check** - Official TypeScript checking

### Build & Development
- ✅ **Astro CLI commands** - Native (`dev`, `build`, `preview`, `sync`)
- ✅ **Vite integration** - Native Astro build system
- ✅ **Image optimization** - Native Astro image handling

---

## 🟢 Custom/Extended Features (AstroPaper Theme)

### Content Management Extensions

#### 1. **Custom Content Schema** (`src/content.config.ts`)
- Custom blog post schema with extended fields:
  - `featured` - Featured post flag
  - `draft` - Draft post filtering
  - `modDatetime` - Modification date tracking
  - `timezone` - Per-post timezone support
  - `hideEditPost` - Edit link visibility control
  - `canonicalURL` - Custom canonical URLs
- Custom `BLOG_PATH` constant (`src/data/blog`)
- Glob loader pattern for subdirectory support

#### 2. **Post Filtering & Scheduling** (`src/utils/postFilter.ts`)
- Custom draft filtering logic
- **Scheduled posts** - Posts with future `pubDatetime` are hidden until publish time
- `scheduledPostMargin` configuration (15-minute buffer)
- Environment-aware filtering (DEV vs PROD)

#### 3. **Post Organization Utilities**
- `getSortedPosts()` - Custom sorting by modification/publication date
- `getPostsByTag()` - Tag-based filtering
- `getPostsByGroupCondition()` - Grouping posts by year/month
- `getUniqueTags()` - Tag deduplication and counting
- `getPath()` - Custom URL path generation with subdirectory support

### UI/UX Components (All Custom)

#### Layout Components
- `Layout.astro` - Base layout with SEO meta tags, structured data
- `Main.astro` - Main content wrapper
- `PostDetails.astro` - Post detail page layout
- `AboutLayout.astro` - About page layout

#### Navigation & UI Components
- `Header.astro` - Custom header with navigation
- `Footer.astro` - Custom footer
- `BackButton.astro` - Back navigation button
- `BackToTopButton.astro` - Scroll-to-top functionality
- `Breadcrumb.astro` - Breadcrumb navigation
- `Pagination.astro` - Custom pagination component
- `Card.astro` - Post card component
- `Tag.astro` - Tag display component
- `LinkButton.astro` - Styled link button
- `Hr.astro` - Horizontal rule component
- `Socials.astro` - Social media links
- `ShareLinks.astro` - Post sharing buttons
- `EditPost.astro` - "Edit on GitHub" link
- `Datetime.astro` - Formatted date/time display

### Pages (Custom Implementations)

#### 1. **Homepage** (`src/pages/index.astro`)
- Custom hero section
- Featured posts section
- Recent posts section
- RSS feed link
- Social links integration

#### 2. **Archives Page** (`src/pages/archives/index.astro`)
- **Custom feature** - Not native to Astro
- Year/month grouped post listing
- Configurable visibility (`SITE.showArchives`)

#### 3. **Tags System** (`src/pages/tags/`)
- **Custom feature** - Not native to Astro
- Tag index page (`tags/index.astro`)
- Tag-specific post pages (`tags/[tag]/[...page].astro`)
- Tag-based filtering and pagination

#### 4. **Search Page** (`src/pages/search.astro`)
- **Custom feature** - Not native to Astro
- Integration with Pagefind search library
- URL query parameter handling
- Search state persistence

#### 5. **404 Page** (`src/pages/404.astro`)
- Custom 404 error page

### Advanced Features

#### 1. **Dynamic OG Image Generation** (`src/pages/og.png.ts`, `src/pages/posts/[...slug]/index.png.ts`)
- **Custom feature** - Not native to Astro
- Server-side OG image generation using Satori
- SVG-to-PNG conversion with @resvg/resvg-js
- Custom templates (`src/utils/og-templates/`)
- Per-post dynamic OG images

#### 2. **Theme System**
- **Custom feature** - Not native to Astro
- Light/dark mode toggle (`public/toggle-theme.js`)
- Multiple color scheme support
- CSS custom properties for theming
- Theme persistence

#### 3. **SEO Enhancements**
- Custom structured data (JSON-LD) in Layout
- Enhanced meta tags (Open Graph, Twitter Cards)
- Article published/modified time tracking
- Google Site Verification support
- Canonical URL handling
- RSS feed auto-discovery

#### 4. **Markdown Extensions**
- `remark-toc` - Table of contents generation
- `remark-collapse` - Collapsible sections
- Custom Shiki code highlighting configuration:
  - Multiple themes (light/dark)
  - Code transformers (highlight, word highlight, diff notation)
  - File name display transformer

### Configuration System

#### 1. **Site Configuration** (`src/config.ts`)
- Centralized site configuration object
- Customizable settings:
  - Post pagination (`postPerIndex`, `postPerPage`)
  - Scheduled post margin
  - Archive visibility
  - Edit post links
  - Dynamic OG images
  - RTL/LTR support
  - Timezone configuration

#### 2. **Constants** (`src/constants.ts`)
- Social media links configuration
- Other site-wide constants

### Utilities & Helpers

#### Custom Utility Functions
- `slugify.ts` - Custom slug generation
- `getPath.ts` - URL path generation with subdirectory support
- `generateOgImages.ts` - OG image generation logic
- `loadGoogleFont.ts` - Google Font loading utility
- `transformers/fileName.js` - Code block file name transformer

### Styling

#### 1. **Tailwind CSS Integration**
- Custom Tailwind configuration via `@tailwindcss/vite`
- Custom typography plugin (`@tailwindcss/typography`)
- Custom CSS files:
  - `src/styles/global.css` - Global styles
  - `src/styles/typography.css` - Typography styles

#### 2. **Responsive Design**
- Custom responsive breakpoints
- Mobile-first approach
- Custom component styling

### Build Enhancements

#### 1. **Pagefind Search Integration**
- **Custom feature** - Not native to Astro
- Static site search using Pagefind
- Build-time search index generation
- Custom UI styling

#### 2. **Build Script Extensions**
- Custom build script that runs `pagefind` after build
- Copies search index to public directory

### Developer Experience

#### 1. **TypeScript Configuration**
- Custom TypeScript setup
- Type definitions for custom components

#### 2. **Code Quality Tools**
- ESLint configuration
- Prettier configuration with Astro plugin
- Custom linting rules

#### 3. **Git Hooks** (Documented)
- Git hooks for automatic date setting (documented in blog posts)

---

## Summary

### Native Astro (Core Framework)
- Content Collections API
- File-based routing
- Markdown processing
- Official integrations (RSS, Sitemap)
- Build system and CLI
- Image optimization

### Custom AstroPaper Features
- **Extended content schema** with additional fields
- **Scheduled posts** with time-based filtering
- **Archives page** with year/month grouping
- **Tags system** with dedicated pages
- **Search functionality** with Pagefind
- **Dynamic OG image generation**
- **Theme system** (light/dark mode)
- **Enhanced SEO** features
- **Custom UI components** (15+ components)
- **Pagination** implementation
- **Post filtering** and organization utilities
- **Custom styling** with Tailwind CSS
- **Configuration system** for easy customization

**Conclusion**: AstroPaper is built on Astro's native content collections and routing, but adds extensive custom features for a complete blog theme experience. Most of the blog-specific functionality (archives, tags, search, pagination, theming) is custom implementation rather than native Astro features.

