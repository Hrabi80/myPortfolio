import type { ConsultingService } from "@/data/services";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Globe2,
  Layers3,
  MessageSquareText,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type ConsultingServicePageProps = {
  service: ConsultingService;
};

const iconMap = [Layers3, ShieldCheck, Globe2, Route];

export function ConsultingServicePage({ service }: ConsultingServicePageProps) {
  return (
    <>
      <section className="vanish-bg relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 iso-grid opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
              <Sparkles className="size-3.5" aria-hidden="true" />
              {service.eyebrow}
            </p>

            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight text-foreground md:text-6xl">
              {service.h1}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              {service.lead}
            </p>

            <ul className="mt-7 space-y-3">
              {service.heroPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link href="/#contact">
                  Discuss a project
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link href="/projects">
                  View case studies
                  <ExternalLink className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="perspective-stage flex items-center justify-center">
            <aside
              className="w-full max-w-md rounded-xl border border-border surface-2 p-6"
              style={{
                boxShadow: "var(--shadow-elevate-2)",
                transform: "perspective(1200px) rotateX(4deg) rotateY(-5deg)",
              }}
              aria-label={`${service.title} summary`}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-primary">
                Service snapshot
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground">
                {service.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {service.audience}
              </p>

              <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-border/60 py-5">
                {service.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                    <dd className="mt-1 font-display text-xl text-primary">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Core keywords
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {service.keywords.slice(0, 5).map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 surface-1 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Outcomes
            </p>
            <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
              What this engagement should create
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {service.outcomes.map((outcome, index) => (
              <article
                key={outcome.title}
                className="rounded-xl border border-border surface-2 p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40"
                style={{
                  boxShadow: "var(--shadow-elevate-1)",
                  transform: `perspective(900px) rotateY(${index % 2 ? 2 : -2}deg)`,
                }}
              >
                <span className="font-mono text-xs text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl text-foreground">
                  {outcome.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {outcome.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-10 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Scope
            </p>
            <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
              Where I can help
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {service.sections.map((section, index) => {
              const Icon = iconMap[index % iconMap.length];

              return (
                <section
                  key={section.title}
                  className="rounded-xl border border-border surface-2 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl text-foreground">
                        {section.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 surface-1 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Delivery process
            </p>
            <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
              A direct remote workflow
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The process is intentionally simple: define the real problem,
              choose a maintainable approach, ship in reviewable increments, and
              verify the details that affect users, editors, developers, and
              search engines.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {service.process.map((step, index) => (
              <article key={step.title} className="rounded-xl border border-border surface-2 p-5">
                <span className="font-mono text-xs text-primary">
                  Step {index + 1}
                </span>
                <h3 className="mt-2 font-display text-xl text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary">
                Proof and fit
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Relevant project experience
              </h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/projects">
                See projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {service.proof.map((item) => (
              <article key={item.title} className="rounded-xl border border-border surface-2 p-6">
                <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 surface-1 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-8 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              FAQ
            </p>
            <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
              Common questions
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {service.faqs.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-border surface-2 p-6">
                <h3 className="font-display text-xl text-foreground">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 iso-grid opacity-25" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
            <MessageSquareText className="size-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 font-display text-3xl text-foreground md:text-4xl">
            Need this kind of help on your project?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Share the product, CMS, website, or technical problem you want to
            solve. I will help you clarify the scope, risks, and practical next
            steps before implementation starts.
          </p>
          <div className="mt-8 flex justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link href="/#contact">
                Contact Ahmed
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
