import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      // Shown on the homepage card and the case study header.
      title: z.string(),
      summary: z.string(),
      // Short list of role/discipline tags, e.g. ["Product Design", "UX Research"].
      role: z.array(z.string()).default([]),
      year: z.string(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // Controls homepage ordering; lower numbers appear first.
      order: z.number().default(99),
      // Flip to false to keep a case study page live without listing it on the homepage yet.
      published: z.boolean().default(true),
    }),
});

export const collections = { projects };
