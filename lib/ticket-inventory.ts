import { getStripe } from "@/lib/stripe";
import { COCKTAIL_CLASSES, type CocktailClassDate } from "@/lib/cocktail-classes";
import { drinkNames, parseSelections } from "@/lib/ticket-selections";

export async function soldTickets() {
  const stripe = getStripe();
  const sessions = await stripe.checkout.sessions.list({ limit: 100 });
  return sessions.data.filter((session) =>
    session.metadata?.eventSlug === COCKTAIL_CLASSES.slug &&
    session.payment_status === "paid" &&
    session.metadata?.cancelled !== "true",
  );
}

export async function ticketAvailability(date: CocktailClassDate) {
  const sessions = await soldTickets();
  const quantities = sessions.map((session) => Number(session.metadata?.ticketCount ?? 0));
  const discounted = sessions.reduce((total, session) => total + Number(session.metadata?.discountedTickets ?? 0), 0);
  const soldForDate = sessions
    .filter((session) => session.metadata?.eventDate === date)
    .reduce((total, session) => total + Number(session.metadata?.ticketCount ?? 0), 0);

  return {
    remainingForDate: Math.max(0, COCKTAIL_CLASSES.capacityPerDate - soldForDate),
    discountedRemaining: Math.max(0, COCKTAIL_CLASSES.discountTicketsTotal - discounted),
    ticketsSold: quantities.reduce((total, quantity) => total + quantity, 0),
  };
}

export async function drinkInventory() {
  const sessions = await soldTickets();
  const totals = Object.fromEntries(drinkNames.map((name) => [name, 0])) as Record<(typeof drinkNames)[number], number>;
  const byDate = Object.fromEntries(Object.keys(COCKTAIL_CLASSES.dates).map((date) => [date, { ...totals }])) as Record<CocktailClassDate, typeof totals>;
  for (const session of sessions) {
    const eventDate = session.metadata?.eventDate;
    if (!eventDate || !isDate(eventDate)) continue;
    for (const guest of parseSelections(session.metadata?.ticketSelections)) {
      for (const drink of guest.drinks) {
        if (drink in totals) {
          const key = drink as keyof typeof totals;
          totals[key] += 1;
          byDate[eventDate][key] += 1;
        }
      }
    }
  }
  return { totals, byDate };
}

function isDate(value: string): value is CocktailClassDate {
  return value in COCKTAIL_CLASSES.dates;
}
