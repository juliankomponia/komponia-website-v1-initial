import { useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { HERO_PRODUCT_IMAGE } from '../data/images';

const OPTIONS = [
  {
    label: 'Components',
    points: [
      'Controllers, sensors, heating and switching components',
      'Technical selection and advice for your application',
      'Sourcing, documentation and delivery through one contact',
    ],
    link: 'Explore components',
    to: '/components',
  },
  {
    label: 'OEM & series',
    points: [
      'Custom components, in-house CAD and prototypes',
      'Agreed checks and sample evaluation in our Lab',
      'Recurring supply with call-offs and dynamic safety stock',
    ],
    link: 'Explore OEM solutions',
    to: '/oem-solutions',
  },
];

export default function HomeHero() {
  const [active, setActive] = useState(0);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const option = OPTIONS[active];

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? OPTIONS.length - 1 : (active + 1) % OPTIONS.length;
    setActive(next);
    controls.current[next]?.focus();
  }

  return <section className="reference-hero" aria-labelledby="home-hero-title">
    <figure className="reference-hero-media">
      <img src={HERO_PRODUCT_IMAGE} alt="Illustrative selection of a controller, temperature probe and heating element" width={1600} height={1600} fetchPriority="high" />
      <figcaption>Technical components. Selected for your application.</figcaption>
    </figure>
    <div className="reference-hero-panel">
      <div className="reference-hero-copy">
        <h1 id="home-hero-title">From components<br />to OEM series supply.</h1>
        <div className="reference-hero-toggle" role="tablist" aria-label="Choose your requirement" onKeyDown={handleKeys}>
          {OPTIONS.map((item, index) => <button key={item.label} ref={element => { controls.current[index] = element; }}
            type="button" role="tab" id={`home-option-${index}`} aria-selected={active === index}
            aria-controls="home-offer" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)}>{item.label}</button>)}
        </div>
        <div id="home-offer" role="tabpanel" aria-labelledby={`home-option-${active}`} className="reference-hero-offer">
          <ul>{option.points.map(point => <li key={point}>{point}</li>)}</ul>
          <div className="reference-hero-actions">
            <Link className="btn-primary-l" to="/contact">Prepare an inquiry</Link>
            <Link className="reference-hero-link" to={option.to}>{option.link}<ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <p className="reference-hero-note"><MessageSquare size={14} aria-hidden="true" />One personal contact for your requirements.</p>
      </div>
      <div className="reference-hero-proof">
        <p>Built on WTS<br />experience since <strong>1997.</strong></p>
        <span>In-house<br /><strong>CAD</strong></span>
        <span>Komponia<br /><strong>Lab</strong></span>
        <span>Ongoing<br /><strong>supply</strong></span>
      </div>
    </div>
  </section>;
}
