import type { Project } from "@/domain/entities/project.entity";
import { Container } from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, CheckCircle, Github, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GalleryLoader } from "@/components/ui/GalleryLoader";
import { dateFormatter } from "@/utils/date";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { NotionTag } from "@/components/ui/notion-tag";

type ProjectClientProps = {
  project: Project;
};

export function ProjectClient({ project }: ProjectClientProps) {
  const galleryImages = project.gallery ?? [];
  const coverImage = project.coverImage ?? galleryImages[0];

  return (
    <Container size="xl" className="py-10 md:py-14">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="mb-8 -ml-3 pl-0 hover:bg-transparent hover:text-primary"
      >
        <Link href="/projects">
          <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
          Back to projects
        </Link>
      </Button>

      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            {dateFormatter(project.publishedAt)} / case study
          </div>

          <h1 className="mt-3 font-display text-5xl leading-tight text-foreground md:text-6xl">
            {project.name}
          </h1>

          <p className="mt-4 text-xl font-medium leading-8 text-primary">
            {project.subTitle}
          </p>

          <MarkdownRenderer className="mt-5 text-muted-foreground">
            {project.summary}
          </MarkdownRenderer>

          {project.tags?.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <NotionTag key={tag.id} tag={tag} />
              ))}
            </div>
          ) : null}

          {coverImage ? (
            <div
              className="relative mt-10 aspect-video overflow-hidden rounded-xl border border-border surface-2"
              style={{ boxShadow: "var(--shadow-elevate-2)" }}
            >
              <Image
                src={coverImage}
                alt={`${project.name} project cover`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 760px"
              />
            </div>
          ) : null}

          <article className="mt-10 rounded-xl border border-border surface-2 p-6 md:p-8">
            <h2 className="font-display text-2xl text-foreground">
              Project overview
            </h2>
            <MarkdownRenderer className="mt-4 text-muted-foreground">
              {project.description}
            </MarkdownRenderer>
          </article>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <div
            className="rounded-xl border border-border surface-2 p-6"
            style={{ boxShadow: "var(--shadow-elevate-1)" }}
          >
            <h2 className="font-display text-xl text-foreground">
              Project details
            </h2>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Status</span>
                <span className="flex items-center gap-2 font-medium capitalize text-foreground">
                  <CheckCircle className="size-4 text-primary" aria-hidden="true" />
                  {project.status ?? "published"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Published</span>
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <Calendar className="size-4 text-muted-foreground" aria-hidden="true" />
                  {dateFormatter(project.publishedAt)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {project.live ? (
                <Button className="w-full" asChild>
                  <Link href={project.live} target="_blank">
                    <Globe className="size-4" aria-hidden="true" />
                    Live project
                  </Link>
                </Button>
              ) : null}
              {project.githubUrl ? (
                <Button variant="outline" className="w-full" asChild>
                  <Link href={project.githubUrl} target="_blank">
                    <Github className="size-4" aria-hidden="true" />
                    View code
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>

          {galleryImages.length > 0 ? (
            <div className="rounded-xl border border-border surface-2 p-5">
              <GalleryLoader images={galleryImages} title="Project gallery" />
            </div>
          ) : null}
        </aside>
      </div>
    </Container>
  );
}
