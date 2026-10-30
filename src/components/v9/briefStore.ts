import { useSyncExternalStore } from 'react';
import { STAGE_PARTS, type StagePart } from '../../data/home-v7';

/** One requirement brief per component: selected designs and what the visitor already knows per clarification point. */
export type Brief = { variants: string[]; known: Record<string, string> };
type State = { slug: string | null; briefs: Record<string, Brief> };

let state: State = { slug: null, briefs: {} };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach(l => l());

export const emptyBrief = (): Brief => ({ variants: [], known: {} });

export const briefStore = {
  subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
  get: () => state,
  focus(slug: string) { if (state.slug !== slug) { state = { ...state, slug }; emit(); } },
  update(slug: string, change: (brief: Brief) => Brief) {
    state = { slug, briefs: { ...state.briefs, [slug]: change(state.briefs[slug] ?? emptyBrief()) } };
    emit();
  },
};

export function useBriefState() {
  return useSyncExternalStore(briefStore.subscribe, briefStore.get, briefStore.get);
}

export const partBySlug = (slug: string | null): StagePart | undefined => STAGE_PARTS.find(p => p.slug === slug);

/** Count of filled-in clarification points and selected designs. */
export function briefCount(brief: Brief | undefined) {
  const known = brief ? Object.values(brief.known).filter(v => v !== undefined).length : 0;
  return { known, variants: brief?.variants.length ?? 0 };
}

/** Plain-text brief for the inquiry form – only what the visitor entered, the rest marked as to be clarified. */
export function briefText(part: StagePart, brief: Brief | undefined) {
  const b = brief ?? emptyBrief();
  const known = part.clarify.filter(c => c in b.known);
  const open = part.clarify.filter(c => !(c in b.known));
  return [
    `Component type: ${part.name} (${part.type})`,
    b.variants.length ? `Designs of interest: ${b.variants.join('; ')}` : '',
    known.length ? `What we already know:\n${known.map(c => `- ${c}: ${b.known[c].trim() || 'known, details to follow'}`).join('\n')}` : '',
    open.length ? `To clarify with Komponia:\n${open.map(c => `- ${c}`).join('\n')}` : '',
  ].filter(Boolean).join('\n\n');
}
