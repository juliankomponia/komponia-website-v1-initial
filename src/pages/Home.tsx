import PageSections from '../components/PageSections';
import { Link } from 'react-router';
import { Check } from 'lucide-react';
import { FeatureRow } from '../components/Subpage';
import { SectionLead, CapabilitiesCards, OrderingProcess, CaseStudies, NetworkGallery, QualityStandards, PartsGallery, IndustriesSection, ProtolabsBanner, ProductionSection, ProductionInfographic, DarkCta } from '../components/Sections';
import { HOME_CONTENT as H } from '../data/home';
import { INDUSTRIAL_IMAGES as I } from '../data/images';
import BrandLabel from '../components/BrandLabel';

function Hero(){return <section className="flex flex-col-reverse lg:flex-row lg:items-stretch bg-black" aria-labelledby="home-hero-title">
  <figure className="relative lg:w-1/2 h-[320px] sm:h-[420px] lg:h-auto lg:min-h-[620px]"><img src={I.heroComponents} alt="Illustrative machined technical components" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high"/></figure>
  <div className="hero-panel lg:w-1/2 flex flex-col justify-end"><div className="home-hero-copy"><div className="max-w-[42rem]">
    <BrandLabel inverse>Components. Composed.</BrandLabel>
    <h1 id="home-hero-title" className="hero-title text-white font-medium mb-6">{H.hero.title.split('\n').map(line => <span key={line} className="block">{line}</span>)}</h1>
    <p className="hero-intro text-base md:text-[1.125rem] leading-relaxed mb-6">{H.hero.intro}</p>
    <ul className="list-none mt-2 mb-8 border-t" style={{borderColor:'rgba(255,255,255,0.24)'}}>{H.hero.lines.map(line=><li key={line} className="hero-usp border-b" style={{borderColor:'rgba(255,255,255,0.24)'}}><Check size={16} strokeWidth={2} style={{color:'rgba(255,255,255,0.72)'}} className="shrink-0"/><span><strong>{line.split(' — ')[0]}</strong><br/>{line.split(' — ')[1]}</span></li>)}</ul>
    <div className="hero-actions"><Link to="/contact" className="btn-primary-l">Prepare an inquiry</Link><Link to="/components" className="btn-secondary-dark btn-l">Explore components</Link></div>
  </div></div></div>
</section>;}

export default function Home(){return <div className="home-page">
  <Hero/>
  <PageSections/>
  <section data-section-label="Manufacturing" className="bg-white"><div className="wrap-orig section-pad"><SectionLead title={H.capabilities.title}>{H.capabilities.intro}</SectionLead><CapabilitiesCards/></div></section>
  <section data-section-label="Custom solutions" className="bg-brand-gray"><div className="wrap-orig section-pad"><FeatureRow eyebrow="Custom solutions" title={H['custom-solutions'].title} text={H['custom-solutions'].intro} img={I.customEngineering} imgAlt="Illustrative custom-part assessment on a workbench" link={H['custom-solutions'].cta}/></div></section>
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
  <DarkCta message={H['closing-cta'].title} label="Prepare an inquiry" to="/contact"/>
</div>;}
