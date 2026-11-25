import catalogue from './refrigeration-catalogue.json';

export const refrigerationPath = '/refrigeration-catalogue';
export function refrigerationFamilyPath(rangeSlug: string, family: string) {
  return refrigerationPath + '/' + rangeSlug + '?' + new URLSearchParams({ family });
}
export const refrigerationTitle = 'Refrigeration & air-conditioning catalogue';
export const refrigerationSummary = 'Komponia distributes refrigeration equipment, components and service tools. Browse by product family or look up a model reference to prepare an inquiry.';

export type RefrigerationProduct = {
  title: string;
  description: string;
  // Printed pages in the 2026 distribution catalogue, revision 04.
  sourcePages: string;
  relatedFamilies?: string[];
  example?: { reference: string; specification: string };
  comparison: {
    sourcePages: string;
    caption: string;
    columns: string[];
    // First cell identifies the model or configuration carried into the inquiry.
    rows: string[][];
  };
};

export type RefrigerationRange = {
  slug: string;
  title: string;
  description: string;
  products: RefrigerationProduct[];
};

export const refrigerationRanges: RefrigerationRange[] = catalogue;
