import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getStripe } from "@/lib/stripe";
import { COCKTAIL_CLASSES } from "@/lib/cocktail-classes";
import { ticketOrderBreakdownCsv, ticketPrepSummaryCsv, ticketRevenueSummary, ticketTrackerCsv } from "@/lib/ticket-inventory";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();
    if (typeof sessionId !== "string" || !sessionId.startsWith("cs_")) {
      return NextResponse.json({ error: "This ticket link is invalid." }, { status: 400 });
    }
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.metadata?.eventSlug !== COCKTAIL_CLASSES.slug || session.payment_status !== "paid") {
      return NextResponse.json({ error: "This ticket cannot be cancelled." }, { status: 400 });
    }
    if (session.metadata?.cancelled === "true") {
      return NextResponse.json({ message: "This ticket has already been cancelled." });
    }

    await stripe.checkout.sessions.update(sessionId, { metadata: { ...session.metadata, cancelled: "true" } });
    const customerEmail = session.customer_details?.email || session.customer_email;
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      if (customerEmail) await resend.emails.send({
        from: process.env.TICKET_FROM_EMAIL || "Prosper Events <theliau@prosperevents.ca>",
        to: customerEmail,
        subject: `${COCKTAIL_CLASSES.title} ticket cancelled — no refund issued`,
        html: `<p>Your ${COCKTAIL_CLASSES.title} ticket has been cancelled. As stated at checkout, ticket sales are final and no refund has been issued.</p><p>Prosper Events has been notified.</p>`,
      });
      const [trackerCsv, ordersCsv, prepCsv, summary] = await Promise.all([ticketTrackerCsv(), ticketOrderBreakdownCsv(), ticketPrepSummaryCsv(), ticketRevenueSummary()]);
      await resend.emails.send({
        from: process.env.TICKET_FROM_EMAIL || "Prosper Events <theliau@prosperevents.ca>",
        to: process.env.TICKET_REPORT_EMAIL || "prosperevents032@gmail.com",
        subject: `${COCKTAIL_CLASSES.title} tracker updated — ticket cancelled`,
        html: `<p>A ticket was cancelled. The attached files contain the current active attendee list, contact details, selections, revenue, and preparation totals.</p><p><strong>${summary.tickets}</strong> active attendee${summary.tickets === 1 ? "" : "s"} · <strong>CA$${(summary.revenueCents / 100).toFixed(2)}</strong> current revenue</p><p>No refund was issued.</p>`,
        attachments: [
          { filename: "october-23-attendees.csv", content: Buffer.from(trackerCsv).toString("base64") },
          { filename: "october-23-orders-and-revenue.csv", content: Buffer.from(ordersCsv).toString("base64") },
          { filename: "october-23-drink-prep.csv", content: Buffer.from(prepCsv).toString("base64") },
        ],
      });
    }
    return NextResponse.json({ message: "Your ticket has been cancelled. No refund has been issued." });
  } catch (error) {
    console.error("Ticket cancellation error", error);
    return NextResponse.json({ error: "We could not cancel this ticket. Please contact Theliau@prosperevents.ca." }, { status: 500 });
  }
}
