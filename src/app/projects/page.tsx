import { ProjectsEmpty } from "@/features/projects/components/ProjectEmpty";
import { ProjectsGrid } from "@/features/projects/components/ProjectGrid";
import { ProjectsHero } from "@/features/projects/components/ProjectHero";
import { fetchProjects } from "@/features/projects/services/fetch-projects";

export const revalidate = 60;

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
