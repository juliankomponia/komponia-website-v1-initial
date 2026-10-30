import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { HOME_CONTENT as H } from '../../data/home-stand2';
import { CAPABILITY_IMAGES } from '../../data/capability-images';

/** v10 bento: the twelve capability areas as calm tiles of different sizes, each with its cut-out object. */
export default function CapsBento() {
  const cards = H.capabilities.cards;
  return <section className="kp10-caps" id="page-section-capabilities" data-section-label="04 Capabilities" aria-labelledby="kp10-caps-title">
    <div className="kp-container">
      <header className="kp10-head">
        <p className="kp10-eyebrow"><span aria-hidden="true" />Components &amp; custom parts</p>
        <h2 id="kp10-caps-title">Components.<br /><em>Made for your application.</em></h2>
        <p className="kp10-head__intro">We coordinate technical requirements, suitable manufacturers, agreed checks and supply for your project.</p>
      </header>
      <ul className="kp10-bento">
        {cards.map((card, i) => <li key={card.media} data-size={i === 0 ? 'xl' : i === 1 ? 'wide' : undefined} data-tone={i === 0 ? 'accent' : undefined}>
          <Link to={card.to}>
            <span className="kp10-bento__text">
              <span className="kp10-bento__title">{card.title}</span>
              <span className="kp10-bento__desc">{card.desc}</span>
            </span>
            <img src={CAPABILITY_IMAGES[card.media]} alt="" width="1600" height="960" loading="lazy" decoding="async" />
            <ArrowUpRight className="kp10-bento__arrow" size={18} aria-hidden="true" />
          </Link>
        </li>)}
      </ul>
      <p className="kp10-note">Illustrative, AI-generated object renderings.</p>
    </div>
  </section>;
}
