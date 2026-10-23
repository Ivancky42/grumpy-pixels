import type { ReactNode } from "react";
import { demoNav, demoWorkspace } from "@/lib/seo-demo";
import { site } from "@/lib/site";

/** Host only, e.g. "seo.grumpypixels.my" */
const host = new URL(site.seoPlatform.url).host;

type NavLabel =
  | (typeof demoNav.agency)[number]
  | (typeof demoNav.workspace)[number];

type FrameProps = {
  children: ReactNode;
  /** Show the app sidebar (from `sm`; it is always hidden on phones) */
  sidebar?: boolean;
  /** Sidebar item drawn as the current page */
  active?: NavLabel;
  className?: string;
};

/**
 * A browser/app window for the Grumpy Pixels SEO mockups: chrome bar with a
 * URL pill, the workspace sidebar and the content canvas. Purely visual — the
 * caller marks it `aria-hidden` and supplies an `sr-only` summary. Contains
 * no links, buttons or focusable elements.
 */
export function MockFrame({
  children,
  sidebar = true,
  active = "Overview",
  className = "",
}: FrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-ink/10 bg-white text-[11px] leading-snug text-ink shadow-lift ${className}`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-ink/8 bg-white px-3 py-2">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-ink/15" />
          ))}
        </div>
        <span className="mx-auto truncate rounded-full bg-cream px-3 py-0.5 text-[10px] text-ink-soft">
          {host}
        </span>
        <span className="w-[38px]" />
      </div>

      <div className="flex">
        {sidebar && (
          // The sidebar never sets the frame's height: the content column does,
          // and the nav list is clipped at the bottom like a real scrolled app.
          <div className="relative hidden w-36 shrink-0 border-r border-ink/8 bg-white sm:block">
            <div className="absolute inset-0 overflow-hidden p-2.5">
              <Sidebar active={active} />
            </div>
          </div>
        )}
        <div className="@container min-w-0 flex-1 bg-cream/70">
          <TopBar />
          <div className="p-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ active }: { active: NavLabel }) {
  return (
    <>
      <div className="flex items-center gap-2 rounded-xl border border-ink/8 p-1.5">
        <Initials />
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold">
            {demoWorkspace.name}
          </p>
          <p className="truncate text-[9px] text-ink-soft">
            {demoWorkspace.domain}
          </p>
        </div>
      </div>
      <NavGroup title="Agency" items={demoNav.agency} active={active} />
      <NavGroup title="Workspace" items={demoNav.workspace} active={active} />
    </>
  );
}

function NavGroup({
  title,
  items,
  active,
}: {
  title: string;
  items: readonly NavLabel[];
  active: NavLabel;
}) {
  return (
    <div className="mt-3">
      <p className="px-1.5 text-[9px] font-semibold uppercase tracking-wide text-ink-soft/80">
        {title}
      </p>
      <ul className="mt-1 space-y-px">
        {items.map((item) => {
          const on = item === active;
          return (
            <li
              key={item}
              className={`flex items-center gap-1.5 rounded-full px-1.5 py-[3px] text-[10px] ${
                on ? "bg-lavender-soft font-semibold text-violet" : "text-ink-soft"
              }`}
            >
              <span className="size-2.5 shrink-0 rounded-[3px] border-[1.5px] border-current opacity-70" />
              <span className="truncate">{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TopBar() {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-ink/8 bg-white px-3 py-2">
      <div className="min-w-0">
        <p className="truncate font-display text-xs font-bold">
          {demoWorkspace.name}
        </p>
        <p className="truncate text-[10px] text-ink-soft">
          {demoWorkspace.domain} · {demoWorkspace.market} ·{" "}
          {demoWorkspace.campaign}
        </p>
      </div>
      <p className="shrink-0 pt-0.5 text-[10px] text-ink-soft max-[420px]:hidden">
        {demoWorkspace.refreshed}
      </p>
    </div>
  );
}

/** Rounded initials tile for the demo workspace ("SD") */
export function Initials({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid size-6 shrink-0 place-items-center rounded-lg bg-violet text-[9px] font-bold text-white ${className}`}
    >
      {demoWorkspace.initials}
    </span>
  );
}

/** White rounded card on the mock canvas */
export function MockCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-ink/8 bg-white p-3 ${className}`}>
      {children}
    </div>
  );
}

/** Small card heading inside a mockup */
export function MockTitle({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-semibold text-ink">{children}</p>;
}

/** Tiny "SOURCE: …" footer line */
export function MockSource({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 truncate font-mono text-[10px] uppercase tracking-wide text-ink-soft/80">
      {children}
    </p>
  );
}

/** Delta pill: good news in lavender/violet with ↑, bad news in blush/ink with ↓ */
export function DeltaPill({ delta, good }: { delta: string; good: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-px text-[10px] font-semibold ${
        good ? "bg-lavender-soft text-violet" : "bg-blush text-ink"
      }`}
    >
      <span>{good ? "↑" : "↓"}</span>
      {delta}
    </span>
  );
}

/** Rounded status chip */
export function Chip({
  children,
  tone = "lavender",
}: {
  children: ReactNode;
  tone?: "lavender" | "blush" | "white" | "violet";
}) {
  const cls = {
    lavender: "bg-lavender-soft text-violet",
    blush: "bg-blush text-ink",
    white: "bg-white text-violet ring-1 ring-inset ring-ink/10",
    violet: "bg-violet text-white",
  }[tone];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${cls}`}
    >
      {children}
    </span>
  );
}
