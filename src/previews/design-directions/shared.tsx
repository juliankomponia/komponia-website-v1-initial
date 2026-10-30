import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, Check, Menu, X } from 'lucide-react';
import mark from '../../assets/brand/komponia-mark.svg';
import labImage from '../../assets/industrial/quality-inspection.webp';
import ExplodedAssembly from '../../components/home-graphics/ExplodedAssembly';

export function ConceptHeader({ tone = 'light', accent = false }: { tone?: 'light' | 'dark'; accent?: boolean }) {
  const [open, setOpen] = useState(false);
  return <header className="kd-header" data-tone={tone} data-accent={accent || undefined}>
    <div className="kd-container kd-header__inner">
      <Link to="/" className="kd-logo" aria-label="Komponia homepage"><img src={mark} alt="" width="31" height="32" /><span>komponia</span></Link>
      <button className="kd-menu" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={24} /> : <Menu size={24} />}</button>
      <nav className="kd-header__nav" aria-label="Main navigation" data-open={open || undefined}>
        <Link to="/components">Components</Link><Link to="/how-ordering-works">How we work</Link><Link to="/about">Company</Link>
        <Link to="/contact" className="kd-button">Prepare an inquiry <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </nav>
    </div>
  </header>;
}

const checks = [
  { title: 'Dimensions', lead: 'The interfaces need to fit.', text: 'We agree which dimensions, interfaces and tolerances matter for your application. Selected samples are checked against that scope.', detail: 'Drawing reference · relevant dimensions · agreed criteria', x: '62%', y: '40%' },
  { title: 'Function', lead: 'The component has a job to do.', text: 'We clarify the operating conditions and the functional checks needed for your component. The scope is defined before a sample is evaluated.', detail: 'Operating conditions · function · evaluation method', x: '44%', y: '59%' },
  { title: 'Batch sample', lead: 'Quality continues with the series.', text: 'Agreed batch samples, documentation and follow-up keep quality visible beyond the first approval. We coordinate open issues with the manufacturer.', detail: 'Sampling scope · documentation · follow-up', x: '74%', y: '70%' },
];
const supply = [
  { label: 'Production batch', title: 'Bring purchasing volumes together.', text: 'We match requirements and quantities with suitable manufacturers and economical production lots. Your forecast is the basis for the purchasing plan.' },
  { label: 'Agreed stock', title: 'Make room for changing demand.', text: 'Stock terms and safety stock can be planned around your production. We agree ownership, quantities and responsibilities as part of the supply arrangement.' },
  { label: 'Smaller call-offs', title: 'Release what your production needs.', text: 'Call off smaller quantities from an agreed supply plan. Packaging and transport are coordinated around protection, handling and your delivery requirements.' },
];
const applications = [
  { title: 'Refrigeration & climate', parts: 'Controllers, probes, switches and heating elements.', need: 'Temperature, refrigerant, installation space and electrical interfaces.', route: '/industries' },
  { title: 'Thermal equipment', parts: 'Heaters, thermostats and temperature measurement.', need: 'Medium, power, operating temperature, geometry and protection.', route: '/industries' },
  { title: 'Machinery & OEM', parts: 'Custom housings, assemblies and technical components.', need: 'Drawing, material, interfaces, production quantity and supply plan.', route: '/industries' },
];

export function CommonDepth({ prefix }: { prefix: string }) {
  const [check, setCheck] = useState(0);
  const [stage, setStage] = useState(0);
  const [entry, setEntry] = useState(0);
  const entries = [
    { title: 'A part number', code: 'part-number', text: 'Manufacturer or reference, current specification and expected demand.' },
    { title: 'A drawing', code: 'drawing', text: 'Drawing revision, material, relevant dimensions and planned quantities.' },
    { title: 'An application', code: 'application', text: 'What the component needs to do, where it will work and what matters most.' },
  ];
  return <>
    <section className="kd-lab" id={`${prefix}-lab`}>
      <div className="kd-container kd-lab__grid">
        <div className="kd-lab__copy"><p className="kd-eyebrow">Komponia Lab</p><h2>Confidence is<br />in the detail.</h2><p className="kd-lead">The right component also needs the right checks. In our Lab, we carry out the dimensional and functional checks agreed for your project.</p>
          <div className="kd-check-tabs" role="group" aria-label="Explore agreed checks">{checks.map((item, i) => <button type="button" key={item.title} aria-pressed={i === check} onClick={() => setCheck(i)}>{item.title}<span aria-hidden="true">{i === check ? '−' : '+'}</span></button>)}</div>
          <div className="kd-check-copy" aria-live="polite"><h3>{checks[check].lead}</h3><p>{checks[check].text}</p><small>{checks[check].detail}</small></div>
          <Link className="kd-link" to="/quality-and-lab">Quality & Lab <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        <figure className="kd-lab__figure"><div className="kd-lab__photo"><img src={labImage} alt="Illustration of a component being examined with precision measuring equipment." loading="lazy" /><span className="kd-lab__point" style={{ left: checks[check].x, top: checks[check].y }} aria-hidden="true"><Check size={18} /></span><span className="kd-lab__caption">{checks[check].title}<small>Scope agreed for your component</small></span></div><figcaption>Illustrative image. No measured result is shown.</figcaption></figure>
      </div>
      <div className="kd-container"><details className="kd-assembly-detail"><summary>Look inside an assembly.<span>Material, geometry and function <ArrowUpRight size={18} aria-hidden="true" /></span></summary><div className="kd-assembly-detail__body"><div><h3>Every interface<br />has a purpose.</h3><p>Housing, board, sensor and connector need to work together. We clarify geometry, material and functional requirements before the manufacturing route is agreed.</p><p className="kd-small">Explore the schematic in its assembled or exploded state.</p></div><ExplodedAssembly /></div></details></div>
    </section>

    <section className="kd-supply" id={`${prefix}-supply`}>
      <div className="kd-container"><div className="kd-supply__head"><p className="kd-eyebrow">Recurring supply</p><h2>Think in production lots.<br /><span>Deliver in your rhythm.</span></h2><p>Competitive sourcing and a practical supply plan belong together. We coordinate purchasing, agreed stock and call-offs around your production.</p></div>
        <div className="kd-supply__layout"><div className="kd-supply__visual"><div className="kd-supply__labels"><span>Production</span><span>Stock</span><span>Your production</span></div><svg viewBox="0 0 750 300" role="img" aria-label={`Schematic supply flow: ${supply[stage].label}. Quantities and timing are illustrative.`}>
          <path className="kd-supply__path" d="M202 145H287M452 145H537" /><path className="kd-supply__arrow" d="m275 137 12 8-12 8m250-8 12 8-12 8" />
          {[0, 1, 2].map(col => <rect key={col} className="kd-supply__bay" x={24 + col * 252} y="48" width="204" height="205" rx="12" />)}
          {Array.from({ length: 12 }, (_, i) => { const calledOff = stage === 2 && i < 3; const slot = stage === 2 && !calledOff ? i - 3 : i; const bay = stage === 0 ? 42 : calledOff ? 546 : 294; const x = bay + (slot % 3) * 56; const y = 66 + Math.floor(slot / 3) * 43; return <g className="kd-supply__unit" key={i} style={{ transform: `translate(${x}px, ${y}px)`, transitionDelay: `${i * 24}ms` } as CSSProperties}><rect width="46" height="32" rx="4" /><path d="M16 0V10H30V0" /></g>; })}
        </svg><p className="kd-small">Schematic – quantities, stock terms and timing agreed per project.</p></div>
        <div className="kd-supply__explain"><div className="kd-supply__tabs" role="group" aria-label="Supply stages">{supply.map((item,i)=><button key={item.label} type="button" aria-pressed={i===stage} onClick={()=>setStage(i)}><span>{String(i+1).padStart(2,'0')}</span>{item.label}</button>)}</div><div aria-live="polite"><h3>{supply[stage].title}</h3><p>{supply[stage].text}</p></div><Link className="kd-link" to="/contact?type=supply">Discuss recurring supply <ArrowRight size={17} aria-hidden="true" /></Link></div></div>
        <div className="kd-supply__principles"><span>Purchasing volumes coordinated.</span><span>Stock terms agreed.</span><span>Packaging and transport considered.</span></div>
      </div>
    </section>

    <section className="kd-applications"><div className="kd-container kd-applications__grid"><div><p className="kd-eyebrow">Your application</p><h2>It starts with<br />what it needs to do.</h2><p>We bring component selection and manufacturing options back to the requirements of your equipment.</p></div><div className="kd-applications__list">{applications.map((a,i)=><details key={a.title} open={i===0 || undefined}><summary>{a.title}<span aria-hidden="true">+</span></summary><div><p>{a.parts}</p><small>What we clarify: {a.need}</small><Link to={a.route}>Explore applications <ArrowUpRight size={16} aria-hidden="true" /></Link></div></details>)}</div></div></section>

    <section className="kd-heritage"><div className="kd-container kd-heritage__grid"><div className="kd-heritage__date"><span>WTS experience since</span><strong>1997<span>.</span></strong></div><div><p className="kd-eyebrow">Experience, carried forward</p><h2>A fresh approach.<br />An experienced foundation.</h2><p>Komponia builds on the technical component experience of WTS. Personal advice, custom solutions and supply coordination are brought together in one focused offering.</p><Link to="/about" className="kd-link">The story behind Komponia <ArrowRight size={17} aria-hidden="true" /></Link></div></div></section>

    <section className="kd-inquiry"><div className="kd-container"><div className="kd-inquiry__head"><h2>Start with<br />what you have.</h2><p>A finished specification is helpful. An open technical question is a valid starting point, too.</p></div><div className="kd-inquiry__choice" role="group" aria-label="Choose an inquiry starting point">{entries.map((item,i)=><button key={item.code} type="button" aria-pressed={entry===i} onClick={()=>setEntry(i)}>{item.title}<ArrowUpRight size={20} aria-hidden="true" /></button>)}</div><div className="kd-inquiry__next"><p aria-live="polite">{entries[entry].text}</p><Link className="kd-button" to={`/contact?entry=${entries[entry].code}`}>Prepare an inquiry <ArrowRight size={18} aria-hidden="true" /></Link></div></div></section>
  </>;
}

export function ConceptFooter() {
  return <footer className="kd-footer"><div className="kd-container"><Link to="/" className="kd-logo"><img src={mark} alt="" width="31" height="32" /><span>komponia</span></Link><p>Technical components. Custom solutions. Recurring supply.</p><nav aria-label="Footer"><Link to="/contact">Contact</Link><Link to="/about">Company</Link><Link to="/quality-and-lab">Quality & Lab</Link></nav></div></footer>;
}
