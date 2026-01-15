const technologies = [
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Angular", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg"},
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  // { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  // { name: "Symfony", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg" },
  { name: "REST API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "PayloadCMS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
];

import { BlockWrapper } from "@/components/layout/block-wrapper";

export function SkillsSection() {
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <BlockWrapper size="small" className="overflow-hidden bg-card/30">
      <div className="mx-auto mb-8 max-w-7xl px-6 lg:px-8">
        <div className="text-center opacity-0 animate-fade-up">
          <p className="mb-2 font-medium text-primary">Technologies I Work With</p>
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            My Tech Stack
          </h2>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-slide">
          {duplicatedTechs.map((tech, index) => (
            <div key={`${tech.name}-${index}`} className="mx-6 flex-shrink-0 group">
              <div className="flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card/50 p-4 transition-all duration-300 hover:shadow-[var(--shadow-soft)] hover:scale-105 hover:bg-card">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="h-12 w-12 object-contain filter grayscale transition-all duration-300 group-hover:grayscale-0"
                />
                <span className="whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BlockWrapper>
  );
}
