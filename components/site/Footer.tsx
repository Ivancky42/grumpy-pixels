import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { industries } from "@/lib/industries";
import { mailtoLink, site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-cream">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/brand/icon.png"
                alt=""
                width={36}
                height={36}
                className="pixelated rounded-lg"
              />
              <span className="font-display text-xl font-semibold">
                Grumpy <span className="text-lavender">Pixels</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-lavender">
              Fast websites. Happy users. A web design and development studio
              in Malaysia.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-lavender">
              Studio
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/#services" className="hover:text-lavender">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-lavender">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-lavender">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-lavender">
                  Process
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-lavender">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-lavender">
              Web design for
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/web-design/${industry.slug}`}
                    className="hover:text-lavender"
                  >
                    {industry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-lavender">
              Say hello
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {site.whatsappEnabled && (
                <li>
                  <a href={whatsappLink()} className="hover:text-lavender">
                    WhatsApp {site.whatsappDisplay}
                  </a>
                </li>
              )}
              <li>
                <a href={mailtoLink} className="hover:text-lavender">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-lavender/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Made in Malaysia. Grumpy about slow websites since day one.</p>
        </div>
      </Container>
    </footer>
  );
}
