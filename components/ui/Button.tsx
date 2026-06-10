import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors min-h-11";

const variants: Record<Variant, string> = {
  primary:
    "bg-purple text-white hover:bg-purple-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple",
  secondary:
    "bg-white text-navy border border-navy/15 hover:border-purple hover:text-purple-deep",
  ghost: "text-purple-deep hover:text-navy underline-offset-4 hover:underline px-2",
};

type Props = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const external = href.startsWith("http") || href.startsWith("mailto:");
  if (external) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
