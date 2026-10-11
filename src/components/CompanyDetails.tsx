import { COMPANY } from '../data/company';

export default function CompanyDetails({ director = false }: { director?: boolean }) {
  return <address className="company-address">
    <strong className="font-medium">{COMPANY.name}</strong><br />
    {COMPANY.street}<br />{COMPANY.city}<br />{COMPANY.country}
    {director && <p className="mt-3">Managing director: {COMPANY.managingDirector}</p>}
    <p className="mt-3"><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><br />
      <a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a></p>
  </address>;
}
