import { absoluteUrl, formatLongDate } from "@/lib/utils";

export type EventStatus = "upcoming" | "past";

export type EventItem = {
  slug: string;
  title: string;
  status: EventStatus;
  startDate: string;
  endDate?: string;
  time: string;
  location: string;
  address?: string;
  description: string;
  longDescription: string;
  image: string;
  menu?: string[];
  dressCode?: string;
  atmosphere?: string;
  gallery?: string[];
};

export const events: EventItem[] = [
  {
    slug: "cocktails-in-naples",
    title: "Cocktails in Naples",
    status: "past",
    startDate: "2026-03-01T18:00:00-05:00",
    endDate: "2026-03-01T22:00:00-05:00",
    time: "6:00 PM - 10:00 PM",
    location: "Pizzeria Da Romolo",
    address: "410 Bank Street, Ottawa, Ontario",
    description:
      "A March 1 evening with curated cocktails, dessert, and food service in partnership with Pizzeria Da Romolo.",
    longDescription:
      "Cocktails in Naples brought Prosper Events to Pizzeria Da Romolo for an intimate night built around four featured cocktails, a surprise dessert, and the easy social rhythm of a room filled with music, food, and conversation. The evening reflected Prosper Events at its most direct: a thoughtfully curated nightlife experience where local partnership, atmosphere, and community met in one setting.",
    image: "/assets/events/cocktails-in-naples/title.jpg",
    menu: [
      "Air Mail: light rum, prosecco, lime juice, honey syrup, mint",
      "Grapefruit Gimlet: infused dry gin, grapefruit juice, lime juice, simple syrup",
      "Starburst: white rum, pinot grigio, maraschino juice, pineapple juice, vanilla syrup",
      "Creme Brulee Espresso Martini: vodka, Bailey's, Kahlua, coffee, cream, sugar, vanilla",
    ],
    atmosphere:
      "Curated cocktails, vibrant music, and a warm room designed for movement, conversation, and shared energy.",
    gallery: [
      "/assets/events/cocktails-in-naples/title.jpg",
      "/assets/events/cocktails-in-naples/menu.jpg",
      "/assets/events/cocktails-in-naples/info.jpg",
    ],
  },
];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function getEventDateLabel(event: EventItem) {
  return formatLongDate(event.startDate);
}

export function getEventSchema(event: EventItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.longDescription,
    image: [absoluteUrl(event.image), ...(event.gallery ?? []).map(absoluteUrl)],
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus:
      event.status === "upcoming"
        ? "https://schema.org/EventScheduled"
        : "https://schema.org/EventCompleted",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
      address: event.address ?? "Ottawa / Gatineau",
    },
    organizer: {
      "@type": "Organization",
      name: "Prosper Events",
      url: "https://prosperevents.ca",
    },
  };
}
