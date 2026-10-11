import { useRef, useState, useSyncExternalStore } from 'react';
import { Link } from 'react-router';
import { Menu, X } from 'lucide-react';
import { type NavGroup } from '../data/site';
import { NAV } from '../data/navigation';
import logoWhite from '../assets/komponia-logo-reversed.png';
import logoColor from '../assets/komponia-header-color.png';
import logoHeaderMono from '../assets/komponia-header-monochrome.png';

export function Logo({ adaptive = false }: { adaptive?: boolean }) {
  return (
    <Link to="/" className="site-logo flex items-center shrink-0" aria-label="Komponia homepage">
      <span className={`site-logo-window${adaptive ? ' site-logo-window--adaptive' : ''}`} aria-hidden="true">
        <img className={adaptive ? 'site-logo-variant--white' : undefined} src={adaptive ? logoHeaderMono : logoWhite} alt="" width={adaptive ? 1584 : 470} height={adaptive ? 358 : 172} />
        {adaptive && <img className="site-logo-variant--color" src={logoColor} alt="" width={1584} height={358} />}
      </span>
    </Link>
  );
}

function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

function getScrollSnapshot() {
  return window.scrollY > 40;
}

function getServerScrollSnapshot() {
  return false;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-2 inline-block align-middle bg-brand-banner text-brand-blue text-[11px] leading-none font-medium px-1.5 py-1 rounded-[3px]">
      {children}
    </span>
  );
}

function NavColumn({ group, bordered = false, compact = false, onNavigate }: { group: NavGroup; bordered?: boolean; compact?: boolean; onNavigate?: () => void }) {
  return (
    <div className={`py-7 ${compact ? 'px-4 min-w-0' : 'px-7 min-w-[200px]'} ${bordered ? 'border-l border-black/10' : ''}`}>
      {group.title && (
        <div className="text-[13px] mb-5" style={{ color: 'rgba(0,0,0,0.38)' }}>{group.title}</div>
      )}
      {!group.title && <div className="text-[13px] mb-5 invisible">&nbsp;</div>}
      <ul className={group.plain ? 'space-y-3' : 'space-y-6'}>
        {group.links.map((l) => (
          <li key={`${l.label}-${l.to}`}>
            <Link to={l.to} onClick={onNavigate} className="group block">
              {l.desc !== undefined ? (
                <>
                  <span className="block text-[15px] font-medium group-hover:text-brand-blue" style={{ color: 'rgba(0,0,0,0.85)' }}>
                    {l.label}
                    {l.badge && <Badge>{l.badge}</Badge>}
                  </span>
                  {l.desc && <span className="block text-[13px] mt-0.5" style={{ color: 'rgba(0,0,0,0.56)' }}>{l.desc}</span>}
                </>
              ) : (
                <span className="text-[14px] group-hover:text-brand-blue" style={{ color: 'rgba(0,0,0,0.85)' }}>
                  {l.label}
                  {l.badge && <Badge>{l.badge}</Badge>}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Header() {
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrollSnapshot, getServerScrollSnapshot);
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const desktopTriggers = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileTrigger = useRef<HTMLButtonElement>(null);

  return (
    <>
      {/* Top banner */}
      <div className="bg-brand-banner min-h-[2rem] flex items-center text-[12px]" style={{ color: 'rgba(0,0,0,0.69)' }}>
        <div className="site-shell flex items-center justify-end gap-5">
          <Link to="/how-ordering-works" className="hover:text-brand-blue">How we work</Link>
          <span className="flex items-center gap-1.5 font-medium" style={{ color: 'rgba(0,0,0,0.85)' }}>
            EN
          </span>
        </div>
      </div>

      {/* Dark at the top; light once the page is scrolled. */}
      <header className="site-header sticky top-0 z-50" data-scrolled={scrolled} onMouseLeave={() => setOpen(null)}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { setOpen(null); setMobile(false); } }}
        onKeyDown={event => { if (event.key === 'Escape') {
          if (mobile) mobileTrigger.current?.focus();
          else if (open !== null) desktopTriggers.current[open]?.focus();
          setOpen(null); setMobile(false);
        } }}>
        <div className="site-shell relative flex items-center min-h-[64px]">
          <Logo adaptive />
          {/* Desktop nav */}
          <nav className="hidden xl:flex items-stretch ml-10">
            {NAV.map((item, i) => (
              <div key={item.label} onMouseEnter={() => setOpen(i)}>
                <button
                  ref={element => { desktopTriggers.current[i] = element; }}
                  onClick={() => setOpen(i)}
                  aria-expanded={open === i}
                  aria-controls={`navigation-panel-${i}`}
                  className={`header-nav-trigger px-4 h-[64px] text-[15px] font-medium transition-shadow ${open === i ? 'shadow-[inset_0_-3px_0_#3E5AF5]' : ''}`}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </nav>
          {/* Right side */}
          <div className="hidden xl:flex items-center gap-6 ml-auto">
            <Link to="/contact" className="btn-primary text-[14px] !py-2">Prepare an inquiry</Link>
          </div>
          {/* Mobile toggle */}
          <button ref={mobileTrigger} className="header-menu-trigger xl:hidden ml-auto p-2" onClick={() => setMobile(!mobile)} aria-label="Menu" aria-expanded={mobile} aria-controls="mobile-navigation">
            {mobile ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Dropdown panel */}
        {open !== null && (
          <div className="hidden xl:block absolute left-0 right-0 top-full">
            <div id={`navigation-panel-${open}`} className={`navigation-panel mx-auto flex ${NAV[open].compact ? 'w-[calc(100%-3rem)] max-w-[1280px]' : 'w-fit max-w-[96vw]'} bg-white rounded-b-[3px] shadow-[0_4px_16px_rgba(0,0,0,0.25)] overflow-hidden`}>
              {/* black image panel */}
              <div className={`relative ${NAV[open].compact ? 'w-[180px]' : 'w-[230px]'} shrink-0 bg-black overflow-hidden`}>
                <img src={NAV[open].image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="relative p-6">
                  <div className="text-[19px] font-medium text-white">{NAV[open].label}</div>
                  <div className="text-[14px] mt-1 leading-snug" style={{ color: 'rgba(255,255,255,0.62)' }}>{NAV[open].sub}</div>
                  {NAV[open].overview && <Link to={NAV[open].overview!.to} onClick={() => setOpen(null)} className="inline-block mt-6 text-[14px] font-medium text-white underline underline-offset-4">{NAV[open].overview!.label}</Link>}
                </div>
              </div>
              {/* link columns */}
              <div className={NAV[open].compact ? 'grid grid-cols-4 flex-1 min-w-0 items-start' : 'flex items-start'}>
                {NAV[open].groups.map((g, gi) => (
                  <NavColumn key={gi} group={g} bordered={gi > 0} compact={NAV[open].compact} onNavigate={() => setOpen(null)} />
                ))}
                {NAV[open].right && <NavColumn group={NAV[open].right!} bordered onNavigate={() => setOpen(null)} />}
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobile && (
          <div id="mobile-navigation" className="header-mobile-navigation xl:hidden border-t max-h-[70vh] overflow-y-auto px-4 py-4">
            {NAV.map((item) => (
              <details key={item.label} className="header-mobile-group border-b py-2">
                <summary className="font-medium py-2 cursor-pointer list-none flex justify-between items-center">
                  {item.label}
                </summary>
                {item.compact ? (
                  <div className="pl-3 pb-2">
                    {item.overview && <Link to={item.overview.to} onClick={() => setMobile(false)} className="header-mobile-link block py-2 text-[14px]">{item.overview.label}</Link>}
                    {item.groups.map((group) => (
                      <div key={group.title} className="mt-4">
                        <p className="header-mobile-label text-[13px] mb-1">{group.title}</p>
                        <ul>{group.links.map((link) => <li key={link.to}><Link to={link.to} onClick={() => setMobile(false)} className="header-mobile-link block py-1.5 text-[14px]">{link.label}</Link></li>)}</ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="pl-3 pb-2 space-y-1">
                    {item.groups.flatMap((g) => g.links).concat(item.right ? item.right.links : []).map((l) => (
                      <li key={`${l.label}-${l.to}`}><Link to={l.to} onClick={() => setMobile(false)} className="header-mobile-link block py-1.5 text-[14px]">{l.label}</Link></li>
                    ))}
                  </ul>
                )}
              </details>
            ))}
            <Link to="/contact" onClick={() => setMobile(false)} className="btn-primary btn-l w-full mt-4">Prepare an inquiry</Link>
          </div>
        )}
      </header>
    </>
  );
}
