import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { SkillsSection } from "@/components/sections/skills";
import { LatestProjectsSection } from "@/features/projects/components/LatestProjects";
import { BlogPreviewSection } from "@/features/blogs/components/blog-preview";
import { ContactSection } from "@/components/sections/contact";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Metadata } from "next";
import { fetchProjects } from "@/features/projects/services/projects.services";

export const metadata: Metadata = {
  title: "Hrabi | Software Engineer",
  description: "Portfolio of Hrabi, a Software Engineer building high-performance web applications.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hrabi.dev",
    siteName: "Hrabi Portfolio",
    title: "Hrabi | Software engineer",
    description: "Portfolio of Hrabi, a Software Engineer building high-performance web applications.",
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
const projects = await fetchProjects();
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SkillsSection />
        <LatestProjectsSection />
        <BlogPreviewSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
