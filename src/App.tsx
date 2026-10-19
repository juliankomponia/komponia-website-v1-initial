import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Components from './pages/Components';
import CncMachining from './pages/CncMachining';
import ThreeDPrinting from './pages/ThreeDPrinting';
import SheetMetal from './pages/SheetMetal';
import InjectionMolding from './pages/InjectionMolding';
import Capability from './pages/Capability';
import { CAPABILITY_PAGES } from './data/capability-pages';
import HowOrderingWorks from './pages/HowOrderingWorks';
import About from './pages/About';
import Industries from './pages/Industries';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import GenericPage, { type GenericPageData } from './components/GenericPage';
import ScrollToTop from './components/ScrollToTop';
import pagesData from './data/pages.json';

// Isolated, development-only sample; the homepage remains unchanged.
const ComponentSwitchPreview = import.meta.env.DEV
  ? lazy(() => import('./previews/component-switch/ComponentSwitchPreview'))
  : null;

const genericPages = (pagesData as GenericPageData[]).filter((p) => !['industries', 'contact'].includes(p.route));

export default function App() {
  const { pathname } = useLocation();

  return (
    <div className="site-app min-h-screen bg-white font-sans text-brand-body antialiased" data-page={pathname === '/' ? 'home' : undefined}>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          {ComponentSwitchPreview && <Route path="/vorschau/komponia-echt" element={<Suspense fallback={<p className="wrap-orig section-pad">Vorschau wird geladen …</p>}><ComponentSwitchPreview /></Suspense>} />}
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<Components />} />
          <Route path="/components/:groupId" element={<Components />} />
          <Route path="/components/:groupId/:productId" element={<Components />} />
          <Route path="/komponenten" element={<Components />} />
          <Route path="/komponenten/:groupId" element={<Components />} />
          <Route path="/komponenten/:groupId/:productId" element={<Components />} />
          <Route path="/cnc-machining" element={<CncMachining />} />
          <Route path="/3d-printing" element={<ThreeDPrinting />} />
          <Route path="/sheet-metal-fabrication" element={<SheetMetal />} />
          <Route path="/injection-molding" element={<InjectionMolding />} />
          {CAPABILITY_PAGES.map(page => <Route key={page.route} path={page.route} element={<Capability page={page} />} />)}
          <Route path="/how-ordering-works" element={<HowOrderingWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/the-protolabs-network-standard" element={<Navigate to="/quality-and-lab" replace />} />
          <Route path="/protolabs-network" element={<Navigate to="/brand-background" replace />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/contact" element={<Contact />} />
          {genericPages.map((p) => (
            <Route key={p.route} path={'/' + p.route} element={<GenericPage page={p} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
