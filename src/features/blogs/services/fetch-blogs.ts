import { cache } from "react";
import { blogsFallback, getFallbackPostBySlug } from "@/data/content";
import { env } from "@/env";
import {
  getDatabase,
  getPageBlockTree,
  isNotionConfigured,
  isPageObject,
} from "@/lib/notion";
import { BlogMeta, BlogPost } from "@/domain/entities/blog.entity";
import { mapToBlogMeta, mapTree } from "../mappers/blogs.mappers";
const blogDbId = env.NOTION_BLOG_DATABASE_ID;

export const fetchBlogs = cache(async (): Promise<BlogMeta[]> => {
  if (!isNotionConfigured() || !blogDbId) {
    return blogsFallback.map(({ blocks, ...meta }) => meta);
  }

  try {
    const res = await getDatabase(blogDbId, {
      filter: {
        property: "status",
        status: { equals: "published" },
      },
      sorts: [{ property: "date", direction: "descending" }],
    });
    console.log("🚀 ~ res:", res);

    const posts = res.results.filter(isPageObject).map(mapToBlogMeta);
    return posts.length
      ? posts
      : blogsFallback.map(({ blocks, ...meta }) => meta);
  } catch (error) {
    console.warn("Notion blogs fetch failed, using fallback data.", error);
    return blogsFallback.map(({ blocks, ...meta }) => meta);
  }
});

export const fetchBlogBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    const fallbackPost = getFallbackPostBySlug(slug);
    if (!isNotionConfigured() || !blogDbId) {
      return fallbackPost;
    }

    try {
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
        return fallbackPost;
      }

      const meta = mapToBlogMeta(page);

      // Medium blog: no blocks, you usually link out.
      if (meta.source === "medium") {
        return { ...meta, source: "medium" };
      }

      // Notion blok : fetch blocks (the page content) that support nested block
      const blockTree = await getPageBlockTree(page.id);

      const blocks = blockTree.map(mapTree);

      return {
        ...meta,
        source: "notion",
        blocks,
      };
    } catch (error) {
      console.warn("Notion blog fetch failed, using fallback data.", error);
      return fallbackPost;
    }
  }
);
