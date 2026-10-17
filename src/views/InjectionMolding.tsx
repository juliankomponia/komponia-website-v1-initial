'use client';

import { SubHero, CardGrid, Faq } from '../components/Subpage';
import { SectionLead, QualityStandards, CapabilitiesCards, DarkCta } from '../components/Sections';
import { IMG } from '../data/site';

const SERVICES = [
  {
    title: 'Injection molding',
    text: 'Consider the part geometry, thermoplastic material and tooling needed to produce the component.',
    img: 'https://images.ctfassets.net/q2hzfkp3j57e/1C8IVPd1qr2WLbFFhyZuTi/312409dfd4762a55cd7438adcfa9dd9b/Plastic_injection_molding.webp?w=800&h=800&fm=png',
  },
  {
    title: 'Insert molding',
    text: 'Define the insert, interfaces and molding requirements when a component is formed around an existing part.',
    img: 'https://images.ctfassets.net/q2hzfkp3j57e/1dyvotL8544yOgFLwcYqRS/a9dad8b5e25980256439a711951d8dde/Insert-molding.webp?w=800&h=800&fm=png',
  },
  {
    title: 'Overmolding',
    text: 'Assess material compatibility, interfaces and the requirements for molding one material over another.',
    img: 'https://images.ctfassets.net/q2hzfkp3j57e/u3amq2siK6oON0uViY0Ht/fcca28f9f898338e56f59a48f863f305/Overmolding.webp?w=800&h=800&fm=png',
  },
  {
    title: 'Liquid silicone rubber molding',
    text: 'Discuss silicone material, part geometry, curing and the assessment criteria for the intended application.',
    img: 'https://images.ctfassets.net/q2hzfkp3j57e/3YP2A32e416FFvCKLyePUc/5b77b8a19c2dc6f78ebc826a484e30f7/Liquid-silicone-rubber-molding.webp?w=800&h=800&fm=png',
  },
];

const TOOLING = [
  {
    title: 'Prototype tooling',
    sub: 'Tooling matched to sample and development requirements',
    bullets: ['Define intended sample and development quantities', 'Agree the tool design and required assessment', 'Confirm tool material, ownership and use'],
    dark: false,
  },
  {
    title: 'Production tooling',
    sub: 'Tooling matched to recurring production requirements',
    bullets: ['Define expected quantities and production requirements', 'Agree tool material, maintenance and change rules', 'Confirm ownership, use and release conditions'],
    dark: true,
  },
];

const PROCESS_STEPS = [
  { title: 'Share the requirement', text: 'Provide a drawing, model or part description with the intended use and expected quantities.' },
  { title: 'Agree the scope', text: 'Clarify the part, material, tooling work, responsibilities and delivery conditions for the offer.' },
  { title: 'Review manufacturability', text: 'Define which geometry, interface and process questions need assessment before tooling proceeds.' },
  { title: 'Assess agreed samples', text: 'Evaluate the samples against the agreed criteria and document the application-specific approval decision.' },
  { title: 'Arrange supply', text: 'Confirm the released requirements, quantities, checks, documentation and delivery conditions.' },
  { title: 'Plan repeat orders', text: 'Agree repeat quantities, call-offs, stock terms and how changes to the component or tool are handled.' },
];

const FINISHES = [
  { title: 'SPI finish references', text: 'Use the required finish reference to discuss surface appearance, texture and assessment criteria.' },
  { title: 'VDI finish references', text: 'Define the texture requirement and confirm its feasibility for the material and tooling approach.' },
];

const MATERIALS = ['ABS', 'PC', 'PC/ABS', 'PP', 'PE', 'Nylon (PA)', 'POM', 'PMMA', 'PBT', 'TPU', 'TPE', 'PS', 'HDPE', 'PEEK', 'PEI'];

const FAQS = [
  { q: 'How is the order quantity defined?', a: 'Discuss development quantities and expected recurring demand alongside the tooling approach. The quantities and conditions for the specific component are confirmed in the offer.' },
  { q: 'How is the tooling schedule agreed?', a: 'Geometry, material, tool design, samples and required checks affect the schedule. Tooling and delivery dates are confirmed with the offer.' },
  { q: 'Which materials can be considered?', a: 'The listed thermoplastics and silicone process group are selection topics. A specific grade, process, suitability and source availability require confirmation for the application.' },
];

export default function InjectionMolding() {
  return (
    <>
      <SubHero
        eyebrow="Manufacturing"
        title="Injection molding for custom components"
        text="Discuss molded components and tooling around your application. Material, geometry, samples and qualification are defined for the part and confirmed with the offer."
        img={IMG.heroIm}
        cta="Prepare an inquiry"
      />

      <section className="bg-white section-pad">
        <div className="wrap-orig">
          <SectionLead title="Molding processes and requirements">
            Compare the process groups against material, geometry, interfaces and expected quantities.
            Process suitability and the manufacturing source are assessed for the application.
          </SectionLead>
          <CardGrid cards={SERVICES} cols={4} />
        </div>
      </section>

      <section id="tooling" className="bg-brand-gray section-pad">
        <div className="wrap-orig">
          <SectionLead title="Tooling for development and recurring production" />
          <div className="grid md:grid-cols-2 gap-4">
            {TOOLING.map((t) => (
              <div key={t.title} className={t.dark ? 'hero-panel rounded-[1rem] p-6 md:p-8' : 'rounded-[1rem] p-6 md:p-8 bg-black/[0.03]'}>
                <h3 className={`font-bold text-[1.25rem] md:text-[1.375rem] mb-2 ${t.dark ? 'text-white' : 'text-black'}`}>{t.title}</h3>
                <p className="text-base md:text-[1.125rem] mb-5" style={{ color: t.dark ? 'rgba(255,255,255,0.62)' : '#262626' }}>{t.sub}</p>
                <ul className="space-y-2.5">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[14px]" style={{ color: t.dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-[7px] shrink-0" />{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="the-process" className="bg-white section-pad">
        <div className="wrap-orig">
          <SectionLead title="From requirement to agreed molding scope" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.title} className="rounded-[1rem] p-6 md:p-8 bg-black/[0.03]">
                <span className="w-9 h-9 rounded-full bg-brand-blue text-white font-bold flex items-center justify-center mb-4">{i + 1}</span>
                <h3 className="font-bold text-black text-[1.25rem] mb-2">{s.title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: '#262626' }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-gray section-pad">
        <div className="wrap-orig grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="h2-orig mb-4">Injection molding surface finishes</h2>
            <p className="lead-orig text-[15px] leading-relaxed mb-6">
              Define the surface appearance, texture and functional requirements for the molded part. Finish references,
              material compatibility and tooling feasibility are confirmed in the offer.
            </p>
            <div className="space-y-3">
              {FINISHES.map((f) => (
                <div key={f.title} className="rounded-[1rem] p-6 bg-black/[0.03]">
                  <h3 className="font-bold text-black text-[15px] mb-1">{f.title}</h3>
                  <p className="text-[13px]" style={{ color: 'rgba(0,0,0,0.56)' }}>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="h2-orig mb-4">Injection molding materials</h2>
            <p className="lead-orig text-[15px] leading-relaxed mb-6">
              These material names are selection topics, not confirmed stock. Grade, process suitability and source availability
              are checked against the application and agreed in the offer.
            </p>
            <div className="flex flex-wrap gap-2">
              {MATERIALS.map((m) => (
                <span key={m} className="bg-black/[0.03] text-[13px] font-medium px-3 py-1.5 rounded-full" style={{ color: 'rgba(0,0,0,0.85)' }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-section-label="Qualification" className="bg-brand-gray section-pad"><div className="wrap-orig"><QualityStandards /></div></section>

      <section className="bg-white section-pad">
        <div className="wrap-orig">
          <Faq items={FAQS} />
        </div>
      </section>

      <section className="bg-brand-gray section-pad">
        <div className="wrap-orig">
          <SectionLead title="Other manufacturing approaches" />
          <CapabilitiesCards />
        </div>
      </section>

      <DarkCta message="Have a molded component or tooling requirement?" label="See the inquiry process" to="/how-ordering-works" />
    </>
  );
}
