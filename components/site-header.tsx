"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ProsperWordmark } from "@/components/prosper-wordmark";
import { navigation, primaryEventCta } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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
        menuButtonRef.current?.focus();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${
          scrolled
            ? "border-navy/15 bg-cream/95 backdrop-blur-md"
            : "border-navy/10 bg-cream/90 backdrop-blur-sm"
        }`}
      >
        <div
          className="pointer-events-auto mx-auto flex h-[5.25rem] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          <Link href="/" className="flex items-center gap-3">
            <ProsperWordmark
              priority
              className="h-10 w-32 sm:h-11 sm:w-36 lg:h-12 lg:w-44"
            />
          </Link>

          <div className="hidden items-center gap-4 xl:flex">
            <nav className="flex items-center gap-6 2xl:gap-8">
              {navigation.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`nav-link text-xs uppercase tracking-[0.22em] ${
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
              className="inline-flex items-center justify-center rounded-[2px] border border-navy bg-navy px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.24em] text-cream transition duration-300 hover:bg-ink"
            >
              {primaryEventCta.label}
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="group flex items-center gap-3 border border-navy/25 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-navy transition hover:bg-ivory focus-visible:outline-none xl:hidden"
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
            className="fixed inset-x-0 bottom-0 top-[5.25rem] z-40 xl:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overscroll-contain bg-cream px-5 py-8 sm:px-8"
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-navy/60">
                Navigation
              </p>
              <div className="mt-7 border-t border-navy/15">
                {navigation.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between border-b border-navy/15 px-1 py-5 font-display text-3xl transition ${
                        active
                          ? "text-ink"
                          : "text-navy/72 hover:text-ink"
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
                  className="mt-8 flex items-center justify-between border border-navy bg-navy px-5 py-4 font-display text-2xl text-cream transition hover:bg-ink"
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
