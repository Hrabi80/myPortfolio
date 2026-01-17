"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Building2, Clock, CheckCircle2 } from "lucide-react";
import { Experience } from "@/types/experience";
import { useRouter } from "next/navigation";

interface ExperienceDetailClientProps {
  experience: Experience;
}

export function ExperienceDetailClient({ experience }: ExperienceDetailClientProps) {
  const router = useRouter();

  const handleContactClick = () => {
    router.push("/#contact");
    // Delay to ensure navigation happens before scroll
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="pt-16 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/#experience" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experience
          </Link>

          <div className="animate-fade-up">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {experience.type}
              </Badge>
              <Badge variant="outline">
                {experience.workMode}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
              {experience.title}
            </h1>
            
            <div className="flex items-center gap-2 text-xl text-primary font-semibold mb-6">
              <Building2 className="w-5 h-5" />
              {experience.company}
            </div>

            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {experience.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {experience.period}
              </span>
              {experience.duration && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {experience.duration}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-10">
              {/* Summary */}
              {experience.summary && (
                <div className="animate-fade-up">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {experience.summary}
                  </p>
                </div>
              )}

              {/* Responsibilities */}
              {experience.responsibilities && experience.responsibilities.length > 0 && (
                <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-primary rounded-full" />
                    Key Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {experience.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achievements */}
              {experience.achievements && experience.achievements.length > 0 && (
                <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-primary rounded-full" />
                    Key Achievements
                  </h2>
                  <div className="grid gap-3">
                    {experience.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 animate-fade-up" style={{ animationDelay: "300ms" }}>
                <h3 className="font-semibold text-foreground mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary border-0">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tools */}
              {experience.tools && experience.tools.length > 0 && (
                <div className="bg-card rounded-2xl border border-border/50 p-6 animate-fade-up" style={{ animationDelay: "400ms" }}>
                  <h3 className="font-semibold text-foreground mb-4">Tools & Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {experience.tools.map((tool) => (
                      <Badge key={tool} variant="outline" className="bg-muted/50">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20 animate-fade-up" style={{ animationDelay: "500ms" }}>
                <h3 className="font-semibold text-foreground mb-2">Interested in working together?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Let&apos;s discuss how I can bring similar results to your project.
                </p>
                <Button onClick={handleContactClick} className="w-full">Get in Touch</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
