import { ExperienceDetailClient } from "./page_client";
import experienceData from "@/data/experience.json";
import { Experience } from "@/types/experience";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const experiences = experienceData as Experience[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return experiences.map((exp) => ({
    slug: exp.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = experiences.find((exp) => exp.id === slug);

  if (!experience) {
    return {
      title: "Experience Not Found",
    };
  }

  return {
    title: `${experience.title} at ${experience.company} | Hrabi`,
    description:
      experience.summary ||
      `${experience.title} at ${experience.company}, part of Ahmed Hrabi's full-stack software engineering experience.`,
    alternates: {
      canonical: `/experience/${slug}`,
    },
    openGraph: {
      title: `${experience.title} at ${experience.company}`,
      description:
        experience.summary ||
        `${experience.title} at ${experience.company}, part of Ahmed Hrabi's full-stack software engineering experience.`,
      url: `/experience/${slug}`,
      type: "profile",
    },
  };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { slug } = await params;
  const experience = experiences.find((exp) => exp.id === slug);

  if (!experience) {
    notFound();
  }

  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahmed-hrabi.vercel.app"
  ).replace(/\/$/, "");

  const experienceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Role",
    roleName: experience.title,
    startDate: experience.period,
    description: experience.summary,
    url: `${baseUrl}/experience/${slug}`,
    memberOf: {
      "@type": "Organization",
      name: experience.company,
    },
    performer: {
      "@type": "Person",
      name: "Ahmed Hrabi",
      url: baseUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(experienceJsonLd) }}
      />
      <ExperienceDetailClient experience={experience} />
    </>
  );
}
