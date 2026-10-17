'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { COMPANY } from '@/data/company';
import './home-design.css';

const products = [
  { id: 'controls', name: 'Controllers', title: 'Control the process.', description: 'Temperature, timing and process control for your equipment. We help match inputs, outputs and connections to the application.', image: 'controller', alt: 'Illustrative panel controller with an unlit display and wired terminals', href: '/components/controllers-and-control-systems', detail: 'Controllers & control systems' },
  { id: 'sensors', name: 'Sensors & probes', title: 'Measure where it matters.', description: 'Temperature probes and sensors selected for the measurement range, installation and connection your equipment requires.', image: 'probe', alt: 'Illustrative stainless temperature probe with a coiled cable', href: '/components/sensors-and-probes', detail: 'Sensors & probes' },
  { id: 'heating', name: 'Heating elements', title: 'Heat in the right place.', description: 'Heating power, geometry and mounting considered together. We work through the operating conditions and the space available.', image: 'heater', alt: 'Illustrative U-shaped industrial heater with two ceramic terminals', href: '/components/heating-elements', detail: 'Heating elements' },
  { id: 'switching', name: 'Pressure & switching', title: 'Switch at the right point.', description: 'Switching points, process connections and electrical interfaces matched to the installation and agreed specification.', image: 'pressure-switch', alt: 'Illustrative industrial pressure switch with a metal enclosure and threaded connection', href: '/components/pressure-and-switching-devices', detail: 'Pressure & switching devices' },
];

const engineering = [
  { id: 'drawing', title: 'Define the component', text: 'We work through the function, installation space and interfaces. Our in-house CAD drawings and sketches give the requirement a form that can be discussed and manufactured.' },
  { id: 'sample', title: 'Develop and sample', text: 'We coordinate suitable manufacturing partners, prototypes and samples. Technical questions are resolved against the requirements agreed for your application.' },
  { id: 'series', title: 'Prepare for series', text: 'Specification, sample checks, quantities and supply terms come together before release. Your personal contact stays involved as the component moves into recurring supply.' },
];

const supply = [
  { title: 'Understand demand', text: 'Review expected consumption, lead times and delivery requirements.' },
  { title: 'Agree the stock', text: 'Define suitable safety stock, replenishment and commercial terms.' },
  { title: 'Call off quantities', text: 'Coordinate recurring deliveries and the accompanying quality work.' },
  { title: 'Review together', text: 'Adapt the arrangement when consumption or requirements change.' },
];

function TextLink({ href, children, inverse = false }: { href: string; children: React.ReactNode; inverse?: boolean }) {
  return <Link href={href} className={`k-text-link${inverse ? ' k-text-link-inverse' : ''}`}>{children}<ArrowUpRight size={19} aria-hidden="true" /></Link>;
}

export default function KomponiaHome() {
  return <div className="k-page">
    <section className="k-hero k-shell" aria-labelledby="intro-title">
      <div className="k-hero-copy">
        <p className="k-hero-context">Technical components &amp; OEM solutions</p>
        <h1 id="intro-title">The part<br />that fits.</h1>
        <p className="k-hero-description">We help you select, develop and source the components your equipment needs. With one contact from the first question to series supply.</p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
          <Button asChild className="k-button"><Link href="/contact">Start an inquiry<ArrowUpRight size={18} aria-hidden="true" /></Link></Button>
          <a href="#components" className="k-text-link">Explore components<ArrowRight size={18} aria-hidden="true" /></a>
        </div>
        <Link className="k-origin" href="/brand-background"><span>Built on WTS experience.</span><span>Since 1997.<ArrowUpRight size={14} aria-hidden="true" /></span></Link>
      </div>
      <figure className="k-hero-visual">
        <Image src="/assets/industrial/neutral-20261011/hero-components.webp" width={1600} height={1600} alt="Illustrative controller, stainless temperature probe and tubular heating element" preload sizes="(max-width: 767px) 100vw, 55vw" />
        <figcaption><span>Components for your application.</span><span>Selection · Development · Supply</span></figcaption>
      </figure>
    </section>

    <nav className="k-paths k-shell" aria-label="Choose your starting point">
      <Link href="/components"><span>Choose a component</span><ArrowUpRight size={22} aria-hidden="true" /></Link>
      <Link href="/oem-solutions"><span>Develop an OEM part</span><ArrowUpRight size={22} aria-hidden="true" /></Link>
      <Link href="/production-orders"><span>Plan ongoing supply</span><ArrowUpRight size={22} aria-hidden="true" /></Link>
    </nav>

    <section id="components" className="k-component-section k-shell k-section" aria-labelledby="components-title">
      <div className="k-section-intro">
        <h2 id="components-title">A closer look<br />at the components.</h2>
        <div><p>Start with the function. We help you work through the specification, suitable options and the next step.</p><TextLink href="/components">View all components</TextLink></div>
      </div>
      <Tabs defaultValue="controls" orientation="vertical" className="k-product-explorer">
        <TabsList className="k-product-tabs" aria-label="Component categories">
          {products.map(item => <TabsTrigger key={item.id} value={item.id} className="k-product-tab"><span>{item.name}</span><ArrowUpRight size={22} aria-hidden="true" /></TabsTrigger>)}
        </TabsList>
        {products.map(item => <TabsContent value={item.id} key={item.id} className="k-product-panel">
          <div className="k-product-visual"><Image src={`/assets/industrial/photo-20261011/${item.image}.webp`} width={1200} height={1200} alt={item.alt} sizes="(max-width: 767px) 100vw, 55vw" /></div>
          <div className="k-product-description"><h3>{item.title}</h3><p>{item.description}</p><TextLink href={item.href}>{item.detail}</TextLink></div>
        </TabsContent>)}
        <p className="k-product-note">Illustrative component types.<br />Specifications are agreed for your application.</p>
      </Tabs>
    </section>

    <section className="k-engineering-section k-section" aria-labelledby="engineering-title">
      <div className="k-shell">
        <div className="k-engineering-top"><p className="k-topic">Custom solutions &amp; OEM</p><h2 id="engineering-title">Not every part starts<br />in a catalogue.</h2></div>
        <div className="k-engineering-layout">
          <figure className="k-engineering-image"><Image src="/assets/industrial/photo-20261011/core-engineering.webp" width={1600} height={1063} alt="Illustrative drawing, printed prototype and machined bracket showing stages of component development" sizes="(max-width: 767px) 100vw, 58vw" /><figcaption>From a requirement to a defined component. Illustrative development stages.</figcaption></figure>
          <div className="k-engineering-copy">
            <p>If a standard part does not suit the installation space or connections, we work through the required changes with you.</p>
            <Accordion type="single" collapsible defaultValue="drawing" className="k-engineering-accordion">
              {engineering.map(item => <AccordionItem value={item.id} key={item.id}><AccordionTrigger>{item.title}</AccordionTrigger><AccordionContent>{item.text}</AccordionContent></AccordionItem>)}
            </Accordion>
            <TextLink href="/oem-solutions">Explore OEM &amp; engineering</TextLink>
          </div>
        </div>
        <div className="k-manufacturing"><p>Manufacturing options<br /><span>Selected with our partners.</span></p><div className="flex flex-wrap gap-x-7 gap-y-4">{[['CNC machining', '/cnc-machining'], ['3D printing', '/3d-printing'], ['Sheet metal', '/sheet-metal-fabrication'], ['Injection molding', '/injection-molding']].map(([label, href]) => <Link key={href} href={href}>{label}<ArrowUpRight size={15} aria-hidden="true" /></Link>)}</div></div>
      </div>
    </section>

    <section className="k-lab-section" aria-labelledby="lab-title">
      <div className="k-shell k-lab-layout">
        <div className="k-lab-copy"><p className="k-topic">Komponia Lab</p><h2 id="lab-title">Checked against<br />your requirements.</h2><p className="k-lab-description">Our own lab checks agreed dimensions and functions. Quality support continues after the first sample and throughout recurring supply.</p>
          <dl className="k-lab-details"><div><dt>Dimensions &amp; function</dt><dd>Checks matched to the component and its application.</dd></div><div><dt>Batch sampling</dt><dd>Scope, criteria and documentation agreed for the order.</dd></div><div><dt>Ongoing support</dt><dd>One contact for deviations and supplier questions.</dd></div></dl>
          <TextLink href="/quality-and-lab" inverse>See how we check components</TextLink>
        </div>
        <figure className="k-lab-image"><Image src="/assets/industrial/quality-inspection.webp" width={1200} height={800} alt="Illustrative dimensional inspection using a micrometer beside a machined component" sizes="(max-width: 767px) 100vw, 50vw" /><figcaption>Illustrative inspection scene.</figcaption></figure>
      </div>
    </section>

    <section className="k-supply-section k-section k-shell" aria-labelledby="supply-title">
      <div className="k-section-intro"><h2 id="supply-title">Supply that follows<br />your demand.</h2><div><p>Bring recurring orders, imports and stock into one agreed plan. We adapt safety stock with your demand and coordinate deliveries.</p><TextLink href="/production-orders">Explore supply arrangements</TextLink></div></div>
      <ol className="k-supply-flow">{supply.map((step, index) => <li key={step.title}><div className="k-flow-track"><span>{index + 1}</span>{index < supply.length - 1 && <ArrowRight size={20} aria-hidden="true" />}</div><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      <div className="k-supply-bottom"><p>Quantities, stock ownership and call-off terms are agreed individually.</p><Button asChild variant="outline" className="k-button k-button-outline"><Link href="/contact?type=supply">Plan your supply<ArrowUpRight size={18} aria-hidden="true" /></Link></Button></div>
    </section>

    <section className="k-inquiry-section" aria-labelledby="inquiry-title"><div className="k-shell k-inquiry-layout"><div><h2 id="inquiry-title">Let’s look at<br />your component.</h2><p>A part number, a drawing or a description of the application.<br className="hidden md:block" /> We can work through the missing details together.</p><Button asChild className="k-button"><Link href="/contact">Start an inquiry<ArrowUpRight size={18} aria-hidden="true" /></Link></Button></div><div className="k-inquiry-contact"><p>Prefer a conversation?</p><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}<ArrowUpRight size={19} aria-hidden="true" /></a><a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a><Link href="/how-ordering-works" className="k-inquiry-process">How we work<ArrowRight size={16} aria-hidden="true" /></Link></div></div></section>
  </div>;
}
