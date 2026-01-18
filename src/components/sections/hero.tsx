import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { BlockWrapper } from "@/components/layout/block-wrapper";

export function HeroSection() {
  return (
    <BlockWrapper size="hero" className="relative flex min-h-[60vh] items-center overflow-hidden">

      <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-primary/4 blur-md" />
      <div className="absolute bottom-20 left-0 h-72 w-72 rounded-full bg-accent/5 blur-md" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <Image
                src="/assets/avatar.webp"
                alt="Hrabi portrait"
                width={100}
                height={100}
                priority
                className="h-24 w-24 rounded-full border-2 border-primary/20 object-cover shadow-soft"
              />
              <div>
                <p className="text-sm text-muted-foreground">
                  👋 Hello, I&apos;m
                </p>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Hrabi
                </h2>
              </div>
            </div>

            <h1 className="font-display mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Crafting Digital <span className="text-primary">Experiences</span>
              <br />
              That Scale
            </h1>

            <p className="mb-8 max-w-lg text-lg text-muted-foreground">
              I’m a software engineer focused on building clean, reliable, and
              scalable web applications. I enjoy turning real business needs
              into simple and effective digital solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link href="/assets/Ahmed_hrabi_RESUME.pdf" download>
                  Download my CV
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link href="/projects">View Projects</Link>
              </Button>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="relative">
              <Image
                width={400}
                height={400}
                src="/assets/hero-illustration.webp"
                alt="Developer workspace illustration"
                className="w-full max-w-md animate-float"
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 80vw, 400px"
                quality={60}
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
    </BlockWrapper>
  );
}
