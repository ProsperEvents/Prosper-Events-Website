import { NextRequest, NextResponse } from "next/server";
import { COCKTAIL_CLASSES, isCocktailClassDate, isTicketSalesOpen } from "@/lib/cocktail-classes";
import { ticketAvailability } from "@/lib/ticket-inventory";
import { getStripe } from "@/lib/stripe";
import { drinkNames, serializeSelectionMetadata, type GuestSelection } from "@/lib/ticket-selections";

export const runtime = "nodejs";

type BuyerDetails = { name: string; email: string; phone: string };

function validBuyer(input: unknown): BuyerDetails | null {
  if (!input || typeof input !== "object") return null;
  const { name, email, phone } = input as { name?: unknown; email?: unknown; phone?: unknown };
  if (typeof name !== "string" || !name.trim() || name.trim().length > 80) return null;
  if (typeof email !== "string" || email.length > 254 || !/^\S+@\S+\.\S+$/.test(email.trim())) return null;
  if (typeof phone !== "string" || phone.trim().length < 7 || phone.trim().length > 30) return null;
  return { name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim() };
}

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
    const { date, quantity, buyer: buyerInput, guests } = await request.json();
    if (!isCocktailClassDate(date) || !Number.isInteger(quantity) || quantity < 1 || quantity > COCKTAIL_CLASSES.capacityPerDate) {
      return NextResponse.json({ error: "Please choose a valid class date and ticket quantity." }, { status: 400 });
    }
    if (!isTicketSalesOpen(date)) {
      return NextResponse.json({ error: "Ticket sales are closed for this date." }, { status: 409 });
    }
    const buyer = validBuyer(buyerInput);
    if (!buyer) return NextResponse.json({ error: "Please enter a valid purchaser name, email address, and phone number." }, { status: 400 });
    const selections = validSelections(guests, quantity);
    if (!selections) return NextResponse.json({ error: "Please enter each guest’s name and choose three different drinks for each ticket." }, { status: 400 });
    const selectionMetadata = serializeSelectionMetadata(selections);

    const availability = await ticketAvailability(date);
    if (quantity > availability.remainingForDate) {
      return NextResponse.json({ error: `Only ${availability.remainingForDate} ticket${availability.remainingForDate === 1 ? "" : "s"} remain for this night.` }, { status: 409 });
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "required",
      customer_creation: "always",
      customer_email: buyer.email,
      allow_promotion_codes: false,
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: `${COCKTAIL_CLASSES.title} (${COCKTAIL_CLASSES.dates[date].label})`,
              description: `${COCKTAIL_CLASSES.venue} · 7:30 PM–9:30 PM`,
            },
            unit_amount: COCKTAIL_CLASSES.priceCents,
          },
          quantity,
        },
      ],
      metadata: {
        eventSlug: COCKTAIL_CLASSES.slug,
        eventDate: date,
        ticketCount: String(quantity),
        buyerName: buyer.name,
        buyerEmail: buyer.email,
        buyerPhone: buyer.phone,
        ...selectionMetadata,
        cancellationPolicy: "No refunds",
      },
      payment_intent_data: {
        metadata: {
          eventSlug: COCKTAIL_CLASSES.slug,
          eventDate: date,
          ticketCount: String(quantity),
          buyerName: buyer.name,
          buyerEmail: buyer.email,
          buyerPhone: buyer.phone,
          ...selectionMetadata,
        },
      },
      success_url: `${origin}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/events/${COCKTAIL_CLASSES.slug}#tickets`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Ticket checkout error", error);
    return NextResponse.json({ error: "Checkout is temporarily unavailable. Please try again shortly." }, { status: 500 });
  }
}
