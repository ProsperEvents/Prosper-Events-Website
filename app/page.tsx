import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { EventCard } from "@/components/event-card";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { galleryImages } from "@/data/gallery";
import { events, getEventStatus } from "@/data/events";
import { primaryEventCta } from "@/lib/site";

const galleryPreview = galleryImages
  .filter((image) => image.id.startsWith("march-1-"))
  .slice(0, 6);

export const dynamic = "force-dynamic";

export default function HomePage() {
  const upcomingEvents = events.filter((event) => getEventStatus(event) === "upcoming").slice(0, 3);

  return (
    <div className="pb-24 pt-24 sm:pt-28">
      <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <div className="floral-watercolor floral-watercolor-hero" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="relative z-10">
            <p className="eyebrow">Ottawa & Gatineau · Events, experiences, hospitality</p>
            <h1 className="mt-9 max-w-3xl font-display text-6xl leading-[0.94] text-ink sm:text-7xl lg:text-[6.25rem]">
              Evenings made to be remembered.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-navy/72 sm:text-lg">
              Prosper Events brings together local venues, attentive service,
              food, music, and the details that let a room come alive.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={primaryEventCta.href}>
                Sign Up for October 23
              </ButtonLink>
              <ButtonLink href="/events" variant="secondary">
                Explore Experiences
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal className="lg:pl-10" delay={0.14}>
            <figure className="relative mx-auto max-w-[34rem] sm:pl-12">
              <div className="luxury-card p-3">
                <div className="floral-corner floral-corner-top-right" />
                <Image
                  src="/assets/gallery/hero-cocktails.jpg"
                  alt="Cocktails prepared for a Prosper Events evening"
                  width={1200}
                  height={1600}
                  className="h-[34rem] w-full rounded-[1.3rem] object-cover sm:h-[40rem]"
                  priority
                />
              </div>
              <div className="luxury-card absolute -left-3 bottom-16 hidden w-44 rotate-[-2deg] p-2 sm:block">
                <Image
                  src="/assets/gallery/table-toast.jpg"
                  alt="Prosper Events cocktail service"
                  width={480}
                  height={640}
                  className="h-56 w-full rounded-[1.05rem] object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-start justify-between gap-6 border-t border-navy/20 pt-4 text-[10px] uppercase tracking-[0.22em] text-navy/58">
                <span>Prosper Events</span>
                <span className="text-right">Ottawa · Hospitality, atmosphere, connection</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <Link
            href={primaryEventCta.href}
            aria-label="Sign up for The Perfect Cocktail Class on October 23"
            className="group flex flex-col gap-5 rounded-[1.6rem] border border-navy bg-navy px-6 py-7 text-white shadow-paper transition duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-card focus-visible:outline-none sm:flex-row sm:items-center sm:justify-between sm:px-9"
          >
            <div><p className="text-[11px] uppercase tracking-[0.24em] text-white/65">October 23 · Equator Coffee Westboro</p><p className="mt-2 font-display text-3xl">The Perfect Cocktail Class.</p><p className="mt-1 text-sm text-white/75">7:30 PM–9:30 PM · 14 spots available.</p></div>
            <span className="inline-flex items-center justify-center self-start rounded-full border border-cream px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-cream transition duration-300 group-hover:bg-cream group-hover:text-navy sm:self-auto">Sign Up</span>
          </Link>
        </Reveal>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Explore Prosper</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-6xl">
              Plan an occasion. Discover the next one.
            </h2>
            <p className="mt-6 text-base leading-8 text-navy/72">
              From event planning in Ottawa to hospitality menu consulting and
              memorable local nights out, Prosper brings atmosphere and practical
              detail together.
            </p>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              {
                number: "01",
                title: "Event Planning in Ottawa",
                description:
                  "Weddings, private parties, corporate gatherings, and year-end events shaped around your guests and goals.",
                href: "/event-planning-ottawa",
                image: "/assets/event-planning-ottawa-og.jpg",
                imageAlt: "Guests gathered around a table at a Prosper Events evening",
              },
              {
                number: "02",
                title: "Menu Consultations",
                description:
                  "Food and beverage menu guidance for restaurants, hotels, bars, and private members’ clubs.",
                href: "/menu-consultations",
                image: "/assets/menu-consultations-og.jpg",
                imageAlt: "A flaming signature cocktail prepared for service",
              },
              {
                number: "03",
                title: "Things to Do in Ottawa",
                description:
                  "Cocktail classes, date nights, and dynamic social experiences designed to make going out feel special.",
                href: "/things-to-do-ottawa",
                image: "/assets/things-to-do-ottawa-og.jpg",
                imageAlt: "A line of cocktails ready for a Prosper Events experience",
              },
            ].map((service) => (
              <StaggerItem key={service.href} className="h-full">
                <Link
                  href={service.href}
                  className="luxury-card group flex h-full min-h-[23rem] flex-col p-3 transition duration-500 hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="relative h-44 overflow-hidden rounded-[1.25rem] sm:h-48">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-ink/18 via-transparent to-ink/25" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-ivory/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-navy shadow-paper backdrop-blur-sm">
                      {service.number}
                    </span>
                    <ArrowUpRight
                      className="absolute right-4 top-4 h-9 w-9 rounded-full border border-white/30 bg-ivory/90 p-2 text-navy shadow-paper backdrop-blur-sm transition duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="relative flex flex-1 flex-col px-4 pb-4 pt-6 sm:px-5 sm:pb-5">
                    <h3 className="font-display text-3xl leading-tight text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-navy/68">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal className="relative">
            <div className="section-frame">
              <div className="section-floral" />
              <p className="eyebrow">Brand story</p>
              <h2 className="mt-6 font-display text-4xl text-ink sm:text-5xl">
                Prosper Events, with atmosphere at the center.
              </h2>
              <p className="mt-6 text-base leading-8 text-navy/74">
                Prosper Events is an Ottawa event-planning and experience company
                built around thoughtful hospitality. We plan weddings, private
                parties, corporate gatherings, and year-end events; create local
                cocktail classes and social nights; and advise restaurants,
                hotels, bars, and private members’ clubs on food and beverage
                menus. Across every project, the goal is the same: bring people
                together through a clear concept, a well-composed room, and
                details that make time together feel easy.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="luxury-card relative overflow-hidden p-3">
              <div className="section-floral opacity-75" />
              <div className="floral-corner floral-corner-bottom-left" />
              <Image
                src={galleryPreview[2]?.src ?? "/assets/gallery/march-1/3-_DSC9574.jpg"}
                alt="Prosper Events March 1 atmosphere"
                width={1400}
                height={1600}
                className="h-[520px] w-full rounded-[1.6rem] object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Upcoming events</p>
              <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
                Invitations to the next evening.
              </h2>
            </div>
            <ButtonLink href="/events" variant="secondary">
              View All Events
            </ButtonLink>
          </Reveal>
          {upcomingEvents.length === 0 ? (
            <div className="mt-12 rounded-[2rem] border border-navy/10 bg-white/65 px-6 py-16 text-center shadow-paper">
              <p className="font-display text-4xl text-ink">No events to see here!</p>
            </div>
          ) : (
            <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <StaggerItem key={event.slug}>
                  <EventCard event={event} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="section-frame">
            <div className="section-floral" />
            <p className="eyebrow">Experience</p>
            <h2 className="mt-5 font-display text-4xl text-ink sm:text-5xl">
              What guests notice.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-8 text-navy/72">
              <p>The welcome feels warm. The room has energy. Conversation comes easily.</p>
              <p>
                Service, lighting, music, and timing work quietly in the
                background so guests can stay present.
              </p>
              <p>
                Nothing needs to announce itself. The whole evening simply feels
                considered.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="luxury-card overflow-hidden p-3">
                <div className="floral-corner floral-corner-top-right" />
                <Image
                  src={galleryPreview[3]?.src ?? "/assets/gallery/march-1/4-_DSC9576.jpg"}
                  alt="Guests in conversation at Prosper Events"
                  width={1400}
                  height={900}
                  className="h-full min-h-[340px] w-full rounded-[1.5rem] object-cover"
                />
              </div>
                <div className="grid gap-5">
                  <div className="rounded-[1.4rem] border border-navy/10 bg-ivory/70 p-6 shadow-paper">
                    <p className="eyebrow">01</p>
                    <p className="mt-4 font-display text-2xl text-ink">
                      Service with warmth
                  </p>
                  <p className="mt-3 text-sm leading-7 text-navy/68">
                    Attentive without intrusion, polished without stiffness.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-navy/10 bg-ivory/70 p-6 shadow-paper">
                  <p className="eyebrow">02</p>
                  <p className="mt-4 font-display text-2xl text-ink">
                    Rooms with mood
                  </p>
                  <p className="mt-3 text-sm leading-7 text-navy/68">
                    Lighting, texture, and timing that make the room feel warm
                    and settled.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-navy/10 bg-ivory/70 p-6 shadow-paper">
                  <p className="eyebrow">03</p>
                  <p className="mt-4 font-display text-2xl text-ink">
                    Social design
                  </p>
                  <p className="mt-3 text-sm leading-7 text-navy/68">
                    A natural pace that gives people time to arrive, talk, and
                    enjoy the room.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Gallery preview</p>
              <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
                Moments from the room.
              </h2>
            </div>
            <ButtonLink href="/gallery" variant="secondary">
              Explore the Gallery
            </ButtonLink>
          </Reveal>
          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {galleryPreview.map((image, index) => (
              <Reveal key={image.id} delay={index * 0.05} className="mb-5 break-inside-avoid">
                <img
                  src={image.thumbnailSrc}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full rounded-[1.4rem] object-cover transition duration-700 hover:scale-[1.02]"
                />
              </Reveal>
          ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-6 pt-8 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2.4rem] border border-navy/10 bg-white/78 px-6 py-12 shadow-paper sm:px-10 lg:px-14 lg:py-16">
            <div className="section-floral" />
            <div className="floral-spray floral-spray-left opacity-80" />
            <div className="floral-corner floral-corner-top-right" />
            <div className="relative z-10 max-w-3xl">
              <p className="eyebrow">Inquiries & collaborations</p>
              <h2 className="mt-5 font-display text-4xl text-ink sm:text-5xl">
                For private bookings, collaborations, and event inquiries.
              </h2>
              <p className="mt-5 text-base leading-8 text-navy/72">
                Whether you are planning a private social evening, exploring a
                partnership, or looking for the next Prosper Events invitation,
                we welcome thoughtful inquiries.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href={primaryEventCta.href}>Sign Up for October 23</ButtonLink>
                <ButtonLink href="/inquiries" variant="secondary">
                  Contact Prosper Events
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
