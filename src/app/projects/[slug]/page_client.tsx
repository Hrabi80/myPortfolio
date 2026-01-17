"use client";
import type { Project } from "@/domain/entities/project.entity";
import { Container } from "@/components/layout/primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Globe} from "lucide-react";
import Link from "next/link";
import { Gallery } from "@/components/ui/Gallery";
import ReactMarkdown from "react-markdown";

type ProjectClientProps = {
  project: Project;
};

export function ProjectClient({ project }: ProjectClientProps) {
  console.log("🚀 ~ ProjectClient ~ project description:", project)
  const galleryImages = project.gallery ?? [];

  return (
    <>
      <Container size="lg">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>
        
        {/* Header Section */}
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
                    <Globe className="mr-2 h-4 w-4" /> Live
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section> 

        {/* Main Content Grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {/* Description Section - Left (Wider) */}
          <section className="lg:col-span-2">
            <h2 className="mb-6 text-3xl font-semibold tracking-tight">Overview</h2>
            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
              <ReactMarkdown>
                {project.description}
              </ReactMarkdown>
            </div>
          </section>

          {/* Gallery Section - Right */}
          {galleryImages.length > 0 && (
            <section className="lg:col-span-1">
              <Gallery images={galleryImages} title="Project Gallery" />
            </section>
          )}
        </div>
      </Container>

     
    </>
  );
}