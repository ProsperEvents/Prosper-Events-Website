import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDownRight, Check, Mail, Phone } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SchemaScript } from "@/components/schema-script";
import { contactDetails, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu Consulting for Restaurants, Hotels, Bars & Clubs | Prosper Events",
  description:
    "Menu consultation for restaurants, hotels, bars, and private members’ clubs—from new openings and seasonal refreshes to cocktails, mocktails, recipes, and pairings.",
  alternates: {
    canonical: "/menu-consultations",
  },
  openGraph: {
    title: "Menu Consultations | Prosper Events",
    description:
      "Thoughtful, operationally sound menus for restaurants, hotels, bars, and private members’ clubs.",
    url: `${siteUrl}/menu-consultations`,
    images: [
      {
        url: "/assets/menu-consultations-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cocktail service in an intimate bar setting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Menu Consultations | Prosper Events",
    description:
      "Thoughtful, operationally sound menus for restaurants, hotels, bars, and private members’ clubs.",
    images: ["/assets/menu-consultations-og.jpg"],
  },
};

const services = [
  {
    number: "01",
    title: "New venue menus",
    description:
      "Build a cohesive opening menu for a restaurant, hotel, bar, private members’ club, or new hospitality concept—from the first idea to service-ready recipes.",
  },
  {
    number: "02",
    title: "Menu refreshes",
    description:
      "Rework an existing menu for a new season, a changing audience, stronger margins, smoother operations, or a renewed point of view.",
  },
  {
    number: "03",
    title: "Cocktails & mocktails",
    description:
      "Develop balanced signature drinks, alcohol-free options, classics, and custom recipes that feel distinct to your venue.",
  },
  {
    number: "04",
    title: "Recipes & pairings",
    description:
      "Create and refine recipes, guide implementation, and shape thoughtful food-and-drink pairings that make the full menu feel intentional.",
  },
] as const;

const approach = [
  "A clear menu identity aligned with your concept and guest experience",
  "Recipes considered for consistency, execution, and service flow",
  "Seasonal and operational recommendations grounded in your reality",
  "A practical path from menu idea to team implementation",
] as const;

const process = [
  {
    number: "01",
    title: "Discover",
    description:
      "We learn your concept, audience, operational realities, goals, and timeline.",
  },
  {
    number: "02",
    title: "Develop",
    description:
      "We shape the menu direction, recipes, pairings, and recommendations around your venue.",
  },
  {
    number: "03",
    title: "Implement",
    description:
      "We help translate the work into clear, repeatable recipes and a confident service plan.",
  },
] as const;

const consultationEmail = `mailto:${contactDetails.email}?subject=${encodeURIComponent(
  "Menu consultation inquiry",
)}&body=${encodeURIComponent(`Hi Prosper Events,

Venue name and type:
Location:
Opening or target date:
What we would like help with:

Thank you,`)}`;

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Menu Consultations",
  serviceType: "Food and beverage menu consulting",
  url: `${siteUrl}/menu-consultations`,
  description:
    "Menu consultation for restaurants, hotels, bars, and private members’ clubs, including new venue menus, seasonal and operational refreshes, cocktails, mocktails, custom recipes, recipe implementation, and food pairings.",
  areaServed: ["Ottawa, Ontario", "Gatineau, Quebec"],
  provider: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Prosper Events",
    url: siteUrl,
  },
};

export default function MenuConsultationsPage() {
  return (
    <div className="pb-24 pt-24 sm:pt-28">
      <SchemaScript id="menu-consultation-schema" data={serviceSchema} />

      <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <div className="floral-watercolor floral-watercolor-hero" />
        <div className="floral-spray floral-spray-left" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal className="relative z-10">
            <Breadcrumbs
              id="menu-consultation-breadcrumbs"
              items={[
                { label: "Home", href: "/" },
                {
                  label: "Menu Consultations",
                  href: "/menu-consultations",
                  current: true,
                },
              ]}
              className="mb-7"
            />
            <p className="eyebrow">Menu consultations</p>
            <h1 className="mt-7 max-w-3xl font-display text-5xl leading-[0.98] text-ink sm:text-7xl lg:text-[5.7rem]">
              Menu consultation, built for service.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-navy/72 sm:text-lg">
              Prosper Events advises restaurants, hotels, bars, and private
              members’ clubs on food and beverage menus for new openings,
              seasonal changes, operational improvements, and full menu revamps.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href={consultationEmail}>
                Discuss Your Menu
              </ButtonLink>
              <ButtonLink href="#services" variant="secondary">
                Explore Services
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal className="relative" delay={0.14}>
            <div className="relative mx-auto max-w-[35rem] lg:ml-auto">
              <div className="luxury-card p-3">
                <div className="floral-corner floral-corner-top-right" />
                <Image
                  src="/assets/gallery/bar-room.jpg"
                  alt="Cocktails being served in an intimate bar setting"
                  width={1200}
                  height={1500}
                  priority
                  className="h-[34rem] w-full rounded-[1.55rem] object-cover sm:h-[39rem]"
                />
              </div>
              <div className="absolute -bottom-6 left-5 right-5 rounded-[1.5rem] border border-navy/10 bg-cream/95 px-6 py-5 shadow-card backdrop-blur-sm sm:left-auto sm:right-6 sm:w-[19rem]">
                <p className="text-[10px] uppercase tracking-[0.25em] text-navy/50">
                  Built for hospitality
                </p>
                <p className="mt-2 font-display text-2xl text-ink">
                  Creative in concept. Practical in service.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="section-space scroll-mt-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">How we can help</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-6xl">
              Focused advice for the menu you are building—or the one ready to
              evolve.
            </h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <StaggerItem key={service.number}>
                <article className="luxury-card h-full p-7 sm:p-8">
                  <div className="section-floral opacity-60" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-5">
                      <p className="text-[11px] uppercase tracking-[0.25em] text-navy/48">
                        {service.number}
                      </p>
                      <ArrowDownRight className="h-5 w-5 text-navy/40" aria-hidden="true" />
                    </div>
                    <h3 className="mt-10 font-display text-3xl text-ink sm:text-4xl">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-navy/68 sm:text-base sm:leading-8">
                      {service.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-navy/10 bg-white/55 px-7 py-10 shadow-paper sm:px-10 lg:px-12">
          <Reveal className="grid gap-9 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
                From first conversation to service.
              </h2>
            </div>
            <ol className="grid gap-5 sm:grid-cols-3">
              {process.map((step) => (
                <li key={step.number} className="border-t border-navy/15 pt-5">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-navy/48">
                    {step.number}
                  </p>
                  <h3 className="mt-5 font-display text-2xl text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-navy/68">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
          <Reveal>
            <div className="luxury-card h-full p-3">
              <div className="floral-corner floral-corner-bottom-left" />
              <Image
                src="/assets/gallery/gathered-table.jpg"
                alt="Guests gathered around a bar during a Prosper Events evening"
                width={1200}
                height={1500}
                className="h-[28rem] w-full rounded-[1.55rem] object-cover lg:h-full lg:min-h-[38rem]"
              />
            </div>
          </Reveal>

          <Reveal className="section-frame" delay={0.1}>
            <div className="section-floral" />
            <div className="floral-corner floral-corner-top-right" />
            <div className="relative">
              <p className="eyebrow">The approach</p>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">
                Original ideas, refined for the realities of your room.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-navy/72">
                The strongest menus balance identity, guest appeal, product,
                preparation, and service. We bring those pieces together so the
                finished menu feels distinctive without losing sight of how your
                team will execute it every day.
              </p>
              <ul className="mt-9 grid gap-4">
                {approach.map((item) => (
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

      <section className="px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-navy px-7 py-12 text-cream shadow-card sm:px-12 sm:py-16 lg:px-16">
          <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-cream/10" />
          <div className="absolute -right-8 -top-16 h-56 w-56 rounded-full border border-cream/10" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-cream/58">
                Start the conversation
              </p>
              <h2 className="mt-5 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
                Tell us where your menu is today—and where you want it to go.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-cream/72">
                Reach out with your venue type, concept, opening timeline, and
                the kind of support you need. We will follow up to discuss a
                consultation shaped around your project.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <a
                href={consultationEmail}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-cream bg-cream px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-navy transition duration-500 hover:-translate-y-0.5 hover:bg-white hover:shadow-card"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email Prosper Events
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
