import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { SchemaScript } from "@/components/schema-script";
import {
  events,
  getEventBySlug,
  getEventDateLabel,
  getEventSchema,
  getEventStatus,
} from "@/data/events";
import { absoluteUrl } from "@/lib/utils";
import { TicketPurchase } from "@/components/ticket-purchase";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {};
  }

  return {
    title: `${event.title} | Prosper Events`,
    description: event.description,
    alternates: {
      canonical: `/events/${event.slug}`,
    },
    openGraph: {
      title: `${event.title} | Prosper Events`,
      description: event.description,
      url: `/events/${event.slug}`,
      images: [
        {
          url: absoluteUrl(event.image),
          width: event.imageWidth,
          height: event.imageHeight,
          alt: event.title,
        },
      ],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }
  const status = getEventStatus(event);
  const mapQuery = encodeURIComponent(`${event.location}, ${event.address ?? "Ottawa, Ontario"}`);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${mapQuery}`;

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <SchemaScript id={`${event.slug}-schema`} data={getEventSchema(event)} />

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
              <div>
                <p className="eyebrow">{status === "upcoming" ? "Upcoming event" : "Past event"}</p>
                <h1 className="mt-5 font-display text-5xl leading-tight text-ink sm:text-6xl lg:text-[4.5rem]">
                  {event.title}
                </h1>
                <div className="mt-8 space-y-3 text-sm uppercase tracking-[0.2em] text-navy/58">
                  <p>{getEventDateLabel(event)}</p>
                  <p>{event.time}</p>
                  <p>{event.location}</p>
                </div>
                <p className="mt-8 max-w-2xl text-base leading-8 text-navy/74">
                  {event.longDescription}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  {status === "upcoming" && event.ticketing ? (
                    <ButtonLink href="#tickets">Buy tickets</ButtonLink>
                  ) : status === "upcoming" && event.registrationStatus === "coming-soon" ? (
                    <ButtonLink href="#registration">Sign Up</ButtonLink>
                  ) : (
                    <ButtonLink href="/inquiries">Contact for Inquiries</ButtonLink>
                  )}
                  <ButtonLink href="/events" variant="secondary">
                    Back to Events
                  </ButtonLink>
                </div>
              </div>

              <div className="luxury-card relative overflow-hidden p-3">
                <div className="section-floral opacity-70" />
                <Image
                  src={event.image}
                  alt={event.title}
                  width={event.imageWidth}
                  height={event.imageHeight}
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  priority
                  className="h-auto w-full rounded-[1.7rem] bg-[#efeeeb] object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {status === "upcoming" && event.slug === "cocktail-classes" ? <TicketPurchase /> : null}

      {status === "upcoming" && event.registrationStatus === "coming-soon" ? (
        <section id="registration" className="section-space px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-navy/10 bg-white/80 px-6 py-12 shadow-paper sm:px-10 lg:px-14">
              <div className="section-floral opacity-70" />
              <div className="relative z-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
                <div>
                  <p className="eyebrow">Registration</p>
                  <p className="mt-4 font-display text-6xl text-ink">{event.capacity}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-navy/55">spots available</p>
                </div>
                <div>
                  <h2 className="font-display text-4xl text-ink sm:text-5xl">Full class details are coming soon.</h2>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-navy/72">
                    Drink options, menus, pricing, and registration will be added here shortly. This is the official event page, so you can save or share this link now.
                  </p>
                  <div className="mt-7">
                    <ButtonLink href="/inquiries" variant="secondary">Ask about this class</ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      ) : null}

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-y border-navy/12 py-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-14">
            <div>
              <p className="eyebrow">Venue</p>
              <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">{event.location}</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-navy/72">{event.description}</p>
              <div className="mt-8 border-t border-navy/12 pt-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-navy/50">Address</p>
                <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-lg text-navy underline decoration-navy/30 underline-offset-4 transition hover:decoration-navy">
                  {event.address ?? "Shared upon inquiry."}
                </a>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-navy/70"><a href={googleMapsUrl} target="_blank" rel="noreferrer" className="border-b border-navy/30 pb-1 transition hover:border-navy">Open in Google Maps ↗</a><a href={appleMapsUrl} target="_blank" rel="noreferrer" className="border-b border-navy/30 pb-1 transition hover:border-navy">Open in Apple Maps ↗</a></div>
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.5rem] border border-navy/10 bg-white shadow-paper">
              <iframe title={`Map of ${event.location}`} src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} className="h-[320px] w-full border-0 sm:h-[390px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </Reveal>
      </section>

      {event.gallery?.length ? (
        <section className="px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="eyebrow">Photo notes</p>
              <h2 className="mt-4 font-display text-4xl text-ink">
                Event materials.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {event.gallery.map((image) => (
                <Reveal key={image}>
                  <div className="luxury-card overflow-hidden p-2">
                    <Image
                      src={image}
                      alt={`${event.title} gallery image`}
                      width={1200}
                      height={900}
                      className="h-[290px] w-full rounded-[1.4rem] object-cover transition duration-700 hover:scale-[1.03]"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
