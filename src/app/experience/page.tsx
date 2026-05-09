import { ExperienceSection } from "@/features/experience/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Full-Stack Software Engineer",
  description:
    "Professional experience of Ahmed Hrabi, a Tunisia-based full-stack software engineer building e-learning, healthcare, marketplace, CRM, and multilingual web platforms.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience | Ahmed Hrabi",
    description:
      "Career timeline across full-stack web development, Next.js, NestJS, Angular, Payload CMS, and scalable product engineering.",
    url: "/experience",
    type: "profile",
  },
};

export default function ExperiencePage() {
  return <ExperienceSection />;
}
