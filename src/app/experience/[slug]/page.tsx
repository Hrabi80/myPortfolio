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
    description: experience.summary || `${experience.title} at ${experience.company}`,
    alternates: {
      canonical: `/experience/${slug}`,
    },
  };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { slug } = await params;
  const experience = experiences.find((exp) => exp.id === slug);

  if (!experience) {
    notFound();
  }

  return <ExperienceDetailClient experience={experience} />;
}
