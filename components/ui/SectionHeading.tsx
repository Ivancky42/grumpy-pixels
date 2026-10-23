import type { ReactNode } from "react";

/** Shared eyebrow type style; add the colour (`text-violet` or `text-cream/70`) at the call site. */
export const eyebrowClass = "text-xs font-semibold uppercase tracking-[0.18em]";

export function Eyebrow({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`${eyebrowClass} ${dark ? "text-cream/70" : "text-violet"} ${className}`}
    >
      {children}
    </p>
  );
}

type Props = {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  dark = false,
}: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <Eyebrow dark={dark} className="mb-3">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={`font-display text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lede && (
        <p className={`mt-4 text-lg ${dark ? "text-cream/80" : "text-ink-soft"}`}>
          {lede}
        </p>
      )}
    </div>
  );
}
