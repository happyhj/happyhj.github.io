# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Jekyll-based GitHub Pages blog built with the Jekyll Now theme. The repository follows the standard Jekyll structure for static site generation.

**Note**: The current HEAD commit (`1b599dc`) is a "clean" commit that removed all files. All project files exist in previous commits and can be restored using git.

## Architecture & Structure

### Core Jekyll Structure
- `_layouts/`: HTML templates (default.html, page.html, post.html)
- `_includes/`: Reusable HTML components (analytics, disqus, SVG icons)
- `_posts/`: Blog posts in Markdown format (YYYY-MM-DD-title.md)
- `_scss/`: Sass stylesheets (_highlights.scss, _reset.scss, _variables.scss)
- `_config.yml`: Main Jekyll configuration file

### Content & Assets
- `index.html`: Homepage template
- `about.md`, `archive.md`, `tags.md`: Static pages
- `images/`: Blog assets and screenshots
- `js/`: JavaScript files (jQuery, FluidVids, custom scripts)
- `style.scss`: Main stylesheet that imports from _scss/

### Configuration
- Site configured for GitHub Pages hosting
- Uses Redcarpet markdown processor with Pygments highlighting
- Supports Disqus comments, Google Analytics, and social icons
- Configured for pagination (4 posts per page)

## Development Commands

### Local Development
```bash
# Install Jekyll and GitHub Pages gems
gem install github-pages

# Serve the site locally
jekyll serve
# Site will be available at http://0.0.0.0:4000

# Serve with auto-regeneration
jekyll serve --watch
```

### Git Operations
```bash
# To restore all files from a previous commit (e.g., before the "clean" commit)
git checkout HEAD^ -- .

# View file content from specific commit
git show <commit-hash>:<file-path>
```

## Key Features
- Responsive, mobile-optimized theme
- Markdown-based blogging with front matter
- Syntax highlighting for code blocks
- Social media integration (footer links)
- Search functionality
- RSS feed generation
- Emoji support via jemoji gem

## Content Creation
- Blog posts go in `_posts/` with format: `YYYY-MM-DD-title.md`
- Posts require YAML front matter with title, date, and optional permalink
- Static pages can be created as `.md` files in root directory

## Customization Points
- Site metadata: `_config.yml`
- Styling: `_scss/` directory and `style.scss`
- Layout modifications: `_layouts/` templates
- Social links: Configure in `_config.yml` footer-links section