import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import PrecisionConcept from './PrecisionConcept';
import NetworkConcept from './NetworkConcept';
import EditorialConcept from './EditorialConcept';
import './design-directions.css';

const concepts = [
  { id: 'werkbank', label: 'A · Werkbank', description: 'Präzision mit Charakter. Das Bauteil und sein Materialwechsel stehen im Mittelpunkt.', Component: PrecisionConcept },
  { id: 'verbund', label: 'B · Verbund', description: 'Markanter Markenauftritt. Komponia verbindet Beschaffung, Entwicklung, Qualität und Versorgung.', Component: NetworkConcept },
  { id: 'menschen', label: 'C · Menschen & Material', description: 'Industrie zum Anfassen. Arbeitsmomente, starke Typografie und konkrete Anwendungen.', Component: EditorialConcept },
];

export default function DesignDirectionsPreview() {
  const [params] = useSearchParams();
  const selected = concepts.find(c => c.id === params.get('richtung')) ?? concepts[0];
  const Concept = selected.Component;
  useEffect(() => { window.scrollTo(0, 0); document.title = `Komponia – ${selected.label}`; }, [selected]);
  return <div className="kd-preview">
    <div className="kd-selector"><div className="kd-selector__inner"><p className="kd-selector__title">Komponia / Designrichtungen</p><nav className="kd-selector__tabs" aria-label="Designrichtung wählen">{concepts.map(c => <Link key={c.id} to={`/vorschau/designrichtungen?richtung=${c.id}`} aria-current={selected.id === c.id ? 'page' : undefined}>{c.label}</Link>)}</nav><Link to="/" className="kd-selector__original">Bisheriger Stand</Link></div></div>
    <details className="kd-review"><summary>{selected.description}<span>Analyse & Grundlagen öffnen +</span></summary><div className="kd-review__body"><div><h2>Was sich aus dem bisherigen Feedback ergibt</h2><ul><li>Animationen sind erwünscht, wenn sie Komponias Leistung verständlich machen.</li><li>Laufbänder, wiederholte Kartenraster und gestapelte Beschriftungen wirkten künstlich und kleinteilig.</li><li>Weniger Wiederholung bedeutet nicht weniger Substanz: OEM, Lab, Einkauf und Versorgung brauchen Raum.</li><li>„Supply redefined.“ und die Originalfarben gehören zur bestehenden Markenwelt.</li><li>Erfahrung kommt von WTS seit 1997. Die neue Haltung darf sichtbar mutiger sein.</li></ul><p>Grundlage: drei frühere Website-Chats, die dokumentierten Übergaben vom 20./23.10., Original-LinkedIn-Banner und Unternehmensstrategie Stage 13. Die detaillierte frühere Kritik ist teilweise in Übergaben zusammengefasst, nicht als wörtliche Nutzeraussage überliefert.</p></div><div><h2>Was wir von den Referenzen übernehmen</h2><p><a href="https://www.deel.com/" target="_blank" rel="noreferrer">Deel</a>: Der Einstieg orientiert sich an konkreten Aufgaben. Eine Auswahl verändert Inhalte und Abläufe.</p><p><a href="https://stripe.com/en-de" target="_blank" rel="noreferrer">Stripe</a>: Produktbilder erklären Funktionen; die Seite wechselt zwischen Übersicht, Vertiefung und Belegen. Markenformen tauchen auch in der Bildkomposition auf.</p><p>Für Komponia werden daraus bedienbare Material-, Netzwerk-, Prüf- und Abrufszenen. Alle drei Entwürfe enthalten echte Angebotstexte und nutzbare Vertiefungen. Die CNC-Fotografie und der kurze Fertigungsfilm in Variante C stammen von Daniel Smyth / Pexels (frei nutzbare Stockmedien). Weitere vorhandene Motive bleiben Gestaltungsreferenzen. Es werden keine eigenen Standorte oder Kundenprojekte behauptet.</p></div></div></details>
    <Concept key={selected.id} />
  </div>;
}
