import { BlockWrapper } from "@/components/layout/block-wrapper";
import { Button } from "@/components/ui/button";
import { fetchProjects } from "@/features/projects/services/fetch-projects";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";

export async function LatestProjectsSection() {
  const projects = await fetchProjects();

  if (!projects?.length) {
    return (
      <BlockWrapper size="medium">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-2xl text-foreground">
            No projects found
          </h2>
          <p className="mt-2 text-muted-foreground">
            Publish a project in Notion or fallback data and refresh.
          </p>
        </div>
      </BlockWrapper>
    );
  }

  const latestProjects = projects.slice(0, 3);

  return (
    <BlockWrapper size="medium">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="opacity-0 animate-fade-up">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Recent work
            </p>
            <h2 className="mt-1 font-display text-3xl text-foreground md:text-4xl">
              Latest projects
            </h2>
          </div>

          <div className="opacity-0 animate-fade-up stagger-1">
            <Button variant="outline" asChild>
              <Link href="/projects">
                See all projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {latestProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </BlockWrapper>
  );
}
