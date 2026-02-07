import type { MetadataRoute } from "next";
import experience_data from "@/data/experience.json";
import { fetchBlogs } from "@/features/blogs/services/fetch-blogs";
import { fetchProjects } from "@/features/projects/services/fetch-projects";

export const revalidate = 3600; // Regenerate sitemap every hour



function safe_date(date_str?: string, fallback: Date = new Date()): Date {
  if (!date_str) {
    return fallback;
  }

  const parsed = new Date(date_str);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

function is_public_status(status?: string): boolean {
  if (!status) {
    return true;
  }

  const normalized = status.toLowerCase().trim();
  return !["unpublished", "draft", "private", "hidden"].includes(normalized);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base_url = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahmed-hrabi.vercel.app").replace(
    /\/$/,
    "",
  );

  const last_modified = new Date();

  const projects = (await fetchProjects()) as { slug?: string; status?: string; publishedAt?: string }[];
  const experiences = experience_data as { id: string }[];

  const project_entries: MetadataRoute.Sitemap = projects
    .filter((project) => project.status !== "unpublished" && Boolean(project.slug))
    .map((project) => ({
      url: `${base_url}/projects/${project.slug}`,
      lastModified: safe_date(project.publishedAt, last_modified),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const experience_entries: MetadataRoute.Sitemap = experiences
    .filter((experience) => Boolean(experience.id))
    .map((experience) => ({
      url: `${base_url}/experience/${experience.id}`,
      lastModified: last_modified,
      changeFrequency: "yearly",
      priority: 0.4,
    }));

  let blog_entries: MetadataRoute.Sitemap = [];

  try {
    const posts = (await fetchBlogs());

    blog_entries = posts
      .filter((post) => Boolean(post?.slug))
      .filter((post) => (typeof post.publishedAt === "boolean" ? post.publishedAt : true))
      .filter((post) => is_public_status(post.status))
      .map((post) => {
        const date_str = post.publishedAt ;

        return {
          url: `${base_url}/blog/${post.slug}`,
          lastModified: safe_date(date_str, last_modified),
          changeFrequency: "monthly",
          priority: 0.7,
        };
      });
  } catch (error) {
    console.error("Sitemap: failed to fetch blogs", error);
    blog_entries = [];
  }

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
    ...blog_entries,
  ];
}
