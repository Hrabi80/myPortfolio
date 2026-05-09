import { ProjectsEmpty } from "@/features/projects/components/ProjectEmpty";
import { ProjectsGrid } from "@/features/projects/components/ProjectGrid";
import { ProjectsHero } from "@/features/projects/components/ProjectHero";
import { fetchProjects } from "@/features/projects/services/fetch-projects";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects | Full-Stack Web Development Case Studies",
  description:
    "Selected web development projects by Ahmed Hrabi, including Next.js, Payload CMS, Angular, NestJS, SEO, and multilingual platform work.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Ahmed Hrabi",
    description:
      "Full-stack web development case studies focused on performant, SEO-friendly business platforms.",
    url: "/projects",
    type: "website",
  },
};

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <>
      <ProjectsHero />
      {projects?.length ? (
        <ProjectsGrid projects={projects} />
      ) : (
        <ProjectsEmpty />
      )}
    </>
  );
}
