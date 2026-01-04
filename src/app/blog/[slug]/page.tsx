import { Container } from "@/components/layout/primitives";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NotionRenderer } from "@/components/notion/renderer";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { getBlogPostBySlug, getBlogPosts } from "@/data/content";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

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
          <div className="mb-12 border-b pb-8">
            <p className="mb-4 text-sm text-muted-foreground">{post.publishedAt}</p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">{post.title}</h1>
            <p className="text-xl text-muted-foreground">{post.summary}</p>
          </div>
          <NotionRenderer blocks={post.blocks ?? []} />
        </Container>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
