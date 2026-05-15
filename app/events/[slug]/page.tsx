import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SchemaScript } from "@/components/schema-script";
import {
  events,
  getEventBySlug,
  getEventDateLabel,
  getEventSchema,
} from "@/data/events";
import { absoluteUrl } from "@/lib/utils";

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
                  <ButtonLink href="/inquiries">Contact for Inquiries</ButtonLink>
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
                  className="h-[420px] w-full rounded-[1.7rem] object-cover sm:h-[520px]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="section-frame">
            <p className="eyebrow">Invitation details</p>
            <div className="mt-6 space-y-5 text-sm leading-7 text-navy/72">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-navy/48">
                  Location
                </p>
                <p className="mt-2">{event.location}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-navy/48">
                  Address
                </p>
                <p className="mt-2">{event.address ?? "Shared upon inquiry."}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-navy/48">
                  Notes
                </p>
                <p className="mt-2">{event.description}</p>
              </div>
            </div>
          </Reveal>

          <Stagger className="grid gap-5 sm:grid-cols-2">
            {event.menu ? (
              <StaggerItem className="luxury-card p-6">
                <p className="eyebrow">Menu</p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-navy/72">
                  {event.menu.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </StaggerItem>
            ) : null}
            {event.dressCode ? (
              <StaggerItem className="luxury-card p-6">
                <p className="eyebrow">Dress code</p>
                <p className="mt-5 text-sm leading-7 text-navy/72">
                  {event.dressCode}
                </p>
              </StaggerItem>
            ) : null}
            {event.atmosphere ? (
              <StaggerItem className="luxury-card p-6 sm:col-span-2">
                <p className="eyebrow">Music & atmosphere</p>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-navy/72">
                  {event.atmosphere}
                </p>
              </StaggerItem>
            ) : null}
          </Stagger>
        </div>
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
