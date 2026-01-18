"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string[];
  title?: string;
  className?: string;
}

export function Gallery({ images, title, className }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      setLightboxIndex((current) => {
        if (current === null) return current;
        const last = images.length - 1;
        if (direction === "prev") return current === 0 ? last : current - 1;
        return current === last ? 0 : current + 1;
      });
    },
    [images.length],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, navigate]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  if (!images.length) return null;

  const portalTarget = typeof document !== "undefined" ? document.body : null;

  return (
    <div className={cn("space-y-4", className)}>
      {title && <h3 className="text-xl font-semibold">{title}</h3>}

      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-muted"
            onClick={() => openLightbox(index)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
              <Maximize2 className="h-8 w-8 text-white drop-shadow-md" />
            </div>
          </motion.div>
        ))}
      </div>

      {portalTarget &&
        createPortal(
          <AnimatePresence>
            {lightboxIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm p-0 sm:p-6"
                onClick={closeLightbox}
                role="dialog"
                aria-modal="true"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 text-white/70 hover:bg-white/10 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                  aria-label="Close gallery"
                >
                  <X className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:bg-white/10 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("prev");
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:bg-white/10 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("next");
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="relative h-screen w-screen sm:h-[90vh] sm:w-[90vw] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {lightboxIndex !== null && (
                    <Image
                      src={images[lightboxIndex]}
                      alt={`Full view ${lightboxIndex + 1}`}
                      fill
                      className="object-contain"
                      priority
                      sizes="100vw"
                    />
                  )}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1 text-sm text-white backdrop-blur-md">
                    {lightboxIndex !== null ? lightboxIndex + 1 : 0} / {images.length}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
