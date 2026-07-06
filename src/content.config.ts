import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
// trigger rebuild 2

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    pinned: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    github: z.string().optional(),
    demo: z.string().optional(),
    featured: z.boolean().default(false),
    timeline: z.string().default(''),
    order: z.number().default(0),
  }),
});

const lab = defineCollection({
  loader: glob({ base: './src/content/lab', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string().default('General'), // Linux, AWS, ChatGPT, Ideas, Research, Experiments, Thoughts, Drafts
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const reading = defineCollection({
  loader: glob({ base: './src/content/reading', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    author: z.string(), // or Source
    category: z.enum(['books', 'articles', 'websites', 'papers', 'resources', 'bookmarks']).default('books'),
    description: z.string(),
    url: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, projects, lab, reading };
