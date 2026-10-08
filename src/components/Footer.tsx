import { Link } from 'react-router';
import { Logo } from './Header';
import { FOOTER_COLUMNS } from '../data/navigation';

export default function Footer() {
  return (
    <footer className="site-footer" style={{ color: 'rgba(255,255,255,0.62)' }}>
      <div className="site-shell pt-10 pb-8">
        <div className="flex flex-wrap">
          {/* Logo */}
          <div className="w-full xl:w-auto xl:flex-[2] mt-2 mb-8 xl:mb-0">
            <Logo />
            <p className="mt-3 text-[11px] tracking-[0.12em] uppercase text-white/70">Components. Composed.</p>
          </div>
          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="w-1/2 md:w-1/3 xl:w-auto xl:flex-[0_0_16.6667%] xl:flex-none xl:basis-[16.6667%] pr-4 mt-2 mb-8 xl:mb-0">
              <h4 className="text-white font-medium text-[14px] leading-[20px]">{col.title}</h4>
              <ul className="list-none mt-1 space-y-[0.6rem] text-[14px] leading-[20px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Project preparation, in the template's newsletter position. */}
        <div className="mt-6 max-w-[500px]">
          <p className="text-white text-[16px] font-bold mb-3">Have a drawing or part number?</p>
          <div className="flex flex-wrap items-center gap-4">
            <p className="flex-1 basis-[240px] min-w-0 text-[14px] leading-[20px]">
              Start with your application, required quantities and preferred delivery schedule.
            </p>
            <Link to="/contact" className="shrink-0 min-h-[38px] px-4 py-2 rounded-[3px] bg-brand-blue hover:bg-brand-bluehover text-white text-[14px] font-bold transition-colors">
              Prepare an inquiry
            </Link>
          </div>
          <p className="text-[12px] mt-2" style={{ color: 'rgba(255,255,255,0.38)' }}>
            Specifications, qualification and supply terms are agreed for each project.
          </p>
        </div>

        {/* Bottom bar */}
        <hr className="mt-10 mb-6 border-0 border-t" style={{ borderColor: 'rgba(255,255,255,0.24)' }} />
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.38)' }}>
            Copyright © 2026 Komponia. All rights reserved.
          </p>
          <ul className="flex gap-4 text-[14px]">
            <li className="text-white font-medium">EN</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
