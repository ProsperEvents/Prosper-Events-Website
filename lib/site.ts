export const siteUrl = "https://prosperevents.ca";

export const siteTitle = "Prosper Events | Curated Events in Ottawa & Gatineau";

export const siteDescription =
  "Prosper Events curates intimate, elevated social experiences across Ottawa and Gatineau, blending atmosphere, hospitality, music, food, and connection.";

export const siteKeywords = [
  "Ottawa events",
  "Gatineau events",
  "Ottawa luxury events",
  "Ottawa social events",
  "Ottawa cocktail events",
  "Ottawa nightlife",
  "Ottawa curated experiences",
  "things to do in Ottawa",
  "upscale events Ottawa",
  "private event inquiries Ottawa",
];

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Inquiries", href: "/inquiries" },
] as const;

export const contactDetails = {
  email: "theliau@prosperevents.ca",
  phoneLabel: "343 463 3333",
  phoneHref: "tel:3434633333",
  instagram: "https://www.instagram.com/prosper.events/",
  facebook: "https://www.facebook.com/profile.php?id=61588175548605",
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Prosper Events",
      url: siteUrl,
      logo: `${siteUrl}/assets/logos/prosper-events-square-logo.png`,
      image: `${siteUrl}/assets/gallery/hero-cocktails.jpg`,
      description: siteDescription,
      email: contactDetails.email,
      telephone: contactDetails.phoneLabel,
      sameAs: [contactDetails.instagram, contactDetails.facebook],
      areaServed: ["Ottawa, Ontario", "Gatineau, Quebec"],
      knowsAbout: [
        "Curated events",
        "Luxury social gatherings",
        "Cocktail events",
        "Private bookings",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: "Prosper Events",
      url: siteUrl,
      image: `${siteUrl}/assets/gallery/gathered-table.jpg`,
      email: contactDetails.email,
      telephone: contactDetails.phoneLabel,
      priceRange: "$$$",
      areaServed: ["Ottawa, Ontario", "Gatineau, Quebec"],
      sameAs: [contactDetails.instagram, contactDetails.facebook],
      description:
        "Ottawa and Gatineau curated events with an intimate, hospitality-led, European luxury sensibility.",
    },
  ],
};
