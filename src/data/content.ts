import type { BlogPost, Project } from "@/domain/entities/project.entity";
import { env } from "@/env";
import { getBlocks, getDatabase, isNotionConfigured, isPageObject } from "@/lib/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";
import fallbackData from "./data.json";
import { sortByPublishedAt } from "@/utils/sorting";
import { mapToProject } from "@/features/projects/mappers/projects.mappers";

type NotionRichText = {
  plain_text: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  href?: string | null;
};

export type NotionBlock = {
  id: string;
  type: string;
  paragraph?: { rich_text: NotionRichText[] };
  heading_1?: { rich_text: NotionRichText[] };
  heading_2?: { rich_text: NotionRichText[] };
  heading_3?: { rich_text: NotionRichText[] };
  bulleted_list_item?: { rich_text: NotionRichText[] };
  numbered_list_item?: { rich_text: NotionRichText[] };
  code?: { rich_text: NotionRichText[]; language?: string };
  image?: { type: "external" | "file"; external?: { url: string }; file?: { url: string } };
  [key: string]: unknown;
};

export type ProjectWithBlocks = Project & { blocks?: NotionBlock[] };
export type BlogPostWithBlocks = BlogPost & { blocks?: NotionBlock[] };

type FallbackData = {
  projects: Project[];
  posts: BlogPostWithBlocks[];
};

const fallback = fallbackData;
export const projectFallback = fallback.projects;
export const blogsFallback = fallback.posts;
const getDatabaseId = (kind: "projects" | "blog") => {
  if (kind === "projects") {
    return env.NOTION_PROJECTS_DATABASE_ID ?? env.NOTION_DATABASE_ID;
  }
  return env.NOTION_BLOG_DATABASE_ID ?? env.NOTION_DATABASE_ID;
};


export const getFallbackProjectBySlug = (slug: string) => {
  return fallback.projects.find((project) => project.slug === slug) ?? null;
};

export const getFallbackPostBySlug = (slug: string) => {
  return fallback.posts.find((post) => post.slug === slug) ?? null;
};




