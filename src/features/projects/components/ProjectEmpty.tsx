export function ProjectsEmpty() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-2xl font-semibold">No projects found</h2>
        <p className="mt-2 text-muted-foreground">
          Try publishing a project in Notion (or your source) and refresh.
        </p>
      </div>
    </section>
  );
}
