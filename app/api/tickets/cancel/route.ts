import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();
    if (typeof sessionId !== "string" || !sessionId.startsWith("cs_")) {
      return NextResponse.json({ error: "This ticket link is invalid." }, { status: 400 });
    }
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.metadata?.eventSlug !== "cocktail-classes" || session.payment_status !== "paid") {
      return NextResponse.json({ error: "This ticket cannot be cancelled." }, { status: 400 });
    }
    if (session.metadata?.cancelled === "true") {
      return NextResponse.json({ message: "This ticket has already been cancelled." });
    }

    await stripe.checkout.sessions.update(sessionId, { metadata: { ...session.metadata, cancelled: "true" } });
    const customerEmail = session.customer_details?.email || session.customer_email;
    if (customerEmail && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.TICKET_FROM_EMAIL || "Prosper Events <tickets@prosperevents.ca>",
        to: [customerEmail, "theliau@prosperevents.ca"],
        subject: "Cocktail Classes ticket cancelled — no refund issued",
        html: `<p>Your Cocktail Classes ticket has been cancelled. As stated at checkout, ticket sales are final and no refund has been issued.</p><p>Prosper Events has been notified.</p>`,
      });
    }
    return NextResponse.json({ message: "Your ticket has been cancelled. No refund has been issued." });
  } catch (error) {
    console.error("Ticket cancellation error", error);
    return NextResponse.json({ error: "We could not cancel this ticket. Please contact Theliau@prosperevents.ca." }, { status: 500 });
  }
}
