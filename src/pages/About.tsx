import { INDUSTRIAL_IMAGES as I } from '../data/images';
import { SubHero, FeatureRow } from '../components/Subpage';
import { SectionLead, DarkCta } from '../components/Sections';
import BrandLabel from '../components/BrandLabel';

const FOCUS_AREAS = [
  { value: 'Select', label: 'Components and technical advice' },
  { value: 'Adapt', label: 'Custom technical solutions' },
  { value: 'Check', label: 'Qualification to agreed requirements' },
  { value: 'Supply', label: 'Recurring deliveries and stock terms' },
];

export default function About() {
  return (
    <>
      <SubHero
        eyebrow="Komponia"
        title="About Komponia"
        text="We help manufacturers and industrial users select, adapt and source technical components. Our offering combines components and advice, custom solutions and ongoing supply."
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
            title="Technical work and suitable partners"
            text="We coordinate component selection, engineering, samples and procurement around the application. Suitable partners are involved where needed, with scope and responsibilities defined for the task."
            img={I.customEngineering}
            imgAlt="Illustrative review of a custom part and its technical requirements"
            flip
            link={{ label: 'Explore components', to: '/components' }}
          />
        </div>
      </section>

      <section className="bg-brand-gray section-pad">
        <div className="wrap-orig">
          <FeatureRow
            title="Checks defined for the application"
            text="Qualification is specific to the component and its use. We agree which samples, checks and documents are needed, and record the basis for the application-specific approval decision."
            img={I.qualityInspection}
            imgAlt="Illustrative dimensional inspection of a component"
            link={{ label: 'See the inquiry process', to: '/how-ordering-works' }}
          />
        </div>
      </section>

      <DarkCta message="Have a component requirement in mind?" label="Prepare an inquiry" to="/contact" />
    </>
  );
}
