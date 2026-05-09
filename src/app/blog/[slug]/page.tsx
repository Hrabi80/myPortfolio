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
  const canonical = post.canonicalUrl ?? url;
  const image = post.coverImage ?? "/assets/blog-illustration.webp";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Ahmed Hrabi"],
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

  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahmed-hrabi.vercel.app"
  ).replace(/\/$/, "");

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: post.coverImage ? [post.coverImage] : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
    author: {
      "@type": "Person",
      name: "Ahmed Hrabi",
      url: "https://ahmed-hrabi.vercel.app",
    },
    publisher: {
      "@type": "Person",
      name: "Ahmed Hrabi",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd),
        }}
      />
      <div className="flex-1">
        <BlogPostContent post={post} />
      </div>
    </>
  );
}
