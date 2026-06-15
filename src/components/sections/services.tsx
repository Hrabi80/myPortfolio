import { BlockWrapper } from "@/components/layout/block-wrapper";
import { Button } from "@/components/ui/button";
import { consultingServices } from "@/data/services";
import { ArrowRight, Globe2, Layers3, ServerCog } from "lucide-react";
import Link from "next/link";

const icons = [Layers3, ServerCog, Globe2];

export function ServicesSection() {
  return (
    <BlockWrapper id="services" size="medium">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="opacity-0 animate-fade-up">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Consulting services
            </p>
            <h2 className="mt-1 font-display text-3xl text-foreground md:text-4xl">
              Help for CMS, JavaScript, and remote delivery
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              Focused service pages for teams looking for a Payload CMS
              consultant, a full-stack JavaScript developer, or a remote web
              developer with European timezone overlap.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {consultingServices.map((service, index) => {
            const Icon = icons[index % icons.length];

            return (
              <article
                key={service.slug}
                className="group flex h-full flex-col rounded-xl border border-border surface-2 p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40"
                style={{
                  boxShadow: "var(--shadow-elevate-1)",
                  transform: `perspective(1000px) rotateY(${index === 1 ? 0 : index === 0 ? -2 : 2}deg)`,
                }}
              >
                <div className="grid size-11 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-2xl text-foreground transition-colors group-hover:text-primary">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.keywords.slice(0, 3).map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-md border border-border bg-background/60 px-2 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <Button variant="outline" asChild className="mt-6 w-fit">
                  <Link href={service.href}>
                    Read service page
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </BlockWrapper>
  );
}
