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
            3+ years of crafting digital experiences, building scalable applications, 
            and turning complex problems into elegant solutions.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "3+", label: "Years Experience", icon: "⚡" },
            { value: "6", label: "Companies", icon: "🏢" },
            { value: "10+", label: "Projects Delivered", icon: "🚀" },
            { value: "5", label: "Countries Served", icon: "🌍" }
          ].map((stat) => (
            <div
              key={stat.label}
              className="group relative text-center p-8 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/30 shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <span className="text-3xl mb-3 block">{stat.icon}</span>
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
