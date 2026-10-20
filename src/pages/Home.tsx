import { lazy, type ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Check } from 'lucide-react';
import PageSections from '../components/PageSections';
import HomeHero from '../components/HomeHero';
import HomeChapter from '../components/HomeChapter';
import ProcurementReadiness from '../components/ProcurementReadiness';
import ConceptToProduction from '../components/ConceptToProduction';
import SourceNote from '../components/SourceNote';
import { CapabilityCollection, BenefitStories, ComponentExplorer, LifecycleTabs, QualificationCards, SupplyDetails, TechnicalQuestions } from '../components/HomeExperience';
import { HOME_CONTENT as H } from '../data/home-stand2';
import { INDUSTRIAL_IMAGES as I } from '../data/home-stand2-images';
import DeferredGraphic from '../components/DeferredGraphic';
import './home-experience.css';
import './home-brand-expression.css';
import './home-structure.css';
import './home-graphics.css';

const NetworkDiagram = lazy(() => import('../components/home-graphics/NetworkDiagram'));
const SupplyRhythm = lazy(() => import('../components/home-graphics/SupplyRhythm'));
const ConnectionLine = lazy(() => import('../components/home-graphics/ConnectionLine'));
const TechnicalDrawing = lazy(() => import('../components/home-graphics/TechnicalDrawing'));
const ExplodedAssembly = lazy(() => import('../components/home-graphics/ExplodedAssembly'));
const ClosingAssembly = lazy(() => import('../components/home-graphics/ClosingAssembly'));
const HeritageTimeline = lazy(() => import('../components/home-graphics/HeritageTimeline'));
const InquiryRoutes = lazy(() => import('../components/home-graphics/InquiryRoutes'));
const ProcessBand = lazy(() => import('../components/home-graphics/ProcessBand'));
const applicationDrawings = ['controller', 'connector', 'machined', 'sensor'] as const;

function SectionHeading({ title, children, eyebrow, split = false }: { title: string; children: ReactNode; eyebrow?: string; split?: boolean }) {
  return <header className={`kp-heading${split ? ' kp-heading--split' : ''}`}>
    {eyebrow && <p className="kp-eyebrow">{eyebrow}</p>}
    <h2>{title}</h2><p>{children}</p>
  </header>;
}

export default function Home() {
  return <div className="home-page kp-home">
    <HomeHero />
    <PageSections />
    <ConceptToProduction />

    <section className="kp-section kp-section--gray" id="page-section-capabilities">
      <div className="kp-container">
        <SectionHeading split eyebrow="Components & manufacturing" title={H.capabilities.title}>{H.capabilities.intro}</SectionHeading>
        <CapabilityCollection />
      </div>
    </section>

    <section className="kp-heritage" id="wts-experience" aria-label="The experience behind Komponia">
      <div className="kp-container">
        <div className="kp-heritage__banner">
          <div className="kp-heritage__date"><span>WTS experience since</span><strong>1997</strong><DeferredGraphic className="kp-graphic--heritage"><HeritageTimeline /></DeferredGraphic></div>
          <div className="kp-heritage__copy">
            <p className="kp-eyebrow">The experience behind Komponia</p>
            <h2>{H.heritage.title}</h2><p>{H.heritage.intro}</p>
            <Link to="/about" className="kp-text-link">About Komponia <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>

    <section className="kp-section" id="page-section-why-komponia">
      <div className="kp-container">
        <SectionHeading split eyebrow="Purchasing volume & call-offs" title={H['why-komponia'].title}>{H['why-komponia'].intro}</SectionHeading>
        <BenefitStories />
        <div className="kp-actions"><Link to="/contact" className="kp-button">Prepare an inquiry <ArrowRight size={18} aria-hidden="true" /></Link></div>
        <details className="kp-source"><summary>Transport-cost reference</summary><SourceNote note={H['why-komponia'].footnote} /></details>
      </div>
    </section>

    <section className="kp-section kp-custom" id="page-section-custom-solutions">
      <div className="kp-container kp-feature">
        <div className="kp-feature__copy">
          <p className="kp-eyebrow">Custom solutions</p>
          <h2>{H['custom-solutions'].title}</h2><p>{H['custom-solutions'].intro}</p>
          <TechnicalQuestions />
          <Link to={H['custom-solutions'].cta.to} className="kp-text-link">{H['custom-solutions'].cta.label}<ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <DeferredGraphic className="kp-graphic--exploded" label="Illustrative assembly of a housing, circuit board, sensor and connector."><ExplodedAssembly /></DeferredGraphic>
      </div>
    </section>

    <section className="kp-section kp-section--gray" id="page-section-components">
      <div className="kp-container">
        <SectionHeading split eyebrow="Find your component" title={H['component-fields'].title}>{H['component-fields'].intro}</SectionHeading>
        <ComponentExplorer />
      </div>
    </section>

    <div className="kp-container kp-process-band-container"><DeferredGraphic className="kp-graphic--band" label="CNC milling, sheet metal, sensors, controllers, connectors and custom assemblies."><ProcessBand /></DeferredGraphic></div>

    <section className="kp-section" id="page-section-how-we-work" data-section-label="03 How we work">
      <div className="kp-container">
        <HomeChapter number="03" title="How we work" />
        <SectionHeading split title={H.process.title}>{H.process.intro}</SectionHeading>
        <LifecycleTabs />
        <ProcurementReadiness />
        <DeferredGraphic className="kp-graphic--connection"><ConnectionLine /></DeferredGraphic>
      </div>
    </section>

    <section className="kp-section kp-network">
      <div className="kp-container kp-feature">
        <DeferredGraphic className="kp-graphic--network" label="A schematic of manufacturing processes coordinated through Komponia."><NetworkDiagram /></DeferredGraphic>
        <div className="kp-feature__copy">
          <p className="kp-eyebrow">Sourcing & coordination</p>
          <h2>{H.partners.title}</h2><p>{H.partners.intro}</p>
          <dl className="kp-network__points">{H.partners.cards.map(card => <div key={card.title}><dt>{card.title}</dt><dd>{card.text}</dd></div>)}</dl>
          <Link to={H.partners.cta.to} className="kp-text-link">{H.partners.cta.label}<ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>

    <section className="kp-section kp-quality" id="page-section-qualification">
      <div className="kp-container">
        <SectionHeading split eyebrow="Quality & qualification" title={H.quality.title}>{H.quality.intro}</SectionHeading>
        <QualificationCards />
      </div>
    </section>

    <section className="kp-section kp-applications">
      <div className="kp-container">
        <SectionHeading split eyebrow="Built around your application" title={H.applications.title}>{H.applications.intro}</SectionHeading>
        <div className="kp-applications__grid">{H.applications.cards.map((card, index) => <Link to={card.to} className="kp-application" key={card.title}>
          <div className="kp-application__media">
            <img src={[I.controllers, I.heating, I.customEngineering, I.sensors][index]} alt="" loading="lazy" />
            <DeferredGraphic className="kp-drawing-inset"><TechnicalDrawing variant={applicationDrawings[index]} /></DeferredGraphic>
          </div>
          <h3>{card.title}</h3><p>{card.text}</p><span className="kp-text-link">{card.link}<ArrowRight size={17} aria-hidden="true" /></span>
        </Link>)}</div>
      </div>
    </section>

    <section className="kp-section kp-supply-section" id="page-section-ongoing-supply" data-section-label="04 How we deliver">
      <div className="kp-container"><HomeChapter number="04" title="How we deliver" discipline="supply" /></div>
      <div className="kp-container kp-feature kp-supply">
        <figure className="kp-feature__media kp-supply__media"><figcaption>Series quantities.<br />Flexible call-offs.</figcaption><img src={I.ongoingSupply} alt="Illustrative preparation and packing of component deliveries" loading="lazy" /></figure>
        <div className="kp-feature__copy">
          <p className="kp-eyebrow">Ongoing supply</p>
          <h2>{H['recurring-supply'].title}</h2><p>{H['recurring-supply'].intro}</p>
          <SupplyDetails />
          <Link to="/production-orders" className="kp-text-link">Explore recurring supply <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="kp-container"><DeferredGraphic className="kp-graphic--supply" label="A larger production batch divided into agreed call-offs; schematic only."><SupplyRhythm /></DeferredGraphic></div>
    </section>

    <section className="kp-section kp-environment" id="page-section-environment">
      <div className="kp-container">
        <SectionHeading split eyebrow="Environment & resources" title={H.environment.title}>{H.environment.intro}</SectionHeading>
        <ul className="kp-environment__points">{H.environment.bullets.map(text => <li key={text}><Check size={20} aria-hidden="true"/><span>{text}</span></li>)}</ul>
        <div className="kp-actions"><Link to={H.environment.cta.to} className="kp-text-link">{H.environment.cta.label}<ArrowRight size={18} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <section className="kp-closing" id="experience-and-inquiry" data-section-label="05 Experience & inquiry">
      <div className="kp-container"><HomeChapter number="05" title="Experience & inquiry" discipline="neutral" /></div>
      <div className="kp-container kp-closing__inner">
        <div className="kp-closing__copy">
          <h2>{H['closing-cta'].title}</h2><p>{H['closing-cta'].intro}</p>
          <Link to="/contact" className="kp-button kp-button--white">Prepare an inquiry <ArrowRight size={18} aria-hidden="true" /></Link>
          <Link to="/about" className="kp-text-link kp-closing__experience">Explore the WTS background <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <DeferredGraphic className="kp-closing__mark"><ClosingAssembly /></DeferredGraphic>
      </div>
      <div className="kp-container"><DeferredGraphic className="kp-graphic--inquiry" label="Prepare an inquiry from a part number, drawing or application."><InquiryRoutes /></DeferredGraphic></div>
    </section>
  </div>;
}
