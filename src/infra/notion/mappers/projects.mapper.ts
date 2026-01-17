import type { PageObjectResponse } from "@notionhq/client";
import type { Project } from "@/domain/entities/project.entity";
import {
  getDate,
  getFile,
  getFiles,
  getRichText,
  getRichTextMarkdown,
  getTags,
  getTitle,
  getUrl,
} from "@/infra/notion/helpers/notion-property-getters";

export const mapToProject = (page: PageObjectResponse): Project => {
  return {
    id: page.id,
    slug: getRichText(page, "slug"),
    name: getTitle(page, "name"),
    summary: getRichTextMarkdown(page, "summary"),
    coverImage: getFile(page, "cover-image"),
    tags: getTags(page, "tags"),
    githubUrl: getUrl(page, "GitHub"),
    live: getUrl(page, "live"),
    publishedAt: getDate(page, "date"),
    subTitle: getRichText(page, "sub-title"),
    description: getRichTextMarkdown(page, "description"),
    gallery: getFiles(page, "gallery"),
  };
};
