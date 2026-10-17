'use client';

import { SubHero, CardGrid, FeatureRow, Faq } from '../components/Subpage';
import {
  SectionLead, OrderingProcess, QualityStandards, IndustriesSection, ProtolabsBanner,
  PartsGallery, NetworkGallery, ReviewsSection, CaseStudies, DarkCta, CapabilitiesCards,
} from '../components/Sections';
import Link from 'next/link';

import { Check } from 'lucide-react';
import { IMG } from '../data/site';

const TECHS = [
  {
    title: 'FDM — Fused Deposition Modeling',
    desc: 'Filament-based printing',
    specs: ['Consider layer direction, geometry and intended use', 'Confirm material, dimensions and assessment criteria'],
    img: 'https://images.ctfassets.net/q2hzfkp3j57e/3vq5CaEYGhwH2gtQZCn7oQ/9905796dd08e464cc05c8f76c53c161e/fdm_capabilities.webp?fit=thumb&fm=png&q=82',
    to: '/3d-printing/fdm',
  },
  {
    title: 'SLS — Selective Laser Sintering',
    desc: 'Powder-based polymer printing',
    specs: ['Consider geometry, material and intended use', 'Agree finish, quantity and evaluation criteria'],
    img: 'https://images.ctfassets.net/q2hzfkp3j57e/4U0hbO2DaDK0ikTJC3DOd4/e8c6604e0203eb4c78f991cd2dc068a4/sls_capabilities.webp?fit=thumb&fm=png&q=82',
    to: '/3d-printing/sls',
  },
  {
    title: 'MJF — Multi Jet Fusion',
    desc: 'Powder-based polymer printing',
    specs: ['Consider geometry, material and intended use', 'Agree finish, quantity and evaluation criteria'],
    img: 'https://images.ctfassets.net/q2hzfkp3j57e/54nsXHICMJEjYLtzjr63Gy/0253cca2a404ec56ef89e1618fbe54aa/mjf_capabilities.webp?fit=thumb&fm=png&q=82',
    to: '/3d-printing/mjf',
  },
  {
    title: 'SLA — Stereolithography',
    desc: 'Resin-based printing',
    specs: ['Consider detail, surface and intended use', 'Confirm resin, dimensions and assessment criteria'],
    img: 'https://images.ctfassets.net/q2hzfkp3j57e/4lb7tM2wQ6xuHYTHdhYhhe/c710535fe86666b75628cd4ac48d3084/sla_capabilities.webp?fit=thumb&fm=png&q=82',
    to: '/3d-printing/sla-dlp',
  },
];

const MATERIALS = [
  { title: 'Prototyping plastics', text: 'PLA, ABS, PETG and ASA are examples to discuss for concept models. Suitability and grade depend on the requirements.' },
  { title: 'Engineering plastics', text: 'Nylon, TPU and PC are material families to consider against the mechanical, thermal and connection requirements.' },
  { title: 'Resins', text: 'Discuss resin types against the detail, surface and intended use of the part. Grade and process suitability are confirmed for the offer.' },
  { title: 'Specialty materials', text: 'PEI and filled nylon types are selection topics where the application calls for them. Suitability and source availability require confirmation.' },
];

const FAQS = [
  { q: 'Which materials can be considered?', a: 'The material families listed here are selection topics. A specific grade, process, suitability and source availability are assessed against the application and confirmed in the offer.' },
  { q: 'How is a printing process selected?', a: 'Start with geometry, intended use, material requirements and the features that need to be assessed. These help compare FDM, SLS, MJF and SLA for the specific part.' },
  { q: 'How is the delivery schedule agreed?', a: 'Material, process, geometry, finish, quantity and required checks affect scheduling. Delivery dates are confirmed with the offer.' },
];

export default function ThreeDPrinting() {
  return (
    <>
      <SubHero
        eyebrow="Manufacturing"
        title="3D printing for prototypes and custom parts"
        text={
          <>
            Discuss <strong className="text-white font-medium">3D printed prototypes and custom parts</strong> around your
            application. Process, material, dimensions and agreed checks are assessed for the specific requirement.
          </>
        }
        cta="Prepare an inquiry"
        img={IMG.hero3dp}
      />

      {/* techniques */}
      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <SectionLead title="Printing processes to consider">
            Different printing processes suit different geometries, materials and intended uses. The process groups below
            provide a starting point for discussion; suitability and the source are confirmed for the application.
          </SectionLead>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {TECHS.map((t) => (
              <Link href={t.to} key={t.title} className="cap-card">
                <img src={t.img} alt={t.title} loading="lazy" />
                <div className="cap-text">
                  <span className="cap-title !text-[1.05rem] !leading-snug md:!text-[1.15rem]">{t.title}</span>
                  <span className="cap-subtitle !text-[15px]">{t.desc}</span>
                  <span className="cap-body">
                    <ul>
                      {t.specs.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </span>
                  <span className="cap-link card-link">Learn more</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* instant quotes */}
      <section className="bg-brand-gray">
        <div className="wrap-orig section-pad grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <img src={IMG.interface} alt="Manufacturing interface reference" loading="lazy" className="w-full rounded-[3px]" />
          </div>
          <div>
            <h2 className="h2-orig mb-4">Define the requirement before the offer</h2>
            <ul className="space-y-2.5">
              {[
                'Share a drawing, model or description of the intended use.',
                'Identify geometry, material, finish and quantity requirements.',
                'Agree process, checks and delivery conditions in the offer.',
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[15px]" style={{ color: 'rgba(0,0,0,0.85)' }}>
                  <Check size={18} className="text-brand-blue shrink-0 mt-0.5" strokeWidth={2.5} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ordering process */}
      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <OrderingProcess />
        </div>
      </section>

      {/* quality */}
      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <SectionLead title="Qualification for the specific part">
            Define the features, samples and documentation used to assess the part. Checks and approval criteria are agreed
            for the component version and its intended application.
          </SectionLead>
          <QualityStandards />
        </div>
      </section>

      {/* materials */}
      <section className="bg-brand-gray">
        <div className="wrap-orig section-pad">
          <SectionLead title="3D printing materials">
            Material families and grades are considered against the intended use. These examples do not confirm
            stock or process availability; suitable materials and required documentation are agreed in the offer.
          </SectionLead>
          <CardGrid cards={MATERIALS} cols={4} />
        </div>
      </section>

      {/* industries */}
      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <SectionLead title="Application requirements" />
          <IndustriesSection />
        </div>
      </section>

      {/* network */}
      <section className="bg-brand-gray">
        <div className="wrap-orig section-pad">
          <FeatureRow
            title="Match the process and source to the part"
            text="We coordinate the component requirements with suitable sources. Process, material, evaluation criteria and delivery conditions are defined for the task rather than assumed from a general capability list."
            img={IMG.facNl}
          />
        </div>
      </section>

      {/* gallery */}
      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <SectionLead title="Component selection topics" />
          <PartsGallery />
        </div>
      </section>

      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <ProtolabsBanner />
        </div>
      </section>

      {/* partners */}
      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <SectionLead title="Tasks in partner coordination" />
          <NetworkGallery />
        </div>
      </section>

      {/* reviews */}
      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <ReviewsSection />
        </div>
      </section>

      {/* case studies */}
      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <SectionLead title="Typical technical requirements" />
          <CaseStudies />
        </div>
      </section>

      {/* faq */}
      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <Faq items={FAQS} />
        </div>
      </section>

      {/* other capabilities */}
      <section className="bg-brand-gray">
        <div className="wrap-orig section-pad">
          <SectionLead title="Other manufacturing approaches" />
          <CapabilitiesCards />
        </div>
      </section>

      <DarkCta message="Have a prototype or component requirement?" label="See the inquiry process" to="/how-ordering-works" />
    </>
  );
}
