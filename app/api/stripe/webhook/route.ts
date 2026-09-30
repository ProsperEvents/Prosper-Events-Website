import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { calendarLinks } from "@/lib/calendar-links";
import { COCKTAIL_CLASSES, isCocktailClassDate, type CocktailClassDate } from "@/lib/cocktail-classes";
import { getStripe } from "@/lib/stripe";
import { parseSelectionsFromMetadata, type GuestSelection } from "@/lib/ticket-selections";
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

function customerEmailHtml({
  eventDate,
  sessionId,
  count,
  ticketCode,
  selections,
  siteUrl,
}: {
  eventDate: CocktailClassDate;
  sessionId: string;
  count: number;
  ticketCode: string;
  selections: GuestSelection[];
  siteUrl: string;
}) {
  const date = COCKTAIL_CLASSES.dates[eventDate];
  const calendar = calendarLinks(eventDate, sessionId, siteUrl);
  const selectionRows = selections.map((guest) => `<tr><td style="padding:14px 0;border-top:1px solid #e8e2de"><strong>${escapeHtml(guest.name)}</strong><br><span style="color:#625d67">${guest.drinks.map(escapeHtml).join(" · ")}</span></td></tr>`).join("");
  return `<div style="margin:0;background:#f7f4f1;padding:28px 12px;font-family:Arial,sans-serif;color:#2e2930"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:auto;background:#fff;border-radius:22px;overflow:hidden"><tr><td><img src="${siteUrl}${COCKTAIL_CLASSES.heroImage}" alt="${COCKTAIL_CLASSES.title} at Prosper Events" width="620" style="display:block;width:100%;height:auto"></td></tr><tr><td style="padding:32px"><p style="margin:0;color:#74677d;font-size:11px;letter-spacing:2px;text-transform:uppercase">Prosper Events · Ticket confirmation</p><h1 style="margin:14px 0 12px;font-family:Georgia,serif;font-size:38px;font-weight:400">You’re on the list.</h1><p style="line-height:1.6">Thank you for reserving ${count} ticket${count === 1 ? "" : "s"} for <strong>${COCKTAIL_CLASSES.title}</strong>.</p><div style="margin:24px 0;padding:20px;background:#f7f1ec;border-radius:14px;line-height:1.65"><strong>${COCKTAIL_CLASSES.title} · ${date.label}</strong><br>7:30–9:30 PM<br>${COCKTAIL_CLASSES.venue}<br>${COCKTAIL_CLASSES.address}<br><span style="color:#625d67">Ticket reference: ${ticketCode}</span></div>${selectionRows ? `<p style="margin:26px 0 4px;color:#74677d;font-size:11px;letter-spacing:2px;text-transform:uppercase">Your drink selections</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${selectionRows}</table>` : ""}<p style="margin:20px 0"><a href="${calendar.google}" style="display:inline-block;margin:4px 6px 4px 0;padding:11px 15px;border-radius:999px;background:#2e2930;color:#fff;text-decoration:none">Google Calendar</a><a href="${calendar.outlook}" style="display:inline-block;margin:4px 6px 4px 0;padding:11px 15px;border-radius:999px;border:1px solid #2e2930;color:#2e2930;text-decoration:none">Outlook</a><a href="${calendar.apple}" style="display:inline-block;margin:4px 6px 4px 0;padding:11px 15px;border-radius:999px;border:1px solid #2e2930;color:#2e2930;text-decoration:none">Apple Calendar</a></p><p><a href="${siteUrl}/tickets/cancel?session_id=${sessionId}" style="color:#625d67">Cancel ticket</a></p><p style="margin-top:24px;color:#625d67;font-size:12px;line-height:1.6">Ticket sales are final. Cancellation does not issue a refund.</p></td></tr></table></div>`;
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

    const email = session.customer_details?.email || session.customer_email;
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
      html: customerEmailHtml({ eventDate, sessionId: session.id, count, ticketCode, selections, siteUrl }),
    }, "Customer ticket confirmation");

    const [inventory, attachments, summary] = await Promise.all([
      drinkInventory(),
      trackerAttachments(),
      ticketRevenueSummary(),
    ]);
    const buyerName = escapeHtml(session.customer_details?.name || "Guest");
    const buyerPhone = escapeHtml(session.customer_details?.phone || "Not provided");
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
