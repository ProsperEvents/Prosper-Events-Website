"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import {
  COCKTAIL_CLASSES,
  cocktailMenu,
  type CocktailClassDate,
} from "@/lib/cocktail-classes";
import type { GuestSelection } from "@/lib/ticket-selections";
import { MenuGallery } from "@/components/menu-gallery";

const dates: { value: CocktailClassDate; label: string }[] = [
  { value: "2026-10-23", label: COCKTAIL_CLASSES.dates["2026-10-23"].shortLabel },
];
const ticketSalesOpen = dates.some(({ value }) => COCKTAIL_CLASSES.dates[value].salesOpen);
const ticketPrice = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
}).format(COCKTAIL_CLASSES.priceCents / 100);
const blankGuest = (): GuestSelection => ({ name: "", drinks: ["", "", ""] });

export function TicketPurchase() {
  if (!ticketSalesOpen) {
    return (
      <section id="tickets" className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-navy/10 bg-white/80 px-6 py-12 text-center shadow-paper sm:px-10">
            <div className="section-floral opacity-70" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <p className="eyebrow">The Perfect Cocktail Class</p>
              <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">Ticket sales are now closed.</h2>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const [date, setDate] = useState<CocktailClassDate>(dates[0].value);
  const [guests, setGuests] = useState<GuestSelection[]>([blankGuest()]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remainingForDate, setRemainingForDate] = useState<number | null>(null);
  const availabilityLoading = remainingForDate === null;

  useEffect(() => {
    const controller = new AbortController();
    setRemainingForDate(null);
    fetch(`/api/tickets/availability?date=${date}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((result) => {
        if (controller.signal.aborted) return;
        const remaining = typeof result.remainingForDate === "number" ? result.remainingForDate : 0;
        setRemainingForDate(remaining);
        setGuests((current) => remaining > 0 && current.length > remaining ? current.slice(0, remaining) : current);
      })
      .catch(() => {
        if (!controller.signal.aborted) setRemainingForDate(0);
      });
    return () => controller.abort();
  }, [date]);

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
    setError("");
    if (guests.some((guest) => !guest.name.trim() || guest.drinks.some((drink) => !drink) || new Set(guest.drinks).size !== 3)) {
      setError("Please enter each guest’s name and choose three different drinks for every ticket.");
      return;
    }
    setLoading(true);
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
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-navy/10 bg-white/80 px-6 py-9 shadow-paper sm:px-10">
          <div className="section-floral opacity-70" />
          <div className="relative z-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="eyebrow">Reserve your seat</p>
                <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">Choose your three drinks.</h2>
              </div>
              <div className="shrink-0 text-left sm:text-right">
                <p className="font-display text-4xl text-ink">{ticketPrice}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-navy/55">per guest · CAD</p>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-navy/72">
              Your ticket includes a hands-on lesson making three drinks from the menus below, tasting, take-home recipes, and an evening connecting with fellow cocktail lovers. Limited to 14 guests. All sales are final; cancelled tickets are not refunded.
            </p>
            <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
              <label className="text-sm text-navy/74">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-navy/55">Class date</span>
                <select value={date} onChange={(event) => setDate(event.target.value as CocktailClassDate)} className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-ink outline-none ring-navy/25 focus:ring-2">
                  {dates.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
              <label className="text-sm text-navy/74">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-navy/55">Guests{remainingForDate !== null ? ` · ${remainingForDate} spot${remainingForDate === 1 ? "" : "s"} left` : ""}</span>
                <select value={guests.length} disabled={availabilityLoading || remainingForDate === 0} onChange={(event) => changeQuantity(Number(event.target.value))} className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-ink outline-none ring-navy/25 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60">
                  {availabilityLoading ? <option>Checking availability…</option> : remainingForDate === 0 ? <option value={guests.length}>Sold out</option> : Array.from({ length: remainingForDate }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count} {count === 1 ? "guest" : "guests"}</option>)}
                </select>
              </label>
            </div>
            <div className="mt-10"><MenuGallery /></div>
            <div className="mt-10 border-y border-navy/10">
              <div className="grid gap-2 py-5 sm:grid-cols-[0.7fr_1fr] sm:items-end">
                <div><p className="eyebrow">Guest details</p><p className="mt-2 text-sm text-navy/65">Name each ticket and choose three distinct drinks for every guest.</p></div>
                <p className="text-sm leading-6 text-navy/60 sm:text-right">Cocktails are 19+ · mocktails are zero-proof</p>
              </div>
              {guests.map((guest, guestIndex) => (
                <div key={guestIndex} className="grid gap-5 border-t border-navy/10 py-7 lg:grid-cols-[0.38fr_0.78fr_1.84fr] lg:items-end">
                  <div className="flex items-baseline gap-3"><span className="font-display text-3xl text-navy/35">{String(guestIndex + 1).padStart(2, "0")}</span><p className="font-display text-2xl text-ink">Guest</p></div>
                  <label className="block text-sm text-navy/74"><span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-navy/50">Name on ticket</span><input value={guest.name} maxLength={30} onChange={(event) => updateGuest(guestIndex, event.target.value)} className="w-full border-b border-navy/20 bg-transparent px-0 py-3 text-ink outline-none transition placeholder:text-navy/35 focus:border-navy" placeholder="Guest name" /></label>
                  <div className="grid gap-x-4 gap-y-3 sm:grid-cols-3">
                    {([0, 1, 2] as const).map((drinkIndex) => (
                      <label key={drinkIndex} className="text-sm text-navy/74">
                        <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-navy/50">Choice {drinkIndex + 1}</span>
                        <select value={guest.drinks[drinkIndex]} onChange={(event) => updateDrink(guestIndex, drinkIndex, event.target.value)} className="w-full border-b border-navy/20 bg-transparent px-0 py-3 text-ink outline-none transition focus:border-navy">
                          <option value="">Choose a drink</option>
                          <optgroup label="Cocktails (19+)">{cocktailMenu.cocktails.map(([name]) => <option key={name} value={name}>{name}</option>)}</optgroup>
                          <optgroup label="Mocktails">{cocktailMenu.mocktails.map(([name]) => <option key={name} value={name}>{name}</option>)}</optgroup>
                        </select>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={beginCheckout} disabled={loading || availabilityLoading || remainingForDate === 0} className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-white transition hover:bg-ink disabled:cursor-wait disabled:opacity-70">
              {loading || availabilityLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
              {availabilityLoading ? "Checking availability…" : remainingForDate === 0 ? "This class is sold out" : loading ? "Opening secure checkout…" : `Continue to secure checkout · ${ticketPrice}`}
            </button>
            {error ? <p className="mt-4 text-sm text-red-700" role="alert">{error}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
