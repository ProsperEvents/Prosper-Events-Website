import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { ProsperWordmark } from "@/components/prosper-wordmark";
import { contactDetails } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-navy/10 bg-white/50">
      <div className="section-floral opacity-70" />
      <div className="floral-corner floral-corner-top-right" />
      <div className="floral-corner floral-corner-bottom-left" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8 lg:py-16">
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
            Intimate gatherings shaped by atmosphere, hospitality, and the slow
            elegance of a well-composed room.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.22em] text-navy/55">
            prosperevents.ca
          </p>
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
            Ottawa / Gatineau curated events
          </p>
          <div className="mt-4 flex items-center gap-3">
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
    </footer>
  );
}
