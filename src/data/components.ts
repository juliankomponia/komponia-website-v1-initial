import catalogue from './components.json';

// Product records are separate from the category's selection questions.
// Add records only after the configuration and its source documents are checked.
export type ConfirmedComponent = {
  reference: string;
  manufacturer?: string;
  description: string;
  checkedOn: string;
  source: string;
  characteristics: { label: string; value: string; unit?: string; conditions?: string }[];
  documents?: { title: string; href: string; revision: string }[];
};

export type ComponentProduct = {
  id: string;
  slug: string;
  title: string;
  text: string;
  selectionParameters: string[];
  selectionLabels: string[];
  confirmedComponents?: ConfirmedComponent[];
};

export type ComponentGroup = {
  id: string;
  slug: string;
  title: string;
  intro: string;
  products: ComponentProduct[];
};

export const COMPONENT_GROUPS: ComponentGroup[] = catalogue;

export function componentPath(group: ComponentGroup, product?: ComponentProduct) {
  return `/components/${group.slug}${product ? `/${product.slug}` : ''}`;
}
