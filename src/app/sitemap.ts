import type { MetadataRoute } from "next";
import experience_data from "@/data/experience.json";
import fallback_data from "@/data/data.json";

type ProjectLite = {
  slug: string;
  publishedAt?: string;
  status?: string;
};

function safe_date(date_str?: string, fallback: Date = new Date()): Date {
  if (!date_str) {
    return fallback;
  }

  const parsed = new Date(date_str);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base_url = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahmed-hrabi.vercel.app").replace(
    /\/$/,
    "",
  );

  const last_modified = new Date();

  const projects = (fallback_data as { projects?: ProjectLite[] }).projects ?? [];
  const experiences = experience_data as { id: string }[];

  const project_entries: MetadataRoute.Sitemap = projects
    .filter((project) => project.status !== "unpublished" && project.slug)
    .map((project) => ({
      url: `${base_url}/projects/${project.slug}`,
      lastModified: safe_date(project.publishedAt, last_modified),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const experience_entries: MetadataRoute.Sitemap = experiences
    .filter((experience) => experience.id)
    .map((experience) => ({
      url: `${base_url}/experience/${experience.id}`,
      lastModified: last_modified,
      changeFrequency: "yearly",
      priority: 0.4,
    }));

  return [
    {
      url: base_url,
      lastModified: last_modified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base_url}/projects`,
      lastModified: last_modified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base_url}/blog`,
      lastModified: last_modified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base_url}/experience`,
      lastModified: last_modified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...project_entries,
    ...experience_entries,
  ];
}
