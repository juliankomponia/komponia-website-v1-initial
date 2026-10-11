import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import mark from '../assets/brand/komponia-mark.svg';
import BrandLabel from './BrandLabel';
import { HOME_CONTENT as H } from '../data/home';

const disciplines = [
  { title: 'Sourcing', text: 'The right component and manufacturer.', tone: 'blue' },
  { title: 'Engineering', text: 'Drawings, custom versions and prototypes.', tone: 'blue' },
  { title: 'Quality', text: 'Defined checks and documented findings.', tone: 'lavender' },
  { title: 'Supply', text: 'Stock, call-offs and delivery planning.', tone: 'yellow' },
];

export default function KomponiaSignature() {
  return <div className="komponia-heritage feature-row grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
    <div className="feature-copy">
      <BrandLabel inverse>Our background</BrandLabel>
      <h2 className="h2-orig mb-4">{H.heritage.title}</h2>
      <p className="lead-orig mb-6">{H.heritage.intro}</p>
      <Link to="/about" className="arrow-link signature-about-link">Meet Komponia <ArrowRight size={20} aria-hidden="true" /></Link>
    </div>
    <div className="komponia-signature">
      <div className="signature-heading">
        <img src={mark} width={112} height={114} alt="Komponia" loading="lazy" />
        <p>Technical procurement.<br /><span>Real progress.</span></p>
      </div>
      <dl className="signature-disciplines">
        {disciplines.map(({ title, text, tone }, index) => <div key={title}>
          <dt><span className={`signature-module signature-module--${tone}`} aria-hidden="true">0{index + 1}</span><span>{title}</span></dt>
          <dd>{text}</dd>
        </div>)}
      </dl>
    </div>
  </div>;
}
