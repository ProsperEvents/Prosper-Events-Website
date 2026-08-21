"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const dates = [
  { value: "2026-09-18", label: "Friday, September 18" },
  { value: "2026-09-19", label: "Saturday, September 19" },
] as const;

export function TicketPurchase() {
  const [date, setDate] = useState<(typeof dates)[number]["value"]>(dates[0].value);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function beginCheckout() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/tickets/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, quantity }),
      });
      const result = await response.json();
      if (!response.ok || !result.url) {
        throw new Error(result.error || "We could not start checkout. Please try again.");
      }
      window.location.assign(result.url);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "We could not start checkout.");
      setLoading(false);
    }
  }

  return (
    <section id="tickets" className="section-space px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-navy/10 bg-white/80 px-6 py-9 shadow-paper sm:px-10">
          <div className="section-floral opacity-70" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow">Reserve your seat</p>
              <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">Make three drinks of your choosing.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-navy/72">
                $85 per guest. The first 10 tickets sold across both nights are automatically reduced to $68. Limited to 14 guests per night. All sales are final; cancelled tickets are not refunded.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:min-w-[28rem]">
              <label className="text-sm text-navy/74">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-navy/55">Choose a date</span>
                <select value={date} onChange={(event) => setDate(event.target.value as typeof date)} className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-ink outline-none ring-navy/25 focus:ring-2">
                  {dates.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
              <label className="text-sm text-navy/74">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-navy/55">Tickets</span>
                <select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-ink outline-none ring-navy/25 focus:ring-2">
                  {[1, 2, 3, 4].map((count) => <option key={count} value={count}>{count} {count === 1 ? "ticket" : "tickets"}</option>)}
                </select>
              </label>
              <button type="button" onClick={beginCheckout} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition hover:bg-ink disabled:cursor-wait disabled:opacity-70 sm:col-span-2">
                {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                {loading ? "Opening secure checkout…" : "Buy tickets"}
              </button>
            </div>
          </div>
          {error ? <p className="relative z-10 mt-4 text-sm text-red-700" role="alert">{error}</p> : null}
        </div>
      </div>
    </section>
  );
}
