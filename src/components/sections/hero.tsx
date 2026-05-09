import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import { IsoScene } from "./iso-scene";

export function HeroSection() {
  return (
    <section className="vanish-bg relative overflow-hidden">
      <div className="absolute inset-0 iso-grid opacity-60" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.05fr_1fr] md:pb-24 md:pt-24">
        <div className="flex flex-col justify-center">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Available for new projects
          </p>

          <h1 className="mt-5 font-display text-5xl leading-[1.05] text-foreground md:text-7xl">
            <span className="text-gradient">Crafting digital</span>
            <br />
            <span className="text-gradient-primary">experiences</span>
            <br />
            <span className="text-gradient">that scale.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
            I am Ahmed Hrabi, a Tunisia full-stack software engineer
            focused on clean, reliable, scalable, and SEO-friendly web platforms with
            Next.js, TypeScript, Node.js, and modern CMS workflows.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link href="/assets/Ahmed_hrabi_RESUME.pdf" download>
                <Download className="size-4" aria-hidden="true" />
                Download CV
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link href="/projects">
                View Projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border/60 pt-6 text-sm">
            <div>
              <dt className="text-muted-foreground">Experience</dt>
              <dd className="font-display text-2xl text-primary">4+ yrs</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Projects</dt>
              <dd className="font-display text-2xl text-primary">20+</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Focus</dt>
              <dd className="font-display text-2xl text-primary">SEO & Scalability</dd>
            </div>
          </dl>
        </div>

        <div className="flex items-center justify-center">
          <IsoScene />
        </div>
      </div>
    </section>
  );
}
