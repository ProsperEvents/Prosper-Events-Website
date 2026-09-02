import { getStripe } from "@/lib/stripe";
import { COCKTAIL_CLASSES, type CocktailClassDate } from "@/lib/cocktail-classes";
import { drinkNames, parseSelections } from "@/lib/ticket-selections";

export async function soldTickets() {
  const stripe = getStripe();
  const sessions = await stripe.checkout.sessions.list({
    limit: 100,
    expand: ["data.payment_intent.latest_charge"],
  });
  return sessions.data.filter((session) =>
    session.metadata?.eventSlug === COCKTAIL_CLASSES.slug &&
    session.payment_status === "paid" &&
    session.metadata?.cancelled !== "true" &&
    !isFullyRefunded(session),
  );
}

function isFullyRefunded(session: Awaited<ReturnType<ReturnType<typeof getStripe>["checkout"]["sessions"]["list"]>>["data"][number]) {
  const paymentIntent = session.payment_intent;
  if (!paymentIntent || typeof paymentIntent === "string") return false;
  const charge = paymentIntent.latest_charge;
  return Boolean(charge && typeof charge !== "string" && charge.amount_refunded >= charge.amount);
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

function csvCell(value: string | number | null | undefined) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function csv(rows: (string | number | null | undefined)[][]) {
  return `\ufeff${rows.map((row) => row.map(csvCell).join(",")).join("\r\n")}`;
}

function cad(cents: number) {
  return `CA$${(cents / 100).toFixed(2)}`;
}

export async function ticketTrackerCsv() {
  const sessions = await soldTickets();
  const rows = [["Buyer name", "Buyer email", "Guest name", "Attending date", "Ticket reference", "Drink 1", "Drink 2", "Drink 3"]];
  for (const session of sessions) {
    const eventDate = session.metadata?.eventDate;
    if (!eventDate || !isDate(eventDate)) continue;
    const date = COCKTAIL_CLASSES.dates[eventDate].label;
    const reference = session.id.slice(-8).toUpperCase();
    const buyerName = session.customer_details?.name ?? "";
    const buyerEmail = session.customer_details?.email ?? session.customer_email ?? "";
    for (const guest of parseSelections(session.metadata?.ticketSelections)) {
      rows.push([buyerName, buyerEmail, guest.name, date, reference, ...guest.drinks]);
    }
  }
  return csv(rows);
}

export async function ticketOrderBreakdownCsv() {
  const sessions = await soldTickets();
  const rows: (string | number)[][] = [["Ticket reference", "Buyer name", "Buyer email", "Attending date", "Early tickets", "Early ticket price", "Regular tickets", "Regular ticket price", "Order total paid"]];
  for (const session of sessions) {
    const eventDate = session.metadata?.eventDate;
    if (!eventDate || !isDate(eventDate)) continue;
    const ticketCount = Number(session.metadata?.ticketCount ?? 0);
    const earlyTickets = Math.min(ticketCount, Number(session.metadata?.discountedTickets ?? 0));
    const regularTickets = Math.max(0, ticketCount - earlyTickets);
    rows.push([
      session.id.slice(-8).toUpperCase(),
      session.customer_details?.name ?? "",
      session.customer_details?.email ?? session.customer_email ?? "",
      COCKTAIL_CLASSES.dates[eventDate].label,
      earlyTickets,
      earlyTickets ? cad(COCKTAIL_CLASSES.discountedPriceCents) : "",
      regularTickets,
      regularTickets ? cad(COCKTAIL_CLASSES.priceCents) : "",
      cad(session.amount_total ?? 0),
    ]);
  }
  return csv(rows);
}

export async function ticketPrepSummaryCsv() {
  const inventory = await drinkInventory();
  const dates = Object.keys(COCKTAIL_CLASSES.dates) as CocktailClassDate[];
  const rows: (string | number)[][] = [["Drink", ...dates.map((date) => COCKTAIL_CLASSES.dates[date].label), "Total"]];
  for (const drink of drinkNames) {
    const byDate = dates.map((date) => inventory.byDate[date][drink]);
    const total = inventory.totals[drink];
    if (total > 0) rows.push([drink, ...byDate, total]);
  }
  return csv(rows);
}

function isDate(value: string): value is CocktailClassDate {
  return value in COCKTAIL_CLASSES.dates;
}
