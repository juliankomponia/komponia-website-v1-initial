import { INDUSTRIAL_IMAGES as I } from '../data/images';
import { SubHero, FeatureRow } from '../components/Subpage';
import { OrderingProcess, QualityStandards, DarkCta } from '../components/Sections';

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
        text="Start with a part number, drawing, sample or application description. Your personal contact coordinates technical work, sourcing, quality and logistics from the agreed requirement through delivery."
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
            text="We select an existing component or use in-house CAD and sketches to define an adapted or new part. Suitable manufacturers contribute prototypes and production. The accompanying process is included in the agreed supply scope without a separate process surcharge; any work beyond it is agreed separately."
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
            text="The Komponia-Lab supports agreed dimensional and functional checks and batch sampling. We coordinate manufacturer documents and any required specialist evidence. Results, differences and the application-specific release are agreed before the next step."
            img={I.qualityInspection}
          />
        </div>
      </section>

      <section className="bg-brand-gray section-pad">
        <div className="wrap-orig">
          <FeatureRow
            title="4. Arrange delivery and recurring supply"
            text="We organise procurement, import and logistics. For recurring demand, we coordinate call-offs and dynamic safety stock within agreed limits and commercial terms. Ongoing quality management and complaint handling remain part of the agreed support."
            img={I.ongoingSupply}
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
