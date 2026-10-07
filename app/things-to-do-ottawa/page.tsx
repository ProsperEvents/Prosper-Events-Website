import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EventCard } from "@/components/event-card";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SchemaScript } from "@/components/schema-script";
import { events, getEventStatus } from "@/data/events";
import { primaryEventCta, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Things to Do in Ottawa: Date Nights, Classes & Social Events",
  description:
    "Find fun things to do in Ottawa with Prosper Events: cocktail classes, date-night ideas, hands-on activities, and dynamic social experiences with food, drinks, and music.",
  alternates: {
    canonical: "/things-to-do-ottawa",
  },
  openGraph: {
    title: "Things to Do in Ottawa | Prosper Events",
    description:
      "Cocktail classes, memorable date nights, and dynamic social experiences in Ottawa.",
    url: `${siteUrl}/things-to-do-ottawa`,
    siteName: "Prosper Events",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/assets/things-to-do-ottawa-og.jpg",
        width: 1200,
        height: 630,
        alt: "A line of cocktails at a Prosper Events experience in Ottawa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Things to Do in Ottawa | Prosper Events",
    description:
      "Cocktail classes, memorable date nights, and dynamic social experiences in Ottawa.",
    images: ["/assets/things-to-do-ottawa-og.jpg"],
  },
};

const activityTypes = [
  {
    number: "01",
    title: "Cocktail & mocktail classes",
    description:
      "Make something, learn a technique, and enjoy the result. A hands-on class gives the evening a natural rhythm without feeling over-programmed.",
  },
  {
    number: "02",
    title: "Date-night experiences",
    description:
      "Choose an evening with a built-in activity, good drinks, and atmosphere—something more memorable than simply choosing another table for two.",
  },
  {
    number: "03",
    title: "Nights out with friends",
    description:
      "Bring a friend or a small group to an experience designed for conversation, shared discovery, music, and an easy social pace.",
  },
  {
    number: "04",
    title: "Dynamic local events",
    description:
      "Pop-ups and specialty evenings bring Ottawa venues, hospitality, food, drinks, and creative partners together for one night.",
  },
] as const;

export default function ThingsToDoOttawaPage() {
  const upcomingEvents = events.filter(
    (event) => getEventStatus(event) === "upcoming",
  );

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Things to Do in Ottawa",
    url: `${siteUrl}/things-to-do-ottawa`,
    description:
      "Cocktail classes, date-night ideas, hands-on activities, and social events from Prosper Events in Ottawa.",
    about: [
      "Things to do in Ottawa",
      "Ottawa date nights",
      "Ottawa cocktail classes",
      "Ottawa social events",
    ],
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: upcomingEvents.length,
      itemListElement: upcomingEvents.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Event",
          "@id": `${siteUrl}/events/${event.slug}`,
          name: event.title,
          url: `${siteUrl}/events/${event.slug}`,
          startDate: event.startDate,
          endDate: event.endDate,
          location: {
            "@type": "Place",
            name: event.location,
            address: {
              "@type": "PostalAddress",
              name: event.address ?? "Ottawa, Ontario, Canada",
              addressLocality: "Ottawa",
              addressRegion: "ON",
              addressCountry: "CA",
            },
          },
        },
      })),
    },
  };

  return (
    <div className="pb-24 pt-24 sm:pt-28">
      <SchemaScript id="things-to-do-ottawa-schema" data={collectionSchema} />

      <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <div className="floral-watercolor floral-watercolor-hero" />
        <div className="floral-spray floral-spray-left" />
        <div className="floral-spray floral-spray-right" />
        <div className="mx-auto max-w-7xl">
          <Reveal className="relative z-10 max-w-5xl">
            <Breadcrumbs
              id="things-to-do-breadcrumbs"
              items={[
                { label: "Home", href: "/" },
                {
                  label: "Things to Do in Ottawa",
                  href: "/things-to-do-ottawa",
                  current: true,
                },
              ]}
              className="mb-7"
            />
            <p className="eyebrow">Date nights · Classes · Social events</p>
            <h1 className="mt-7 font-display text-5xl leading-[0.98] text-ink sm:text-7xl lg:text-[6.25rem]">
              Things to do in Ottawa, beyond the usual night out.
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-navy/72 sm:text-lg">
              Discover cocktail classes, date-night ideas, and fun, dynamic things
              to do in Ottawa. Prosper Events creates social experiences where the
              activity, hospitality, music, food, and people all contribute to the
              night.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href={primaryEventCta.href}>Book the Next Experience</ButtonLink>
              <ButtonLink href="#upcoming" variant="secondary">
                See What’s Coming Up
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal className="relative mt-14" delay={0.14}>
            <div className="luxury-card p-3">
              <div className="floral-corner floral-corner-top-right" />
              <Image
                src="/assets/gallery/cocktail-line.jpg"
                alt="A line of cocktails prepared for a Prosper Events evening in Ottawa"
                width={1600}
                height={900}
                priority
                className="h-[24rem] w-full rounded-[1.55rem] object-cover sm:h-[32rem]"
              />
            </div>
            <div className="mt-4 border-t border-navy/20 pt-4 sm:flex sm:items-baseline sm:justify-between sm:gap-8">
              <p className="text-[10px] uppercase tracking-[0.25em] text-navy/50">
                More than a reservation
              </p>
              <p className="mt-2 font-display text-xl text-ink sm:mt-0 sm:text-right">
                An activity, a room, and a reason to connect.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Choose your kind of night</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-6xl">
              Fun plans with more personality.
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
            {activityTypes.map((activity) => (
              <StaggerItem key={activity.number}>
                <article className="luxury-card h-full p-7 sm:p-8">
                  <div className="section-floral opacity-60" />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-navy/48">
                        {activity.number}
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-navy/38" aria-hidden="true" />
                    </div>
                    <h3 className="mt-9 font-display text-3xl text-ink sm:text-4xl">
                      {activity.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-navy/68 sm:text-base sm:leading-8">
                      {activity.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="upcoming" className="section-space scroll-mt-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow">Upcoming in Ottawa</p>
              <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-6xl">
                Your next plan starts here.
              </h2>
              <p className="mt-5 text-base leading-8 text-navy/72">
                Upcoming events are intentionally limited so the room stays
                personal, social, and easy to enjoy.
              </p>
            </div>
            <ButtonLink href="/events" variant="secondary">
              View the Full Calendar
            </ButtonLink>
          </Reveal>

          {upcomingEvents.length > 0 ? (
            <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <StaggerItem key={event.slug}>
                  <EventCard event={event} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <Reveal className="section-frame mt-12 text-center">
              <p className="font-display text-4xl text-ink">
                The next experience is being composed.
              </p>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-navy/68">
                Check the event calendar or join the mailing list to hear when a
                new Ottawa date is announced.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <ButtonLink href="/events">Browse Events</ButtonLink>
                <ButtonLink href="/subscribe" variant="secondary">
                  Join the List
                </ButtonLink>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <Reveal className="section-frame mx-auto max-w-7xl">
          <div className="section-floral" />
          <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="eyebrow">Make it your own</p>
              <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
                Looking for a private activity or group night?
              </h2>
            </div>
            <div>
              <p className="text-base leading-8 text-navy/72">
                Prosper can shape a private cocktail class, celebration, team
                experience, or social evening around your group. For weddings,
                parties, and business events, explore our Ottawa event-planning
                services.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <ButtonLink href="/event-planning-ottawa">
                  Explore Event Planning
                </ButtonLink>
                <Link
                  href="/inquiries"
                  className="inline-flex items-center gap-2 px-2 py-3 text-xs font-medium uppercase tracking-[0.22em] text-navy hover:text-ink"
                >
                  Ask About a Private Experience
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
