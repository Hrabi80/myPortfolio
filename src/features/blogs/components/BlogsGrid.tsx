import { BlogCard } from "@/features/blogs/components/blogCard";
import type { fetchBlogs } from "@/features/blogs/services/fetch-blogs";

type Posts = Awaited<ReturnType<typeof fetchBlogs>>;

type BlogsGridProps = {
  posts: Posts;
};

export function BlogsGrid({ posts }: BlogsGridProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="space-y-8">
          {posts?.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
