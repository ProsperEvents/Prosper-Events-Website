import Link from "next/link";
import { CalendarActions } from "@/components/calendar-actions";
import { notFound } from "next/navigation";
import { COCKTAIL_CLASSES, isCocktailClassDate } from "@/lib/cocktail-classes";
import { getStripe } from "@/lib/stripe";
import { parseSelectionsFromMetadata } from "@/lib/ticket-selections";

export const dynamic = "force-dynamic";

export default async function TicketSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id: sessionId } = await searchParams;
  if (!sessionId?.startsWith("cs_")) notFound();
  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  const eventDate = session.metadata?.eventDate;
  if (session.metadata?.eventSlug !== COCKTAIL_CLASSES.slug || !eventDate || !isCocktailClassDate(eventDate) || session.payment_status !== "paid") notFound();
  const date = COCKTAIL_CLASSES.dates[eventDate];
  const selections = parseSelectionsFromMetadata(session.metadata);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.prosperevents.ca";
  return <div className="px-4 pb-24 pt-36 sm:px-6"><main className="mx-auto max-w-3xl rounded-[2rem] border border-navy/10 bg-white/80 p-8 shadow-paper sm:p-12"><p className="eyebrow">Reservation confirmed</p><h1 className="mt-5 font-display text-5xl text-ink">You’re on the list.</h1><p className="mt-5 text-base leading-8 text-navy/72">Your ticket confirmation has been sent to {session.customer_details?.email || session.customer_email}. Save this page until it arrives.</p><div className="mt-8 rounded-2xl bg-blush/30 p-6 text-sm leading-7 text-navy/75"><p className="font-medium text-ink">Cocktail Classes · {date.label}</p><p>7:30–9:30 PM · {COCKTAIL_CLASSES.venue}</p><p>{COCKTAIL_CLASSES.address}</p><p className="mt-3">{session.metadata.ticketCount} ticket{session.metadata.ticketCount === "1" ? "" : "s"} · Reference {session.id.slice(-8).toUpperCase()}</p></div>{selections.length ? <div className="mt-6 rounded-2xl border border-navy/10 p-6"><p className="eyebrow">Your drink selections</p>{selections.map((guest) => <div key={guest.name} className="mt-4 border-t border-navy/10 pt-4 text-sm leading-7 text-navy/72"><p className="font-medium text-ink">{guest.name}</p><p>{guest.drinks.join(" · ")}</p></div>)}</div> : null}<CalendarActions eventDate={eventDate} sessionId={session.id} siteUrl={siteUrl} /><div className="mt-6"><Link className="rounded-full border border-navy/20 px-6 py-3 text-sm text-navy" href={`/tickets/cancel?session_id=${session.id}`}>Cancel ticket</Link></div><p className="mt-7 text-xs leading-6 text-navy/60">Ticket sales are final. Cancellation does not issue a refund.</p></main></div>;
}
