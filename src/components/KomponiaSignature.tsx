import { Box, Settings, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const mark = '/assets/brand/komponia-mark.svg';
import BrandLabel from './BrandLabel';
import { HOME_CONTENT as H } from '../data/home';

const disciplines = [
  { title: 'Sourcing', text: 'The right component and manufacturer.', icon: Box },
  { title: 'Engineering', text: 'Drawings, custom versions and prototypes.', icon: Settings },
  { title: 'Quality', text: 'Defined checks and documented findings.', icon: ShieldCheck },
  { title: 'Supply', text: 'Stock, call-offs and delivery planning.', icon: Truck },
];

export default function KomponiaSignature() {
  return <div className="feature-row grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
    <div className="feature-copy">
      <BrandLabel>Our background</BrandLabel>
      <h2 className="h2-orig mb-4">{H.heritage.title}</h2>
      <p className="lead-orig mb-6">{H.heritage.intro}</p>
      <Link href="/about" className="arrow-link">Meet Komponia <ArrowRight size={20} aria-hidden="true" /></Link>
    </div>
    <div className="komponia-signature">
      <div className="signature-heading">
        <img src={mark} width={72} height={74} alt="Komponia" loading="lazy" />
        <p>Technical procurement.<br /><span>Real progress.</span></p>
      </div>
      <dl className="signature-disciplines">
        {disciplines.map(({ title, text, icon: Icon }, index) => <div key={title}>
          <dt><Icon size={22} strokeWidth={1.6} aria-hidden="true" /><span>{title}</span><small aria-hidden="true">0{index + 1}</small></dt>
          <dd>{text}</dd>
        </div>)}
      </dl>
    </div>
  </div>;
}
