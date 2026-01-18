import type { MetadataRoute } from "next";
import experienceData from "@/data/experience.json";
import fallbackData from "@/data/data.json";

type ProjectLite = { slug: string; publishedAt?: string; status?: string };

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahmed-hrabi.vercel.app").replace(/\/$/, "");
  const lastModified = new Date();

  const projects = (fallbackData as { projects: ProjectLite[] }).projects ?? [];
  const experiences = experienceData as { id: string }[];

  const projectEntries: MetadataRoute.Sitemap = projects
    .filter((project) => project.status !== "unpublished")
    .map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.publishedAt ? new Date(project.publishedAt) : lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const experienceEntries: MetadataRoute.Sitemap = experiences.map((experience) => ({
    url: `${baseUrl}/experience/${experience.id}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...projectEntries,
    ...experienceEntries,
  ];
}
