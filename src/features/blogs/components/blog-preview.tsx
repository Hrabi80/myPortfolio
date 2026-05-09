import { BlockWrapper } from "@/components/layout/block-wrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { fetchBlogs } from "../services/fetch-blogs";
import { BlogCard } from "./blogCard";

export async function BlogPreviewSection() {
  const posts = await fetchBlogs();

  if (!posts?.length) return null;

  const latestPosts = posts.slice(0, 3);

  return (
    <BlockWrapper size="medium" className="border-y border-border/60 surface-1">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="opacity-0 animate-fade-up">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Recent writing
            </p>
            <h2 className="mt-1 font-display text-3xl text-foreground md:text-4xl">
              Latest articles
            </h2>
          </div>

          <div className="opacity-0 animate-fade-up stagger-1">
            <Button variant="outline" asChild>
              <Link href="/blog">
                Read blog
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {latestPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </BlockWrapper>
  );
}
