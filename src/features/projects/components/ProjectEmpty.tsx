export function ProjectsEmpty() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="rounded-xl border border-border surface-2 p-6">
          <h2 className="font-display text-2xl text-foreground">
            No projects found
          </h2>
          <p className="mt-2 text-muted-foreground">
          Try publishing a project in Notion (or your source) and refresh.
          </p>
        </div>
      </div>
    </section>
  );
}
