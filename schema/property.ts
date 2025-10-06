import { z } from 'zod';

export const PropertyType = z.enum(['apartment', 'villa', 'house', 'land', 'penthouse']);
export const TransactionType = z.enum(['buy', 'rent']);

export const PropertySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.object({
    el: z.string(),
    en: z.string(),
  }),
  description: z.object({
    el: z.string(),
    en: z.string(),
  }),
  price: z.number(),
  transactionType: TransactionType,
  propertyType: PropertyType,
  location: z.object({
    el: z.string(),
    en: z.string(),
  }),
  specifications: z.object({
    bedrooms: z.number(),
    bathrooms: z.number(),
    area: z.number(),
    plotSize: z.number().optional(),
    yearBuilt: z.number().optional(),
    energyClass: z.string().optional(),
  }),
  features: z.object({
    el: z.array(z.string()),
    en: z.array(z.string()),
  }),
  images: z.array(z.string()),
  featured: z.boolean(),
  seo: z.object({
    title: z.object({
      el: z.string(),
      en: z.string(),
    }),
    description: z.object({
      el: z.string(),
      en: z.string(),
    }),
  }),
});

export type Property = z.infer<typeof PropertySchema>;
export type PropertyType = z.infer<typeof PropertyType>;
export type TransactionType = z.infer<typeof TransactionType>;