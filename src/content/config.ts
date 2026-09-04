import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    role: z.string(),
    period: z.string(),
    techStack: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    metrics: z.array(z.string()).optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
};