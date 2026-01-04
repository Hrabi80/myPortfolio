const fs = require("fs");
const path = require("path");

const SITE_URL = "https://hrabi.dev";

const staticPages = ["", "/projects", "/blog"];

const fallbackData = require("../src/data/data.json");
const projects = fallbackData.projects.map((project) => project.slug);
const posts = fallbackData.posts.map((post) => post.slug);

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((page) => {
      return `
  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`;
    })
    .join("")}
  ${projects
    .map((slug) => {
      return `
  <url>
    <loc>${SITE_URL}/projects/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join("")}
  ${posts
    .map((slug) => {
      return `
  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join("")}
</urlset>
`;

  fs.writeFileSync(path.join(__dirname, "..", "public", "sitemap.xml"), sitemap);
  console.log("Sitemap generated successfully!");
}

generateSitemap();
