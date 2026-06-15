import { ProjectClient } from "./page_client";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  fetchProjectBySlug,
  fetchProjects,
} from "@/features/projects/services/fetch-projects";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  personId,
  websiteId,
} from "@/lib/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
    notFound();
  }

  const pageUrl = absoluteUrl(`/projects/${slug}`);
  const image = absoluteUrl(project.coverImage ?? project.gallery?.[0]);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: project.name, href: `/projects/${slug}` },
  ]);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${project.name} Case Study`,
        headline: `${project.name} Case Study`,
        description: project.summary,
        inLanguage: "en",
        isPartOf: {
          "@id": websiteId,
        },
        author: {
          "@id": personId,
        },
        mainEntity: {
          "@id": `${pageUrl}#creativework`,
        },
        breadcrumb: {
          "@id": breadcrumb["@id"],
        },
      },
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#creativework`,
        name: project.name,
        headline: project.name,
        abstract: project.subTitle,
        description: project.summary,
        text: project.description,
        datePublished: project.publishedAt,
        dateModified: project.publishedAt,
        image,
        url: pageUrl,
        creator: {
          "@id": personId,
        },
        author: {
          "@id": personId,
        },
        keywords: project.tags?.map((tag) => tag.name).join(", "),
        about: project.tags?.map((tag) => ({
          "@type": "Thing",
          name: tag.name,
        })),
        isPartOf: {
          "@id": `${absoluteUrl("/projects")}#itemlist`,
        },
        mainEntityOfPage: {
          "@id": `${pageUrl}#webpage`,
        },
      },
      breadcrumb,
    ],
  };

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <ProjectClient project={project} />
    </>
  );
}
