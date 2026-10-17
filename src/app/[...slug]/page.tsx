import '../legacy.generated.css';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Components from '@/views/Components';
import CncMachining from '@/views/CncMachining';
import ThreeDPrinting from '@/views/ThreeDPrinting';
import SheetMetal from '@/views/SheetMetal';
import InjectionMolding from '@/views/InjectionMolding';
import HowOrderingWorks from '@/views/HowOrderingWorks';
import About from '@/views/About';
import Industries from '@/views/Industries';
import Contact from '@/views/Contact';
import GenericPage, { type GenericPageData } from '@/components/GenericPage';
import LegacyRedirect from '@/components/LegacyRedirect';
import pages from '@/data/pages.json';
import { COMPONENT_GROUPS } from '@/data/components';
import { getStaticRoutes, LEGACY_REDIRECTS, routeMetadata } from '@/lib/routes';

export const dynamicParams = false;
export function generateStaticParams() { return getStaticRoutes(); }
type RouteProps = { params: Promise<{ slug: string[] }> };
export async function generateMetadata({ params }: RouteProps) { return routeMetadata((await params).slug); }

const specialPages = {
  'cnc-machining': CncMachining,
  '3d-printing': ThreeDPrinting,
  'sheet-metal-fabrication': SheetMetal,
  'injection-molding': InjectionMolding,
  'how-ordering-works': HowOrderingWorks,
  about: About,
  industries: Industries,
};

export default async function ContentPage({ params }: RouteProps) {
  const { slug } = await params;
  const route = slug.join('/');
  let content;
  if (LEGACY_REDIRECTS[route]) content = <LegacyRedirect href={LEGACY_REDIRECTS[route]} />;
  else if (['components', 'komponenten'].includes(slug[0])) {
    const group = COMPONENT_GROUPS.find(entry => entry.slug === slug[1] || entry.id === slug[1]);
    const product = group?.products.find(entry => entry.slug === slug[2] || entry.id === slug[2]);
    if (slug.length > 3 || (slug.length > 1 && !group) || (slug.length > 2 && !product)) notFound();
    content = <Components groupId={slug[1]} productId={slug[2]} />;
  } else if (route === 'contact') {
    content = <Suspense fallback={<div className="site-shell section-pad" role="status">Loading your inquiry form…</div>}><Contact /></Suspense>;
  } else if (Object.hasOwn(specialPages, route)) {
    const Page = specialPages[route as keyof typeof specialPages];
    content = <Page />;
  } else {
    const page = (pages as GenericPageData[]).find(entry => entry.route === route);
    if (!page) notFound();
    content = <GenericPage page={page} />;
  }
  return <div className="legacy-pages">{content}</div>;
}
