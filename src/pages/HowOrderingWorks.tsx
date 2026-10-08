import { INDUSTRIAL_IMAGES as I } from '../data/images';
import { SubHero, FeatureRow } from '../components/Subpage';
import { OrderingProcess, QualityStandards, DarkCta } from '../components/Sections';
import { IMG } from '../data/site';

const HOW_IMGS = {
  upload: I.customEngineering,
  quote: I.customEngineering,
};

export default function HowOrderingWorks() {
  return (
    <>
      <SubHero
        eyebrow="Technical procurement"
        title="How we work"
        text="Start with a part number, drawing, sample or application description. We clarify the requirements, compare suitable approaches and agree the scope before arranging supply."
        img={I.customEngineering}
        cta="Prepare an inquiry"
      />

      <section className="bg-white section-pad">
        <div className="wrap-orig">
          <FeatureRow
            title="1. Share and clarify your requirements"
            text="Describe the function, interfaces and operating conditions of the component. A complete drawing is helpful, but a part number, sample or description can also start the discussion."
            bullets={[
              'Include existing drawings, datasheets or part references.',
              'State quantities, preferred dates and installation conditions.',
              'Identify required checks, approvals and documentation.',
            ]}
            img={HOW_IMGS.upload}
          />
        </div>
      </section>

      <section className="bg-brand-gray section-pad">
        <div className="wrap-orig">
          <FeatureRow
            title="2. Compare options and agree the offer"
            text="The approach may involve an existing component, an adapted design or a new part. We define goods or project scope, responsibilities, price and delivery conditions in the offer."
            bullets={[
              'Compare component variants and suitable manufacturing routes.',
              'Agree the technical work, samples and checks needed.',
              'Confirm quantities, delivery terms and responsibilities.',
            ]}
            img={HOW_IMGS.quote}
            flip
          />
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="wrap-orig">
          <FeatureRow
            title="3. Assess samples where required"
            text="Custom or replacement components may need samples and agreed qualification. Results, differences and the application-specific approval decision are documented before the next agreed step."
            img={IMG.facUs}
          />
        </div>
      </section>

      <section className="bg-brand-gray section-pad">
        <div className="wrap-orig">
          <FeatureRow
            title="4. Arrange delivery and recurring supply"
            text="Delivery follows the agreed quantities, documentation and conditions. For recurring needs, call-offs, stock, supplier coordination and change rules can be included in a defined supply arrangement."
            img={IMG.manyCnc}
            flip
          />
        </div>
      </section>

      <OrderingProcess />
      <QualityStandards />
      <DarkCta message="Explore the component requirements for your application" label="Explore components" to="/components" />
    </>
  );
}
