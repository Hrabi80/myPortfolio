import { ExperienceCard } from "./ExperienceCard";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import experienceData from "@/data/experience.json";
import { Experience } from "@/types/experience";

const experiences = experienceData as Experience[];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-up">
          <Badge variant="outline" className="mb-6 text-primary border-primary/30 px-4 py-2 text-sm">
            <Briefcase className="w-4 h-4 mr-2" />
            Career Journey
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
              Professional Experience
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            4+ years of crafting digital experiences, building scalable applications, 
            and turning complex problems into elegant solutions.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
