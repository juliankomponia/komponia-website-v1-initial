import { ArrowRight, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { CatalogueSelection } from './CatalogueCards';
import { refrigerationPath } from '../data/refrigeration';

export default function HomeCatalogueLookup() {
  const navigate = useNavigate();
  return <aside aria-labelledby="home-catalogue-title" className="bg-brand-gray border-b border-black/10">
    <div className="site-shell py-7 md:py-9 grid gap-5 lg:grid-cols-2 lg:items-center">
      <div>
        <h2 id="home-catalogue-title" className="text-xl md:text-2xl font-medium">Refrigeration &amp; air-conditioning catalogue</h2>
        <p className="mt-2 text-brand-body">Find compressors, valves, cold-room equipment and service tools by model or application.</p>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-3 items-center lg:justify-end">
        <form role="search" aria-label="HVAC/R catalogue" className="hvacr-search bg-white" onSubmit={event => {
          event.preventDefault();
          const query = String(new FormData(event.currentTarget).get('q') ?? '').trim();
          navigate({ pathname: refrigerationPath, search: query ? new URLSearchParams({ q: query }).toString() : '' });
        }}>
          <label htmlFor="home-catalogue-query" className="sr-only">Article no., model or product</label>
          <input id="home-catalogue-query" type="search" name="q" placeholder="Article no., model or product" />
          <button type="submit" aria-label="Search catalogue"><Search size={20} aria-hidden="true" /></button>
        </form>
        <Link className="hvacr-link" to={refrigerationPath}>Browse all ranges <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </div>
    <div className="site-shell catalogue-home"><CatalogueSelection subject="home" /></div>
  </aside>;
}
