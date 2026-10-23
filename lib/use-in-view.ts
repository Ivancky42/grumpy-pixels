import { useEffect, useRef, useState, type RefObject } from "react";

type Options = {
  /** IntersectionObserver threshold (0–1). */
  threshold?: number;
  /** Called once, in the observer callback, when the element first enters view. */
  onEnter?: () => void;
};

/**
 * Reveal-once hook: observes the ref'd element until it first intersects,
 * then flips `inView` to true, calls `onEnter`, and stops observing.
 * Import from client components only.
 */
export function useInView<T extends HTMLElement>({
  threshold,
  onEnter,
}: Options = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const onEnterRef = useRef(onEnter);

  useEffect(() => {
    onEnterRef.current = onEnter;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          onEnterRef.current?.();
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
