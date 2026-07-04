---
title: "Building This Site"
description: "A deep dive into the architecture and design decisions behind this website — built with Astro, Tailwind CSS, and a commitment to longevity."
date: 2024-01-20
category: "engineering"
tags: ["astro", "tailwind", "web-development", "design"]
---

## The Stack

Every technical decision here was made with one principle in mind: **longevity over trendiness**. I wanted something that would still feel solid in five years, not something I'd need to rewrite every six months.

After evaluating a handful of frameworks, I landed on [Astro](https://astro.build) — a static-site generator that ships zero JavaScript by default. Pair that with Tailwind CSS for styling and Markdown for content, and you get a stack that's fast, maintainable, and genuinely fun to work with.

## Why Astro?

The short answer: it respects the nature of content-driven sites. Most personal websites don't need a client-side runtime. They need fast page loads, good SEO, and a pleasant authoring experience.

Here's how Astro compares to other options I considered:

- **Next.js** — Powerful, but brings a lot of complexity for what is essentially a static site. The React runtime overhead felt unnecessary.
- **Hugo** — Blazing fast builds, but the templating language is painful. Go templates are not a joy to write.
- **Astro** — Content-first, ships minimal JS, supports MDX out of the box, and the component model feels natural.

## Design Decisions

### Content Collections

Astro's content collections API is one of its best features. It gives you type-safe frontmatter validation using Zod schemas, which means you catch errors at build time rather than finding broken pages in production.

```typescript
const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

### Styling with Tailwind CSS v4

Tailwind v4 introduces a CSS-first configuration model. Instead of a JavaScript config file, you define your design tokens directly in CSS using `@theme`. Combined with CSS custom properties, this gives you a theming system that's both powerful and portable.

```css
@theme {
  --color-accent: oklch(0.65 0.24 275);
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

### Dark Mode

The dark mode implementation uses a class-based strategy with an inline script that runs before the body renders. This eliminates the flash of wrong theme (FOUWT) that plagues many implementations. Theme preference is persisted in `localStorage` and falls back to the system preference.

## Performance

Because Astro ships static HTML by default, performance is essentially free. There's no hydration step, no JavaScript bundle to parse, and images can be optimized at build time. The result is a site that scores near-perfect on Lighthouse without any manual optimization.

## What's Next

This is a living project. I plan to add search functionality, an RSS feed, and possibly some interactive components for specific posts. But the foundation is solid, and that's what matters most.

The source code is available on GitHub if you're curious about any of the implementation details. Feel free to take whatever's useful.
