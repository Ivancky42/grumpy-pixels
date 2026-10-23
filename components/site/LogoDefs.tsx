import { SYMBOL_PATH, WORDMARK_PATH } from "@/components/site/Logo";

/**
 * The logo paths, defined once per page. Every `Logo` references them with
 * `<use href="#gp-symbol">` / `<use href="#gp-wordmark">`. Render once, in the
 * root layout. The paths carry no fill so each `<use>` sets its own tone.
 */
export function LogoDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      style={{ position: "absolute" }}
    >
      <defs>
        <path id="gp-symbol" d={SYMBOL_PATH} />
        <path id="gp-wordmark" d={WORDMARK_PATH} />
      </defs>
    </svg>
  );
}
