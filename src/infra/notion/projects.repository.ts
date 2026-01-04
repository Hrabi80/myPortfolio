import type { Project } from "@/domain/entities/project.entity";
import type { ProjectRepository } from "@/features/projects/project.repository";
import { getDatabase, isPageObject } from "@/infra/notion/client";
import { mapToProject } from "@/infra/notion/projects.mapper";

export class NotionProjectRepository implements ProjectRepository {
  constructor(private readonly databaseId: string) {}

  async list(): Promise<Project[]> {
    const response = await getDatabase(this.databaseId, {
      filter: {
        property: "status",
        status: { equals: "published" },
      },
    });
    const pages = response.results.filter(isPageObject);
    return pages.map(mapToProject);
  }

  async getBySlug(slug: string): Promise<Project | null> {
    const response = await getDatabase(this.databaseId, {
      filter: {
        and: [
          { property: "slug", rich_text: { equals: slug } },
          { property: "status", status: { equals: "published" } },
        ],
      },
      page_size: 1,
    });

    const page = response.results.find(isPageObject);
    return page ? mapToProject(page) : null;
  }
}
