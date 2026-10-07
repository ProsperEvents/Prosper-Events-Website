import type { Metadata } from "next";
import Image from "next/image";
import { Check, Mail, Phone, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SchemaScript } from "@/components/schema-script";
import { contactDetails, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ottawa Event Planning: Weddings, Parties & Corporate Events",
  description:
    "Event planning in Ottawa for weddings, private parties, corporate events, team celebrations, and end-of-year events—designed with atmosphere and hospitality in mind.",
  alternates: {
    canonical: "/event-planning-ottawa",
  },
  openGraph: {
    title: "Event Planning in Ottawa | Prosper Events",
    description:
      "Thoughtfully planned weddings, parties, corporate gatherings, and year-end events in Ottawa and Gatineau.",
    url: `${siteUrl}/event-planning-ottawa`,
    siteName: "Prosper Events",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/assets/event-planning-ottawa-og.jpg",
        width: 1200,
        height: 630,
        alt: "Guests enjoying a Prosper Events gathering in Ottawa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Planning in Ottawa | Prosper Events",
    description:
      "Weddings, private parties, corporate gatherings, and year-end events designed with intention.",
    images: ["/assets/event-planning-ottawa-og.jpg"],
  },
};

const eventTypes = [
  {
    number: "01",
    title: "Weddings",
    description:
      "A wedding experience shaped around your people, priorities, and sense of occasion—from atmosphere and hospitality to the rhythm of the day.",
  },
  {
    number: "02",
    title: "Private parties",
    description:
      "Birthdays, anniversaries, milestone celebrations, and gatherings that deserve more thought than a standard night out.",
  },
  {
    number: "03",
    title: "Corporate events",
    description:
      "Client receptions, launches, team events, and business gatherings designed to feel polished, social, and genuinely engaging.",
  },
  {
    number: "04",
    title: "Year-end events",
    description:
      "End-of-year celebrations and holiday events that bring colleagues together with strong food, drinks, music, and atmosphere.",
  },
] as const;

const planningSupport = [
  "Event concept and creative direction",
  "Venue, partner, and vendor coordination",
  "Food, cocktail, mocktail, and menu planning",
  "Guest flow, timing, music, and atmosphere",
] as const;

const process = [
  {
    number: "01",
    title: "Understand",
    description:
      "We begin with the occasion, guest list, priorities, budget, and the feeling you want the room to have.",
  },
  {
    number: "02",
    title: "Shape",
    description:
      "We build the event direction and align the venue, hospitality, partners, pacing, and practical details.",
  },
  {
    number: "03",
    title: "Bring it together",
    description:
      "We coordinate the moving pieces so the event feels considered for guests and manageable behind the scenes.",
  },
] as const;

const planningEmail = `mailto:${contactDetails.email}?subject=${encodeURIComponent(
  "Ottawa event planning inquiry",
)}&body=${encodeURIComponent(`Hi Prosper Events,

Event type:
Preferred date:
Estimated guest count:
Venue or neighbourhood, if known:
What we would like help with:

Thank you,`)}`;

const planningSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Event Planning in Ottawa",
  serviceType: "Event planning",
  url: `${siteUrl}/event-planning-ottawa`,
  description:
    "Event planning in Ottawa and Gatineau for weddings, private parties, corporate events, team celebrations, and end-of-year events.",
  areaServed: ["Ottawa, Ontario", "Gatineau, Quebec"],
  audience: [
    { "@type": "Audience", audienceType: "Couples and private hosts" },
    { "@type": "BusinessAudience", audienceType: "Businesses and organizations" },
  ],
  provider: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Prosper Events",
    url: siteUrl,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Ottawa event planning services",
    itemListElement: eventTypes.map((eventType) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: eventType.title,
        description: eventType.description,
      },
    })),
  },
};

export default function EventPlanningOttawaPage() {
  return (
    <div className="pb-24 pt-24 sm:pt-28">
      <SchemaScript id="event-planning-schema" data={planningSchema} />

      <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <div className="floral-watercolor floral-watercolor-hero" />
        <div className="floral-spray floral-spray-left" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="relative z-10">
            <Breadcrumbs
              id="event-planning-breadcrumbs"
              items={[
                { label: "Home", href: "/" },
                {
                  label: "Event Planning in Ottawa",
                  href: "/event-planning-ottawa",
                  current: true,
                },
              ]}
              className="mb-7"
            />
            <p className="eyebrow">Weddings · Parties · Business events</p>
            <h1 className="mt-7 max-w-3xl font-display text-5xl leading-[0.98] text-ink sm:text-7xl lg:text-[5.65rem]">
              Ottawa event planning, shaped around your people.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-navy/72 sm:text-lg">
              Prosper Events plans weddings, private parties, corporate events,
              and end-of-year celebrations across Ottawa and Gatineau—bringing
              hospitality, atmosphere, and practical coordination into one clear
              event vision.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href={planningEmail}>Plan Your Event</ButtonLink>
              <ButtonLink href="#event-types" variant="secondary">
                Explore Event Types
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal className="relative" delay={0.14}>
            <div className="relative mx-auto max-w-[35rem] lg:ml-auto">
              <div className="luxury-card p-3">
                <div className="floral-corner floral-corner-top-right" />
                <Image
                  src="/assets/gallery/table-toast.jpg"
                  alt="Cocktail service during a Prosper Events gathering in Ottawa"
                  width={1200}
                  height={1500}
                  priority
                  className="h-[34rem] w-full rounded-[1.55rem] object-cover sm:h-[39rem]"
                />
              </div>
              <div className="absolute -bottom-6 left-5 right-5 rounded-[1.5rem] border border-navy/10 bg-cream/95 px-6 py-5 shadow-card backdrop-blur-sm sm:left-auto sm:right-6 sm:w-[19rem]">
                <p className="text-[10px] uppercase tracking-[0.25em] text-navy/50">
                  Ottawa & Gatineau
                </p>
                <p className="mt-2 font-display text-2xl text-ink">
                  Personal in feeling. Precise in execution.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="event-types" className="section-space scroll-mt-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Personal & business events</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-6xl">
              A distinct event, built for its purpose.
            </h2>
            <p className="mt-6 text-base leading-8 text-navy/72">
              Planning support is tailored to the occasion—from focused creative
              guidance to a more complete plan connecting the room, the menu, the
              people, and the pace of the experience.
            </p>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
            {eventTypes.map((eventType) => (
              <StaggerItem key={eventType.number}>
                <article className="luxury-card h-full p-7 sm:p-8">
                  <div className="section-floral opacity-60" />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-navy/48">
                        {eventType.number}
                      </span>
                      <Sparkles className="h-5 w-5 text-navy/38" aria-hidden="true" />
                    </div>
                    <h3 className="mt-9 font-display text-3xl text-ink sm:text-4xl">
                      {eventType.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-navy/68 sm:text-base sm:leading-8">
                      {eventType.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Reveal>
            <div className="luxury-card h-full p-3">
              <Image
                src="/assets/gallery/conversation.jpg"
                alt="Guests connecting during an Ottawa social event"
                width={1400}
                height={1000}
                className="h-[28rem] w-full rounded-[1.55rem] object-cover lg:h-full lg:min-h-[38rem]"
              />
            </div>
          </Reveal>
          <Reveal className="section-frame" delay={0.1}>
            <div className="section-floral" />
            <div className="floral-corner floral-corner-top-right" />
            <div className="relative">
              <p className="eyebrow">Planning support</p>
              <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
                The details should support the room—not distract from it.
              </h2>
              <p className="mt-6 text-base leading-8 text-navy/72">
                Prosper approaches planning through the full guest experience.
                Every recommendation should make the occasion feel more coherent,
                while keeping the plan realistic for the venue, partners, and
                people delivering it.
              </p>
              <ul className="mt-9 grid gap-4">
                {planningSupport.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 rounded-[1.25rem] border border-navy/10 bg-white/60 px-5 py-4 text-sm leading-7 text-navy/75"
                  >
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy text-cream">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-navy/10 bg-white/55 px-7 py-10 shadow-paper sm:px-10 lg:px-12">
          <Reveal className="grid gap-9 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="eyebrow">The process</p>
              <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
                A clear path from idea to occasion.
              </h2>
            </div>
            <ol className="grid gap-5 sm:grid-cols-3">
              {process.map((step) => (
                <li key={step.number} className="border-t border-navy/15 pt-5">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-navy/48">
                    {step.number}
                  </p>
                  <h3 className="mt-5 font-display text-2xl text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-navy/68">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-8 pt-20 sm:px-6 lg:px-8">
        <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-navy px-7 py-12 text-cream shadow-card sm:px-12 sm:py-16 lg:px-16">
          <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-cream/10" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-cream/58">
                Start planning
              </p>
              <h2 className="mt-5 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
                Tell us what you are celebrating—or bringing together.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-cream/72">
                Share your event type, preferred date, guest count, and the kind
                of planning support you need. We will follow up to discuss a scope
                shaped around your occasion.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <a
                href={planningEmail}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-cream bg-cream px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-navy transition duration-500 hover:-translate-y-0.5 hover:bg-white hover:shadow-card"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Plan an Event
              </a>
              <a
                href={contactDetails.phoneHref}
                className="inline-flex items-center gap-3 text-sm text-cream/78 transition hover:text-cream"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contactDetails.phoneLabel}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
