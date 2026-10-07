import type { Metadata } from "next";
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { InfoPacketPreview } from "@/components/info-packet-preview";
import { Reveal } from "@/components/reveal";
import { contactDetails } from "@/lib/site";

export const metadata: Metadata = {
  title: "Event Planning & Menu Consulting Inquiries | Prosper Events",
  description:
    "Contact Prosper Events about Ottawa event planning, private experiences, collaborations, and menu consulting for hospitality venues.",
  alternates: {
    canonical: "/inquiries",
  },
};

export default function InquiriesPage() {
  const infoPacketHref = "/assets/downloads/prosper-events-info-pack.pdf";
  const infoPacketPages = Array.from({ length: 8 }, (_, index) => ({
    src: `/assets/downloads/info-pack-preview/page-${String(index + 1).padStart(2, "0")}.jpg`,
    alt: `Prosper Events information packet page ${index + 1}`,
  }));

  return (
    <div className="pb-24 pt-32 sm:pt-36">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal className="section-frame">
            <div className="section-floral" />
            <div className="floral-corner floral-corner-top-right" />
            <div className="floral-corner floral-corner-bottom-left" />
            <p className="eyebrow">Inquiries</p>
            <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-6xl">
              Let’s talk about the event, experience, or menu you are building.
            </h1>
            <p className="mt-6 text-base leading-8 text-navy/72">
              We welcome inquiries for weddings, private parties, corporate and
              year-end events, private group experiences, collaborations, and
              menu consultations across Ottawa and Gatineau.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/event-planning-ottawa">
                Explore Event Planning
              </ButtonLink>
              <ButtonLink href="/menu-consultations" variant="secondary">
                Explore Menu Consulting
              </ButtonLink>
            </div>
            <div className="mt-8 space-y-4 text-sm text-navy">
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
            <div className="mt-8 flex items-center gap-3">
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
            <InfoPacketPreview
              pages={infoPacketPages}
              downloadHref={infoPacketHref}
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
