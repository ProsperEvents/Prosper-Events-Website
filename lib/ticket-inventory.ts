import { getStripe } from "@/lib/stripe";
import { COCKTAIL_CLASSES, type CocktailClassDate } from "@/lib/cocktail-classes";

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
