"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { EventItem } from "@/data/events";
import { getEventDateLabel, getEventStatus } from "@/data/events";

type EventCardProps = {
  event: EventItem;
};

export function EventCard({ event }: EventCardProps) {
  const status = getEventStatus(event);
  return (
    <motion.article
      className="luxury-card group overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-card"
    >
      <Link href={`/events/${event.slug}`} className="block">
        <div className="relative overflow-hidden">
          <div className="absolute left-5 top-5 z-10 rounded-full border border-white/25 bg-ink/50 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white backdrop-blur-sm">
            {status}
          </div>
          <Image
            src={event.image}
            alt={event.title}
            width={event.imageWidth}
            height={event.imageHeight}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-[1.015]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        </div>
        <div className="space-y-4 p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-navy/60">
            <span>{getEventDateLabel(event)}</span>
            <span className="h-1 w-1 rounded-full bg-navy/30" />
            <span>{event.time}</span>
          </div>
          <div>
            <h3 className="font-display text-3xl text-ink">{event.title}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-navy/55">
              {event.location}
            </p>
          </div>
          <p className="text-sm leading-7 text-navy/72">{event.description}</p>
          <div className="flex items-center justify-between border-t border-navy/10 pt-4 text-[11px] uppercase tracking-[0.24em] text-navy">
            <span>
              {status === "upcoming" ? "Event details" : "View event"}
            </span>
            <span className="transition duration-500 group-hover:translate-x-1">
              {status === "upcoming" ? "Explore event" : "Contact for inquiries"}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
