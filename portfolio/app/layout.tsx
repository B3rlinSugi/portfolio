import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Berlin | Full-Stack Developer",
  description: "Full-Stack Web Developer specializing in backend architecture, REST APIs, and modern frontend interfaces. Explore my projects and skills.",
  keywords: ["Full-Stack Developer", "Backend Developer", "REST API", "Laravel", "React", "Next.js", "Berlin Sugiyanto"],
  authors: [{ name: "Berlin Sugiyanto" }],
  creator: "Berlin Sugiyanto",
  metadataBase: new URL("https://berlinsugi.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Berlin Sugiyanto Portfolio",
    title: "Berlin | Full-Stack Developer",
    description: "Full-Stack Web Developer focused on APIs, database design, and beautiful digital experiences.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Berlin Sugiyanto | Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Berlin | Full-Stack Developer",
    description: "Full-Stack Web Developer focused on robust systems and modern UI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};


import { LanguageProvider } from "@/components/providers/LanguageContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#0A0A0A]`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#0A0A0A] text-neutral-900 dark:text-white font-sans transition-colors duration-500">
        <SmoothScroll>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
