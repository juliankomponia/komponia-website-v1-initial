import { INDUSTRIAL_IMAGES as I } from '../data/images';
import { SubHero, FeatureRow } from '../components/Subpage';
import { SectionLead, DarkCta } from '../components/Sections';
import BrandLabel from '../components/BrandLabel';

const FOCUS_AREAS = [
  { value: 'Select', label: 'Components and technical advice' },
  { value: 'Develop', label: 'In-house CAD and custom OEM solutions' },
  { value: 'Check', label: 'Agreed checks in the Komponia-Lab' },
  { value: 'Supply', label: 'Recurring delivery and dynamic safety stock' },
];

export default function About() {
  return (
    <>
      <SubHero
        eyebrow="Komponia"
        title="Technical expertise. Personal responsibility."
        text="We support manufacturers and industrial users with technical components, custom OEM solutions and ongoing supply. One personal contact brings engineering, sourcing, quality and logistics together."
        img={I.heroComponents}
        cta="Prepare an inquiry"
      />

      <section className="bg-white section-pad">
        <div className="wrap-orig">
          <SectionLead title="Technical support around your application" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FOCUS_AREAS.map((s) => (
              <div key={s.label} className="rounded-[1rem] p-6 md:p-8 bg-black/[0.03]">
                <BrandLabel>{s.value}</BrandLabel>
                <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.69)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-gray section-pad">
        <div className="wrap-orig">
          <FeatureRow
            title="Rooted in WTS experience"
            text="Komponia builds on the technical component experience of WTS since 1997. Component selection and ongoing trade remain central to the offering, alongside individual solutions and agreed supply arrangements."
            img={I.ongoingSupply}
            imgAlt="Illustrative preparation of technical component deliveries"
          />
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="wrap-orig">
          <FeatureRow
            title="In-house CAD. The right manufacturing partners."
            text="We prepare CAD drawings and sketches in-house and coordinate prototypes and manufacturing with suitable partners. Our established supplier relationships and import expertise connect the technical solution with practical procurement and delivery."
            img={I.customEngineering}
            imgAlt="Illustrative review of a custom part and its technical requirements"
            flip
            link={{ label: 'Explore custom solutions', to: '/custom-solutions' }}
          />
        </div>
      </section>

      <section className="bg-brand-gray section-pad">
        <div className="wrap-orig">
          <FeatureRow
            title="Our Lab. Ongoing quality support."
            text="Our Komponia-Lab supports agreed dimensional and functional checks and batch sampling. Quality support continues through series supply, including complaint handling. Your personal contact coordinates the findings, manufacturer questions and next steps."
            img={I.qualityInspection}
            imgAlt="Illustrative dimensional inspection of a component"
            link={{ label: 'Explore Lab and quality support', to: '/quality-and-lab' }}
          />
        </div>
      </section>

      <DarkCta message="Have a component requirement in mind?" label="Prepare an inquiry" to="/contact" />
    </>
  );
}
