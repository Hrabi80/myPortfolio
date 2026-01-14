import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { fetchBlogs } from "../services/fetch-blogs";
import { BlogCard } from "./blogCard";



import { BlockWrapper } from "@/components/layout/block-wrapper";

export async function BlogPreviewSection() {
  const posts = await fetchBlogs();
  if(!posts || !posts.length) return;
  const latestPosts = posts.slice(0, 3);

  return (
    <BlockWrapper size="medium" className="bg-card/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="opacity-0 animate-fade-up">
            <p className="mb-2 font-medium text-primary">Recent Writing</p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Latest Articles
            </h2>
          </div>

          <div className="opacity-0 animate-fade-up stagger-1">
            <Button variant="outline" asChild>
              <Link href="/blog">
                Read Blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto max-w-5xl space-y-8">
          {latestPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </BlockWrapper>
  );
}
