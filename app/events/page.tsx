import type { Metadata } from "next";
import { EventFilters } from "@/components/event-filters";
import { Reveal } from "@/components/reveal";
import { events } from "@/data/events";

export const metadata: Metadata = {
  title: "Upcoming Ottawa Events & Experiences | Prosper Events",
  description:
    "Browse upcoming Ottawa events and past Prosper Events experiences, including cocktail classes, social nights, date-night ideas, and intimate local gatherings.",
  alternates: {
    canonical: "/events",
  },
};

export default function EventsPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-36">
      <section className="px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem]">
            <div className="section-floral" />
            <div className="floral-corner floral-corner-top-right" />
            <p className="eyebrow">Events</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <h1 className="font-display text-5xl leading-tight text-ink sm:text-6xl">
                Upcoming nights and past gatherings.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-navy/72">
                Cocktail classes, social evenings, and one-off gatherings across
                Ottawa and Gatineau. Find the next date, or revisit the rooms we
                have already shared.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EventFilters events={events} />
        </div>
      </section>
    </div>
  );
}
