import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { COCKTAIL_CLASSES, isCocktailClassDate } from "@/lib/cocktail-classes";
import { getStripe } from "@/lib/stripe";
import { calendarLinks } from "@/lib/calendar-links";
import { parseSelections } from "@/lib/ticket-selections";
import { drinkInventory, ticketOrderBreakdownCsv, ticketPrepSummaryCsv, ticketTrackerCsv } from "@/lib/ticket-inventory";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

async function sendEmailOrThrow(
  resend: Resend,
  email: Parameters<Resend["emails"]["send"]>[0],
  label: string,
) {
  const { error } = await resend.emails.send(email);
  if (error) throw new Error(`${label} email failed: ${error.message}`);
}

async function sendUpdatedTracker(resend: Resend, reference: string) {
  const [trackerCsv, orderBreakdownCsv, prepSummaryCsv] = await Promise.all([ticketTrackerCsv(), ticketOrderBreakdownCsv(), ticketPrepSummaryCsv()]);
  await sendEmailOrThrow(resend, {
    from: process.env.TICKET_FROM_EMAIL || "Prosper Events <theliau@prosperevents.ca>",
    to: "prosperevents032@gmail.com",
    subject: "Cocktail Class tracker updated — ticket refunded",
    headers: { "Idempotency-Key": `ticket-refund-tracker-${reference}` },
    attachments: [
      { filename: "cocktail-class-guest-tracker.csv", content: Buffer.from(trackerCsv).toString("base64") },
      { filename: "cocktail-class-order-breakdown.csv", content: Buffer.from(orderBreakdownCsv).toString("base64") },
      { filename: "cocktail-class-drink-prep-summary.csv", content: Buffer.from(prepSummaryCsv).toString("base64") },
    ],
    html: "<p>A ticket payment was fully refunded. The attached guest tracker, order breakdown, and drink-prep summary now exclude that order.</p>",
  }, "Prosper Events refund notification");
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) return new NextResponse("Webhook configuration missing.", { status: 400 });

  try {
    const event = getStripe().webhooks.constructEvent(await request.text(), signature, webhookSecret);
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) throw new Error("RESEND_API_KEY is missing.");
    const resend = new Resend(resendApiKey);

    if (event.type === "charge.refunded") {
      const charge = event.data.object;
      if (charge.amount_refunded >= charge.amount) {
        await sendUpdatedTracker(resend, charge.id);
      }
      return NextResponse.json({ received: true });
    }

    if (event.type !== "checkout.session.completed") return NextResponse.json({ received: true });

    const session = event.data.object;
    const eventDate = session.metadata?.eventDate ?? "";
    if (session.metadata?.eventSlug !== COCKTAIL_CLASSES.slug || !isCocktailClassDate(eventDate)) return NextResponse.json({ received: true });

    const email = session.customer_details?.email || session.customer_email;
    if (!email) throw new Error("Completed checkout session has no customer email address.");
    const date = COCKTAIL_CLASSES.dates[eventDate];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.prosperevents.ca";
    const count = Number(session.metadata?.ticketCount ?? 1);
    const ticketCode = session.id.slice(-8).toUpperCase();
    const selections = parseSelections(session.metadata?.ticketSelections);
    const calendar = calendarLinks(eventDate, session.id, siteUrl);
    const customerSelectionRows = selections.map((guest) => `<tr><td style="padding:14px 0;border-top:1px solid #e8e2de"><strong>${escapeHtml(guest.name)}</strong><br><span style="color:#625d67">${guest.drinks.map(escapeHtml).join(" · ")}</span></td></tr>`).join("");

    await sendEmailOrThrow(resend, {
      from: process.env.TICKET_FROM_EMAIL || "Prosper Events <theliau@prosperevents.ca>",
      to: email,
      replyTo: "theliau@prosperevents.ca",
      subject: `Your Cocktail Class ticket · ${date.label}`,
      headers: { "Idempotency-Key": `ticket-confirmation-${session.id}` },
      html: `<div style="margin:0;background:#f7f4f1;padding:28px 12px;font-family:Arial,sans-serif;color:#2e2930"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:auto;background:#fff;border-radius:22px;overflow:hidden"><tr><td><img src="${siteUrl}/assets/events/cocktail-classes/hero.png" alt="Cocktail Class at Prosper Events" width="620" style="display:block;width:100%;height:auto"></td></tr><tr><td style="padding:32px"><p style="margin:0;color:#74677d;font-size:11px;letter-spacing:2px;text-transform:uppercase">Prosper Events · Ticket confirmation</p><h1 style="margin:14px 0 12px;font-family:Georgia,serif;font-size:38px;font-weight:400">You’re on the list.</h1><p style="line-height:1.6">Thank you for reserving ${count} ticket${count === 1 ? "" : "s"} for <strong>Cocktail Class</strong>.</p><div style="margin:24px 0;padding:20px;background:#f7f1ec;border-radius:14px;line-height:1.65"><strong>Cocktail Class · ${date.label}</strong><br>7:30–9:30 PM<br>${COCKTAIL_CLASSES.venue}<br>${COCKTAIL_CLASSES.address}<br><span style="color:#625d67">Ticket reference: ${ticketCode}</span></div>${customerSelectionRows ? `<p style="margin:26px 0 4px;color:#74677d;font-size:11px;letter-spacing:2px;text-transform:uppercase">Your drink selections</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${customerSelectionRows}</table>` : ""}<p style="margin:20px 0"><a href="${calendar.google}" style="display:inline-block;margin:4px 6px 4px 0;padding:11px 15px;border-radius:999px;background:#2e2930;color:#fff;text-decoration:none">Google Calendar</a><a href="${calendar.outlook}" style="display:inline-block;margin:4px 6px 4px 0;padding:11px 15px;border-radius:999px;border:1px solid #2e2930;color:#2e2930;text-decoration:none">Outlook</a><a href="${calendar.apple}" style="display:inline-block;margin:4px 6px 4px 0;padding:11px 15px;border-radius:999px;border:1px solid #2e2930;color:#2e2930;text-decoration:none">Apple Calendar</a></p><p><a href="${siteUrl}/tickets/cancel?session_id=${session.id}" style="color:#625d67">Cancel ticket</a></p><p style="margin-top:24px;color:#625d67;font-size:12px;line-height:1.6">Ticket sales are final. Cancellation does not issue a refund.</p></td></tr></table></div>`,
    }, "Customer ticket confirmation");

    const inventory = await drinkInventory();
    const [trackerCsv, orderBreakdownCsv, prepSummaryCsv] = await Promise.all([ticketTrackerCsv(), ticketOrderBreakdownCsv(), ticketPrepSummaryCsv()]);
    const selectedDrinkRows = selections.map((guest) => `<tr><td style="padding:12px 0;border-bottom:1px solid #e9e4df"><strong>${escapeHtml(guest.name)}</strong></td><td style="padding:12px 0;border-bottom:1px solid #e9e4df;color:#625d67">${guest.drinks.map(escapeHtml).join("<br>")}</td></tr>`).join("") || "<tr><td colspan=\"2\" style=\"padding:12px 0\">No selection details available.</td></tr>";
    const prepRows = Object.entries(inventory.totals).filter(([, total]) => total > 0).map(([drink, total]) => `<tr><td style="padding:10px 0;border-bottom:1px solid #e9e4df">${escapeHtml(drink)}</td><td style="padding:10px 0;border-bottom:1px solid #e9e4df;text-align:center">${inventory.byDate["2026-09-18"][drink as keyof typeof inventory.totals]}</td><td style="padding:10px 0;border-bottom:1px solid #e9e4df;text-align:center">${inventory.byDate["2026-09-19"][drink as keyof typeof inventory.totals]}</td><td style="padding:10px 0;border-bottom:1px solid #e9e4df;text-align:right"><strong>${total}</strong></td></tr>`).join("") || "<tr><td colspan=\"4\" style=\"padding:12px 0\">No drink selections yet.</td></tr>";

    await sendEmailOrThrow(resend, {
      from: process.env.TICKET_FROM_EMAIL || "Prosper Events <theliau@prosperevents.ca>",
      to: "prosperevents032@gmail.com",
      subject: `New Cocktail Class sale · ${count} ticket${count === 1 ? "" : "s"}`,
      headers: { "Idempotency-Key": `ticket-sale-notification-${session.id}` },
      attachments: [
        { filename: "cocktail-class-guest-tracker.csv", content: Buffer.from(trackerCsv).toString("base64") },
        { filename: "cocktail-class-order-breakdown.csv", content: Buffer.from(orderBreakdownCsv).toString("base64") },
        { filename: "cocktail-class-drink-prep-summary.csv", content: Buffer.from(prepSummaryCsv).toString("base64") },
      ],
      html: `<div style="margin:0;background:#f7f4f1;padding:28px 12px;font-family:Arial,sans-serif;color:#2e2930"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:auto;background:#fff;border-radius:18px;overflow:hidden"><tr><td style="padding:30px 32px;background:#292632;color:#fff"><p style="margin:0;color:#d8cfd2;font-size:11px;letter-spacing:2px;text-transform:uppercase">Prosper Events · New sale</p><h1 style="margin:12px 0 0;font-family:Georgia,serif;font-size:32px;font-weight:400">Cocktail Class</h1></td></tr><tr><td style="padding:30px 32px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f1ec;border-radius:12px"><tr><td style="padding:17px 18px"><span style="display:block;color:#74677d;font-size:10px;letter-spacing:1.5px;text-transform:uppercase">Date</span><strong style="display:block;margin-top:5px">${date.label}</strong></td><td style="padding:17px 18px"><span style="display:block;color:#74677d;font-size:10px;letter-spacing:1.5px;text-transform:uppercase">Tickets</span><strong style="display:block;margin-top:5px">${count}</strong></td><td style="padding:17px 18px"><span style="display:block;color:#74677d;font-size:10px;letter-spacing:1.5px;text-transform:uppercase">Reference</span><strong style="display:block;margin-top:5px">${ticketCode}</strong></td></tr></table><p style="margin:22px 0 4px;color:#74677d;font-size:11px;letter-spacing:1.5px;text-transform:uppercase">Buyer</p><p style="margin:0 0 28px;font-size:16px"><strong>${escapeHtml(session.customer_details?.name || "Guest")}</strong><br><span style="color:#625d67">${escapeHtml(email)}</span></p><h2 style="margin:0 0 10px;font-family:Georgia,serif;font-size:24px;font-weight:400">This order</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><th align="left" style="padding:0 0 8px;font-size:11px;color:#74677d;text-transform:uppercase;letter-spacing:1px">Guest</th><th align="left" style="padding:0 0 8px;font-size:11px;color:#74677d;text-transform:uppercase;letter-spacing:1px">Three selections</th></tr>${selectedDrinkRows}</table><h2 style="margin:32px 0 10px;font-family:Georgia,serif;font-size:24px;font-weight:400">What to prep</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><th align="left" style="padding:0 0 8px;font-size:11px;color:#74677d;text-transform:uppercase;letter-spacing:1px">Drink</th><th style="padding:0 0 8px;font-size:11px;color:#74677d;text-transform:uppercase;letter-spacing:1px">Fri 18</th><th style="padding:0 0 8px;font-size:11px;color:#74677d;text-transform:uppercase;letter-spacing:1px">Sat 19</th><th align="right" style="padding:0 0 8px;font-size:11px;color:#74677d;text-transform:uppercase;letter-spacing:1px">Total</th></tr>${prepRows}</table><p style="margin:24px 0 0;color:#74677d;font-size:12px;line-height:1.5">Attached: the current guest tracker, price breakdown, and drink-prep summary. Counts include paid, active tickets only.</p></td></tr></table></div>`,
    }, "Prosper Events sale notification");
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error", error);
    return new NextResponse("Webhook error", { status: 400 });
  }
}
