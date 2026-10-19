import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Check } from 'lucide-react';
import PageSections from '../components/PageSections';
import HomeHero from '../components/HomeHero';
import ConceptToProduction from '../components/ConceptToProduction';
import SourceNote from '../components/SourceNote';
import { CapabilityCollection, BenefitStories, ComponentExplorer, LifecycleTabs, QualificationCards, SupplyDetails, TechnicalQuestions } from '../components/HomeExperience';
import { HOME_CONTENT as H } from '../data/home-stand2';
import { INDUSTRIAL_IMAGES as I } from '../data/home-stand2-images';
import assemblyScene from '../assets/industrial/capability-heroes-20261017/assembly.webp';
import componentScene from '../assets/industrial/capability-heroes-20261017/components.webp';
import './home-experience.css';

function SectionHeading({ title, children, eyebrow }: { title: string; children: ReactNode; eyebrow?: string }) {
  return <header className="kp-heading">
    {eyebrow && <p className="kp-eyebrow">{eyebrow}</p>}
    <h2>{title}</h2><p>{children}</p>
  </header>;
}

export default function Home() {
  return <div className="home-page kp-home">
    <HomeHero />
    <PageSections />
    <ConceptToProduction />

    <section className="kp-section kp-section--gray" data-section-label="Capabilities">
      <div className="kp-container">
        <SectionHeading title={H.capabilities.title}>{H.capabilities.intro}</SectionHeading>
        <CapabilityCollection />
      </div>
    </section>

    <section className="kp-heritage">
      <div className="kp-container">
        <div className="kp-heritage__banner">
          <img src={componentScene} alt="Illustrative technical components" loading="lazy" />
          <div className="kp-heritage__copy">
            <p className="kp-eyebrow">WTS experience since 1997</p>
            <h2>{H.heritage.title}</h2><p>{H.heritage.intro}</p>
            <Link to="/about" className="kp-text-link">About Komponia <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>

    <section className="kp-section" data-section-label="Why Komponia">
      <div className="kp-container">
        <SectionHeading eyebrow="Why Komponia" title={H['why-komponia'].title}>{H['why-komponia'].intro}</SectionHeading>
        <BenefitStories />
        <div className="kp-actions"><Link to="/contact" className="kp-button">Discuss your requirements <ArrowRight size={18} aria-hidden="true" /></Link></div>
        <details className="kp-source"><summary>Transport-cost reference</summary><SourceNote note={H['why-komponia'].footnote} /></details>
      </div>
    </section>

    <section className="kp-section kp-custom" data-section-label="Custom solutions">
      <div className="kp-container kp-feature">
        <div className="kp-feature__copy">
          <p className="kp-eyebrow">Custom solutions</p>
          <h2>{H['custom-solutions'].title}</h2><p>{H['custom-solutions'].intro}</p>
          <TechnicalQuestions />
          <Link to={H['custom-solutions'].cta.to} className="kp-button">{H['custom-solutions'].cta.label}<ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <figure className="kp-feature__media"><img src={I.customEngineering} alt="Illustrative custom component with a technical drawing" loading="lazy" /></figure>
      </div>
    </section>

    <section className="kp-section kp-section--gray" data-section-label="Components">
      <div className="kp-container">
        <SectionHeading title={H['component-fields'].title}>{H['component-fields'].intro}</SectionHeading>
        <ComponentExplorer />
      </div>
    </section>

    <section className="kp-section" data-section-label="How we work">
      <div className="kp-container">
        <SectionHeading title={H.process.title}>{H.process.intro}</SectionHeading>
        <LifecycleTabs />
      </div>
    </section>

    <section className="kp-section kp-network">
      <div className="kp-container kp-feature">
        <figure className="kp-feature__media"><img src={assemblyScene} alt="Illustrative mechanical assembly" loading="lazy" /></figure>
        <div className="kp-feature__copy">
          <p className="kp-eyebrow">Sourcing & coordination</p>
          <h2>{H.partners.title}</h2><p>{H.partners.intro}</p>
          <dl className="kp-network__points">{H.partners.cards.map(card => <div key={card.title}><dt>{card.title}</dt><dd>{card.text}</dd></div>)}</dl>
          <Link to={H.partners.cta.to} className="kp-button">{H.partners.cta.label}<ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>

    <section className="kp-section kp-section--blue" data-section-label="Qualification">
      <div className="kp-container">
        <SectionHeading title={H.quality.title}>{H.quality.intro}</SectionHeading>
        <QualificationCards />
      </div>
    </section>

    <section className="kp-section kp-applications">
      <div className="kp-container">
        <SectionHeading title={H.applications.title}>{H.applications.intro}</SectionHeading>
        <div className="kp-applications__grid">{H.applications.cards.map((card, index) => <Link to={card.to} className="kp-application" key={card.title}>
          <img src={[I.controllers, I.heating, I.customEngineering, I.sensors][index]} alt="" loading="lazy" />
          <h3>{card.title}</h3><p>{card.text}</p><span className="kp-text-link">{card.link}<ArrowRight size={17} aria-hidden="true" /></span>
        </Link>)}</div>
      </div>
    </section>

    <section className="kp-section kp-section--gray" data-section-label="Ongoing supply">
      <div className="kp-container kp-feature kp-supply">
        <figure className="kp-feature__media"><img src={I.ongoingSupply} alt="Illustrative preparation and packing of component deliveries" loading="lazy" /></figure>
        <div className="kp-feature__copy">
          <p className="kp-eyebrow">Ongoing supply</p>
          <h2>{H['recurring-supply'].title}</h2><p>{H['recurring-supply'].intro}</p>
          <SupplyDetails />
          <Link to="/production-orders" className="kp-button">Explore recurring supply <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>

    <section className="kp-section kp-environment" data-section-label="Environment">
      <div className="kp-container">
        <SectionHeading eyebrow="Environment & resources" title={H.environment.title}>{H.environment.intro}</SectionHeading>
        <ul className="kp-environment__points">{H.environment.bullets.map(text => <li key={text}><Check size={20} aria-hidden="true"/><span>{text}</span></li>)}</ul>
        <div className="kp-actions"><Link to={H.environment.cta.to} className="kp-text-link">{H.environment.cta.label}<ArrowRight size={18} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <section className="kp-closing">
      <div className="kp-container">
        <h2>{H['closing-cta'].title}</h2><p>{H['closing-cta'].intro}</p>
        <Link to="/contact" className="kp-button kp-button--white">Prepare an inquiry <ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  </div>;
}
