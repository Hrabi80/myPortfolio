import type { Tag } from "@/domain/entities/types";

export type NotionRichText = {
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
  quote?: { rich_text: NotionRichText[] };
  callout?: { rich_text: NotionRichText[]; icon?: { emoji?: string } };
  divider?: Record<string, never>;
  [key: string]: unknown;
};

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
  blocks: NotionBlock[];
};

export type MediumBlogPost = BlogMeta & {
  source: "medium";
  blocks?: never;
};

export type BlogPost = NotionBlogPost | MediumBlogPost;
