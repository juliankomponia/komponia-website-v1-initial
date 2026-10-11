import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, Box, DraftingCompass, Repeat2, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router';
import BrandLabel from './BrandLabel';
import { HOME_CONTENT as H } from '../data/home';
import { INDUSTRIAL_IMAGES as I } from '../data/images';
import './InquiryGuide.css';

type StartingPoint = {
  label: string;
  hint: string;
  title: string;
  icon: LucideIcon;
  image: string;
  alt: string;
  items: { title: string; text: string }[];
  type: string;
  cta: string;
};

const STARTING_POINTS: StartingPoint[] = [
  {
    label: 'I need a component', hint: 'Part number or specification',
    title: 'Find the right fit.', icon: Box, image: I.controllers,
    alt: 'Illustrative electronic controller', type: 'component', cta: 'Prepare a component inquiry',
    items: [
      { title: 'The reference', text: 'Part number, datasheet or the function you need.' },
      { title: 'The application', text: 'Operating conditions, connections and installation space.' },
      { title: 'The requirement', text: 'Quantity, preferred delivery date and required documents.' },
    ],
  },
  {
    label: 'I have a custom project', hint: 'Drawing, sketch or idea',
    title: 'Define the next version.', icon: DraftingCompass, image: I.customEngineering,
    alt: 'Illustrative custom housing and technical drawing', type: 'custom', cta: 'Prepare a development inquiry',
    items: [
      { title: 'The starting point', text: 'An existing part, a sketch or a description of your idea.' },
      { title: 'The constraints', text: 'Function, geometry, materials and known interfaces.' },
      { title: 'The next step', text: 'Prototype needs, sample checks and intended series demand.' },
    ],
  },
  {
    label: 'I plan repeat supply', hint: 'Forecast or recurring demand',
    title: 'Connect stock to demand.', icon: Repeat2, image: I.ongoingSupply,
    alt: 'Illustrative components arranged for recurring supply', type: 'supply', cta: 'Prepare a supply inquiry',
    items: [
      { title: 'The component', text: 'Your approved reference and current supply arrangement.' },
      { title: 'The demand', text: 'Expected consumption, delivery rhythm and known changes.' },
      { title: 'The agreement', text: 'Stock limits, call-off quantities and responsibilities to clarify.' },
    ],
  },
];

export default function InquiryGuide() {
  const [active, setActive] = useState(0);
  const id = useId();
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const point = STARTING_POINTS[active];

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    const direction = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
    if (!direction && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? STARTING_POINTS.length - 1
      : (active + direction + STARTING_POINTS.length) % STARTING_POINTS.length;
    setActive(next);
    controls.current[next]?.focus();
  }

  return <div className="k-inquiry" data-home-reveal>
    <div className="k-inquiry-copy">
      <BrandLabel>Your starting point</BrandLabel>
      <h2 className="h2-orig">{H.inquiry.title}</h2>
      <p className="k-inquiry-intro">{H.inquiry.intro}</p>
      <div className="k-inquiry-choices" role="tablist" aria-label="Choose your starting point" aria-orientation="vertical" onKeyDown={handleKeys}>
        {STARTING_POINTS.map(({ label, hint, icon: Icon }, index) => <button key={label} type="button"
          className="k-inquiry-choice" role="tab" id={`${id}-tab-${index}`} aria-selected={active === index}
          aria-controls={`${id}-panel-${index}`} tabIndex={active === index ? 0 : -1}
          ref={element => { controls.current[index] = element; }} onClick={() => setActive(index)}>
          <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
          <span><strong>{label}</strong><small>{hint}</small></span>
          <ArrowRight size={18} aria-hidden="true" />
        </button>)}
      </div>
    </div>
    {STARTING_POINTS.map((item, index) => <div key={item.type} id={`${id}-panel-${index}`} role="tabpanel"
      className="k-inquiry-panel" aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} tabIndex={0}>
      {active === index && <>
        <div className="k-inquiry-preview">
          <div><span className="k-inquiry-caption">A useful first brief</span><h3>{point.title}</h3></div>
          <img src={point.image} alt={point.alt} width={240} height={240} loading="lazy" />
        </div>
        <ol className="k-inquiry-checklist">
          {point.items.map((item, itemIndex) => <li key={item.title}>
            <span className="k-inquiry-number" aria-hidden="true">0{itemIndex + 1}</span>
            <div><h4>{item.title}</h4><p>{item.text}</p></div>
          </li>)}
        </ol>
        <div className="k-inquiry-next"><Link to={`/contact?type=${point.type}`} className="arrow-link">{point.cta}<ArrowRight size={18} aria-hidden="true" /></Link>
          <p>Open questions are welcome. We work through them together.</p>
        </div>
      </>}
    </div>)}
  </div>;
}
