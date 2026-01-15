import type { PageObjectResponse } from "@notionhq/client";
import {
  getCover,
  getDate,
  getRichText,
  getTags,
  getUrl,
} from "@/infra/notion/helpers/notion-property-getters";
import type { BlogMeta } from "@/domain/entities/blog.entity";

const normalizeSource = (value: string): "notion" | "medium" => {
  return value === "medium" ? "medium" : "notion";
};

export const mapToBlogMeta = (page: PageObjectResponse): BlogMeta => {
  // Source is best modeled as a Select in Notion.
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
