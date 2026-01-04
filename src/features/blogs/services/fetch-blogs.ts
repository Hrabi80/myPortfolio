import { cache } from "react";
import type { BlogMeta, BlogPost } from "@/domain/entities/blog.entity";
import { env } from "@/env";
import { FallbackBlogRepository } from "@/infra/fallback/blogs.repository";
import { isNotionConfigured } from "@/infra/notion/client";
import { NotionBlogRepository } from "@/infra/notion/blogs.repository";
import type { BlogRepository } from "../blog.repository";
import { BlogService } from "./blog.services";

const blogDbId = env.NOTION_BLOG_DATABASE_ID;

class ResilientBlogRepository implements BlogRepository {
  constructor(
    private readonly primary: BlogRepository,
    private readonly fallback: BlogRepository,
  ) {}

  async listMeta(): Promise<BlogMeta[]> {
    try {
      const posts = await this.primary.listMeta();
      return posts.length ? posts : await this.fallback.listMeta();
    } catch (error) {
      console.warn("Notion blogs fetch failed, using fallback data.", error);
      return this.fallback.listMeta();
    }
  }

  async getBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const post = await this.primary.getBySlug(slug);
      return post ?? (await this.fallback.getBySlug(slug));
    } catch (error) {
      console.warn("Notion blog fetch failed, using fallback data.", error);
      return this.fallback.getBySlug(slug);
    }
  }
}

const buildBlogService = () => {
  const fallbackRepository = new FallbackBlogRepository();

  if (!isNotionConfigured() || !blogDbId) {
    return new BlogService(fallbackRepository);
  }

  const notionRepository = new NotionBlogRepository(blogDbId);
  // Wrap the primary adapter to keep fallback behavior in one place.
  const repository = new ResilientBlogRepository(
    notionRepository,
    fallbackRepository,
  );
  return new BlogService(repository);
};

export const fetchBlogs = cache(async (): Promise<BlogMeta[]> => {
  const service = buildBlogService();
  return service.listMeta();
});

export const fetchBlogBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    const service = buildBlogService();
    return service.getBySlug(slug);
  },
);
