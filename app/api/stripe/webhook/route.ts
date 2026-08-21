import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { COCKTAIL_CLASSES, isCocktailClassDate } from "@/lib/cocktail-classes";
import { getStripe } from "@/lib/stripe";
import { calendarLinks } from "@/lib/calendar-links";
import { parseSelections } from "@/lib/ticket-selections";
import { drinkInventory } from "@/lib/ticket-inventory";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

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
    const selections = parseSelections(session.metadata?.ticketSelections);
    const calendar = calendarLinks(eventDate, session.id, siteUrl);
    const selectionRows = selections.map((guest) => `<tr><td style="padding:14px 0;border-top:1px solid #e8e2de"><strong>${escapeHtml(guest.name)}</strong><br><span style="color:#625d67">${guest.drinks.map(escapeHtml).join(" · ")}</span></td></tr>`).join("");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.TICKET_FROM_EMAIL || "Prosper Events <tickets@prosperevents.ca>",
      to: email,
      subject: `Your Cocktail Classes ticket · ${date.label}`,
      html: `<div style="margin:0;background:#f7f4f1;padding:28px 12px;font-family:Arial,sans-serif;color:#2e2930"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:auto;background:#fff;border-radius:22px;overflow:hidden"><tr><td><img src="${siteUrl}/assets/events/cocktail-classes/hero.png" alt="Cocktail Classes at Prosper Events" width="620" style="display:block;width:100%;height:auto"></td></tr><tr><td style="padding:32px"><p style="margin:0;color:#74677d;font-size:11px;letter-spacing:2px;text-transform:uppercase">Prosper Events · Ticket confirmation</p><h1 style="margin:14px 0 12px;font-family:Georgia,serif;font-size:38px;font-weight:400">You’re on the list.</h1><p style="line-height:1.6">Thank you for reserving ${count} ticket${count === 1 ? "" : "s"} for <strong>Cocktail Classes</strong>.</p><div style="margin:24px 0;padding:20px;background:#f7f1ec;border-radius:14px;line-height:1.65"><strong>Cocktail Classes · ${date.label}</strong><br>7:30–9:30 PM<br>${COCKTAIL_CLASSES.venue}<br>${COCKTAIL_CLASSES.address}<br><span style="color:#625d67">Ticket reference: ${ticketCode}</span></div>${selectionRows ? `<p style="margin:26px 0 4px;color:#74677d;font-size:11px;letter-spacing:2px;text-transform:uppercase">Your drink selections</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${selectionRows}</table>` : ""}<p style="margin:25px 0 12px;line-height:1.6">Cocktail choices are 19+. Your ticket includes the three selections shown above.</p><p style="margin:20px 0"><a href="${calendar.google}" style="display:inline-block;margin:4px 6px 4px 0;padding:11px 15px;border-radius:999px;background:#2e2930;color:#fff;text-decoration:none">Google Calendar</a><a href="${calendar.outlook}" style="display:inline-block;margin:4px 6px 4px 0;padding:11px 15px;border-radius:999px;border:1px solid #2e2930;color:#2e2930;text-decoration:none">Outlook</a><a href="${calendar.apple}" style="display:inline-block;margin:4px 6px 4px 0;padding:11px 15px;border-radius:999px;border:1px solid #2e2930;color:#2e2930;text-decoration:none">Apple Calendar</a></p><p><a href="${siteUrl}/tickets/cancel?session_id=${session.id}" style="color:#625d67">Cancel ticket</a></p><p style="margin-top:24px;color:#625d67;font-size:12px;line-height:1.6">Ticket sales are final. Cancellation does not issue a refund.</p></td></tr></table></div>`,
    });
    const inventory = await drinkInventory();
    const inventoryRows = Object.entries(inventory.totals).filter(([, total]) => total > 0).map(([drink, total]) => `<tr><td style="padding:8px 0;border-bottom:1px solid #ece7e3">${escapeHtml(drink)}</td><td style="padding:8px 0;border-bottom:1px solid #ece7e3;text-align:right"><strong>${total}</strong></td></tr>`).join("");
    const perNightRows = Object.entries(inventory.totals).filter(([, total]) => total > 0).map(([drink]) => `<tr><td style="padding:8px 0;border-bottom:1px solid #ece7e3">${escapeHtml(drink)}</td><td style="padding:8px 0;border-bottom:1px solid #ece7e3;text-align:center">${inventory.byDate["2026-09-18"][drink as keyof typeof inventory.totals]}</td><td style="padding:8px 0;border-bottom:1px solid #ece7e3;text-align:center">${inventory.byDate["2026-09-19"][drink as keyof typeof inventory.totals]}</td></tr>`).join("");
    await resend.emails.send({
      from: process.env.TICKET_FROM_EMAIL || "Prosper Events <tickets@prosperevents.ca>",
      to: "prosperevents032@gmail.com",
      subject: `New Cocktail Classes sale · ${count} ticket${count === 1 ? "" : "s"}`,
      html: `<div style="font-family:Arial,sans-serif;color:#2e2930;max-width:650px"><h1 style="font-family:Georgia,serif">New ticket sale</h1><p><strong>${escapeHtml(session.customer_details?.name || "Guest")}</strong> (${escapeHtml(email)}) bought ${count} ticket${count === 1 ? "" : "s"} for <strong>${date.label}</strong>.</p><p>Reference: ${ticketCode}</p><h2 style="font-family:Georgia,serif">This order’s selections</h2><table width="100%" cellspacing="0" cellpadding="0">${selectionRows || "<tr><td>No selection details available.</td></tr>"}</table><h2 style="font-family:Georgia,serif;margin-top:32px">Running drink prep list</h2><table width="100%" cellspacing="0" cellpadding="0"><tr><th align="left" style="padding-bottom:8px">Drink</th><th align="right" style="padding-bottom:8px">Total needed</th></tr>${inventoryRows || "<tr><td colspan=\"2\">No selections yet.</td></tr>"}</table><h2 style="font-family:Georgia,serif;margin-top:32px">By night</h2><table width="100%" cellspacing="0" cellpadding="0"><tr><th align="left" style="padding-bottom:8px">Drink</th><th style="padding-bottom:8px">Fri 18</th><th style="padding-bottom:8px">Sat 19</th></tr>${perNightRows || "<tr><td colspan=\"3\">No selections yet.</td></tr>"}</table><p style="margin-top:26px;color:#625d67;font-size:12px">This report includes paid, active tickets only. Cancelled tickets are excluded.</p></div>`,
    });
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error", error);
    return new NextResponse("Webhook error", { status: 400 });
  }
}
