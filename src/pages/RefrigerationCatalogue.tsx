import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router';
import { capabilityInquiryPath } from '../data/inquiry';
import { ArticleCard, CatalogueFigure } from '../components/CatalogueCards';
import { articleInquiryPath, familyFeature, productArticle, rangeFeature } from '../data/refrigeration-articles';
import {
  refrigerationFamilyPath, refrigerationPath, refrigerationRanges, refrigerationSummary, refrigerationTitle,
  type RefrigerationProduct,
} from '../data/refrigeration';
import NotFound from './NotFound';
import './refrigeration-catalogue.css';

function searchKey(text: string) {
  return text.normalize('NFKC').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function matchProduct(product: RefrigerationProduct, groupTitle: string, query: string) {
  const words = query.trim().split(/\s+/).map(searchKey).filter(Boolean);
  if (query.trim() && !words.length) return null;
  const family = [groupTitle, product.title, product.description].map(searchKey);
  const remaining = words.filter(word => !family.some(field => field.includes(word)));
  const { comparison, example } = product;
  const needle = searchKey(query);
  const literal = query.trim().toLowerCase();
  const literalRows = comparison.rows.filter(([ref]) => ref.toLowerCase() === literal);
  const exact = literalRows.length ? literalRows : comparison.rows.filter(([ref]) =>
    needle && (searchKey(ref) === needle || searchKey(productArticle(product, ref)?.number ?? '') === needle));
  if (exact.length) return { product, rows: exact, narrowed: true, example: exact.some(([ref]) => ref === example?.reference) ? example : undefined };
  if (!remaining.length) return { product, rows: comparison.rows, narrowed: false, example };

  function matches(fields: string[]) {
    const keys = fields.map(searchKey);
    return remaining.every(word => keys.some(key => key.includes(word)));
  }
  const context = [comparison.caption, ...comparison.columns];
  const rows = comparison.rows.filter(row => {
    if (matches([...context, ...row])) return true;
    const article = productArticle(product, row[0]);
    if (article?.number && matches([...context, ...row, article.number])) return true;
    const series = article?.profile;
    return series && matches([...context, ...row, series.name, series.application, ...series.commonFacts.flat(), ...(series.variants[row[0]] ?? []).flat()]);
  });
  const matchedExample = example && matches([example.reference, example.specification, productArticle(product, example.reference)?.number ?? '']) ? example : undefined;
  if (!rows.length && !matchedExample) return null;
  return { product, rows, narrowed: true, example: matchedExample };
}

type ProductMatch = NonNullable<ReturnType<typeof matchProduct>>;

function Comparison({ product, rows, narrowed }: ProductMatch) {
  if (!rows.length) return null;
  const { caption, columns } = product.comparison;
  const table = <div className="hvacr-table-wrap" tabIndex={0} role="region" aria-label={product.title + ' comparison'}>
    <table className="hvacr-table">
      <caption>{caption}</caption>
      <thead><tr>{columns.map(column => <th key={column} scope="col">{column}</th>)}<th scope="col">Enquiry</th></tr></thead>
      <tbody>{rows.map(([reference, ...values]) => <tr key={reference}>
        <th scope="row"><Link className="hvacr-reference" to={productArticle(product, reference)!.path}>{reference}</Link>
          {productArticle(product, reference)?.number && <small className="hvacr-number">{productArticle(product, reference)!.number}</small>}
        </th>
        {values.map((value, index) => <td key={columns[index + 1]}>{value}</td>)}
        <td><Link className="hvacr-link" to={articleInquiryPath(productArticle(product, reference)!)}
          aria-label={'Request ' + reference}>Enquire <ArrowRight size={15} aria-hidden="true" /></Link></td>
      </tr>)}</tbody>
    </table>
  </div>;

  return narrowed ? <div className="hvacr-comparison">{table}</div> :
    <details className="hvacr-comparison">
      <summary>Compare {rows.length} configurations</summary>
      {table}
    </details>;
}

function ProductRow({ match }: { match: ProductMatch }) {
  const { product, example, narrowed, rows } = match;
  const references = rows.map(row => row[0]);
  if (example) references.push(example.reference);
  const feature = familyFeature(product, narrowed ? references : undefined);
  const exampleArticle = example && productArticle(product, example.reference);
  const showExample = example && exampleArticle && exampleArticle !== feature;
  return <article className="hvacr-product">
    <div className="hvacr-family">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      {showExample && <div className="hvacr-example">
        <Link className="hvacr-link" to={exampleArticle.path}>{exampleArticle.kind} {example.reference} <ArrowRight size={15} aria-hidden="true" /></Link>
        <p>{example.specification}</p>
      </div>}
      {!feature && !exampleArticle && !narrowed && <Link className="hvacr-link" to={productArticle(product, rows[0][0])!.path}>
        View {rows[0][0]} <ArrowRight size={16} aria-hidden="true" /></Link>}
    </div>
    {feature && <ArticleCard article={feature} />}
    <Comparison {...match} />
  </article>;
}

const rangeFeatures: Record<string, string> = {
  'cooling-units': 'DCU semi-hermetic condensing units',
  'heat-exchangers': 'Microchannel condensers',
  'compressors': 'R32 fixed-speed rotary compressors',
  'fluids-and-pipework': 'Copper and brass fittings',
  'circuit-components': 'T2/TE2 flare-to-flare valve bodies',
  'motors-and-controls': 'Shaded-pole and EC motors',
  'service-tools': 'Electronic refrigerant charging scales',
  'cold-rooms-and-installation': 'Cold-room LED lighting',
};

export default function RefrigerationCatalogue() {
  const { rangeSlug } = useParams();
  const [params, setParams] = useSearchParams();
  const selectedFamily = params.get('family');
  const query = params.get('q') ?? selectedFamily ?? '';
  const range = refrigerationRanges.find(item => item.slug === rangeSlug);
  if (rangeSlug && !range) return <NotFound />;

  const groups = range ? [range] : refrigerationRanges;
  const hero = range ? undefined : rangeFeature(refrigerationRanges[0], 'LCU indoor scroll condensing units');
  const results = groups.map(group => ({
    ...group,
    products: group.products
      .filter(product => !selectedFamily || product.title === selectedFamily)
      .map(product => matchProduct(product, group.title, query))
      .filter((match): match is ProductMatch => match !== null),
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
        {hero?.profile && <Link className="catalogue-hero-article" to={hero.path}>
          <CatalogueFigure image={hero.profile.images[0]} priority />
          <span>{hero.reference} · {hero.profile.name}<ArrowRight size={17} aria-hidden="true" /></span>
        </Link>}
      </div>
    </header>

    <div className="site-shell hvacr-content">
      {range && <Link className="hvacr-link hvacr-back" to={refrigerationPath}><ArrowLeft size={16} aria-hidden="true" /> All product ranges</Link>}
      <div className="hvacr-tools">
        <h2>{range ? 'Product families' : 'Browse the range'}</h2>
        <div className="hvacr-search" role="search" aria-label="Catalogue">
          <Search size={18} aria-hidden="true" />
          <label className="sr-only" htmlFor="hvacr-query">{range ? 'Search this range' : 'Search the catalogue'}</label>
          <input id="hvacr-query" type="search" placeholder={range ? 'Search this range' : 'Article no., model or product'} value={query} onChange={event => updateQuery(event.target.value)} />
          {query && <button type="button" onClick={() => updateQuery('')}>Clear</button>}
        </div>
      </div>

      {!showProducts && <div className="hvacr-index">
        {refrigerationRanges.map(group => {
          const feature = rangeFeature(group, rangeFeatures[group.slug]);
          return <section className="catalogue-range" key={group.slug}>
            {feature?.profile && <Link className="catalogue-range-example" to={feature.path}>
              <CatalogueFigure image={feature.profile.images[0]} />
              <span>{feature.kind} <strong>{feature.reference}</strong> <ArrowRight size={15} aria-hidden="true" /></span>
            </Link>}
            <h3><Link to={refrigerationPath + '/' + group.slug}>{group.title} <ArrowRight size={18} aria-hidden="true" /></Link></h3>
            <p>{group.description}</p>
            <details className="catalogue-family-links">
              <summary>Browse {group.products.length} product families</summary>
              <ul>{group.products.map(product => <li key={product.title}>
                <Link to={refrigerationFamilyPath(group.slug, product.title)}>{product.title}</Link>
              </li>)}</ul>
            </details>
          </section>;
        })}
      </div>}

      <p className={searching ? 'hvacr-count' : 'sr-only'} role="status">
        {searching && (count === 1 ? '1 product family' : count + ' product families') + ' found'}
      </p>
      {showProducts && results.map(group => <section key={group.slug} aria-label={group.title} className="hvacr-results">
        {!range && <h2><Link to={refrigerationPath + '/' + group.slug}>{group.title} <ArrowRight size={17} aria-hidden="true" /></Link></h2>}
        {group.products.map(match => <ProductRow key={match.product.title} match={selectedFamily ? { ...match, narrowed: true } : match} />)}
      </section>)}
      {searching && count === 0 && <p className="hvacr-empty">Try a shorter reference or <Link className="hvacr-link" to={capabilityInquiryPath(query.trim().slice(0, 200), 'component')}>ask Komponia about this item <ArrowRight size={16} aria-hidden="true" /></Link>.</p>}
    </div>
  </div>;
}
