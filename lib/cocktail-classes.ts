export const COCKTAIL_CLASSES = {
  slug: "cocktail-class-october-23-2026",
  title: "The Perfect Cocktail Class",
  priceCents: 8999,
  capacityPerDate: 14,
  venue: "Equator Coffee Westboro",
  address: "412 Churchill Ave N, Ottawa, ON K1Z 5C6",
  heroImage: "/assets/events/cocktail-class-october-23-2026/cover.webp",
  dates: {
    "2026-10-23": {
      label: "Friday, October 23, 2026",
      shortLabel: "Friday, October 23",
      start: "2026-10-23T19:30:00-04:00",
      end: "2026-10-23T21:30:00-04:00",
      salesOpen: true,
    },
  },
} as const;

export type CocktailClassDate = keyof typeof COCKTAIL_CLASSES.dates;

export function isCocktailClassDate(value: string): value is CocktailClassDate {
  return value in COCKTAIL_CLASSES.dates;
}

export function isTicketSalesOpen(date: CocktailClassDate) {
  return COCKTAIL_CLASSES.dates[date].salesOpen;
}

export const cocktailMenu = {
  cocktails: [
    ["Last Word", "Dry gin, Green Chartreuse, maraschino liqueur, lime juice"],
    ["Paper Plane", "Rye whisky, Amaro Nonino, Aperol, lemon juice"],
    ["Corpse Reviver", "Dry gin, triple sec, Lillet Blanc, lemon juice"],
  ],
  mocktails: [
    ["Fall Harvest", "Apple cider, orange juice, lemon juice, maple syrup, apple cider vinegar, ginger kombucha"],
    ["Figure No. 3", "Fig jam, lemon juice, apple cider, cinnamon, grated ginger"],
    ["Sage Paloma", "Grapefruit juice, vanilla sage-infused syrup, lime juice, sparkling grapefruit"],
  ],
} as const;

export const cocktailMenuImages = [
  {
    src: "/assets/events/cocktail-class-october-23-2026/menus/cocktails.webp",
    alt: "October 23 cocktail selections: Last Word, Paper Plane, and Corpse Reviver",
  },
  {
    src: "/assets/events/cocktail-class-october-23-2026/menus/mocktails.webp",
    alt: "October 23 mocktail selections: Fall Harvest, Figure No. 3, and Sage Paloma",
  },
] as const;
