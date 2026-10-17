import Link from 'next/link';

export default function NotFound() {
  return <section className="mx-auto max-w-7xl px-6 py-28 md:px-10">
    <p className="mb-6 text-sm font-medium text-brand-blue">404 — Page not found</p>
    <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">Let’s find the right direction.</h1>
    <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-body">This address does not match a Komponia page. Explore our components or return to the homepage.</p>
    <div className="mt-9 flex flex-wrap gap-4"><Link className="rounded-full bg-brand-blue px-6 py-3 font-medium text-white" href="/">Back to home</Link><Link className="rounded-full border border-brand-dark px-6 py-3 font-medium" href="/components">Explore components</Link></div>
  </section>;
}
