import type { Metadata, Viewport } from "next";
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

const metadataBase = new URL("https://portfolio.romanivanov.dev");

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Roman Ivanov",
  jobTitle: "Fullstack Developer",
  url: "https://portfolio.romanivanov.dev",
  email: "roman.ivanov@email.com",
  knowsAbout: [
    "Fullstack Development",
    "Backend Development",
    "API Design",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Go",
  ],
  sameAs: [
    "https://github.com/romanivanov",
    "https://linkedin.com/in/romanivanov",
  ],
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Roman Ivanov",
  url: "https://portfolio.romanivanov.dev",
  description:
    "Fullstack developer portfolio showcasing projects in React, Next.js, TypeScript, Python, and Go.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const ogImage = {
  url: "/icon.svg",
  width: 100,
  height: 100,
  type: "image/svg+xml" as const,
};

export const metadata: Metadata = {
  metadataBase,
  title: "Roman Ivanov — Fullstack Developer",
  description:
    "Fullstack developer portfolio — React, Next.js, TypeScript, Python, Go. Backend-heavy fullstack projects and API design.",
  openGraph: {
    title: "Roman Ivanov — Fullstack Developer",
    description:
      "Fullstack developer portfolio — React, Next.js, TypeScript, Python, Go. Backend-heavy fullstack projects and API design.",
    url: metadataBase,
    siteName: "Roman Ivanov",
    locale: "en_US",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roman Ivanov — Fullstack Developer",
    description:
      "Fullstack developer portfolio — React, Next.js, TypeScript, Python, Go. Backend-heavy fullstack projects and API design.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-icon.svg",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson, null, 2) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite, null, 2) }}
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
