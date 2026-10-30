import { useEffect, useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import { Link } from 'react-router';
import engineeredImage from './media/cnc-daniel-smyth.jpg';
import machiningFilm from './media/cnc-daniel-smyth.mp4';
import procurementImage from '../../assets/hero-slides/procurement.jpg';
import supplyImage from '../../assets/hero-slides/supply-chain.jpg';
import seriesImage from '../../assets/hero-slides/series.jpg';
import { ConceptHeader, CommonDepth, ConceptFooter } from './shared';
import './editorial-concept.css';

const themes = [
  {
    label: 'Find a component', discipline: 'Sourcing', image: procurementImage,
    alt: 'An industrial procurement setting',
    title: 'Start with what your application needs.',
    copy: 'Share a part number, a specification or the task it needs to perform. We clarify suitable components and the details that matter.',
    route: '/contact?type=component&entry=part-number', action: 'Discuss a component',
  },
  {
    label: 'Develop a custom part', discipline: 'Engineering', image: engineeredImage,
    alt: 'Close-up photograph of a milling tool cutting a metal workpiece.',
    title: 'Good parts start with good questions.',
    copy: 'Material, fit, function and manufacturability. We help turn your requirements into a clear brief, with CAD support in-house.',
    route: '/contact?type=custom&entry=drawing', action: 'Discuss your drawing',
  },
  {
    label: 'Move into series', discipline: 'Production coordination', image: seriesImage,
    alt: 'An industrial production environment',
    title: 'Think beyond the first sample.',
    copy: 'Align the specification, manufacturing route and agreed checks before moving into recurring production with our manufacturing partners.',
    route: '/contact?type=oem&entry=application', action: 'Plan the next step',
  },
  {
    label: 'Organise supply', discipline: 'Recurring supply', image: supplyImage,
    alt: 'Pallets and packaged goods in a warehouse loading area',
    title: 'A good part. Available when it matters.',
    copy: 'Bring forecasts, batch sizes and call-offs into one conversation. We work with you on a supply arrangement that fits your operation.',
    route: '/contact?type=supply&entry=application', action: 'Discuss recurring demand',
  },
];

export default function EditorialConcept() {
  const [themeIndex, setThemeIndex] = useState(1);
  const theme = themes[themeIndex];
  const [filmOpen, setFilmOpen] = useState(false);
  const filmDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (filmOpen) filmDialog.current?.showModal();
    else filmDialog.current?.close();
  }, [filmOpen]);

  return (
    <div className="kd kd-editorial">
      <ConceptHeader />
      <dialog ref={filmDialog} className="ke-film-dialog" aria-labelledby="ke-film-title" onClose={() => setFilmOpen(false)}>
        <div className="ke-film-dialog__heading"><div><h2 id="ke-film-title">From stock to shape.</h2><p>Machining study · Film by <a href="https://www.pexels.com/video/a-machine-is-cutting-metal-with-a-metal-cutting-tool-9033891/" target="_blank" rel="noreferrer">Daniel Smyth / Pexels</a></p></div><button type="button" aria-label="Close machining film" onClick={() => setFilmOpen(false)}><X size={22} /></button></div>
        {filmOpen && <video controls autoPlay muted playsInline preload="none" poster={engineeredImage} src={machiningFilm} aria-label="CNC machining: milling a metal workpiece" />}
      </dialog>

      <section className="ke-opening" aria-labelledby="ke-title">
        <div className="kd-container ke-opening__top">
          <p className="kd-eyebrow">Technical components. Human expertise.</p>
          <span className="ke-history">Built on WTS experience <span>since 1997.</span></span>
        </div>
        <div className="kd-container ke-heading-wrap">
          <h1 id="ke-title">Supply <span>redefined.</span></h1>
        </div>
        <div className="kd-container ke-opening__intro">
          <p>Technical components, custom solutions and recurring supply.<br className="ke-desktop-break" /> Connected by people who understand the whole picture.</p>
          <Link className="kd-link ke-intro-link" to="/contact">Bring us your challenge <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="ke-scene" id="ke-theme-scene" aria-live="polite" aria-atomic="true">
          <img key={theme.image} className="ke-scene__image" src={theme.image} alt={theme.alt} fetchPriority="high" />
          {themeIndex === 1 && <button className="ke-film-open" type="button" onClick={() => setFilmOpen(true)}><Play size={15} aria-hidden="true" />Watch machining<span>21 sec</span></button>}
          <div className="ke-scene__folio" aria-hidden="true"><span>0{themeIndex + 1}</span><i /></div>
          <div className="ke-scene__story">
            <p className="kd-eyebrow">{theme.discipline}</p>
            <h2>{theme.title}</h2>
            <p>{theme.copy}</p>
            <Link className="kd-link" to={theme.route}>{theme.action}<span aria-hidden="true">↗</span></Link>
          </div>
          <span className="ke-scene__caption">{themeIndex === 1 ? 'Machining study · Daniel Smyth / Pexels' : 'Industrial application imagery'}</span>
        </div>

        <div className="ke-theme-nav" aria-label="Explore your starting point">
          {themes.map((item, index) => (
            <button key={item.label} type="button" aria-pressed={themeIndex === index} aria-controls="ke-theme-scene" onClick={() => setThemeIndex(index)}>
              <span className="ke-theme-nav__number">0{index + 1}</span>
              <span>{item.label}</span>
              <span className="ke-theme-nav__arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="ke-parts kd-container" aria-labelledby="ke-parts-title">
        <div className="ke-section-heading">
          <div>
            <p className="kd-eyebrow">Components & custom solutions</p>
            <h2 id="ke-parts-title">Small parts.<br />A bigger picture.</h2>
          </div>
          <p>A component never works alone. We look at its application, its interfaces and the way it will be supplied – so the details add up.</p>
        </div>

        <div className="ke-part-story">
          <div className="ke-part-story__objects">
            <figure className="ke-part ke-part--sensor">
              <span className="ke-part__index">01 / SENSING</span>
              <img src={`${import.meta.env.BASE_URL}components/pt100-widerstandsthermometer/real-600.webp`} alt="Illustration of a Pt100 resistance temperature sensor" loading="lazy" />
              <figcaption>Temperature sensing<span>Pt100 sensor</span></figcaption>
            </figure>
            <figure className="ke-part ke-part--housing">
              <span className="ke-part__index">02 / PROTECTION</span>
              <img src={`${import.meta.env.BASE_URL}components/alu-druckgussgehaeuse/real-600.webp`} alt="Illustration of an aluminium die-cast enclosure" loading="lazy" />
              <figcaption>Protection & integration<span>Aluminium enclosure</span></figcaption>
            </figure>
            <p className="ke-part-story__note">Illustrative components. Specifications are agreed for each project.</p>
          </div>

          <div className="ke-part-story__text">
            <h3>From the component<br />to the application.</h3>
            <p>A temperature sensor may need a particular cable, connection or housing. An enclosure may need machining, a seal or an assembly step. We help connect those requirements.</p>
            <dl className="ke-requirements">
              <div><dt>Function</dt><dd>What must the component do?</dd></div>
              <div><dt>Integration</dt><dd>Where and how does it fit?</dd></div>
              <div><dt>Manufacturing</dt><dd>Which process suits the part and quantity?</dd></div>
              <div><dt>Supply</dt><dd>What will you need – and when?</dd></div>
            </dl>
            <Link className="kd-link" to="/components">Explore the component range <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="ke-contact" aria-labelledby="ke-contact-title">
        <div className="kd-container">
          <div className="ke-contact__lead">
            <div>
              <p className="kd-eyebrow">Personal responsibility</p>
              <h2 id="ke-contact-title">One conversation.<br /><span>Fewer handovers.</span></h2>
            </div>
            <div className="ke-contact__intro">
              <p>You should not have to explain the same requirement at every stage. Your Komponia contact coordinates the technical questions, manufacturing partners and supply arrangements.</p>
              <Link className="kd-link" to="/contact">Tell us what you are working on <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="ke-responsibilities">
            <div><span>01</span><h3>Understand the requirement.</h3><p>A part number, drawing or application is enough to start the conversation.</p></div>
            <div><span>02</span><h3>Connect the right expertise.</h3><p>Clarify technical details, manufacturing options and the checks to agree.</p></div>
            <div><span>03</span><h3>Keep the whole picture.</h3><p>Coordinate the next step and stay connected as your demand develops.</p></div>
          </div>
        </div>
      </section>

      <CommonDepth prefix="editorial" />
      <ConceptFooter />
    </div>
  );
}
