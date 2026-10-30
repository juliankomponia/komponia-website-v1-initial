import { lazy } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, FileText, Hash, Workflow } from 'lucide-react';
import PageSections from '../components/PageSections';
import DeferredGraphic from '../components/DeferredGraphic';
import HeroV10 from '../components/v10/HeroV10';
import CapsBento from '../components/v10/CapsBento';
import ProcessStory from '../components/v7/ProcessStory';
import ComponentStage from '../components/v7/ComponentStage';
import { HOME_CONTENT as H } from '../data/home-stand2';
import { INQUIRY_ENTRIES, type InquiryEntry } from '../data/inquiry-entry';
import './home-experience.css';
import './home-brand-expression.css';
import './home-structure.css';
import './home-graphics.css';
import './home-v7.css';
import './home-v8.css';
import './home-v9.css';
import './home-v10.css';
import './home-process.css';

const OneContactDiagram = lazy(() => import('../components/home-graphics/OneContactDiagram'));
const ENTRY_ICON = { 'part-number': Hash, drawing: FileText, application: Workflow } as const;

/** Grok homepage structure adapted to Komponia typography, surfaces and interaction patterns. */
export default function Home() {
  return <div className="home-page kp-home kp7 kp10">
    <HeroV10 />
    <PageSections />
    <ComponentStage />
    <ProcessStory />
    <CapsBento />

    <section className="kp10-one" id="page-section-one-contact" data-section-label="05 One contact" aria-labelledby="kp10-one-title">
      <div className="kp-container kp10-one__grid">
        <div className="kp10-one__copy">
          <p className="kp10-eyebrow"><span aria-hidden="true" />{H['one-contact'].eyebrow}</p>
          <h2 id="kp10-one-title">{H['one-contact'].title}</h2>
          <p className="kp10-head__intro">{H['one-contact'].intro}</p>
          <dl className="kp10-one__points">{H['one-contact'].points.map(p => <div key={p.title}><dt>{p.title}</dt><dd>{p.text}</dd></div>)}</dl>
          <Link to={H['one-contact'].cta.to} className="kp-text-link kp10-link">{H['one-contact'].cta.label}<ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <DeferredGraphic className="kp-graphic--network kp10-one__graphic" label="Before and after: coordinating manufacturers, processes, logistics, documents and stock yourself, compared with one Komponia contact who coordinates them."><OneContactDiagram /></DeferredGraphic>
      </div>
      <div className="kp-container">
        <p className="kp10-heritage"><strong>WTS experience since 1997.</strong>The Komponia offering builds on the technical component experience of WTS. <Link to="/about" className="kp-text-link kp10-link">About Komponia <ArrowRight size={16} aria-hidden="true" /></Link></p>
      </div>
    </section>

    <section className="kp10-start" id="experience-and-inquiry" data-section-label="06 Inquiry" aria-labelledby="kp10-start-title">
      <div className="kp-container">
        <div className="kp10-start__panel">
          <header className="kp10-head kp10-head--center">
            <p className="kp10-eyebrow"><span aria-hidden="true" />Inquiry</p>
            <h2 id="kp10-start-title">{H['closing-cta'].title}</h2>
            <p className="kp10-head__intro">{H['closing-cta'].intro}</p>
          </header>
          <ul className="kp10-start__routes" aria-label="Start your inquiry draft with">
            {(Object.entries(INQUIRY_ENTRIES) as [InquiryEntry, typeof INQUIRY_ENTRIES[InquiryEntry]][]).map(([entry, d]) => {
              const Icon = ENTRY_ICON[entry];
              return <li key={entry}><Link to={`/contact?entry=${entry}`}>
                <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                <span className="kp10-start__label">{d.label}</span>
                <span className="kp10-start__needs">{d.needs}</span>
                <ArrowUpRight className="kp10-start__arrow" size={18} aria-hidden="true" />
              </Link></li>;
            })}
          </ul>
          <div className="kp10-actions kp10-actions--center">
            <Link to="/contact" className="kp-button">Prepare an inquiry <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link to="/about" className="kp-text-link kp10-link">Explore the WTS background <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  </div>;
}
