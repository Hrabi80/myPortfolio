import { BlogsEmpty } from "@/features/blogs/components/BlogsEmpty";
import { BlogsGrid } from "@/features/blogs/components/BlogsGrid";
import { BlogsHero } from "@/features/blogs/components/BlogsHero";
import { fetchBlogs } from "@/features/blogs/services/fetch-blogs";
import { JsonLd } from "@/components/seo/JsonLd";
import { collectionPageJsonLd } from "@/lib/seo";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | Next.js, Notion CMS, SEO, and Web Engineering",
  description:
    "Articles by Ahmed Hrabi about Next.js, TypeScript, Notion CMS workflows, backend architecture, SEO, and performance for modern web products.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Ahmed Hrabi",
    description:
      "Practical web engineering articles about Next.js, Notion, TypeScript, SEO, and performance.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await fetchBlogs();

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          path: "/blog",
          name: "Blog Articles by Ahmed Hrabi",
          description:
            "Articles about Next.js, TypeScript, Notion CMS workflows, backend architecture, SEO, and performance for modern web products.",
          items: posts.map((post) => ({
            name: post.title,
            href: `/blog/${post.slug}`,
            description: post.summary,
          })),
        })}
      />
      <BlogsHero />
      {posts.length ? <BlogsGrid posts={posts} /> : <BlogsEmpty />}
    </>
  );
}
