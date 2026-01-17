import { z } from "zod";

const envSchema = z.object({
  NOTION_TOKEN: z.string().min(1).optional(),
  NOTION_DATABASE_ID: z.string().min(1).optional(),
  NOTION_PROJECTS_DATABASE_ID: z.string().min(1).optional(),
  NOTION_EXPERIENCE_DATABASE_ID: z.string().min(1).optional(),
  NOTION_BLOG_DATABASE_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_FORMSPREE_ID: z.string().optional(),
});

export const env = envSchema.parse({
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  NOTION_PROJECTS_DATABASE_ID: process.env.NOTION_PROJECTS_DATABASE_ID,
  NOTION_EXPERIENCE_DATABASE_ID: process.env.NOTION_EXPERIENCE_DATABASE_ID,
  NOTION_BLOG_DATABASE_ID: process.env.NOTION_BLOG_DATABASE_ID,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_FORMSPREE_ID: process.env.NEXT_PUBLIC_FORMSPREE_ID,
});
