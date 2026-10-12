import { useEffect } from 'react';
import { useLocation } from 'react-router';
import pages from '../data/pages.json';
import { COMPONENT_GROUPS } from '../data/components';
import { INDUSTRIAL_IMAGES as I } from '../data/images';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Technical components, custom solutions & ongoing supply',
  '/about': 'About Komponia',
  '/how-ordering-works': 'How we work',
  '/cnc-machining': 'CNC machining',
  '/3d-printing': '3D printing',
  '/sheet-metal-fabrication': 'Sheet metal fabrication',
  '/injection-molding': 'Injection molding',
  '/industries': 'Applications and requirements',
};

const PAGE_DESCRIPTIONS: Record<string, string> = {
  '/': 'Technical components and OEM solutions with in-house CAD, Komponia-Lab checks, personal support and recurring supply with dynamic safety stock.',
  '/about': 'Komponia builds on WTS technical component experience since 1997. Components and advice, custom solutions and agreed ongoing supply.',
  '/how-ordering-works': 'Start with your component or application requirement. Clarify the scope, agree the offer and define any samples, checks and delivery arrangements.',
  '/cnc-machining': 'Prepare a CNC machining requirement with material, geometry, interfaces, tolerances and quantities. Coordinate a suitable process and agreed checks.',
  '/3d-printing': 'Compare 3D printing process options against geometry, material and intended use. Prepare requirements for prototypes and custom parts.',
  '/sheet-metal-fabrication': 'Define sheet material, geometry, interfaces and finishing requirements for a custom fabricated part. Agree quantities and evaluation criteria.',
  '/injection-molding': 'Prepare material, geometry, tooling, sample and volume requirements for an injection molding discussion.',
  '/industries': 'Browse application requirements for machinery, electronics, automation and other technical equipment. Define operating conditions, interfaces and the evidence needed for your application.',
};

function routeMetadata(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const segments = path.split('/').filter(Boolean);
  if (segments[0] === 'components' || segments[0] === 'komponenten') {
    const group = COMPONENT_GROUPS.find(entry => entry.slug === segments[1] || entry.id === segments[1]);
    const product = group?.products.find(entry => entry.slug === segments[2] || entry.id === segments[2]);
    const missing = segments.length > 3 || (segments.length > 1 && !group) || (segments.length > 2 && !product);
    return {
      title: missing ? 'Component not found' : product?.title ?? group?.title ?? 'Components for your application',
      description: missing ? 'This component address does not match a category. Browse the Komponia component groups to find the relevant selection guide.' : product?.text ?? group?.intro ?? 'Explore controllers, sensors, heating elements and switching devices. Category selection guides help define the right requirement for your application.',
      image: group ? [I.controllers, I.sensors, I.heating, I.pressureSwitches][COMPONENT_GROUPS.indexOf(group)] : I.heroComponents,
    };
  }
  const generic = pages.find(page => `/${page.route}` === path);
  return {
    title: PAGE_TITLES[path] ?? generic?.title ?? 'Page not found',
    description: PAGE_DESCRIPTIONS[path] ?? generic?.subtitle ?? 'This address does not match a Komponia page. Explore technical components or return to the homepage.',
    image: I.heroComponents,
  };
}

function setMeta(attribute: 'name' | 'property', key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = value;
}

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const metadata = routeMetadata(pathname);
    document.title = `${metadata.title} | Komponia`;
    setMeta('name', 'description', metadata.description);
    setMeta('name', 'robots', 'noindex, follow');
    setMeta('property', 'og:title', document.title);
    setMeta('property', 'og:description', metadata.description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'Komponia');
    setMeta('property', 'og:image', new URL(metadata.image, document.baseURI).href);
    setMeta('name', 'twitter:card', 'summary_large_image');
    // Canonical and public og:url need the confirmed domain and a crawlable
    // routing/hosting setup. Fragment routes are retained for local review.
  }, [pathname]);
  return null;
}
