import { HeroSection } from "@/components/sections/hero";
import { SkillsSection } from "@/components/sections/skills";
import { LatestProjectsSection } from "@/features/projects/components/LatestProjects";
import { ExperienceSection } from "@/features/experience/components";
import { BlogPreviewSection } from "@/features/blogs/components/blog-preview";
import { ContactSection } from "@/components/sections/contact";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Ahmed Hrabi | Full-Stack Software Engineer in Tunisia",
  description:
    "Portfolio of Ahmed Hrabi, a Tunisia-based full-stack software engineer building high-performance, SEO-friendly web applications with Next.js, TypeScript, Node.js, and Notion.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahmed-hrabi.vercel.app",
    siteName: "Ahmed Hrabi Portfolio",
    title: "Ahmed Hrabi | Full-Stack Software Engineer",
    description:
      "Tunisia-based full-stack software engineer building performant, SEO-friendly web applications.",
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
