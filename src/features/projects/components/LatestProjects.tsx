import { Button } from "@/components/ui/button";
import { Project } from "@/domain/entities/project.entity";
import { fetchProjects } from "@/features/projects/services/fetch-projects";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import Image from "next/image";



export async function LatestProjectsSection() {
  const projects = await fetchProjects();
  if(!projects || !projects.length)
  return (
   <h3>no projects found</h3>
   )
  const latestProjects = projects.slice(0,3)
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="opacity-0 animate-fade-up">
            <p className="mb-2 font-medium text-primary">Recent Work</p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Latest Projects
            </h2>
          </div>

          <div className="opacity-0 animate-fade-up stagger-1">
            <Button variant="outline" asChild>
              <Link href="/projects">
                See All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-16 flex justify-center opacity-0 animate-fade-up stagger-3">
          <Image
            width={100}
            height={100}
            src="/assets/projects-illustration.png"
            alt="Projects illustration"
            className="w-48 animate-float opacity-50"
          />
        </div>
      </div>
    </section>
  );
}
