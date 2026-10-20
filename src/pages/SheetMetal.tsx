import { SubHero, Faq } from '../components/Subpage';
import { SectionLead, OrderingProcess, ProtolabsBanner, DarkCta, CapabilitiesCards } from '../components/Sections';
import { Link } from 'react-router';
import { CAPABILITY_IMAGES as C } from '../data/capability-images';

const PROCESSES = [
  {
    title: 'Laser cutting',
    text: 'This manufacturing process uses a high-power laser beam to cut a material sheet.',
    bullets: ['Define material, thickness and required geometry', 'Confirm process suitability and agreed checks'],
  },
  {
    title: 'Bending',
    text: 'This manufacturing process uses dies to produce a U-shape, V-shape or channel shape along a straight axis in ductile materials.',
    bullets: ['Define material, thickness and required geometry', 'Confirm process suitability and agreed checks'],
  },
];

const FINISHES = [
  { title: 'Standard (as cut)', text: 'Define edge condition, burr removal and the required surface state for cut and formed parts.' },
  { title: 'Bead blasting', text: 'Discuss surface texture, protected features and compatibility with the chosen material.' },
  { title: 'Brushed', text: 'Define brushing direction, appearance and any protected contact or functional surfaces.' },
  { title: 'Anodizing (type II)', text: 'Discuss coating type, material compatibility and appearance requirements for the application.' },
  { title: 'Anodizing (type III)', text: 'Assess wear-related surface requirements and define coating characteristics for the chosen material.' },
  { title: 'Powder coating', text: 'Specify color, coating requirements and any surfaces that need masking or electrical contact.' },
  { title: 'Black oxide', text: 'Check compatibility with the material and define appearance, protection and handling requirements.' },
  { title: 'Alodine', text: 'Consider conversion-coating requirements, electrical contact needs and applicable process constraints.' },
];

const FAQS = [
  { q: 'Which material families can be considered?', a: 'Aluminum, stainless steel and mild steel are material families to discuss. Grade, sheet thickness, suitability and source availability are confirmed in the offer.' },
  { q: 'How is the manufacturing approach selected?', a: 'Laser cutting and bending are approaches to consider against the required geometry, material and interfaces. Feasibility and the manufacturing source are defined for the specific part.' },
  { q: 'How are checks defined for the part?', a: 'Agree the dimensions, functional features, surface requirements and documentation used to assess the part. Samples and qualification are included where the application requires them.' },
  { q: 'How is the delivery schedule agreed?', a: 'Material, geometry, finish, quantity and agreed checks affect scheduling. Delivery dates are confirmed with the offer.' },
  { q: 'How is a surface finish chosen?', a: 'Start with appearance, contact surfaces, operating conditions and material compatibility. The named finishes are selection topics; the chosen process and documentation are confirmed in the offer.' },
];

export default function SheetMetal() {
  return (
    <>
      <SubHero
        eyebrow="Manufacturing"
        title="Sheet metal for custom components"
        text={
          <>
            Discuss <strong className="text-white font-medium">sheet metal cutting and bending</strong> for your component.
            Material, geometry, interfaces and agreed checks form the basis for the manufacturing approach.
          </>
        }
        cta="Prepare an inquiry"
        img={C.sheetMetal}
        imgAlt="Illustrative component example"
        imageCaption="Illustrative component example."
        imageFit="contain"
      />

      {/* capabilities */}
      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <SectionLead title="Sheet metal processes and requirements">
            The process depends on the geometry, sheet material, thickness and functional requirements.
            We coordinate a suitable approach and source against the agreed scope.
          </SectionLead>
          <div className="grid md:grid-cols-2 gap-4">
            {PROCESSES.map((p) => (
              <div key={p.title} className="cap-card">
                <div className="cap-text">
                  <span className="cap-title">{p.title}</span>
                  <span className="cap-body">{p.text}</span>
                  <span className="cap-body">
                    <ul>
                      {p.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* materials */}
      <section className="bg-brand-gray">
        <div className="wrap-orig section-pad">
          <SectionLead title="Sheet metal fabrication materials">
            These material families are starting points for selection. Grade, thickness, suitability and source availability
            are assessed for the part and confirmed in the offer.
          </SectionLead>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { n: 'Aluminum', d: 'Discuss the alloy, thickness, forming requirements and operating conditions.' },
              { n: 'Stainless steel', d: 'Define grade, surface condition, forming requirements and relevant documentation.' },
              { n: 'Mild steel', d: 'Consider grade, geometry, protective finish and the intended use of the part.' },
            ].map((m) => (
              <div key={m.n} className="rounded-[1rem] p-6 md:p-8" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>
                <h3 className="font-bold text-black text-[1.25rem] mb-3">{m.n}</h3>
                <p className="text-[14px]" style={{ color: 'rgba(0,0,0,0.56)' }}>{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* tolerances */}
      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <div className="max-w-[48rem]">
            <h2 className="h2-orig mb-4">Define tolerances for the component</h2>
            <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.69)' }}>
              Specify the dimensions and functional features that matter for assembly and use. Tolerance feasibility is assessed
              against the material, geometry and chosen process; agreed requirements and checks are recorded in the offer.
            </p>
          </div>
        </div>
      </section>

      {/* finishes */}
      <section className="bg-brand-gray">
        <div className="wrap-orig section-pad">
          <SectionLead title="Surface finish selection for sheet metal">
            Surface requirements should account for appearance, contact surfaces and the operating environment.
            The listed finishes are discussion topics; compatibility, process and source availability are confirmed for the part.
          </SectionLead>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FINISHES.map((f) => (
              <Link to="/surface-finishing-services" key={f.title} className="rounded-[1rem] p-6 transition-colors hover:bg-black/[0.08]" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>
                <h3 className="font-bold text-black mb-2">{f.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.56)' }}>{f.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <ProtolabsBanner />
        </div>
      </section>

      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <OrderingProcess />
        </div>
      </section>

      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <Faq items={FAQS} />
        </div>
      </section>

      <section className="bg-brand-gray">
        <div className="wrap-orig section-pad">
          <SectionLead title="Other manufacturing approaches" />
          <CapabilitiesCards />
        </div>
      </section>

      <DarkCta message="Have a sheet metal component requirement?" label="See the inquiry process" to="/how-ordering-works" />
    </>
  );
}
