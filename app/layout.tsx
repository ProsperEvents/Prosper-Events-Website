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

const customCursor =
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'28\' height=\'28\' viewBox=\'0 0 28 28\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath fill=\'%23202484\' d=\'M5.2 4.4c0-.9 1.08-1.36 1.73-.74l14.93 14.3c.67.64.22 1.76-.7 1.78l-5.98.11 2.03 4.2c.3.62.04 1.37-.58 1.68l-1.3.63a1.24 1.24 0 0 1-1.66-.57l-2.08-4.3-3.92 4.48c-.6.7-1.74.26-1.74-.67V4.4Z\'/%3E%3Cpath fill=\'%23fefbea\' d=\'m8.52 8.46 8.95 8.68-3.95.07-.37.01-.17.33 1.84 3.8-.85.42-1.88-3.89-.22-.46-.34.4-2.83 3.23V8.46Z\'/%3E%3C/g%3E%3C/svg%3E") 5 4, auto';

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
    icon: "/assets/logos/prosper-events-rounded-logo.png",
    apple: "/assets/logos/prosper-events-rounded-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ cursor: customCursor }}>
      <body className="font-body text-navy antialiased" style={{ cursor: customCursor }}>
        <SchemaScript id="organization-schema" data={organizationSchema} />
        <div className="relative min-h-screen overflow-x-clip">
          <div className="fixed inset-0 -z-10 bg-cream" />
          <div className="paper-texture fixed inset-0 -z-10 opacity-70" />
          <div className="fixed inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(231,220,195,0.45),transparent_55%)]" />
          <div className="floral-watercolor floral-watercolor-top" />
          <div className="floral-watercolor floral-watercolor-bottom" />
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
