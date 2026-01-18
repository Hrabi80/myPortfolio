import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base_url = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahmed-hrabi.vercel.app").replace(
    /\/$/,
    "",
  );

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${base_url}/sitemap.xml`,
  };
}
