import { cache } from "react";
import { env } from "@/env";
import { getDatabase, getPageBlocks, isNotionConfigured, isPageObject } from "@/lib/notion";
import { BlogMeta, BlogPost } from "@/domain/entities/blog.entity";
import { mapToBlogMeta } from "../mappers/blogs.mappers";

const blogDbId = env.NOTION_BLOG_DATABASE_ID;

export const fetchBlogs = cache(async (): Promise<BlogMeta[]> => {
  if (!isNotionConfigured() || !blogDbId) {
    return [];
  }

  const res = await getDatabase(blogDbId, {
    filter: {
      property: "status",
      status: { equals: "published" },
    },
    sorts: [{ property: "date", direction: "descending" }],
  });

  return res.results.filter(isPageObject).map(mapToBlogMeta);
});

export const fetchBlogBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!isNotionConfigured() || !blogDbId) {
    return null;
  }

  const res = await getDatabase(blogDbId, {
    filter: {
      and: [
        { property: "slug", rich_text: { equals: slug } },
        { property: "status", status: { equals: "published" } },
      ],
    },
    page_size: 1,
  });

  const page = res.results.find(isPageObject);
  if (!page) {
    return null;
  }

  const meta = mapToBlogMeta(page);

  // Medium blog: no blocks, you usually link out.
  if (meta.source === "medium") {
    return meta;
  }

  // Notion blog: fetch blocks (the page content)
  const blocks = await getPageBlocks(page.id);

  return {
    ...meta,
    source: "notion",
    blocks,
  };
});
