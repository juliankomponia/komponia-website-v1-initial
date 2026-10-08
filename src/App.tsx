import { Routes, Route } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Components from './pages/Components';
import CncMachining from './pages/CncMachining';
import ThreeDPrinting from './pages/ThreeDPrinting';
import SheetMetal from './pages/SheetMetal';
import InjectionMolding from './pages/InjectionMolding';
import HowOrderingWorks from './pages/HowOrderingWorks';
import About from './pages/About';
import Industries from './pages/Industries';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import GenericPage, { type GenericPageData } from './components/GenericPage';
import ScrollToTop from './components/ScrollToTop';
import pagesData from './data/pages.json';

const genericPages = (pagesData as GenericPageData[]).filter((p) => !['industries', 'contact'].includes(p.route));

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-body antialiased">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
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
          <Route path="/how-ordering-works" element={<HowOrderingWorks />} />
          <Route path="/about" element={<About />} />
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
