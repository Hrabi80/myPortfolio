export default function sitemap() {
  const base_url = "https://ahmed-hrabi.vercel.app/";

  return [
    {
      url: base_url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
     { url: `${base_url}/projects`, lastModified: new Date() }, 
     { url: `${base_url}/blog`, lastModified: new Date() },
    { url: `${base_url}/experience`, lastModified: new Date() },
  ];
}
