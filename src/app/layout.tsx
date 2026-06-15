import type { Metadata } from "next";
import { JetBrains_Mono, Oswald, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { JsonLd } from "@/components/seo/JsonLd";
import { baseJsonLdGraph, siteUrl } from "@/lib/seo";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Ahmed Hrabi Portfolio",
  category: "Web Development",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "yKz9iF09ziR6NHnU7IS1A4-kNJ3y3opq-_HsUwSYpzg",
  },
  title: {
    default:
      "Ahmed Hrabi | Payload CMS Consultant & Full-Stack JavaScript Developer",
    template: "%s | Ahmed Hrabi",
  },
  description:
    "Ahmed Hrabi is a Tunisia-based Payload CMS consultant and full-stack JavaScript developer specializing in Next.js, TypeScript, Node.js, NestJS, Angular, and SEO-friendly web applications for remote teams.",
  keywords: [
    "Ahmed Hrabi",
    "Hrabi",
    "Payload CMS Consultant",
    "Payload CMS Developer",
    "Full Stack JavaScript Consultant",
    "Full Stack JS Developer",
    "Remote Web Developer Europe",
    "Remote Full Stack Developer Europe",
    "Software Engineer",
    "Full Stack Developer Tunisia",
    "Web Developer Tunisia",
    "Freelance Web Developer Tunisia",
    "Next.js",
    "Node.js",
    "NestJS",
    "TypeScript",
    "Angular",
    "Payload CMS",
    "Notion API",
    "Technical SEO",
    "Portfolio",
  ],
  authors: [{ name: "Ahmed Hrabi", url: siteUrl }],
  creator: "Ahmed Hrabi",
  publisher: "Ahmed Hrabi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ahmed Hrabi Portfolio",
    title:
      "Ahmed Hrabi | Payload CMS Consultant & Full-Stack JavaScript Developer",
    description:
      "Tunisia-based Payload CMS consultant and full-stack JavaScript developer building performant, SEO-friendly web platforms for remote teams.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Ahmed Hrabi Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Hrabi | Payload CMS Consultant & Full-Stack JS Developer",
    description:
      "Tunisia-based Payload CMS consultant and full-stack JavaScript developer for remote teams.",
    images: ["/og-image.webp"],
    creator: "@hrabi_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${oswald.variable} ${jetBrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <JsonLd data={baseJsonLdGraph()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <div className="min-h-screen bg-background">
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}
