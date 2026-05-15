import type { Metadata } from "next";
import { EventFilters } from "@/components/event-filters";
import { Reveal } from "@/components/reveal";
import { events } from "@/data/events";

export const metadata: Metadata = {
  title: "Events | Prosper Events",
  description:
    "Browse upcoming and past Prosper Events gatherings across Ottawa and Gatineau, from intimate cocktail evenings to curated private dining experiences.",
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
                A calendar of intimate gatherings.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-navy/72">
                Explore upcoming evenings and past Prosper Events experiences
                across Ottawa and Gatineau. Each event is designed as an
                invitation rather than a listing, with atmosphere leading the way.
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
