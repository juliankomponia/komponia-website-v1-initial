import PageSections from '../components/PageSections';
import { CardGrid, Faq, FeatureRow } from '../components/Subpage';
import { SectionLead, CapabilitiesCards, OrderingProcess, CaseStudies, NetworkGallery, QualityStandards, PartsGallery, IndustriesSection, ProtolabsBanner, ProductionSection, ProductionInfographic, DarkCta } from '../components/Sections';
import { HOME_CONTENT as H } from '../data/home';
import { INDUSTRIAL_IMAGES as I } from '../data/images';
import HomeHero from '../components/HomeHero';

export default function Home(){return <div className="home-page">
  <HomeHero/>
  <PageSections/>
  <section data-section-label="Our offer" className="bg-white"><div className="wrap-orig section-pad"><SectionLead title={H.offering.title}>{H.offering.intro}</SectionLead><CardGrid cards={H.offering.cards}/></div></section>
  <section data-section-label="Manufacturing" className="bg-white">
    <div className="wrap-orig section-pad">
      <SectionLead title={H.capabilities.title}>{H.capabilities.intro}</SectionLead>
      <CapabilitiesCards core/>
      <div className="mt-12 md:mt-16">
        <SectionLead title={H.capabilities.processesTitle}>{H.capabilities.processesIntro}</SectionLead>
        <CapabilitiesCards/>
      </div>
    </div>
  </section>
  <section data-section-label="OEM solutions" className="bg-brand-gray"><div className="wrap-orig section-pad"><FeatureRow eyebrow="Custom solutions" title={H['custom-solutions'].title} text={H['custom-solutions'].intro} bullets={H['custom-solutions'].bullets} img={I.customEngineering} imgAlt="Illustrative custom-part assessment on a workbench" link={H['custom-solutions'].cta}/></div></section>
  <section data-section-label="Components" className="bg-white"><div className="wrap-orig section-pad"><SectionLead title={H['component-fields'].title}>{H['component-fields'].intro}</SectionLead><PartsGallery/></div></section>
  <section data-section-label="How we work" className="bg-brand-gray"><div className="wrap-orig section-pad"><FeatureRow title={H.inquiry.title} text={H.inquiry.intro} bullets={H.inquiry.bullets} img={I.qualityInspection} imgAlt="Illustrative dimensional inspection of a component" link={H.inquiry.cta}/></div></section>
  <section className="bg-white"><div className="wrap-orig section-pad"><OrderingProcess/></div></section>
  <section data-section-label="Qualification" className="bg-white"><div className="wrap-orig section-pad"><SectionLead title={H.quality.title}>{H.quality.intro}</SectionLead><QualityStandards/></div></section>
  <section className="bg-white"><div className="wrap-orig section-pad"><SectionLead title={H.partners.title}>{H.partners.intro}</SectionLead><NetworkGallery/></div></section>
  <section className="bg-white"><div className="wrap-orig section-pad"><SectionLead title={H['technical-questions'].title}>{H['technical-questions'].intro}</SectionLead><CaseStudies/></div></section>
  <section className="bg-white"><div className="wrap-orig section-pad"><SectionLead title={H.applications.title}>{H.applications.intro}</SectionLead><IndustriesSection/></div></section>
  <section className="bg-white"><div className="wrap-orig section-pad"><ProtolabsBanner/></div></section>
  <section data-section-label="Ongoing supply" className="bg-white"><div className="wrap-orig section-pad"><ProductionSection/></div></section>
  <section className="bg-white"><div className="wrap-orig section-pad"><ProductionInfographic/></div></section>
  <section data-section-label="Questions" className="bg-brand-gray"><div className="wrap-orig section-pad"><Faq items={H.faq}/></div></section>
  <DarkCta message={H['closing-cta'].title} label="Prepare an inquiry" to="/contact"/>
</div>;}
