import { HeroSection } from "@/components/sections/hero";
import { SkillsSection } from "@/components/sections/skills";
import { LatestProjectsSection } from "@/features/projects/components/LatestProjects";
import { ExperienceSection } from "@/features/experience/components";
import { BlogPreviewSection } from "@/features/blogs/components/blog-preview";
import { ContactSection } from "@/components/sections/contact";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Hrabi | Software Engineer",
  description:
    "Portfolio of Hrabi, a Software Engineer building high-performance web applications.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahmed-hrabi.vercel.app",
    siteName: "Hrabi Portfolio",
    title: "Hrabi | Software engineer",
    description:
      "Portfolio of Hrabi, a Software Engineer building high-performance web applications.",
    images: [
      {
        url: "https://ahmed-hrabi.vercel.app/assets/avatar.webp",
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
      <ExperienceSection />
      <BlogPreviewSection />
      <ContactSection />
    </>
  );
}
