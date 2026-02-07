import { BlogsEmpty } from "@/features/blogs/components/BlogsEmpty";
import { BlogsGrid } from "@/features/blogs/components/BlogsGrid";
import { BlogsHero } from "@/features/blogs/components/BlogsHero";
import { fetchBlogs } from "@/features/blogs/services/fetch-blogs";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | Web Development, Next.js, NestJs",
  description:
    "Articles by Hrabi about web development, Next.js, NodeJs, TypeScript, SEO, and performance.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Hrabi",
    description:
      "Web development articles about Next.js, NodeJs, TypeScript, SEO, and performance.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await fetchBlogs();

  return (
    <>
      <BlogsHero />
      {posts.length ? <BlogsGrid posts={posts} /> : <BlogsEmpty />}
    </>
  );
}
