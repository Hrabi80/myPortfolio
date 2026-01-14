import { Project } from "@/domain/entities/project.entity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => (
  <Link href={`/projects/${project.slug}`} className="group block">
    <div
      className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-[var(--shadow-hover)] opacity-0 animate-fade-up"
      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
    >
      <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-muted">
        {project.coverImage || project.gallery?.length ?  (
          <Image
            width={200}
            height={200}
            src={project.coverImage ?? project.gallery?.[0] ?? ""}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/15 via-transparent to-accent/20" />
        )}
      </div>

      <h3 className="font-display mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
        {project.name}
      </h3>

      <p className="mb-4 text-sm text-muted-foreground">
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags && project.tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <span className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80">
        View Project
        <ArrowRight className="ml-1 h-4 w-4" />
      </span>
    </div>
  </Link>
);
