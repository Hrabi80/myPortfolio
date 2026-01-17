"use client";
import type { Project } from "@/domain/entities/project.entity";
import { Container } from "@/components/layout/primitives";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Globe, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Gallery } from "@/components/ui/Gallery";
import { dateFormatter } from "@/utils/date";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { NotionTag } from "@/components/ui/notion-tag";

type ProjectClientProps = {
  project: Project;
};

export function ProjectClient({ project }: ProjectClientProps) {
  const galleryImages = project.gallery ?? [];

  return (
    <>
      <Container size="2xl">
        {/* Back Link */}
        <Button variant="ghost" size="sm" asChild className="mb-8 group pl-0 hover:bg-transparent hover:text-primary">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Projects
          </Link>
        </Button>
        
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content - Header Info */}
          <div className="lg:col-span-2 min-w-0 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <p className="mb-4 text-sm text-muted-foreground">
              {dateFormatter(project.publishedAt)}
            </p>
            <h1 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
              {project.name}
            </h1>
            <p className="mb-6 text-xl font-medium text-primary">
              {project.subTitle}
            </p>
            <MarkdownRenderer className="mb-6 text-muted-foreground">
              {project.summary}
            </MarkdownRenderer>
            {project.tags?.length ? (
              <div className="mb-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <NotionTag key={tag.id} tag={tag} />
                ))}
              </div>
            ) : null}
          </div>

          {/* Sidebar - Right (Mobile: Order 2, Desktop: Right Col) */}
          <div className="space-y-8 lg:col-span-1 lg:row-span-2 h-fit">
            {/* Status Card */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="flex items-center gap-2 font-medium text-foreground capitalize">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {project.status ?? "published"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Published</span>
                  <span className="flex items-center gap-2 font-medium text-foreground">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {dateFormatter(project.publishedAt)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                {project.live && (
                  <Button className="w-full" asChild>
                    <Link href={project.live} target="_blank">
                      <Globe className="mr-2 h-4 w-4" /> Live
                    </Link>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={project.githubUrl} target="_blank">
                      <Github className="mr-2 h-4 w-4" /> View Code
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <div className="opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                <Gallery images={galleryImages} title="Project Gallery" />
              </div>
            )}
          </div>

          {/* Main Content - Rich Description (Mobile: Order 3) */}
          <div className="lg:col-span-2 min-w-0 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '150ms' }}>
            {/* Rich Content */}
            <MarkdownRenderer>
              {project.description}
            </MarkdownRenderer>
          </div>
        </div>
      </Container>
    </>
  );
}