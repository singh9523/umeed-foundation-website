/**
 * Content collections — the "database" of the website.
 * Each collection is a folder of Markdown files in src/content/.
 * They can be edited by hand or through the admin panel at /admin.
 */
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const optionalString = z.string().optional().nullable().transform((v) => v || undefined);
const optionalDate = z
  .union([z.coerce.date(), z.literal(''), z.null()])
  .optional()
  .transform((v) => (v instanceof Date ? v : undefined));

const programmes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programmes' }),
  schema: z.object({
    title: z.string(),
    title_hi: optionalString,
    icon: z.enum(['book', 'grain', 'cloth', 'heart', 'hands']).default('hands'),
    summary: z.string(),
    summary_hi: optionalString,
    image: optionalString,
    highlights: z
      .array(z.object({ title: z.string(), text: optionalString }))
      .optional()
      .nullable()
      .transform((v) => v ?? []),
    order: z.number().default(99),
  }),
});

const campaigns = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/campaigns' }),
  schema: z.object({
    title: z.string(),
    date: optionalDate,
    time: optionalString,
    location: optionalString,
    programme: optionalString,
    summary: z.string(),
    cover: optionalString,
    poster: optionalString,
    sponsors: z
      .array(z.object({ name: z.string(), note: optionalString }))
      .optional()
      .nullable()
      .transform((v) => v ?? []),
    photos: z
      .array(z.object({ image: z.string(), caption: optionalString }))
      .optional()
      .nullable()
      .transform((v) => v ?? []),
    videos: z
      .array(z.object({ title: optionalString, file: optionalString, youtube: optionalString }))
      .optional()
      .nullable()
      .transform((v) => v ?? []),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['photo', 'poster', 'video']).default('photo'),
    image: optionalString,
    video: optionalString,
    youtube: optionalString,
    alt: optionalString,
    caption: optionalString,
    date: optionalDate,
    campaign: optionalString,
    order: z.number().default(99),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: optionalString,
    bio: optionalString,
    order: z.number().default(99),
  }),
});

const reports = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reports' }),
  schema: z.object({
    title: z.string(),
    year: z.coerce.string(),
    file: z.string(),
    summary: optionalString,
  }),
});

export const collections = { programmes, campaigns, gallery, team, reports };
