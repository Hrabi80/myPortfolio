import { ProjectClient } from "./page_client";
import { ProjectNotFound } from "@/features/projects/components/ProjectNotFound";
import {
  fetchProjectBySlug,
  fetchProjects,
} from "@/features/projects/services/fetch-projects";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects?.map((project) => ({ slug: project.slug })) ?? [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${project.name} Case Study`;
  const description =
    project.summary ||
    `${project.name}, a full-stack web development project by Ahmed Hrabi.`;
  const image =
    project.coverImage ?? project.gallery?.[0] ?? "/assets/projects-illustration.webp";

  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description,
      url: `/projects/${slug}`,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) {
    return <ProjectNotFound />;
  }

  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahmed-hrabi.vercel.app"
  ).replace(/\/$/, "");

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.name,
    description: project.summary,
    datePublished: project.publishedAt,
    image: project.coverImage ?? project.gallery?.[0],
    url: `${baseUrl}/projects/${slug}`,
    creator: {
      "@type": "Person",
      name: "Ahmed Hrabi",
      url: baseUrl,
    },
    keywords: project.tags?.map((tag) => tag.name).join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectClient project={project} />
    </>
  );
}
