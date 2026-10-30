import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, Check, Plus } from 'lucide-react';
import { ConceptHeader, CommonDepth, ConceptFooter } from './shared';
import './network-concept.css';

const componentImage = (slug: string) => `${import.meta.env.BASE_URL}components/${slug}/real-600.webp`;

const INTENTS = [
  {
    id: 'component', label: 'Find a component', title: 'Start with a part number.',
    text: 'A reference, a sample or an application. We clarify the specification, assess suitable sources and coordinate the agreed checks.',
    image: 'temperaturregler', imageLabel: 'Illustrative digital temperature controller',
    active: ['components', 'lab'], route: '/contact?type=component', next: 'Discuss your component',
  },
  {
    id: 'custom', label: 'Develop a custom part', title: 'Give your requirement a shape.',
    text: 'Bring your drawing or an idea. We prepare CAD and sketches in-house, align manufacturing details and organise samples for your approval.',
    image: 'cnc-hydraulikblock', imageLabel: 'Illustrative machined aluminium component',
    active: ['components', 'engineering', 'lab'], route: '/contact?type=custom', next: 'Discuss your project',
  },
  {
    id: 'supply', label: 'Plan recurring supply', title: 'Connect supply to your demand.',
    text: 'We bring purchasing, production quantities and delivery schedules together. Stock and call-off arrangements are agreed around your application.',
    image: 'rohrheizkoerper', imageLabel: 'Illustrative tubular heating elements',
    active: ['components', 'supply'], route: '/contact?type=supply', next: 'Discuss your supply',
  },
] as const;

const RESPONSIBILITIES = [
  { number: '01', title: 'Define', you: 'Your application, interfaces and operating conditions.', us: 'Component options and the questions that need resolving.' },
  { number: '02', title: 'Develop', you: 'Your drawing, sample or technical challenge.', us: 'CAD, sketches and coordination with suitable manufacturers.' },
  { number: '03', title: 'Approve', you: 'The requirements and criteria for your release.', us: 'Samples, agreed checks and the supporting documentation.' },
  { number: '04', title: 'Supply', you: 'Your quantities, timing and recurring demand.', us: 'Purchasing, production and delivery under agreed terms.' },
];

const RANGE = [
  {
    id: 'components', label: 'Technical components', number: '01',
    title: 'The small part. The essential function.',
    intro: 'Control a temperature. Measure a pressure. Move air or connect an assembly. We start with what your application needs the component to do.',
    image: 'scrollverdichter', alt: 'Illustrative scroll compressor',
    details: [
      ['Your starting point', 'A part number, a sample or a description of the function.'],
      ['What we clarify', 'Interfaces, dimensions, operating conditions and quantity.'],
      ['Your options', 'Standard components, adaptations and assessed replacements.'],
    ],
    families: ['Controls & sensors', 'Heating elements', 'Pressure & switching', 'Refrigeration & air'],
    route: '/components', cta: 'Explore component fields',
  },
  {
    id: 'custom', label: 'Custom parts & assemblies', number: '02',
    title: 'Made around your application.',
    intro: 'When a catalogue part does not fit, the drawing becomes the starting point. We connect design details, suitable manufacturing processes and your release.',
    image: 'cnc-hydraulikblock', alt: 'Illustrative machined aluminium hydraulic block',
    details: [
      ['Your starting point', 'A drawing, CAD data, sample or development brief.'],
      ['What we clarify', 'Material, geometry, interfaces, finish and production quantities.'],
      ['Your options', 'Machined, formed, moulded or assembled parts from suitable manufacturers.'],
    ],
    families: ['CNC machining', 'Sheet metal', 'Moulded parts', 'Assemblies & cables'],
    route: '/assembly-and-subassemblies', cta: 'Explore custom solutions',
  },
] as const;

function NetworkGraphic({ intent }: { intent: typeof INTENTS[number] }) {
  const connected = (service: string) => (intent.active as readonly string[]).includes(service);
  return <figure className="kn-network" aria-label="Komponia coordinates the services relevant to your requirement">
    <div className="kn-network__canvas" data-intent={intent.id}>
      <svg className="kn-network__lines" viewBox="0 0 600 560" fill="none" aria-hidden="true">
        <path className="kn-network__rail" d="M10 490H92V80H570M92 490H570" />
        <path className="kn-network__branch" data-active={connected('components')} d="M168 142H286V264" />
        <path className="kn-network__branch" data-active={connected('engineering')} d="M488 150H392V264H330" />
        <path className="kn-network__branch" data-active={connected('lab')} d="M496 355H400V290H330" />
        <path className="kn-network__branch" data-active={connected('supply')} d="M232 466H286V316" />
        <circle cx="92" cy="80" r="5" className="kn-network__junction" />
        <circle cx="92" cy="490" r="5" className="kn-network__junction" />
        <path className="kn-network__ticks" d="M38 73V87M50 73V87M62 73V87M74 73V87M550 483V497M562 483V497" />
      </svg>
      <div className="kn-network__part"><img key={intent.image} src={componentImage(intent.image)} alt="" width="600" height="600" decoding="async" /></div>
      <div className="kn-network__service kn-network__service--components" data-active={connected('components')}>
        <span>01 / Components</span><strong>Selected<br />for the job.</strong><i aria-hidden="true" />
      </div>
      <div className="kn-network__service kn-network__service--engineering" data-active={connected('engineering')}>
        <span>02 / Engineering</span><strong>From idea<br />to drawing.</strong><i aria-hidden="true" />
      </div>
      <div className="kn-network__hub"><span>komponia</span><small>One contact.</small></div>
      <div className="kn-network__service kn-network__service--lab" data-active={connected('lab')}>
        <span>03 / Lab</span><strong>Agreed.<br />Checked.</strong><i aria-hidden="true" />
      </div>
      <div className="kn-network__service kn-network__service--supply" data-active={connected('supply')}>
        <span>04 / Supply</span><strong>Ready for<br />what comes next.</strong><i aria-hidden="true" />
      </div>
      <span className="kn-network__annotation">Your requirement. A coordinated response.</span>
    </div>
    <figcaption>Illustrative component and service connections. Scope is agreed for your project.</figcaption>
  </figure>;
}

export default function NetworkConcept() {
  const [intentIndex, setIntentIndex] = useState(0);
  const [rangeIndex, setRangeIndex] = useState(0);
  const intent = INTENTS[intentIndex];
  const range = RANGE[rangeIndex];

  return <div className="kd kd-network">
    <ConceptHeader tone="dark" />
    <section className="kn-hero" aria-labelledby="network-hero-title">
      <div className="kd-container kn-hero__layout">
        <div className="kn-hero__copy">
          <p className="kd-eyebrow kn-eyebrow"><span />Komponia / Connected by experience</p>
          <h1 id="network-hero-title">Supply<br /><span>redefined.</span></h1>
          <p className="kn-hero__lead">Technical components.<br />Custom solutions.<br />Recurring supply.</p>
          <p className="kn-hero__text">One contact brings the right expertise together – from your first requirement to the parts your production needs.</p>
          <Link to="/contact" className="kd-button kn-primary">Prepare an inquiry <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <div className="kn-hero__heritage"><span aria-hidden="true" />Built on WTS experience. <strong>Since 1997.</strong></div>
        </div>
        <NetworkGraphic intent={intent} />
      </div>
      <div className="kd-container kn-entry">
        <div className="kn-entry__chooser">
          <p className="kn-entry__question">What brings you to Komponia?</p>
          <div className="kn-entry__buttons" role="group" aria-label="Choose your starting point">
            {INTENTS.map((option, index) => <button type="button" key={option.id} aria-pressed={index === intentIndex} aria-controls="network-intent-panel" onClick={() => setIntentIndex(index)}><span>{String(index + 1).padStart(2, '0')}</span>{option.label}<ArrowRight size={18} aria-hidden="true" /></button>)}
          </div>
        </div>
        <div className="kn-entry__answer" id="network-intent-panel" aria-live="polite" aria-atomic="true">
          <h2>{intent.title}</h2><p>{intent.text}</p><Link to={intent.route} className="kd-link">{intent.next}<ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>

    <section className="kn-responsibility" aria-labelledby="network-responsibility-title">
      <div className="kd-container">
        <header className="kn-section-heading">
          <p className="kd-eyebrow">A clear division of work</p>
          <h2 id="network-responsibility-title">Your application.<br /><span>Our coordination.</span></h2>
          <p>You know what the part needs to achieve. We bring the technical questions, manufacturers and next steps together. Decisions stay clear throughout.</p>
        </header>
        <div className="kn-responsibility__table">
          <div className="kn-responsibility__head" aria-hidden="true"><span>The work</span><span>Your team</span><span>Komponia</span></div>
          {RESPONSIBILITIES.map(row => <article className="kn-responsibility__row" key={row.number}>
            <h3><span>{row.number}</span>{row.title}</h3>
            <p><span className="kn-mobile-label">Your team</span>{row.you}</p>
            <p><span className="kn-mobile-label">Komponia</span><Check size={18} aria-hidden="true" />{row.us}</p>
          </article>)}
        </div>
        <div className="kn-responsibility__foot"><p>One contact. Clear responsibilities. The right specialists for each task.</p><Link to="/partner-network" className="kd-link">Meet the way we work <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <section className="kn-range" aria-labelledby="network-range-title">
      <div className="kd-container">
        <header className="kn-range__heading"><p className="kd-eyebrow">Components & manufacturing</p><h2 id="network-range-title">An extensive range.<br />A specific answer.</h2><p>From a proven standard component to a part developed for your product. The starting point is always the application.</p></header>
        <div className="kn-range__buttons" role="group" aria-label="Explore standard or custom components">
          {RANGE.map((option, index) => <button key={option.id} type="button" aria-pressed={index === rangeIndex} aria-controls="network-range-detail" onClick={() => setRangeIndex(index)}><span>{option.number}</span>{option.label}<Plus size={20} aria-hidden="true" /></button>)}
        </div>
        <div id="network-range-detail" className="kn-range__detail">
          <figure className="kn-range__visual"><span className="kn-range__figure-label">{range.number} / Component study</span><img key={range.image} src={componentImage(range.image)} alt={range.alt} width="600" height="600" loading="lazy" decoding="async" /><div className="kn-range__scale" aria-hidden="true"><span />Application comes first.<span /></div><figcaption>Illustrative rendering. Configuration is agreed per inquiry.</figcaption></figure>
          <div className="kn-range__copy" aria-live="polite" aria-atomic="true"><h3>{range.title}</h3><p>{range.intro}</p><dl>{range.details.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl><Link to={range.route} className="kd-link">{range.cta}<ArrowRight size={18} aria-hidden="true" /></Link></div>
        </div>
        <ul className="kn-range__families" aria-label="Examples in this field">{range.families.map(label => <li key={label}><span aria-hidden="true" />{label}</li>)}</ul>
      </div>
    </section>
    <CommonDepth prefix="network" />
    <ConceptFooter />
  </div>;
}
