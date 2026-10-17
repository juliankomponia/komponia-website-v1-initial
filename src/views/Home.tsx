'use client';

import Link from 'next/link';

import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import HomeHero from '../components/HomeHero';
import PageSections from '../components/PageSections';
import BrandLabel from '../components/BrandLabel';
import { CAPABILITIES, COMPONENT_FIELDS, PROCESS_STEPS, APPLICATIONS, SUPPLY_STEPS } from '../data/homepage';
import { INDUSTRIAL_IMAGES as I } from '../data/home-stand2-images';
import { COMPANY } from '../data/company';

const capabilityImages = [I.controllers, I.customEngineering, I.ongoingSupply];
const componentImages = [I.controllers, I.sensors, I.heating, I.pressureSwitches];
const manufacturingOptions = [
  { title: 'CNC machining', detail: 'Milled and turned parts', to: '/cnc-machining' },
  { title: '3D printing', detail: 'Prototypes and custom parts', to: '/3d-printing' },
  { title: 'Sheet metal', detail: 'Cut, formed and finished', to: '/sheet-metal-fabrication' },
  { title: 'Injection molding', detail: 'Tooling and molded parts', to: '/injection-molding' },
];

function TextLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link className="hp-link" href={to}>{children}<ArrowRight size={18} aria-hidden="true" /></Link>;
}

export default function Home() {
  return <div className="home-page">
    <HomeHero />
    <div className="hp-foundation" aria-label="Our experience and capabilities">
      <div className="hp-shell hp-foundation-inner">
        <Link href="/brand-background"><strong>Since 1997</strong><span>Built on WTS experience <ArrowUpRight size={14} aria-hidden="true" /></span></Link>
        <div><strong>In-house CAD</strong><span>Drawings and technical work</span></div>
        <div><strong>Komponia Lab</strong><span>Agreed component checks</span></div>
        <div><strong>One personal contact</strong><span>From selection through supply</span></div>
      </div>
    </div>
    <PageSections />

    <section className="hp-section" data-section-label="Capabilities" aria-labelledby="capabilities-heading">
      <div className="hp-shell">
        <div className="hp-section-head hp-section-head--center">
          <BrandLabel>Our capabilities</BrandLabel>
          <h2 id="capabilities-heading">The right component.<br />The support around it.</h2>
          <p>For manufacturers of equipment, machines and systems.<br className="hp-desktop-break" /> From selecting a standard part to developing and supplying an OEM solution.</p>
        </div>
        <div className="hp-capabilities">
          {CAPABILITIES.map((item, index) => <Link key={item.title} className="hp-capability" href={item.to}>
            <div className="hp-capability-media"><img src={capabilityImages[index]} alt="" width="1200" height="800" loading="lazy" decoding="async" /></div>
            <div className="hp-capability-body">
              <h3>{item.title}</h3><p>{item.description}</p>
              <ul>{item.points.map(point => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}</ul>
              <span className="hp-link">{item.linkLabel}<ArrowRight size={18} aria-hidden="true" /></span>
            </div>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="hp-section hp-section--soft" data-section-label="Components" aria-labelledby="components-heading">
      <div className="hp-shell">
        <div className="hp-section-head hp-section-head--split">
          <div><BrandLabel>Component fields</BrandLabel><h2 id="components-heading">Start with the part<br />your application needs.</h2></div>
          <div><p>Controls, sensors, heating and switching components. We help you work through function, fit and the available options.</p><TextLink to="/components">Explore all components</TextLink></div>
        </div>
        <div className="hp-products">
          {COMPONENT_FIELDS.map((item, index) => <Link key={item.title} href={item.to} className="hp-product">
            <div className="hp-product-media"><img src={componentImages[index]} alt="" width="1200" height="800" loading="lazy" decoding="async" /></div>
            <div className="hp-product-copy"><h3>{item.title}</h3><p>{item.description}</p><span className="hp-link">View components<ArrowRight size={17} aria-hidden="true" /></span></div>
          </Link>)}
        </div>
        <p className="hp-image-note">Images illustrate component types. We agree the specification for your application.</p>
      </div>
    </section>

    <section className="hp-section" data-section-label="Engineering" aria-labelledby="engineering-heading">
      <div className="hp-shell">
        <div className="hp-feature">
          <div className="hp-feature-copy">
            <BrandLabel>Custom solutions &amp; OEM</BrandLabel>
            <h2 id="engineering-heading">When the standard<br />needs a change.</h2>
            <p>A different connection, a tighter installation space or a component built for your equipment. We turn your requirements into drawings and a practical route to series supply.</p>
            <dl className="hp-detail-list">
              <div><dt>Technical work in-house</dt><dd>CAD drawings and sketches to define the component, its interfaces and the required changes.</dd></div>
              <div><dt>The right manufacturing route</dt><dd>Prototypes, samples and production with suitable manufacturers and specialist partners.</dd></div>
              <div><dt>One contact through the project</dt><dd>Technical questions, sourcing and quality brought together as the part moves towards supply.</dd></div>
            </dl>
            <TextLink to="/oem-solutions">Explore OEM solutions</TextLink>
          </div>
          <figure className="hp-feature-media"><img src={I.customEngineering} alt="Illustrative machined component, drawing and measuring tool on a workbench" width="1200" height="800" loading="lazy" decoding="async" /></figure>
        </div>
        <div className="hp-manufacturing">
          <div className="hp-manufacturing-heading"><h3>Manufacturing options for your design.</h3><p>Selected with our partners to suit the material, geometry and quantity.</p></div>
          <div className="hp-manufacturing-links">{manufacturingOptions.map(item => <Link key={item.title} href={item.to}><span><strong>{item.title}</strong><span>{item.detail}</span></span><ArrowUpRight size={20} aria-hidden="true" /></Link>)}</div>
        </div>
      </div>
    </section>

    <section className="hp-section hp-section--lab" data-section-label="Quality & Lab" aria-labelledby="lab-heading">
      <div className="hp-shell hp-feature hp-feature--reverse">
        <figure className="hp-feature-media"><img src={I.qualityInspection} alt="Illustrative dimensional inspection of an industrial component" width="1200" height="800" loading="lazy" decoding="async" /><figcaption>Illustrative inspection scene.</figcaption></figure>
        <div className="hp-feature-copy">
          <BrandLabel>Komponia Lab</BrandLabel>
          <h2 id="lab-heading">Quality work.<br />Beyond the first sample.</h2>
          <p>We check agreed dimensions and functions in our own lab and follow quality questions through recurring supply.</p>
          <dl className="hp-detail-list">
            <div><dt>Dimensions and function</dt><dd>Checks against the requirements agreed for your component and its application.</dd></div>
            <div><dt>Samples from the batch</dt><dd>Sampling scope, criteria and documentation defined for the order.</dd></div>
            <div><dt>Support during series supply</dt><dd>Your contact coordinates deviations, supplier questions and complaints.</dd></div>
          </dl>
          <TextLink to="/quality-and-lab">Inside our quality process</TextLink>
        </div>
      </div>
    </section>

    <section className="hp-section" data-section-label="How we work" aria-labelledby="process-heading">
      <div className="hp-shell">
        <div className="hp-section-head hp-section-head--split">
          <div><BrandLabel>How we work</BrandLabel><h2 id="process-heading">A clear next step.<br />At every stage.</h2></div>
          <div><p>Bring a part number, a drawing or an application. Your personal contact brings the technical work, sourcing and supply together.</p><TextLink to="/how-ordering-works">See the full process</TextLink></div>
        </div>
        <ol className="hp-process">
          {PROCESS_STEPS.map((step, index) => <li key={step.title}>
            <span className="hp-step-number" aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3>
            <dl><div><dt>You bring</dt><dd>{step.input}</dd></div><div><dt>We handle</dt><dd>{step.work}</dd></div><div><dt>The result</dt><dd>{step.result}</dd></div></dl>
          </li>)}
        </ol>
        <p className="hp-process-note">Already have an approved part? Standard purchases and repeat orders start at the relevant step.</p>
      </div>
    </section>

    <section className="hp-section hp-section--ink" data-section-label="Series supply" aria-labelledby="supply-heading">
      <div className="hp-shell">
        <div className="hp-feature hp-supply-feature">
          <div className="hp-feature-copy">
            <BrandLabel inverse>Ongoing supply</BrandLabel>
            <h2 id="supply-heading">Plan the volume.<br />Call off what you need.</h2>
            <p>Bring recurring orders, imports and stock into one agreed plan. We adjust safety stock with your demand and keep supporting quality during the series.</p>
            <div className="hp-supply-actions"><Link href="/contact?type=supply" className="btn-primary-l">Plan your supply<ArrowUpRight size={18} aria-hidden="true" /></Link><TextLink to="/production-orders">Explore supply arrangements</TextLink></div>
          </div>
          <figure className="hp-feature-media"><img src={I.ongoingSupply} alt="Illustrative packing and preparation of recurring component deliveries" width="1200" height="800" loading="lazy" decoding="async" /></figure>
        </div>
        <ol className="hp-supply-steps">{SUPPLY_STEPS.map((step, index) => <li key={step.title}><span aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        <p className="hp-supply-note">Quantities, stock ownership and call-off terms are agreed for your supply arrangement.</p>
      </div>
    </section>

    <section className="hp-section" data-section-label="Applications" aria-labelledby="applications-heading">
      <div className="hp-shell hp-applications">
        <div><BrandLabel>Applications</BrandLabel><h2 id="applications-heading">Built into the equipment<br />you make.</h2><p>Technical components for manufacturers and industrial users, building on WTS experience since 1997.</p><TextLink to="/industries">Explore applications</TextLink></div>
        <div className="hp-application-list">{APPLICATIONS.map(item => <Link key={item.title} href={item.to}><h3>{item.title}<ArrowUpRight size={19} aria-hidden="true" /></h3><p>{item.description}</p></Link>)}</div>
      </div>
    </section>

    <section className="hp-section hp-closing" aria-labelledby="inquiry-heading">
      <div className="hp-shell hp-closing-inner">
        <div><BrandLabel>Your next step</BrandLabel><h2 id="inquiry-heading">Start with what you have.</h2><p>A part number, a sketch or a description of the application.<br className="hp-desktop-break" /> We will work through the missing details with you.</p></div>
        <div className="hp-closing-actions"><Link href="/contact" className="btn-primary-l">Prepare an inquiry<ArrowUpRight size={18} aria-hidden="true" /></Link><a href={`mailto:${COMPANY.email}`} className="hp-contact">{COMPANY.email}</a><a href={`tel:${COMPANY.phoneHref}`} className="hp-contact">{COMPANY.phone}</a></div>
      </div>
    </section>
  </div>;
}
