import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ProjectClient } from "./page_client";
import { ProjectNotFound } from "@/features/projects/components/ProjectNotFound";
import { fetchProjectBySlug } from "@/features/projects/services/fetch-projects";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <div className="py-20">
      <ProjectClient project={project} />
    </div>
  );
}
