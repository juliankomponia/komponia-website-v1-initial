import type { CSSProperties } from 'react';
import { Check } from 'lucide-react';
import { partSrc } from '../../data/home-v7';
import { briefCount, partBySlug, useBriefState } from './briefStore';

const STAGES = ['Inquiry', 'Sketch & CAD', 'Sample & checks', 'Series', 'Supply'] as const;
const CHECKS = ['Dimensions', 'Function', 'Batch sample', 'Documented result'];
const STARTS = ['Part number', 'Drawing', 'Sample', 'Application'];

/**
 * "Living inquiry dossier": one document that fills in step by step, so the visitor sees what they bring,
 * what Komponia prepares and what they receive. Personalised with the component chosen in the stage below.
 * Illustrative – no real order data, dates or quantities.
 */
export default function Dossier({ step, live = false, compact = false }: { step: number; live?: boolean; compact?: boolean }) {
  const { slug, briefs } = useBriefState();
  const part = partBySlug(slug);
  const count = briefCount(slug ? briefs[slug] : undefined);
  const row = (i: number) => (i < step ? 'done' : i === step ? 'now' : 'next');

  return <div className="kp9-dossier" data-step={step} data-compact={compact || undefined} style={live ? undefined : { '--p': step / (STAGES.length - 1) } as CSSProperties} aria-hidden="true">
    <div className="kp9-dossier__head">
      <div className="kp9-dossier__part">
        {part ? <img src={partSrc(part.slug, '600')} alt="" width="600" height="600" loading="lazy" decoding="async" /> : <span className="kp9-dossier__blank" />}
        <div>
          <p className="kp9-dossier__kicker">Inquiry · Your company</p>
          <p className="kp9-dossier__title">{part ? part.name : 'Your component'}</p>
        </div>
      </div>
      <p className="kp9-dossier__status"><span />{STAGES[step]}</p>
    </div>

    <div className="kp9-track">
      <span className="kp9-track__line"><i /></span>
      {STAGES.map((s, i) => <span key={s} className="kp9-track__dot" data-state={row(i)} style={{ '--x': i / (STAGES.length - 1) } as CSSProperties}><em>{s}</em></span>)}
    </div>

    <dl className="kp9-rows">
      <div data-state={row(0)}>
        <dt>Starting point</dt>
        <dd className="kp9-chips">{STARTS.map(s => <span key={s}>{s}</span>)}</dd>
        <dd className="kp9-rows__note">{part && (count.known || count.variants)
          ? `Brief: ${count.variants} design${count.variants === 1 ? '' : 's'} selected, ${count.known} of 4 points known`
          : 'Function, interfaces and quantities clarified with your contact'}</dd>
      </div>
      <div data-state={row(1)}>
        <dt>Drawing &amp; CAD</dt>
        <dd className="kp9-done">Prepared in-house; manufacturing details agreed{step >= 1 && <Check size={14} className="kp9-tick" />}</dd>
      </div>
      <div data-state={row(2)}>
        <dt>Sample &amp; checks</dt>
        <dd className="kp9-checks">{CHECKS.map((c, i) => <span key={c} style={{ '--i': i } as CSSProperties}><Check size={13} />{c}</span>)}</dd>
      </div>
      <div data-state={row(3)}>
        <dt>Series</dt>
        <dd>Released by your company · produced by suitable manufacturers from the network</dd>
      </div>
      <div data-state={row(4)}>
        <dt>Supply</dt>
        <dd className="kp9-flow"><span>Komponia</span><i><b /><b /><b /></i><span className="kp9-flow__you">Your company</span></dd>
        <dd className="kp9-rows__note">Stock and call-offs planned around your production</dd>
      </div>
    </dl>
  </div>;
}
