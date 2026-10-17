"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Preserve bookmarks from the former HashRouter without keeping a second router. */
export default function LegacyHashRedirect() {
  const router = useRouter();
  useEffect(() => {
    function migrateHash() {
      const hash = window.location.hash;
      if (!hash.startsWith('#/') || hash.startsWith('#//')) return;
      const target = new URL(hash.slice(1), window.location.origin);
      if (target.origin !== window.location.origin) return;
      router.replace(target.pathname + target.search + target.hash);
    }
    migrateHash();
    window.addEventListener('hashchange', migrateHash);
    return () => window.removeEventListener('hashchange', migrateHash);
  }, [router]);
  return null;
}
