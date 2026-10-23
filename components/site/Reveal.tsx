"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/use-in-view";

type Props = {
  children: ReactNode;
  className?: string;
  threshold?: number;
};

/**
 * Holds every `.rise-in` descendant hidden until the wrapper first scrolls into
 * view, then lets their entrance animations run once (rules in globals.css).
 * Use for illustrations below the fold; hero scenes animate on load without it.
 */
export function Reveal({ children, className = "", threshold = 0.25 }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold });
  return (
    <div ref={ref} data-inview={inView} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
