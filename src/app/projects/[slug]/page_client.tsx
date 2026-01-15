"use client";

import { useState } from "react";
import type { Project } from "@/domain/entities/project.entity";
import { Container } from "@/components/layout/primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Globe, Maximize2, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Gallery } from "@/components/ui/Gallery";
import { AnimatePresence, motion } from "framer-motion";

type ProjectClientProps = {
  project: Project;
};

export function ProjectClient({ project }: ProjectClientProps) {
  const [isCoverLightboxOpen, setIsCoverLightboxOpen] = useState(false);
  const heroImage = project.coverImage ?? project.gallery?.[0] ?? null;
  // Filter out the hero image from the gallery to avoid duplication if it's the same
  const galleryImages = project.gallery?.filter((img) => img !== heroImage) ?? [];

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
                    <Globe className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        {heroImage ? (
          <section className="mt-12">
            <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
              <Image
                width={1400}
                height={800}
                src={heroImage}
                alt={project.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                onClick={() => setIsCoverLightboxOpen(true)}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </section>
        ) : null}

        {/* Main Content Grid */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Left Column: Description */}
          <section className="rounded-2xl border border-border/60 bg-card/60 p-6 shadow-soft md:p-8 h-fit">
            <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-base leading-7 text-muted-foreground whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          </section>

          {/* Right Column: Gallery */}
          {galleryImages.length > 0 && (
            <section>
              <Gallery images={galleryImages} title="Project Gallery" />
            </section>
          )}
        </div>
      </Container>

      {/* Cover Image Lightbox */}
      <AnimatePresence>
        {isCoverLightboxOpen && heroImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={() => setIsCoverLightboxOpen(false)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-white/70 hover:bg-white/10 hover:text-white"
              onClick={() => setIsCoverLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <motion.div
              layoutId="cover-image"
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={heroImage}
                alt={`${project.name} cover`}
                width={1600}
                height={1200}
                className="h-auto max-h-[90vh] w-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}