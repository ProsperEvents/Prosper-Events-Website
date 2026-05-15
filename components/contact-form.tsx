"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.24em] text-navy/55">
            Name
          </span>
          <input
            type="text"
            name="name"
            className="w-full rounded-[1.2rem] border border-navy/10 bg-white/80 px-4 py-3 text-sm text-navy outline-none transition focus:border-navy/35 focus:ring-2 focus:ring-navy/10"
            placeholder="Your name"
          />
        </label>
        <label className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.24em] text-navy/55">
            Email
          </span>
          <input
            type="email"
            name="email"
            className="w-full rounded-[1.2rem] border border-navy/10 bg-white/80 px-4 py-3 text-sm text-navy outline-none transition focus:border-navy/35 focus:ring-2 focus:ring-navy/10"
            placeholder="name@example.com"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-[11px] uppercase tracking-[0.24em] text-navy/55">
          Inquiry
        </span>
        <textarea
          name="message"
          rows={6}
          className="w-full rounded-[1.4rem] border border-navy/10 bg-white/80 px-4 py-4 text-sm leading-7 text-navy outline-none transition focus:border-navy/35 focus:ring-2 focus:ring-navy/10"
          placeholder="Tell Prosper Events about the experience, date, or collaboration you have in mind."
        />
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full border border-navy bg-navy px-6 py-3 text-xs uppercase tracking-[0.22em] text-cream transition hover:-translate-y-0.5 hover:bg-ink hover:shadow-card"
      >
        Send Inquiry
      </button>

      <p className="text-sm leading-7 text-navy/62">
        {sent
          ? "This inquiry form is a presentation-only UI for now. Please use the email or phone links on this page to reach Prosper Events directly."
          : "This form is presented for layout and flow only. For now, inquiries should be sent by email or phone."}
      </p>
    </form>
  );
}
