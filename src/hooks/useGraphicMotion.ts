import { useCallback, useState, useSyncExternalStore, type RefCallback } from 'react';

const MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeToMotionPreference(onChange: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};

  const media = window.matchMedia(MOTION_QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function getMotionPreference() {
  return typeof window === 'undefined' || !window.matchMedia
    ? true
    : window.matchMedia(MOTION_QUERY).matches;
}

function getServerMotionPreference() {
  return true;
}

/** Live preference: switching reduced motion on also completes running reveals. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference,
  );
}

/**
 * A one-way reveal. The callback ref owns its observer and cleans it up when
 * detached; a revealed element never starts again on a later scroll.
 */
export function useRevealOnce<T extends HTMLElement>() {
  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  const ref: RefCallback<T> = useCallback((node: T | null) => {
    if (!node || revealed) return;

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, revealed]);

  return { ref, revealed: revealed || reducedMotion, reducedMotion };
}
