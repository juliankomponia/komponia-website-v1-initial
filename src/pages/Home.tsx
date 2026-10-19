import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import PageSections from '../components/PageSections';
import { FeatureRow } from '../components/Subpage';
import { IndustriesSection, ProtolabsBanner, ProductionSection } from '../components/HomeSectionsStand2';
import { CapabilitiesOverview, HomeGallery, QualityOverview, ProcessOverview, WhyOverview, SupplyTermsOverview } from '../components/HomeOverview';
import { HOME_CONTENT as H } from '../data/home-stand2';
import { INDUSTRIAL_IMAGES as I } from '../data/home-stand2-images';
import HomeHero from '../components/HomeHero';
import ConceptToProduction from '../components/ConceptToProduction';
import SourceNote from '../components/SourceNote';
import './home-overview.css';

function HomeSectionLead({ eyebrow, title, children, centered = false }: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  centered?: boolean;
}) {
  return <div className={`home-section__lead${centered ? ' home-section__lead--center' : ''}`}>
    <div><p className="home-section-eyebrow">{eyebrow}</p><h2>{title}</h2></div>
    <p className="home-section__intro">{children}</p>
  </div>;
}

export default function Home() {
  return <div className="home-page home-clear">
    <HomeHero />
    <PageSections />
    <ConceptToProduction />

    <section data-section-label="Capabilities" className="home-section home-section--tint">
      <div className="wrap-orig section-pad">
        <HomeSectionLead eyebrow="Components & manufacturing" title={H.capabilities.title} centered>{H.capabilities.intro}</HomeSectionLead>
        <CapabilitiesOverview />
      </div>
    </section>

    <section data-section-label="Why Komponia" className="home-section home-section--benefits">
      <div className="wrap-orig section-pad">
        <HomeSectionLead eyebrow="Why Komponia" title={H['why-komponia'].title}>{H['why-komponia'].intro}</HomeSectionLead>
        <WhyOverview />
        <div className="home-source-note"><SourceNote note={H['why-komponia'].footnote} /></div>
      </div>
    </section>

    <section data-section-label="Custom solutions" className="home-section home-section--tint">
      <div className="wrap-orig section-pad">
        <FeatureRow eyebrow="Custom solutions" title={H['custom-solutions'].title} text={H['custom-solutions'].intro} img={I.customEngineering} imgAlt="Illustrative custom-part assessment on a workbench" link={H['custom-solutions'].cta} />
      </div>
    </section>

    <section data-section-label="Components" className="home-section">
      <div className="wrap-orig section-pad">
        <HomeSectionLead eyebrow="Component fields" title={H['component-fields'].title}>{H['component-fields'].intro}</HomeSectionLead>
        <HomeGallery kind="parts" />
      </div>
    </section>

    <section data-section-label="How we work" className="home-section home-section--tint home-section--joined">
      <div className="wrap-orig section-pad">
        <FeatureRow eyebrow="Your starting point" title={H.inquiry.title} text={H.inquiry.intro} bullets={H.inquiry.bullets} img={I.qualityInspection} imgAlt="Illustrative dimensional inspection of a component" link={H.inquiry.cta} />
      </div>
    </section>
    <section className="home-section home-section--tint home-section--process">
      <div className="wrap-orig section-pad"><ProcessOverview /></div>
    </section>

    <section data-section-label="Qualification" className="home-section">
      <div className="wrap-orig section-pad">
        <HomeSectionLead eyebrow="Qualification" title={H.quality.title}>{H.quality.intro}</HomeSectionLead>
        <QualityOverview />
      </div>
    </section>
    <section className="home-section home-section--tint">
      <div className="wrap-orig section-pad">
        <HomeSectionLead eyebrow="Sourcing & coordination" title={H.partners.title}>{H.partners.intro}</HomeSectionLead>
        <HomeGallery kind="network" />
      </div>
    </section>
    <section className="home-section">
      <div className="wrap-orig section-pad">
        <HomeSectionLead eyebrow="Technical requirements" title={H['technical-questions'].title}>{H['technical-questions'].intro}</HomeSectionLead>
        <HomeGallery kind="requirements" />
      </div>
    </section>
    <section className="home-section home-section--tint home-section--applications">
      <div className="wrap-orig section-pad">
        <HomeSectionLead eyebrow="Applications" title={H.applications.title}>{H.applications.intro}</HomeSectionLead>
        <IndustriesSection />
      </div>
    </section>
    <section className="home-section home-section--heritage">
      <div className="wrap-orig section-pad"><ProtolabsBanner /></div>
    </section>
    <section data-section-label="Ongoing supply" className="home-section home-section--tint home-section--joined">
      <div className="wrap-orig section-pad"><ProductionSection /></div>
    </section>
    <section className="home-section home-section--tint home-section--supply-terms">
      <div className="wrap-orig section-pad"><SupplyTermsOverview /></div>
    </section>
    <section data-section-label="Environment" className="home-section">
      <div className="wrap-orig section-pad">
        <FeatureRow eyebrow="Environment & resources" title={H.environment.title} text={H.environment.intro} bullets={H.environment.bullets} img={I.ongoingSupply} imgAlt="Illustrative preparation and packing of component deliveries" link={H.environment.cta} />
      </div>
    </section>
    <section className="home-closing">
      <div className="wrap-orig">
        <div><h2>{H['closing-cta'].title}</h2><p>{H['closing-cta'].intro}</p></div>
        <Link to="/contact" className="btn-primary btn-l">Prepare an inquiry <ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  </div>;
}
