/** True when the visitor asked the OS for reduced motion. Browser only. */
export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
