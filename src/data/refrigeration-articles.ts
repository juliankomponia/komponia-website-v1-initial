import profiles from './refrigeration-articles.json';
import { refrigerationPath, refrigerationRanges, type RefrigerationProduct, type RefrigerationRange } from './refrigeration';

type Fact = string[];
export type CatalogueImage = { file: string; alt: string; caption: string };
type ArticleProfile = {
  range: string;
  family: string;
  name: string;
  kind: string;
  application: string;
  sourcePage: number;
  images: CatalogueImage[];
  commonFacts: Fact[];
  variants: Partial<Record<string, Fact[]>>;
};

export type CatalogueArticle = {
  range: RefrigerationRange;
  product: RefrigerationProduct;
  reference: string;
  path: string;
  fields: Fact[];
  kind: string;
  profile?: ArticleProfile;
};

function referenceSlug(reference: string) {
  return reference.toLowerCase().replace(/\+/g, '-plus-').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function catalogueImagePath(image: CatalogueImage) {
  return import.meta.env.BASE_URL + 'catalogue/' + image.file;
}

const byProduct = new Map<RefrigerationProduct, Map<string, CatalogueArticle>>();
const byPath = new Map<string, CatalogueArticle>();

for (const range of refrigerationRanges) {
  for (const product of range.products) {
    const articles = new Map<string, CatalogueArticle>();
    const { columns, rows } = product.comparison;
    const extra = product.example && !rows.some(row => row[0] === product.example?.reference) ? [[product.example.reference]] : [];
    for (const [reference, ...values] of [...rows, ...extra]) {
      const path = refrigerationPath + '/' + range.slug + '/' + referenceSlug(reference);
      const fields = values.map((value, index) => [columns[index + 1], value]);
      const article = { range, product, reference, path, fields, kind: columns[0] };
      articles.set(reference, article);
      byPath.set(path, article);
    }
    byProduct.set(product, articles);
  }
}

// An illustration applies only to the references explicitly listed on its source page.
for (const series of profiles satisfies ArticleProfile[]) {
  const product = refrigerationRanges.find(range => range.slug === series.range)?.products.find(product => product.title === series.family);
  if (!product) continue;
  for (const reference of Object.keys(series.variants)) {
    const article = byProduct.get(product)?.get(reference);
    if (article) {
      article.profile = series;
      article.kind = series.kind;
    }
  }
}

export function articleByPath(path: string) { return byPath.get(path); }
export function productArticle(product: RefrigerationProduct, reference: string) { return byProduct.get(product)?.get(reference); }
export function familyFeature(product: RefrigerationProduct, references?: string[]) {
  const articles = byProduct.get(product);
  if (!articles) return undefined;
  const candidates = references ? references.map(reference => articles.get(reference)) : [...articles.values()];
  return candidates.find(article => article?.profile?.images.length);
}

export function rangeFeature(range: RefrigerationRange, preferredFamily?: string) {
  const preferred = range.products.find(product => product.title === preferredFamily);
  const feature = preferred && familyFeature(preferred);
  return feature ?? range.products.map(product => familyFeature(product)).find(Boolean);
}
