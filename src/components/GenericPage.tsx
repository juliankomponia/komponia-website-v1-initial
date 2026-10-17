import PageSections from './PageSections';
import { INDUSTRIAL_IMAGES as I } from '../data/images';
import { FeatureRow } from './Subpage';
import { DarkCta } from './Sections';
import { Link } from 'react-router';
import BrandLabel from './BrandLabel';
import SourceNote, { type SourceNoteData } from './SourceNote';

export type GenericPageData = {
  route: string;
  title: string;
  subtitle: string;
  heroImg: string;
  sections: { title: string; text: string; bullets: string[]; img: string | null;
    links?: { label: string; to: string }[];
    footnote?: SourceNoteData;
    table?: { headers: string[]; rows: string[][] };
    downloads?: { label: string; file: string; revision: string }[];
  }[];
};

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\s*\n/).map((p, i) => (
        <p key={i} className="generic-body mb-4" style={{ color: 'rgba(0,0,0,0.69)' }}>
          {p}
        </p>
      ))}
    </>
  );
}

function SectionExtras({ section }: { section: GenericPageData['sections'][number] }) {
  return <>
    {section.table && <div className={`generic-table-wrap mt-6 mb-6${section.table.headers.length > 2 ? ' generic-table-wrap--wide' : ''}`} tabIndex={0} role="region" aria-label={`${section.title}: requirements table`}><table className="generic-table">
      <thead><tr>{section.table.headers.map(label => <th key={label} scope="col" className="border-b border-black/30 py-3 pr-5 font-medium">{label}</th>)}</tr></thead>
      <tbody>{section.table.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0
        ? <th scope="row" key={j} className="border-b border-black/10 py-4 pr-5 align-top font-medium">{cell}</th>
        : <td key={j} className="border-b border-black/10 py-4 pr-5 align-top">{cell}</td>)}</tr>)}</tbody>
    </table></div>}
    {section.links && <div className="flex flex-wrap gap-x-7 gap-y-3 mt-6">{section.links.map(link =>
      <Link key={link.to} to={link.to} className="arrow-link">{link.label}<span aria-hidden="true"> →</span></Link>)}</div>}
    {section.footnote && <SourceNote note={section.footnote}/>}
    {section.downloads && <div className="mt-6 space-y-3">{section.downloads.map(item => <div key={item.file}>
      <a href={`${import.meta.env.BASE_URL}downloads/${item.file}`} download className="btn-outline-primary">{item.label}</a>
      <p className="text-[12px] mt-2">General preparation checklist · Version {item.revision}</p>
    </div>)}</div>}
  </>;
}

function pageImage(route: string, original: string, sectionIndex?: number, sectionTitle?: string) {
  if (Object.hasOwn(I, original)) return I[original as keyof typeof I];
  // Match the existing requirement text; illustrations do not establish industry approval.
  const industryImages: Record<string, { hero: string; sections: Record<string, string> }> = {
    'industries/automotive-manufacturing': {
      hero: I.heroComponents,
      sections: { 'Define the release requirements': I.qualityInspection, 'Give prototypes a clear purpose': I.customEngineering },
    },
    'industries/aerospace-manufacturing': {
      hero: I.customEngineering,
      sections: { 'Plan evidence before production': I.qualityInspection },
    },
    'industries/industrial-machinery': {
      hero: I.controllers,
      sections: { 'From selection to a released solution': I.customEngineering },
    },
    'industries/electronics-manufacturing': {
      hero: I.temperatureController,
      sections: { 'Plan sample checks around the function': I.qualityInspection },
    },
    'industries/robotics-automation': {
      hero: I.sensors,
      sections: { 'Agree the technical boundary': I.customEngineering },
    },
    'industries/medical': {
      hero: I.temperatureProbe,
      sections: { 'Define testing and approval responsibilities': I.qualityInspection },
    },
  };
  const industry = industryImages[route];
  if (industry) {
    return sectionIndex === undefined ? industry.hero : industry.sections[sectionTitle ?? ''] ?? I.qualityInspection;
  }
  if (sectionIndex !== undefined) {
    if (['production-orders', 'sustainability', 'guides/recurring-supply', 'newsletter'].includes(route)) return [I.customEngineering, I.ongoingSupply, I.qualityInspection][sectionIndex % 3];
    if (['guides/component-selection', 'guides/replacement-assessment', 'guides', 'knowledge-base', 'blog'].includes(route)) return [I.customEngineering, I.qualityInspection, I.sensors][sectionIndex % 3];
    if (['quality-and-lab', 'ip-protection', 'team-account', 'become-a-manufacturing-partner', 'partner-network', 'team', 'jobs'].includes(route)) return [I.customEngineering, I.qualityInspection, I.ongoingSupply][sectionIndex % 3];
  }
  if (route === 'guides/component-selection') return I.controllers;
  if (route === 'guides/replacement-assessment') return I.sensors;
  if (['guides/recurring-supply', 'production-orders', 'sustainability', 'newsletter'].includes(route)) return I.ongoingSupply;
  if (['quality-and-lab', 'ip-protection'].includes(route)) return I.qualityInspection;
  if (['contact', 'get', 'team-account', 'guides', 'knowledge-base', 'blog', 'become-a-manufacturing-partner', 'partner-network', 'team', 'jobs'].includes(route)) return I.customEngineering;
  if (['brand-background', 'case-studies'].includes(route)) return I.heroComponents;
  return original;
}

function imageDescription(src: string, fallback: string) {
  if (src === I.heroComponents) return 'Illustrative technical components on a neutral studio background';
  if (src === I.customEngineering) return 'Illustrative review of a custom part and its technical requirements';
  if (src === I.qualityInspection) return 'Illustrative dimensional inspection of a component';
  if (src === I.ongoingSupply) return 'Illustrative preparation of component deliveries';
  if (src === I.controllers) return 'Illustrative controller category examples';
  if (src === I.sensors) return 'Illustrative sensor and probe category examples';
  if (src === I.heating) return 'Illustrative heating element category examples';
  if (src === I.pressureSwitches) return 'Illustrative pressure and switching device category examples';
  if (src === I.temperatureController) return 'Illustrative unbranded panel-mounted temperature controller';
  if (src === I.temperatureProbe) return 'Illustrative stainless-steel temperature probe with cable';
  if (src === I.tubularHeater) return 'Illustrative U-shaped tubular heating element';
  return fallback;
}

export default function GenericPage({ page }: { page: GenericPageData }) {
  const heroImage = pageImage(page.route, page.heroImg);
  const industry = page.route.startsWith('industries/');
  return (
    <div className="generic-page">
      {/* dark hero */}
      <section style={{ backgroundColor: '#1F1F1D' }}>
        <div className="site-shell py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="generic-hero-copy">
            <BrandLabel inverse>{industry ? 'Application requirements' : page.route.startsWith('guides') ? 'Technical guides' : 'Komponia'}</BrandLabel>
            <h1 className="hero-title text-white font-medium mb-5">{page.title}</h1>
            <p className="text-base md:text-[1.125rem] leading-relaxed">
              {page.subtitle}
            </p>
          </div>
          {page.heroImg && (
            <figure className="generic-hero-image">
              <img src={heroImage} alt={imageDescription(heroImage, page.title)} fetchPriority="high" />
            </figure>
          )}
        </div>
      </section>

      <PageSections />
      {/* content sections, alternating white / gray */}
      {page.sections.map((s, i) => (
        <section key={s.title + i} data-section-label={s.title} className={i % 2 === 1 ? 'bg-brand-gray' : 'bg-white'}>
          <div className="wrap-orig section-pad">
            {s.img ? (
              <FeatureRow title={s.title} text={s.text.split(/\n\s*\n/)[0]} img={pageImage(page.route, s.img, i, s.title)} imgAlt={imageDescription(pageImage(page.route, s.img, i, s.title), s.title)} flip={i % 2 === 1}>
                {s.text.split(/\n\s*\n/).length > 1 && (
                  <div className="mt-4">
                    <Paragraphs text={s.text.split(/\n\s*\n/).slice(1).join('\n\n')} />
                  </div>
                )}
                {s.bullets && s.bullets.length > 0 && (
                  <ul className="generic-body list-disc pl-5 space-y-1.5 mt-4" style={{ color: 'rgba(0,0,0,0.69)' }}>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                <SectionExtras section={s} />
              </FeatureRow>
            ) : (
              <div className="max-w-[48rem]">
                <h2 className="h2-orig mb-4">{s.title}</h2>
                <Paragraphs text={s.text} />
                {s.bullets && s.bullets.length > 0 && (
                  <ul className="generic-body list-disc pl-5 space-y-1.5" style={{ color: 'rgba(0,0,0,0.69)' }}>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                <SectionExtras section={s} />
              </div>
            )}
          </div>
        </section>
      ))}

      <DarkCta />
    </div>
  );
}
