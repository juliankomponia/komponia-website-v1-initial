import Image from 'next/image';
import Link from 'next/link';
import { COMPANY } from '@/data/company';

const groups = [
  { name: 'Work with us', links: [['Components', '/components'], ['Custom OEM solutions', '/oem-solutions'], ['Engineering & CAD', '/custom-solutions'], ['Series supply', '/production-orders']] },
  { name: 'Get to know us', links: [['About Komponia', '/about'], ['Quality & lab', '/quality-and-lab'], ['How we work', '/how-ordering-works'], ['Our background', '/brand-background']] },
  { name: 'More information', links: [['Industries', '/industries'], ['Technical guides', '/guides'], ['Supplier collaboration', '/become-a-manufacturing-partner'], ['Information handling', '/ip-protection']] },
];

export default function SiteFooter() {
  return <footer className="k-footer">
    <div className="k-shell">
      <div className="k-footer-top">
        <div>
          <Link href="/" aria-label="Komponia homepage" className="k-footer-logo"><Image src="/assets/komponia-header-monochrome.png" width={196} height={42} alt="komponia" /></Link>
          <address><strong>{COMPANY.name}</strong><br />{COMPANY.street}<br />{COMPANY.city}, {COMPANY.country}</address>
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </div>
        {groups.map(group => <div key={group.name}><h2>{group.name}</h2><ul>{group.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></div>)}
      </div>
      <div className="k-footer-bottom flex flex-wrap items-center justify-between gap-4"><span>© {new Date().getFullYear()} Komponia.</span><span>Technical components. Personal support.</span><a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a></div>
    </div>
  </footer>;
}
