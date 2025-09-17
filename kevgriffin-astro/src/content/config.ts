import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    permalink: z.string().optional(),
    draft: z.boolean().default(false),
    excerpt: z.string().optional(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
    permalink: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, docs };