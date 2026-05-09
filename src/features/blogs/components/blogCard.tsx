import { NotionTag } from "@/components/ui/notion-tag";
import { BlogMeta } from "@/domain/entities/blog.entity";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: BlogMeta;
  index: number;
}

export const BlogCard = ({ post, index }: BlogCardProps) => (
  <Link href={`/blog/${post.slug}`} className="group block h-full">
    <article
      className="grid h-full overflow-hidden rounded-xl border border-border surface-2 transition-all hover:border-primary/40 md:grid-rows-[auto_1fr]"
      style={{
        animationDelay: `${0.08 * (index + 1)}s`,
        boxShadow: "var(--shadow-elevate-1)",
        transform: `perspective(1100px) rotateY(${index % 2 ? 2 : -2}deg)`,
      }}
    >
      <div className="relative aspect-video overflow-hidden border-b border-border/70 bg-background/60">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={`${post.title} article cover`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 384px"
          />
        ) : (
          <div className="grid h-full w-full place-items-center gradient-primary">
            <span className="font-mono text-sm font-semibold text-primary-foreground">
              Notion article
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5" aria-hidden="true" />
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          </span>
          <span className="text-primary">/ {post.source}</span>
        </div>

        <h3 className="font-display text-2xl text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
          {post.summary}
        </p>

        {post.tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag, tagIndex) => (
              <NotionTag key={tag.id || tagIndex} tag={tag} />
            ))}
          </div>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-primary">
          Read article
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  </Link>
);
