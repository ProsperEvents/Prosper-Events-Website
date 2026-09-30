import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { COCKTAIL_CLASSES, isCocktailClassDate } from "@/lib/cocktail-classes";
import { getStripe } from "@/lib/stripe";
import { customerTicketEmailHtml } from "@/lib/ticket-email";
import { parseSelectionsFromMetadata } from "@/lib/ticket-selections";
import {
  drinkInventory,
  ticketOrderBreakdownCsv,
  ticketPrepSummaryCsv,
  ticketRevenueSummary,
  ticketTrackerCsv,
} from "@/lib/ticket-inventory";

export const runtime = "nodejs";

const sender = () => process.env.TICKET_FROM_EMAIL || "Prosper Events <theliau@prosperevents.ca>";
const reportRecipient = () => process.env.TICKET_REPORT_EMAIL || "prosperevents032@gmail.com";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

async function sendEmailOrThrow(resend: Resend, email: Parameters<Resend["emails"]["send"]>[0], label: string) {
  const { error } = await resend.emails.send(email);
  if (error) throw new Error(`${label} email failed: ${error.message}`);
}

async function trackerAttachments() {
  const [attendees, orders, prep] = await Promise.all([
    ticketTrackerCsv(),
    ticketOrderBreakdownCsv(),
    ticketPrepSummaryCsv(),
  ]);
  return [
    { filename: "october-23-attendees.csv", content: Buffer.from(attendees).toString("base64") },
    { filename: "october-23-orders-and-revenue.csv", content: Buffer.from(orders).toString("base64") },
    { filename: "october-23-drink-prep.csv", content: Buffer.from(prep).toString("base64") },
  ];
}

async function sendUpdatedTracker(resend: Resend, reference: string) {
  const [attachments, summary] = await Promise.all([trackerAttachments(), ticketRevenueSummary()]);
  await sendEmailOrThrow(resend, {
    from: sender(),
    to: reportRecipient(),
    subject: `${COCKTAIL_CLASSES.title} tracker updated — ticket refunded`,
    headers: { "Idempotency-Key": `ticket-refund-tracker-${reference}` },
    attachments,
    html: `<p>A ticket payment was fully refunded. The attached files contain the current active attendee list, contact details, selections, revenue, and preparation totals.</p><p><strong>${summary.tickets}</strong> active attendee${summary.tickets === 1 ? "" : "s"} · <strong>CA$${(summary.revenueCents / 100).toFixed(2)}</strong> current revenue</p>`,
  }, "Prosper Events refund notification");
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) return new NextResponse("Webhook configuration missing.", { status: 400 });

  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret);
    if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is missing.");
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (event.type === "charge.refunded") {
      const charge = event.data.object;
      if (charge.amount_refunded >= charge.amount) {
        const paymentIntent = typeof charge.payment_intent === "string" ? await stripe.paymentIntents.retrieve(charge.payment_intent) : charge.payment_intent;
        if (paymentIntent?.metadata.eventSlug === COCKTAIL_CLASSES.slug) await sendUpdatedTracker(resend, charge.id);
      }
      return NextResponse.json({ received: true });
    }

    if (event.type !== "checkout.session.completed") return NextResponse.json({ received: true });
    const session = event.data.object;
    const eventDate = session.metadata?.eventDate ?? "";
    if (session.metadata?.eventSlug !== COCKTAIL_CLASSES.slug || !isCocktailClassDate(eventDate)) return NextResponse.json({ received: true });

    const email = session.metadata?.buyerEmail || session.customer_details?.email || session.customer_email;
    if (!email) throw new Error("Completed checkout session has no customer email address.");
    const count = Number(session.metadata?.ticketCount ?? 1);
    const ticketCode = session.id.slice(-8).toUpperCase();
    const selections = parseSelectionsFromMetadata(session.metadata);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.prosperevents.ca";
    const date = COCKTAIL_CLASSES.dates[eventDate];

    await sendEmailOrThrow(resend, {
      from: sender(),
      to: email,
      replyTo: "theliau@prosperevents.ca",
      subject: `Your ${COCKTAIL_CLASSES.title} ticket · ${date.label}`,
      headers: { "Idempotency-Key": `ticket-confirmation-${session.id}` },
      html: customerTicketEmailHtml({ eventDate, sessionId: session.id, count, ticketCode, selections, siteUrl }),
    }, "Customer ticket confirmation");

    const [inventory, attachments, summary] = await Promise.all([
      drinkInventory(),
      trackerAttachments(),
      ticketRevenueSummary(),
    ]);
    const buyerName = escapeHtml(session.metadata?.buyerName || session.customer_details?.name || "Guest");
    const buyerPhone = escapeHtml(session.metadata?.buyerPhone || session.customer_details?.phone || "Not provided");
    const orderRows = selections.map((guest) => `<tr><td style="padding:10px 0;border-bottom:1px solid #e9e4df"><strong>${escapeHtml(guest.name)}</strong></td><td style="padding:10px 0;border-bottom:1px solid #e9e4df">${guest.drinks.map(escapeHtml).join("<br>")}</td></tr>`).join("");
    const prepRows = Object.entries(inventory.totals).filter(([, total]) => total > 0).map(([drink, total]) => `<tr><td style="padding:8px 0;border-bottom:1px solid #e9e4df">${escapeHtml(drink)}</td><td style="padding:8px 0;border-bottom:1px solid #e9e4df;text-align:right"><strong>${total}</strong></td></tr>`).join("");

    await sendEmailOrThrow(resend, {
      from: sender(),
      to: reportRecipient(),
      subject: `New ${COCKTAIL_CLASSES.title} sale · ${count} ticket${count === 1 ? "" : "s"}`,
      headers: { "Idempotency-Key": `ticket-sale-notification-${session.id}` },
      attachments,
      html: `<div style="font-family:Arial,sans-serif;color:#2e2930;line-height:1.55"><h1>${COCKTAIL_CLASSES.title}</h1><p><strong>New sale:</strong> ${count} ticket${count === 1 ? "" : "s"} · CA$${((session.amount_total ?? 0) / 100).toFixed(2)} · ${date.label}</p><p><strong>Buyer:</strong> ${buyerName}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Phone:</strong> ${buyerPhone}<br><strong>Reference:</strong> ${ticketCode}</p><h2>This order</h2><table role="presentation" width="100%"><tr><th align="left">Guest</th><th align="left">Three selections</th></tr>${orderRows}</table><h2>Current totals</h2><p><strong>${summary.tickets}</strong> attendee${summary.tickets === 1 ? "" : "s"} · <strong>${summary.orders}</strong> order${summary.orders === 1 ? "" : "s"} · <strong>CA$${(summary.revenueCents / 100).toFixed(2)}</strong> revenue</p><table role="presentation" width="100%"><tr><th align="left">Drink</th><th align="right">Selected</th></tr>${prepRows}</table><p>The attached CSV files contain the continuously refreshed attendee/contact list, selections, order revenue, and preparation totals. Counts include paid, active tickets only.</p></div>`,
    }, "Prosper Events sale notification");

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error", error);
    return new NextResponse("Webhook error", { status: 400 });
  }
}
