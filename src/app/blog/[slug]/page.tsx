import { JsonLd } from "@/components/seo/JsonLd";
import { BlogPostContent } from "@/features/blogs/components/BlogPostContent";
import {
  fetchBlogBySlug,
  fetchBlogs,
} from "@/features/blogs/services/fetch-blogs";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  personId,
  websiteId,
} from "@/lib/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
    notFound();
  }

  const pageUrl = absoluteUrl(`/blog/${slug}`);
  const image = absoluteUrl(post.coverImage ?? "/assets/blog-illustration.webp");
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${slug}` },
  ]);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: post.title,
        headline: post.title,
        description: post.summary,
        inLanguage: "en",
        isPartOf: {
          "@id": websiteId,
        },
        author: {
          "@id": personId,
        },
        mainEntity: {
          "@id": `${pageUrl}#article`,
        },
        breadcrumb: {
          "@id": breadcrumb["@id"],
        },
      },
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        headline: post.title,
        name: post.title,
        description: post.summary,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        image: image ? [image] : undefined,
        url: pageUrl,
        isAccessibleForFree: true,
        articleSection: post.tags?.map((tag) => tag.name),
        keywords: post.tags?.map((tag) => tag.name).join(", "),
        about: post.tags?.map((tag) => ({
          "@type": "Thing",
          name: tag.name,
        })),
        mainEntityOfPage: {
          "@id": `${pageUrl}#webpage`,
        },
        author: {
          "@id": personId,
        },
        publisher: {
          "@id": personId,
        },
      },
      breadcrumb,
    ],
  };

  return (
    <>
      <JsonLd data={blogPostingJsonLd} />
      <div className="flex-1">
        <BlogPostContent post={post} />
      </div>
    </>
  );
}
