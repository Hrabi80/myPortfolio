import { Container } from "@/components/layout/primitives";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NotionRenderer } from "@/components/notion/renderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { fetchBlogBySlug, fetchBlogs } from "@/features/blogs/services/blogs.services";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await fetchBlogs();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-20">
        <Container size="md">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
          <div className="mb-10 space-y-4">
            <p className="text-sm text-muted-foreground">{post.publishedAt}</p>
            <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
            <p className="text-lg text-muted-foreground">{post.summary}</p>
            {post.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>
          {post.coverImage ? (
            <div className="mb-10 overflow-hidden rounded-2xl border border-border/60 bg-muted/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt={post.title} className="h-auto w-full object-cover" />
            </div>
          ) : null}
          <article className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-soft md:p-10">
            <NotionRenderer blocks={post.blocks ?? []} />
          </article>
        </Container>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
