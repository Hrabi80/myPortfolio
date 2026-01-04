import type { BlogPost } from "@/domain/entities/blog.entity";
import { Container } from "@/components/layout/primitives";
import { NotionRenderer } from "@/components/notion/renderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type BlogPostContentProps = {
  post: BlogPost;
};

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
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
  );
}
