import { BlogsEmpty } from "@/features/blogs/components/BlogsEmpty";
import { BlogsGrid } from "@/features/blogs/components/BlogsGrid";
import { BlogsHero } from "@/features/blogs/components/BlogsHero";
import { fetchBlogs } from "@/features/blogs/services/fetch-blogs";

export default async function BlogPage() {
  const posts = await fetchBlogs();

  return (
    <>
      <BlogsHero />
      {posts.length ? <BlogsGrid posts={posts} /> : <BlogsEmpty />}
    </>
  );
}
