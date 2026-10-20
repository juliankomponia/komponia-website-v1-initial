import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useLocation } from 'react-router';
import './PageSections.css';

type SectionLink = { id: string; label: string };
type NavigationState = { pathname: string; items: SectionLink[]; activeId: string };

function sectionId(label: string, index: number) {
  const slug = label.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `page-section-${slug || index + 1}`;
}

function collectSections() {
  const labeled = Array.from(document.querySelectorAll<HTMLElement>('main section[data-section-label]'));
  const candidates = labeled.length > 0
    ? labeled
    : Array.from(document.querySelectorAll<HTMLElement>('main section')).filter((section) => {
      const heading = section.querySelector('h2');
      return heading?.closest('section') === section;
    });
  const seen = new Set<string>();
  const sections: { element: HTMLElement; link: SectionLink }[] = [];

  for (const section of candidates) {
    const label = (section.dataset.sectionLabel ?? section.querySelector('h2')?.textContent ?? '').trim();
    if (!label || section.hidden || seen.has(label)) continue;
    seen.add(label);

    if (!section.id) {
      const baseId = sectionId(label, sections.length);
      let id = baseId;
      let suffix = 2;
      while (document.getElementById(id)) id = `${baseId}-${suffix++}`;
      section.id = id;
    }
    section.dataset.pageSectionTarget = 'true';
    sections.push({ element: section, link: { id: section.id, label } });
    if (sections.length === 8) break;
  }
  return sections;
}

export default function PageSections() {
  const { pathname } = useLocation();
  const bar = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [navigation, setNavigation] = useState<NavigationState>({ pathname: '', items: [], activeId: '' });
  const current = navigation.pathname === pathname ? navigation : null;
  const activeId = current?.activeId;

  useEffect(() => {
    let disposed = false;
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let scanned: ReturnType<typeof collectSections> = [];

    function updateActive() {
      if (disposed || scanned.length < 2) return;
      const offset = 64 + (bar.current?.offsetHeight ?? 56) + 16;
      const passed = scanned.filter(({ element }) => element.getBoundingClientRect().top <= offset + 1);
      const active = passed.at(-1) ?? scanned[0];
      setNavigation((previous) => previous.pathname !== pathname || previous.activeId === active.link.id
        ? previous
        : { ...previous, activeId: active.link.id });
    }

    function scheduleUpdate() {
      if (frame || disposed) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActive();
      });
    }

    // Read the completed route DOM, then subscribe to browser layout/scroll events.
    // The cleanup guard also cancels the first StrictMode effect's pending work.
    queueMicrotask(() => {
      if (disposed) return;
      scanned = collectSections();
      setNavigation({ pathname, items: scanned.map(({ link }) => link), activeId: scanned[0]?.link.id ?? '' });
      if (scanned.length < 2) return;

      observer = new IntersectionObserver(scheduleUpdate, {
        rootMargin: '-120px 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 1],
      });
      scanned.forEach(({ element }) => observer?.observe(element));
      window.addEventListener('scroll', scheduleUpdate, { passive: true });
      window.addEventListener('resize', scheduleUpdate);
      scheduleUpdate();
    });

    return () => {
      disposed = true;
      observer?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      scanned.forEach(({ element }) => { delete element.dataset.pageSectionTarget; });
    };
  }, [pathname]);

  useEffect(() => {
    const element = list.current;
    const activeLink = element?.querySelector<HTMLAnchorElement>('[aria-current="location"]');
    if (!activeId || !element || !activeLink) return;

    const viewport = element.getBoundingClientRect();
    const link = activeLink.getBoundingClientRect();
    // Move only this horizontal list; avoid moving the page or adding motion.
    if (link.width > element.clientWidth || link.left < viewport.left) {
      element.scrollLeft += link.left - viewport.left;
    } else if (link.right > viewport.right) {
      element.scrollLeft += link.right - viewport.right;
    }
  }, [activeId]);

  function jumpToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    setNavigation((previous) => ({ ...previous, activeId: id }));
  }

  if (!current || current.items.length < 2) return null;

  return (
    <nav ref={bar} className="page-sections" aria-label="On this page">
      <div className="site-shell page-sections__inner">
        <ul ref={list} className="page-sections__list">
          {current.items.map(({ id, label }) => (
            <li key={id} className="page-sections__item">
              <a
                href={`#${id}`}
                className="page-sections__link"
                aria-current={current.activeId === id ? 'location' : undefined}
                onClick={(event) => jumpToSection(event, id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
