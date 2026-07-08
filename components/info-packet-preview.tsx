"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useState } from "react";

type PacketPage = {
  src: string;
  alt: string;
};

type InfoPacketPreviewProps = {
  pages: PacketPage[];
  downloadHref: string;
};

export function InfoPacketPreview({
  pages,
  downloadHref,
}: InfoPacketPreviewProps) {
  const [spreadIndex, setSpreadIndex] = useState(0);

  const totalSpreads = Math.ceil(pages.length / 2);
  const leftPage = pages[spreadIndex * 2] ?? null;
  const rightPage = pages[spreadIndex * 2 + 1] ?? null;

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-navy/55">
            Information Packet
          </p>
          <p className="mt-2 text-sm text-navy/70">
            Browse the packet below or download the full PDF.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={downloadHref}
            download
            className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/16 bg-white/72 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-navy transition duration-500 hover:-translate-y-0.5 hover:border-navy hover:bg-white hover:text-ink hover:shadow-card"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="relative mx-auto w-fit min-w-[55rem] px-3 sm:px-4">
          <button
            type="button"
            onClick={() => setSpreadIndex((index) => Math.max(index - 1, 0))}
            disabled={spreadIndex === 0}
            className="absolute left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy/14 bg-white/72 text-navy transition duration-500 hover:-translate-y-[52%] hover:bg-white hover:text-ink hover:shadow-card disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:-translate-y-1/2 sm:left-5"
            aria-label="View previous packet spread"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,242,228,0.92))] p-5 shadow-[0_30px_80px_rgba(32,36,132,0.14)] sm:p-7">
            <div className="relative rounded-[1.6rem] bg-[radial-gradient(circle_at_center,rgba(32,36,132,0.08),transparent_38%)] px-4 py-5 sm:px-5">
            <div className="pointer-events-none absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-navy/10" />
            <div className="pointer-events-none absolute inset-y-8 left-1/2 w-12 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(32,36,132,0.10),transparent_72%)] blur-md" />
            <AnimatePresence mode="wait">
              <motion.div
                key={spreadIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 gap-5"
              >
                {[leftPage, rightPage].map((page, columnIndex) => (
                  <div
                    key={page?.src ?? `empty-${columnIndex}`}
                    className="relative aspect-[1/1.414] overflow-hidden rounded-[1.2rem] bg-[#f8f3e7] shadow-[0_16px_40px_rgba(93,85,68,0.16)]"
                  >
                    {page ? (
                      <Image
                        src={page.src}
                        alt={page.alt}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        priority={spreadIndex === 0}
                      />
                    ) : (
                      <div className="h-full w-full bg-[linear-gradient(180deg,rgba(248,243,231,1),rgba(241,233,214,1))]" />
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              setSpreadIndex((index) => Math.min(index + 1, totalSpreads - 1))
            }
            disabled={spreadIndex === totalSpreads - 1}
            className="absolute right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy/14 bg-white/72 text-navy transition duration-500 hover:-translate-y-[52%] hover:bg-white hover:text-ink hover:shadow-card disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:-translate-y-1/2 sm:right-5"
            aria-label="View next packet spread"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-navy/50">
        <span>
          Spread {spreadIndex + 1} of {totalSpreads}
        </span>
        <span>{pages.length} pages</span>
      </div>
    </div>
  );
}
