import { useSyncExternalStore } from 'react';

function subscribe(query: string) {
  return (onChange: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  };
}

/** Live media-query match (client-only SPA). */
export function useMedia(query: string) {
  return useSyncExternalStore(subscribe(query), () => window.matchMedia(query).matches, () => false);
}

/** Pinned scroll scenes only for wide screens with a fine pointer and no reduced-motion preference. */
export const PIN_QUERY = '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
export const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
