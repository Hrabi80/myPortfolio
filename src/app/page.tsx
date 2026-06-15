import { HeroSection } from "@/components/sections/hero";
import { SkillsSection } from "@/components/sections/skills";
import { LatestProjectsSection } from "@/features/projects/components/LatestProjects";
import { ExperienceSection } from "@/features/experience/components";
import { BlogPreviewSection } from "@/features/blogs/components/blog-preview";
import { ContactSection } from "@/components/sections/contact";
import { ServicesSection } from "@/components/sections/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { consultingServices } from "@/data/services";
import { absoluteUrl, personId, siteUrl, websiteId } from "@/lib/seo";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Ahmed Hrabi | Payload CMS Consultant & Full-Stack JS Developer",
  description:
    "Ahmed Hrabi is a Tunisia-based Payload CMS consultant and full-stack JavaScript developer building high-performance, SEO-friendly web applications for remote teams.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahmed-hrabi.vercel.app",
    siteName: "Ahmed Hrabi Portfolio",
    title: "Ahmed Hrabi | Payload CMS Consultant & Full-Stack JS Developer",
    description:
      "Tunisia-based Payload CMS consultant and full-stack JavaScript developer for remote teams.",
    images: [
      {
        url: "https://ahmed-hrabi.vercel.app/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Ahmed Hrabi Portfolio",
      },
    ],
  },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Ahmed Hrabi - Payload CMS Consultant and Full-Stack JavaScript Developer",
      description: metadata.description,
      inLanguage: "en",
      isPartOf: {
        "@id": websiteId,
      },
      mainEntity: {
        "@id": personId,
      },
      hasPart: {
        "@id": `${siteUrl}/#services`,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#services`,
      name: "Ahmed Hrabi consulting services",
      numberOfItems: consultingServices.length,
      itemListElement: consultingServices.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        description: service.description,
        url: absoluteUrl(service.href),
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <HeroSection />
      <ServicesSection />
      <SkillsSection />
      <LatestProjectsSection />
      <ExperienceSection />
      <BlogPreviewSection />
      <ContactSection />
    </>
  );
}
