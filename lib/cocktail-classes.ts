export const COCKTAIL_CLASSES = {
  slug: "cocktail-classes",
  title: "Cocktail Class",
  priceCents: 8500,
  discountedPriceCents: 6800,
  discountTicketsTotal: 10,
  capacityPerDate: 14,
  venue: "Equator Coffee Westboro",
  address: "412 Churchill Ave N, Ottawa, ON K1Z 5C6",
  dates: {
    "2026-09-18": {
      label: "Friday, September 18, 2026",
      start: "2026-09-18T19:30:00-04:00",
      end: "2026-09-18T21:30:00-04:00",
    },
    "2026-09-19": {
      label: "Saturday, September 19, 2026",
      start: "2026-09-19T19:30:00-04:00",
      end: "2026-09-19T21:30:00-04:00",
    },
  },
} as const;

export type CocktailClassDate = keyof typeof COCKTAIL_CLASSES.dates;

export function isCocktailClassDate(value: string): value is CocktailClassDate {
  return value in COCKTAIL_CLASSES.dates;
}

export const cocktailMenu = {
  cocktails: [
    ["Aviation", "Gin, Luxardo, crème de violette, lemon juice, lemon"],
    ["Left Bank Martini", "Dry gin, St-Germain, Chardonnay, dry vermouth, lime garnish"],
    ["Lillet St-Germain", "Lillet Blanc, St-Germain, grapefruit juice, lime juice, grapefruit pieces"],
  ],
  mocktails: [
    ["Peach Basil Tingle", "Peach purée, lemon juice, basil, honey syrup, ginger kombucha, Tajín rim"],
    ["Grapefruit Spritz Mocktail", "Grapefruit juice, lemon juice, ginger juice, honey syrup, soda, grapefruit garnish"],
    ["Perfect Pom", "Pomegranate juice, orange juice, ginger beer, club soda, mint"],
  ],
} as const;
