import type { ReactNode } from "react";

type Tint = "white" | "lavender" | "blush" | "mint";

const tints: Record<Tint, string> = {
  white: "bg-white",
  lavender: "bg-lavender-soft",
  blush: "bg-blush/40",
  mint: "bg-mint/40",
};

export function Card({
  children,
  tint = "white",
  className = "",
}: {
  children: ReactNode;
  tint?: Tint;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-navy/8 p-6 shadow-soft sm:p-8 ${tints[tint]} ${className}`}
    >
      {children}
    </div>
  );
}
