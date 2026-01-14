"use client";

import { useState } from "react";
import type { Project } from "@/domain/entities/project.entity";
import { Container } from "@/components/layout/primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Globe, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type ProjectClientProps = {
  project: Project;
};

export function ProjectClient({ project }: ProjectClientProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImage = project.coverImage ?? project.gallery?.[0] ?? null;
  const gallery = project.gallery?.filter((image) => image !== heroImage) ?? [];
  const allImages = heroImage ? [heroImage, ...gallery] : gallery;

  const openLightbox = (imageSrc: string) => {
    const index = allImages.indexOf(imageSrc);
    setCurrentImageIndex(index);
    setLightboxImage(imageSrc);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      const newIndex = currentImageIndex === 0 ? allImages.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setLightboxImage(allImages[newIndex]);
    } else {
      const newIndex = currentImageIndex === allImages.length - 1 ? 0 : currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      setLightboxImage(allImages[newIndex]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateImage("prev");
    if (e.key === "ArrowRight") navigateImage("next");
  };

  return (
    <>
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
            <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
              <Image
                width={1400}
                height={800}
                src={heroImage}
                alt={project.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                onClick={() => openLightbox(heroImage)}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
            
            {gallery.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold">Project Gallery</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {gallery.map((image, index) => (
                    <div
                      key={`${project.id}-gallery-${index}`}
                      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card cursor-pointer"
                      onClick={() => openLightbox(image)}
                    >
                      <Image
                        width={800}
                        height={600}
                        src={image}
                        alt={`${project.name} preview ${index + 2}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        ) : null}

        <section className="mt-12 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-soft md:p-8">
          <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
          <p className="text-base leading-7 text-muted-foreground">{project.description}</p>
        </section>
      </Container>

      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 z-10 text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("prev");
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("next");
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={lightboxImage}
              alt={`${project.name} full view`}
              width={1600}
              height={1200}
              className="max-h-[90vh] w-auto object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}