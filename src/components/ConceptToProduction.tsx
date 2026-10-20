import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import ComponentSwitch from './ComponentSwitch';
import HomeChapter from './HomeChapter';
import { componentPairs } from '../data/component-pairs';
import { HOME_CONTENT } from '../data/home-stand2';
import './ConceptToProduction.css';

const content = HOME_CONTENT['concept-to-production'];
const component = componentPairs.find(pair => pair.slug === content.component.slug);

export default function ConceptToProduction() {
  return (
    <section className="home-concept" id="concept-to-production" data-section-label="02 What we build" aria-labelledby="concept-to-production-title">
      <div className="wrap-orig home-concept__inner">
        <HomeChapter number="02" title="What we build" />
        <div className="home-concept__main">
          <div className="home-concept__copy">
            <h2 id="concept-to-production-title">{content.title}</h2>
            <p className="home-concept__intro">{content.intro}</p>
            <div className="home-concept__actions">
              <Link className="kp-button" to={content.cta.to}>
                {content.cta.label}<ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="kp-text-link" to={content.secondaryCta.to}>
                {content.secondaryCta.label}<ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          {component && <div className="home-concept__visual">
            <ComponentSwitch
              pair={{ ...component, name: content.component.name }}
              locale="en"
              imageSizes="(max-width: 767px) 90vw, (max-width: 1199px) 42vw, 500px"
              hintText={content.component.hint}
            />
            <p className="home-concept__caption">{content.component.caption}</p>
          </div>}
        </div>
        <ol className="home-concept__steps" aria-label={content.stepsLabel}>
          {content.steps.map((step, index) => (
            <li key={step.title}>
              <span className="home-concept__step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{step.title}</h3><p>{step.text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
