import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Bebas_Neue } from "next/font/google";
import { SITE } from "@/lib/constants";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const stat = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-stat",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A1628",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Vantara International",
    "Primerose Smart City Cluster",
    "New Port City",
    "Rivers State",
    "Nigeria property development",
    "smart city Africa",
    "Port Harcourt real estate",
  ],
  authors: [{ name: SITE.legalName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "Building Primerose Smart City Cluster — 200 smart buildings within New Port City, Nigeria.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Primerose Smart City Cluster`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "Building Primerose Smart City Cluster — 200 smart buildings within New Port City, Nigeria.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/images/logo-light.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.phoneRaw,
    contactType: "General Inquiry",
    email: SITE.email,
    areaServed: "NG",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Port Harcourt",
    addressRegion: "Rivers State",
    addressCountry: "Nigeria",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${stat.variable}`}>
      <body className="bg-navy text-white antialiased">
        <script
          type="application/ld+json"
          // JSON is self-contained and trusted content, safe to inject.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
