# Srinivas BJ — Personal Knowledge Website & Digital Garden

This repository contains the source code for my personal knowledge website and professional home on the internet, built using **Astro**, **Tailwind CSS**, and **Markdown**.

It is designed to serve as a fast, accessible, minimal, and premium digital archive for decades to come, fully optimized for static site generation (SSG) and hosted on **GitHub Pages**.

## 🚀 Technologies

- **Framework**: [Astro v5](https://astro.build) (Static Site Generation, zero JS by default)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (Modern CSS-first configuration)
- **Content**: Markdown & MDX (Structured via Content Collections with schemas)
- **Typographic Engine**: Inter (for prose) & JetBrains Mono (for code)
- **Interactions**: View Transitions, Command Palette (⌘K), Dark Mode toggle, Copy Code button
- **SEO**: JSON-LD Person/WebSite schemes, dynamic OpenGraph / Twitter cards, RSS feed, sitemap

## 📂 Project Structure

```text
├── .github/workflows/   # GitHub Pages deployment automation
├── public/
│   ├── favicon.svg      # Minimalist monogram logo
│   └── robots.txt       # Crawler permissions & sitemap registry
├── src/
│   ├── components/      # Reusable UI elements (Header, Footer, Cards, Command Palette)
│   ├── content/         # Site content (markdown/mdx data collections)
│   │   ├── projects/    # Projects portfolio entries
│   │   ├── reading/     # Curated reading logs & books
│   │   ├── research/    # Research papers, presentations & notes
│   │   └── writing/     # Blog articles
│   ├── layouts/         # Layout structures (Base, Page, Post, Project)
│   ├── pages/           # Dynamic routing pages & index endpoints
│   ├── styles/          # Global styles & design system tokens
│   └── content.config.ts# Schema validation definitions using Zod
├── astro.config.mjs     # Astro integration settings & Shiki theme configs
├── package.json         # Node.js dependencies & scripts
└── tsconfig.json        # TypeScript configuration settings
```

## 🧞 Local Commands

All commands are run from the project root using a terminal:

| Command | Action |
| :--- | :--- |
| `npm install` | Installs project dependencies |
| `npm run dev` | Starts local development server at `localhost:4321` |
| `npm run build` | Builds the static site output to `./dist/` |
| `npm run preview` | Previews the build output locally |
| `npm run astro check` | Runs TypeScript and component structure checks |

## ✍️ Content Authoring

All content is managed through content collections inside the `src/content/` directory.

### 1. Adding a Blog Post
Create a new file in `src/content/writing/your-post-title.md`:
```yaml
---
title: "Your Post Title"
description: "A short excerpt or description of the post."
date: 2026-07-04
category: "engineering" # e.g. engineering, design, science, general
tags: ["typescript", "astro"]
draft: false
---
Write your post here in Markdown.
```

### 2. Adding a Project
Create a new file in `src/content/projects/your-project-name.md`:
```yaml
---
title: "Project Name"
description: "A summary of the project's purpose."
tags: ["rust", "wasm"]
github: "https://github.com/username/project" # Optional
demo: "https://project.example.com"           # Optional
featured: true                                # Shows on home page
order: 1                                      # Grid layout ordering
---
## Overview
Detailed description.

## Problem
What challenge did this solve?

## Architecture
How is it designed?

## Lessons Learned
What went well? What didn't?
```

### 3. Adding Research Notes
Create a new file in `src/content/research/topic.md`:
```yaml
---
title: "Research Topic Title"
description: "A summary of the findings, note, or experiment."
date: 2026-07-04
category: "ideas" # papers, experiments, ideas, notes, talks
tags: ["math", "attention-mechanisms"]
draft: false
---
Write notes here.
```

### 4. Logging a Book or Resource
Create a new file in `src/content/reading/book.md`:
```yaml
---
title: "Book Title"
author: "Author Name"
category: "books" # books, articles, resources, recommendations
description: "Brief summary or takeaways."
rating: 5 # 1 to 5 stars (Optional)
url: "https://example.com" # Optional external link
tags: ["software-engineering"]
---
```

## 🛠️ Customization

### Accent Color & Design Tokens
Modify the colors, fonts, or other styling variables in `src/styles/global.css`. You can customize the light and dark mode colors by changing the CSS custom properties inside `:root` and `.dark` selectors.

### Header Navigation Links
Update the navigation array in `src/components/Header.astro` to add or remove links.

## 🚀 Deployment

The site is configured for automatic deployment via **GitHub Actions**.

1. Create a repository on GitHub named `srinivasBJ.github.io` (replace with your username if hosting on a personal user page).
2. Push this codebase to the repository on the `main` branch.
3. On GitHub, navigate to **Settings > Pages**.
4. Under **Build and deployment > Source**, select **GitHub Actions**.
5. The workflow in `.github/workflows/deploy.yml` will run automatically on every push to build and publish the site.
