import { BlogNotFound } from "@/features/blogs/components/BlogNotFound";
import { BlogPostContent } from "@/features/blogs/components/BlogPostContent";
import {
  fetchBlogBySlug,
  fetchBlogs,
} from "@/features/blogs/services/fetch-blogs";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds
type PageProps = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await fetchBlogBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
      robots: { index: false, follow: false },
    };
  }

  const title = post.title;
  const description =
    post.summary ?? "Web development article by Hrabi.";

  const url = `/blog/${slug}`;
  const image = post.coverImage ?? "/assets/blog-illustration.webp";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
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
