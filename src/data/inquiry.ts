import { type ComponentGroup, type ComponentProduct } from './components';

export function inquiryPath(group?: ComponentGroup, product?: ComponentProduct) {
  const query = new URLSearchParams();
  if (group) query.set('group', group.slug);
  if (product) query.set('component', product.slug);
  return `/contact${query.size ? `?${query}` : ''}`;
}

export function capabilityInquiryPath(reference: string, type = 'custom') {
  return `/contact?${new URLSearchParams({ type, reference })}`;
}
