import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { contactDetails } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Prosper Events",
  description:
    "Read the Prosper Events privacy policy for information about contact submissions, subscriptions, and how personal information is used.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-36">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Reveal className="section-frame">
            <div className="section-floral" />
            <div className="floral-corner floral-corner-top-right" />
            <div className="floral-corner floral-corner-bottom-left" />
            <p className="eyebrow">Privacy Policy</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-6xl">
              Privacy matters to Prosper Events.
            </h1>
            <div className="mt-8 space-y-8 text-base leading-8 text-navy/74">
              <p>
                Prosper Events collects limited personal information when you
                contact us directly, submit a subscription request, or interact
                with our website. This information is used to respond to
                inquiries, share event-related updates, and manage guest
                interest in upcoming offerings such as cocktail classes or
                mocktail classes.
              </p>

              <div>
                <h2 className="font-display text-3xl text-ink">
                  Information we collect
                </h2>
                <p className="mt-3">
                  Depending on how you interact with the site, we may collect
                  your first name, last name, email address, phone number, and
                  the event or class preferences you submit voluntarily.
                </p>
              </div>

              <div>
                <h2 className="font-display text-3xl text-ink">
                  How your information is used
                </h2>
                <p className="mt-3">
                  Prosper Events uses submitted information to respond to
                  inquiries, send requested updates, organize interest lists,
                  and communicate about upcoming events, classes, and related
                  offerings. We do not sell your personal information.
                </p>
              </div>

              <div>
                <h2 className="font-display text-3xl text-ink">
                  Subscription forms
                </h2>
                <p className="mt-3">
                  Subscription requests on this website are currently processed
                  through a third-party form delivery service and routed to{" "}
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="underline decoration-navy/35 underline-offset-4 hover:text-ink"
                  >
                    {contactDetails.email}
                  </a>
                  . Information submitted through that form is used to maintain
                  Prosper Events mailing and interest lists.
                </p>
              </div>

              <div>
                <h2 className="font-display text-3xl text-ink">
                  Analytics and website data
                </h2>
                <p className="mt-3">
                  This website uses Vercel Analytics and Vercel Speed Insights
                  to understand traffic and site performance. These tools may
                  collect technical usage information such as page visits,
                  browser details, and performance metrics.
                </p>
              </div>

              <div>
                <h2 className="font-display text-3xl text-ink">
                  Contact
                </h2>
                <p className="mt-3">
                  If you would like to ask about your information, request an
                  update, or request removal from future communications, contact{" "}
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="underline decoration-navy/35 underline-offset-4 hover:text-ink"
                  >
                    {contactDetails.email}
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="font-display text-3xl text-ink">
                  Changes
                </h2>
                <p className="mt-3">
                  This privacy policy may be updated from time to time to
                  reflect changes to Prosper Events services or website
                  features.
                </p>
              </div>
            </div>

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
