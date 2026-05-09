import { ExperienceCard } from "./ExperienceCard";
import experienceData from "@/data/experience.json";
import { Experience } from "@/types/experience";

const experiences = experienceData as Experience[];

export function ExperienceSection() {
  return (
    <section id="experience" className="vanish-bg relative overflow-hidden py-20">
      <div className="absolute inset-0 iso-grid opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-5">
        <div className="mb-16 opacity-0 animate-fade-up">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Career journey
          </p>
          <h2 className="mt-2 font-display text-4xl text-foreground md:text-5xl">
            <span className="text-gradient">Professional</span>{" "}
            <span className="text-gradient-primary">experience</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            4+ years building scalable products across e-learning, healthcare,
            marketplaces, CRM systems, and multilingual business platforms.
          </p>
        </div>

        <ol className="relative ml-4 space-y-10 border-l border-border pl-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
