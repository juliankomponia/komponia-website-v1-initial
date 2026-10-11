import { useEffect, useRef } from 'react';

export default function useHomeReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('k-reveal-in');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    const targets = ref.current.querySelectorAll('[data-home-reveal], .section-lead, .komponia-signature');
    targets.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return ref;
}
