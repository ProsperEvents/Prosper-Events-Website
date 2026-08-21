import { calendarLinks } from "@/lib/calendar-links";
import type { CocktailClassDate } from "@/lib/cocktail-classes";

export function CalendarActions({ eventDate, sessionId, siteUrl }: { eventDate: CocktailClassDate; sessionId: string; siteUrl: string }) {
  const links = calendarLinks(eventDate, sessionId, siteUrl);
  return <div className="mt-8"><p className="text-[11px] uppercase tracking-[0.2em] text-navy/55">Add to calendar</p><div className="mt-3 flex flex-wrap gap-3"><a className="rounded-full bg-navy px-5 py-3 text-sm text-white" href={links.google} target="_blank" rel="noreferrer">Google Calendar</a><a className="rounded-full border border-navy/20 px-5 py-3 text-sm text-navy" href={links.outlook} target="_blank" rel="noreferrer">Outlook</a><a className="rounded-full border border-navy/20 px-5 py-3 text-sm text-navy" href={links.apple}>Apple Calendar</a></div></div>;
}
