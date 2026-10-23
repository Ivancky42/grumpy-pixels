import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { eyebrowClass } from "@/components/ui/SectionHeading";
import { Logo } from "@/components/site/Logo";
import { industries } from "@/lib/industries";
import { footerStudioNav, mainNav } from "@/lib/navigation";
import { mailtoLink, site, whatsappLink } from "@/lib/site";

const headingClass =
  `${eyebrowClass} text-cream/70`;
const linkClass =
  "inline-flex min-h-11 items-center text-sm text-cream/80 transition-colors duration-200 hover:text-cream motion-reduce:transition-none";

const servicesNav = mainNav.find((item) => item.children);

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-cream">
      <Container className="py-14 sm:py-16">
        <div className="max-w-md">
          <Link href="/" className="-m-2 inline-block rounded-md p-2">
            <Logo tone="reversed" className="h-8" title={`${site.name} — home`} />
          </Link>
          <p className="mt-4 font-display text-lg font-bold tracking-[-0.02em] text-cream">
            {site.tagline}
          </p>
          <p className="mt-1 text-sm text-cream/80">
            A technology studio in Malaysia: software, SEO and consultancy.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {servicesNav?.children && (
            <div>
              <h3 className={headingClass}>{servicesNav.label}</h3>
              <ul className="mt-3">
                {servicesNav.children.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} className={linkClass}>
                      {child.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={servicesNav.href} className={linkClass}>
                    All services
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <div>
            <h3 className={headingClass}>Studio</h3>
            <ul className="mt-3">
              {footerStudioNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>Web design for</h3>
            <ul className="mt-3">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/web-design/${industry.slug}`}
                    className={linkClass}
                  >
                    {industry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>Say hello</h3>
            <ul className="mt-3">
              <li>
                <a href={mailtoLink} className={`${linkClass} break-all`}>
                  {site.email}
                </a>
              </li>
              {site.whatsappEnabled && (
                <li>
                  <a href={whatsappLink()} className={linkClass}>
                    WhatsApp {site.whatsappDisplay}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={site.seoPlatform.url}
                  target="_blank"
                  rel="noopener"
                  className={`${linkClass} gap-1`}
                >
                  {site.seoPlatform.signInLabel}
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Made in Malaysia. Grumpy about slow websites since day one.</p>
        </div>
      </Container>
    </footer>
  );
}
