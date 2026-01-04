import { getFallbackProjectBySlug, projectFallback } from "@/data/content";
import { Project } from "@/domain/entities/project.entity";
import { env } from "@/env";

import { getDatabase, isNotionConfigured, isPageObject } from "@/lib/notion";
import { sortByPublishedAt } from "@/utils/sorting";
import { cache } from "react";
import { mapToProject } from "../mappers/projects.mappers";
const projectDbId = env.NOTION_PROJECTS_DATABASE_ID;

export const fetchProjects = cache(async (): Promise<Project[] | null> => {
  if (!isNotionConfigured() || !projectDbId) {
    return sortByPublishedAt(projectFallback);
  }
  try {
    const response = await getDatabase(projectDbId, {
      filter: {
        property: "status",
        status: { equals: "published" },
      },
    });
    const pages = response.results.filter(isPageObject);
    const projectList = pages.map(mapToProject);
    return projectList.length
      ? sortByPublishedAt(projectList)
      : sortByPublishedAt(projectFallback);
  } catch (error) {
    console.warn("Notion projects fetch failed, using fallback data.", error);
    return sortByPublishedAt(projectFallback);
  }
});

export const fetchProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
    const fallbackProject = getFallbackProjectBySlug(slug);

    if (!isNotionConfigured() || !projectDbId) {
      return fallbackProject;
    }

    try {
      const res = await getDatabase(projectDbId, {
        filter: {
          and: [
            {
              property: "slug",
              rich_text: { equals: slug },
            },
            {
              property: "status",
              status: { equals: "published" },
            },
          ],
        },
        page_size: 1,
      });

      const page = res.results.find(isPageObject);
      if (!page) {
        return fallbackProject;
      }

      //const blocks = await getBlocks(page.id);

      return { ...project };
    } catch (error) {
      console.warn("Notion project fetch failed, using fallback data.", error);
      return fallbackProject;
    }
  }
);
