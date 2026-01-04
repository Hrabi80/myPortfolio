import type { BlogMeta, BlogPost } from "@/domain/entities/blog.entity";
import type { BlogRepository } from "@/features/blogs/blog.repository";
import { blogsFallback, getFallbackPostBySlug } from "@/data/content";
import { map_notion_block_tree_to_content_blocks } from "@/infra/notion/notion.mapper";
import type { NotionBlock } from "@/infra/notion/notion.types";

export class FallbackBlogRepository implements BlogRepository {
  async listMeta(): Promise<BlogMeta[]> {
    // Local JSON adapter for offline/failed Notion access.
    return blogsFallback.map(({ blocks, ...meta }) => meta);
  }

  async getBySlug(slug: string): Promise<BlogPost | null> {
    const post = getFallbackPostBySlug(slug);
    if (!post) return null;

    if (post.source === "medium") {
      return post;
    }

    const blocks = map_notion_block_tree_to_content_blocks(
      (post.blocks ?? []) as NotionBlock[],
    );

    return { ...post, blocks };
  }
}
