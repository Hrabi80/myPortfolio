import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahmed-hrabi.vercel.app").replace(/\/$/, "");
  const host = new URL(baseUrl).host;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host,
  };
}
