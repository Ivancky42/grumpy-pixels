"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#industries", label: "Industries" },
  { href: "/#process", label: "Process" },
];

const mobileNav = [{ href: "/", label: "Home" }, ...nav];

const standalonePaths = new Set(["/", "/work"]);

function isStandalonePage(href: string) {
  const path = href.split("#")[0] || "/";
  return standalonePaths.has(path);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const scrollToTopPath = useRef<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (scrollToTopPath.current !== pathname) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    scrollToTopPath.current = null;
  }, [pathname]);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    if (!isStandalonePage(href)) return;

    const path = href.split("#")[0] || "/";

    if (pathname === path) {
      e.preventDefault();
      window.history.replaceState(null, "", path);
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    scrollToTopPath.current = path;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 md:border-b md:border-navy/8 md:bg-cream/90 md:backdrop-blur ${
          open ? "border-transparent bg-transparent" : "border-b border-navy/8 bg-cream/90 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            scroll={false}
            className="flex items-center gap-2.5"
            onClick={(e) => handleNavClick(e, "/")}
          >
            <Image
              src="/brand/icon.png"
              alt=""
              width={36}
              height={36}
              className="pixelated rounded-lg"
              priority
            />
            <span
              className={`font-display text-xl font-semibold leading-none transition-colors duration-300 ${
                open ? "text-cream" : "text-navy"
              }`}
            >
              Grumpy{" "}
              <span className={open ? "text-lavender" : "text-purple-deep"}>
                Pixels
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-navy-soft transition-colors hover:text-purple-deep"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="rounded-full bg-purple px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-deep"
            >
              Let&apos;s talk
            </Link>
          </nav>

          <button
            type="button"
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 md:hidden ${
              open ? "text-cream" : "text-navy"
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-transform duration-300 ease-out motion-reduce:transition-none"
              style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col bg-navy px-6 pb-10 pt-24 transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden ${
          open
            ? "pointer-events-auto translate-y-0"
            : "pointer-events-none -translate-y-full"
        }`}
      >
        <div className="flex flex-1 flex-col justify-center gap-1">
          {mobileNav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              scroll={isStandalonePage(item.href) ? false : undefined}
              tabIndex={open ? 0 : -1}
              style={{
                transitionDelay: open ? `${120 + i * 55}ms` : "0ms",
              }}
              className={`block rounded-xl px-3 py-3 font-display text-3xl font-semibold text-cream transition-all duration-300 ease-out motion-reduce:transition-none hover:text-lavender ${
                open
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/#contact"
          tabIndex={open ? 0 : -1}
          style={{
            transitionDelay: open ? `${120 + mobileNav.length * 55}ms` : "0ms",
          }}
          className={`block rounded-full bg-purple px-5 py-4 text-center text-base font-semibold text-white transition-all duration-300 ease-out motion-reduce:transition-none hover:bg-purple-deep ${
            open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          onClick={() => setOpen(false)}
        >
          Let&apos;s talk
        </Link>
      </nav>
    </>
  );
}
