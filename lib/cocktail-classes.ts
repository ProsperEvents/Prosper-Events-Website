export const COCKTAIL_CLASSES = {
  slug: "cocktail-classes",
  title: "Cocktail Classes",
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
    ["Left Bank Martini", "Gin, St-Germain, Chardonnay, dry vermouth, lime"],
    ["Man O' War", "Whisky, Triple Sec, sweet vermouth, lemon juice, lemon"],
    ["Grapefruit Gimlet", "Gin, grapefruit juice, lime juice, simple syrup, grapefruit pieces"],
    ["NYC Sour", "Whisky, lemon juice, simple syrup, egg white, Malbec"],
    ["Aviation", "Gin, Luxardo, crème de violette, lemon juice, lemon"],
    ["Last Word", "Gin, Green Chartreuse, Luxardo, lime juice, lime"],
    ["Lillet St-Germain", "Lillet Blanc, St-Germain, grapefruit juice, lime juice, grapefruit pieces"],
  ],
  mocktails: [
    ["Perfect Pom", "Pomegranate juice, orange juice, ginger beer, club soda, mint"],
    ["Lychee Spritz", "Lychee, club soda, lime, mint, lychee syrup"],
    ["Peach Basil Tingle", "Peach purée, lemon juice, basil, honey syrup, ginger kombucha"],
    ["Grapefruit Spritz", "Grapefruit juice, lemon juice, ginger apple juice, honey syrup, club soda, grapefruit pieces"],
  ],
} as const;
