"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { cocktailMenu } from "@/lib/cocktail-classes";
import type { GuestSelection } from "@/lib/ticket-selections";

const dates = [
  { value: "2026-09-18", label: "Friday, September 18" },
  { value: "2026-09-19", label: "Saturday, September 19" },
] as const;
const drinkOptions = [...cocktailMenu.cocktails, ...cocktailMenu.mocktails];
const blankGuest = (): GuestSelection => ({ name: "", drinks: ["", "", ""] });

export function TicketPurchase() {
  const [date, setDate] = useState<(typeof dates)[number]["value"]>(dates[0].value);
  const [guests, setGuests] = useState<GuestSelection[]>([blankGuest()]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function changeQuantity(quantity: number) {
    setGuests((current) => Array.from({ length: quantity }, (_, index) => current[index] ?? blankGuest()));
  }
  function updateGuest(index: number, name: string) {
    setGuests((current) => current.map((guest, guestIndex) => guestIndex === index ? { ...guest, name } : guest));
  }
  function updateDrink(guestIndex: number, drinkIndex: 0 | 1 | 2, drink: string) {
    setGuests((current) => current.map((guest, index) => {
      if (index !== guestIndex) return guest;
      const drinks = [...guest.drinks] as GuestSelection["drinks"];
      drinks[drinkIndex] = drink;
      return { ...guest, drinks };
    }));
  }

  async function beginCheckout() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/tickets/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, quantity: guests.length, guests }),
      });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error || "We could not start checkout. Please try again.");
      window.location.assign(result.url);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "We could not start checkout.");
      setLoading(false);
    }
  }

  return (
    <section id="tickets" className="section-space px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl"><div className="relative overflow-hidden rounded-[2rem] border border-navy/10 bg-white/80 px-6 py-9 shadow-paper sm:px-10"><div className="section-floral opacity-70" />
        <div className="relative z-10"><p className="eyebrow">Reserve your seat</p><h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">Choose your three drinks.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-navy/72">$85 per guest. The first 10 tickets sold across both nights are automatically reduced to $68. Limited to 14 guests per night. All sales are final; cancelled tickets are not refunded.</p>
          <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            <label className="text-sm text-navy/74"><span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-navy/55">Choose a date</span><select value={date} onChange={(event) => setDate(event.target.value as typeof date)} className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-ink outline-none ring-navy/25 focus:ring-2">{dates.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
            <label className="text-sm text-navy/74"><span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-navy/55">Guests</span><select value={guests.length} onChange={(event) => changeQuantity(Number(event.target.value))} className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-ink outline-none ring-navy/25 focus:ring-2">{[1, 2, 3, 4].map((count) => <option key={count} value={count}>{count} {count === 1 ? "guest" : "guests"}</option>)}</select></label>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">{guests.map((guest, guestIndex) => <div key={guestIndex} className="rounded-2xl border border-navy/10 bg-white/75 p-5"><p className="font-display text-2xl text-ink">Guest {guestIndex + 1}</p><label className="mt-4 block text-sm text-navy/74"><span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-navy/55">Name on ticket</span><input value={guest.name} maxLength={30} onChange={(event) => updateGuest(guestIndex, event.target.value)} className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-ink outline-none ring-navy/25 focus:ring-2" placeholder="Guest name" /></label><div className="mt-4 grid gap-3 sm:grid-cols-3">{([0, 1, 2] as const).map((drinkIndex) => <label key={drinkIndex} className="text-sm text-navy/74"><span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-navy/55">Drink {drinkIndex + 1}</span><select value={guest.drinks[drinkIndex]} onChange={(event) => updateDrink(guestIndex, drinkIndex, event.target.value)} className="w-full rounded-xl border border-navy/15 bg-white px-3 py-3 text-ink outline-none ring-navy/25 focus:ring-2"><option value="">Select</option>{drinkOptions.map(([name]) => <option key={name} value={name}>{name}</option>)}</select></label>)}</div></div>)}</div>
          <button type="button" onClick={beginCheckout} disabled={loading} className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition hover:bg-ink disabled:cursor-wait disabled:opacity-70">{loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}{loading ? "Opening secure checkout…" : "Continue to secure checkout"}</button>{error ? <p className="mt-4 text-sm text-red-700" role="alert">{error}</p> : null}
        </div>
      </div></div>
    </section>
  );
}
