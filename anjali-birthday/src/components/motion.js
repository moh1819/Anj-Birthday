export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Deterministic pseudo-random generator so decorative layouts are stable between renders. */
export function seeded(seed = 1) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

let lockCount = 0;
export function lockScroll() {
  lockCount += 1;
  document.documentElement.classList.add('scroll-locked');
}
export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) document.documentElement.classList.remove('scroll-locked');
}
