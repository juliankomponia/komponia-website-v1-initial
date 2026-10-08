import PageSections from '../components/PageSections';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, ChevronRight, FileText, Settings } from 'lucide-react';
import { COMPONENT_GROUPS, componentPath, type ComponentGroup, type ComponentProduct } from '../data/components';
import { INDUSTRIAL_IMAGES as I } from '../data/images';
import { HOME_CONTENT as H } from '../data/home';
import { CardGrid, Faq } from '../components/Subpage';
import { DarkCta } from '../components/Sections';
import { inquiryPath } from '../data/inquiry';
import { downloadText } from '../lib/download';
import BrandLabel from '../components/BrandLabel';
import './components.css';

// Illustrative category examples, not a specific product configuration.
const referenceImages = [I.controllers, I.sensors, I.heating, I.pressureSwitches];
function groupImage(group: ComponentGroup) {
  return referenceImages[COMPONENT_GROUPS.findIndex((entry) => entry.id === group.id)];
}

function componentImage(group: ComponentGroup, product: ComponentProduct) {
  if (product.slug === 'temperature-controllers') return I.temperatureController;
  if (product.slug === 'pt100-probes') return I.temperatureProbe;
  if (product.slug === 'tubular-heating-elements') return I.tubularHeater;
  return groupImage(group);
}

function Breadcrumb({ group, product }: { group?: ComponentGroup; product?: ComponentProduct }) {
  return <nav aria-label="Breadcrumb" className="components-breadcrumb components-section wrap-orig section-pad">
    <Link to="/">Home</Link><ChevronRight size={16} aria-hidden="true" />
    {group ? <Link to="/components">Components</Link> : <span aria-current="page">Components</span>}
    {group && <><ChevronRight size={16} aria-hidden="true" />{product ? <Link to={componentPath(group)}>{group.title}</Link> : <span aria-current="page">{group.title}</span>}</>}
    {product && <><ChevronRight size={16} aria-hidden="true" /><span aria-current="page">{product.title}</span></>}
  </nav>;
}

function ContactCta() {
  return <div className="components-contact"><DarkCta message="Have a part number, drawing or application in mind?" label="Prepare an inquiry" to="/contact" /></div>;
}

function GroupCard({ group }: { group: ComponentGroup }) {
  return <Link to={componentPath(group)} className="cap-card components-cap-card">
    <img src={groupImage(group)} alt="" loading="lazy" />
    <div className="cap-text"><h2 className="cap-title">{group.title}</h2><span className="cap-link card-link inline-flex items-center gap-2">See details <ArrowRight size={18} aria-hidden="true" /></span></div>
  </Link>;
}

function RelatedGroups({ current, detail = false }: { current?: ComponentGroup; detail?: boolean }) {
  return <section className={`components-section wrap-orig section-pad components-resources ${detail ? 'components-resources-detail' : ''}`}>
    {!detail && <h2 className="h2-orig components-section-title">Explore our technical components</h2>}
    <CardGrid cols={4} cards={COMPONENT_GROUPS.map((group) => ({
      title: group.title,
      text: group.intro,
      img: groupImage(group),
      to: componentPath(group),
      link: current?.id === group.id ? 'View all components in this group' : 'Learn more',
    }))} />
  </section>;
}

function ComponentFaq({ group }: { group?: ComponentGroup }) {
  const items = [
    { q: group ? 'How do I select the right configuration?' : 'How do I select the right component?', a: group ? group.intro : 'Start with the function your application requires. Each product group lists its components and the technical features relevant to selection.' },
    { q: 'What information should I include in an inquiry?', a: 'An existing part number, datasheet or drawing provides a starting point. Include the operating conditions, required quantity and preferred delivery date.' },
    { q: 'What should I check when replacing an existing component?', a: 'Compare the function, electrical and mechanical connections, and installation conditions. Each detail page lists the selection questions for that component.' },
  ];
  return <section className="components-section wrap-orig section-pad" aria-label="Frequently asked questions"><Faq items={items} /></section>;
}

function Overview() {
  return <>
    <section className="components-dark components-overview-hero"><div className="components-section wrap-orig section-pad">
      <BrandLabel inverse>Technical components</BrandLabel>
      <h1 className="hero-title">Components for your application</h1>
      <p>The right solution starts with the right component. Explore controllers, sensors, heating elements, and pressure and switching devices for your application.</p>
    </div></section>
    <PageSections /><section data-section-label="Component groups" className="components-section wrap-orig section-pad" aria-label="Product groups"><div className="components-cap-grid">{COMPONENT_GROUPS.map((group) => <GroupCard key={group.id} group={group} />)}</div></section>
    <section data-section-label="Selection requirements" className="components-section wrap-orig section-pad components-resources"><h2 className="h2-orig components-section-title">Start with your requirement</h2><CardGrid cols={4} cards={H['technical-questions'].cards.map(card => ({ title: card.title, text: card.text, link: 'Prepare an inquiry', to: '/contact' }))} /></section><ComponentFaq /><ContactCta />
  </>;
}

function ProductActions({ group, product }: { group: ComponentGroup; product: ComponentProduct }) {
  return <><Link to={componentPath(group, product)} className="components-table-link">See details <ArrowRight size={16} aria-hidden="true" /></Link><Link to={inquiryPath(group, product)} className="btn-outline-primary">Prepare an inquiry</Link></>;
}

function Category({ group }: { group: ComponentGroup }) {
  return <>
    <section className="components-dark components-category-hero"><div className="components-section wrap-orig section-pad">
      <div className="components-hero-column"><BrandLabel inverse>Component group</BrandLabel><h1 className="hero-title">{group.title}</h1><p>{group.intro}</p><Link to={inquiryPath(group)} className="btn-primary-l">Prepare an inquiry</Link><span className="components-hero-note"><FileText size={18} aria-hidden="true" /> Have a part number, drawing or operating requirements ready</span></div>
      <figure className="components-hero-column components-category-media"><img src={groupImage(group)} alt={`Illustrative category examples for ${group.title.toLowerCase()}`} /></figure>
    </div></section>
    <PageSections /><Breadcrumb group={group} />
    <section data-section-label="Components at a glance" className="components-section wrap-orig section-pad components-product-list" aria-label="Components at a glance">
      <table className="components-product-table">
        <thead><tr><th scope="col">Component</th><th scope="col">Description</th><th scope="col">Selection criteria</th><th scope="col"><span className="sr-only">Details</span></th><th scope="col"><span className="sr-only">Inquiry</span></th></tr></thead>
        <tbody>{group.products.map((product) => <tr key={product.id}>
          <th scope="row"><Link to={componentPath(group, product)}><img src={componentImage(group, product)} alt="" loading="lazy" />{product.title}</Link></th>
          <td>{product.text}</td><td className="components-selection-cell">{product.selectionLabels.slice(0, 2).join(', ')}</td>
          <td><Link to={componentPath(group, product)} className="components-table-link">See details <ArrowRight size={16} aria-hidden="true" /></Link></td><td><Link to={inquiryPath(group, product)} className="btn-outline-primary">Prepare an inquiry</Link></td>
        </tr>)}</tbody>
      </table>
      <div className="components-mobile-products">{group.products.map((product) => <article key={product.id}>
        <h2><img src={componentImage(group, product)} alt="" loading="lazy" /><Link to={componentPath(group, product)}>{product.title}</Link></h2><p>{product.text}</p>
        <dl><dt>Selection criteria</dt><dd>{product.selectionLabels.slice(0, 2).join(', ')}</dd></dl>
        <div className="components-mobile-actions"><ProductActions group={group} product={product} /></div>
      </article>)}</div>
    </section>
    <section data-section-label="Selection & integration" className="components-section wrap-orig section-pad components-explainer">
      <h2 className="h2-orig">{group.title}: selection and integration</h2><p>{group.intro}</p><p>The detail pages outline the requirements to consider for each component. Your application and existing technical documents provide the starting point.</p>
      <h2 className="h2-orig">What information is needed?</h2><p>Have a part number, datasheet or drawing ready. For a new configuration, include the required function, installation details and operating conditions. Add the quantity and preferred delivery date to complete your inquiry.</p>
    </section>
    <ComponentFaq group={group} /><ContactCta />
  </>;
}

function DetailActions({ group, product }: { group: ComponentGroup; product: ComponentProduct }) {
  const checklist = ['KOMPONIA — COMPONENT SELECTION CHECKLIST', `${group.title} / ${product.title}`, 'General category guide, not a product datasheet or confirmed specification.', '', ...product.selectionParameters.map(question => `${question}\nAnswer: `), '', 'Existing part number / drawing revision: ', 'Quantity / expected demand: ', 'Preferred date: ', 'Required checks and documentation: ', '', 'Version: 2026-10-07'].join('\n');
  return <div className="components-detail-actions"><button type="button" onClick={() => window.print()}><FileText size={16} aria-hidden="true" /> Print this page</button><button type="button" onClick={() => downloadText(`komponia-${product.slug}-selection-checklist.txt`, checklist)}><FileText size={16} aria-hidden="true" /> Selection checklist (.txt)</button><Link to={componentPath(group)}>More components <ArrowRight size={16} aria-hidden="true" /></Link></div>;
}

function SelectionFocus({ product }: { product: ComponentProduct }) {
  return <div className="components-selection-focus"><p>Selection focus</p><ol>{product.selectionLabels.slice(0, 3).map((label, i) => <li key={label}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{label}</li>)}</ol></div>;
}

function Detail({ group, product }: { group: ComponentGroup; product: ComponentProduct }) {
  return <>
    <figure className="components-detail-mobile-photo components-detail-top-photo"><img src={componentImage(group, product)} alt={`Illustrative category example for ${product.title.toLowerCase()}`} /></figure>
    <Breadcrumb group={group} product={product} />
    <section className="components-section wrap-orig section-pad components-detail-row">
      <aside className="components-detail-sidebar">
        <figure><img className="components-detail-photo" src={componentImage(group, product)} alt={`Illustrative category example for ${product.title.toLowerCase()}`} /></figure><SelectionFocus product={product} /><DetailActions group={group} product={product} />
        <div className="components-inquiry-panel"><p>Prepare your technical requirements for a focused discussion.</p><Link to={inquiryPath(group, product)} className="btn-primary-l">Prepare an inquiry</Link></div>
      </aside>
      <div className="components-detail-content">
        <div className="components-detail-fields">
          <div className="components-field"><span>Product group</span><Link to={componentPath(group)}>{group.title}</Link></div>
          <div className="components-field"><span>Component category</span><h1>{product.title}</h1></div>
          <div className="components-field components-field--selection"><BrandLabel>Technical selection</BrandLabel><p>Function, interfaces and operating conditions.</p></div>
          <div className="components-detail-mobile-actions"><SelectionFocus product={product} /><DetailActions group={group} product={product} /><Link to={inquiryPath(group, product)} className="btn-primary-l">Prepare an inquiry</Link></div>
        </div>
        <div className="components-description"><div className="components-description-icon"><Settings size={28} strokeWidth={1.3} aria-hidden="true" /></div><div><p>{product.text}</p></div></div>
        <p className="components-detail-mobile-intro">{product.text}</p>
        <div className="components-property-tables">{[0, 2].map((start, index) => <table key={start}>
          <caption>{index === 0 ? 'Function and selection' : 'Integration and operation'}</caption>
          <tbody>{product.selectionParameters.slice(start, start + 2).map((parameter, row) => <tr key={parameter}><th scope="row">{product.selectionLabels[start + row]}</th><td>{parameter}</td></tr>)}</tbody>
        </table>)}</div>
        {product.confirmedComponents?.map(record => <article key={record.reference} className="mt-10">
          <h2 className="h2-orig mb-4">{record.reference}</h2>
          {record.manufacturer && <p className="mb-3">Manufacturer: {record.manufacturer}</p>}
          <p className="mb-5">{record.description}</p>
          <div className="components-property-tables"><table><caption>Documented characteristics</caption><tbody>
            {record.characteristics.map(feature => <tr key={feature.label}><th scope="row">{feature.label}</th><td>{feature.value}{feature.unit ? ` ${feature.unit}` : ''}{feature.conditions && <span className="block text-[12px] mt-1">{feature.conditions}</span>}</td></tr>)}
          </tbody></table></div>
          <p className="text-[12px] mt-3">Source: {record.source} · Checked {record.checkedOn}</p>
          {record.documents?.map(doc => <a key={doc.href} href={doc.href} className="components-table-link mt-3 mr-5">{doc.title} · {doc.revision}</a>)}
        </article>)}
      </div>
    </section>
    <RelatedGroups current={group} detail /><ContactCta />
  </>;
}

export default function Components() {
  const { groupId, productId } = useParams();
  const group = COMPONENT_GROUPS.find((entry) => (entry.slug === groupId || entry.id === groupId));
  const product = group?.products.find((entry) => (entry.slug === productId || entry.id === productId));
  const missing = Boolean((groupId && !group) || (productId && !product));
  const title = missing ? 'Component not found' : product?.title ?? group?.title ?? 'Components for your application';
  return <div className="components-reference">{missing ? <section className="components-section wrap-orig section-pad"><h1>{title}</h1><Link to="/components" className="components-table-link"><ArrowLeft size={18} aria-hidden="true" /> Back to all components</Link></section> : product && group ? <Detail group={group} product={product} /> : group ? <Category group={group} /> : <Overview />}</div>;
}
