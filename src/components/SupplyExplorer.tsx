import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { HOME_CONTENT as H } from '../data/home';
import BrandLabel from './BrandLabel';
import './SupplyExplorer.css';

const PHASES = [
  {
    label: 'Plan',
    title: 'Agree the starting point.',
    text: 'Bring your expected demand and preferred delivery rhythm. We work through lead times, stock limits and replenishment together.',
    next: 'The stock arrangement, responsibilities and review rhythm.',
    node: 0,
  },
  {
    label: 'Call off',
    title: 'Schedule the next delivery.',
    text: 'Release smaller deliveries against the agreed overall quantity. Each call-off is coordinated with the dates and conditions of your supply arrangement.',
    next: 'The release quantity, required date and delivery details.',
    node: 2,
  },
  {
    label: 'Review',
    title: 'Keep the plan aligned.',
    text: 'Review actual consumption, future demand and lead times. Adjust dynamic safety stock together within the agreed commercial conditions.',
    next: 'Any changes to stock levels, replenishment or future call-offs.',
    node: 1,
  },
];

function ForecastDrawing() {
  return <svg viewBox="0 0 104 96" fill="none" aria-hidden="true">
    <rect x="25" y="12" width="54" height="72" rx="5" />
    <path d="M39 12V8h26v4M36 30h22M36 40h32" />
    <path className="k-supply-drawing-accent" d="M36 57h7m8 0h17M36 69h7m8 0h17" />
    <path d="M75 12h4v72H25v-5" opacity=".25" />
  </svg>;
}

function StockDrawing() {
  return <svg viewBox="0 0 104 96" fill="none" aria-hidden="true">
    <path d="m23 51 18-10 18 10v22L41 84 23 73V51Zm0 0 18 11 18-11M41 62v22" />
    <path d="m59 51 18-10 18 10v22L77 84 59 73M59 51l18 11 18-11M77 62v22" />
    <path className="k-supply-drawing-accent" d="m41 19 18-10 18 10v22L59 52 41 41V19Zm0 0 18 11 18-11M59 30v22M50 14l18 11" />
    <path d="M9 88h86" opacity=".25" />
  </svg>;
}

function CalloffDrawing() {
  return <svg viewBox="0 0 104 96" fill="none" aria-hidden="true">
    <rect x="19" y="10" width="57" height="20" rx="4" />
    <path d="M29 20h20m12 0h5M26 31v12" />
    <rect x="30" y="42" width="57" height="20" rx="4" />
    <path d="M40 52h20m12 0h5M37 63v12" />
    <path className="k-supply-drawing-accent" d="M42 83h42m-7-7 7 7-7 7" />
    <path d="M14 12v70h17" opacity=".25" />
  </svg>;
}

const MODEL_NODES = [
  { label: 'Forecast', detail: 'Expected demand', Drawing: ForecastDrawing },
  { label: 'Agreed stock', detail: 'Shared limits', Drawing: StockDrawing },
  { label: 'Call-offs', detail: 'Planned deliveries', Drawing: CalloffDrawing },
];

export default function SupplyExplorer() {
  const content = H['supply-terms'];
  const id = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const phase = PHASES[active];

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    let next: number;
    if (event.key === 'ArrowRight') next = (active + 1) % PHASES.length;
    else if (event.key === 'ArrowLeft') next = (active + PHASES.length - 1) % PHASES.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = PHASES.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return <section className="k-supply" data-home-reveal aria-labelledby={`${id}-title`}>
    <div className="k-supply-main">
      <div className="k-supply-copy">
        <BrandLabel>Built around your demand</BrandLabel>
        <h2 id={`${id}-title`}>{content.title}</h2>
        <p>{content.intro}</p>
        <Link to={content.cta.to} className="arrow-link k-supply-cta">{content.cta.label}<ArrowRight size={20} aria-hidden="true" /></Link>
      </div>

      <div className="k-supply-explorer">
        <p className="k-supply-model-label">Illustrative supply model</p>
        <div className="k-supply-tabs" role="tablist" aria-label="Explore recurring supply" onKeyDown={handleKeys}>
          {PHASES.map((item, index) => <button key={item.label}
            ref={element => { tabs.current[index] = element; }} type="button" role="tab"
            id={`${id}-tab-${index}`} aria-selected={active === index}
            aria-controls={`${id}-panel-${index}`} tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}>{item.label}</button>)}
        </div>

        <div className="k-supply-model" role="img" aria-label="Illustrative flow: a demand forecast informs agreed stock, which supports planned call-off deliveries.">
          {MODEL_NODES.map(({ label, detail, Drawing }, index) => <div key={label}
            className={`k-supply-node${phase.node === index ? ' k-supply-node--active' : ''}`}>
            <div className="k-supply-node-drawing"><Drawing /></div>
            <strong>{label}</strong>
            <span>{detail}</span>
            {index < MODEL_NODES.length - 1 && <svg className="k-supply-connector" viewBox="0 0 36 12" fill="none" aria-hidden="true">
              <path d="M1 6h32m-5-4 5 4-5 4" />
            </svg>}
          </div>)}
        </div>

        {PHASES.map((item, index) => <div key={item.label} role="tabpanel" id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`} hidden={active !== index}
          tabIndex={0} className="k-supply-panel">
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <div className="k-supply-next"><span>Next to agree</span><p>{item.next}</p></div>
        </div>)}
      </div>
    </div>

    <div className="k-supply-terms">
      <BrandLabel>Supply terms to agree</BrandLabel>
      <dl>{content.topics.map(topic => <div key={topic.title}>
        <dt>{topic.title}</dt><dd>{topic.text}</dd>
      </div>)}</dl>
    </div>
  </section>;
}
