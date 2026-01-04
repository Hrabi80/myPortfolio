import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <Link href="/" className="font-display text-xl font-bold text-foreground">
              Hrabi<span className="text-primary">.</span>Portfolio
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Building digital experiences with passion
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Hrabi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
