import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 left-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="opacity-0 animate-fade-up">
            <div className="mb-6 flex items-center gap-4">
              <Image
                src="/assets/developer-avatar.png"
                alt="Hrabi portrait"
                width={100}
                height={100}
                className="h-16 w-16 rounded-full border-2 border-primary/20 object-cover shadow-soft"
              />
              <div>
                <p className="text-sm text-muted-foreground">Hello, I&apos;m</p>
                <h2 className="font-display text-xl font-semibold text-foreground">Hrabi</h2>
              </div>
            </div>

            <h1 className="font-display mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Crafting Digital <span className="text-primary">Experiences</span>
              <br />
              That Scale
            </h1>

            <p className="mb-8 max-w-lg text-lg text-muted-foreground">
              Senior Next.js & TypeScript Architect. I turn complex problems into simple, beautiful, and scalable
              solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link href="/#contact">Hire Me</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link href="/projects">View Projects</Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center opacity-0 animate-fade-up stagger-2">
            <div className="relative">
              <img
                src="/assets/hero-illustration.png"
                alt="Developer workspace illustration"
                className="w-full max-w-md animate-float"
              />
              <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-primary/20 animate-bounce-soft" />
              <div
                className="absolute -bottom-2 -left-6 h-6 w-6 rounded-full bg-accent/30 animate-bounce-soft"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
