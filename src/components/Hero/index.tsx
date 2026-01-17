import Image from "next/image";

type HeroProps = Readonly<{
  badge?: string;
  title: string;
  description: string;
  imageSrc: string;
}>;

export function Hero({ badge, title, description, imageSrc }: HeroProps) {
  return (
    <section className="relative overflow-hidden pb-10 pt-20">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft overall wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />

        {/* blurred blobs */}
        <div className="absolute -top-24 right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 left-[-8rem] h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl" />

        {/* very subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="opacity-0 animate-fade-up">
            {badge ? (
              <p className="mb-3 inline-flex w-fit items-center rounded-full border border-border/60 bg-background/60 px-3 py-1 text-sm font-medium text-primary shadow-sm backdrop-blur">
                {badge}
              </p>
            ) : null}

            <h1 className="font-display mb-6 text-4xl font-bold text-foreground md:text-5xl">
              <span className="bg-gradient-to-r from-foreground via-foreground to-primary/80 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground">
              {description}
            </p>

            {/* optional tiny accent line */}
          </div>

          <div className="flex justify-center animate-fade-up stagger-1">
            <div className="relative">
              {/* image halo */}

              
                <Image
                  src={imageSrc}
                  alt="illustration"
                  width={384}
                  height={384}
                  priority
                  className="w-56 md:w-64 animate-float drop-shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
