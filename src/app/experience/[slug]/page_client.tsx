"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";
import { Experience } from "@/types/experience";
import { useRouter } from "next/navigation";

interface ExperienceDetailClientProps {
  experience: Experience;
}

export function ExperienceDetailClient({
  experience,
}: ExperienceDetailClientProps) {
  const router = useRouter();

  const handleContactClick = () => {
    router.push("/#contact");
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="vanish-bg relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 iso-grid opacity-50" aria-hidden="true" />

        <div className="relative mx-auto max-w-5xl px-5 py-16 md:py-20">
          <Link
            href="/experience"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
            Back to experience
          </Link>

          <div className="flex flex-wrap gap-2">
            <Badge className="rounded border border-primary/30 bg-primary/10 px-2 py-1 font-mono text-[11px] text-primary">
              {experience.type}
            </Badge>
            <Badge
              variant="outline"
              className="rounded border-border bg-background/60 px-2 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {experience.workMode}
            </Badge>
          </div>

          <h1 className="mt-4 font-display text-5xl leading-tight text-foreground md:text-6xl">
            {experience.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-xl font-semibold text-primary">
            <Building2 className="size-5" aria-hidden="true" />
            {experience.company}
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" />
              {experience.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="size-4" aria-hidden="true" />
              {experience.period}
            </span>
            {experience.duration ? (
              <span className="flex items-center gap-2">
                <Clock className="size-4" aria-hidden="true" />
                {experience.duration}
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 md:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            {experience.summary ? (
              <div className="rounded-xl border border-border surface-2 p-6">
                <p className="text-lg leading-8 text-muted-foreground">
                  {experience.summary}
                </p>
              </div>
            ) : null}

            {experience.responsibilities?.length ? (
              <section className="rounded-xl border border-border surface-2 p-6">
                <h2 className="font-display text-2xl text-foreground">
                  Key responsibilities
                </h2>
                <ul className="mt-5 space-y-3">
                  {experience.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-7 text-muted-foreground"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {experience.achievements?.length ? (
              <section className="rounded-xl border border-border surface-2 p-6">
                <h2 className="font-display text-2xl text-foreground">
                  Key achievements
                </h2>
                <div className="mt-5 grid gap-3">
                  {experience.achievements.map((achievement) => (
                    <div
                      key={achievement}
                      className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/10 p-4"
                    >
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                      <span className="text-sm leading-6 text-foreground">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-6 md:sticky md:top-24 md:h-fit">
            <div className="rounded-xl border border-border surface-2 p-6">
              <h2 className="font-display text-xl text-foreground">
                Technologies used
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {experience.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded bg-background/60 px-2 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {experience.tools?.length ? (
              <div className="rounded-xl border border-border surface-2 p-6">
                <h2 className="font-display text-xl text-foreground">
                  Tools and platforms
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {experience.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded border border-border bg-background/50 px-2 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div
              className="rounded-xl border border-primary/30 bg-primary/10 p-6"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <h2 className="font-display text-xl text-foreground">
                Interested in similar results?
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Let&apos;s discuss how this experience can support your product,
                platform, or website.
              </p>
              <Button onClick={handleContactClick} className="mt-5 w-full">
                Get in touch
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
