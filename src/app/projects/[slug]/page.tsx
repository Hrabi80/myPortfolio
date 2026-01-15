import { ProjectClient } from "./page_client";
import { ProjectNotFound } from "@/features/projects/components/ProjectNotFound";
import { fetchProjectBySlug } from "@/features/projects/services/fetch-projects";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log("ProjectPage slug:", slug);
  const project = await fetchProjectBySlug(slug);
  console.log("🚀 ~ ProjectPage ~ project:", project)
  console.log("ProjectPage project found:", !!project);

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <div className="py-20">
      <ProjectClient project={project} />
    </div>
  );
}
