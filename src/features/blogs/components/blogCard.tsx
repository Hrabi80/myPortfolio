import { BlogMeta } from "@/domain/entities/blog.entity";
import { ArrowUpRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { NotionTag } from "@/components/ui/notion-tag";

interface BlogCardProps {
  post: BlogMeta;
  index: number;
}

export const BlogCard = ({ post, index }: BlogCardProps) => (
  <Link href={`/blog/${post.slug}`} className="group block h-full">
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-soft transition-all duration-300 hover:shadow-[var(--shadow-hover)] opacity-0 animate-fade-up"
      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
    >
      {/* Cover Image */}
      <div className="aspect-video w-full overflow-hidden bg-muted">
        {post.coverImage ? (
          <Image
            src={post.coverImage ?? ""}
            alt={post.title}
            width={600}
            height={338}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/30">
            <span className="text-4xl">📝</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
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

        <p className="mb-4 line-clamp-3 flex-1 text-muted-foreground">
          {post.summary}
        </p>

        {post.tags?.length ? (
          <div className="mt-auto flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <NotionTag key={tag.id || index} tag={tag} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  </Link>
);
