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
  ticketing?: {
    price: number;
    capacityPerDate: number;
    discountTicketsTotal: number;
  };
};

export const events: EventItem[] = [
  {
    slug: "cocktail-classes",
    title: "Cocktail Class",
    status: "upcoming",
    startDate: "2026-09-18T19:30:00-04:00",
    endDate: "2026-09-18T21:30:00-04:00",
    time: "7:30 PM - 9:30 PM",
    location: "Equator Coffee Westboro",
    address: "412 Churchill Ave N, Ottawa, ON K1Z 5C6",
    description:
      "A hands-on cocktail and mocktail class: choose any three drinks and create your own evening of favourites.",
    longDescription:
      "Join Prosper Events at Equator Coffee Westboro for an intimate evening of cocktail making and tasting. Guests may choose any three cocktails or mocktails to make their own combination, pick up new techniques, and enjoy a relaxed, social class with fellow drink enthusiasts.",
    image: "/assets/events/cocktail-classes/hero.png",
    ticketing: {
      price: 69.99,
      capacityPerDate: 14,
      discountTicketsTotal: 8,
    },
    atmosphere:
      "A fun, interactive class designed for learning, tasting, conversation, and discovering a new favourite drink.",
  },
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
