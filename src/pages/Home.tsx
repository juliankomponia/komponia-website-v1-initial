import { Faq, FeatureRow } from '../components/Subpage';
import { SectionLead, CapabilitiesCards, OrderingProcess, QualityStandards, PartsGallery, IndustriesSection, ProductionSection, ProductionInfographic, DarkCta } from '../components/Sections';
import { HOME_CONTENT as H } from '../data/home';
import { INDUSTRIAL_IMAGES as I, CORE_SERVICE_IMAGES } from '../data/images';
import HomeHero from '../components/HomeHero';
import KomponiaSignature from '../components/KomponiaSignature';
import './home.css';

export default function Home() {
  const oem = H['custom-solutions'];
  return <div className="home-page home-reference">
    <HomeHero />
    <section className="home-capabilities">
      <div className="wrap-orig section-pad">
        <SectionLead eyebrow="Our capabilities" title={H.capabilities.title}>{H.capabilities.intro}</SectionLead>
        <CapabilitiesCards core />
        <div className="home-manufacturing">
          <SectionLead title={H.capabilities.processesTitle}>{H.capabilities.processesIntro}</SectionLead>
          <CapabilitiesCards />
        </div>
      </div>
    </section>
    <section className="home-band"><div className="wrap-orig section-pad">
      <FeatureRow eyebrow="In-house engineering" title={oem.title} text={oem.intro} bullets={oem.bullets} img={CORE_SERVICE_IMAGES[0]} imgAlt="Illustrative OEM component assembly" link={oem.cta} />
    </div></section>
    <section><div className="wrap-orig section-pad">
      <SectionLead title={H['component-fields'].title}>{H['component-fields'].intro}</SectionLead>
      <PartsGallery />
    </div></section>
    <section className="home-band"><div className="wrap-orig section-pad">
      <FeatureRow title={H.inquiry.title} text={H.inquiry.intro} bullets={H.inquiry.bullets} img={I.customEngineering} imgAlt="Illustrative custom component and technical drawing" link={H.inquiry.cta} />
    </div></section>
    <section><div className="wrap-orig section-pad"><OrderingProcess /></div></section>
    <section className="home-quality"><div className="wrap-orig section-pad">
      <SectionLead eyebrow="Quality & Lab" title={H.quality.title}>{H.quality.intro}</SectionLead><QualityStandards />
    </div></section>
    <section><div className="wrap-orig section-pad">
      <SectionLead title={H.applications.title}>{H.applications.intro}</SectionLead><IndustriesSection variant="compact" />
    </div></section>
    <section className="home-band"><div className="wrap-orig section-pad"><KomponiaSignature /></div></section>
    <section><div className="wrap-orig section-pad"><ProductionSection /><div className="home-supply-terms"><ProductionInfographic /></div></div></section>
    <section className="home-band"><div className="wrap-orig section-pad"><Faq items={H.faq} /></div></section>
    <DarkCta message={H['closing-cta'].title} label="Prepare an inquiry" to="/contact" />
  </div>;
}
