import type { Metadata } from "next";
import type { ConsultingService } from "@/data/services";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  europeanCountries,
  faqPageJsonLd,
  personId,
  professionalServiceId,
  websiteId,
} from "@/lib/seo";

export function buildConsultingServiceMetadata(
  service: ConsultingService,
): Metadata {
  const url = absoluteUrl(service.href);

  return {
    title: service.seoTitle,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical: service.href,
    },
    openGraph: {
      title: service.seoTitle,
      description: service.description,
      url,
      type: "website",
      siteName: "Ahmed Hrabi Portfolio",
      images: [
        {
          url: "/og-image.webp",
          width: 1200,
          height: 630,
          alt: `${service.title} by Ahmed Hrabi`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.description,
      images: ["/og-image.webp"],
      creator: "@hrabi_dev",
    },
  };
}

export function buildConsultingServiceJsonLd(service: ConsultingService) {
  const pageUrl = absoluteUrl(service.href);
  const serviceId = `${pageUrl}#service`;
  const webpageId = `${pageUrl}#webpage`;
  const faqId = `${pageUrl}#faq`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: service.title, href: service.href },
  ]);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: pageUrl,
        name: service.seoTitle,
        headline: service.h1,
        description: service.description,
        inLanguage: "en",
        isPartOf: {
          "@id": websiteId,
        },
        author: {
          "@id": personId,
        },
        about: {
          "@id": serviceId,
        },
        mainEntity: {
          "@id": serviceId,
        },
        breadcrumb: {
          "@id": breadcrumb["@id"],
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/og-image.webp"),
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: service.title,
        alternateName: service.keywords.slice(0, 3),
        serviceType: service.serviceType,
        category: "Software development consulting",
        url: pageUrl,
        description: service.description,
        provider: {
          "@id": personId,
        },
        broker: {
          "@id": professionalServiceId,
        },
        areaServed: europeanCountries.map((name) => ({
          "@type": "Country",
          name,
        })),
        audience: {
          "@type": "BusinessAudience",
          audienceType: service.audience,
          geographicArea: europeanCountries.map((name) => ({
            "@type": "Country",
            name,
          })),
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: pageUrl,
          servicePhone: "+21627797784",
          serviceSmsNumber: "+21627797784",
          availableLanguage: ["English", "French", "Arabic"],
        },
        providerMobility: "remote",
        serviceOutput: service.outcomes.map((outcome) => outcome.title),
        offers: {
          "@type": "Offer",
          url: pageUrl,
          availability: "https://schema.org/InStock",
          eligibleRegion: europeanCountries.map((name) => ({
            "@type": "Country",
            name,
          })),
          itemOffered: {
            "@id": serviceId,
          },
        },
        knowsAbout: service.keywords,
        subjectOf: {
          "@id": webpageId,
        },
      },
      faqPageJsonLd(service.faqs, faqId),
      breadcrumb,
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#deliverables`,
        name: `${service.title} deliverables`,
        itemListElement: service.sections.flatMap((section, sectionIndex) =>
          section.items.map((item, itemIndex) => ({
            "@type": "ListItem",
            position: sectionIndex * 10 + itemIndex + 1,
            name: item,
          })),
        ),
      },
    ],
  };
}
