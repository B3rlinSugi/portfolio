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
  title: "Berlin Sugiyanto | Backend Developer Portfolio",
  description: "Backend Developer specializing in REST APIs, authentication systems, and database architecture. Explore my projects, skills, and certifications.",
  keywords: ["Backend Developer", "REST API", "Laravel", "Node.js", "Spring Boot", "Portfolio", "Berlin Sugiyanto"],
  authors: [{ name: "Berlin Sugiyanto" }],
  creator: "Berlin Sugiyanto",
  metadataBase: new URL("https://berlinsugi.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Berlin Sugiyanto Portfolio",
    title: "Berlin Sugiyanto | Backend Developer",
    description: "Backend Developer focused on APIs, authentication systems, database design, and applications that solve real problems.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Berlin Sugiyanto | Backend Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Berlin Sugiyanto | Backend Developer",
    description: "Backend Developer focused on APIs, authentication systems, and database design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};


import { LanguageProvider } from "@/components/providers/LanguageContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-white dark:bg-[#050505] text-neutral-900 dark:text-white font-sans transition-colors duration-500">
          <LanguageProvider>
            {children}
          </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
