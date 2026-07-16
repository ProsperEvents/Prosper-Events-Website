import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Subscription Received | Prosper Events",
  description:
    "Your Prosper Events subscription request has been received.",
  alternates: {
    canonical: "/subscribe/success",
  },
};

export default function SubscribeSuccessPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-36">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal className="section-frame text-center">
            <div className="section-floral" />
            <div className="floral-corner floral-corner-top-right" />
            <div className="floral-corner floral-corner-bottom-left" />
            <p className="eyebrow">Subscription Received</p>
            <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-6xl">
              Thank you for subscribing.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-navy/72">
              Your details have been sent to Prosper Events. We will keep you
              informed on upcoming classes and future invitations.
            </p>
            <div className="mt-10">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-navy bg-navy px-7 py-3 text-xs font-medium uppercase tracking-[0.22em] text-cream transition duration-500 hover:-translate-y-0.5 hover:bg-ink hover:shadow-card"
              >
                Return Home
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
