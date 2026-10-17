import { Link } from 'react-router';
import { SubHero, Faq } from '../components/Subpage';
import { SectionLead, OrderingProcess, ProtolabsBanner, DarkCta } from '../components/Sections';
import { CapabilitiesCards } from '../components/HomeSectionsStand2';
import { HOME_CONTENT } from '../data/home-stand2';
import { type CapabilityPageData } from '../data/capability-pages';

// Reuse the SheetMetal page's section structure, components and exact style classes.
export default function Capability({ page }: { page: CapabilityPageData }) {
  const relatedCards = page.related.map(media => HOME_CONTENT.capabilities.cards.find(card => card.media === media)!);
  return <>
    <SubHero eyebrow={page.eyebrow} title={page.heading} text={page.intro}
      img={page.hero} cta="Prepare an inquiry" ctaTo={page.inquiry} />

    <section data-section-label="Overview" className="bg-white">
      <div className="wrap-orig section-pad">
        <SectionLead title={page.overview.title}>{page.overview.intro}</SectionLead>
        <div className="grid md:grid-cols-2 gap-4">
          {page.overview.cards.map(card => <div key={card.title} className="cap-card">
            <img src={card.image} alt={`Illustrative ${card.title.toLowerCase()}`} loading="lazy" />
            <div className="cap-text">
              <h3 className="cap-title">{card.title}</h3>
              <p className="cap-body">{card.text}</p>
              <div className="cap-body"><ul>{card.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div>
              {card.to && <Link to={card.to} className="cap-link card-link">Explore component category</Link>}
            </div>
          </div>)}
        </div>
      </div>
    </section>

    <section data-section-label="Selection" className="bg-brand-gray">
      <div className="wrap-orig section-pad">
        <SectionLead title={page.selection.title}>{page.selection.intro}</SectionLead>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {page.selection.cards.map(card => <div key={card.title} className="rounded-[1rem] p-6 md:p-8" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>
            <h3 className="font-bold text-black text-[1.25rem] mb-3">{card.title}</h3>
            <p className="text-[14px]" style={{ color: 'rgba(0,0,0,0.56)' }}>{card.text}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section data-section-label="Requirements" className="bg-white">
      <div className="wrap-orig section-pad">
        <div className="max-w-[48rem]">
          <h2 className="h2-orig mb-4">{page.requirements.title}</h2>
          <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.69)' }}>{page.requirements.text}</p>
        </div>
      </div>
    </section>

    <section data-section-label="Options & finishing" className="bg-brand-gray">
      <div className="wrap-orig section-pad">
        <SectionLead title={page.options.title}>{page.options.intro}</SectionLead>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {page.options.cards.map(card => <Link to={card.to ?? page.inquiry} key={card.title} className="rounded-[1rem] p-6 transition-colors hover:bg-black/[0.08]" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>
            <h3 className="font-bold text-black mb-2">{card.title}</h3>
            <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.56)' }}>{card.text}</p>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="bg-white"><div className="wrap-orig section-pad"><ProtolabsBanner /></div></section>
    <section data-section-label="How we work" className="bg-white"><div className="wrap-orig section-pad"><OrderingProcess /></div></section>
    <section data-section-label="FAQ" className="bg-white"><div className="wrap-orig section-pad"><Faq items={page.faqs} /></div></section>
    <section data-section-label="Related capabilities" className="bg-brand-gray">
      <div className="wrap-orig section-pad">
        <SectionLead title="Related capabilities" />
        <CapabilitiesCards cards={relatedCards} />
      </div>
    </section>
    <DarkCta message={page.cta} label="Prepare an inquiry" to={page.inquiry} />
  </>;
}
