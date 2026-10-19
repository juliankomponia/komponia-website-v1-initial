import { ArrowRight, ChevronDown, ClipboardList, FileCheck, Ruler } from 'lucide-react';
import { Link } from 'react-router';
import { CAPABILITY_IMAGES } from '../data/capability-images';
import { HOME_CONTENT as H } from '../data/home-stand2';
import { INDUSTRIAL_IMAGES as I } from '../data/home-stand2-images';

export function CapabilitiesOverview() {
  return (
    <div className="home-overview-grid home-overview-grid--capabilities">
      {H.capabilities.cards.map(card => (
        <Link
          to={card.to}
          key={card.media}
          className="home-overview-card"
          aria-label={`Explore capability: ${card.title}`}
        >
          <img className="home-overview-card__image" src={CAPABILITY_IMAGES[card.media]} alt="" loading="lazy" />
          <div className="home-overview-card__body">
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <span className="home-overview-card__link">Explore capability <ArrowRight size={17} aria-hidden="true" /></span>
          </div>
        </Link>
      ))}
    </div>
  );
}

type GalleryKind = 'parts' | 'network' | 'requirements';
type GalleryCard = {
  title: string;
  text: string;
  img: string;
  to: string;
  link: string;
  table?: string[][];
};

const galleryCards: Record<GalleryKind, GalleryCard[]> = {
  parts: H['component-fields'].cards.map((card, index) => ({
    ...card,
    img: [I.controllers, I.sensors, I.heating, I.pressureSwitches][index],
    link: 'Explore this component field',
  })),
  network: H.partners.cards.map((card, index) => ({
    ...card,
    img: [I.controllers, I.customEngineering, I.qualityInspection, I.ongoingSupply][index],
    to: '/how-ordering-works',
    link: 'See how we work',
  })),
  requirements: H['technical-questions'].cards.map((card, index) => ({
    ...card,
    img: [I.temperatureController, I.temperatureProbe, I.tubularHeater, I.pressureSwitches][index],
    to: '/components',
    link: 'Explore components',
  })),
};

export function HomeGallery({ kind }: { kind: GalleryKind }) {
  return (
    <div className={`home-overview-grid home-overview-grid--gallery home-overview-grid--${kind}`}>
      {galleryCards[kind].map(card => (
        <article key={card.title} className="home-overview-card">
          <img className="home-overview-card__image" src={card.img} alt="" loading="lazy" />
          <div className="home-overview-card__body">
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            {card.table && (
              <details className="home-selection-details">
                <summary>Selection details <ChevronDown size={17} aria-hidden="true" /></summary>
                <table>
                  <caption className="sr-only">Selection requirements for {card.title}</caption>
                  <tbody>
                    {card.table.map(([label, description]) => (
                      <tr key={label}>
                        <th scope="row">{label}</th>
                        <td>{description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            )}
            <Link to={card.to} className="home-overview-card__link">
              {card.link} <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function QualityOverview() {
  const icons = [ClipboardList, Ruler, FileCheck];

  return (
    <div className="home-quality-grid">
      {H.quality.cards.map((card, index) => {
        const Icon = icons[index];
        return (
          <article className="home-quality-item" key={card.title}>
            <Icon size={32} strokeWidth={1.5} aria-hidden="true" />
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <Link to="/quality-and-lab" className="home-overview-card__link">
              About qualification <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export function ProcessOverview() {
  return (
    <div className="home-process">
      <p className="home-section-eyebrow">How we work</p>
      <h2 className="h2-orig">{H.process.title}</h2>
      <p className="home-process__intro">{H.process.intro}</p>
      <ol className="home-process__steps" role="list">
        {H.process.steps.map((step, index) => (
          <li key={step.title}>
            <span className="home-process__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function WhyOverview() {
  return (
    <div className="home-benefits">
      {H['why-komponia'].cards.map((card, index) => (
        <Link to={card.to} className="home-benefit" key={card.title}>
          <span className="home-benefit__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <h3>{card.title}</h3>
          <p>{card.text}</p>
          <span className="home-benefit__link">{card.link} <ArrowRight size={17} aria-hidden="true" /></span>
        </Link>
      ))}
    </div>
  );
}

export function SupplyTermsOverview() {
  const content = H['supply-terms'];

  return (
    <div className="home-supply-terms">
      <div className="home-supply-terms__intro">
        <p className="home-section-eyebrow">Ongoing supply</p>
        <h2 className="h2-orig">{content.title}</h2>
        <p>{content.intro}</p>
        <Link to={content.cta.to} className="home-overview-card__link">
          {content.cta.label} <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
      <dl className="home-supply-terms__topics">
        {content.topics.map(topic => (
          <div key={topic.title}>
            <dt>{topic.title}</dt>
            <dd>{topic.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
