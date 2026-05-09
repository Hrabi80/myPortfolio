import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin } from "lucide-react";
import { Experience } from "@/types/experience";

interface ExperienceCardProps {
  exp: Experience;
  index: number;
}

export function ExperienceCard({ exp, index }: ExperienceCardProps) {
  return (
    <li className="relative">
      <span
        className="absolute -left-[42px] top-2 grid size-8 place-items-center rounded-md font-mono text-xs font-semibold text-primary-foreground"
        style={{
          background: "var(--gradient-primary)",
          boxShadow: "var(--shadow-glow)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <Link href={`/experience/${exp.id}`} className="group block">
        <article
          className="relative overflow-hidden rounded-xl border border-border surface-2 p-6 transition-all hover:border-primary/40"
          style={{
            boxShadow: "var(--shadow-elevate-1)",
            transform: `perspective(1200px) rotateY(${index % 2 ? 2 : -2}deg)`,
          }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-mono text-xs text-primary">{exp.period}</span>
            <Badge
              variant="outline"
              className="rounded-full border-border bg-background/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            >
              {exp.type}
            </Badge>
          </div>

          <h3 className="mt-2 font-display text-2xl text-foreground transition-colors group-hover:text-primary">
            {exp.title}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{exp.company}</span>
            <span aria-hidden="true">/</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden="true" />
              {exp.location} - {exp.workMode}
            </span>
          </div>

          {exp.summary ? (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {exp.summary}
            </p>
          ) : null}

          {exp.responsibilities?.length ? (
            <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
              {exp.responsibilities.slice(0, 2).map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-1.5">
            {exp.skills.slice(0, 7).map((skill) => (
              <span
                key={skill}
                className="rounded bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
            Explore this journey
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </article>
      </Link>
    </li>
  );
}
