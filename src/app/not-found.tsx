import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, Home, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="vanish-bg relative min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0 iso-grid opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-5 py-24 text-center md:py-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary">
          <Compass className="size-4" aria-hidden="true" />
          Route not found
        </div>

        <h1 className="font-display text-6xl text-foreground md:text-7xl">
          404
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
          The page you are looking for is not available. Use one of the links
          below to get back into the portfolio.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="size-4" aria-hidden="true" />
              Back home
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">
              <Compass className="size-4" aria-hidden="true" />
              View projects
            </Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <Link href="/#contact">
              <Mail className="size-4" aria-hidden="true" />
              Contact me
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
