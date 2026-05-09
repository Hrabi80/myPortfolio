export function IsoScene() {
  return (
    <div
      aria-hidden="true"
      className="perspective-stage relative aspect-[5/4] w-full max-w-[540px] select-none"
    >
      <div className="absolute inset-x-0 bottom-0 h-3/4 iso-floor opacity-70" />

      <div
        className="absolute left-[10%] top-[6%] w-[62%] overflow-hidden rounded-xl border border-border surface-2"
        style={{
          transform: "rotateX(8deg) rotateY(-18deg) translateZ(20px)",
          boxShadow: "var(--shadow-elevate-3)",
        }}
      >
        <div className="flex items-center gap-1.5 border-b border-border/70 px-3 py-2">
          <span className="size-2.5 rounded-full bg-[var(--danger)]" />
          <span className="size-2.5 rounded-full bg-[var(--warning)]" />
          <span className="size-2.5 rounded-full bg-[var(--success)]" />
          <span className="ml-3 truncate font-mono text-[10px] text-muted-foreground">
            ~/portfolio/notion.ts
          </span>
        </div>
        <pre className="overflow-hidden p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
{`const hrabi = {
  role: "Full-Stack Engineer",
  base: "Tunisia",
  stack: ["Next.js", "NestJS", "TS"],
  content: "Notion CMS",
};`}
        </pre>
      </div>

      <div
        className="absolute right-[5%] top-[33%] w-[50%] overflow-hidden rounded-xl border border-border surface-3"
        style={{
          transform: "rotateX(4deg) rotateY(14deg) translateZ(60px)",
          boxShadow: "var(--shadow-elevate-3)",
        }}
      >
        <div className="px-4 pt-4">
          <div className="font-display text-sm uppercase tracking-widest text-primary">
            Project
          </div>
          <div className="mt-1 font-display text-xl text-foreground">
            TunisiaCars
          </div>
          <div className="mt-1 text-xs leading-5 text-muted-foreground">
            Multilingual rental platform with SEO-first pages.
          </div>
        </div>
        <div className="m-4 h-24 rounded-md gradient-primary" />
        <div className="flex flex-wrap gap-1.5 px-4 pb-4 font-mono text-[10px] text-muted-foreground">
          <span className="rounded bg-background/60 px-1.5 py-0.5">Next.js</span>
          <span className="rounded bg-background/60 px-1.5 py-0.5">Payload</span>
          <span className="rounded bg-background/60 px-1.5 py-0.5">MongoDB</span>
        </div>
      </div>

      <div
        className="absolute left-[4%] bottom-[12%] rounded-md border border-primary/40 bg-background/80 px-4 py-2 font-mono text-xs text-primary shadow-glow"
        style={{ transform: "translateZ(90px) rotateX(2deg) rotateY(-6deg)" }}
      >
        shipping reliable products
      </div>

      <div
        className="absolute right-[19%] bottom-[8%] grid size-14 place-items-center rounded-md gradient-primary font-mono text-xs font-semibold text-primary-foreground shadow-glow"
        style={{ transform: "rotateX(45deg) rotateY(45deg) translateZ(40px)" }}
      >
        TS
      </div>
    </div>
  );
}
