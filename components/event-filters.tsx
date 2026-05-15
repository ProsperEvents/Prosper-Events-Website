"use client";

import { useMemo, useState } from "react";
import type { EventItem, EventStatus } from "@/data/events";
import { EventCard } from "@/components/event-card";
import { Stagger, StaggerItem } from "@/components/reveal";

type FilterKey = EventStatus | "all";

const filters: { key: FilterKey; label: string }[] = [
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
  { key: "all", label: "All" },
];

export function EventFilters({ events }: { events: EventItem[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("upcoming");

  const filteredEvents = useMemo(() => {
    const orderedEvents = [...events].sort(
      (left, right) =>
        new Date(right.startDate).getTime() - new Date(left.startDate).getTime(),
    );

    if (activeFilter === "all") {
      return orderedEvents;
    }
    return orderedEvents.filter((event) => event.status === activeFilter);
  }, [activeFilter, events]);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => {
          const active = activeFilter === filter.key;
          return (
            <button
              key={filter.key}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveFilter(filter.key)}
              className={`rounded-full border px-5 py-3 text-[11px] uppercase tracking-[0.24em] transition ${
                active
                  ? "border-navy bg-navy text-cream shadow-card"
                  : "border-navy/12 bg-white/75 text-navy hover:bg-white"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {filteredEvents.length === 0 ? (
        <div className="rounded-[2rem] border border-navy/10 bg-white/65 px-6 py-16 text-center shadow-paper">
          <p className="font-display text-4xl text-ink">No events to see here!</p>
        </div>
      ) : (
        <Stagger key={activeFilter} className="grid gap-6 lg:grid-cols-2">
          {filteredEvents.map((event) => (
            <StaggerItem key={`${activeFilter}-${event.slug}`}>
              <EventCard event={event} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}
