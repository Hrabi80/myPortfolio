import type { Tag } from "@/domain/entities/types";
import type { ContentBlock } from "./content-notion";



export type BlogSource = "notion" | "medium";

export type BlogMeta = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
  tags: Tag[];
  status?: "published" | "unpublished";
  publishedAt: string;
  source: BlogSource;
  /**
   * For Medium posts: points to Medium (or canonical URL).
   * For Notion posts: optional canonical URL if you also publish elsewhere.
   */
  canonicalUrl?: string;

  /**
   * For Medium: medium post URL.
   * For Notion: undefined.
   */
  sourceUrl?: string;
};

export type NotionBlogPost = BlogMeta & {
  source: "notion";
  blocks: ContentBlock[];
};

export type MediumBlogPost = BlogMeta & {
  source: "medium";
  blocks?: never;
};

export type BlogPost = NotionBlogPost | MediumBlogPost;
