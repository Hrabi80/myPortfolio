"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Experience } from "@/types/experience";

interface ExperienceCardProps {
  exp: Experience;
  index: number;
}

export function ExperienceCard({ exp, index }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      style={{ opacity, scale, x }}
    >
      <Link href={`/experience/${exp.id}`}>
        <motion.div 
          className="group relative overflow-hidden rounded-3xl border border-border/30 bg-card/80 backdrop-blur-xl p-8 shadow-2xl"
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Animated gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Floating orbs */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />
          <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-500" />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>

          <div className="relative z-10">
            {/* Top row: Date badge & Type */}
            <div className="flex items-center justify-between mb-6">
              <motion.div 
                className="flex items-center gap-2 text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {exp.period}
              </motion.div>
              <Badge 
                variant="secondary" 
                className="text-xs px-3 py-1 bg-background/50 backdrop-blur-sm border border-border/50"
              >
                {exp.type}
              </Badge>
            </div>

            {/* Title & Company */}
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                {exp.title}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {exp.company}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  {exp.location} • {exp.workMode}
                </span>
              </div>
            </div>

            {/* Highlights with animated bullets */}
            {exp.responsibilities && exp.responsibilities.length > 0 && (
              <ul className="space-y-3 mb-6">
                {exp.responsibilities.slice(0, 2).map((highlight, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-3 text-muted-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i + 0.2, duration: 0.4 }}
                  >
                    <motion.span 
                      className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent shrink-0"
                      whileHover={{ scale: 1.5 }}
                    />
                    <span className="text-sm leading-relaxed">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            )}

            {/* Skills with stagger animation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {exp.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i + 0.3, duration: 0.3 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Badge 
                    variant="outline" 
                    className="text-xs px-3 py-1.5 bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Fancy CTA */}
            <motion.div 
              className="flex items-center gap-2 text-sm font-semibold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-500">
                Explore this journey
              </span>
              <motion.div
                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors"
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="w-4 h-4 text-primary" />
              </motion.div>
            </motion.div>
          </div>

          {/* Index number */}
          <div className="absolute top-6 right-6 text-7xl font-black text-primary/5 group-hover:text-primary/10 transition-colors select-none">
            {String(index + 1).padStart(2, '0')}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
