import { calendarLinks } from "@/lib/calendar-links";
import { COCKTAIL_CLASSES, type CocktailClassDate } from "@/lib/cocktail-classes";
import type { GuestSelection } from "@/lib/ticket-selections";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

export function customerTicketEmailHtml({
  eventDate,
  sessionId,
  count,
  ticketCode,
  selections,
  siteUrl,
  preview = false,
}: {
  eventDate: CocktailClassDate;
  sessionId: string;
  count: number;
  ticketCode: string;
  selections: GuestSelection[];
  siteUrl: string;
  preview?: boolean;
}) {
  const date = COCKTAIL_CLASSES.dates[eventDate];
  const calendar = calendarLinks(eventDate, sessionId, siteUrl);
  const selectionRows = selections.map((guest) => `<tr><td style="padding:14px 0;border-top:1px solid #e8e2de"><strong>${escapeHtml(guest.name)}</strong><br><span style="color:#625d67">${guest.drinks.map(escapeHtml).join(" · ")}</span></td></tr>`).join("");
  const ticketActions = preview ? `<p style="margin:20px 0;color:#625d67;font-size:12px">Calendar and cancellation links will be active on purchased tickets.</p>` : `<p style="margin:20px 0"><a href="${calendar.google}" style="display:inline-block;margin:4px 6px 4px 0;padding:11px 15px;border-radius:999px;background:#2e2930;color:#fff;text-decoration:none">Google Calendar</a><a href="${calendar.outlook}" style="display:inline-block;margin:4px 6px 4px 0;padding:11px 15px;border-radius:999px;border:1px solid #2e2930;color:#2e2930;text-decoration:none">Outlook</a><a href="${calendar.apple}" style="display:inline-block;margin:4px 6px 4px 0;padding:11px 15px;border-radius:999px;border:1px solid #2e2930;color:#2e2930;text-decoration:none">Apple Calendar</a></p><p><a href="${siteUrl}/tickets/cancel?session_id=${sessionId}" style="color:#625d67">Cancel ticket</a></p>`;
  return `<div style="margin:0;background:#f7f4f1;padding:28px 12px;font-family:Arial,sans-serif;color:#2e2930"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:auto;background:#fff;border-radius:22px;overflow:hidden"><tr><td><img src="${siteUrl}${COCKTAIL_CLASSES.heroImage}" alt="${COCKTAIL_CLASSES.title} at Prosper Events" width="620" style="display:block;width:100%;height:auto"></td></tr><tr><td style="padding:32px"><p style="margin:0;color:#74677d;font-size:11px;letter-spacing:2px;text-transform:uppercase">Prosper Events · Ticket confirmation${preview ? " preview" : ""}</p><h1 style="margin:14px 0 12px;font-family:Georgia,serif;font-size:38px;font-weight:400">You’re on the list.</h1><p style="line-height:1.6">Thank you for reserving ${count} ticket${count === 1 ? "" : "s"} for <strong>${COCKTAIL_CLASSES.title}</strong>.</p><div style="margin:24px 0;padding:20px;background:#f7f1ec;border-radius:14px;line-height:1.65"><strong>${COCKTAIL_CLASSES.title} · ${date.label}</strong><br>7:30–9:30 PM<br>${COCKTAIL_CLASSES.venue}<br>${COCKTAIL_CLASSES.address}<br><span style="color:#625d67">Ticket reference: ${ticketCode}</span></div>${selectionRows ? `<p style="margin:26px 0 4px;color:#74677d;font-size:11px;letter-spacing:2px;text-transform:uppercase">Your drink selections</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${selectionRows}</table>` : ""}${ticketActions}<p style="margin-top:24px;color:#625d67;font-size:12px;line-height:1.6">Ticket sales are final. Cancellation does not issue a refund.</p></td></tr></table></div>`;
}
