import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { HOME_CONTENT as H } from '../data/home';
import { CORE_SERVICE_IMAGES } from '../data/images';
import { IMG } from '../data/site';
import mark from '../assets/brand/komponia-mark.svg';
import OpeningEngineering from '../components/OpeningEngineering';
import './opening-preview.css';

const offers = [
  {
    label: 'Components', image: CORE_SERVICE_IMAGES[1],
    alt: 'Illustrative controller, temperature probe and heating element',
    caption: 'Selected for your equipment.',
    detail: 'Controllers, sensors & heating elements',
    text: 'Find the right controller, sensor, heating or switching component. We help define the requirement and coordinate sourcing and delivery.',
    link: 'Explore components', to: '/components',
  },
  {
    label: 'OEM & series', image: CORE_SERVICE_IMAGES[0],
    alt: 'Illustrative OEM assembly with a controller, connections and a custom housing',
    caption: 'Developed for your application.',
    detail: 'Custom assemblies, samples & series supply',
    text: 'Bring a drawing, a sample or a new requirement. We connect in-house development, agreed Lab checks and supply for your production.',
    link: 'Explore OEM solutions', to: '/oem-solutions',
  },
];

const serviceCopy = [
  'Integrate standard and custom components into your equipment, from design-in to repeat orders.',
  'Select controllers, sensors, heating and switching components around your application.',
  'Turn drawings, samples and ideas into custom parts with in-house CAD and prototypes.',
  'Plan quantities, call-offs and dynamic safety stock with one contact for import and logistics.',
];
const processImages = [IMG.capCnc, IMG.cap3dp, IMG.capSmf, IMG.capIm];

function OpeningHero() {
  const [active, setActive] = useState(0);
  const id = useId();
  const controls = useRef<(HTMLButtonElement | null)[]>([]);

  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - active;
    setActive(next);
    controls.current[next]?.focus();
  }

  return <>
    <section className="op-hero" aria-labelledby={`${id}-title`}>
      <div className="op-stage">
        <div className="op-stage-top" aria-hidden="true"><span>Komponia / {offers[active].label}</span><span>0{active + 1} / 02</span></div>
        <div className="op-stage-pictures">
          {offers.map((offer, index) => <img key={offer.label} src={offer.image} alt={offer.alt}
            width={1600} height={1063} fetchPriority={index === 0 ? 'high' : 'auto'}
            className={active === index ? 'is-active' : ''} aria-hidden={active !== index} />)}
        </div>
        <div className="op-stage-bottom">
          <div><p>{offers[active].caption}</p><span>{offers[active].detail}</span></div>
          <img src={mark} width={40} height={41} alt="" aria-hidden="true" />
        </div>
        <p className="op-image-note">Illustrative component selection</p>
      </div>
      <div className="op-hero-copy">
        <p className="op-eyebrow op-eyebrow--inverse">Technical components & OEM solutions</p>
        <h1 id={`${id}-title`}>From components<br />to <span>OEM series supply.</span></h1>
        <div className="op-hero-tabs" role="tablist" aria-label="Choose your requirement" onKeyDown={navigate}>
          {offers.map((offer, index) => <button key={offer.label} type="button" role="tab"
            id={`${id}-tab-${index}`} aria-controls={`${id}-offer-${index}`} aria-selected={active === index}
            tabIndex={active === index ? 0 : -1} ref={el => { controls.current[index] = el; }}
            onClick={() => setActive(index)}>{offer.label}</button>)}
        </div>
        {offers.map((offer, index) => <div key={offer.label} role="tabpanel" id={`${id}-offer-${index}`}
          aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} className="op-hero-offer">
          <p>{offer.text}</p>
          <div className="op-hero-actions">
            <Link to="/contact" className="btn-primary-l">Prepare an inquiry<ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link to={offer.to} className="op-hero-secondary">{offer.link}<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>)}
        <p className="op-personal-note">One personal contact, from the first question onward.</p>
      </div>
    </section>
    <div className="op-foundation" aria-label="Our foundation">
      <div className="op-container op-foundation-inner">
        <p>Built on WTS<br /><strong>experience since 1997.</strong></p>
        <p><strong>In-house CAD</strong><span>Drawings & development</span></p>
        <p><strong>Komponia-Lab</strong><span>Agreed sample checks</span></p>
        <p><strong>Series supply</strong><span>Stock & call-off planning</span></p>
      </div>
    </div>
  </>;
}

function OpeningCapabilities() {
  return <section className="op-capabilities op-container" aria-labelledby="op-capabilities-title">
    <div className="op-section-heading">
      <div><p className="op-eyebrow">Our capabilities</p><h2 id="op-capabilities-title">{H.capabilities.title}</h2></div>
      <p>{H.capabilities.intro}</p>
    </div>
    <div className="op-services">
      {H.capabilities.coreCards.map((card, index) => <Link to={card.to} key={card.title} className="op-service">
        <span className="op-service-number" aria-hidden="true">0{index + 1}</span>
        <h3>{card.title}</h3><p>{serviceCopy[index]}</p>
        <span className="op-service-link">{card.cta}<ArrowRight size={17} aria-hidden="true" /></span>
      </Link>)}
    </div>
    <div className="op-manufacturing">
      <div className="op-manufacturing-heading"><h3>Manufacturing to match your part.</h3><p>We select manufacturing partners for your material, geometry and quantities.</p></div>
      <div className="op-processes">{H.capabilities.cards.map((card, index) => <Link key={card.title} to={card.to}>
        <img src={processImages[index]} alt="" width={80} height={80} loading="lazy" />
        <span>{card.title}</span><ArrowUpRight size={16} aria-hidden="true" />
      </Link>)}</div>
    </div>
  </section>;
}

export default function HomeOpeningPreview() {
  return <div className="opening-preview">
    <OpeningHero />
    <OpeningCapabilities />
    <OpeningEngineering />
    <aside className="op-preview-end op-container" aria-label="Design preview navigation">
      <p>Opening preview<span>Hero, capabilities & engineering.</span></p>
      <Link to="/">Compare with the current homepage<ArrowRight size={18} aria-hidden="true" /></Link>
    </aside>
  </div>;
}
