import type { Project } from "@/domain/entities/project.entity";
import { Container } from "@/components/layout/primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const heroImage = project.coverImage ?? project.gallery?.[0] ?? null;
  const gallery = project.gallery?.filter((image) => image !== heroImage) ?? [];

  return (
    <Container size="lg">
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>
      </Button>
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{project.publishedAt}</p>
          <div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-lg text-muted-foreground">{project.subTitle}</p>
          </div>
          <p className="text-base leading-7 text-foreground/90">{project.summary}</p>
          {project.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium capitalize">{project.status ?? "published"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Published</span>
              <span className="font-medium">{project.publishedAt}</span>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <Link href={project.githubUrl} target="_blank">
                  <Github className="mr-2 h-4 w-4" /> View Code
                </Link>
              </Button>
            )}
            {project.live && (
              <Button asChild>
                <Link href={project.live} target="_blank">
                  <Globe className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {heroImage ? (
        <section className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
            <Image
              width={1400}
              height={800}
              src={heroImage}
              alt={project.name}
              className="h-full w-full object-cover"
            />
          </div>
          {gallery.length ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {gallery.map((image, index) => (
                <div key={`${project.id}-gallery-${index}`} className="overflow-hidden rounded-2xl border border-border/60 bg-card">
                  <Image
                    width={1200}
                    height={900}
                    src={image}
                    alt={`${project.name} preview ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="mt-12 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-soft md:p-8">
        <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
        <p className="text-base leading-7 text-muted-foreground">{project.description}</p>
      </section>
    </Container>
  );
}
