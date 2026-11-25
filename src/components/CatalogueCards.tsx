import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { refrigerationPath, refrigerationRanges } from '../data/refrigeration';
import { catalogueImagePath, familyFeature, type CatalogueArticle, type CatalogueImage } from '../data/refrigeration-articles';

export function CatalogueFigure({ image, priority = false }: { image: CatalogueImage; priority?: boolean }) {
  return <figure className="catalogue-figure">
    <div><img src={catalogueImagePath(image)} alt={image.alt} loading={priority ? 'eager' : 'lazy'} decoding="async" /></div>
    <figcaption>{image.caption}</figcaption>
  </figure>;
}

export function ArticleCard({ article }: { article: CatalogueArticle }) {
  const { profile, reference, path, product, kind } = article;
  if (!profile?.images.length) return null;
  return <Link className="catalogue-card" to={path}>
    <CatalogueFigure image={profile.images[0]} />
    <div className="catalogue-card-meta">{kind} <strong>{reference}</strong></div>
    <div className="catalogue-card-title"><span>{profile.name || product.title}</span><ArrowRight size={18} aria-hidden="true" /></div>
  </Link>;
}

const selections: Record<string, string[]> = {
  home: ['Truck refrigeration units', 'T2/TE2 flare-to-flare valve bodies', 'Tube expander kits'],
  refrigeration: ['LCU indoor scroll condensing units', 'RFGD balanced-port expansion valves', 'R32 fixed-speed rotary compressors'],
  components: ['Single and dual pressure switches', 'T2/TE2 flare-to-solder valve bodies', 'Shaded-pole and EC motors'],
  'pressure-and-switching-devices': ['Single and dual pressure switches', 'Phase and motor protection relays'],
  'pressure-switches': ['Single and dual pressure switches'],
  'controllers-and-control-systems': ['Air-conditioning remote controls', 'Control boxes, thermostats and defrost timers', 'Voltage protection, relays and contactors'],
  'refrigeration-controllers': ['Control boxes, thermostats and defrost timers'],
  'heating-elements': ['Compressor heaters and replacement parts'],
};

export function CatalogueSelection({ subject }: { subject: string }) {
  const families = selections[subject];
  if (!families) return null;
  const products = refrigerationRanges.flatMap(range => range.products);
  const articles = families.flatMap(title => {
    const product = products.find(product => product.title === title);
    const article = product && familyFeature(product);
    return article ? [article] : [];
  });
  if (!articles.length) return null;
  if (subject === 'home') return <div className="catalogue-cards">{articles.map(article => <ArticleCard key={article.path} article={article} />)}</div>;
  return <section className="catalogue-selection site-shell" data-section-label="Catalogue articles">
    <div className="catalogue-selection-head"><h2>Related catalogue articles</h2>
      <Link className="hvacr-link" to={refrigerationPath}>Explore the catalogue <ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
    <div className="catalogue-cards">{articles.map(article => <ArticleCard key={article.path} article={article} />)}</div>
  </section>;
}
