import PageSections from '../components/PageSections';
import { Faq } from '../components/Subpage';
import { SectionLead, CapabilitiesCards, PartnershipProcess, QualityStandards, PartsGallery, IndustriesSection, ProtolabsBanner, ProductionSection, ProductionInfographic, DarkCta } from '../components/Sections';
import { HOME_CONTENT as H } from '../data/home';
import HomeHero from '../components/HomeHero';
import BrandLabel from '../components/BrandLabel';

export default function Home(){return <div className="home-page">
  <HomeHero/>
  <PageSections/>
  <section data-section-label="Our capabilities" className="bg-white home-capabilities">
    <div className="wrap-orig section-pad">
      <BrandLabel>Our capabilities</BrandLabel>
      <SectionLead title={H.capabilities.title}>{H.capabilities.intro}</SectionLead>
      <CapabilitiesCards core/>
      <p className="media-caption">Illustrative component scenes.</p>
      <div className="mt-12 md:mt-16">
        <SectionLead title={H.capabilities.processesTitle}>{H.capabilities.processesIntro}</SectionLead>
        <CapabilitiesCards/>
      </div>
    </div>
  </section>
  <section data-section-label="Components" className="bg-white"><div className="wrap-orig section-pad"><SectionLead title={H['component-fields'].title}>{H['component-fields'].intro}</SectionLead><PartsGallery/></div></section>
  <section data-section-label="How we work" className="bg-brand-gray"><div className="wrap-orig section-pad"><PartnershipProcess/></div></section>
  <section data-section-label="Quality & Lab" className="home-quality"><div className="wrap-orig section-pad"><BrandLabel>Quality & Lab</BrandLabel><SectionLead title={H.quality.title}>{H.quality.intro}</SectionLead><QualityStandards/></div></section>
  <section className="bg-white"><div className="wrap-orig section-pad"><SectionLead title={H.applications.title}>{H.applications.intro}</SectionLead><IndustriesSection/></div></section>
  <section className="bg-white"><div className="wrap-orig section-pad"><ProtolabsBanner/></div></section>
  <section data-section-label="Ongoing supply" className="bg-white"><div className="wrap-orig section-pad"><ProductionSection/><div className="mt-12 md:mt-16"><ProductionInfographic/></div></div></section>
  <section data-section-label="Questions" className="bg-brand-gray"><div className="wrap-orig section-pad"><Faq items={H.faq}/></div></section>
  <DarkCta message={H['closing-cta'].title} label="Prepare an inquiry" to="/contact"/>
</div>;}
