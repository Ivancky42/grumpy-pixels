"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/site/Logo";
import { eyebrowClass } from "@/components/ui/SectionHeading";
import { ctaNav, mainNav, standalonePaths, type NavItem } from "@/lib/navigation";

function pathOf(href: string) {
  return href.split("#")[0] || "/";
}

function isStandalonePage(href: string) {
  return standalonePaths.has(pathOf(href));
}

/** Current section: the pathname sits at or under the item's route ("/" never matches). */
function isCurrentSection(pathname: string, href: string) {
  const path = pathOf(href);
  if (path === "/") return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}

const HOVER_CLOSE_DELAY_MS = 150;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  const scrollToTopPath = useRef<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const hoverCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = useRef(false);
  const dropdownId = useId();

  // Close both menus on route change (state adjusted during render, not in an effect).
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
    setDropdownOpen(false);
  }

  // Mobile menu: lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Mobile menu: Escape closes and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Mobile menu: close when the viewport grows to desktop (the overlay is md:hidden).
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  // Desktop dropdown: close on outside pointer down.
  useEffect(() => {
    if (!dropdownOpen) return;
    const onPointerDown = (e: globalThis.PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [dropdownOpen]);

  // Desktop dropdown: Escape closes (whether opened by hover, click or keyboard)
  // and returns focus to the trigger.
  useEffect(() => {
    if (!dropdownOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setDropdownOpen(false);
      openedByHover.current = false;
      dropdownButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dropdownOpen]);

  // Clear any pending hover-close timer on unmount.
  useEffect(() => {
    return () => {
      if (hoverCloseTimer.current) clearTimeout(hoverCloseTimer.current);
    };
  }, []);

  useEffect(() => {
    if (scrollToTopPath.current !== pathname) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    scrollToTopPath.current = null;
  }, [pathname]);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    setDropdownOpen(false);
    if (!isStandalonePage(href)) return;

    const path = pathOf(href);

    if (pathname === path) {
      e.preventDefault();
      window.history.replaceState(null, "", path);
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    scrollToTopPath.current = path;
  };

  const cancelHoverClose = () => {
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  };

  const onDropdownPointerEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    cancelHoverClose();
    if (!dropdownOpen) {
      openedByHover.current = true;
      setDropdownOpen(true);
    }
  };

  const onDropdownPointerLeave = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    cancelHoverClose();
    hoverCloseTimer.current = setTimeout(() => {
      setDropdownOpen(false);
      openedByHover.current = false;
    }, HOVER_CLOSE_DELAY_MS);
  };

  const onDropdownButtonClick = () => {
    cancelHoverClose();
    // A click right after hover-open should keep the panel open, not toggle it shut.
    if (dropdownOpen && openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    openedByHover.current = false;
    setDropdownOpen((v) => !v);
  };

  const onDropdownBlur = (e: FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && dropdownRef.current?.contains(next)) return;
    // Focus moved elsewhere on the page (Tab past the last row, Shift+Tab before the button).
    if (next) {
      setDropdownOpen(false);
      openedByHover.current = false;
    }
  };

  const renderDesktopItem = (item: NavItem) => {
    const current = isCurrentSection(pathname, item.href);
    const tone = current ? "text-ink" : "text-ink-soft";

    if (!item.children) {
      return (
        <Link
          key={item.href}
          href={item.href}
          scroll={isStandalonePage(item.href) ? false : undefined}
          aria-current={pathname === pathOf(item.href) ? "page" : undefined}
          className={`text-sm font-semibold transition-colors duration-200 hover:text-violet motion-reduce:transition-none ${tone}`}
          onClick={(e) => handleNavClick(e, item.href)}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <div
        key={item.href}
        ref={dropdownRef}
        className="relative"
        onPointerEnter={onDropdownPointerEnter}
        onPointerLeave={onDropdownPointerLeave}
        onBlur={onDropdownBlur}
      >
        <button
          ref={dropdownButtonRef}
          type="button"
          aria-expanded={dropdownOpen}
          aria-controls={dropdownId}
          className={`flex h-11 items-center gap-1 text-sm font-semibold transition-colors duration-200 hover:text-violet motion-reduce:transition-none ${
            dropdownOpen ? "text-violet" : tone
          }`}
          onClick={onDropdownButtonClick}
        >
          {item.label}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`transition-transform duration-200 motion-reduce:transition-none ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>

        {/* pt-2 bridges the gap so the pointer can travel from button to panel */}
        <div
          id={dropdownId}
          className={`absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-2 transition duration-200 ease-out motion-reduce:transition-none ${
            dropdownOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-1 opacity-0"
          }`}
        >
          <ul className="rounded-3xl border border-ink/8 bg-white p-2 shadow-lift">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  scroll={isStandalonePage(child.href) ? false : undefined}
                  aria-current={pathname === child.href ? "page" : undefined}
                  className="block rounded-2xl px-4 py-3 transition-colors duration-200 hover:bg-lavender-soft focus-visible:bg-lavender-soft motion-reduce:transition-none"
                  onClick={(e) => handleNavClick(e, child.href)}
                >
                  <span className="block text-sm font-semibold text-ink">
                    {child.label}
                  </span>
                  <span className="mt-0.5 block text-sm text-ink-soft">
                    {child.description}
                  </span>
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-ink/8 pt-1">
              <Link
                href={item.href}
                scroll={isStandalonePage(item.href) ? false : undefined}
                aria-current={pathname === item.href ? "page" : undefined}
                className="flex min-h-11 items-center rounded-2xl px-4 py-2 text-sm font-semibold text-violet transition-colors duration-200 hover:bg-lavender-soft focus-visible:bg-lavender-soft motion-reduce:transition-none"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                All services <span aria-hidden="true">&nbsp;→</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  // Mobile overlay rows, flattened so the stagger delay runs top to bottom.
  const mobileRows: (
    | { kind: "link"; href: string; label: string; size: "lg" | "sm" }
    | { kind: "eyebrow"; label: string }
  )[] = [{ kind: "link", href: "/", label: "Home", size: "lg" }];
  for (const item of mainNav) {
    if (item.children) {
      mobileRows.push({ kind: "eyebrow", label: item.label });
      for (const child of item.children) {
        mobileRows.push({ kind: "link", href: child.href, label: child.label, size: "sm" });
      }
      mobileRows.push({ kind: "link", href: item.href, label: "All services", size: "sm" });
    } else {
      mobileRows.push({ kind: "link", href: item.href, label: item.label, size: "lg" });
    }
  }

  const stagger = (i: number) => ({
    transitionDelay: open ? `${120 + i * 45}ms` : "0ms",
  });
  const reveal = open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0";

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 motion-reduce:transition-none md:border-b md:border-ink/8 md:bg-cream/90 md:backdrop-blur ${
          open
            ? "border-transparent bg-transparent"
            : "border-b border-ink/8 bg-cream/90 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
          <Link
            href="/"
            scroll={false}
            className="-m-2 flex shrink-0 items-center rounded-md p-2"
            onClick={(e) => handleNavClick(e, "/")}
          >
            <Logo
              tone={open ? "reversed" : "color"}
              className="h-7 sm:h-8"
              title="Grumpy Pixels — home"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {mainNav.map(renderDesktopItem)}
            <Link
              href={ctaNav.href}
              className="rounded-full bg-violet px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-violet-deep motion-reduce:transition-none"
              onClick={() => {
                setOpen(false);
                setDropdownOpen(false);
              }}
            >
              {ctaNav.label}
            </Link>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 motion-reduce:transition-none md:hidden ${
              open ? "text-cream" : "text-ink"
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
              aria-hidden="true"
              className={`transition-transform duration-300 ease-out motion-reduce:transition-none ${
                open ? "rotate-90" : "rotate-0"
              }`}
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
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-6 pb-10 pt-24 transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden ${
          open ? "translate-y-0" : "pointer-events-none -translate-y-full"
        }`}
      >
        <ul className="my-auto flex flex-col">
          {mobileRows.map((row, i) =>
            row.kind === "eyebrow" ? (
              <li
                key={`eyebrow-${row.label}`}
                style={stagger(i)}
                className={`px-3 pb-1 pt-4 ${eyebrowClass} text-cream/70 transition-all duration-300 ease-out motion-reduce:transition-none ${reveal}`}
              >
                {row.label}
              </li>
            ) : (
              <li key={row.href}>
                <Link
                  href={row.href}
                  scroll={isStandalonePage(row.href) ? false : undefined}
                  aria-current={pathname === row.href ? "page" : undefined}
                  style={stagger(i)}
                  className={`flex min-h-11 w-full items-center rounded-xl px-3 font-display font-semibold text-cream transition-all duration-300 ease-out hover:text-cream/80 motion-reduce:transition-none ${
                    row.size === "lg" ? "py-3 text-3xl" : "py-2 text-xl"
                  } ${reveal}`}
                  onClick={(e) => handleNavClick(e, row.href)}
                >
                  {row.label}
                </Link>
              </li>
            ),
          )}
        </ul>
        <Link
          href={ctaNav.href}
          style={stagger(mobileRows.length)}
          className={`mt-8 block rounded-full bg-violet px-5 py-4 text-center text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-violet-deep motion-reduce:transition-none ${reveal}`}
          onClick={() => setOpen(false)}
        >
          {ctaNav.label}
        </Link>
      </nav>
    </>
  );
}
