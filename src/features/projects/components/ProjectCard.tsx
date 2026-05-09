import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { NotionTag } from "@/components/ui/notion-tag";
import { Project } from "@/domain/entities/project.entity";
import { dateFormatter } from "@/utils/date";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const image = project.coverImage ?? project.gallery?.[0];

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border surface-2 p-5 transition-all hover:border-primary/40"
        style={{
          animationDelay: `${0.08 * (index + 1)}s`,
          boxShadow: "var(--shadow-elevate-1)",
          transform: `perspective(1100px) rotateX(3deg) rotateY(${
            (index % 3) - 1
          }deg)`,
        }}
      >
        <div className="relative mb-5 aspect-video overflow-hidden rounded-lg border border-border/70 bg-background/60">
          {image ? (
            <Image
              fill
              src={image}
              alt={`${project.name} project preview`}
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 384px"
            />
          ) : (
            <div className="h-full w-full gradient-primary opacity-90" />
          )}
        </div>

        <div className="flex items-baseline gap-3 font-mono text-xs">
          <span className="text-primary">
            {dateFormatter(project.publishedAt)}
          </span>
          <span className="text-muted-foreground">/ project</span>
        </div>

        <h3 className="mt-2 font-display text-2xl text-foreground transition-colors group-hover:text-primary">
          {project.name}
        </h3>

        {project.subTitle ? (
          <p className="mt-1 text-sm font-medium text-primary/90">
            {project.subTitle}
          </p>
        ) : null}

        <MarkdownRenderer className="mt-3 line-clamp-3 text-sm text-muted-foreground prose-p:my-0">
          {project.summary}
        </MarkdownRenderer>

        {project.tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 5).map((tag, tagIndex) => (
              <NotionTag key={tag.id || tagIndex} tag={tag} />
            ))}
          </div>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-primary">
          View Project
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </article>
    </Link>
  );
};
