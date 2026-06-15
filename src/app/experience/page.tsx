import { ExperienceSection } from "@/features/experience/components";
import { JsonLd } from "@/components/seo/JsonLd";
import experienceData from "@/data/experience.json";
import { collectionPageJsonLd } from "@/lib/seo";
import type { Experience } from "@/types/experience";
import { Metadata } from "next";

const experiences = experienceData as Experience[];

export const metadata: Metadata = {
  title: "Experience | Full-Stack Software Engineer",
  description:
    "Professional experience of Ahmed Hrabi, a Tunisia-based full-stack software engineer building e-learning, healthcare, marketplace, CRM, and multilingual web platforms.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience | Ahmed Hrabi",
    description:
      "Career timeline across full-stack web development, Next.js, NestJS, Angular, Payload CMS, and scalable product engineering.",
    url: "/experience",
    type: "profile",
  },
};

export default function ExperiencePage() {
  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          path: "/experience",
          name: "Professional Experience",
          description:
            "Professional experience of Ahmed Hrabi across full-stack web development, Next.js, NestJS, Angular, Payload CMS, and scalable product engineering.",
          items: experiences.map((experience) => ({
            name: `${experience.title} at ${experience.company}`,
            href: `/experience/${experience.id}`,
            description: experience.summary,
          })),
        })}
      />
      <ExperienceSection />
    </>
  );
}
