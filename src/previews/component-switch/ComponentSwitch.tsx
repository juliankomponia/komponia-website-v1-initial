import { useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import type { ComponentPair } from '../../data/component-pairs';
import './component-switch.css';

type Mode = 'material' | 'scan' | 'slider' | 'fade';
type Drag = { id: number; x: number; y: number; start: number; width: number; active: boolean; vertical: boolean };
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => value < 0.5 ? 2 * value * value : 1 - (-2 * value + 2) ** 2 / 2;

export default function ComponentSwitch({ pair, mode = 'material' }: { pair: ComponentPair; mode?: Mode }) {
  const [progress, setProgress] = useState(0);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [loaded, setLoaded] = useState({ brand: false, real: false });
  const [failed, setFailed] = useState(false);
  const position = useRef(0);
  const destination = useRef(0);
  const animation = useRef(0);
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);
  const hovered = useRef(false);
  const stage = useRef<HTMLButtonElement>(null);
  const realImage = useRef<HTMLImageElement>(null);
  const hintId = useId();
  const ready = loaded.brand && loaded.real && !failed;
  const isReal = progress >= 0.5;
  const directory = `${import.meta.env.BASE_URL}components/${pair.slug}`;

  function update(value: number) {
    position.current = clamp(value);
    setProgress(position.current);
  }

  function animateTo(target: number) {
    cancelAnimationFrame(animation.current);
    destination.current = target;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      update(target);
      return;
    }
    const from = position.current;
    const duration = mode === 'material'
      ? Math.max(120, (target === 1 ? 620 : 480) * Math.abs(target - from))
      : 720;
    const start = performance.now();
    function step(now: number) {
      const elapsed = clamp((now - start) / duration);
      const eased = mode === 'material' ? 1 - (1 - elapsed) ** 3 : ease(elapsed);
      update(from + (target - from) * eased);
      if (elapsed < 1) animation.current = requestAnimationFrame(step);
    }
    animation.current = requestAnimationFrame(step);
  }

  function toggle() {
    if (ready) animateTo(destination.current === 1 ? 0 : 1);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        if (realImage.current) realImage.current.loading = 'eager';
        observer.disconnect();
      }
    }, { rootMargin: '300px' });
    if (stage.current) observer.observe(stage.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animation.current);
    };
  }, []);

  function setPointerOrigin(event: PointerEvent<HTMLButtonElement>) {
    // Preserve the reveal's centre when a transition reverses midway.
    if (position.current > 0 && position.current < 1) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    setOrigin({
      x: clamp((event.clientX - bounds.left) / bounds.width) * 100,
      y: clamp((event.clientY - bounds.top) / bounds.height) * 100,
    });
  }

  function pointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (!ready || !event.isPrimary || event.button !== 0 || event.pointerType === 'mouse') return;
    suppressClick.current = false;
    setPointerOrigin(event);
    drag.current = {
      id: event.pointerId, x: event.clientX, y: event.clientY,
      start: position.current, width: event.currentTarget.getBoundingClientRect().width,
      active: false, vertical: false,
    };
  }

  function pointerMove(event: PointerEvent<HTMLButtonElement>) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId || gesture.vertical) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.active) {
      if (Math.abs(dy) > 6 && Math.abs(dy) >= Math.abs(dx)) {
        gesture.vertical = true;
        suppressClick.current = true;
        return;
      }
      if (Math.abs(dx) <= 6 || Math.abs(dx) <= Math.abs(dy)) return;
      gesture.active = true;
      cancelAnimationFrame(animation.current);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    suppressClick.current = true;
    update(gesture.start + dx / gesture.width);
  }

  function endPointer(event: PointerEvent<HTMLButtonElement>, cancelled = false) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (gesture.active) animateTo(position.current >= 0.5 ? 1 : 0);
    if (cancelled || gesture.vertical) suppressClick.current = true;
  }

  const edge = progress * 140 - 20;
  const mask = mode === 'scan'
    ? `linear-gradient(135deg, #000 ${edge}%, transparent ${edge + 0.2}%)`
    : mode === 'slider'
      ? `linear-gradient(90deg, #000 ${progress * 100}%, transparent ${progress * 100}%)`
      : 'none';
  // Percentages are relative to the farthest corner, including an off-centre origin.
  const feather = 44;
  const inner = progress * (100 + feather) - feather;
  const radial = `circle farthest-corner at ${origin.x}% ${origin.y}%`;
  const realMask = `radial-gradient(${radial}, #000 ${inner}%, rgba(0,0,0,.95) ${inner + feather * .2}%, rgba(0,0,0,.5) ${inner + feather * .5}%, rgba(0,0,0,.05) ${inner + feather * .8}%, transparent ${inner + feather}%)`;
  const brandMask = `radial-gradient(${radial}, transparent ${inner}%, rgba(0,0,0,.05) ${inner + feather * .2}%, rgba(0,0,0,.5) ${inner + feather * .5}%, rgba(0,0,0,.95) ${inner + feather * .8}%, #000 ${inner + feather}%)`;
  const inTransition = progress > 0 && progress < 1;
  const materialMask = inTransition ? realMask : 'none';
  const brandStyle: CSSProperties | undefined = mode === 'material' ? {
    maskImage: inTransition ? brandMask : 'none',
    WebkitMaskImage: inTransition ? brandMask : 'none',
    opacity: progress === 1 ? 0 : 1,
  } : undefined;
  const realStyle: CSSProperties = mode === 'material' ? {
    maskImage: materialMask, WebkitMaskImage: materialMask, opacity: progress === 0 ? 0 : 1,
  } : {
    maskImage: mask, WebkitMaskImage: mask, opacity: mode === 'fade' ? progress : 1,
  };
  const lineStyle: CSSProperties = {
    opacity: mode === 'scan' && progress > 0 && progress < 1 ? 1 : 0,
    background: `linear-gradient(135deg, transparent ${edge - 2}%, rgba(62,90,245,.3) ${edge - 0.3}%, #3e5af5 ${edge}%, transparent ${edge + 1.2}%)`,
  };

  return (
    <div className="component-switch-demo">
      <figure className="component-switch" data-mode={mode} data-ready={ready}>
        <button
          ref={stage} type="button" className="component-switch__stage"
          aria-label={`${pair.name}: zwischen Komponia-Stil und realistischem Teil wechseln`}
          aria-pressed={isReal} aria-describedby={hintId} disabled={!ready}
          onPointerEnter={event => {
            hovered.current = event.pointerType === 'mouse';
            if (hovered.current && ready) {
              setPointerOrigin(event);
              animateTo(1);
            }
          }}
          onPointerDown={pointerDown} onPointerMove={pointerMove}
          onPointerUp={event => endPointer(event)}
          onPointerCancel={event => endPointer(event, true)}
          onLostPointerCapture={event => endPointer(event, true)}
          onPointerLeave={event => {
            if (!drag.current?.active) drag.current = null;
            if (event.pointerType === 'mouse') {
              hovered.current = false;
              if (ready) animateTo(0);
            }
          }}
          onClick={() => {
            if (hovered.current) return;
            if (suppressClick.current) { suppressClick.current = false; return; }
            toggle();
          }}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              if (!event.repeat) {
                suppressClick.current = false;
                if (position.current === 0 || position.current === 1) setOrigin({ x: 50, y: 50 });
                toggle();
              }
            }
          }}
        >
          <span className="component-switch__images">
          <span className="component-switch__layer" style={brandStyle}>
            <img src={`${directory}/brand.webp`} srcSet={`${directory}/brand-600.webp 600w, ${directory}/brand.webp 1200w`}
              sizes="(max-width: 720px) 90vw, 420px" width="1200" height="1200"
              alt={`${pair.name} im Komponia-Stil`} decoding="async" draggable={false}
              onLoad={() => setLoaded(current => ({ ...current, brand: true }))} onError={() => setFailed(true)} />
          </span>
          <span className="component-switch__layer" style={realStyle}>
            <img ref={realImage} src={`${directory}/real.webp`} srcSet={`${directory}/real-600.webp 600w, ${directory}/real.webp 1200w`}
              sizes="(max-width: 720px) 90vw, 420px" width="1200" height="1200"
              alt={`${pair.name}, realistische Darstellung`} decoding="async" loading="lazy" draggable={false}
              onLoad={() => setLoaded(current => ({ ...current, real: true }))} onError={() => setFailed(true)} />
          </span>
          </span>
          {mode === 'scan' && <span className="component-switch__line" style={lineStyle} aria-hidden="true" />}
          {mode === 'slider' && <span className="component-switch__handle" style={{ left: `${progress * 100}%` }} aria-hidden="true">‹ ›</span>}
          {!ready && <span className="component-switch__loading">{failed ? 'Das Bildpaar fehlt noch.' : 'Bilder werden geladen …'}</span>}
        </button>
        <figcaption className="component-switch__caption">
          <span>{pair.name}</span>
          <span className="component-switch__badge" data-real={isReal} aria-live="polite">{isReal ? 'Echt' : 'Komponia'}</span>
        </figcaption>
      </figure>
      <p id={hintId} className="component-switch__hint">Maus darüberhalten oder antippen <span aria-hidden="true">·</span> Tastatur: Enter oder Leertaste</p>
    </div>
  );
}
