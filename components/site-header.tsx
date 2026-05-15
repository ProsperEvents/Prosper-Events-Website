"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ProsperWordmark } from "@/components/prosper-wordmark";
import { navigation } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <div
          className={`pointer-events-auto mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition duration-500 sm:px-6 ${
            scrolled
              ? "border-navy/10 bg-cream/88 shadow-paper backdrop-blur-md"
              : "border-navy/10 bg-cream/70 backdrop-blur-sm"
          }`}
        >
          <Link href="/" className="flex items-center gap-3">
            <ProsperWordmark
              priority
              className="h-10 w-32 sm:h-11 sm:w-36 lg:h-12 lg:w-44"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link text-xs uppercase tracking-[0.22em] ${
                    active ? "text-ink" : "text-navy/85"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="group flex items-center gap-3 rounded-full border border-navy/15 bg-white/60 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-navy transition hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy md:hidden"
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
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/25 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 top-24 overflow-hidden rounded-[2rem] border border-navy/10 bg-cream/95 p-6 shadow-paper"
            >
              <div className="section-floral opacity-80" />
              <p className="relative text-[11px] uppercase tracking-[0.28em] text-navy/60">
                Curated navigation
              </p>
              <div className="relative mt-6 space-y-4">
                {navigation.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between rounded-3xl border px-5 py-4 font-display text-2xl tracking-wide transition ${
                        active
                          ? "border-navy/20 bg-navy text-cream"
                          : "border-navy/10 bg-white/70 text-navy hover:bg-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-sm uppercase tracking-[0.24em]">
                        0{navigation.findIndex((nav) => nav.href === item.href) + 1}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
