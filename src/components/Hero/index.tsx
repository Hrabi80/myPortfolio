import Image from "next/image";

type HeroProps = Readonly<{
  badge?: string;
  title: string;
  description: string;
  imageSrc: string;
}>;

export function Hero({ badge, title, description, imageSrc }: HeroProps) {
  return (
    <section className="vanish-bg relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 iso-grid opacity-50" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-[1fr_360px] md:py-24">
        <div className="opacity-0 animate-fade-up">
          {badge ? (
            <p className="inline-flex w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
              {badge}
            </p>
          ) : null}

          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight text-foreground md:text-6xl">
            <span className="text-gradient">{title.split(" ")[0]}</span>{" "}
            <span className="text-gradient-primary">
              {title.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>

        <div className="hidden justify-center md:flex">
          <div
            className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-xl border border-border surface-2 p-8"
            style={{
              boxShadow: "var(--shadow-elevate-2)",
              transform: "perspective(1100px) rotateX(4deg) rotateY(-8deg)",
            }}
          >
            <Image
              src={imageSrc}
              alt={`${title} illustration`}
              fill
              priority
              className="object-contain p-8"
              sizes="320px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
