export default function robots() {
  const base_url = "https://ahmed-hrabi.vercel.app/";

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
