import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { Reveal } from "@/components/reveal";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery | Prosper Events",
  description:
    "View the Prosper Events gallery: intimate cocktail service, social tables, and curated atmosphere from Ottawa and Gatineau gatherings.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-36">
      <section className="px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem]">
            <div className="section-floral" />
            <div className="floral-corner floral-corner-top-right" />
            <p className="eyebrow">Gallery</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <h1 className="font-display text-5xl leading-tight text-ink sm:text-6xl">
                A gallery of atmosphere, detail, and social rhythm.
              </h1>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <GalleryGrid images={galleryImages} />
        </div>
      </section>
    </div>
  );
}
