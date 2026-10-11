import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, Check, CircuitBoard, Plug, Ruler } from 'lucide-react';
import { Link } from 'react-router';
import BrandLabel from './BrandLabel';
import { HOME_CONTENT as H } from '../data/home';
import { CORE_SERVICE_IMAGES } from '../data/images';
import './EngineeringDetails.css';

const DETAILS = [
  {
    label: 'Function', icon: CircuitBoard,
    question: 'What does your equipment need to do?',
    text: 'Define the control or switching task, operating conditions and the behaviour your application requires.',
    point: [685, 395], line: 'M135 205H410L685 395',
  },
  {
    label: 'Interfaces', icon: Plug,
    question: 'How does the component connect?',
    text: 'Clarify the electrical and mechanical connections, cable routing and compatibility with the rest of your equipment.',
    point: [570, 640], line: 'M135 205H240V430L570 640',
  },
  {
    label: 'Installation', icon: Ruler,
    question: 'Where does it need to fit?',
    text: 'Work through the available space, mounting points and access for assembly or maintenance.',
    point: [927, 325], line: 'M135 205H590L927 325',
  },
];

export default function EngineeringDetails() {
  const content = H['custom-solutions'];
  const [active, setActive] = useState(0);
  const id = useId();
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const detail = DETAILS[active];

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    let next: number;
    if (event.key === 'ArrowRight') next = (active + 1) % DETAILS.length;
    else if (event.key === 'ArrowLeft') next = (active + DETAILS.length - 1) % DETAILS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = DETAILS.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    controls.current[next]?.focus();
  }

  return <div className="k-engineering" data-home-reveal>
    <div className="k-engineering-copy">
      <BrandLabel>In-house engineering</BrandLabel>
      <h2 className="h2-orig">{content.title}</h2>
      <p>{content.intro}</p>
      <ul>{content.bullets.map(bullet => <li key={bullet}>
        <Check size={18} strokeWidth={1.8} aria-hidden="true" /><span>{bullet}</span>
      </li>)}</ul>
      <Link to={content.cta.to} className="arrow-link">{content.cta.label}<ArrowRight size={20} aria-hidden="true" /></Link>
    </div>
    <div className="k-engineering-explorer">
      <figure className="k-engineering-figure">
        <div className="k-engineering-image">
          <img src={CORE_SERVICE_IMAGES[0]} width={1600} height={1063} alt="Illustrative OEM assembly with a controller, external connections and housing mounting points" loading="lazy" />
          <div className="k-engineering-annotation-label" aria-hidden="true"><span>0{active + 1} / Design considerations</span><strong>{detail.label}</strong></div>
          <svg key={detail.label} className="k-engineering-annotation" viewBox="0 0 1600 1063" fill="none" aria-hidden="true" focusable="false">
            <path d={detail.line} pathLength={1} vectorEffect="non-scaling-stroke" className="k-engineering-leader" />
            <circle cx={detail.point[0]} cy={detail.point[1]} r={20} vectorEffect="non-scaling-stroke" className="k-engineering-target" />
            <circle cx={detail.point[0]} cy={detail.point[1]} r={6} className="k-engineering-target-center" />
          </svg>
        </div>
        <figcaption>Illustrative OEM assembly. Specifications are defined for your application.</figcaption>
      </figure>
      <div className="k-engineering-tabs" role="tablist" aria-label="Explore engineering considerations" onKeyDown={handleKeys}>
        {DETAILS.map(({ label, icon: Icon }, index) => <button key={label} type="button" role="tab"
          id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={active === index}
          tabIndex={active === index ? 0 : -1} ref={element => { controls.current[index] = element; }} onClick={() => setActive(index)}>
          <Icon size={18} strokeWidth={1.6} aria-hidden="true" /><span>{label}</span>
        </button>)}
      </div>
      {DETAILS.map((item, index) => <div key={item.label} className="k-engineering-panel" role="tabpanel"
        id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} tabIndex={0}>
        <h3>{item.question}</h3><p>{item.text}</p>
      </div>)}
    </div>
  </div>;
}
