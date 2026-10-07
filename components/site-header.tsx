"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ProsperWordmark } from "@/components/prosper-wordmark";
import { navigation, primaryEventCta } from "@/lib/site";

const desktopNavigation = [
  { label: "Home", href: "/" },
  { label: "Experiences", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Inquiries", href: "/inquiries" },
] as const;

const serviceNavigation = [
  {
    label: "Event Planning",
    detail: "Weddings, parties & business events",
    href: "/event-planning-ottawa",
  },
  {
    label: "Menu Consulting",
    detail: "Food & beverage menu development",
    href: "/menu-consultations",
  },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
        if (open) menuButtonRef.current?.focus();
      }
    };

    if (open || servicesOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, servicesOpen]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const servicesActive = serviceNavigation.some((item) => pathname === item.href);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <div
          className={`pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition duration-300 sm:px-6 ${
            scrolled
              ? "border-navy/12 bg-cream/95 shadow-paper backdrop-blur-md"
              : "border-navy/10 bg-ivory/85 backdrop-blur-sm"
          }`}
        >
          <Link href="/" className="flex items-center gap-3">
            <ProsperWordmark
              priority
              className="h-10 w-32 sm:h-11 sm:w-36 lg:h-12 lg:w-44"
            />
          </Link>

          <div className="hidden items-center gap-5 xl:flex">
            <nav className="flex items-center gap-7">
              {desktopNavigation.slice(0, 2).map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href === "/events" && pathname.startsWith("/events/"));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`nav-link text-[11px] uppercase tracking-[0.22em] ${
                      active ? "text-ink" : "text-navy/85"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div ref={servicesRef} className="relative">
                <button
                  type="button"
                  onClick={() => setServicesOpen((value) => !value)}
                  aria-expanded={servicesOpen}
                  aria-controls="desktop-services-menu"
                  className={`nav-link flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] ${
                    servicesActive ? "text-ink" : "text-navy/85"
                  }`}
                >
                  <span>Services</span>
                  <span
                    aria-hidden="true"
                    className={`text-sm leading-none transition-transform duration-200 ${
                      servicesOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence>
                  {servicesOpen ? (
                    <motion.div
                      id="desktop-services-menu"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full mt-5 w-80 -translate-x-1/2 rounded-[1.5rem] border border-navy/10 bg-ivory/95 p-2 shadow-card backdrop-blur-xl"
                    >
                      {serviceNavigation.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            className={`block rounded-[1rem] px-4 py-3.5 transition ${
                              active
                                ? "bg-navy text-cream"
                                : "text-navy hover:bg-cream"
                            }`}
                          >
                            <span className="block font-display text-xl leading-none">
                              {item.label}
                            </span>
                            <span
                              className={`mt-1.5 block text-[10px] uppercase tracking-[0.16em] ${
                                active ? "text-cream/75" : "text-navy/55"
                              }`}
                            >
                              {item.detail}
                            </span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {desktopNavigation.slice(2).map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`nav-link text-[11px] uppercase tracking-[0.22em] ${
                      active ? "text-ink" : "text-navy/85"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              href={primaryEventCta.href}
              className="inline-flex items-center justify-center rounded-full border border-navy bg-navy px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.24em] text-cream transition duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-card"
            >
              {primaryEventCta.label}
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="group flex items-center gap-3 rounded-full border border-navy/18 bg-ivory/70 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-navy transition hover:bg-ivory focus-visible:outline-none xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0.5 h-px w-5 bg-current transition duration-300 ${
                  open ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 h-px w-3 bg-current transition duration-300 ${
                  open ? "w-5 -translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/22 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-[2rem] border border-navy/10 bg-cream/95 p-6 shadow-card"
            >
              <div className="section-floral opacity-80" />
              <p className="text-[11px] uppercase tracking-[0.28em] text-navy/60">
                Navigation
              </p>
              <div className="relative mt-6 space-y-3">
                {navigation.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between rounded-[1.25rem] border px-5 py-4 font-display text-2xl transition ${
                        active
                          ? "border-navy bg-navy text-cream"
                          : "border-navy/10 bg-ivory/70 text-navy hover:border-navy/22 hover:bg-ivory"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-sm uppercase tracking-[0.24em]">
                        0{navigation.findIndex((nav) => nav.href === item.href) + 1}
                      </span>
                    </Link>
                  );
                })}
                <Link
                  href={primaryEventCta.href}
                  className="flex items-center justify-between rounded-[1.25rem] border border-navy bg-navy px-5 py-4 font-display text-2xl text-cream transition hover:bg-ink"
                >
                  <span>{primaryEventCta.label}</span>
                  <span className="text-sm uppercase tracking-[0.24em]">
                    {String(navigation.length + 1).padStart(2, "0")}
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
