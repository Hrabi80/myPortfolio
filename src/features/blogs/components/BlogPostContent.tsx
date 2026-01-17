import type { BlogPost } from "@/domain/entities/blog.entity";
import { Container } from "@/components/layout/primitives";
import { NotionRenderer } from "@/components/notion/renderer";
import { Button } from "@/components/ui/button";
import { NotionTag } from "@/components/ui/notion-tag";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type BlogPostContentProps = {
  post: BlogPost;
};

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <Container size="lg" className="py-10">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="mb-8 hover:bg-transparent hover:text-primary pl-0 -ml-3">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
      </Button>

      {/* Cover Image */}
      {post.coverImage ? (
        <div className="mb-10 overflow-hidden rounded-2xl border border-border/60 bg-muted/60 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="h-[40vh] w-full object-cover" 
          />
        </div>
      ) : null}

      {/* Header Content */}
      <div className="mx-auto max-w-3xl space-y-8 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            {post.tags?.length ? (
              <>
                <span>•</span>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <NotionTag key={tag.id} tag={tag} />
                  ))}
                </div>
              </>
            ) : null}
          </div>
          
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.summary}
          </p>
        </div>

        <div className="h-px w-full bg-border/60" />
      </div>
      
      {/* Main Content */}
      <article className="mx-auto max-w-3xl prose prose-neutral dark:prose-invert prose-lg">
        <NotionRenderer blocks={post.blocks ?? []} />
      </article>
    </Container>
  );
}
