import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Plus, Rotate3d } from 'lucide-react';
import { SPIN, spinFrame, STAGE_FILTERS, STAGE_PARTS, partSrc, type StageGroup } from '../../data/home-v7';
import Spin from '../v9/Spin';
import { briefCount, briefStore, briefText, emptyBrief, useBriefState } from '../v9/briefStore';
import { useMedia, REDUCED_QUERY } from './useMedia';

const GROUP_LABEL = Object.fromEntries(STAGE_FILTERS.map(f => [f.id, f.label])) as Record<StageGroup, string>;
type Filter = 'all' | StageGroup;

/**
 * Component picker with optional manual 360° views and an inquiry brief.
 * Keyboard: arrow keys / Home / End in the picker, or the rotation slider.
 * Touch: tap, swipe between static parts, or drag to rotate a supported part.
 */
export default function ComponentStage() {
  const [filter, setFilter] = useState<Filter>('all');
  const [slug, setSlug] = useState(() => STAGE_PARTS.find(part => part.slug === briefStore.get().slug)?.slug ?? STAGE_PARTS[0].slug);
  const [prev, setPrev] = useState<string | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const strip = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const swipe = useRef<number | null>(null);
  const reduced = useMedia(REDUCED_QUERY);
  const [turn, setTurn] = useState(0);
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null);
  const spun = useRef(new Set<string>());
  const cancelIntro = useRef<() => void>(() => {});
  const { briefs } = useBriefState();

  const visible = STAGE_PARTS.filter(p => filter === 'all' || p.groups.includes(filter));
  const part = STAGE_PARTS.find(p => p.slug === slug) ?? STAGE_PARTS[0];
  const pos = Math.max(0, visible.findIndex(p => p.slug === part.slug));
  const frames = SPIN[part.slug] ?? 0;
  const brief = briefs[part.slug] ?? emptyBrief();
  const count = briefCount(brief);
  const inquiry = `/contact?reference=${encodeURIComponent(part.name)}&brief=${encodeURIComponent(briefText(part, brief))}`;

  const select = (next: string) => {
    if (next === slug) return;
    if (!reduced) setPrev(slug);
    setSlug(next);
    setTurn(0);
    briefStore.focus(next);
  };

  // One slow introductory turn the first time a rotatable part is shown (not with reduced motion).
  useEffect(() => {
    if (!frames || reduced || spun.current.has(slug)) return;
    let raf = 0;
    let delay = 0;
    let cancelled = false;
    let t0 = 0;
    const dur = 2600;
    const cancel = () => {
      cancelled = true;
      clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
    cancelIntro.current = cancel;
    const tick = (t: number) => {
      if (cancelled) return;
      const k = Math.min(1, (t - t0) / dur); const e = k < .5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      setTurn(Math.round(e * frames) % frames);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    delay = window.setTimeout(() => {
      if (cancelled) return;
      spun.current.add(slug);
      t0 = performance.now();
      raf = requestAnimationFrame(tick);
    }, 700);
    return cancel;
  }, [slug, frames, reduced]);

  const stopIntro = () => {
    spun.current.add(slug);
    cancelIntro.current();
  };

  const toggleVariant = (v: string) => briefStore.update(part.slug, b => ({ ...b, variants: b.variants.includes(v) ? b.variants.filter(x => x !== v) : [...b.variants, v] }));
  const toggleKnown = (c: string) => briefStore.update(part.slug, b => {
    const known = { ...b.known };
    if (c in known) delete known[c]; else known[c] = '';
    return { ...b, known };
  });
  const setKnown = (c: string, value: string) => briefStore.update(part.slug, b => ({ ...b, known: { ...b.known, [c]: value } }));

  // Keep the selected thumbnail in view inside the picker without moving the page.
  useEffect(() => {
    const box = strip.current;
    const tab = tabs.current[pos];
    if (!box || !tab) return;
    const left = tab.offsetLeft - (box.clientWidth - tab.offsetWidth) / 2;
    box.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' });
  }, [pos, filter, reduced]);

  const chooseFilter = (id: Filter) => {
    setFilter(id);
    const list = STAGE_PARTS.filter(p => id === 'all' || p.groups.includes(id));
    if (!list.some(p => p.slug === slug)) select(list[0].slug);
  };

  const step = (dir: 1 | -1) => select(visible[(pos + dir + visible.length) % visible.length].slug);

  const onKey = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const keys: Record<string, number> = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: visible.length - 1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (keys[event.key] + visible.length) % visible.length;
    select(visible[next].slug);
    tabs.current[next]?.focus();
  };

  const down = (event: PointerEvent<HTMLDivElement>) => {
    if (frames) {
      drag.current = { x: event.clientX, start: turn, moved: false };
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }
    swipe.current = event.pointerType === 'mouse' ? null : event.clientX;
  };
  const dragMove = (event: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || !stage.current) return;
    const dx = event.clientX - d.x;
    if (Math.abs(dx) > 3) d.moved = true;
    const per = stage.current.offsetWidth * 1.1 / frames;
    setTurn(((d.start - Math.round(dx / per)) % frames + frames) % frames);
  };
  const up = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current) { drag.current = null; return; }
    if (swipe.current === null) return;
    const dx = event.clientX - swipe.current;
    swipe.current = null;
    if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
  };

  const img = (s: string) => <img src={partSrc(s)} srcSet={`${partSrc(s, '600')} 600w, ${partSrc(s)} 1200w`}
    sizes="(max-width: 1023px) 86vw, 620px" alt="" width="1200" height="1200" decoding="async" />;

  return <section className="kp8-parts" id="page-section-components" data-section-label="02 Components" aria-labelledby="kp8-parts-title" onPointerDownCapture={stopIntro} onKeyDownCapture={stopIntro}>
    <div className="kp-container">
      <header className="kp8-parts__head kp7-head">
        <p className="kp7-head__label"><span>02</span>Components</p>
        <h2 id="kp8-parts-title">Find the component for your application.</h2>
        <p className="kp7-head__intro">Explore component types and available 360° views. Select variants and add requirements – your choices carry over to the inquiry.</p>
      </header>

      <div className="kp8-seg" role="group" aria-label="Filter by field">
        {STAGE_FILTERS.map(f => <button type="button" key={f.id} aria-pressed={filter === f.id} onClick={() => chooseFilter(f.id)}>{f.label}</button>)}
      </div>

      <div className="kp8-parts__grid">
        <div className="kp8-stagewrap">
          <div className="kp8-stage" ref={stage} onPointerMove={dragMove} onPointerDown={down} onPointerUp={up} onPointerCancel={() => { swipe.current = null; drag.current = null; }} data-spin={frames ? '' : undefined} aria-hidden="true">
            <div className="kp8-stage__light" />
            <div className="kp8-stage__shadow" />
            {prev && prev !== slug && <div className="kp8-obj kp8-obj--out" key={`out-${prev}`} onAnimationEnd={() => setPrev(null)}><div className="kp8-obj__lens">{img(prev)}</div></div>}
            <div className="kp8-obj kp8-obj--in" key={slug}><div className="kp8-obj__lens">{frames ? <Spin slug={slug} count={frames} frame={turn} poster={spinFrame(slug, 0)} /> : img(slug)}</div></div>
          </div>
          <div className="kp8-stage__nav">
            <button type="button" onClick={() => step(-1)} aria-label="Previous component"><ChevronLeft size={18} aria-hidden="true" /></button>
            <p aria-live="polite"><span className="kp8-sr">Component </span>{String(pos + 1).padStart(2, '0')}<span aria-hidden="true"> / </span><span className="kp8-sr"> of </span>{String(visible.length).padStart(2, '0')}</p>
            <button type="button" onClick={() => step(1)} aria-label="Next component"><ChevronRight size={18} aria-hidden="true" /></button>
          </div>
          <div className="kp9-rotate" data-on={frames ? '' : undefined}>
            {frames ? <label><Rotate3d size={16} aria-hidden="true" /><span>Drag the part or use the slider to turn it</span>
              <input type="range" min={0} max={frames - 1} step={1} value={turn} onChange={e => { stopIntro(); setTurn(Number(e.target.value)); }} aria-label={`Rotate ${part.name}`} aria-valuetext={`${Math.round(turn / frames * 360)} degrees`} />
            </label> : <p>Choose a highlighted part in the picker for a 360° view</p>}
          </div>
        </div>

        <div className="kp8-picker" ref={strip} role="tablist" aria-label="Component types" aria-orientation="horizontal">
          {visible.map((p, i) => <button type="button" role="tab" key={p.slug} ref={el => { tabs.current[i] = el; }}
            id={`kp8-tab-${p.slug}`} aria-selected={p.slug === part.slug} aria-controls="kp8-part-panel" tabIndex={p.slug === part.slug ? 0 : -1}
            onClick={() => select(p.slug)} onKeyDown={e => onKey(e, i)}>
            <img src={partSrc(p.slug, '600')} alt="" width="600" height="600" loading="lazy" decoding="async" />
            <span>{p.name}</span>
            {SPIN[p.slug] ? <em className="kp9-badge" aria-label="360° view available">360°</em> : null}
          </button>)}
        </div>

        <div className="kp8-info" id="kp8-part-panel" role="tabpanel" aria-labelledby={`kp8-tab-${part.slug}`} key={`info-${part.slug}`}>
          <p className="kp8-info__groups">{part.groups.map(g => GROUP_LABEL[g]).join(' · ')}</p>
          <h3>{part.name}</h3>
          <p className="kp8-info__type">{part.type}</p>
          <p className="kp8-info__use">{part.use}</p>
          <div className="kp8-info__cols kp9-brief">
            <div>
              <h4 id="kp9-variants-h">Variants &amp; designs <span>Select what applies</span></h4>
              <ul aria-labelledby="kp9-variants-h">{part.variants.map(v => <li key={v}>
                <button type="button" className="kp9-opt" aria-pressed={brief.variants.includes(v)} onClick={() => toggleVariant(v)}><span className="kp9-opt__box" aria-hidden="true"><Check size={12} /></span>{v}</button>
              </li>)}</ul>
            </div>
            <div>
              <h4 id="kp9-clarify-h">Clarified before sourcing <span>Add what you already know</span></h4>
              <ol aria-labelledby="kp9-clarify-h">{part.clarify.map((c, i) => {
                const on = c in brief.known;
                return <li key={c} data-on={on || undefined}>
                  <button type="button" className="kp9-know" aria-pressed={on} onClick={() => toggleKnown(c)}>
                    <span className="kp9-know__n" aria-hidden="true">{i + 1}</span>{c}<span className="kp9-know__icon" aria-hidden="true">{on ? <Check size={14} /> : <Plus size={14} />}</span>
                  </button>
                  {on && <input type="text" className="kp9-know__input" value={brief.known[c]} maxLength={120} placeholder="Value or note (optional)" aria-label={`${c} – your value or note`} onChange={e => setKnown(c, e.target.value)} />}
                </li>;
              })}</ol>
            </div>
          </div>
          <p className="kp9-summary" aria-live="polite">{count.known || count.variants
            ? <>Your brief: <strong>{count.variants}</strong> design{count.variants === 1 ? '' : 's'} · <strong>{count.known}</strong> of 4 points known – the rest we clarify together.</>
            : <>Optional: mark what you already know. It is added to your inquiry draft – nothing is sent.</>}</p>
          <div className="kp8-info__actions">
            <Link to={inquiry} className="kp-button">Inquire about this component <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link to="/components" className="kp-text-link kp7-link">All components <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
      <p className="kp7-note">Illustrative, AI-generated component renderings and 360° views. General descriptions of component types – the deliverable range and all specifications are confirmed for each inquiry.</p>
    </div>
  </section>;
}
