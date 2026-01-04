import type { BlogMeta, BlogPost } from "@/domain/entities/blog.entity";

export interface BlogRepository {
  listMeta(): Promise<BlogMeta[]>;
  getBySlug(slug: string): Promise<BlogPost | null>;
}
