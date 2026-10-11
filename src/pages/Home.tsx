import { Faq } from '../components/Subpage';
import { SectionLead, CapabilitiesCards, PartsGallery, IndustriesSection, ProductionSection, DarkCta } from '../components/Sections';
import { HOME_CONTENT as H } from '../data/home';
import HomeHero from '../components/HomeHero';
import EngineeringDetails from '../components/EngineeringDetails';
import QualityIllustrations from '../components/QualityIllustrations';
import KomponiaSignature from '../components/KomponiaSignature';
import InquiryGuide from '../components/InquiryGuide';
import ProcessExplorer from '../components/ProcessExplorer';
import SupplyExplorer from '../components/SupplyExplorer';
import useHomeReveal from '../hooks/useHomeReveal';
import './home.css';

export default function Home() {
  const revealRef = useHomeReveal();
  return <div className="home-page home-reference" ref={revealRef}>
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
      <EngineeringDetails />
    </div></section>
    <section><div className="wrap-orig section-pad">
      <SectionLead title={H['component-fields'].title}>{H['component-fields'].intro}</SectionLead>
      <PartsGallery />
    </div></section>
    <section className="home-band"><div className="wrap-orig section-pad">
      <InquiryGuide />
    </div></section>
    <section><div className="wrap-orig section-pad"><ProcessExplorer /></div></section>
    <section className="home-quality"><div className="wrap-orig section-pad">
      <SectionLead eyebrow="Quality & Lab" title={H.quality.title}>{H.quality.intro}</SectionLead><QualityIllustrations />
    </div></section>
    <section><div className="wrap-orig section-pad">
      <SectionLead title={H.applications.title}>{H.applications.intro}</SectionLead><IndustriesSection variant="compact" />
    </div></section>
    <section className="home-band"><div className="wrap-orig section-pad"><KomponiaSignature /></div></section>
    <section><div className="wrap-orig section-pad"><ProductionSection /><div className="home-supply-terms"><SupplyExplorer /></div></div></section>
    <section className="home-band"><div className="wrap-orig section-pad"><Faq items={H.faq} /></div></section>
    <DarkCta message={H['closing-cta'].title} label="Prepare an inquiry" to="/contact" />
  </div>;
}
