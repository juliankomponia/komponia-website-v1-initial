'use client';

import { FeatureRow } from './Subpage';
import { useRef, useState, useId, useEffect } from 'react';
import Link from 'next/link';

import { ArrowRight, ChevronLeft, ChevronRight, ChevronUp, ClipboardList, Ruler, FileCheck } from 'lucide-react';
import { IMG } from '../data/site';
import { HOME_CONTENT as H } from '../data/home-stand2';
import { INDUSTRIAL_IMAGES as I } from '../data/home-stand2-images';
import BrandLabel from './BrandLabel';

export function SectionLead({ title, children }: { title: string; children?: React.ReactNode }) {
  return <div className="section-lead"><h2 className="h2-orig">{title}</h2>{children && <p>{children}</p>}</div>;
}

export function CapabilitiesCards() {
  const images = [IMG.capCnc, IMG.cap3dp, IMG.capSmf, IMG.capIm];
  return <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 justify-center">
    {H.capabilities.cards.map((c, i) => <Link href={c.to} key={c.title} className="cap-card">
      <img src={images[i]} alt="" loading="lazy" /><div className="cap-text">
        <span className="cap-title">{c.title}</span><span className="cap-subtitle">{c.desc}</span>
        <span className="cap-body"><ul>{c.specs.map(s => <li key={s}>{s}</li>)}</ul></span>
        <span className="cap-link card-link">{c.cta}</span>
      </div></Link>)}
  </div>;
}

export function OrderingProcess() {
  return <div className="progress-card">
    <h2 className="text-[1.25rem] leading-[1.5rem] md:text-[1.375rem] md:leading-[1.625rem] font-medium" style={{color:'rgba(0,0,0,0.85)'}}>{H.process.title}</h2>
    <div className="progress-line">{H.process.steps.map(s => <div key={s.title} className="progress-step">
      <span className="dot"/><div className="step-title">{s.title}</div><div className="step-text">{s.text}</div>
    </div>)}</div>
  </div>;
}

type Slide = { img: string; title: string; text?: string; to?: string; link?: string; table?: [string,string][] };
function Gallery({ slides, label }: { slides: Slide[]; label: string }) {
  const ref=useRef<HTMLDivElement>(null);
  const [expanded,setExpanded]=useState<number|null>(null);
  const id=useId();
  const [scrollState,setScrollState]=useState({overflow:false,previous:false,next:false});
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const update=()=>{const max=el.scrollWidth-el.clientWidth;const next={overflow:max>2,previous:el.scrollLeft>2,next:el.scrollLeft<max-2};setScrollState(old=>old.overflow===next.overflow&&old.previous===next.previous&&old.next===next.next?old:next);};
    const frame=requestAnimationFrame(update);const observer=new ResizeObserver(update);observer.observe(el);el.addEventListener('scroll',update,{passive:true});
    return()=>{cancelAnimationFrame(frame);observer.disconnect();el.removeEventListener('scroll',update);};
  },[slides.length]);
  const scrollBy=(dir:number)=>{const el=ref.current;if(el)el.scrollBy({left:dir*el.clientWidth*.8,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});};
  return <div className="relative">
    <div ref={ref} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label={label}>
      {slides.map((s,i)=>{const open=expanded===i;return <div key={s.title} className="group relative shrink-0 w-[calc(100%-1rem)] sm:w-[calc(50%-1rem)] xl:w-[calc(25%-0.75rem)] h-[375px] overflow-hidden snap-start" style={{backgroundColor:'rgba(0,0,0,0.03)'}}
        onMouseEnter={()=>{if(window.matchMedia('(hover: hover) and (pointer: fine)').matches)setExpanded(i);}} onMouseLeave={e=>{if(!e.currentTarget.contains(document.activeElement))setExpanded(null);}}
        onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setExpanded(null);}} onKeyDown={e=>{if(e.key==='Escape')setExpanded(null);}}>
        <img src={s.img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
        <div className={`absolute left-0 w-full bg-[#f2f2f2] px-4 transition-all duration-300 motion-reduce:transition-none ${open?'top-[45%] h-[55%]':'top-[calc(100%-3.5rem)] h-[3.5rem]'} flex flex-col`}>
          <button type="button" aria-expanded={open} aria-controls={`${id}-${i}`} onClick={()=>setExpanded(open?null:i)} className="flex items-center justify-between text-left gap-2 flex-none h-[3.5rem] text-[0.875rem] font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue" style={{color:'rgba(0,0,0,0.85)'}}>
            <span>{s.title}</span><ChevronUp size={18} className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${open?'rotate-180':''}`}/>
          </button>
          <div id={`${id}-${i}`} hidden={!open} className="min-h-0 flex-1 overflow-y-auto pb-4 text-[0.875rem]" style={{color:'rgba(0,0,0,0.85)'}}>
            {s.text&&<p className="leading-relaxed">{s.text}</p>}
            {s.table&&<table className="w-full text-[0.875rem]"><tbody>{s.table.map(([k,v])=><tr key={k} className="border-b border-black/10 last:border-0"><th scope="row" className="font-normal text-left py-2 pr-2 align-top">{k}</th><td className="py-2 align-top">{v}</td></tr>)}</tbody></table>}
            {s.to&&<Link href={s.to} className="inline-block mt-3 font-bold text-brand-blue">{s.link??'See details'}</Link>}
          </div>
        </div>
      </div>;})}
    </div>
    {scrollState.overflow && <div className="flex justify-center gap-2 mt-6">
      <button disabled={!scrollState.previous} onClick={()=>scrollBy(-1)} aria-label={`Previous ${label.toLowerCase()}`} className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center text-brand-heading hover:bg-black/5 disabled:opacity-30 disabled:cursor-default transition-colors"><ChevronLeft size={18}/></button>
      <button disabled={!scrollState.next} onClick={()=>scrollBy(1)} aria-label={`Next ${label.toLowerCase()}`} className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center text-brand-heading hover:bg-black/5 disabled:opacity-30 disabled:cursor-default transition-colors"><ChevronRight size={18}/></button>
    </div>}
  </div>;
}

const requirementImages=[I.temperatureController,I.temperatureProbe,I.tubularHeater,I.pressureSwitches];
const partnerImages=[I.controllers,I.customEngineering,I.qualityInspection,I.ongoingSupply];
export function CaseStudies(){return <Gallery slides={H['technical-questions'].cards.map((c,i)=>({...c,img:requirementImages[i],to:'/components',link:'Explore components'}))} label="Technical requirements"/>;}
export function NetworkGallery(){return <Gallery slides={H.partners.cards.map((c,i)=>({...c,img:partnerImages[i],to:'/how-ordering-works',link:'See how we work'}))} label="Partner coordination"/>;}
export function PartsGallery(){return <Gallery slides={H['component-fields'].cards.map((c,i)=>({...c,img:[I.controllers,I.sensors,I.heating,I.pressureSwitches][i],table:c.table.map(row=>[row[0],row[1]] as [string,string]),link:'Explore this component field'}))} label="Component fields"/>;}

export function QualityStandards(){
  const icons=[ClipboardList,Ruler,FileCheck];
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{H.quality.cards.map((c,i)=>{const Icon=icons[i];return <Link href="/the-protolabs-network-standard" key={c.title} className="rounded-[1rem] p-6 md:p-8 flex flex-col transition-colors hover:bg-black/[0.08]" style={{backgroundColor:'rgba(0,0,0,0.03)'}}>
    <Icon size={104} strokeWidth={1.2} aria-hidden="true" className="h-[6.5rem] max-w-[9rem] text-brand-blue mb-8 self-start"/>
    <span className="font-bold text-black text-[1.25rem] leading-[1.5rem] md:text-[1.375rem] md:leading-[1.625rem]">{c.title}</span>
    <span className="block mt-4 mb-6 text-base md:text-[1.125rem]" style={{color:'#262626'}}>{c.text}</span>
    <span className="mt-auto font-bold text-brand-blue text-base md:text-[1.125rem] inline-flex">Learn about qualification</span>
  </Link>;})}</div>;
}

export function IndustriesSection(){
  return <><div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">{H.applications.cards.map((c,i)=><Link href={c.to} key={c.title} className="cap-card"><img src={[I.controllers,I.heating,I.customEngineering,I.sensors][i]} alt="" loading="lazy"/><div className="cap-text"><span className="cap-title">{c.title}</span><span className="cap-body">{c.text}</span><span className="cap-link card-link">{c.link}</span></div></Link>)}</div></>;
}

export function ProtolabsBanner(){return <FeatureRow title={H.heritage.title} text={H.heritage.intro} img={I.pressureSwitches} imgAlt="Illustrative pressure and switching components" link={{label:'About Komponia',to:'/about'}}/>;}
export function ProductionSection(){const s=H['recurring-supply'];return <FeatureRow eyebrow="Ongoing supply" title={s.title} text={s.intro} img={I.ongoingSupply} imgAlt="Illustrative preparation of recurring component deliveries" flip link={{label:'Explore recurring supply',to:'/production-orders'}}/>;}
export function ProductionInfographic(){const s=H['supply-terms'];return <div className="grid lg:grid-cols-2 items-stretch" style={{backgroundColor:'#E6F1FC'}}><div className="p-8 md:p-14"><h2 className="text-[1.25rem] leading-[1.5rem] md:text-[1.375rem] md:leading-[1.625rem] font-bold mb-4" style={{color:'rgba(0,0,0,0.85)'}}>{s.title}</h2><p className="text-[15px] leading-relaxed mb-8" style={{color:'rgba(0,0,0,0.69)'}}>{s.intro}</p><Link href={s.cta.to} className="arrow-link">{s.cta.label}<ArrowRight size={20}/></Link></div><div className="p-8 md:p-14 border-t lg:border-t-0 lg:border-l border-black/10"><BrandLabel>Supply terms to agree</BrandLabel><dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">{s.topics.map(topic=><div key={topic.title}><dt className="font-medium text-brand-heading mb-2">{topic.title}</dt><dd className="text-[14px] leading-relaxed text-brand-body">{topic.text}</dd></div>)}</dl></div></div>;}
export function ReviewsSection(){return null;}
export function DarkCta({message='Have a part number, drawing or application in mind?',label='Prepare an inquiry',to='/contact'}:{message?:string;label?:string;to?:string}={}){return <section className="dark-cta text-center" style={{backgroundColor:'#191919'}}><div className="wrap-orig py-16 md:py-24"><h2 className="h2-orig text-white max-w-[48rem] mx-auto mb-6">{message}</h2><Link href={to} className="btn-primary">{label}</Link></div></section>;}
