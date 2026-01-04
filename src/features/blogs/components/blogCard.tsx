import { BlogMeta } from "@/domain/entities/blog.entity";
import { ArrowUpRight, Calendar } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
  post: BlogMeta;
  index: number;
}

export const BlogCard = ({ post, index }: BlogCardProps) => (
  <Link href={`/blog/${post.slug}`} className="group block">
    <article
      className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-[var(--shadow-hover)] opacity-0 animate-fade-up"
      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
    >
      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {post.publishedAt}
        </span>
      </div>

      <h3 className="mb-2 flex items-center gap-2 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
        {post.title}
        <ArrowUpRight className="h-5 w-5 translate-x-1 -translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
      </h3>

      <p className="mb-4 text-muted-foreground">
        {post.summary}
      </p>

      {post.tags?.length ? (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
            >
              {tag.name}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  </Link>
);
