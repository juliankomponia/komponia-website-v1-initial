import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

// Scope is grounded in Julian's confirmed strategy, not competitor promises.
const items = [
  {
    title: 'One personal contact',
    text: 'Engineering, sourcing, quality and logistics coordinated through one contact.',
    to: '/team-account',
    link: 'How coordination works',
    discipline: 'engineering',
  },
  {
    title: 'Documentation requirements',
    text: 'We clarify the required documents and responsibilities for the agreed component and supply.',
    to: '/quality-and-lab',
    link: 'Agree the documentation',
    discipline: 'quality',
  },
  {
    title: 'Call-offs & safety stock',
    text: 'Production quantities, smaller call-offs and stock terms agreed around your demand.',
    to: '/production-orders',
    link: 'Explore supply arrangements',
    discipline: 'supply',
  },
];

export default function ProcurementReadiness() {
  return <aside className="kp-procurement" aria-labelledby="procurement-title">
    <div className="kp-procurement__heading">
      <h3 id="procurement-title">For procurement teams</h3>
      <p>Technical requirements. Clear responsibilities.</p>
    </div>
    <div className="kp-procurement__items">
      {items.map(item => <div className="kp-procurement__item" data-discipline={item.discipline} key={item.title}>
        <h4>{item.title}</h4>
        <p>{item.text}</p>
        <Link className="kp-text-link" to={item.to}>{item.link}<ArrowRight size={15} aria-hidden="true" /></Link>
      </div>)}
    </div>
  </aside>;
}
