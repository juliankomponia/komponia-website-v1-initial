import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

/** Keep below-the-fold SVG code out of the initial download; reserve space in CSS. */
export default function DeferredGraphic({ children, className = '', label }: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) {
      const frame = requestAnimationFrame(() => setNearby(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setNearby(true);
        observer.disconnect();
      }
    }, { rootMargin: '600px 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const fallback = label ? <span className="sr-only">{label}</span> : null;
  return <div ref={ref} className={`kp-deferred-graphic ${className}`.trim()}>
    {nearby ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
  </div>;
}
