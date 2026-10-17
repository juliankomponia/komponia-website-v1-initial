import { useState } from 'react';
import { SubHero, FeatureRow } from '../components/Subpage';
import { SectionLead, OrderingProcess, QualityStandards, IndustriesSection, ProtolabsBanner, DarkCta } from '../components/Sections';
import { Link } from 'react-router';
import { IMG } from '../data/site';

const CNC_IMGS = {
  milling: 'https://images.ctfassets.net/q2hzfkp3j57e/30YVqCmw3LC51a3EFRzc1R/8ba564107fa95002110f3e7d89444512/cnc_milling_anodized_def.webp?fit=thumb&fm=png&q=82',
  turning: 'https://images.ctfassets.net/q2hzfkp3j57e/78Ppw0OmfJ3yRrVPbnxBrU/ac3771c044f27e0a7e204434b7a0e9c0/cnc_turning_def.webp?fit=thumb&fm=png&q=82',
};

const METALS = ['Alloy steel', 'Aluminum', 'Brass', 'Bronze', 'Copper', 'Inconel', 'Invar 36', 'Mild steel', 'Stainless steel', 'Titanium', 'Tool steel'];
const PLASTICS = ['ABS', 'FR4', 'G-10', 'Nylon', 'PEEK', 'PEI', 'PET', 'PMMA (Acrylic)', 'Polycarbonate', 'Polyethylene', 'Polypropylene', 'POM (Delrin/Acetal)', 'PPSU', 'PTFE (Teflon)', 'PVC'];
const FINISHES = ['As machined', 'Smooth machining', 'Aluminum anodizing', 'Bead blasting', 'Polishing', 'Vapor smoothing', 'Black oxide', 'Powder coating'];

function MaterialsTabs() {
  const [tab, setTab] = useState<'materials' | 'finishes'>('materials');
  const [kind, setKind] = useState<'metals' | 'plastics'>('metals');
  return (
    <div>
      <div className="flex gap-8 border-b border-black/10 mb-6">
        {(['materials', 'finishes'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-[15px] font-bold transition-colors ${tab === t ? 'text-brand-heading shadow-[inset_0_-2px_0_#3E5AF5]' : 'text-brand-body hover:text-brand-heading'}`}
          >
            {t === 'materials' ? 'Materials' : 'Surface Finishes'}
          </button>
        ))}
      </div>
      {tab === 'materials' ? (
        <>
          <div className="inline-flex rounded-[200px] p-1 mb-8" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
            {(['metals', 'plastics'] as const).map((k) => (
              <button
                key={k}
                onClick={() => setKind(k)}
                className={`px-4 py-2 rounded-[32px] text-[14px] font-bold transition-colors ${kind === k ? 'bg-brand-blue text-white' : 'text-brand-heading hover:bg-black/10'}`}
              >
                {k === 'metals' ? 'Metals' : 'Plastics'}
              </button>
            ))}
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
            {(kind === 'metals' ? METALS : PLASTICS).map((m) => (
              <li key={m}>
                <Link to="/materials" className="text-[15px] text-brand-blue hover:text-brand-bluehover">{m}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
          {FINISHES.map((f) => (
            <li key={f}>
              <Link to="/surface-finishing-services" className="text-[15px] text-brand-blue hover:text-brand-bluehover">{f}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CncMachining() {
  return (
    <>
      <SubHero
        eyebrow="Manufacturing"
        title="CNC machining for custom components"
        text={
          <>
            We coordinate <strong className="text-white font-medium">CNC machining requirements</strong> for custom components.
            Geometry, material, tolerances and qualification are defined for the application and confirmed with the offer.
          </>
        }
        cta="Prepare an inquiry"
        img={IMG.heroCnc}
      />

      {/* capabilities */}
      <section data-section-label="Processes" className="bg-white">
        <div className="wrap-orig section-pad">
          <SectionLead title="CNC processes and selection requirements">
            The manufacturing approach depends on geometry, material, tool access and the required features.
            We clarify the component requirements and coordinate a suitable source, with the process and agreed checks
            defined for the specific part.
          </SectionLead>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/cnc-machining/cnc-milling-service" className="cap-card">
              <img src={CNC_IMGS.milling} alt="CNC machined part, CNC milling, anodized surface finish" loading="lazy" />
              <div className="cap-text">
                <span className="cap-title">CNC milling</span>
                <span className="cap-body">
                  Consider geometry, tool access, material and the features to be machined. The process and required tolerances
                  are assessed for the specific component.
                </span>
                <span className="cap-link card-link">Learn more</span>
              </div>
            </Link>
            <Link to="/cnc-machining/cnc-turning-service" className="cap-card">
              <img src={CNC_IMGS.turning} alt="CNC machined part, CNC turning, smooth surface finish" loading="lazy" />
              <div className="cap-text">
                <span className="cap-title">CNC turning</span>
                <span className="cap-body">Consider rotational geometry, interfaces, material and surface requirements. Dimensions and checks are agreed for the component.</span>
                <span className="cap-link card-link">Learn more</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* materials & finishes */}
      <section data-section-label="Materials & finishes" className="bg-white">
        <div className="wrap-orig section-pad">
          <SectionLead title="CNC material and finish selection">
            The following material names and finishes are selection topics, not a confirmed inventory. Suitability, grade,
            source availability and required documentation are checked for the application and confirmed in the offer.
          </SectionLead>
          <MaterialsTabs />
          <div className="requirements-table-wrap" tabIndex={0} role="region" aria-label="Technical requirements table">
            <table className="requirements-table">
              <caption>Define the part before selecting the process</caption>
              <thead><tr><th scope="col">Requirement</th><th scope="col">What to clarify</th><th scope="col">Agreed result</th></tr></thead>
              <tbody>
                <tr><th scope="row">Geometry & interfaces</th><td>Drawing revision, mating parts, tool access and critical dimensions.</td><td>A defined component version and the features to be assessed.</td></tr>
                <tr><th scope="row">Material & finish</th><td>Operating conditions, material grade and surface requirements.</td><td>Material and finish requirements for the proposed part.</td></tr>
                <tr><th scope="row">Samples & checks</th><td>Features to inspect, sample requirements and documentation.</td><td>Assessment criteria, responsibilities and approval steps.</td></tr>
                <tr><th scope="row">Quantity & supply</th><td>Initial quantities, recurring demand and preferred delivery dates.</td><td>Scope, delivery terms and any recurring supply arrangement.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ordering process */}
      <section data-section-label="Workflow" className="bg-brand-gray">
        <div className="wrap-orig section-pad">
          <OrderingProcess />
        </div>
      </section>

      {/* network */}
      <section data-section-label="Supplier coordination" className="bg-white">
        <div className="wrap-orig section-pad">
          <FeatureRow
            title="Coordinate the source around the part"
            text="A machining source is assessed against the component requirements and the agreed work. We clarify responsibilities for manufacturing, checks, documentation and delivery before proceeding."
            img={IMG.facIn}
          />
        </div>
      </section>

      {/* quality */}
      <section data-section-label="Qualification" className="bg-brand-gray">
        <div className="wrap-orig section-pad">
          <SectionLead title="Agreed requirements and documented checks">
            Define the dimensions, features and documents needed to assess the part. Samples and checks are agreed for the
            application; approval applies to the defined component version and use.
          </SectionLead>
          <QualityStandards />
        </div>
      </section>

      {/* industries */}
      <section data-section-label="Applications" className="bg-white">
        <div className="wrap-orig section-pad">
          <SectionLead title="Application requirements">
            The application determines the operating conditions, interfaces and documentation needed for the component.
            Industry-specific requirements are assessed for the particular task.
          </SectionLead>
          <IndustriesSection />
        </div>
      </section>

      <section className="bg-white">
        <div className="wrap-orig section-pad">
          <ProtolabsBanner />
        </div>
      </section>

      <DarkCta message="Have a drawing or component requirement?" label="See the inquiry process" to="/how-ordering-works" />
    </>
  );
}
