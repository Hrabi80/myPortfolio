import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  const links = [
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <footer className="mt-24 border-t border-border/60 surface-1">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-wide text-foreground"
          >
            Hrabi<span className="text-primary">.</span>Portfolio
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            Full-stack software engineer in Tunisia crafting clean, reliable,
            and scalable web applications.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground">
            Explore
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground">
            Connect
          </h2>
          <div className="mt-3 flex items-center gap-3">
            <a
              href="https://github.com/Hrabi80"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Github className="size-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-hrabi/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href="https://twitter.com/hrabi_dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Twitter className="size-4" />
            </a>
            <a
              href="mailto:hrabi.ahmed8@gmail.com"
              aria-label="Email Ahmed Hrabi"
              className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 px-5 py-5 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Ahmed Hrabi. Built with depth.
      </div>
    </footer>
  );
}
