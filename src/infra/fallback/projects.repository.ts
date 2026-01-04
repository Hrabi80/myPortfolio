import type { Project } from "@/domain/entities/project.entity";
import type { ProjectRepository } from "@/features/projects/project.repository";
import { getFallbackProjectBySlug, projectFallback } from "@/data/content";

export class FallbackProjectRepository implements ProjectRepository {
  async list(): Promise<Project[]> {
    return [...projectFallback];
  }

  async getBySlug(slug: string): Promise<Project | null> {
    return getFallbackProjectBySlug(slug);
  }
}
