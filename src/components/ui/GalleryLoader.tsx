"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Gallery = dynamic(
  () => import("./Gallery").then((module) => module.Gallery),
  {
    ssr: false,
    loading: () => <GallerySkeleton />,
  },
);

function GallerySkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="h-7 w-36 rounded bg-muted/70" />
      <div className="grid grid-cols-2 gap-4">
        <div className="aspect-square rounded-xl border border-border bg-background/60" />
        <div className="aspect-square rounded-xl border border-border bg-background/60" />
      </div>
    </div>
  );
}

export function GalleryLoader({
  images,
  title,
}: {
  images: string[];
  title?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    const node = containerRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      const frame = globalThis.requestAnimationFrame(() => setShouldLoad(true));
      return () => globalThis.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
        <Gallery images={images} title={title} />
      ) : (
        <GallerySkeleton />
      )}
    </div>
  );
}
