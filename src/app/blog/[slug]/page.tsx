import { BlogNotFound } from "@/features/blogs/components/BlogNotFound";
import { BlogPostContent } from "@/features/blogs/components/BlogPostContent";
import {
  fetchBlogBySlug,
  fetchBlogs,
} from "@/features/blogs/services/fetch-blogs";

export async function generateStaticParams() {
  const posts = await fetchBlogs();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);

  if (!post) {
    return <BlogNotFound />;
  }

  return (
    <>
      <div className="flex-1 py-20">
        <BlogPostContent post={post} />
      </div>
    </>
  );
}
