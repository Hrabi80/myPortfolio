import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass, Home, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.08),transparent_40%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-semibold mb-6">
          <Compass className="w-4 h-4" />
          Lost in the flow
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4">
          404
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          The page you&apos;re looking for isn&apos;t here. Let&apos;s get you back to
          building something great together.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">
              <Compass className="w-4 h-4 mr-2" />
              View Projects
            </Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <Link href="/#contact">
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
