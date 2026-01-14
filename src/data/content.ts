import type { BlogPost } from "@/domain/entities/blog.entity";
import type { Project } from "@/domain/entities/project.entity";
import fallbackData from "./data.json";

type FallbackData = {
  projects: Project[];
  posts: BlogPost[];
};

const fallback: FallbackData = fallbackData as unknown as FallbackData;
export const projectFallback = fallback.projects;
export const blogsFallback = fallback.posts;
export const getFallbackProjectBySlug = (slug: string) => {
  return fallback.projects.find((project) => project.slug === slug) ?? null;
};

export const getFallbackPostBySlug = (slug: string) => {
  return fallback.posts.find((post) => post.slug === slug) ?? null;
};



