import { ProjectCard } from "@/features/projects/components/ProjectCard";
import type { fetchProjects } from "@/features/projects/services/fetch-projects";

type Projects = Awaited<ReturnType<typeof fetchProjects>>;

type ProjectsGridProps = {
  projects: Projects;
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects && projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
