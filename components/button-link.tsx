import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-navy text-cream border-navy hover:-translate-y-0.5 hover:bg-ink hover:shadow-card",
  secondary:
    "bg-transparent text-navy border-navy hover:-translate-y-0.5 hover:bg-navy hover:text-cream hover:shadow-card",
  ghost:
    "bg-transparent text-navy border-transparent hover:bg-white/50 hover:text-ink",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const sharedClassName = `inline-flex items-center justify-center rounded-full border px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] transition duration-500 ${variants[variant]} ${className}`;

  if (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return (
      <a
        href={href}
        className={sharedClassName}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={sharedClassName}>
      {children}
    </Link>
  );
}
