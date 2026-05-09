import { BlockWrapper } from "@/components/layout/block-wrapper";
import { Code2 } from "lucide-react";

const technologies = [
  "Next.js",
  "NestJS",
  "Node.js",
  "Angular",
  "TypeScript",
  "GraphQL",
  "MongoDB",
  "MySQL",
  "Payload CMS",
  "Notion API",
  "REST API",
  "Docker",
];

export function SkillsSection() {
  return (
    <BlockWrapper size="small" className="border-y border-border/60 surface-1">
      <div className="mx-auto max-w-6xl px-5 py-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Tech I work with
            </p>
            <h2 className="mt-1 font-display text-3xl text-foreground">
              My stack
            </h2>
          </div>
          <Code2 className="size-6 text-muted-foreground" aria-hidden="true" />
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {technologies.map((tech, index) => (
            <li
              key={tech}
              className="rounded-lg border border-border surface-2 px-4 py-3 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40"
              style={{
                transform: `perspective(700px) rotateY(${
                  (index % 2 ? 1 : -1) * 4
                }deg)`,
              }}
            >
              <span className="font-mono text-xs text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="font-display text-base text-foreground">
                {tech}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </BlockWrapper>
  );
}
