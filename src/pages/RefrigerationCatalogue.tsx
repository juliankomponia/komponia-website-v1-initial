import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router';
import { capabilityInquiryPath } from '../data/inquiry';
import { HERO_PRODUCT_IMAGE } from '../data/images';
import {
  refrigerationPath, refrigerationRanges, refrigerationSummary, refrigerationTitle,
  type RefrigerationProduct,
} from '../data/refrigeration';
import NotFound from './NotFound';
import './refrigeration-catalogue.css';

function ProductRow({ product }: { product: RefrigerationProduct }) {
  const { title, description, example } = product;
  const reference = example ? title + ' / ' + example.reference : title;
  return <article className="hvacr-product">
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <div className="hvacr-example">
      {example && <>
        <h4>Model or series <span>{example.reference}</span></h4>
        <p>{example.specification}</p>
      </>}
      <Link className="hvacr-link" to={capabilityInquiryPath(reference, 'component')}>
        {example ? 'Enquire about ' + example.reference : 'Enquire about ' + title.toLowerCase()}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  </article>;
}

function searchTerms(text: string) {
  return text.normalize('NFKC').toLowerCase().replace(/co₂/g, 'co2').replace(/[^a-z0-9]+/g, '');
}

export default function RefrigerationCatalogue() {
  const { rangeSlug } = useParams();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const range = refrigerationRanges.find(item => item.slug === rangeSlug);
  if (rangeSlug && !range) return <NotFound />;

  const terms = query.trim().split(/\s+/).map(searchTerms).filter(Boolean);
  const groups = range ? [range] : refrigerationRanges;
  const results = groups.map(group => ({
    ...group,
    products: group.products.filter(product => {
      const fields = [group.title, product.title, product.description, product.example?.reference, product.example?.specification];
      const searchable = fields.map(field => searchTerms(field ?? ''));
      return terms.every(term => searchable.some(field => field.includes(term)));
    }),
  })).filter(group => group.products.length);
  const searching = Boolean(query.trim());
  const showProducts = Boolean(range || searching);
  const count = results.reduce((sum, group) => sum + group.products.length, 0);

  function updateQuery(value: string) {
    setParams(value ? { q: value } : {}, { replace: true, preventScrollReset: true });
  }

  return <div className="hvacr">
    <header className={'hvacr-hero' + (range ? ' hvacr-hero--group' : '')}>
      <div className="site-shell hvacr-hero-inner">
        <div>
          <nav aria-label="Breadcrumb" className="hvacr-crumbs">
            <Link to="/components">Components</Link><span aria-hidden="true">/</span>
            {range ? <Link to={refrigerationPath}>HVAC/R catalogue</Link> : <span aria-current="page">HVAC/R catalogue</span>}
          </nav>
          <h1>{range?.title ?? refrigerationTitle}</h1>
          <p>{range?.description ?? refrigerationSummary}</p>
        </div>
        {!range && <img src={HERO_PRODUCT_IMAGE} alt="Illustration of refrigeration control, sensing and switching components" />}
      </div>
    </header>

    <div className="site-shell hvacr-content">
      {range && <Link className="hvacr-link hvacr-back" to={refrigerationPath}><ArrowLeft size={16} aria-hidden="true" /> All product ranges</Link>}
      <div className="hvacr-tools">
        <h2>{range ? 'Product families' : 'Browse the range'}</h2>
        <div className="hvacr-search" role="search" aria-label="Catalogue">
          <Search size={18} aria-hidden="true" />
          <label className="sr-only" htmlFor="hvacr-query">{range ? 'Search this range' : 'Search the catalogue'}</label>
          <input id="hvacr-query" type="search" placeholder={range ? 'Search this range' : 'Search by product or model'} value={query} onChange={event => updateQuery(event.target.value)} />
          {query && <button type="button" onClick={() => updateQuery('')}>Clear</button>}
        </div>
      </div>

      {!showProducts && <div className="hvacr-index">
        {refrigerationRanges.map(group => <Link key={group.slug} to={refrigerationPath + '/' + group.slug}>
          <div><h3>{group.title}</h3><p>{group.description}</p></div>
          <ArrowRight size={20} aria-hidden="true" />
        </Link>)}
      </div>}

      <p className={searching ? 'hvacr-count' : 'sr-only'} role="status">
        {searching && (count === 1 ? '1 product family' : count + ' product families') + ' found'}
      </p>
      {showProducts && results.map(group => <section key={group.slug} aria-label={group.title} className="hvacr-results">
        {!range && <h2><Link to={refrigerationPath + '/' + group.slug}>{group.title} <ArrowRight size={17} aria-hidden="true" /></Link></h2>}
        {group.products.map(product => <ProductRow key={product.title} product={product} />)}
      </section>)}
      {searching && count === 0 && <p className="hvacr-empty">Try a shorter reference or <Link className="hvacr-link" to={capabilityInquiryPath(query.trim().slice(0, 200), 'component')}>ask Komponia about this item <ArrowRight size={16} aria-hidden="true" /></Link>.</p>}
    </div>
  </div>;
}
