import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from '../../hooks/useGraphicMotion';
import './exploded-assembly.css';

const COMPACT_QUERY = '(max-width: 767px)';

function subscribeToCompactView(onChange: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const media = window.matchMedia(COMPACT_QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function getCompactView() {
  return typeof window === 'undefined' || !window.matchMedia
    ? true
    : window.matchMedia(COMPACT_QUERY).matches;
}

function getServerCompactView() {
  return true;
}

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function ease(value: number) {
  return value * value * (3 - 2 * value);
}

type AssemblyView = 'exploded' | 'assembled';

/**
 * Advances once through assembled → separated → assembled as the figure crosses
 * the viewport. The DOM receives only a transform/opacity variable; scroll never
 * triggers React renders. Selecting either view detaches the scroll listener.
 */
function useAssemblyProgress(manualView: AssemblyView | null) {
  const ref = useRef<HTMLDivElement>(null);
  const maximumProgress = useRef(0);
  const reducedMotion = useReducedMotion();
  const compact = useSyncExternalStore(subscribeToCompactView, getCompactView, getServerCompactView);
  const staticView = reducedMotion || compact;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (manualView || staticView) {
      const view = manualView ?? (reducedMotion ? 'assembled' : 'exploded');
      element.style.setProperty('--assembly-spread', view === 'assembled' ? '0' : '1');
      return;
    }

    let frame = 0;
    let finished = maximumProgress.current === 1;

    function requestUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    function detach() {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    }

    function update() {
      frame = 0;
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = clamp((viewport * .85 - bounds.top) / (bounds.height + viewport * .6));
      maximumProgress.current = Math.max(maximumProgress.current, progress);
      const position = maximumProgress.current;
      const spread = ease(position <= .5 ? position * 2 : (1 - position) * 2);
      element.style.setProperty('--assembly-spread', spread.toFixed(4));
      if (position === 1) {
        finished = true;
        detach();
      }
    }

    update();
    if (!finished) {
      window.addEventListener('scroll', requestUpdate, { passive: true });
      window.addEventListener('resize', requestUpdate, { passive: true });
    }

    return () => {
      detach();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [manualView, staticView, reducedMotion]);

  return { ref, staticView, reducedMotion };
}

const parts = [
  { label: 'Housing', detail: 'Enclosure and mounting interfaces.' },
  { label: 'Circuit board', detail: 'Control and electrical connections.' },
  { label: 'Sensor', detail: 'Input from the application.' },
  { label: 'Connector', detail: 'Interface to the wider assembly.' },
];

function Callout({ number, x, y, path }: { number: string; x: number; y: number; path: string }) {
  return <g className="kp-assembly__callout">
    <path d={path} />
    <circle cx={x} cy={y} r="16" />
    <text x={x} y={y} dominantBaseline="central" textAnchor="middle">{number}</text>
  </g>;
}

export default function ExplodedAssembly() {
  const [manualView, setManualView] = useState<AssemblyView | null>(null);
  const { ref, staticView, reducedMotion } = useAssemblyProgress(manualView);
  const selectedView = manualView ?? (staticView ? reducedMotion ? 'assembled' : 'exploded' : null);
  const id = useId();

  return <figure className="kp-assembly">
    <div className="kp-assembly__heading">
      <span>Material. Geometry. Function.</span>
      <span>Assembly study</span>
    </div>
    <div
      ref={ref}
      id={id}
      className="kp-assembly__stage"
      data-static={staticView}
      data-reduced-motion={reducedMotion}
      data-manual={manualView !== null}
      role="img"
      aria-label="Illustrative assembly of a housing, circuit board, sensor and connector. The numbered parts are described below."
    >
      <svg viewBox="0 0 560 400" aria-hidden="true" focusable="false">
        <path className="kp-assembly__datum" d="M280 34V374M42 225H512" />
        <g className="kp-assembly__part kp-assembly__housing">
          <path className="kp-assembly__face" d="M165 225V280L280 343V288Z" />
          <path className="kp-assembly__face kp-assembly__face--shade" d="M395 225V280L280 343V288Z" />
          <path className="kp-assembly__face" d="M165 225L280 162L395 225L280 288Z" />
          <path className="kp-assembly__well" d="M188 225L280 175L372 225L280 275Z" />
          <path d="M188 225V244L280 294L372 244V225M280 275V294" />
          <ellipse cx="178" cy="225" rx="4" ry="2.5" />
          <ellipse cx="280" cy="168" rx="4" ry="2.5" />
          <ellipse cx="382" cy="225" rx="4" ry="2.5" />
          <ellipse cx="280" cy="282" rx="4" ry="2.5" />
          <Callout number="01" x={440} y={332} path="M395 278H440V316" />
        </g>
        <g className="kp-assembly__part kp-assembly__board">
          <path className="kp-assembly__board-edge" d="M185 224V230L280 282L375 230V224L280 276Z" />
          <path className="kp-assembly__board-face" d="M185 224L280 172L375 224L280 276Z" />
          <path d="M204 224L240 244L260 233M298 233L321 246L351 230M280 194V183M241 204L226 212M320 203L335 212" />
          <path className="kp-assembly__chip" d="M252 219L280 203L308 219L280 235Z" />
          <path d="M261 214L252 209M269 209L260 204M291 209L300 204M299 214L308 209M261 224L252 229M269 229L260 234M291 229L300 234M299 224L308 229" />
          <Callout number="02" x={194} y={145} path="M280 172V145H210" />
        </g>
        <g className="kp-assembly__part kp-assembly__sensor">
          <path className="kp-assembly__face" d="M305 144V186C305 194 327 194 327 186V144Z" />
          <ellipse className="kp-assembly__face" cx="316" cy="144" rx="11" ry="6" />
          <path d="M305 181C305 189 327 189 327 181M312 192V222L316 226L320 222V192" />
          <Callout number="03" x={363} y={118} path="M327 154H363V134" />
        </g>
        <g className="kp-assembly__part kp-assembly__connector">
          <path className="kp-assembly__face" d="M208 214L232 201L256 214L232 228Z" />
          <path className="kp-assembly__face" d="M208 214V244L232 258V228Z" />
          <path className="kp-assembly__face kp-assembly__face--shade" d="M256 214V244L232 258V228Z" />
          <path className="kp-assembly__contact" d="M215 232V247M223 237V252M239 238V253M247 233V248" />
          <Callout number="04" x={180} y={285} path="M208 238H180V269" />
        </g>
      </svg>
    </div>
    <div className="kp-assembly__controls" role="group" aria-label="Assembly view">
      <button
        type="button"
        aria-controls={id}
        aria-pressed={selectedView === 'exploded'}
        onClick={() => setManualView('exploded')}
      >Exploded view</button>
      <button
        type="button"
        aria-controls={id}
        aria-pressed={selectedView === 'assembled'}
        onClick={() => setManualView('assembled')}
      >Assembled view</button>
    </div>
    <ol className="kp-assembly__parts">
      {parts.map((part, index) => <li key={part.label}>
        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <div><strong>{part.label}</strong><p>{part.detail}</p></div>
      </li>)}
    </ol>
    <figcaption>Illustrative assembly schematic. Parts and interfaces depend on the application.</figcaption>
  </figure>;
}
