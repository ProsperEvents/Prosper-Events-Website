import { NextRequest, NextResponse } from "next/server";
import { COCKTAIL_CLASSES, isCocktailClassDate } from "@/lib/cocktail-classes";
import { ticketAvailability } from "@/lib/ticket-inventory";
import { getStripe } from "@/lib/stripe";
import { drinkNames, serializeSelections, type GuestSelection } from "@/lib/ticket-selections";

export const runtime = "nodejs";

function validSelections(input: unknown, quantity: number): GuestSelection[] | null {
  if (!Array.isArray(input) || input.length !== quantity) return null;
  const selections = input.map((guest) => {
    if (!guest || typeof guest !== "object") return null;
    const { name, drinks } = guest as { name?: unknown; drinks?: unknown };
    if (typeof name !== "string" || !name.trim() || name.length > 30 || !Array.isArray(drinks) || drinks.length !== 3 || !drinks.every((drink) => typeof drink === "string" && drinkNames.includes(drink as (typeof drinkNames)[number]))) return null;
    if (new Set(drinks).size !== 3) return null;
    return { name: name.trim(), drinks: drinks as [string, string, string] };
  });
  return selections.every((selection): selection is GuestSelection => selection !== null) ? selections : null;
}

export async function POST(request: NextRequest) {
  try {
    const { date, quantity, guests } = await request.json();
    if (!isCocktailClassDate(date) || !Number.isInteger(quantity) || quantity < 1 || quantity > 4) {
      return NextResponse.json({ error: "Please choose a valid class date and ticket quantity." }, { status: 400 });
    }
    const selections = validSelections(guests, quantity);
    if (!selections) return NextResponse.json({ error: "Please enter each guest’s name and choose three different drinks for each ticket." }, { status: 400 });
    const serializedSelections = serializeSelections(selections);
    if (serializedSelections.length > 500) return NextResponse.json({ error: "Guest details are too long. Please shorten the names and try again." }, { status: 400 });

    const availability = await ticketAvailability(date);
    if (quantity > availability.remainingForDate) {
      return NextResponse.json({ error: `Only ${availability.remainingForDate} ticket${availability.remainingForDate === 1 ? "" : "s"} remain for this night.` }, { status: 409 });
    }

    const discountedTickets = Math.min(quantity, availability.discountedRemaining);
    const regularTickets = quantity - discountedTickets;
    const origin = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "required",
      customer_creation: "always",
      allow_promotion_codes: false,
      line_items: [
        ...(discountedTickets ? [{ price_data: { currency: "cad", product_data: { name: `Cocktail Class — early ticket (${COCKTAIL_CLASSES.dates[date].label})` }, unit_amount: COCKTAIL_CLASSES.discountedPriceCents }, quantity: discountedTickets }] : []),
        ...(regularTickets ? [{ price_data: { currency: "cad", product_data: { name: `Cocktail Class (${COCKTAIL_CLASSES.dates[date].label})` }, unit_amount: COCKTAIL_CLASSES.priceCents }, quantity: regularTickets }] : []),
      ],
      metadata: {
        eventSlug: COCKTAIL_CLASSES.slug,
        eventDate: date,
        ticketCount: String(quantity),
        discountedTickets: String(discountedTickets),
        ticketSelections: serializedSelections,
        cancellationPolicy: "No refunds",
      },
      success_url: `${origin}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/events/cocktail-classes#tickets`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Ticket checkout error", error);
    return NextResponse.json({ error: "Checkout is temporarily unavailable. Please try again shortly." }, { status: 500 });
  }
}
