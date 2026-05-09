"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ContactForm = dynamic(
  () => import("./contact-form").then((module) => module.ContactForm),
  {
    ssr: false,
    loading: () => <ContactFormSkeleton />,
  },
);

function ContactFormSkeleton() {
  return (
    <div
      className="rounded-xl border border-border surface-2 p-6 md:p-8"
      style={{ boxShadow: "var(--shadow-elevate-2)" }}
      aria-hidden="true"
    >
      <div className="h-8 w-44 rounded bg-muted/70" />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="h-12 rounded-md border border-border bg-background/70" />
        <div className="h-12 rounded-md border border-border bg-background/70" />
      </div>
      <div className="mt-5 h-12 rounded-md border border-border bg-background/70" />
      <div className="mt-5 h-36 rounded-md border border-border bg-background/70" />
      <div className="mt-5 h-12 rounded-md bg-primary/25" />
    </div>
  );
}

export function ContactFormLoader() {
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
      { rootMargin: "600px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef}>
      {shouldLoad ? <ContactForm /> : <ContactFormSkeleton />}
    </div>
  );
}
