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
    "bg-navy text-cream border-navy hover:bg-ink",
  secondary:
    "bg-transparent text-navy border-navy hover:bg-navy hover:text-cream",
  ghost:
    "bg-transparent text-navy border-transparent hover:bg-white/50 hover:text-ink",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const sharedClassName = `inline-flex items-center justify-center rounded-[2px] border px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] transition duration-300 ${variants[variant]} ${className}`;

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
