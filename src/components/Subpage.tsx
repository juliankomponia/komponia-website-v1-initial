import PageSections from './PageSections';
import { Link } from 'react-router';
import { ArrowRight, Check, Lock } from 'lucide-react';
import BrandLabel from './BrandLabel';

/* Application-specific information handling note. */
export function LockNote() {
  return (
    <p className="mt-3 flex items-center gap-1.5 text-[13px]" style={{ color: 'rgba(255,255,255,0.62)' }}>
      <Lock size={15} style={{ color: 'rgba(255,255,255,0.62)' }} />
      Confidentiality requirements can be agreed for your project
    </p>
  );
}

/* Dark split hero for service pages: image left, dark panel right */
export function SubHero({
  title, text, img, cta = 'Prepare an inquiry', anchors = [], eyebrow,
}: {
  title: string; text: React.ReactNode; img: string; cta?: string; anchors?: string[]; eyebrow?: string;
}) {
  return (
    <>
    <section className="relative">
      <div className="flex flex-col-reverse lg:flex-row lg:items-stretch">
        <figure className="relative service-hero-media lg:w-1/2 h-[300px] lg:h-auto">
          <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        </figure>
        <div className="hero-panel lg:w-1/2 flex flex-col justify-center">
          <div className="service-hero-copy">
            {eyebrow && <BrandLabel inverse>{eyebrow}</BrandLabel>}
            <h1 className="hero-title text-white font-medium mb-4">{title}</h1>
            <p className="text-base md:text-[1.125rem] leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.62)' }}>{text}</p>
            <div>
              <Link to="/contact" className="btn-primary-l">{cta}</Link>
              <LockNote />
            </div>
          </div>
        </div>
      </div>
      {anchors.length > 0 && (
        <div className="hidden xl:flex flex-col absolute left-3 top-full mt-4 z-20">
          {anchors.map((a) => (
            <a key={a} href="#" onClick={event => { event.preventDefault(); document.getElementById(a.toLowerCase().replace(/\s+/g, '-'))?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }} className="text-brand-blue hover:text-brand-bluehover text-[13px] leading-[1.9]">
              {a}
            </a>
          ))}
        </div>
      )}
    </section>
    <PageSections />
    </>
  );
}

/* White split row: text one side, image the other */
export function FeatureRow({
  title, text, bullets = [], img, flip = false, link, children, eyebrow, imgAlt,
}: {
  title: string; text: string; bullets?: string[]; img: string; flip?: boolean;
  link?: { label: string; to: string }; children?: React.ReactNode;
  eyebrow?: string; imgAlt?: string;
}) {
  return (
    <div className="feature-row grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className={`feature-copy ${flip ? 'lg:order-2' : ''}`}>
        {eyebrow && <BrandLabel>{eyebrow}</BrandLabel>}
        <h2 className="h2-orig mb-4">{title}</h2>
        <p className="lead-orig text-[15px] leading-relaxed mb-5">{text}</p>
        {bullets.length > 0 && (
          <ul className="space-y-2.5 mb-6">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[15px]" style={{ color: 'rgba(0,0,0,0.85)' }}>
                <Check size={18} className="text-brand-blue shrink-0 mt-0.5" strokeWidth={2.5} />
                {b}
              </li>
            ))}
          </ul>
        )}
        {link && (
          <Link to={link.to} className="arrow-link">
            {link.label} <ArrowRight size={20} />
          </Link>
        )}
        {children}
      </div>
      <figure className={`feature-image ${flip ? 'feature-image--left lg:order-1' : ''}`}>
        <img src={img} alt={imgAlt ?? title} loading="lazy" className="w-full object-cover rounded-[3px]" />
      </figure>
    </div>
  );
}

/* Left-aligned gray cards (content-cards--left-aligned) */
export function CardGrid({
  cards, cols = 3,
}: {
  cards: { title: string; text: string; img?: string; link?: string; to?: string }[];
  cols?: 2 | 3 | 4;
}) {
  const grid = cols === 2 ? 'md:grid-cols-2' : cols === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3';
  return (
    <div className={`grid grid-cols-1 ${grid} gap-4`}>
      {cards.map((c) => {
        const inner = (
          <>
            {c.img && <img src={c.img} alt="" loading="lazy" className="w-full object-cover object-top rounded-none" style={{ aspectRatio: '8.4/5' }} />}
            <span className="flex flex-col flex-1 p-6 md:p-8 text-left">
              <span className="brand-card-title font-bold text-black text-[1.25rem] leading-[1.5rem] md:text-[1.375rem] md:leading-[1.625rem] mb-3">{c.title}</span>
              <span className="block text-base md:text-[1.125rem] mb-6" style={{ color: '#262626' }}>{c.text}</span>
              {c.link && <span className="mt-auto font-bold text-brand-blue text-base md:text-[1.125rem]">{c.link}</span>}
            </span>
          </>
        );
        const cls = 'flex flex-col overflow-hidden rounded-[1rem] transition-colors hover:bg-black/[0.08]';
        const style = { backgroundColor: 'rgba(0,0,0,0.03)' };
        return c.to ? (
          <Link key={c.title} to={c.to} className={cls} style={style}>{inner}</Link>
        ) : (
          <div key={c.title} className={cls} style={style}>{inner}</div>
        );
      })}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="max-w-[900px] mx-auto">
      <h2 className="h2-orig mb-8">Frequently asked questions.</h2>
      <div className="space-y-3">
        {items.map((f) => (
          <details key={f.q} className="border border-black/10 rounded-[3px] px-6 py-4 group bg-white">
            <summary className="font-medium cursor-pointer list-none flex justify-between items-center" style={{ color: 'rgba(0,0,0,0.85)' }}>
              {f.q}
              <span className="text-brand-blue text-xl leading-none group-open:rotate-45 transition-transform motion-reduce:transition-none">+</span>
            </summary>
            <p className="text-[14px] leading-relaxed mt-3" style={{ color: 'rgba(0,0,0,0.69)' }}>{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
