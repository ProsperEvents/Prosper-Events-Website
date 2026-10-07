export const siteUrl = "https://prosperevents.ca";

export const siteTitle = "Prosper Events | Ottawa Event Planning & Experiences";

export const siteDescription =
  "Prosper Events plans weddings, private parties, corporate events, and year-end celebrations in Ottawa, creates memorable local experiences, and consults on hospitality menus.";

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
  "event planning Ottawa",
  "Ottawa wedding planner",
  "corporate events Ottawa",
  "year end events Ottawa",
  "menu consultant Ottawa",
  "things to do Ottawa",
  "Ottawa date night ideas",
];

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Planning", href: "/event-planning-ottawa" },
  { label: "Gallery", href: "/gallery" },
  { label: "Menu Consulting", href: "/menu-consultations" },
  { label: "Inquiries", href: "/inquiries" },
] as const;

export const primaryEventCta = {
  label: "Sign Up",
  href: "/events/cocktail-class-october-23-2026#tickets",
} as const;

export const contactDetails = {
  email: "theliau@prosperevents.ca",
  phoneLabel: "343 463 3333",
  phoneHref: "tel:3434633333",
  instagram: "https://www.instagram.com/prosper.events/",
  facebook: "https://www.facebook.com/profile.php?id=61588175548605",
  subscribeHref: "/subscribe",
  subscribeFormAction: "https://formsubmit.co/theliau@prosperevents.ca",
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Prosper Events",
      url: siteUrl,
      logo: `${siteUrl}/assets/logos/prosper-events-rounded-logo.png`,
      image: `${siteUrl}/assets/gallery/hero-cocktails.jpg`,
      description: siteDescription,
      email: contactDetails.email,
      telephone: contactDetails.phoneLabel,
      sameAs: [contactDetails.instagram, contactDetails.facebook],
      areaServed: ["Ottawa, Ontario", "Gatineau, Quebec"],
      knowsAbout: [
        "Event planning in Ottawa",
        "Weddings and private parties",
        "Corporate and year-end events",
        "Curated events",
        "Luxury social gatherings",
        "Cocktail events",
        "Food and beverage menu consulting",
        "Cocktail and mocktail menu development",
        "Private bookings",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Prosper Events services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Event planning in Ottawa",
              url: `${siteUrl}/event-planning-ottawa`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Hospitality menu consultations",
              url: `${siteUrl}/menu-consultations`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Curated Ottawa events and experiences",
              url: `${siteUrl}/things-to-do-ottawa`,
            },
          },
        ],
      },
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
        "Ottawa and Gatineau event planning, curated experiences, and hospitality menu consulting with an intimate, atmosphere-led sensibility.",
    },
  ],
};
