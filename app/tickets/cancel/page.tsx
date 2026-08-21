import { notFound } from "next/navigation";
import { TicketCancellation } from "@/components/ticket-cancellation";

export default async function CancelTicketPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id: sessionId } = await searchParams;
  if (!sessionId?.startsWith("cs_")) notFound();
  return <div className="px-4 pb-24 pt-36 sm:px-6"><main className="mx-auto max-w-2xl rounded-[2rem] border border-navy/10 bg-white/80 p-8 shadow-paper sm:p-12"><p className="eyebrow">Ticket cancellation</p><h1 className="mt-5 font-display text-5xl text-ink">Need to cancel?</h1><p className="mt-5 text-base leading-8 text-navy/72">Cancelling releases your Cocktail Class ticket. Ticket sales are final, and no refund will be issued.</p><TicketCancellation sessionId={sessionId} /></main></div>;
}
