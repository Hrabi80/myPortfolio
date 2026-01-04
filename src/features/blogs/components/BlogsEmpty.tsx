export function BlogsEmpty() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <h2 className="text-2xl font-semibold">No posts found</h2>
        <p className="mt-2 text-muted-foreground">
          Try publishing a post in Notion (or your source) and refresh.
        </p>
      </div>
    </section>
  );
}
