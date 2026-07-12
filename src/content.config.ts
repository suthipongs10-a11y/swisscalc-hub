import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

/**
 * Editorial content (M4, E-E-A-T). Each Ratgeber article links to a live tool
 * (its cluster money page, SEO_SPEC §5). Dates are ISO; the template formats
 * them and feeds dateModified into Article schema (no fake freshness — set
 * `updated` only when the content actually changes).
 */
const ratgeber = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ratgeber' }),
  schema: z.object({
    title: z.string(),
    /** Concise <title> (with " | CalcSwiss" appended stays <= 65). Falls back to title. */
    seoTitle: z.string().optional(),
    description: z.string(),
    published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    lead: z.string(),
    relatedTool: z.object({ href: z.string(), label: z.string() }),
    related: z.array(z.string()).default([]),
    faqs: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .default([]),
    order: z.number().default(0),
  }),
});

export const collections = { ratgeber };
