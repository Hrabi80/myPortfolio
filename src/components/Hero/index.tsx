import Image, { type StaticImageData } from "next/image";

type HeroProps = Readonly<{
  badge?: string;
  title: string;
  description: string;
  imageSrc: string;
}>;
export function Hero({
  badge,
  title,
  description,
  imageSrc,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32">
      <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="opacity-0 animate-fade-up">
            <p className="mb-2 font-medium text-primary">{badge}</p>
            <h1 className="font-display mb-6 text-4xl font-bold text-foreground md:text-5xl">
              {title}
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="flex justify-center opacity-0 animate-fade-up stagger-2">
            <Image
              src={imageSrc}
              alt="illustration"
              width={256}
              height={256}
              priority
              className="w-64 animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
