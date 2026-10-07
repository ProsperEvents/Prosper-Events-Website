import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SchemaScript } from "@/components/schema-script";
import {
  organizationSchema,
  siteDescription,
  siteKeywords,
  siteTitle,
  siteUrl,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Prosper Events",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/assets/gallery/hero-cocktails.jpg",
        width: 1365,
        height: 1820,
        alt: "Prosper Events cocktail service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/assets/gallery/hero-cocktails.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body text-navy antialiased">
        <SchemaScript id="organization-schema" data={organizationSchema} />
        <div className="relative min-h-screen overflow-x-clip">
          <div className="fixed inset-0 -z-10 bg-cream" />
          <div className="paper-texture fixed inset-0 -z-10" />
          <div className="fixed inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(231,220,195,0.48),transparent_62%)]" />
          <div className="floral-watercolor floral-watercolor-site floral-watercolor-site-top" />
          <div className="floral-watercolor floral-watercolor-site floral-watercolor-site-bottom" />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
