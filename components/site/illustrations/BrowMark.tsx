import { SYMBOL_SHAPES } from "@/components/site/Logo";

type Props = {
  className?: string;
  /** Delay before the first shape appears, in ms */
  delay?: number;
};

/**
 * The symbol's four shapes (flat brow, raised brow, two eyes) assembling with
 * a staggered reveal. Pure CSS (`.brow-in` in globals.css), static under
 * prefers-reduced-motion. The expression never changes — only the entrance.
 * Decorative: used once, in the home hero.
 */
export function BrowMark({ className = "", delay = 150 }: Props) {
  // Eyes first, then the flat brow, then the raised brow — the reaction lands last.
  const order = [2, 3, 0, 1];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={`block h-auto ${className}`}
      aria-hidden="true"
    >
      {order.map((shapeIndex, i) => (
        <path
          key={shapeIndex}
          d={SYMBOL_SHAPES[shapeIndex]}
          className="brow-in fill-violet"
          style={{ animationDelay: `${delay + i * 140}ms` }}
        />
      ))}
    </svg>
  );
}
