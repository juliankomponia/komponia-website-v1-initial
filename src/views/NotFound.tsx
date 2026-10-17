'use client';

import Link from 'next/link';


export default function NotFound() {
  return <section className="bg-brand-gray"><div className="site-shell section-pad">
    <p className="text-brand-blue mb-3 font-medium">404</p>
    <h1 className="h2-orig mb-5">Page not found</h1>
    <p className="max-w-[42rem] mb-8">This address does not match a Komponia page. Explore the component groups or return to the homepage.</p>
    <div className="flex flex-wrap gap-4"><Link href="/components" className="btn-primary-l">Explore components</Link><Link href="/" className="btn-outline-primary">Go to homepage</Link></div>
  </div></section>;
}
