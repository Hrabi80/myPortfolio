import { cache } from "react";
import type { Project } from "@/domain/entities/project.entity";
import { env } from "@/env";
import { FallbackProjectRepository } from "@/infra/fallback/projects.repository";
import { isNotionConfigured } from "@/infra/notion/client";
import { NotionProjectRepository } from "@/infra/notion/projects.repository";
import { sortByPublishedAt } from "@/utils/sorting";
import type { ProjectRepository } from "../project.repository";
import { ProjectService } from "./project.services";

const projectDbId = env.NOTION_PROJECTS_DATABASE_ID;

class ResilientProjectRepository implements ProjectRepository {
  constructor(
    private readonly primary: ProjectRepository,
    private readonly fallback: ProjectRepository,
  ) {}

  async list(): Promise<Project[]> {
    try {
      const projects = await this.primary.list();
      return projects.length ? projects : await this.fallback.list();
    } catch (error) {
      console.warn("Notion projects fetch failed, using fallback data.", error);
      return this.fallback.list();
    }
  }

  async getBySlug(slug: string): Promise<Project | null> {
    try {
      const project = await this.primary.getBySlug(slug);
      return project ?? (await this.fallback.getBySlug(slug));
    } catch (error) {
      console.warn("Notion project fetch failed, using fallback data.", error);
      return this.fallback.getBySlug(slug);
    }
  }
}

const buildProjectService = () => {
  const fallbackRepository = new FallbackProjectRepository();

  if (!isNotionConfigured() || !projectDbId) {
    return new ProjectService(fallbackRepository);
  }

  const notionRepository = new NotionProjectRepository(projectDbId);
  const repository = new ResilientProjectRepository(
    notionRepository,
    fallbackRepository,
  );
  return new ProjectService(repository);
};

export const fetchProjects = cache(async (): Promise<Project[] | null> => {
  const service = buildProjectService();
  const projects = await service.list();
  return sortByPublishedAt(projects);
});

export const fetchProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
    const service = buildProjectService();
    return service.getBySlug(slug);
  },
);
