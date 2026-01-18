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
  metadataBase: new URL("https://hrabi.dev"),
  title: {
    default: "Hrabi | Software Engineer",
    template: "%s | Hrabi",
  },
  description: "Portfolio of Hrabi, a Software Engineer building high-performance web applications.",
  keywords: ["Software Engineer", "Web Development", "Next.js", "React", "TypeScript", "Portfolio"],
  authors: [{ name: "Hrabi", url: "https://hrabi.dev" }],
  creator: "Hrabi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hrabi.dev",
    siteName: "Hrabi Portfolio",
    title: "Hrabi | Software Engineer",
    description: "Portfolio of Hrabi, a Software Engineer building high-performance web applications.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hrabi Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hrabi | Software Engineer",
    description: "Portfolio of Hrabi, a Software Engineer building high-performance web applications.",
    images: ["/og-image.jpg"],
    creator: "@hrabi", // Replace with actual handle if available
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
