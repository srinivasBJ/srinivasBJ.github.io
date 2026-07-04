import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string().default('general'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    image: z.string().optional(),
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
    order: z.number().default(0),
  }),
});

const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z
      .enum(['papers', 'experiments', 'ideas', 'notes', 'talks'])
      .default('notes'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const reading = defineCollection({
  loader: glob({ base: './src/content/reading', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    category: z
      .enum(['books', 'articles', 'resources', 'recommendations'])
      .default('books'),
    description: z.string(),
    rating: z.number().min(1).max(5).optional(),
    url: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { writing, projects, research, reading };
