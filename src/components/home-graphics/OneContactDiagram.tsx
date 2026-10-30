import { useEffect, useState } from 'react';
import { useRevealOnce } from '../../hooks/useGraphicMotion';
import { HOME_CONTENT as H } from '../../data/home-stand2';
import './one-contact.css';

const C = H['one-contact'];
type Mode = 'without' | 'with';
/** Vertical centres of the five task nodes, in percent of the canvas height. */
const ROWS = [8.5, 29.25, 50, 70.75, 91.5];
const COMPANY_X = 22;
const HUB_LEFT = 28;
const HUB_RIGHT = 52;
const NODE_X = 58;

/**
 * One canvas, two states. On first view it shows the customer coordinating every party,
 * then reorganises once around one Komponia contact. The switch lets visitors compare.
 */
export default function OneContactDiagram() {
  const { ref, revealed, reducedMotion } = useRevealOnce<HTMLElement>();
  const [mode, setMode] = useState<Mode>(reducedMotion ? 'with' : 'without');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!revealed || touched || reducedMotion) return;
    const timer = window.setTimeout(() => setMode('with'), 1800);
    return () => window.clearTimeout(timer);
  }, [revealed, touched, reducedMotion]);

  const choose = (next: Mode) => { setTouched(true); setMode(next); };

  return <figure ref={ref} className="kp-contact" data-mode={mode} data-revealed={revealed}>
    <div className="kp-contact__switch" role="group" aria-label="Compare coordination">
      {(['without', 'with'] as const).map(item => <button key={item} type="button" aria-pressed={mode === item} onClick={() => choose(item)}>
        {item === 'with' ? C.with : C.without}
      </button>)}
    </div>
    <div className="kp-contact__canvas">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <g className="kp-contact__tangle">
          {ROWS.map(y => <path key={y} d={`M${COMPANY_X} 50L${NODE_X} ${y}`} />)}
          <path d={`M${NODE_X} ${ROWS[0]}C${NODE_X - 8} 20 ${NODE_X - 8} 60 ${NODE_X} ${ROWS[3]}`} />
          <path d={`M${NODE_X} ${ROWS[1]}C${NODE_X - 12} 45 ${NODE_X - 6} 80 ${NODE_X} ${ROWS[4]}`} />
        </g>
        <g className="kp-contact__ordered">
          <path className="kp-contact__trunk" d={`M${COMPANY_X} 50H${HUB_LEFT}`} />
          {ROWS.map((y, i) => <path key={y} style={{ ['--i' as string]: i }} d={`M${HUB_RIGHT} 50H55V${y}H${NODE_X}`} />)}
        </g>
      </svg>
      <span className="kp-contact__company">{C.company}</span>
      <span className="kp-contact__hub" aria-hidden={mode === 'without'}><strong>Komponia</strong><span>one contact</span></span>
      <ul className="kp-contact__nodes">
        {C.nodes.map((node, i) => <li key={node} style={{ ['--i' as string]: i }}>{node}</li>)}
      </ul>
    </div>
    <p className="kp-contact__note" aria-live="polite">{mode === 'with' ? C.noteWith : C.noteWithout}</p>
    <figcaption>Schematic. Manufacturers, partners and scope are agreed for each project.</figcaption>
  </figure>;
}
