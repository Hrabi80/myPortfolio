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

const normalize_source = (value: string): "notion" | "medium" => {
  return value === "medium" ? "medium" : "notion";
};

export const mapToBlogMeta = (page: PageObjectResponse): BlogMeta => {
  // source is best as a Select property
  const source = normalize_source(getRichText(page, "source"));

  return {
    id: page.id,
    slug: getRichText(page, "slug"),
    title: getTitle(page, "name"),
    summary: getRichText(page, "summary"),
    coverImage: getCover(page),
    tags: getTags(page, "tags"),
    status: (getRichText(page, "status") as "published" | "unpublished") ?? "unpublished",
    publishedAt: getDate(page, "date"),
    source,
    canonicalUrl: getUrl(page, "canonical_url"),
    sourceUrl: source === "medium" ? getUrl(page, "source_url") : undefined,
  };
};
