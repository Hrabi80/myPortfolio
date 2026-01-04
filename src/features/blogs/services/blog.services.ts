import { BlogRepository } from "../blog.repository";

export class BlogService {
  constructor(private readonly blog_repository: BlogRepository) {}

  async listMeta() {
    return this.blog_repository.listMeta();
  }

  async getBySlug(slug: string) {
    return this.blog_repository.getBySlug(slug);
  }
}
