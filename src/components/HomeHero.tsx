import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type PointerEvent } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, Check, Pause, Play } from 'lucide-react';
import { HERO_CONTENT as H } from '../data/homepage';
import procurement from '../assets/hero-slides/procurement.jpg';
import engineered from '../assets/hero-slides/engineered.jpg';
import supplyChain from '../assets/hero-slides/supply-chain.jpg';
import series from '../assets/hero-slides/series.jpg';

const SLIDES = [
  { label: 'Procurement', image: procurement, alt: 'Illustrative technical procurement scene', width: 2000, height: 1116, ...H.slides.procurement },
  { label: 'Engineered', image: engineered, alt: 'Illustrative custom engineering scene', width: 1536, height: 1024, ...H.slides.engineered },
  { label: 'Supply chain', image: supplyChain, alt: 'Illustrative component supply scene', width: 2400, height: 1339, ...H.slides.supplyChain },
  { label: 'Series', image: series, alt: 'Illustrative recurring series supply scene', width: 2400, height: 1600, ...H.slides.series },
];
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeToMotionPreference(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

function serverMotionPreference() {
  return false;
}

export default function HomeHero() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [gesturing, setGesturing] = useState(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotionPreference, prefersReducedMotion, serverMotionPreference);
  const gestureStart = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion || hovered || focused || gesturing || paused) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') setActive(index => (index + 1) % SLIDES.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [active, reducedMotion, hovered, focused, gesturing, paused]);

  function handleGestureStart(event: PointerEvent<HTMLElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    const target = event.target;
    if (target instanceof Element && (target.closest('a, button') || (event.pointerType === 'mouse' && target.closest('.home-hero-copy')))) return;
    gestureStart.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
    setGesturing(true);
  }

  function handleGestureEnd(event: PointerEvent<HTMLElement>) {
    const start = gestureStart.current;
    if (!start || start.pointerId !== event.pointerId) return;
    gestureStart.current = null;
    setGesturing(false);
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      setActive(index => (index + (dx < 0 ? 1 : SLIDES.length - 1)) % SLIDES.length);
    }
  }

  function handleControlKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    let next: number;
    if (event.key === 'ArrowRight') next = (active + 1) % SLIDES.length;
    else if (event.key === 'ArrowLeft') next = (active + SLIDES.length - 1) % SLIDES.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = SLIDES.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    controls.current[next]?.focus();
  }

  return (
    <section className="home-hero home-hero--immersive" aria-labelledby="home-hero-title"
      onPointerDown={handleGestureStart} onPointerUp={handleGestureEnd}
      onPointerCancel={() => { gestureStart.current = null; setGesturing(false); }}
      onMouseEnter={() => { if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <figure id="home-hero-images" className="home-hero-media"
        role="group" aria-roledescription="carousel" aria-label="Komponia capabilities">
        {SLIDES.map((slide, index) => (
          <div key={slide.label} className="home-hero-slide" data-active={active === index} aria-hidden={active !== index}>
            <img src={slide.image} alt={slide.alt} width={slide.width} height={slide.height} draggable={false}
              loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'low'} />
          </div>
        ))}
      </figure>
      <div className="home-hero-panel">
        <div className="home-hero-copy"><div className="home-hero-copy-inner">
          <h1 id="home-hero-title" className="hero-title home-hero-copy-stack">
            {SLIDES.map((slide, index) => (
              <span key={slide.label} data-active={active === index} aria-hidden={active !== index}>
                {slide.title.split('\n').map(line => <span key={line} className="block">{line}</span>)}
              </span>
            ))}
          </h1>
          <div className="home-hero-control-row"><div className="home-hero-switcher" role="group" aria-label="Choose a capability" onKeyDown={handleControlKeys}>
            {SLIDES.map((slide, index) => (
              <button key={slide.label} type="button" ref={element => { controls.current[index] = element; }}
                className={active === index ? 'selected' : undefined} aria-pressed={active === index}
                aria-controls="home-hero-images home-hero-title home-hero-intro home-hero-details" onClick={() => setActive(index)}>{slide.label}</button>
            ))}
          </div>
          {!reducedMotion && <button type="button" className="home-hero-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}</button>}
          </div>
          <span className="sr-only" aria-live={focused ? 'polite' : 'off'}>{SLIDES[active].label}, {active + 1} of {SLIDES.length}</span>
          <div id="home-hero-intro" className="home-hero-copy-stack home-hero-intro-stack">
            {SLIDES.map((slide, index) => (
              <p key={slide.label} className="hero-intro"
                data-active={active === index} aria-hidden={active !== index}>{slide.intro}</p>
            ))}
          </div>
          <div id="home-hero-details" className="home-hero-copy-stack home-hero-details-stack">
            {SLIDES.map((slide, index) => (
              <ul key={slide.label} className="home-hero-points" data-active={active === index}
                aria-hidden={active !== index}>
                {slide.lines.map(line => <li key={line} className="home-hero-point">
                  <Check size={16} strokeWidth={1.8} aria-hidden="true" />
                  <span>{line}</span>
                </li>)}
              </ul>
            ))}
          </div>
          <div className="hero-actions">
            <Link to="/contact" className="btn-primary-l home-hero-primary">Prepare an inquiry <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link to="/components" className="btn-secondary-dark btn-l home-hero-secondary">Explore components <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </div></div>
      </div>
    </section>
  );
}
