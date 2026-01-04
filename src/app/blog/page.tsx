import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { BlogCard } from "@/features/blogs/components/blogCard";
import { fetchBlogs } from "@/features/blogs/services/fetch-blogs";

export default async function BlogPage() {
  const posts = await fetchBlogs();
  console.log("🚀 ~ BlogPage ~ posts:", posts)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden pb-16 pt-32">
          <div className="absolute top-20 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="opacity-0 animate-fade-up">
                <p className="mb-2 font-medium text-primary">Blog & Articles</p>
                <h1 className="font-display mb-6 text-4xl font-bold text-foreground md:text-5xl">
                  Thoughts & Insights
                </h1>
                <p className="max-w-lg text-lg text-muted-foreground">
                  Practical notes on architecture, product thinking, and the craft of building modern web experiences.
                </p>
              </div>

              <div className="flex justify-center opacity-0 animate-fade-up stagger-2">
                <img
                  src="/assets/blog-illustration.png"
                  alt="Blog illustration"
                  className="w-64 animate-float"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="space-y-8">
              {posts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
