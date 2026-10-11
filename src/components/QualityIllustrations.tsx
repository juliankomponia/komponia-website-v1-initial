import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { HOME_CONTENT as H } from '../data/home';
import './QualityIllustrations.css';

function SpecificationDrawing() {
  return <>
    <path className="k-quality-muted" d="M61 34H49v124h111v-10" />
    <path className="k-quality-paper" d="M69 20h85l27 27v101H69V20Z" />
    <path d="M154 20v27h27M84 40h40M84 51h24M84 66h81" />
    <path className="k-quality-muted" d="M84 134h42m9 0h30" />
    <path d="M92 120V84h61v13h-17v23H92Z" />
    <path className="k-quality-muted" d="M84 127h76M85 78v45M145 111h16" />
    <path className="k-quality-detail" pathLength={1} d="M92 84h61v13h-17" />
    <path className="k-quality-leader" d="m153 84 24-18h48" />
    <circle className="k-quality-point" cx="153" cy="84" r="3" />
    <path className="k-quality-muted" d="M192 54h33m-24-8h24" />
  </>;
}

function InspectionDrawing() {
  return <>
    <path className="k-quality-muted" d="M51 151h178M67 70V45m123 25V45M67 51h123M62 46l10 10m113-10 10 10" />
    <path className="k-quality-part" d="m77 83 24-14 25 14v30l-25 14-24-14V83Z" />
    <path d="m77 83 24 14 25-14M101 97v30" />
    <path className="k-quality-part" d="M126 83h49c12 0 20 6 20 15s-8 15-20 15h-49" />
    <path d="M172 83c-10 7-10 23 0 30M181 85c-8 6-8 20 0 26" />
    <ellipse cx="101" cy="84" rx="8" ry="4.5" />
    <path className="k-quality-muted" d="M49 98h17m139 0h23M139 133v8m-4-4h8" />
    <path className="k-quality-detail" pathLength={1} d="M61 75V60h140v15M61 60v70h15M201 60v70h-15" />
    <path className="k-quality-leader" d="M111 60h40" />
    <path className="k-quality-point-line" d="M126 56v8m10-8v8" />
  </>;
}

function SeriesDrawing() {
  return <>
    <path className="k-quality-muted" d="M56 43H45v108h70" />
    <path className="k-quality-paper" d="M63 27h63l21 21v91H63V27Z" />
    <path d="M126 27v21h21M77 48h28M77 60h48" />
    <path className="k-quality-muted" d="M77 77h6m10 0h33M77 92h6m10 0h33M77 107h6m10 0h23M77 124h22" />
    <path className="k-quality-part" d="m177 90 23-13 23 13v27l-23 13-23-13V90Z" />
    <path d="m177 90 23 13 23-13M200 103v27m-34-14-14 8v21l19 11 18-10v-9M152 124l19 11 10-6m-10 6v21" />
    <path className="k-quality-muted" d="M160 47h36c12 0 18 6 18 18v4m-5-5 5 5 5-5" />
    <path className="k-quality-detail" pathLength={1} d="M141 159h-19c-11 0-17-6-17-17v-27m-5 5 5-5 5 5" />
    <path className="k-quality-leader" d="M93 77h33M93 92h25" />
    <circle className="k-quality-point" cx="83" cy="77" r="2.5" />
  </>;
}

function QualityDrawing({ index }: { index: number }) {
  return <svg className="k-quality-drawing" viewBox="0 0 280 180" fill="none" aria-hidden="true" focusable="false">
    {index === 0 ? <SpecificationDrawing /> : index === 1 ? <InspectionDrawing /> : <SeriesDrawing />}
  </svg>;
}

export default function QualityIllustrations() {
  return <div className="k-quality">
    {H.quality.cards.map((card, index) => <Link to={card.to} key={card.title} className={`k-quality-card k-quality-card--${index + 1}`}>
      <div className="k-quality-visual"><QualityDrawing index={index} /></div>
      <div className="k-quality-copy">
        <h3>{card.title}</h3>
        <p>{card.text}</p>
        <span className="k-quality-link">{card.link}<ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" /></span>
      </div>
    </Link>)}
  </div>;
}
