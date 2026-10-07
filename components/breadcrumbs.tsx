import Link from "next/link";
import { SchemaScript } from "@/components/schema-script";
import { siteUrl } from "@/lib/site";

type BreadcrumbItem = {
  label: string;
  href: string;
  current?: boolean;
};

type BreadcrumbsProps = {
  id: string;
  items: readonly BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ id, items, className = "" }: BreadcrumbsProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteUrl}${item.href}`,
    })),
  };

  return (
    <>
      <SchemaScript id={id} data={schema} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-navy/50">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.current ? (
                <span aria-current="page" className="text-navy/70">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition hover:text-ink">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
