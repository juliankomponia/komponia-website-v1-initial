import { useId } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { HOME_CONTENT as H } from '../data/home';
import { CORE_SERVICE_IMAGES } from '../data/images';
import './OpeningEngineering.css';

const SUPPORT_TITLES = ['In-house CAD', 'Sample checks', 'One contact'];

export default function OpeningEngineering() {
  const content = H['custom-solutions'];
  const titleId = useId();

  return <section className="op-engineering" aria-labelledby={titleId}>
    <div className="op-engineering-wrap">
      <header className="op-engineering-heading">
        <div>
          <p className="op-engineering-eyebrow">In-house engineering</p>
          <h2 id={titleId}>{content.title}</h2>
        </div>
        <div className="op-engineering-intro">
          <p>{content.intro}</p>
          <Link to={content.cta.to} className="op-engineering-link">{content.cta.label}<ArrowRight size={19} strokeWidth={1.6} aria-hidden="true" /></Link>
        </div>
      </header>

      <div className="op-engineering-spread">
        <figure className="op-engineering-assembly">
          <div className="op-engineering-stage">
            <img src={CORE_SERVICE_IMAGES[0]} width={1600} height={1063} loading="lazy" decoding="async"
              alt="Illustrative OEM assembly with a controller, terminal connections and an open metal housing" />
            <svg className="op-engineering-leaders" viewBox="0 0 1600 1063" fill="none" aria-hidden="true" focusable="false">
              <path d="M352 106H517L685 470" />
              <path d="M1296 159H1125L924 326" />
              <circle cx="685" cy="470" r="12" />
              <circle cx="924" cy="326" r="12" />
            </svg>
            <span className="op-engineering-reference op-engineering-reference--interfaces" aria-hidden="true">01</span>
            <span className="op-engineering-reference op-engineering-reference--mounting" aria-hidden="true">02</span>
          </div>
          <figcaption>Illustrative OEM assembly. Specifications are defined for your application.</figcaption>
        </figure>

        <div className="op-engineering-details">
          <figure className="op-engineering-detail">
            <div className="op-engineering-crop">
              <img src={CORE_SERVICE_IMAGES[0]} width={1600} height={1063} loading="lazy" decoding="async"
                alt="Enlarged view of the green terminal connections and cable routing in the same illustrative assembly" />
            </div>
            <figcaption>Connection detail from the same assembly.</figcaption>
          </figure>
          <dl className="op-engineering-points">
            <div>
              <dt><span aria-hidden="true">01</span>Interfaces</dt>
              <dd>Define connections and cable routing.</dd>
            </div>
            <div>
              <dt><span aria-hidden="true">02</span>Mounting</dt>
              <dd>Confirm fixing points and installation space.</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="op-engineering-support">
        {content.bullets.map((text, index) => <div key={text}>
          <h3>{SUPPORT_TITLES[index]}</h3>
          <p>{text}</p>
        </div>)}
      </div>
    </div>
  </section>;
}
