"use client";

import { useState } from "react";
import Image from "next/image";

const menus = [
  { src: "/assets/events/cocktail-classes/menus/cocktail-menu.png", alt: "Cocktail Class cocktail menu" },
  { src: "/assets/events/cocktail-classes/menus/mocktail-menu.png", alt: "Cocktail Class mocktail menu" },
];

export function MenuGallery() {
  const [active, setActive] = useState<(typeof menus)[number] | null>(null);
  return <><div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">{menus.map((menu, index) => <button key={menu.src} type="button" onClick={() => setActive(menu)} className="group relative text-left"><Image src={menu.src} alt={menu.alt} width={1080} height={1350} className="h-auto w-full transition duration-500 group-hover:scale-[1.01]" priority={index === 0} /><span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-navy px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white opacity-0 transition group-hover:opacity-100">View menu</span></button>)}</div>{active ? <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={active.alt} onClick={() => setActive(null)}><button type="button" className="absolute right-5 top-5 rounded-full border border-white/35 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white" onClick={() => setActive(null)}>Close</button><Image src={active.src} alt={active.alt} width={1080} height={1350} className="max-h-[88vh] w-auto max-w-full object-contain" onClick={(event) => event.stopPropagation()} priority /></div> : null}</>;
}
