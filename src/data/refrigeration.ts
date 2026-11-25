import catalogue from './refrigeration-catalogue.json';

export const refrigerationPath = '/refrigeration-catalogue';
export const refrigerationTitle = 'Refrigeration & air-conditioning catalogue';
export const refrigerationSummary = 'Komponia distributes refrigeration equipment, components and service tools. Browse by product family or look up a model reference to prepare an inquiry.';

export type RefrigerationProduct = {
  title: string;
  description: string;
  // Printed pages in the 2026 distribution catalogue, revision 04.
  sourcePages: string;
  example?: { reference: string; specification: string };
};

export type RefrigerationRange = {
  slug: string;
  title: string;
  description: string;
  products: RefrigerationProduct[];
};

export const refrigerationRanges: RefrigerationRange[] = catalogue;
