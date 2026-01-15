import type { BlogMeta, BlogPost } from "@/domain/entities/blog.entity";
import type { BlogRepository } from "@/features/blogs/blog.repository";
import { getDatabase, getPageBlockTree, isPageObject } from "@/infra/notion/client";
import { mapToBlogMeta } from "@/infra/notion/mappers/blogs.mapper";
import { map_notion_block_tree_to_content_blocks } from "@/infra/notion/helpers/notion.mapper";
import type { NotionBlock } from "@/infra/notion/helpers/notion.types";

export class NotionBlogRepository implements BlogRepository {
  constructor(private readonly databaseId: string) {}

  async listMeta(): Promise<BlogMeta[]> {
    const res = await getDatabase(this.databaseId, {
      filter: {
        property: "status",
        status: { equals: "published" },
      },
      sorts: [{ property: "date", direction: "descending" }],
    });

    return res.results.filter(isPageObject).map(mapToBlogMeta);
  }

  async getBySlug(slug: string): Promise<BlogPost | null> {
    const res = await getDatabase(this.databaseId, {
      filter: {
        and: [
          { property: "slug", rich_text: { equals: slug } },
          { property: "status", status: { equals: "published" } },
        ],
      },
      page_size: 1,
    });

    const page = res.results.find(isPageObject);
    if (!page) return null;

    const meta = mapToBlogMeta(page);

    if (meta.source === "medium") {
      return { ...meta, source: "medium" };
    }

    // Fetch full block tree for nested structures (columns, toggles, etc).
    const blockTree = await getPageBlockTree(page.id);
    const blocks = map_notion_block_tree_to_content_blocks(blockTree as NotionBlock[]);

    return { ...meta, source: "notion", blocks };
  }
}
