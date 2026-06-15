export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahmed-hrabi.vercel.app"
).replace(/\/$/, "");

export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;
export const professionalServiceId = `${siteUrl}/#professional-service`;

export const sameAsLinks = [
  "https://github.com/Hrabi80",
  "https://www.linkedin.com/in/ahmed-hrabi/",
  "https://twitter.com/hrabi_dev",
];

export const europeanCountries = [
  "France",
  "Germany",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "Spain",
  "Italy",
  "United Kingdom",
  "Ireland",
  "Sweden",
  "Denmark",
  "Norway",
];

export function absoluteUrl(path?: string | null) {
  if (!path) {
    return undefined;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": personId,
    name: "Ahmed Hrabi",
    alternateName: ["Hrabi", "Ahmed"],
    jobTitle: [
      "Payload CMS Consultant",
      "Full-Stack JavaScript Developer Consultant",
      "Full-Stack Software Engineer",
    ],
    url: siteUrl,
    image: absoluteUrl("/assets/avatar.webp"),
    email: "mailto:hrabi.ahmed8@gmail.com",
    telephone: "+21627797784",
    address: {
      "@type": "PostalAddress",
      addressCountry: "TN",
      addressRegion: "Tunisia",
    },
    nationality: {
      "@type": "Country",
      name: "Tunisia",
    },
    sameAs: sameAsLinks,
    knowsLanguage: [
      {
        "@type": "Language",
        name: "English",
      },
      {
        "@type": "Language",
        name: "French",
      },
      {
        "@type": "Language",
        name: "Arabic",
      },
    ],
    knowsAbout: [
      "Payload CMS",
      "Next.js",
      "TypeScript",
      "Node.js",
      "NestJS",
      "Angular",
      "React",
      "GraphQL",
      "MongoDB",
      "MySQL",
      "Technical SEO",
      "Structured data",
      "Remote software development",
    ],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Payload CMS Consultant",
        occupationalCategory: "Software Developer",
        skills: "Payload CMS, Next.js, TypeScript, Node.js, CMS architecture, technical SEO",
      },
      {
        "@type": "Occupation",
        name: "Full-Stack JavaScript Developer Consultant",
        occupationalCategory: "Software Developer",
        skills: "Next.js, React, Node.js, NestJS, TypeScript, APIs, databases, performance",
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: "Ahmed Hrabi Portfolio",
    url: siteUrl,
    inLanguage: "en",
    description:
      "Portfolio and consulting website for Ahmed Hrabi, a Tunisia-based Payload CMS consultant and full-stack JavaScript developer for remote teams.",
    publisher: {
      "@id": personId,
    },
    author: {
      "@id": personId,
    },
  };
}

export function professionalServiceJsonLd() {
  return {
    "@type": "ProfessionalService",
    "@id": professionalServiceId,
    name: "Ahmed Hrabi Web Development Consulting",
    url: siteUrl,
    image: absoluteUrl("/og-image.webp"),
    description:
      "Remote Payload CMS, Next.js, Node.js, NestJS, TypeScript, and technical SEO consulting for European and international teams.",
    founder: {
      "@id": personId,
    },
    employee: {
      "@id": personId,
    },
    areaServed: europeanCountries.map((name) => ({
      "@type": "Country",
      name,
    })),
    serviceType: [
      "Payload CMS consulting",
      "Full-stack JavaScript development",
      "Remote web development",
      "Technical SEO implementation",
    ],
    availableLanguage: ["English", "French", "Arabic"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hrabi.ahmed8@gmail.com",
      telephone: "+21627797784",
      availableLanguage: ["English", "French", "Arabic"],
      areaServed: europeanCountries,
    },
  };
}

export function baseJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [personJsonLd(), websiteJsonLd(), professionalServiceJsonLd()],
  };
}

export function breadcrumbJsonLd(
  items: Array<{
    name: string;
    href: string;
  }>,
  id = `${absoluteUrl(items.at(-1)?.href)}#breadcrumb`,
) {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function collectionPageJsonLd({
  path,
  name,
  description,
  items,
}: {
  path: string;
  name: string;
  description: string;
  items: Array<{
    name: string;
    href: string;
    description?: string;
  }>;
}) {
  const pageUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name,
        description,
        inLanguage: "en",
        isPartOf: {
          "@id": websiteId,
        },
        author: {
          "@id": personId,
        },
        mainEntity: {
          "@id": `${pageUrl}#itemlist`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        name,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(item.href),
          name: item.name,
          description: item.description,
        })),
      },
      breadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name, href: path },
      ]),
    ],
  };
}

export function faqPageJsonLd(
  faqs: Array<{
    question: string;
    answer: string;
  }>,
  id: string,
) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
