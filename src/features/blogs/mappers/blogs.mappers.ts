import type { PageObjectResponse } from "@notionhq/client";
import {
  getCover,
  getDate,
  getRichText,
  getTags,
  getTitle,
  getUrl,
} from "@/infra/notion/notion-property-getters";
import { BlogMeta } from "@/domain/entities/blog.entity";
import { BlockWithChildren } from "@/lib/notion";
import { NotionBlock } from "@/infra/notion/notion.types";

const normalizeSource = (value: string): "notion" | "medium" => {
  return value === "medium" ? "medium" : "notion";
};

export const mapToBlogMeta = (page: PageObjectResponse): BlogMeta => {
  // source is best as a Select property
  const source = normalizeSource(getRichText(page, "source"));

  return {
    id: page.id,
    slug: getRichText(page, "slug"),
    title: getRichText(page, "title"),
    summary: getRichText(page, "summary"),
    coverImage: getCover(page),
    tags: getTags(page, "tags"),
    status:
      (getRichText(page, "status") as "published" | "unpublished") ??
      "unpublished",
    publishedAt: getDate(page, "date"),
    source,
    canonicalUrl: getUrl(page, "canonical_url"),
    sourceUrl: source === "medium" ? getUrl(page, "source_url") : undefined,
  };
};
export const mapTree = (b: BlockWithChildren): NotionBlock => {
  const node = b as NotionBlock;
  node.children = b.children?.map(mapTree);
  return node;
};
