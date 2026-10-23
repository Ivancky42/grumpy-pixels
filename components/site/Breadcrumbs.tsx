import Link from "next/link";
import { JsonLd } from "@/components/site/JsonLd";
import { site } from "@/lib/site";

export type BreadcrumbItem = { label: string; href?: string };

/**
 * Visual breadcrumb trail plus the matching BreadcrumbList structured data.
 * The last item is the current page and is rendered without a link.
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: `${site.url}${item.href}` } : {}),
          })),
        }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-2">
                {last || !item.href ? (
                  <span
                    aria-current={last ? "page" : undefined}
                    className={last ? "font-medium text-ink" : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="underline-offset-4 transition-colors hover:text-violet hover:underline"
                  >
                    {item.label}
                  </Link>
                )}
                {!last && (
                  <span aria-hidden className="text-ink/30">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
