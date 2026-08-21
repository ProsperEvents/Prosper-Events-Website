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
} from "@/data/events";
import { absoluteUrl } from "@/lib/utils";
import { TicketPurchase } from "@/components/ticket-purchase";
import { cocktailMenu } from "@/lib/cocktail-classes";

export async function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

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
          width: 1600,
          height: 1200,
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
                <p className="eyebrow">{event.status === "upcoming" ? "Upcoming event" : "Past event"}</p>
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
                  {event.ticketing ? <ButtonLink href="#tickets">Buy tickets</ButtonLink> : <ButtonLink href="/inquiries">Contact for Inquiries</ButtonLink>}
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
                  width={1600}
                  height={1200}
                  priority
                  className="h-auto w-full rounded-[1.7rem] bg-[#efeeeb] object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {event.slug === "cocktail-classes" ? <TicketPurchase /> : null}

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

      {event.slug === "cocktail-classes" ? (
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
            <Reveal className="luxury-card p-7">
              <p className="eyebrow">Cocktails · 19+</p>
              <h2 className="mt-4 font-display text-3xl text-ink">Cocktail menu</h2>
              <div className="mt-6 space-y-4">
                {cocktailMenu.cocktails.map(([name, ingredients]) => <div key={name}><p className="font-medium text-ink">{name}</p><p className="mt-1 text-sm leading-6 text-navy/68">{ingredients}</p></div>)}
              </div>
            </Reveal>
            <Reveal className="luxury-card p-7">
              <p className="eyebrow">Zero-proof</p>
              <h2 className="mt-4 font-display text-3xl text-ink">Mocktail menu</h2>
              <div className="mt-6 space-y-4">
                {cocktailMenu.mocktails.map(([name, ingredients]) => <div key={name}><p className="font-medium text-ink">{name}</p><p className="mt-1 text-sm leading-6 text-navy/68">{ingredients}</p></div>)}
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

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
