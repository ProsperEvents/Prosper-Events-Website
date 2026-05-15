"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { GalleryImage } from "@/data/gallery";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeImage = images.find((image) => image.id === activeId) ?? null;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveId(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {images.map((image, index) => (
          <motion.button
            type="button"
            key={image.id}
            onClick={() => setActiveId(image.id)}
            className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-[1.4rem] text-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: index * 0.04,
            }}
            whileHover={{ y: -5 }}
          >
            <img
              src={image.thumbnailSrc}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="h-auto w-full rounded-[1.4rem] object-cover transition duration-700 group-hover:scale-[1.02]"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-ink/70 backdrop-blur-md"
              onClick={() => setActiveId(null)}
              aria-label="Close gallery image"
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[1.8rem] shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="absolute right-5 top-5 z-10 rounded-full border border-white/20 bg-white/80 p-2 text-navy backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                aria-label="Close image modal"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="h-auto max-h-[82vh] w-full rounded-[1.8rem] object-contain bg-transparent"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
