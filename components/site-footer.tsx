import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { ProsperWordmark } from "@/components/prosper-wordmark";
import { contactDetails, primaryEventCta } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-navy/10 bg-white/50">
      <div className="section-floral opacity-70" />
      <div className="floral-corner floral-corner-top-right" />
      <div className="floral-corner floral-corner-bottom-left" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.15fr_0.7fr_0.85fr_0.8fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src="/assets/logos/prosper-events-rounded-logo.png"
              alt="Prosper Events rounded logo"
              width={72}
              height={72}
              className="h-16 w-16 rounded-full"
            />
            <ProsperWordmark className="h-11 w-36" />
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-navy/72">
            Ottawa event planning, curated local experiences, and hospitality
            menu consulting shaped by atmosphere and thoughtful service.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.22em] text-navy/55">
            prosperevents.ca
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-navy/55">
            Explore
          </p>
          <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-navy">
            <Link href="/event-planning-ottawa" className="hover:text-ink">
              Event Planning in Ottawa
            </Link>
            <Link href="/menu-consultations" className="hover:text-ink">
              Menu Consultations
            </Link>
            <Link href="/things-to-do-ottawa" className="hover:text-ink">
              Things to Do in Ottawa
            </Link>
            <Link href="/events" className="hover:text-ink">
              Upcoming Events
            </Link>
          </nav>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-navy/55">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm text-navy">
            <a
              href={`mailto:${contactDetails.email}`}
              className="flex items-center gap-3 hover:text-ink"
            >
              <Mail className="h-4 w-4" />
              <span>{contactDetails.email}</span>
            </a>
            <a
              href={contactDetails.phoneHref}
              className="flex items-center gap-3 hover:text-ink"
            >
              <Phone className="h-4 w-4" />
              <span>{contactDetails.phoneLabel}</span>
            </a>
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-navy/55">
            October 23 cocktail class
          </p>
          <Link
            href={primaryEventCta.href}
            className="mt-4 inline-flex items-center justify-center rounded-full border border-navy bg-navy px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-cream transition hover:-translate-y-0.5 hover:bg-ink hover:shadow-card"
          >
            {primaryEventCta.label}
          </Link>
          <div className="mt-5 flex items-center gap-3">
            <Link
              href={`mailto:${contactDetails.email}`}
              aria-label="Email Prosper Events"
              className="rounded-full border border-navy/12 bg-white/70 p-3 text-navy transition hover:-translate-y-0.5 hover:bg-white"
            >
              <Mail className="h-4 w-4" />
            </Link>
            <Link
              href={contactDetails.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Prosper Events Instagram"
              className="rounded-full border border-navy/12 bg-white/70 p-3 text-navy transition hover:-translate-y-0.5 hover:bg-white"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href={contactDetails.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Prosper Events Facebook"
              className="rounded-full border border-navy/12 bg-white/70 p-3 text-navy transition hover:-translate-y-0.5 hover:bg-white"
            >
              <Facebook className="h-4 w-4" />
            </Link>
          </div>
        </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-navy/10 pt-6 text-[11px] uppercase tracking-[0.22em] text-navy/55">
          <p>Prosper Events</p>
          <Link href="/privacy-policy" className="hover:text-ink">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
