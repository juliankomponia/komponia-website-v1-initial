import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import heroPoster from '../../assets/industrial/v10/hero-light-poster.webp';
import heroMobile from '../../assets/industrial/v10/hero-light-m.webp';
import { useMedia, REDUCED_QUERY } from '../v7/useMedia';

const SERVICES = ['Technical components', 'Custom solutions · CAD in-house', 'Recurring supply & call-offs'];

export default function HeroV10() {
  const reduced = useMedia(REDUCED_QUERY);
  return <section className="kp10-hero" id="homepage-overview" data-section-label="01 Overview" aria-labelledby="kp10-hero-title">
    <div className="kp-container kp10-hero__inner">
      <div className="kp10-hero__copy">
        <p className="kp10-eyebrow"><span aria-hidden="true" />Komponia · technical components</p>
        <h1 id="kp10-hero-title">Components.<br /><span>Composed.</span></h1>
        <p className="kp10-hero__lead">We source technical components, develop custom solutions and coordinate recurring supply – with one contact from selection to series delivery.</p>
        <div className="kp10-actions">
          <Link to="/contact" className="kp-button">Prepare an inquiry <ArrowRight size={18} aria-hidden="true" /></Link>
          <a href="#page-section-components" className="kp-text-link kp10-link" onClick={e => { e.preventDefault(); document.getElementById('page-section-components')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); }}>Explore components <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
      <figure className="kp10-hero__media">
        <picture>
          <source media="(max-width: 767px)" srcSet={heroMobile} />
          <img src={heroPoster} width="1600" height="904" alt="Machined metal part arranged with modules in Komponia blue, lavender and yellow." fetchPriority="high" decoding="async" />
        </picture>
        <figcaption><strong>01 / A component. Part of a bigger picture.</strong><span>AI-generated illustration</span></figcaption>
      </figure>
    </div>
    <div className="kp-container">
      <ul className="kp10-hero__services" aria-label="What Komponia coordinates">{SERVICES.map(s => <li key={s}>{s}</li>)}</ul>
    </div>
  </section>;
}
