import content from './capability-pages.json';
import { CAPABILITY_IMAGES } from './capability-images';
import { CAPABILITY_HEROES } from './capability-heroes';
import { INDUSTRIAL_IMAGES } from './images';

const categoryImages: Record<string, string> = INDUSTRIAL_IMAGES;
const sharedFaqs = [
  { q: 'How are quantities and delivery dates agreed?', a: 'Share sample quantities, expected demand and preferred dates. The technical scope, sourcing, checks and delivery conditions are confirmed with the offer.' },
  { q: 'Can OEM requirements and recurring supply be included?', a: 'OEM requirements, engineering, quality and supply coordination are part of the discussion in every area. Agree the component scope, responsibilities, repeat quantities and any stock or call-off arrangements.' },
];

export const CAPABILITY_PAGES = content.map(page => ({
  ...page,
  hero: CAPABILITY_HEROES[page.media],
  inquiry: `/contact?${new URLSearchParams({ type: page.type, reference: page.title })}`,
  overview: {
    ...page.overview,
    cards: page.overview.cards.map(card => ({
      ...card,
      to: 'to' in card ? card.to : undefined,
      image: card.image === 'product' ? CAPABILITY_IMAGES[page.media]
        : card.image === 'hero' ? CAPABILITY_HEROES[page.media] : categoryImages[card.image],
    })),
  },
  faqs: [...page.faqs, ...sharedFaqs],
}));

export type CapabilityPageData = typeof CAPABILITY_PAGES[number];
