import { useEffect } from 'react';
import { Link } from 'react-router';
import ComponentSwitch from '../../components/ComponentSwitch';
import { componentPairs } from '../../data/component-pairs';
import './component-switch.css';

export default function ComponentSwitchPreview() {
  useEffect(() => { document.title = 'Komponia ↔ Echt – Vorschau | Komponia'; }, []);

  return (
    <div className="component-switch-preview" lang="de">
      <div className="component-switch-preview__bar">
        <div className="component-switch-preview__bar-inner">
          <span>Vorschau <span aria-hidden="true">/</span> Eine Komponente</span>
          <Link to="/">Zur Homepage <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <section className="component-switch-preview__section" aria-labelledby="component-switch-title">
        <div className="component-switch-preview__layout">
          <div className="component-switch-preview__copy">
            <p className="component-switch-preview__eyebrow">Komponenten</p>
            <h1 id="component-switch-title">Vom Konzept<br />zum echten Teil.</h1>
            <p className="component-switch-preview__intro">Entdecken Sie den Wechsel vom Komponia-Stil zum realistischen Bauteil – direkt am Beispiel eines Scrollverdichters.</p>
            <p className="component-switch-preview__instruction"><span aria-hidden="true">↔</span> Maus darüberhalten oder antippen.</p>
          </div>
          <ComponentSwitch pair={componentPairs[0]} />
        </div>
      </section>
    </div>
  );
}
