import type { Project } from "@/domain/entities/project.entity";

export interface ProjectRepository {
  list(): Promise<Project[]>;
  getBySlug(slug: string): Promise<Project | null>;
}
