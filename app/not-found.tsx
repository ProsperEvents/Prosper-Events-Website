import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="eyebrow justify-center">Page not found</p>
        <h1 className="mt-5 font-display text-5xl text-ink sm:text-6xl">
          The invitation appears to have moved.
        </h1>
        <p className="mt-6 text-base leading-8 text-navy/72">
          This page is unavailable, but the next gathering is still within
          reach.
        </p>
        <Link
          href="/events"
          className="mt-8 inline-flex rounded-full border border-navy bg-navy px-6 py-3 text-xs uppercase tracking-[0.22em] text-cream transition hover:-translate-y-0.5 hover:bg-ink"
        >
          Return to Events
        </Link>
      </div>
    </div>
  );
}
