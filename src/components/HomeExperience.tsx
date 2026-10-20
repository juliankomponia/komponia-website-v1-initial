import { lazy, useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { CAPABILITY_IMAGES } from '../data/capability-images';
import { CAPABILITY_SPECIFICATIONS } from '../data/capability-specifications';
import { HOME_CONTENT as H } from '../data/home-stand2';
import { INDUSTRIAL_IMAGES as I } from '../data/home-stand2-images';
import DeferredGraphic from './DeferredGraphic';
import type { TechnicalDrawingVariant } from './home-graphics/TechnicalDrawing';

const TechnicalDrawing = lazy(() => import('./home-graphics/TechnicalDrawing'));
const capabilityDrawings: Record<string, TechnicalDrawingVariant> = {
  components: 'connector', cnc: 'machined', printing: 'machined', sheetMetal: 'sheet',
  injection: 'controller', cables: 'connector', assembly: 'controller', rubber: 'connector',
  casting: 'machined', extrusion: 'sheet', sensors: 'sensor', vacuum: 'connector',
};
const componentDrawings: TechnicalDrawingVariant[] = ['controller', 'sensor', 'connector', 'controller'];

const capabilityDescriptions: Record<string, string> = {
  components: 'Technical components.', cnc: 'Milled & turned parts.',
  printing: 'Additive parts.', sheetMetal: 'Cut & formed parts.',
  injection: 'Molded plastic parts.', cables: 'Cables & harnesses.',
  assembly: 'Mechanical assemblies.', rubber: 'Molded elastomers.',
  casting: 'Metal castings.', extrusion: 'Custom profiles.',
  sensors: 'Sensors & probes.', vacuum: 'Polyurethane parts.',
};

export function CapabilityCollection() {
  const [expanded, setExpanded] = useState(false);
  const gridId = useId();
  const cards = expanded ? H.capabilities.cards : H.capabilities.cards.slice(0, 8);

  return <>
    <div id={gridId} className="kp-capabilities">
      {cards.map(card => <article className="kp-capability" key={card.media}>
        <details className="kp-capability__details">
          <summary className="kp-capability__summary">
            <figure><img src={CAPABILITY_IMAGES[card.media]} alt="" loading="lazy" /></figure>
            <div className="kp-capability__copy">
              <h3>{card.title}</h3>
              <p>{capabilityDescriptions[card.media]}</p>
            </div>
            <ArrowRight className="kp-capability__arrow" size={18} aria-hidden="true" />
          </summary>
          <div className="kp-capability__body">
            <p>{card.desc}</p>
            <DeferredGraphic className="kp-capability__drawing" label={`Illustrative schematic for ${card.title.toLowerCase()}.`}><TechnicalDrawing variant={capabilityDrawings[card.media]} /></DeferredGraphic>
            <dl className="kp-capability__specs">
              <div><dt>Process</dt><dd>{CAPABILITY_SPECIFICATIONS[card.media].process}</dd></div>
              <div><dt>Application</dt><dd>{CAPABILITY_SPECIFICATIONS[card.media].application}</dd></div>
              <div><dt>To specify</dt><dd>{CAPABILITY_SPECIFICATIONS[card.media].specify}</dd></div>
            </dl>
            <Link className="kp-text-link" to={card.to}>{card.cta}<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </details>
      </article>)}
    </div>
    <p className="kp-capability-note">Illustrative component images.</p>
    <div className="kp-actions">
      <button className="kp-text-link" type="button" aria-expanded={expanded} aria-controls={gridId} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'View fewer capabilities' : `View all ${H.capabilities.cards.length} capabilities`}
        {expanded ? <Minus size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
      </button>
      <Link className="kp-button" to="/contact">Prepare an inquiry <ArrowRight size={17} aria-hidden="true" /></Link>
    </div>
  </>;
}

const benefitSummaries = [
  'We combine component demand when discussing quantities and purchasing terms.',
  'Production batches, call-off quantities and stock terms are agreed together.',
  'Packaging and delivery plans are considered as part of the total cost.',
];

export function BenefitStories() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const toggles = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  return <div className="kp-benefit-grid">
    {H['why-komponia'].cards.map((card, index) => {
      const open = expanded === index;
      const bodyId = `${id}-body-${index}`;

      return <article
        ref={element => { cards.current[index] = element; }}
        key={card.title}
        className="kp-benefit"
        data-open={open}
        onPointerEnter={event => {
          const siblingHasFocus = cards.current.some((card, cardIndex) => cardIndex !== index && card?.contains(document.activeElement));
          // A direct click on the visible plus must reach the button before hover can change its state.
          const enteredToggle = event.target instanceof Element && event.target.closest('.kp-benefit__toggle');
          if (event.pointerType === 'mouse' && !siblingHasFocus && !enteredToggle) setExpanded(index);
        }}
        onPointerLeave={event => {
          if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) {
            setExpanded(previous => previous === index ? null : previous);
          }
        }}
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(previous => previous === index ? null : previous);
        }}
        onKeyDown={event => {
          if (event.key !== 'Escape' || !open) return;
          event.preventDefault();
          toggles.current[index]?.focus();
          setExpanded(null);
        }}
      >
        <div className="kp-benefit__copy">
          <h3>{card.title}</h3>
          <p className="kp-benefit__summary">{benefitSummaries[index]}</p>
          <button ref={element => { toggles.current[index] = element; }} className="kp-benefit__toggle" type="button" aria-expanded={open} aria-controls={bodyId} onClick={() => setExpanded(open ? null : index)}>
            {open ? <Minus size={21} aria-hidden="true" /> : <Plus size={21} aria-hidden="true" />}
            <span className="sr-only">{open ? 'Read less' : 'Read more'} about {card.title.toLowerCase()}</span>
          </button>
          <div className="kp-benefit__body" id={bodyId} hidden={!open}>
            <p>{card.text}</p>
            <Link className="kp-text-link" to={card.to}>{card.link} <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </article>;
    })}
  </div>;
}

const componentImages = [I.controllers, I.sensors, I.heating, I.pressureSwitches];

export function ComponentExplorer() {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(0);
  const id = useId();
  const cards = H['component-fields'].cards;

  return <div className="kp-explorer">
    <div className="kp-explorer__media">
      <img src={componentImages[selected]} alt={`Illustrative ${cards[selected].title.toLowerCase()}`} loading="lazy" />
      <DeferredGraphic className="kp-drawing-inset"><TechnicalDrawing variant={componentDrawings[selected]} /></DeferredGraphic>
    </div>
    <div className="kp-explorer__items">
      {cards.map((card, index) => {
        const open = expanded === index;
        const triggerId = `${id}-trigger-${index}`;
        const bodyId = `${id}-body-${index}`;

        return <div className="kp-disclosure" key={card.title}>
          <h3>
            <button id={triggerId} className="kp-disclosure__trigger" type="button" aria-expanded={open} aria-controls={bodyId} onClick={() => {
              setSelected(index);
              setExpanded(open ? null : index);
            }}>
              <span>{card.title}</span>{open ? <Minus size={20} aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}
            </button>
          </h3>
          <div id={bodyId} className="kp-disclosure__body" role="region" aria-labelledby={triggerId} hidden={!open}>
            <p>{card.text}</p>
            <table>
              <caption className="sr-only">Selection requirements for {card.title}</caption>
              <tbody>{card.table.map(([label, description]) => <tr key={label}>
                <th scope="row">{label}</th><td>{description}</td>
              </tr>)}</tbody>
            </table>
            <Link to={card.to} className="kp-text-link">Explore this component field <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>;
      })}
    </div>
  </div>;
}

const lifecycleStages = [
  { label: 'Requirement', steps: [0], image: I.customEngineering, alt: 'Illustrative component and drawing for a requirement review' },
  { label: 'Technical review', steps: [1, 2], image: I.controllers, alt: 'Illustrative control components for technical selection' },
  { label: 'Quotation', steps: [3], image: I.customEngineering, alt: 'Illustrative custom component and technical drawing' },
  { label: 'Samples & release', steps: [4], image: I.qualityInspection, alt: 'Illustrative dimensional inspection of a component' },
  { label: 'Series supply', steps: [5], image: I.ongoingSupply, alt: 'Illustrative preparation of recurring component deliveries' },
];

export function LifecycleTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % lifecycleStages.length; break;
      case 'ArrowLeft': next = (index - 1 + lifecycleStages.length) % lifecycleStages.length; break;
      case 'Home': next = 0; break;
      case 'End': next = lifecycleStages.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return <div className="kp-lifecycle">
    <div className="kp-lifecycle__tabs" role="tablist" aria-label="From inquiry to series supply">
      {lifecycleStages.map((stage, index) => <button
        ref={element => { tabs.current[index] = element; }}
        id={`${id}-tab-${index}`}
        key={stage.label}
        className="kp-lifecycle__tab"
        type="button"
        role="tab"
        aria-selected={active === index}
        aria-controls={`${id}-panel-${index}`}
        tabIndex={active === index ? 0 : -1}
        onClick={() => setActive(index)}
        onKeyDown={event => handleKeyDown(event, index)}
      >{stage.label}</button>)}
    </div>
    {lifecycleStages.map((stage, index) => <div
      id={`${id}-panel-${index}`}
      className="kp-lifecycle__panel"
      key={stage.label}
      role="tabpanel"
      aria-labelledby={`${id}-tab-${index}`}
      hidden={active !== index}
      tabIndex={0}
    >
      <div className="kp-lifecycle__copy">
        <h3>{H.process.steps[stage.steps[0]].title}</h3>
        {stage.steps.map(step => <p key={H.process.steps[step].title}>{H.process.steps[step].text}</p>)}
        {index === 4 && <ul>{H['supply-terms'].topics.slice(0, 2).map(topic => <li key={topic.title}>{topic.text}</li>)}</ul>}
        {index !== 0 && <Link className="kp-button" to="/contact">{H.inquiry.cta.label} <ArrowRight size={17} aria-hidden="true" /></Link>}
      </div>
      <div className="kp-lifecycle__media">
        {index === 0 ? <ul className="kp-lifecycle__checklist">{H.inquiry.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul> : <img src={stage.image} alt={stage.alt} loading="lazy" />}
      </div>
      {index === 0 && <Link className="kp-button kp-lifecycle__inquiry" to="/contact">{H.inquiry.cta.label} <ArrowRight size={17} aria-hidden="true" /></Link>}
    </div>)}
  </div>;
}

const qualificationImages = [I.customEngineering, I.qualityInspection, I.ongoingSupply];

export function QualificationCards() {
  const [expanded, setExpanded] = useState<number[]>([]);
  const id = useId();

  return <div className="kp-expertise-grid">
    {H.quality.cards.map((card, index) => {
      const open = expanded.includes(index);
      const bodyId = `${id}-body-${index}`;

      return <article className="kp-expertise-card" key={card.title}>
        <h3>{card.title}</h3>
        <img className="kp-expertise-card__image" src={qualificationImages[index]} alt="" loading="lazy" />
        <button className="kp-expertise-card__toggle" type="button" aria-expanded={open} aria-controls={bodyId} onClick={() => setExpanded(previous => open ? previous.filter(item => item !== index) : [...previous, index])}>
          {open ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
          <span>{open ? 'Read less' : 'Read more'}</span>
          <span className="sr-only"> about {card.title.toLowerCase()}</span>
        </button>
        <div className="kp-expertise-card__body" id={bodyId} hidden={!open}>
          <p>{card.text}</p>
          <Link className="kp-text-link" to="/quality-and-lab">About qualification <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </article>;
    })}
  </div>;
}

export function SupplyDetails() {
  const content = H['supply-terms'];

  return <div className="kp-supply-details">
    {content.topics.map(topic => <details key={topic.title}>
      <summary>{topic.title}<Plus size={18} aria-hidden="true" /></summary>
      <p>{topic.text}</p>
    </details>)}
    <Link className="kp-text-link" to={content.cta.to}>{content.cta.label} <ArrowRight size={16} aria-hidden="true" /></Link>
  </div>;
}

export function TechnicalQuestions() {
  return <div className="kp-technical-questions">
    {H['technical-questions'].cards.map(card => <details key={card.title}>
      <summary>{card.title}<Plus size={18} aria-hidden="true" /></summary>
      <p>{card.text}</p>
      <Link className="kp-text-link" to="/components">Explore components <ArrowRight size={16} aria-hidden="true" /></Link>
    </details>)}
  </div>;
}
