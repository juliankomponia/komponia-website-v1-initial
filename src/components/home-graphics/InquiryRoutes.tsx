import { useId } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { INQUIRY_ENTRIES, type InquiryEntry } from '../../data/inquiry-entry';
import './inquiry-routes.css';

function EntryDrawing({ entry }: { entry: InquiryEntry }) {
  return <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="inquiry-routes__drawing">
    {entry === 'part-number' && <>
      <path d="M10 14h31l13 13v23H10Z M41 14v13h13 M18 34h28 M18 41h19" />
      <path d="M18 21h12 M22 30v16 M33 30v16" />
    </>}
    {entry === 'drawing' && <>
      <path d="M10 10h44v44H10Z M21 20h22v23H21Z M21 20l11-5 11 5 M32 15v22l-11 6 M32 37l11 6" />
      <path d="M15 48h34 M18 45v6 M46 45v6" />
    </>}
    {entry === 'application' && <>
      <path d="M23 23h18v18H23Z M5 16h9v16h9 M41 32h9v16h9 M32 5v18 M32 41v18" />
      <path d="m28 10 4-5 4 5 M10 12l4 4-4 4 M54 44l5 4-5 4" />
    </>}
  </svg>;
}

export default function InquiryRoutes() {
  const titleId = useId();

  return <nav className="inquiry-routes" aria-labelledby={titleId}>
    <div className="inquiry-routes__intro">
      <h3 id={titleId}>Start with what you have.</h3>
      <p>Choose a starting point for your inquiry draft.</p>
    </div>
    <ol className="inquiry-routes__list">
      {(Object.entries(INQUIRY_ENTRIES) as [InquiryEntry, typeof INQUIRY_ENTRIES[InquiryEntry]][]).map(([entry, details], index) => (
        <li key={entry}>
          <Link className="inquiry-routes__link" to={`/contact?entry=${entry}`}>
            <span className="inquiry-routes__number" aria-hidden="true">0{index + 1}</span>
            <EntryDrawing entry={entry} />
            <span className="inquiry-routes__label">{details.label}</span>
            <span className="inquiry-routes__needs">{details.needs}</span>
            <ArrowUpRight className="inquiry-routes__arrow" size={24} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ol>
  </nav>;
}
