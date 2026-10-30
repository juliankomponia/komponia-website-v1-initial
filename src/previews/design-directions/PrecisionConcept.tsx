import { useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import { ArrowDown, ArrowRight, ArrowUpRight, MoveHorizontal } from 'lucide-react';
import { ConceptHeader, CommonDepth, ConceptFooter } from './shared';
import './precision-concept.css';

const componentImage = (slug: string, version: 'real' | 'brand' = 'real') => `${import.meta.env.BASE_URL}components/${slug}/${version}.webp`;

const REQUIREMENTS = [
  {
    label: 'Function',
    title: 'Start with the job it has to do.',
    description: 'The application comes first. We clarify what the component needs to measure, control or deliver before selecting a product or manufacturing route.',
    image: 'temperaturregler',
    name: 'Temperature controller',
    rows: [
      ['Operating conditions', 'Temperature, medium and environment'],
      ['Required function', 'Measurement, control or heating task'],
      ['Selection', 'Suitable variants and agreed checks'],
    ],
    entry: 'application',
    action: 'Describe your application',
  },
  {
    label: 'Interfaces',
    title: 'Make every connection fit.',
    description: 'A component belongs in a larger system. We work through installation space, connections and technical questions with you and the selected manufacturer.',
    image: 'pt100-widerstandsthermometer',
    name: 'Resistance thermometer',
    rows: [
      ['Installation', 'Envelope, mounting and access'],
      ['Connections', 'Process fittings, signals and cable ends'],
      ['Technical work', 'In-house CAD, sketches and clarification'],
    ],
    entry: 'drawing',
    action: 'Start with your drawing',
  },
  {
    label: 'Demand',
    title: 'Specify the part. Plan its supply.',
    description: 'A sample and a recurring order need different arrangements. We bring quantities, delivery needs and the agreed component version into the same conversation.',
    image: 'cnc-hydraulikblock',
    name: 'Hydraulic manifold',
    rows: [
      ['Volumes', 'Samples, series demand and repeat orders'],
      ['Delivery', 'Preferred dates and call-off rhythm'],
      ['Agreement', 'Batch, stock and change conditions'],
    ],
    entry: 'part-number',
    action: 'Start with a component',
  },
] as const;

const SERVICES = [
  { title: 'Choose a component.', text: 'Standard products, technical selection and manufacturer coordination. Start with a part number or the function you need.', link: 'Explore components', to: '/components' },
  { title: 'Develop an OEM solution.', text: 'In-house CAD and sketches, suitable manufacturing partners, samples and agreed checks. A clear route to your component.', link: 'Explore OEM solutions', to: '/oem-solutions' },
  { title: 'Keep production supplied.', text: 'Recurring quantities, agreed safety stock and smaller call-offs. Quality and coordination continue after the first delivery.', link: 'Explore recurring supply', to: '/production-orders' },
];

function MaterialStudy() {
  const [reveal, setReveal] = useState(58);
  return <figure className="precision-study">
    <div className="precision-study__drawing" aria-hidden="true">
      <svg viewBox="0 0 700 560" preserveAspectRatio="xMidYMid meet">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M54 130V478H618M54 478L82 450M606 120V438M596 130H630M596 428H630" />
          <path d="M80 92H606M90 78V106M596 78V106" />
          <path d="M54 296H642M338 48V518" strokeDasharray="4 9" opacity=".36" />
          <path d="M64 158H45M64 190H50M64 222H50M64 254H45M64 286H50M64 318H50M64 350H45M64 382H50M64 414H50M64 446H45" />
        </g>
        <circle cx="338" cy="296" r="4" fill="none" stroke="currentColor" />
      </svg>
    </div>
    <div className="precision-study__object">
      <img src={componentImage('cnc-hydraulikblock', 'brand')} alt="Illustrative hydraulic manifold in Komponia colours, with a controllable material reveal." width="1200" height="1200" fetchPriority="high" decoding="async" />
      <img className="precision-study__real" src={componentImage('cnc-hydraulikblock')} alt="" width="1200" height="1200" fetchPriority="high" decoding="async" style={{ clipPath: `circle(${reveal * .74}% at 51% 52%)` }} />
    </div>
    <div className="precision-study__caption"><span>Component study / Hydraulic manifold</span><span>Illustrative rendering</span></div>
    <figcaption className="precision-study__control">
      <div className="precision-study__control-top"><span>From idea to material.</span><label htmlFor="precision-material"><MoveHorizontal size={16} aria-hidden="true" /> Drag to reveal</label></div>
      <input id="precision-material" type="range" min="0" max="100" value={reveal} onChange={event => setReveal(Number(event.target.value))} aria-label="Reveal the material rendering" aria-valuetext={reveal === 0 ? 'Komponia concept' : reveal === 100 ? 'Material rendering' : 'Concept and material combined'} />
      <div className="precision-study__ends"><button type="button" onClick={() => setReveal(0)}>Komponia concept</button><button type="button" onClick={() => setReveal(100)}>Material rendering</button></div>
    </figcaption>
  </figure>;
}

function Requirements() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const targets: Record<string, number> = { ArrowRight: (index + 1) % REQUIREMENTS.length, ArrowLeft: (index + REQUIREMENTS.length - 1) % REQUIREMENTS.length, Home: 0, End: REQUIREMENTS.length - 1 };
    if (!(event.key in targets)) return;
    event.preventDefault();
    setSelected(targets[event.key]);
    tabs.current[targets[event.key]]?.focus();
  };

  return <section className="precision-fit" id="precision-requirements" aria-labelledby="precision-fit-title">
    <div className="kd-container">
      <header className="precision-fit__head">
        <div><p className="kd-eyebrow">01 / Technical understanding</p><h2 id="precision-fit-title">The detail makes<br />the difference.</h2></div>
        <p>Components work as part of your product. We bring the questions together before the decisions become expensive.</p>
      </header>
      <div className="precision-fit__tabs" role="tablist" aria-label="Explore the requirements we clarify">
        {REQUIREMENTS.map((item, index) => <button key={item.label} ref={element => { tabs.current[index] = element; }} role="tab" type="button" id={`precision-requirement-tab-${index}`} aria-controls={`precision-requirement-panel-${index}`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => onKey(event, index)}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={19} aria-hidden="true" /></button>)}
      </div>
      {REQUIREMENTS.map((item, index) => <div key={item.label} className="precision-fit__panel" role="tabpanel" id={`precision-requirement-panel-${index}`} aria-labelledby={`precision-requirement-tab-${index}`} tabIndex={0} hidden={selected !== index}>
        {selected === index && <>
          <figure className="precision-fit__component"><span className="precision-fit__cross precision-fit__cross--first" aria-hidden="true" /><img src={componentImage(item.image)} alt={`Illustrative ${item.name.toLowerCase()}.`} width="1200" height="1200" loading="lazy" decoding="async" /><span className="precision-fit__cross precision-fit__cross--last" aria-hidden="true" /><figcaption><strong>{item.name}</strong><span>Illustrative component / requirements confirmed per inquiry</span></figcaption></figure>
          <div className="precision-fit__copy"><p className="precision-fit__small">What we clarify with you</p><h3>{item.title}</h3><p>{item.description}</p><dl>{item.rows.map(([term, detail]) => <div key={term}><dt>{term}</dt><dd>{detail}</dd></div>)}</dl><Link to={`/contact?entry=${item.entry}`} className="kd-link">{item.action}<ArrowRight size={18} aria-hidden="true" /></Link></div>
        </>}
      </div>)}
    </div>
  </section>;
}

export default function PrecisionConcept() {
  return <div className="kd kd-precision">
    <ConceptHeader />
    <main>
      <section className="precision-hero" aria-labelledby="precision-title">
        <div className="kd-container">
          <div className="precision-hero__topline"><p className="kd-eyebrow">Technical procurement. Real progress.</p><p>Built on WTS experience since 1997.</p></div>
          <h1 id="precision-title">Supply <span>redefined.</span></h1>
          <div className="precision-hero__body">
            <div className="precision-hero__copy"><p className="precision-hero__lead">Technical components.<br />{' '}Individual solutions.<br />{' '}Ongoing supply.</p><p className="precision-hero__intro">We connect technical understanding with practical sourcing and recurring delivery. One contact, from the first question to the next production run.</p><Link to="/contact" className="kd-button">Prepare an inquiry<ArrowUpRight size={19} aria-hidden="true" /></Link><button className="precision-hero__explore" type="button" onClick={() => { document.getElementById('precision-requirements')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }}>See what we bring together<ArrowDown size={17} aria-hidden="true" /></button></div>
            <MaterialStudy />
          </div>
          <div className="precision-hero__baseline"><span>For manufacturers. For your next series.</span><span>Engineering · Components · Quality · Supply</span></div>
        </div>
      </section>
      <Requirements />
      <section className="precision-services" aria-labelledby="precision-services-title">
        <div className="kd-container">
          <div className="precision-services__head"><p className="kd-eyebrow">02 / Where we can help</p><h2 id="precision-services-title">Start where you need us.</h2><p>A standard component, a custom part or an ongoing supply requirement. Each is a starting point in its own right.</p></div>
          <div className="precision-services__grid">{SERVICES.map((item, index) => <article key={item.title}><span className="precision-services__number">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><Link to={item.to} className="kd-link">{item.link}<ArrowRight size={18} aria-hidden="true" /></Link></article>)}</div>
        </div>
      </section>
      <CommonDepth prefix="precision" />
    </main>
    <ConceptFooter />
  </div>;
}
