import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { CatalogueFigure } from '../components/CatalogueCards';
import { capabilityInquiryPath } from '../data/inquiry';
import { articleByPath, productArticle, type CatalogueArticle } from '../data/refrigeration-articles';
import { refrigerationFamilyPath, refrigerationPath } from '../data/refrigeration';
import NotFound from './NotFound';

function Specifications({ article }: { article: CatalogueArticle }) {
  const { profile, reference, fields, product } = article;
  const details = profile ? [...profile.commonFacts, ...(profile.variants[reference] ?? [])] : [];
  const facts = [...fields, ...details.filter(([key, value]) => !fields.some(([label, field]) => key === label && value === field))];
  return <section className="article-specs" aria-labelledby="article-spec-title">
    <h2 id="article-spec-title">Technical details</h2>
    {fields.length > 0 && <p>{product.comparison.caption}</p>}
    {product.example?.reference === reference && <p>{product.example.specification}</p>}
    <dl>{facts.map(([label, value]) => <div key={label + value}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
  </section>;
}

export default function RefrigerationArticle() {
  const { pathname } = useLocation();
  const article = articleByPath(pathname.replace(/\/+$/, ''));
  if (!article) return <NotFound />;
  const { product, range, reference, kind, profile } = article;
  const rangePath = refrigerationPath + '/' + range.slug;
  const references = product.comparison.rows.map(row => row[0]);
  if (product.example && !references.includes(product.example.reference)) references.push(product.example.reference);
  return <div className="hvacr catalogue-article">
    <div className="site-shell article-shell">
      <nav className="article-breadcrumb" aria-label="Breadcrumb"><Link to={refrigerationPath}>HVAC/R catalogue</Link><span>/</span><Link to={rangePath}>{range.title}</Link></nav>
      <header className={'article-intro' + (profile?.images.length ? '' : ' article-intro--text')}>
        <div className="article-copy">
          <div className="article-kind">{kind}</div>
          <h1>{reference}</h1>
          <p className="article-name">{profile?.name ?? product.title}</p>
          <p className="article-application">{profile?.application ?? product.description}</p>
          <Link to={capabilityInquiryPath(product.title + ' / ' + reference, 'component')} className="btn-primary-l">Enquire about {reference} <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        {profile?.images[0] && <CatalogueFigure image={profile.images[0]} priority />}
      </header>
      <div className="article-detail">
        <Specifications article={article} />
        {profile && profile.images.length > 1 && <section className="article-views"><h2>Additional views</h2>
          {profile.images.slice(1).map(image => <CatalogueFigure key={image.file} image={image} />)}
        </section>}
      </div>
      <section className="article-variants"><h2>{product.title}</h2>
        {profile && <p>{product.description}</p>}
        <div className="article-reference-list" aria-label="References in this family">
          {references.map(ref => {
            const variant = productArticle(product, ref)!;
            return <Link key={ref} to={variant.path} aria-current={ref === reference ? 'page' : undefined}>{ref}</Link>;
          })}
        </div>
        {product.relatedFamilies?.length && <nav className="article-related" aria-label="Matching valve components">
          <h3>Matching valve components</h3>
          {product.relatedFamilies.map(title => <Link key={title} className="hvacr-link" to={refrigerationFamilyPath(range.slug, title)}>
            {title} <ArrowRight size={16} aria-hidden="true" />
          </Link>)}
        </nav>}
        <Link className="hvacr-link" to={rangePath}><ArrowLeft size={16} aria-hidden="true" /> Browse {range.title.toLowerCase()}</Link>
      </section>
    </div>
  </div>;
}
