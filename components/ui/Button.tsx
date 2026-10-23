import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors motion-reduce:transition-none min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet";

const variants: Record<Variant, string> = {
  primary: "bg-violet text-white hover:bg-violet-deep",
  secondary:
    "bg-white text-ink border border-ink/15 hover:border-violet hover:text-violet",
  ghost: "text-violet hover:text-ink underline-offset-4 hover:underline px-2",
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
