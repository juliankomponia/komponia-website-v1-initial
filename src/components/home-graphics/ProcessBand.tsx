import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useGraphicMotion';
import './process-band.css';

const terms = ['CNC milling', 'Sheet metal', 'Sensors', 'Controllers', 'Connectors', 'Custom assemblies'];

export default function ProcessBand() {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => setVisible(entries.some(entry => entry.isIntersecting)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="kp-process-band" data-paused={paused || !visible || reducedMotion}>
    <div className="kp-process-band__top">
      <span>Components &amp; processes</span>
      {!reducedMotion && <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>
        {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        {paused ? 'Resume motion' : 'Pause motion'}
      </button>}
    </div>
    <p className="sr-only">{terms.join(', ')}.</p>
    <div className="kp-process-band__window" aria-hidden="true">
      <div className="kp-process-band__track">{[0, 1].map(copy => <div className="kp-process-band__set" key={copy}>
        {terms.map(term => <span key={term}>{term}<i /></span>)}
      </div>)}</div>
    </div>
  </div>;
}
