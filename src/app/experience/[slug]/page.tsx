import { ExperienceDetailClient } from "./page_client";
import { JsonLd } from "@/components/seo/JsonLd";
import experienceData from "@/data/experience.json";
import { Experience } from "@/types/experience";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  personId,
  websiteId,
} from "@/lib/seo";

const experiences = experienceData as Experience[];

const monthMap: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

function parsePeriodDate(value?: string) {
  if (!value) {
    return undefined;
  }

  const [month, year] = value.trim().split(/\s+/);
  const normalizedMonth = monthMap[month];

  if (!normalizedMonth || !year) {
    return undefined;
  }

  return `${year}-${normalizedMonth}`;
}

function parseExperiencePeriod(period: string) {
  const [start, end] = period.split(" - ");

  return {
    startDate: parsePeriodDate(start),
    endDate: end && end !== "Present" ? parsePeriodDate(end) : undefined,
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return experiences.map((exp) => ({
    slug: exp.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = experiences.find((exp) => exp.id === slug);

  if (!experience) {
    return {
      title: "Experience Not Found",
    };
  }

  return {
    title: `${experience.title} at ${experience.company} | Hrabi`,
    description:
      experience.summary ||
      `${experience.title} at ${experience.company}, part of Ahmed Hrabi's full-stack software engineering experience.`,
    alternates: {
      canonical: `/experience/${slug}`,
    },
    openGraph: {
      title: `${experience.title} at ${experience.company}`,
      description:
        experience.summary ||
        `${experience.title} at ${experience.company}, part of Ahmed Hrabi's full-stack software engineering experience.`,
      url: `/experience/${slug}`,
      type: "profile",
    },
  };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { slug } = await params;
  const experience = experiences.find((exp) => exp.id === slug);

  if (!experience) {
    notFound();
  }

  const pageUrl = absoluteUrl(`/experience/${slug}`);
  const { startDate, endDate } = parseExperiencePeriod(experience.period);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Experience", href: "/experience" },
    {
      name: `${experience.title} at ${experience.company}`,
      href: `/experience/${slug}`,
    },
  ]);

  const experienceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${experience.title} at ${experience.company}`,
        headline: `${experience.title} at ${experience.company}`,
        description: experience.summary,
        inLanguage: "en",
        isPartOf: {
          "@id": websiteId,
        },
        mainEntity: {
          "@id": `${pageUrl}#role`,
        },
        breadcrumb: {
          "@id": breadcrumb["@id"],
        },
      },
      {
        "@type": "EmployeeRole",
        "@id": `${pageUrl}#role`,
        roleName: experience.title,
        startDate,
        endDate,
        employmentType: experience.type,
        description: experience.summary,
        url: pageUrl,
        skills: experience.skills,
        knowsAbout: [...experience.skills, ...(experience.tools ?? [])],
        jobLocation: {
          "@type": "Place",
          name: experience.location,
        },
        memberOf: {
          "@type": "Organization",
          name: experience.company,
        },
        performer: {
          "@id": personId,
        },
        mainEntityOfPage: {
          "@id": `${pageUrl}#webpage`,
        },
      },
      breadcrumb,
    ],
  };

  return (
    <>
      <JsonLd data={experienceJsonLd} />
      <ExperienceDetailClient experience={experience} />
    </>
  );
}
