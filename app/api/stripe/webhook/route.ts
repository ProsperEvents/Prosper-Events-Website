import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { COCKTAIL_CLASSES, isCocktailClassDate } from "@/lib/cocktail-classes";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) return new NextResponse("Webhook configuration missing.", { status: 400 });

  try {
    const event = getStripe().webhooks.constructEvent(await request.text(), signature, webhookSecret);
    if (event.type !== "checkout.session.completed") return NextResponse.json({ received: true });

    const session = event.data.object;
    const eventDate = session.metadata?.eventDate ?? "";
    if (session.metadata?.eventSlug !== COCKTAIL_CLASSES.slug || !isCocktailClassDate(eventDate)) {
      return NextResponse.json({ received: true });
    }
    const email = session.customer_details?.email || session.customer_email;
    if (!email || !process.env.RESEND_API_KEY) return NextResponse.json({ received: true });

    const date = COCKTAIL_CLASSES.dates[eventDate];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prosperevents.ca";
    const count = Number(session.metadata.ticketCount ?? 1);
    const ticketCode = session.id.slice(-8).toUpperCase();
    await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: process.env.TICKET_FROM_EMAIL || "Prosper Events <tickets@prosperevents.ca>",
      to: email,
      subject: `Your Cocktail Classes ticket · ${date.label}`,
      html: `<h1>You’re on the list.</h1><p>Thank you for reserving ${count} ticket${count === 1 ? "" : "s"} for <strong>Cocktail Classes</strong>.</p><p><strong>${date.label}</strong><br />7:30–9:30 PM<br />${COCKTAIL_CLASSES.venue}<br />${COCKTAIL_CLASSES.address}</p><p>Make any three drinks from the cocktail and mocktail menu. Cocktail choices are 19+.</p><p>Your ticket reference: <strong>${ticketCode}</strong></p><p><a href="${siteUrl}/api/tickets/calendar?session_id=${session.id}">Add to calendar</a> · <a href="${siteUrl}/tickets/cancel?session_id=${session.id}">Cancel ticket</a></p><p>Ticket sales are final. Cancellation does not issue a refund.</p>`,
    });
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error", error);
    return new NextResponse("Webhook error", { status: 400 });
  }
}
