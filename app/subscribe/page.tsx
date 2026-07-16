import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { contactDetails, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Subscribe | Prosper Events",
  description:
    "Subscribe to Prosper Events updates and share your interest in cocktail classes or mocktail classes.",
  alternates: {
    canonical: "/subscribe",
  },
};

export default function SubscribePage() {
  return (
    <div className="pb-24 pt-32 sm:pt-36">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Reveal className="section-frame">
            <div className="section-floral" />
            <div className="floral-corner floral-corner-top-right" />
            <div className="floral-corner floral-corner-bottom-left" />
            <p className="eyebrow">Subscribe</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-6xl">
              Join the Prosper Events list.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-navy/72">
              Receive updates on upcoming evenings and let us know whether you
              are interested in cocktail classes or mocktail classes.
            </p>

            <form
              action={contactDetails.subscribeFormAction}
              method="POST"
              className="mt-10 grid gap-6"
            >
              <input type="hidden" name="_subject" value="New Prosper Events subscription" />
              <input
                type="hidden"
                name="_next"
                value={`${siteUrl}/subscribe/success`}
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-navy/55">
                    First Name
                  </span>
                  <input
                    type="text"
                    name="first_name"
                    required
                    autoComplete="given-name"
                    className="mt-3 w-full rounded-[1.25rem] border border-navy/12 bg-white/78 px-5 py-4 text-base text-navy shadow-paper outline-none transition focus:border-navy/40 focus:bg-white"
                  />
                </label>

                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-navy/55">
                    Last Name
                  </span>
                  <input
                    type="text"
                    name="last_name"
                    required
                    autoComplete="family-name"
                    className="mt-3 w-full rounded-[1.25rem] border border-navy/12 bg-white/78 px-5 py-4 text-base text-navy shadow-paper outline-none transition focus:border-navy/40 focus:bg-white"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.24em] text-navy/55">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="mt-3 w-full rounded-[1.25rem] border border-navy/12 bg-white/78 px-5 py-4 text-base text-navy shadow-paper outline-none transition focus:border-navy/40 focus:bg-white"
                />
              </label>

              <fieldset className="rounded-[1.6rem] border border-navy/10 bg-white/60 p-6 shadow-paper">
                <legend className="px-2 text-[11px] uppercase tracking-[0.24em] text-navy/55">
                  Class interest
                </legend>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center gap-4 rounded-[1.2rem] border border-navy/10 bg-cream/75 px-4 py-4 transition hover:border-navy/22 hover:bg-white/75">
                    <input
                      type="radio"
                      name="class_interest"
                      value="Cocktail Classes"
                      required
                      className="h-4 w-4 accent-navy"
                    />
                    <span className="font-display text-2xl text-ink">Cocktail Classes</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-4 rounded-[1.2rem] border border-navy/10 bg-cream/75 px-4 py-4 transition hover:border-navy/22 hover:bg-white/75">
                    <input
                      type="radio"
                      name="class_interest"
                      value="Mocktail Classes"
                      required
                      className="h-4 w-4 accent-navy"
                    />
                    <span className="font-display text-2xl text-ink">Mocktail Classes</span>
                  </label>
                </div>
              </fieldset>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full border border-navy bg-navy px-7 py-3 text-xs font-medium uppercase tracking-[0.22em] text-cream transition duration-500 hover:-translate-y-0.5 hover:bg-ink hover:shadow-card"
                >
                  Subscribe
                </button>
                <p className="text-sm text-navy/62">
                  Submissions are sent directly to Prosper Events by email.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
