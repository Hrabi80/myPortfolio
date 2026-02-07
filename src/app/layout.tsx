import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://ahmed-hrabi.vercel.app"),
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
    default: "Hrabi | Software Engineer",
    template: "%s | Hrabi",
  },
  description:
    "Hrabi is a web developer specializing in Next.js, angular , TypeScript, and Node.js. I build fast, SEO-friendly websites and web apps.",

  keywords: [
    "Software Engineer",
    "Web Development",
    "Next.js",
    "NodeJs",
    "TypeScript",
    "Portfolio",
    "Angular",
    "Hiring a web developer",
    "Ahmed Hrabi",
    "Freelance",
    "Freelance web developer",
    "web developer freelancer",
    "FullStack developer",
    "Javascript developer",
    "PayloadCMS",
    "NestJs"
  ],
  authors: [{ name: "Hrabi", url: "https://ahmed-hrabi.vercel.app" }],
  creator: "Hrabi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahmed-hrabi.vercel.app",
    siteName: "Hrabi Portfolio",
    title: "Hrabi | Software Engineer",
    description:
      "Portfolio of Ahmed Hrabi, a Software Engineer building high-performance web applications.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Hrabi Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hrabi | Software Engineer",
    description:
      "Portfolio of Ahmed Hrabi, a Software Engineer building high-performance web applications.",
    images: ["/og-image.webp"],
    creator: "@hrabi", 
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <div className="min-h-screen bg-background">
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
