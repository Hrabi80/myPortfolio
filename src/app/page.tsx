import { HeroSection } from "@/components/sections/hero";
import { SkillsSection } from "@/components/sections/skills";
import { LatestProjectsSection } from "@/features/projects/components/LatestProjects";
import { BlogPreviewSection } from "@/features/blogs/components/blog-preview";
import { ContactSection } from "@/components/sections/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hrabi | Software Engineer",
  description:
    "Portfolio of Hrabi, a Software Engineer building high-performance web applications.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hrabi.dev",
    siteName: "Hrabi Portfolio",
    title: "Hrabi | Software engineer",
    description:
      "Portfolio of Hrabi, a Software Engineer building high-performance web applications.",
    images: [
      {
        url: "https://hrabi.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hrabi Portfolio",
      },
    ],
  },
};
export default function Home() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <LatestProjectsSection />
      <BlogPreviewSection />
      <ContactSection />
    </>
  );
}
