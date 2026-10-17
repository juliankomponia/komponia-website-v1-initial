import type { Metadata } from 'next';
import pages from '@/data/pages.json';
import { COMPONENT_GROUPS } from '@/data/components';

export const SPECIAL_ROUTES = [
  'components', 'komponenten', 'cnc-machining', '3d-printing',
  'sheet-metal-fabrication', 'injection-molding', 'how-ordering-works',
  'about', 'industries', 'contact', 'the-protolabs-network-standard', 'protolabs-network',
];
export const LEGACY_REDIRECTS: Record<string, string> = {
  'the-protolabs-network-standard': '/quality-and-lab',
  'protolabs-network': '/brand-background',
};

export function getStaticRoutes() {
  const paths = new Set([...SPECIAL_ROUTES, ...pages.map(page => page.route)]);
  for (const base of ['components', 'komponenten']) {
    for (const group of COMPONENT_GROUPS) {
      for (const groupId of new Set([group.slug, group.id])) {
        paths.add(`${base}/${groupId}`);
        for (const product of group.products) {
          for (const productId of new Set([product.slug, product.id])) {
            paths.add(`${base}/${groupId}/${productId}`);
          }
        }
      }
    }
  }
  return [...paths].map(path => ({ slug: path.split('/') }));
}

const titles: Record<string, string> = {
  about: 'About Komponia', 'how-ordering-works': 'How we work',
  'cnc-machining': 'CNC machining', '3d-printing': '3D printing',
  'sheet-metal-fabrication': 'Sheet metal fabrication', 'injection-molding': 'Injection molding',
  industries: 'Applications and requirements', contact: 'Start with your requirement',
};

export function routeMetadata(slug: string[]): Metadata {
  const route = slug.join('/');
  const generic = pages.find(page => page.route === route);
  const group = COMPONENT_GROUPS.find(entry => entry.slug === slug[1] || entry.id === slug[1]);
  const product = group?.products.find(entry => entry.slug === slug[2] || entry.id === slug[2]);
  const components = ['components', 'komponenten'].includes(slug[0]);
  const title = components ? product?.title ?? group?.title ?? 'Components for your application' : titles[route] ?? generic?.title ?? 'Komponia';
  const description = components ? product?.text ?? group?.intro ?? 'Explore controllers, sensors, heating elements and switching devices for your application.' : generic?.subtitle ?? 'Technical components, custom OEM solutions and agreed ongoing supply. Discuss your application with Komponia.';
  return { title, description, openGraph: { title: `${title} | Komponia`, description } };
}
