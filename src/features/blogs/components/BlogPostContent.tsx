import type { BlogPost } from "@/domain/entities/blog.entity";
import { Container } from "@/components/layout/primitives";
import { NotionRenderer } from "@/components/notion/renderer";
import { Button } from "@/components/ui/button";
import { NotionTag } from "@/components/ui/notion-tag";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

type BlogPostContentProps = {
  post: BlogPost;
};

export function BlogPostContent({ post }: BlogPostContentProps) {
  const externalUrl =
    post.source === "medium" ? post.sourceUrl ?? post.canonicalUrl : undefined;

  return (
    <Container size="lg" className="py-10 md:py-14">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="mb-8 -ml-3 pl-0 hover:bg-transparent hover:text-primary"
      >
        <Link href="/blog">
          <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
          Back to blog
        </Link>
      </Button>

      {post.coverImage ? (
        <div className="mb-10 overflow-hidden rounded-xl border border-border/60 bg-muted/60 shadow-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={`${post.title} cover`}
            className="h-[38vh] min-h-[260px] w-full object-cover"
          />
        </div>
      ) : null}

      <header className="mx-auto mb-12 max-w-3xl space-y-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
          <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          <span className="text-primary">/ {post.source}</span>
          {post.tags?.map((tag) => (
            <NotionTag key={tag.id} tag={tag} />
          ))}
        </div>

        <div>
          <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground md:text-xl">
            {post.summary}
          </p>
        </div>

        {externalUrl ? (
          <Button variant="outline" asChild>
            <a href={externalUrl} target="_blank" rel="noopener noreferrer">
              Read original
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </Button>
        ) : null}

        <div className="h-px w-full bg-border/60" />
      </header>

      {post.source === "notion" ? (
        <article className="mx-auto max-w-3xl">
          <NotionRenderer blocks={post.blocks ?? []} />
        </article>
      ) : null}
    </Container>
  );
}
